import { getSupabase } from "@/utils/supabase/client";
import { validateRecipeBeforeSave } from "@/utils/cogs-validator";

export interface Ingredient {
  name: string;
  cost: number;
  quantity?: string; // e.g., "150g", "3 pcs"
}

export interface Recipe {
  id?: string;
  name: string;
  slug: string;
  sellingPrice: number;
  targetMargin: number;
  category: string;
  ingredients: Ingredient[];
  imageUrl?: string;
  notes?: string;
}

export interface ChangeLogEntry {
  id: string;
  recipeSlug: string;
  timestamp: string;
  action: "ingredient_added" | "ingredient_removed" | "ingredient_updated" | "price_changed" | "image_changed" | "note_added";
  description: string;
  before?: string;
  after?: string;
}

export interface PriceHistoryEntry {
  ingredientName: string;
  price: number;
  date: string;
  source: string;
}

export const OVERHEAD_PERCENT = 15;
export const CATEGORIES = ["All", "Western Mains", "Asian Mains", "Pasta & Spaghetti", "Seafood", "Beverages", "Desserts & Cakes", "Churros", "Catering & Events", "Sides & Components", "Other"];

// Import real T&L Cafe data (190 recipes, invoice-verified + proxy-resolved)
import { REAL_MENU_DATA } from "./real-menu-data";

// Re-export as MENU_DATA for backward compatibility
export const MENU_DATA: Recipe[] = REAL_MENU_DATA.map(r => ({
  ...r,
  ingredients: r.ingredients.map(i => ({ name: i.name, cost: i.cost, quantity: i.quantity }))
}));


export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function calcRecipeFinancials(recipe: Recipe) {
  const ingredientCost = recipe.ingredients.reduce((acc, curr) => acc + curr.cost, 0);
  const overheadCost = ingredientCost * (OVERHEAD_PERCENT / 100);
  const totalCost = ingredientCost + overheadCost;
  const profit = recipe.sellingPrice - totalCost;
  const actualMargin = recipe.sellingPrice > 0 ? (profit / recipe.sellingPrice) * 100 : 0;
  const healthStatus = actualMargin >= recipe.targetMargin ? "healthy" : "warning";
  const suggestedPrice = recipe.targetMargin < 100 ? totalCost / (1 - recipe.targetMargin / 100) : totalCost;

  return { ingredientCost, overheadCost, totalCost, profit, actualMargin, healthStatus, suggestedPrice };
}

// Helper to create a new recipe with defaults
export function createNewRecipe(name: string, category: string, sellingPrice: number): Recipe {
  return {
    name,
    slug: slugify(name),
    sellingPrice,
    targetMargin: 65,
    category,
    ingredients: [],
  };
}

// --------------------------------------------------------------------------------
// SUPABASE DATA LAYER IMPL
// --------------------------------------------------------------------------------

export async function loadRecipesFromStorage(): Promise<Recipe[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*, recipe_ingredients(*)');
      
    if (error) throw error;
    if (!recipes || recipes.length === 0) return null;

    // Map recipes directly without secondary fetching
    const fullRecipes = recipes.map((r) => {
      const ingredients = r.recipe_ingredients || [];
      return {
        id: r.id,
        name: r.name,
        slug: r.slug,
        sellingPrice: r.selling_price,
        targetMargin: r.target_margin,
        category: r.category,
        imageUrl: r.image_url,
        notes: r.notes,
        ingredients: ingredients.map((i: any) => ({
          name: i.ingredient_name,
          cost: Number(i.cost_override),
          quantity: i.quantity
        }))
      } as Recipe;
    });

    return fullRecipes;
  } catch (error) {
    console.error("Supabase load error:", error);
    return null;
  }
}

export async function saveRecipesToStorage(recipes: Recipe[]) {
  const supabase = getSupabase();
  if (!supabase) return;

  for (const r of recipes) {
    // --- VALIDATION LAYER (REAPER CHECK) ---
    const validation = validateRecipeBeforeSave(r.sellingPrice, r.ingredients, r.targetMargin);

    const { data: savedRecipe } = await supabase
      .from('recipes')
      .upsert({
        name: r.name,
        slug: r.slug,
        selling_price: r.sellingPrice,
        target_margin: r.targetMargin,
        category: r.category,
        image_url: r.imageUrl,
        notes: r.notes,
        status: validation.status,
        anomaly_reason: validation.reason
      }, { onConflict: 'slug' })
      .select('id')
      .single();

    if (savedRecipe?.id && r.ingredients) {
      await supabase.from('recipe_ingredients').delete().eq('recipe_id', savedRecipe.id);
      
      const ingredientsData = r.ingredients.map(i => ({
        recipe_id: savedRecipe.id,
        ingredient_name: i.name,
        quantity: i.quantity,
        cost_override: i.cost
      }));
      
      if (ingredientsData.length > 0) {
        await supabase.from('recipe_ingredients').insert(ingredientsData);
      }
    }
  }
}

export async function loadChangeLog(): Promise<ChangeLogEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase
    .from('changelog_entries')
    .select('*')
    .order('changed_at', { ascending: false })
    .limit(200);

  return (data || []).map(d => ({
    id: d.id,
    recipeSlug: d.recipe_slug,
    timestamp: d.changed_at,
    action: d.action,
    description: d.description,
    before: d.before_state,
    after: d.after_state
  }));
}

export async function addChangeLogEntry(entry: Omit<ChangeLogEntry, "id" | "timestamp">) {
  const supabase = getSupabase();
  if (!supabase) return [];

  await supabase.from('changelog_entries').insert({
    recipe_slug: entry.recipeSlug,
    action: entry.action,
    description: entry.description,
    before_state: entry.before,
    after_state: entry.after
  });
  
  return loadChangeLog();
}

// Using DB for image_url directly now instead of local storage
export async function loadRecipeImage(slug: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.from('recipes').select('image_url').eq('slug', slug).single();
  return data?.image_url || null;
}

export async function saveRecipeImage(slug: string, dataUrl: string) {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.from('recipes').update({ image_url: dataUrl }).eq('slug', slug);
}

// Price History - pulls from Supabase invoice_line_items when available
export async function getPriceHistoryAsync(ingredientName: string): Promise<PriceHistoryEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return getPriceHistoryFallback(ingredientName);

  try {
    const { data, error } = await supabase
      .from('invoice_line_items')
      .select('raw_name, unit_price, created_at')
      .ilike('raw_name', `%${ingredientName}%`)
      .order('created_at', { ascending: true })
      .limit(12);

    if (error || !data || data.length === 0) {
      return getPriceHistoryFallback(ingredientName);
    }

    return data.map(d => ({
      ingredientName: d.raw_name,
      price: Number(d.unit_price),
      date: new Date(d.created_at).toLocaleDateString('en-MY', { month: 'short', year: '2-digit' }),
      source: 'Invoice'
    }));
  } catch {
    return getPriceHistoryFallback(ingredientName);
  }
}

// Synchronous fallback for components that need it
export function getPriceHistory(ingredientName: string): PriceHistoryEntry[] {
  return getPriceHistoryFallback(ingredientName);
}

function getPriceHistoryFallback(ingredientName: string): PriceHistoryEntry[] {
  // Generate realistic mock data based on ingredient name hash
  const hash = ingredientName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const basePrice = (hash % 20) + 2;
  const variance = basePrice * 0.08;
  
  return [
    { ingredientName, price: +(basePrice - variance * 1.5).toFixed(2), date: "Oct '25", source: "Estimated" },
    { ingredientName, price: +(basePrice - variance).toFixed(2), date: "Nov '25", source: "Estimated" },
    { ingredientName, price: +(basePrice - variance * 0.3).toFixed(2), date: "Dec '25", source: "Estimated" },
    { ingredientName, price: +(basePrice + variance * 0.2).toFixed(2), date: "Jan '26", source: "Estimated" },
    { ingredientName, price: +(basePrice + variance * 0.8).toFixed(2), date: "Feb '26", source: "Estimated" },
    { ingredientName, price: +(basePrice + variance * 1.2).toFixed(2), date: "Mar '26", source: "Estimated" },
  ];
}

// Load recent invoices from Supabase
export async function loadRecentInvoices(limit: number = 5) {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('id, supplier_name, invoice_date, invoice_number, total_amount, status, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

// Load invoice line item count for a given invoice
export async function getInvoiceLineItemCount(invoiceId: string): Promise<number> {
  const supabase = getSupabase();
  if (!supabase) return 0;

  const { count } = await supabase
    .from('invoice_line_items')
    .select('*', { count: 'exact', head: true })
    .eq('invoice_id', invoiceId);

  return count || 0;
}
