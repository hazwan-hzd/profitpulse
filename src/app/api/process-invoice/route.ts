import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createServerSupabaseClient, createClientForServer } from "@/utils/supabase/server";
import { requireOrg } from "@/lib/tenant";
import { validateInvoiceLineItem, normalizeUnit } from "@/utils/cogs-validator";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  // ── 1. Auth + tenant resolution
  const authResult = await requireOrg(req)
  if (authResult instanceof NextResponse) return authResult
  const { orgId } = authResult

  try {
    // Validate API key exists
    if (!process.env.CLAUDE_API_KEY) {
      return NextResponse.json(
        { error: "Claude API key not configured. Add CLAUDE_API_KEY to .env.local." },
        { status: 503 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 413 }
      );
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString("base64");

    // Determine media type (now includes PDF support)
    type SupportedMediaType = "image/png" | "image/jpeg" | "image/webp" | "application/pdf";
    
    const mediaTypeMap: Record<string, SupportedMediaType> = {
      "image/png": "image/png",
      "image/jpeg": "image/jpeg",
      "image/webp": "image/webp",
      "application/pdf": "application/pdf",
    };

    const mediaType = mediaTypeMap[file.type];

    if (!mediaType) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a JPG, PNG, WebP, or PDF." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a highly accurate data extraction system for a Malaysian cafe's invoice processing.
Extract the supplier name, invoice date, invoice number, and all line items (ingredients).
For each line item, extract:
- rawName: The exact name written on the invoice
- rawUnit: The unit listed (e.g., 'box', 'kg', 'tin', 'pcs')
- rawQuantity: The amount of that unit
- unitPrice: The price per unit in MYR (Ringgit Malaysia)
- totalPrice: The total price for that line in MYR

Output strictly as raw JSON matching this structure without any introductory text, markdown formatting, or code blocks:
{
  "supplierName": string,
  "invoiceDate": string, // YYYY-MM-DD
  "invoiceNumber": string,
  "totalAmount": number,
  "lineItems": [
    {
      "rawName": string,
      "rawUnit": string,
      "rawQuantity": number,
      "unitPrice": number,
      "totalPrice": number
    }
  ]
}`;

    // Build the content payload - works for both images and PDFs
    const sourcePayload = mediaType === "application/pdf"
      ? { type: "document" as const, source: { type: "base64" as const, media_type: "application/pdf" as const, data: base64Data } }
      : { type: "image" as const, source: { type: "base64" as const, media_type: mediaType as "image/png" | "image/jpeg" | "image/webp", data: base64Data } };

    // Call Claude
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            sourcePayload,
            {
              type: "text",
              text: "Extract the data from this invoice strictly as raw JSON."
            }
          ],
        },
      ],
    });

    const responseText = msg.content[0].type === 'text' ? msg.content[0].text : '';

    // Attempt to parse JSON with fallback
    let parsedData = null;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Fallback: strip markdown code fences if Claude included them
      const jsonMatch = responseText.match(/```(?:json)?\s*\n([\s\S]*?)\n\s*```/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Could not parse JSON from Claude response.");
      }
    }

    // --- SAVE TO SUPABASE ---
    let savedToDb = false;
    try {
      const supabase = createServerSupabaseClient();

      // 1. Insert the invoice record (with organization_id)
      const { data: invoiceRow, error: invoiceError } = await supabase
        .from("invoices")
        .insert({
          organization_id: orgId,
          supplier_name: parsedData.supplierName,
          invoice_date: parsedData.invoiceDate,
          invoice_number: parsedData.invoiceNumber,
          total_amount: parsedData.totalAmount,
          status: "processed",
        })
        .select("id")
        .single();

      if (invoiceError) throw invoiceError;

      // 2. Upsert ingredients (scoped to this org) and insert line items
      for (const item of parsedData.lineItems) {
        
        // --- NORMALIZATION LAYER ---
        const normalizedItem = normalizeUnit(item.rawUnit || "unit", item.rawQuantity || 1);
        const standardizedUnit = normalizedItem.normalizedUnit;

        // --- VALIDATION LAYER (REAPER CHECK) ---
        const validation = validateInvoiceLineItem(
          item.unitPrice, 
          item.totalPrice, 
          item.rawQuantity || 1, 
          item.rawName
        );

        // Upsert ingredient by name+org (create if new for this org, skip if exists)
        const { data: ingredientRow } = await supabase
          .from("ingredients")
          .upsert(
            { organization_id: orgId, name: item.rawName, base_unit: standardizedUnit },
            { onConflict: "organization_id,name", ignoreDuplicates: true }
          )
          .select("id")
          .single();

        // 3. Insert line item linked to invoice and ingredient, saving the validated status
        await supabase.from("invoice_line_items").insert({
          organization_id: orgId,
          invoice_id: invoiceRow.id,
          ingredient_id: ingredientRow?.id || null,
          raw_name: item.rawName,
          raw_unit: item.rawUnit,
          raw_quantity: item.rawQuantity,
          unit_price: item.unitPrice,
          total_price: item.totalPrice,
          status: validation.status,
          anomaly_reason: validation.reason
        });
      }

      savedToDb = true;
    } catch (dbError: any) {
      // Log but do not fail the request - the extraction still succeeded
      console.warn("Supabase save failed (DB may not be configured):", dbError.message);
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
      savedToDb,
    });

  } catch (error: any) {
    console.error("Error processing invoice:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing the invoice." },
      { status: 500 }
    );
  }
}
