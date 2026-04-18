"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Plus,
  Upload,
  X,
  Check,
  TrendingUp,
  TrendingDown,
  Clock,
  ImageIcon,
  Calculator,
  History,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Camera,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import clsx from "clsx";
import {
  MENU_DATA,
  OVERHEAD_PERCENT,
  calcRecipeFinancials,
  loadRecipesFromStorage,
  saveRecipesToStorage,
  loadChangeLog,
  addChangeLogEntry,
  loadRecipeImage,
  saveRecipeImage,
  getPriceHistory,
  type Recipe,
  type Ingredient,
  type ChangeLogEntry,
} from "../recipe-data";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCost, setEditCost] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngName, setNewIngName] = useState("");
  const [newIngCost, setNewIngCost] = useState("");
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorMargin, setSimulatorMargin] = useState(65);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [editSellingPrice, setEditSellingPrice] = useState(false);
  const [newSellingPrice, setNewSellingPrice] = useState("");
  const [showChangeLog, setShowChangeLog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load recipe data
  useEffect(() => {
    async function loadData() {
      const stored = await loadRecipesFromStorage();
      const recipes =
        stored && Array.isArray(stored) && stored.length > 0
          ? stored
          : MENU_DATA;
      setAllRecipes(recipes);

      const found = recipes.find((r) => r.slug === slug);
      if (found) {
        setRecipe(found);
        setSimulatorMargin(found.targetMargin);
      }

      // Load image
      const img = await loadRecipeImage(slug);
      if (img) setRecipeImage(img);

      // Load change log
      const log = await loadChangeLog();
      setChangeLog(log.filter((e: ChangeLogEntry) => e.recipeSlug === slug));
    }
    loadData();
  }, [slug]);

  // Persist recipe changes
  const persistRecipe = useCallback(
    async (updated: Recipe) => {
      const newRecipes = allRecipes.map((r) =>
        r.slug === updated.slug ? updated : r
      );
      setAllRecipes(newRecipes);
      setRecipe(updated);
      await saveRecipesToStorage(newRecipes);
    },
    [allRecipes]
  );

  // --- Ingredient editing handlers ---
  const startEditIngredient = (idx: number) => {
    if (!recipe) return;
    setEditingIngredient(idx);
    setEditName(recipe.ingredients[idx].name);
    setEditCost(recipe.ingredients[idx].cost.toString());
  };

  const saveEditIngredient = async () => {
    if (!recipe || editingIngredient === null) return;
    const cost = parseFloat(editCost);
    if (isNaN(cost) || cost < 0) return;

    const oldIng = recipe.ingredients[editingIngredient];
    const newIngredients = [...recipe.ingredients];
    newIngredients[editingIngredient] = { name: editName || oldIng.name, cost };

    const updated = { ...recipe, ingredients: newIngredients };
    await persistRecipe(updated);

    // Log change
    if (oldIng.cost !== cost || oldIng.name !== editName) {
      const newLog = await addChangeLogEntry({
        recipeSlug: recipe.slug,
        action: "ingredient_updated",
        description: `Updated ${oldIng.name}`,
        before: `${oldIng.name} @ RM ${oldIng.cost.toFixed(2)}`,
        after: `${editName || oldIng.name} @ RM ${cost.toFixed(2)}`,
      });
      setChangeLog((newLog || []).filter((e: ChangeLogEntry) => e.recipeSlug === recipe.slug));
    }

    setEditingIngredient(null);
  };

  const cancelEditIngredient = () => {
    setEditingIngredient(null);
  };

  const deleteIngredient = async (idx: number) => {
    if (!recipe) return;
    const removed = recipe.ingredients[idx];
    const newIngredients = recipe.ingredients.filter((_, i) => i !== idx);
    const updated = { ...recipe, ingredients: newIngredients };
    await persistRecipe(updated);

    const newLog = await addChangeLogEntry({
      recipeSlug: recipe.slug,
      action: "ingredient_removed",
      description: `Removed ${removed.name} (RM ${removed.cost.toFixed(2)})`,
      before: `${removed.name} @ RM ${removed.cost.toFixed(2)}`,
    });
    setChangeLog((newLog || []).filter((e: ChangeLogEntry) => e.recipeSlug === recipe.slug));
  };

  const addIngredient = async () => {
    if (!recipe || !newIngName.trim()) return;
    const cost = parseFloat(newIngCost);
    if (isNaN(cost) || cost < 0) return;

    const newIng: Ingredient = { name: newIngName.trim(), cost };
    const updated = {
      ...recipe,
      ingredients: [...recipe.ingredients, newIng],
    };
    await persistRecipe(updated);

    const newLog = await addChangeLogEntry({
      recipeSlug: recipe.slug,
      action: "ingredient_added",
      description: `Added ${newIng.name} (RM ${cost.toFixed(2)})`,
      after: `${newIng.name} @ RM ${cost.toFixed(2)}`,
    });
    setChangeLog((newLog || []).filter((e: ChangeLogEntry) => e.recipeSlug === recipe.slug));

    setNewIngName("");
    setNewIngCost("");
    setShowAddForm(false);
  };

  // --- Selling price ---
  const updateSellingPrice = async () => {
    if (!recipe) return;
    const price = parseFloat(newSellingPrice);
    if (isNaN(price) || price <= 0) return;

    const oldPrice = recipe.sellingPrice;
    const updated = { ...recipe, sellingPrice: price };
    await persistRecipe(updated);

    const newLog = await addChangeLogEntry({
      recipeSlug: recipe.slug,
      action: "price_changed",
      description: `Selling price changed`,
      before: `RM ${oldPrice.toFixed(2)}`,
      after: `RM ${price.toFixed(2)}`,
    });
    setChangeLog((newLog || []).filter((e: ChangeLogEntry) => e.recipeSlug === recipe.slug));
    setEditSellingPrice(false);
  };

  // --- Image upload ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !recipe) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setRecipeImage(dataUrl);
      await saveRecipeImage(recipe.slug, dataUrl);

      await addChangeLogEntry({
        recipeSlug: recipe.slug,
        action: "image_changed",
        description: `Recipe image uploaded (${file.name})`,
      });
    };
    reader.readAsDataURL(file);
  };

  if (!recipe) {
    return (
      <div className="w-full min-h-full p-8 md:p-12 flex flex-col items-center justify-center">
        <p className="text-zinc-400 text-lg mb-4">Recipe not found</p>
        <Link
          href="/recipes"
          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Link>
      </div>
    );
  }

  const financials = calcRecipeFinancials(recipe);
  const isWarning = financials.healthStatus === "warning";

  // Simulator calculations
  const simSuggestedPrice =
    simulatorMargin < 100
      ? financials.totalCost / (1 - simulatorMargin / 100)
      : financials.totalCost;

  return (
    <div className="w-full min-h-full p-6 md:p-10 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link
          href="/recipes"
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Recipes & Costing
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{recipe.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="flex-1">
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
            {recipe.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            {recipe.name}
          </h1>

          {/* Health Status Badge */}
          <div
            className={clsx(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mt-2",
              isWarning
                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            )}
          >
            {isWarning ? (
              <AlertTriangle className="w-3.5 h-3.5" />
            ) : (
              <Check className="w-3.5 h-3.5" />
            )}
            {financials.actualMargin.toFixed(1)}% margin (target:{" "}
            {recipe.targetMargin}%)
          </div>

          {/* Last Updated Timestamp */}
          <div className="flex items-center gap-1.5 mt-3 text-xs text-zinc-600">
            <Clock className="w-3 h-3" />
            <span>
              Costs last updated:{" "}
              {changeLog.length > 0
                ? new Date(changeLog[0].timestamp).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                : "Using reference pricing"}
            </span>
          </div>
        </div>

        {/* Selling Price */}
        <div className="text-right">
          {editSellingPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 text-sm">RM</span>
              <input
                type="number"
                value={newSellingPrice}
                onChange={(e) => setNewSellingPrice(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-28 px-3 py-2 bg-white/5 border border-indigo-500/30 rounded-lg text-white text-2xl font-bold text-right focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                autoFocus
              />
              <button
                onClick={updateSellingPrice}
                className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEditSellingPrice(false)}
                className="p-2 bg-white/5 text-zinc-400 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setNewSellingPrice(recipe.sellingPrice.toString());
                setEditSellingPrice(true);
              }}
              className="group flex items-center gap-2"
            >
              <span className="text-4xl font-bold text-white">
                RM {recipe.sellingPrice.toFixed(0)}
              </span>
              <Pencil className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition" />
            </button>
          )}
          <p className="text-zinc-500 text-xs mt-1">Selling Price</p>
        </div>
      </div>

      {/* Recipe Notes */}
      {recipe.notes && (
        <div className="mb-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Chef Notes</span>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{recipe.notes}</p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Image + Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Recipe Image */}
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            {recipeImage ? (
              <div className="relative group">
                <img
                  src={recipeImage}
                  alt={recipe.name}
                  className="w-full h-56 object-cover"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-56 flex flex-col items-center justify-center gap-3 text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <span className="text-sm font-medium">Upload Recipe Photo</span>
                <span className="text-xs text-zinc-600">JPG, PNG, WebP</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                True Cost
              </p>
              <p className="text-lg font-bold text-zinc-200">
                RM {financials.totalCost.toFixed(2)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                Net Profit
              </p>
              <p className="text-lg font-bold text-emerald-400">
                RM {financials.profit.toFixed(2)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                Ingredients
              </p>
              <p className="text-lg font-bold text-zinc-200">
                RM {financials.ingredientCost.toFixed(2)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                Overhead ({OVERHEAD_PERCENT}%)
              </p>
              <p className="text-lg font-bold text-amber-400">
                RM {financials.overheadCost.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Margin Warning */}
          {isWarning && (
            <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">
                    Below Target Margin
                  </p>
                  <p className="text-xs text-red-400/70">
                    Current margin is {financials.actualMargin.toFixed(1)}%
                    (target: {recipe.targetMargin}%). Consider pricing at RM{" "}
                    {financials.suggestedPrice.toFixed(0)} to hit target.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Ingredients + Tools */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ingredients Table */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                Ingredients
                <span className="text-xs text-zinc-500 font-normal">
                  ({recipe.ingredients.length} items)
                </span>
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5",
                    editMode
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
                  )}
                >
                  <Pencil className="w-3 h-3" />
                  {editMode ? "Editing" : "Edit"}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {/* Header */}
              <div className="flex items-center text-[10px] font-semibold text-zinc-500 uppercase tracking-wider pb-2 border-b border-white/5 px-3">
                <span className="flex-1">Ingredient</span>
                <span className="w-28 text-right">Cost (RM)</span>
                {editMode && <span className="w-20 text-right">Actions</span>}
              </div>

              {/* Rows */}
              {recipe.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "flex items-center py-2.5 px-3 rounded-lg transition-colors",
                    editingIngredient === idx
                      ? "bg-indigo-500/5 border border-indigo-500/20"
                      : "hover:bg-white/[0.03]"
                  )}
                >
                  {editingIngredient === idx ? (
                    <>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                      />
                      <input
                        type="number"
                        value={editCost}
                        onChange={(e) => setEditCost(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        step="0.01"
                        className="w-28 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white text-right ml-2 focus:outline-none focus:border-indigo-500/50"
                      />
                      <div className="w-20 flex items-center justify-end gap-1 ml-2">
                        <button
                          onClick={saveEditIngredient}
                          className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={cancelEditIngredient}
                          className="p-1.5 bg-white/5 text-zinc-400 rounded-md hover:bg-white/10"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-sm text-zinc-300">
                        {ing.name}
                      </span>
                      <span className="w-28 text-right font-mono text-sm text-zinc-400">
                        {ing.cost.toFixed(2)}
                      </span>
                      {editMode && (
                        <div className="w-20 flex items-center justify-end gap-1">
                          <button
                            onClick={() => startEditIngredient(idx)}
                            className="p-1.5 text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteIngredient(idx)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Add Ingredient */}
              {editMode && (
                <>
                  {showAddForm ? (
                    <div className="flex items-center py-2.5 px-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 border-dashed mt-2">
                      <input
                        type="text"
                        placeholder="Ingredient name"
                        value={newIngName}
                        onChange={(e) => setNewIngName(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                        autoFocus
                      />
                      <input
                        type="number"
                        placeholder="0.00"
                        value={newIngCost}
                        onChange={(e) => setNewIngCost(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        step="0.01"
                        className="w-28 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white text-right ml-2 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                      />
                      <div className="w-20 flex items-center justify-end gap-1 ml-2">
                        <button
                          onClick={addIngredient}
                          className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-500/30"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            setShowAddForm(false);
                            setNewIngName("");
                            setNewIngCost("");
                          }}
                          className="p-1.5 bg-white/5 text-zinc-400 rounded-md hover:bg-white/10"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-dashed border-white/10 text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors mt-2 text-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Ingredient
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Totals */}
            <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Ingredients Subtotal</span>
                <span className="font-mono text-zinc-300">
                  RM {financials.ingredientCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-amber-400/80">
                  + Overhead ({OVERHEAD_PERCENT}%)
                </span>
                <span className="font-mono text-amber-400/80">
                  RM {financials.overheadCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                <span className="text-white font-medium">True Cost</span>
                <span className="font-mono text-white font-bold">
                  RM {financials.totalCost.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Tool Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Price History Toggle */}
            <button
              onClick={() => {
                setShowHistory(!showHistory);
                setShowSimulator(false);
                setShowChangeLog(false);
              }}
              className={clsx(
                "p-4 rounded-xl border transition-all text-left flex items-center gap-3",
                showHistory
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/[0.07]"
              )}
            >
              <History className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">Price History</p>
                <p className="text-[10px] text-zinc-500">Ingredient trends</p>
              </div>
            </button>

            {/* Margin Simulator Toggle */}
            <button
              onClick={() => {
                setShowSimulator(!showSimulator);
                setShowHistory(false);
                setShowChangeLog(false);
              }}
              className={clsx(
                "p-4 rounded-xl border transition-all text-left flex items-center gap-3",
                showSimulator
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/[0.07]"
              )}
            >
              <Calculator className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">What-If Pricing</p>
                <p className="text-[10px] text-zinc-500">Margin simulator</p>
              </div>
            </button>

            {/* Change Log Toggle */}
            <button
              onClick={() => {
                setShowChangeLog(!showChangeLog);
                setShowHistory(false);
                setShowSimulator(false);
              }}
              className={clsx(
                "p-4 rounded-xl border transition-all text-left flex items-center gap-3",
                showChangeLog
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/[0.07]"
              )}
            >
              <Clock className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">Change Log</p>
                <p className="text-[10px] text-zinc-500">
                  {changeLog.length} entries
                </p>
              </div>
            </button>
          </div>

          {/* Price History Panel */}
          {showHistory && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Ingredient Price History
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.ingredients.map((ing) => (
                  <button
                    key={ing.name}
                    onClick={() =>
                      setSelectedIngredient(
                        selectedIngredient === ing.name ? null : ing.name
                      )
                    }
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      selectedIngredient === ing.name
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
                    )}
                  >
                    {ing.name.split("(")[0].trim()}
                  </button>
                ))}
              </div>

              {selectedIngredient && (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getPriceHistory(selectedIngredient)}
                      margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#333"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        stroke="#888"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `RM ${v}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111",
                          border: "1px solid #333",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(value) => [
                          `RM ${Number(value).toFixed(2)}`,
                          "Price",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#818cf8"
                        strokeWidth={2}
                        dot={{ fill: "#818cf8", strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {!selectedIngredient && (
                <p className="text-zinc-500 text-sm text-center py-8">
                  Select an ingredient above to view its price trend
                </p>
              )}
            </div>
          )}

          {/* Margin Simulator Panel */}
          {showSimulator && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                What-If Pricing Simulator
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-zinc-400">
                      Target Margin
                    </label>
                    <span className="text-sm font-bold text-indigo-400">
                      {simulatorMargin}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={simulatorMargin}
                    onChange={(e) =>
                      setSimulatorMargin(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
                    <span>30%</span>
                    <span>60%</span>
                    <span>90%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Current Price
                    </p>
                    <p className="text-xl font-bold text-white">
                      RM {recipe.sellingPrice.toFixed(0)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                    <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">
                      Suggested Price
                    </p>
                    <p className="text-xl font-bold text-indigo-300">
                      RM {simSuggestedPrice.toFixed(0)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Price Change
                    </p>
                    <p
                      className={clsx(
                        "text-xl font-bold",
                        simSuggestedPrice > recipe.sellingPrice
                          ? "text-red-400"
                          : "text-emerald-400"
                      )}
                    >
                      {simSuggestedPrice > recipe.sellingPrice ? "+" : ""}
                      RM{" "}
                      {(simSuggestedPrice - recipe.sellingPrice).toFixed(0)}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-zinc-500">
                  Based on current true cost of RM{" "}
                  {financials.totalCost.toFixed(2)} (ingredients RM{" "}
                  {financials.ingredientCost.toFixed(2)} + {OVERHEAD_PERCENT}%
                  overhead)
                </p>

                {/* Apply Button */}
                {simSuggestedPrice !== recipe.sellingPrice && (
                  <button
                    onClick={async () => {
                      const oldPrice = recipe.sellingPrice;
                      setRecipe({ ...recipe, sellingPrice: Math.round(simSuggestedPrice), targetMargin: simulatorMargin });
                      const newLog = await addChangeLogEntry({
                        recipeSlug: recipe.slug,
                        action: "price_changed",
                        description: `Applied simulator price: RM ${oldPrice} to RM ${Math.round(simSuggestedPrice)} (target margin: ${simulatorMargin}%)`,
                        before: `RM ${oldPrice}`,
                        after: `RM ${Math.round(simSuggestedPrice)}`,
                      });
                      setChangeLog(newLog);
                    }}
                    className="w-full mt-4 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                  >
                    Apply RM {Math.round(simSuggestedPrice)} as Selling Price
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Change Log Panel */}
          {showChangeLog && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Change Log
              </h3>
              {changeLog.length === 0 ? (
                <p className="text-zinc-500 text-sm text-center py-8">
                  No changes recorded yet. Edit ingredients or update prices to
                  start logging.
                </p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {changeLog.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-white/5"
                    >
                      <div
                        className={clsx(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                          entry.action === "ingredient_added"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : entry.action === "ingredient_removed"
                            ? "bg-red-500/10 text-red-400"
                            : entry.action === "price_changed"
                            ? "bg-amber-500/10 text-amber-400"
                            : entry.action === "image_changed"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-indigo-500/10 text-indigo-400"
                        )}
                      >
                        {entry.action === "ingredient_added" ? (
                          <Plus className="w-3.5 h-3.5" />
                        ) : entry.action === "ingredient_removed" ? (
                          <Trash2 className="w-3.5 h-3.5" />
                        ) : entry.action === "price_changed" ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : entry.action === "image_changed" ? (
                          <ImageIcon className="w-3.5 h-3.5" />
                        ) : (
                          <Pencil className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-zinc-200">
                          {entry.description}
                        </p>
                        {(entry.before || entry.after) && (
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            {entry.before && (
                              <span className="text-zinc-500 line-through">
                                {entry.before}
                              </span>
                            )}
                            {entry.before && entry.after && (
                              <span className="text-zinc-600">-</span>
                            )}
                            {entry.after && (
                              <span className="text-emerald-400/80">
                                {entry.after}
                              </span>
                            )}
                          </div>
                        )}
                        <p className="text-[10px] text-zinc-600 mt-1">
                          {new Date(entry.timestamp).toLocaleString("en-MY", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
