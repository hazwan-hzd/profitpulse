"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, TrendingDown, Loader2, ChevronRight, Search, ArrowUpDown, Plus, Download } from "lucide-react";
import { getSupabase } from "@/utils/supabase/client";
import clsx from "clsx";
import {
  MENU_DATA,
  CATEGORIES,
  OVERHEAD_PERCENT,
  calcRecipeFinancials,
  loadRecipesFromStorage,
  type Recipe,
} from "./recipe-data";

type SortOption = "name" | "margin-asc" | "margin-desc" | "cost-asc" | "cost-desc" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name", label: "Name (A-Z)" },
  { value: "margin-asc", label: "Margin (Low-High)" },
  { value: "margin-desc", label: "Margin (High-Low)" },
  { value: "cost-asc", label: "Cost (Low-High)" },
  { value: "cost-desc", label: "Cost (High-Low)" },
  { value: "price-asc", label: "Price (Low-High)" },
  { value: "price-desc", label: "Price (High-Low)" },
];

export default function RecipesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      // First try Supabase for any stored recipes, with validation
      const stored = await loadRecipesFromStorage();
      const isValid =
        stored &&
        Array.isArray(stored) &&
        stored.length > 0 &&
        stored.every(
          (r) =>
            r.sellingPrice > 0 &&
            r.ingredients &&
            r.ingredients.length > 0 &&
            r.ingredients.every((i) => typeof i.cost === "number" && i.cost >= 0)
        );
      const baseRecipes = isValid ? stored : MENU_DATA;

      try {
        const client = getSupabase();
        if (!client) throw new Error("Not configured");

        const { data, error } = await client
          .from("invoice_line_items")
          .select("raw_name, unit_price, created_at")
          .order("created_at", { ascending: false })
          .limit(1500);

        if (error) throw error;

        if (data && data.length > 0) {
          setIsLive(true);
          const latestPrices = new Map<string, number>();
          for (const item of data) {
            if (!latestPrices.has(item.raw_name)) {
              latestPrices.set(item.raw_name, Number(item.unit_price));
            }
          }

          const updatedRecipes = baseRecipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients.map((ing) => ({
              ...ing,
              cost: latestPrices.get(ing.name) ?? ing.cost,
            })),
          }));
          setRecipes(updatedRecipes);
        } else {
          setRecipes(baseRecipes);
        }
      } catch {
        setIsLive(false);
        setRecipes(baseRecipes);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  // Filter by category and search
  const filteredRecipes = recipes
    .filter((r) => {
      const matchesCategory = activeCategory === "All" || r.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const finA = calcRecipeFinancials(a);
      const finB = calcRecipeFinancials(b);
      switch (sortBy) {
        case "margin-asc": return finA.actualMargin - finB.actualMargin;
        case "margin-desc": return finB.actualMargin - finA.actualMargin;
        case "cost-asc": return finA.totalCost - finB.totalCost;
        case "cost-desc": return finB.totalCost - finA.totalCost;
        case "price-asc": return a.sellingPrice - b.sellingPrice;
        case "price-desc": return b.sellingPrice - a.sellingPrice;
        default: return a.name.localeCompare(b.name);
      }
    });

  // CSV export
  const handleExportCSV = () => {
    const headers = ["Name", "Category", "Selling Price (RM)", "Ingredient Cost (RM)", "Overhead (RM)", "True Cost (RM)", "Net Profit (RM)", "COGS %", "Net Margin %", "Target Margin %", "Health Status"];
    const rows = recipes.map(r => {
      const fin = calcRecipeFinancials(r);
      return [
        r.name,
        r.category,
        r.sellingPrice.toFixed(2),
        fin.ingredientCost.toFixed(2),
        fin.overheadCost.toFixed(2),
        fin.totalCost.toFixed(2),
        fin.profit.toFixed(2),
        ((fin.totalCost / r.sellingPrice) * 100).toFixed(1),
        fin.actualMargin.toFixed(1),
        r.targetMargin.toString(),
        fin.healthStatus
      ];
    });

    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `profitpulse-recipe-profitability-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-full p-8 md:p-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-full p-8 md:p-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Recipe Costing
          </h1>
          <p className="text-zinc-400 mt-1">
            {isLive
              ? "Live profit margins from latest invoice data."
              : "Demo margins using Jaya Grocer reference pricing."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/recipes/new"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-[0_0_12px_rgba(79,70,229,0.2)]"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Recipe
          </Link>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
              isLive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLive ? "bg-emerald-400" : "bg-amber-400"
              } animate-pulse`}
            />
            {isLive ? "Live Data" : "Demo Mode"}
          </div>
        </div>
      </div>

      {/* Search + Category Filter + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-sm hover:bg-white/10 hover:text-white transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            {SORT_OPTIONS.find(s => s.value === sortBy)?.label || "Sort"}
          </button>
          {showSortMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowSortMenu(false)} />
              <div className="absolute right-0 top-14 z-40 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                    className={clsx(
                      "w-full text-left px-4 py-2.5 text-sm transition-colors",
                      sortBy === opt.value
                        ? "bg-indigo-500/10 text-indigo-300"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Total Items
          </p>
          <p className="text-xl font-bold text-white">
            {filteredRecipes.length}
          </p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Avg Margin
          </p>
          <p className="text-xl font-bold text-emerald-400">
            {(
              filteredRecipes.reduce((acc, r) => {
                return acc + calcRecipeFinancials(r).actualMargin;
              }, 0) / (filteredRecipes.length || 1)
            ).toFixed(1)}
            %
          </p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Below Target
          </p>
          <p className="text-xl font-bold text-red-400">
            {
              filteredRecipes.filter(
                (r) => calcRecipeFinancials(r).healthStatus === "warning"
              ).length
            }
          </p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Healthy
          </p>
          <p className="text-xl font-bold text-emerald-400">
            {
              filteredRecipes.filter(
                (r) => calcRecipeFinancials(r).healthStatus === "healthy"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-500 text-lg mb-2">No recipes found</p>
          <p className="text-zinc-600 text-sm">Try adjusting your search or category filter.</p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredRecipes.map((recipe, idx) => {
          const fin = calcRecipeFinancials(recipe);
          const isWarning = fin.healthStatus === "warning";

          return (
            <Link
              key={idx}
              href={`/recipes/${recipe.slug}`}
              className={clsx(
                "rounded-2xl border p-6 flex flex-col transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg cursor-pointer group",
                isWarning
                  ? "bg-red-500/[0.02] border-red-500/20 hover:border-red-500/40"
                  : "bg-white/5 border-white/10 hover:border-indigo-500/30"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                    {recipe.category}
                  </span>
                  <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {recipe.name}
                  </h2>
                </div>
                <div className="text-right shrink-0 ml-4 flex items-center gap-2">
                  <p className="text-2xl font-bold text-white">
                    RM {recipe.sellingPrice.toFixed(0)}
                  </p>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>

              {isWarning && (
                <div className="mb-4 p-3 rounded-xl bg-red-400/10 border border-red-400/20 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400/80">
                    Margin ({fin.actualMargin.toFixed(1)}%) is below target (
                    {recipe.targetMargin}%). Consider RM{" "}
                    {fin.suggestedPrice.toFixed(0)}.
                  </p>
                </div>
              )}

              {/* Ingredients */}
              <div className="flex-1 space-y-2 mb-4">
                <div className="flex justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider pb-1 border-b border-white/5">
                  <span>Ingredient</span>
                  <span>Cost</span>
                </div>
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex justify-between text-sm py-0.5">
                    <span className="text-zinc-300">{ing.name}</span>
                    <span className="font-mono text-zinc-400">
                      RM {ing.cost.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10 mt-auto">
                <div className="flex justify-between text-xs mb-3 pb-2 border-b border-white/5">
                  <span className="text-zinc-500">Ingredients Subtotal</span>
                  <span className="font-mono text-zinc-400">
                    RM {fin.ingredientCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-amber-400/80">
                    + Overhead ({OVERHEAD_PERCENT}%)
                  </span>
                  <span className="font-mono text-amber-400/80">
                    RM {fin.overheadCost.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      True Cost
                    </p>
                    <p className="text-base font-bold text-zinc-300">
                      RM {fin.totalCost.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      COGS %
                    </p>
                    <p
                      className={clsx(
                        "text-base font-bold",
                        (fin.totalCost / recipe.sellingPrice) * 100 > 40
                          ? "text-red-400"
                          : (fin.totalCost / recipe.sellingPrice) * 100 > 30
                          ? "text-amber-400"
                          : "text-emerald-400"
                      )}
                    >
                      {((fin.totalCost / recipe.sellingPrice) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      Net Profit
                    </p>
                    <p className="text-base font-bold text-emerald-400">
                      RM {fin.profit.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      Net Margin
                    </p>
                    <p
                      className={clsx(
                        "text-base font-bold flex items-center gap-1 justify-end",
                        isWarning ? "text-red-400" : "text-emerald-400"
                      )}
                    >
                      {fin.actualMargin.toFixed(1)}%
                      {isWarning && (
                        <TrendingDown className="w-3 h-3 ml-1" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
