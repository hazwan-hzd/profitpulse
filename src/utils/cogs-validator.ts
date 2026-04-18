// The Reaper Check: Data Normalization and Validation Firewall
// This layer intercepts raw verbatim extractions and runs business-logic validation
// before anything is persisted to the database.

export interface ValidationResult {
  isValid: boolean;
  status: "verified" | "flagged_anomaly";
  reason: string | null;
}

export interface UnitNormalizationResult {
  normalizedUnit: string;
  normalizedQuantity: number;
  conversionFactor: number;
}

// -----------------------------------------------------------------------------
// 1. UNIT NORMALIZATION ENGINE
// -----------------------------------------------------------------------------
// Converts Malaysian standard FnB verbatim units into SI base units.
export function normalizeUnit(rawUnit: string, rawQuantity: number): UnitNormalizationResult {
  const normalized = rawUnit.toLowerCase().trim();
  
  // Base Maps
  const gramsMap = ["g", "gram", "grams"];
  const kgMap = ["kg", "kilo", "kilogram", "kilograms"];
  const mlMap = ["ml", "milliliter", "millilitre"];
  const literMap = ["l", "liter", "litre", "litres", "liters"];
  const baseUnitsMap = ["pcs", "piece", "pieces", "nos", "unit", "units", "pkt", "pack", "packet", "box", "tin", "bottle"];

  if (gramsMap.includes(normalized)) return { normalizedUnit: "g", normalizedQuantity: rawQuantity, conversionFactor: 1 };
  if (kgMap.includes(normalized)) return { normalizedUnit: "g", normalizedQuantity: rawQuantity * 1000, conversionFactor: 1000 };
  if (mlMap.includes(normalized)) return { normalizedUnit: "ml", normalizedQuantity: rawQuantity, conversionFactor: 1 };
  if (literMap.includes(normalized)) return { normalizedUnit: "ml", normalizedQuantity: rawQuantity * 1000, conversionFactor: 1000 };
  
  for (const match of baseUnitsMap) {
    if (normalized.includes(match)) {
      return { normalizedUnit: match, normalizedQuantity: rawQuantity, conversionFactor: 1 };
    }
  }

  // Fallback (unknown unit stays as verbatim)
  return { normalizedUnit: rawUnit || "unit", normalizedQuantity: rawQuantity, conversionFactor: 1 };
}

// -----------------------------------------------------------------------------
// 2. INVOICE LINE ITEM ANOMALY DETECTION
// -----------------------------------------------------------------------------
// Flags OCR misreads or fat-finger typos on unit price
export function validateInvoiceLineItem(unitPrice: number, totalPrice: number, quantity: number, itemName: string): ValidationResult {
  // 1. Math Check (Quantity * UnitPrice must roughly equal TotalPrice)
  // Allow for minor floating point or rounding differences (< 0.10 RM)
  const calculatedTotal = unitPrice * quantity;
  if (Math.abs(calculatedTotal - totalPrice) > 0.10) {
    return {
      isValid: false,
      status: "flagged_anomaly",
      reason: `Math mismatch: ${quantity} * RM${unitPrice} != RM${totalPrice}`
    };
  }

  // 2. Extravagant Price Catch
  // Most bulk ingredients in a cafe should not cost > RM 500 per unit
  // Exceptions might exist for bulk equipment, but it warrants a flag.
  if (unitPrice > 500) {
    return {
      isValid: false,
      status: "flagged_anomaly",
      reason: `Extravagant unit price warning: RM${unitPrice} per unit`
    };
  }

  // 3. Zero Cost Error
  if (unitPrice <= 0) {
    return {
      isValid: false,
      status: "flagged_anomaly",
      reason: "Unit price cannot be zero or negative"
    };
  }

  return { isValid: true, status: "verified", reason: null };
}

// -----------------------------------------------------------------------------
// 3. RECIPE MARGIN VALIDATION (THE REAPER CHECK)
// -----------------------------------------------------------------------------
export interface RecipeIngredientPayload {
  name: string;
  cost: number;
}

export function validateRecipeBeforeSave(
  sellingPrice: number, 
  ingredients: RecipeIngredientPayload[],
  targetMargin: number = 0
): ValidationResult {
  
  // 1. Core Sanity Check
  if (sellingPrice <= 0) {
    return { isValid: false, status: "flagged_anomaly", reason: "Selling price cannot be zero or negative." };
  }

  if (!ingredients || ingredients.length === 0) {
    return { isValid: false, status: "flagged_anomaly", reason: "Recipe has no ingredients." };
  }

  // 2. Ingredients Logic Check
  let totalCost = 0;
  for (const ing of ingredients) {
    if (ing.cost < 0) {
      return { isValid: false, status: "flagged_anomaly", reason: `Ingredient ${ing.name} has negative cost.` };
    }
    // Anomalous ingredient cost check
    if (ing.cost > 200) {
      return { isValid: false, status: "flagged_anomaly", reason: `Ingredient ${ing.name} has anomalous high cost: RM${ing.cost}.` };
    }
    totalCost += ing.cost;
  }

  // 3. The Reaper Margin Check
  const overhead = totalCost * 0.15; // Standard 15% assumption
  const trueCost = totalCost + overhead;
  
  if (trueCost >= sellingPrice) {
    return { 
      isValid: false, 
      status: "flagged_anomaly", 
      reason: `NEGATIVE MARGIN: True cost (RM${trueCost.toFixed(2)}) exceeds Selling Price (RM${sellingPrice.toFixed(2)}).` 
    };
  }

  // 4. Critical Bleed Warning
  // Even if profitable, if margin is less than 15%, flag it as anomalous
  const marginPercent = ((sellingPrice - trueCost) / sellingPrice) * 100;
  if (marginPercent < 15) {
     return {
        isValid: false,
        status: "flagged_anomaly",
        reason: `CRITICAL BLEED: Margin is only ${marginPercent.toFixed(1)}%, far below standard targets.`
     };
  }

  return { isValid: true, status: "verified", reason: null };
}
