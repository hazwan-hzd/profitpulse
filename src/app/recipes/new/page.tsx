"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import {
  CATEGORIES,
  OVERHEAD_PERCENT,
  calcRecipeFinancials,
  createNewRecipe,
  slugify,
  saveRecipesToStorage,
  MENU_DATA,
  loadRecipesFromStorage,
  type Recipe,
  type Ingredient,
} from "../recipe-data";

export default function NewRecipePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Mains / Sides");
  const [sellingPrice, setSellingPrice] = useState("");
  const [targetMargin, setTargetMargin] = useState("65");
  const [notes, setNotes] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngName, setNewIngName] = useState("");
  const [newIngCost, setNewIngCost] = useState("");
  const [newIngQty, setNewIngQty] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recipe: Recipe = {
    name: name || "New Recipe",
    slug: slugify(name || "new-recipe"),
    sellingPrice: Number(sellingPrice) || 0,
    targetMargin: Number(targetMargin) || 65,
    category,
    ingredients,
    notes,
  };

  const fin = calcRecipeFinancials(recipe);

  const addIngredient = () => {
    if (!newIngName.trim() || !newIngCost) return;
    setIngredients([
      ...ingredients,
      { name: newIngName.trim(), cost: Number(newIngCost), quantity: newIngQty || undefined },
    ]);
    setNewIngName("");
    setNewIngCost("");
    setNewIngQty("");
  };

  const removeIngredient = (idx: number) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setError(null);

    if (!name.trim()) { setError("Recipe name is required."); return; }
    if (!sellingPrice || Number(sellingPrice) <= 0) { setError("Selling price must be greater than 0."); return; }
    if (ingredients.length === 0) { setError("Add at least one ingredient."); return; }

    setSaving(true);

    try {
      // Load existing recipes
      const stored = await loadRecipesFromStorage();
      const existing = stored && stored.length > 0 ? stored : [...MENU_DATA];
      
      // Check for duplicate slug
      const slug = slugify(name);
      if (existing.some(r => r.slug === slug)) {
        setError(`A recipe with the name "${name}" already exists.`);
        setSaving(false);
        return;
      }

      const newRecipe: Recipe = {
        name: name.trim(),
        slug,
        sellingPrice: Number(sellingPrice),
        targetMargin: Number(targetMargin),
        category,
        ingredients,
        notes: notes || undefined,
      };

      const updated = [...existing, newRecipe];
      await saveRecipesToStorage(updated);

      // Also save to localStorage as backup
      localStorage.setItem("tl-recipes-custom", JSON.stringify(updated));

      router.push(`/recipes/${slug}`);
    } catch (err: any) {
      setError(err.message || "Failed to save recipe.");
    } finally {
      setSaving(false);
    }
  };

  const categories = CATEGORIES.filter(c => c !== "All");

  return (
    <div className="w-full min-h-full p-8 md:p-12 max-w-4xl">
      {/* Back Button */}
      <Link
        href="/recipes"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Recipes
      </Link>

      <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Add New Recipe</h1>
      <p className="text-zinc-400 mb-10">Add a new menu item with ingredients and pricing.</p>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5">
          <h2 className="text-lg font-semibold text-white">Basic Information</h2>
          
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Recipe Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Smoked Duck Aglio Olio"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c} value={c} className="bg-zinc-900">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Selling Price (RM)</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="e.g. 25"
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Target Margin (%)</label>
              <input
                type="number"
                value={targetMargin}
                onChange={(e) => setTargetMargin(e.target.value)}
                placeholder="65"
                min="10"
                max="95"
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Recipe instructions, special prep notes, batch sizing..."
              rows={3}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 resize-none"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5">
          <h2 className="text-lg font-semibold text-white">Ingredients</h2>
          
          {ingredients.length > 0 && (
            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium text-sm">{ing.name}</span>
                    {ing.quantity && <span className="text-zinc-500 text-xs">{ing.quantity}</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-zinc-400 text-sm">RM {ing.cost.toFixed(2)}</span>
                    <button
                      onClick={() => removeIngredient(idx)}
                      className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Ingredient Form */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newIngName}
              onChange={(e) => setNewIngName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
              placeholder="Ingredient name"
              className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50"
            />
            <input
              type="text"
              value={newIngQty}
              onChange={(e) => setNewIngQty(e.target.value)}
              placeholder="Qty (e.g. 200g)"
              className="w-32 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50"
            />
            <input
              type="number"
              value={newIngCost}
              onChange={(e) => setNewIngCost(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
              placeholder="Cost (RM)"
              className="w-32 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50"
            />
            <button
              onClick={addIngredient}
              disabled={!newIngName.trim() || !newIngCost}
              className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-2 text-sm font-medium shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Live Cost Preview */}
        {ingredients.length > 0 && Number(sellingPrice) > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Cost Preview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Ingredient Cost</p>
                <p className="text-lg font-bold text-white">RM {fin.ingredientCost.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">+ Overhead ({OVERHEAD_PERCENT}%)</p>
                <p className="text-lg font-bold text-amber-400">RM {fin.overheadCost.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">True Cost</p>
                <p className="text-lg font-bold text-white">RM {fin.totalCost.toFixed(2)}</p>
              </div>
              <div className={clsx(
                "p-4 rounded-xl border",
                fin.healthStatus === "healthy"
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-red-500/5 border-red-500/20"
              )}>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Net Margin</p>
                <p className={clsx(
                  "text-lg font-bold",
                  fin.healthStatus === "healthy" ? "text-emerald-400" : "text-red-400"
                )}>
                  {fin.actualMargin.toFixed(1)}%
                </p>
              </div>
            </div>
            {fin.healthStatus === "warning" && (
              <div className="mt-4 p-3 rounded-xl bg-red-400/10 border border-red-400/20 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400/80">
                  Margin ({fin.actualMargin.toFixed(1)}%) is below target ({targetMargin}%). Consider pricing at RM {fin.suggestedPrice.toFixed(0)}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/recipes"
            className="px-6 py-3 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors font-medium text-sm shadow-[0_0_20px_rgba(79,70,229,0.2)]"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Recipe"}
          </button>
        </div>
      </div>
    </div>
  );
}
