"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Loader2,
  Pencil,
  ChevronRight,
  FileText,
  Activity,
  Clock,
} from "lucide-react";
import { getSupabase } from "@/utils/supabase/client";
import {
  MENU_DATA,
  calcRecipeFinancials,
  loadRecipesFromStorage,
  OVERHEAD_PERCENT,
} from "@/app/recipes/recipe-data";

// Production Data Drop impacts from Phase 2 Audit
const FALLBACK_MOVERS = [
  {
    name: "Australian Angus Striploin",
    oldPrice: 75.0,
    newPrice: 75.0,
    increase: "Margin -42.2%",
    type: "danger",
  },
  {
    name: "Sweet Sour Dory With Rice",
    oldPrice: 15.0,
    newPrice: 15.0,
    increase: "Margin -10.7%",
    type: "danger",
  },
  {
    name: "Breaded Chicken Chop",
    oldPrice: 23.0,
    newPrice: 23.0,
    increase: "Margin -9.0%",
    type: "warning",
  },
];

// Default overhead values - editable by user
const DEFAULT_OVERHEAD = {
  transport: 0,
  cogs: 0,
  utilities: 0,
  labour: 0,
};

// Category donut colors
const CATEGORY_COLORS = [
  "#818cf8", // indigo
  "#22c55e", // green
  "#f59e0b", // amber
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#a855f7", // purple
  "#f97316", // orange
  "#14b8a6", // teal
  "#ef4444", // red
  "#64748b", // slate
];

function computeMarginData(recipes: typeof MENU_DATA) {
  const items = recipes.map((r) => {
    const fin = calcRecipeFinancials(r);
    return {
      name:
        r.name.length > 20 ? r.name.slice(0, 18) + "..." : r.name,
      margin: Math.round(fin.actualMargin * 10) / 10,
      target: r.targetMargin,
    };
  });
  return items
    .filter((i) => i.margin < 100)
    .sort((a, b) => a.margin - a.target - (b.margin - b.target))
    .slice(0, 8);
}

function computeKPIs(recipes: typeof MENU_DATA) {
  const financials = recipes.map(calcRecipeFinancials);
  const avgMargin =
    Math.round(
      (financials.reduce((acc, f) => acc + f.actualMargin, 0) /
        financials.length) *
        10
    ) / 10;
  const belowTargetCount = recipes.filter(
    (r, i) => financials[i].actualMargin < r.targetMargin
  ).length;
  const totalRevenue = recipes.reduce(
    (acc, r) => acc + r.sellingPrice,
    0
  );
  const totalCost = financials.reduce(
    (acc, f) => acc + f.totalCost,
    0
  );
  return { avgMargin, belowTargetCount, totalRevenue, totalCost };
}

function computeCategoryData(recipes: typeof MENU_DATA) {
  const catMap = new Map<string, { count: number; revenue: number; cost: number }>();
  for (const r of recipes) {
    const fin = calcRecipeFinancials(r);
    const existing = catMap.get(r.category) || {
      count: 0,
      revenue: 0,
      cost: 0,
    };
    catMap.set(r.category, {
      count: existing.count + 1,
      revenue: existing.revenue + r.sellingPrice,
      cost: existing.cost + fin.totalCost,
    });
  }
  return Array.from(catMap.entries())
    .map(([name, data]) => ({
      name,
      count: data.count,
      revenue: Math.round(data.revenue),
      cost: Math.round(data.cost),
      margin:
        data.revenue > 0
          ? Math.round(((data.revenue - data.cost) / data.revenue) * 100)
          : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

function computeHealthScore(recipes: typeof MENU_DATA): {
  score: number;
  label: string;
  color: string;
} {
  const financials = recipes.map(calcRecipeFinancials);
  const avgMargin =
    financials.reduce((acc, f) => acc + f.actualMargin, 0) /
    financials.length;
  const belowTarget = recipes.filter(
    (r, i) => financials[i].actualMargin < r.targetMargin
  ).length;
  const belowTargetPct = (belowTarget / recipes.length) * 100;

  // Score: 0-100
  // Based on: average margin (50% weight), below-target % (50% weight)
  const marginScore = Math.min(100, (avgMargin / 70) * 100);
  const targetScore = Math.max(0, 100 - belowTargetPct * 2);
  const score = Math.round(marginScore * 0.5 + targetScore * 0.5);

  if (score >= 75)
    return { score, label: "Healthy", color: "#22c55e" };
  if (score >= 50)
    return { score, label: "Fair", color: "#f59e0b" };
  return { score, label: "At Risk", color: "#ef4444" };
}

interface KPIData {
  avgMargin: number;
  belowTargetCount: number;
  invoicesProcessed: number;
  totalRevenue: number;
  totalCost: number;
  totalRecipes: number;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [recipes, setRecipes] = useState(MENU_DATA);
  const [kpis, setKpis] = useState<KPIData>({
    avgMargin: 0,
    belowTargetCount: 0,
    invoicesProcessed: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalRecipes: 0,
  });
  const [ingredientMovers, setIngredientMovers] = useState(FALLBACK_MOVERS);
  const [marginData, setMarginData] = useState(
    computeMarginData(MENU_DATA)
  );
  const [overhead, setOverhead] = useState(DEFAULT_OVERHEAD);
  const [editingOverhead, setEditingOverhead] = useState(false);
  const [lastInvoiceDate, setLastInvoiceDate] = useState<string | null>(null);
  const [daysSinceInvoice, setDaysSinceInvoice] = useState<number | null>(null);

  // Load overhead from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("profitpulse-overhead");
    if (saved) {
      try {
        setOverhead(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const saveOverhead = (values: typeof DEFAULT_OVERHEAD) => {
    setOverhead(values);
    localStorage.setItem(
      "profitpulse-overhead",
      JSON.stringify(values)
    );
    setEditingOverhead(false);
  };

  useEffect(() => {
    async function fetchDashboardData() {
      // Load recipes first
      let activeRecipes = MENU_DATA;
      try {
        const stored = await loadRecipesFromStorage();
        if (stored && stored.length > 0) activeRecipes = stored;
      } catch {
        /* fallback */
      }

      setRecipes(activeRecipes);
      const computed = computeKPIs(activeRecipes);
      setKpis({
        ...computed,
        invoicesProcessed: 0,
        totalRecipes: activeRecipes.length,
      });
      setMarginData(computeMarginData(activeRecipes));

      try {
        const client = getSupabase();
        if (!client) throw new Error("Not configured");

        const { count, error } = await client
          .from("invoices")
          .select("*", { count: "exact", head: true });

        if (error) throw error;

        setIsLive(true);
        setKpis((prev) => ({
          ...prev,
          invoicesProcessed: count || 0,
          totalRecipes: activeRecipes.length,
        }));

        // Fetch last invoice date for freshness
        const { data: latestInvoice } = await client
          .from("invoices")
          .select("created_at")
          .order("created_at", { ascending: false })
          .limit(1);

        if (latestInvoice && latestInvoice.length > 0) {
          const lastDate = new Date(latestInvoice[0].created_at);
          setLastInvoiceDate(
            lastDate.toLocaleDateString("en-MY", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          );
          const diffMs = Date.now() - lastDate.getTime();
          setDaysSinceInvoice(
            Math.floor(diffMs / (1000 * 60 * 60 * 24))
          );
        }

        // Fetch recent line items for price movers
        const { data: recentItems } = await client
          .from("invoice_line_items")
          .select("raw_name, unit_price, created_at")
          .order("created_at", { ascending: false })
          .limit(50);

        if (recentItems && recentItems.length > 0) {
          const priceMap = new Map<string, number[]>();
          for (const item of recentItems) {
            const prices = priceMap.get(item.raw_name) || [];
            prices.push(Number(item.unit_price));
            priceMap.set(item.raw_name, prices);
          }

          const movers = Array.from(priceMap.entries())
            .filter(([, prices]) => prices.length >= 2)
            .map(([name, prices]) => ({
              name,
              newPrice: prices[0],
              oldPrice: prices[prices.length - 1],
              increase: `+${(((prices[0] - prices[prices.length - 1]) / prices[prices.length - 1]) * 100).toFixed(1)}%`,
              type:
                ((prices[0] - prices[prices.length - 1]) /
                  prices[prices.length - 1]) >
                0.1
                  ? "danger"
                  : "warning",
            }))
            .filter((m) => m.newPrice > m.oldPrice)
            .sort((a, b) => {
              const pctA =
                (a.newPrice - a.oldPrice) / a.oldPrice;
              const pctB =
                (b.newPrice - b.oldPrice) / b.oldPrice;
              return pctB - pctA;
            })
            .slice(0, 5);

          if (movers.length > 0) {
            setIngredientMovers(movers);
          }
        }
      } catch {
        setIsLive(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const totalOverhead =
    overhead.transport +
    overhead.cogs +
    overhead.utilities +
    overhead.labour;
  const hasOverheadData = totalOverhead > 0;

  const healthScore = computeHealthScore(recipes);
  const categoryData = computeCategoryData(recipes);

  // P&L summary
  const totalMenuRevenue = recipes.reduce(
    (s, r) => s + r.sellingPrice,
    0
  );
  const totalIngredientCost = recipes.reduce((s, r) => {
    return (
      s + r.ingredients.reduce((a, i) => a + i.cost, 0)
    );
  }, 0);
  const totalOverheadCost =
    totalIngredientCost * (OVERHEAD_PERCENT / 100);
  const totalTrueCost = totalIngredientCost + totalOverheadCost;
  const grossProfit = totalMenuRevenue - totalTrueCost;
  const grossMarginPct =
    totalMenuRevenue > 0
      ? (grossProfit / totalMenuRevenue) * 100
      : 0;

  // Freshness color
  const freshnessColor =
    daysSinceInvoice === null
      ? "#71717a"
      : daysSinceInvoice <= 7
      ? "#22c55e"
      : daysSinceInvoice <= 14
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="w-full min-h-full p-8 md:p-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Financial Health
          </h1>
          <p className="text-zinc-400 mt-1">
            Cost of Goods Sold (COGS) Overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Data Freshness Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: freshnessColor + "15",
              borderColor: freshnessColor + "30",
              color: freshnessColor,
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            {lastInvoiceDate
              ? `Last invoice: ${lastInvoiceDate}`
              : "No invoices yet"}
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
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
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white">
            {new Date().toLocaleDateString("en-MY", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        </div>
      ) : (
        <>
          {/* Health Score + KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {/* Health Score Card */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `radial-gradient(circle at center, ${healthScore.color}, transparent 70%)`,
                }}
              />
              <Activity
                className="w-5 h-5 mb-2"
                style={{ color: healthScore.color }}
              />
              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">
                Health Score
              </p>
              <h2
                className="text-4xl font-bold"
                style={{ color: healthScore.color }}
              >
                {healthScore.score}
              </h2>
              <span
                className="text-xs font-semibold mt-2 px-3 py-1 rounded-full"
                style={{
                  backgroundColor: healthScore.color + "20",
                  color: healthScore.color,
                }}
              >
                {healthScore.label}
              </span>
            </div>

            <Link
              href="/recipes?sort=margin-asc"
              className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:bg-white/[0.07] hover:border-indigo-500/20 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      kpis.avgMargin >= 60
                        ? "text-emerald-400 bg-emerald-400/10"
                        : "text-amber-400 bg-amber-400/10"
                    }`}
                  >
                    {kpis.avgMargin >= 60 ? "Healthy" : "Watch"}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-1">
                  Average Gross Margin
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {kpis.avgMargin}%
                </h2>
              </div>
            </Link>

            <Link
              href="/recipes?sort=margin-asc"
              className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:bg-red-500/[0.03] hover:border-red-500/20 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
                    Flagged
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-red-400 transition-colors" />
                </div>
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-1">
                  Items Below Target Margin
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {kpis.belowTargetCount} Dishes
                </h2>
              </div>
            </Link>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-1">
                  Active Recipes
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {kpis.totalRecipes || "187"}
                </h2>
              </div>
            </div>

            <Link
              href="/invoices"
              className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:bg-white/[0.07] hover:border-indigo-500/20 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-1">
                  Invoices Processed
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {kpis.invoicesProcessed}
                </h2>
              </div>
            </Link>
          </div>

          {/* P&L Summary + Category Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* P&L Summary */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-6">
                Profit & Loss Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">
                    Total Menu Revenue
                  </span>
                  <span className="font-mono text-white font-medium">
                    RM {totalMenuRevenue.toLocaleString("en-MY", { minimumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400 pl-4">
                    Ingredient Costs
                  </span>
                  <span className="font-mono text-red-400">
                    -RM{" "}
                    {totalIngredientCost.toLocaleString("en-MY", { minimumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400 pl-4">
                    Overhead ({OVERHEAD_PERCENT}%)
                  </span>
                  <span className="font-mono text-red-400">
                    -RM{" "}
                    {Math.round(totalOverheadCost).toLocaleString("en-MY")}
                  </span>
                </div>
                {hasOverheadData && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400 pl-4">
                        Transport & Delivery
                      </span>
                      <span className="font-mono text-red-400">
                        -RM {overhead.transport.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400 pl-4">
                        Utilities & Rent
                      </span>
                      <span className="font-mono text-red-400">
                        -RM {overhead.utilities.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400 pl-4">
                        Labour
                      </span>
                      <span className="font-mono text-red-400">
                        -RM {overhead.labour.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-white font-semibold">
                    Gross Profit
                  </span>
                  <span
                    className="font-mono font-bold text-lg"
                    style={{
                      color:
                        grossProfit >= 0 ? "#22c55e" : "#ef4444",
                    }}
                  >
                    RM{" "}
                    {Math.round(grossProfit).toLocaleString("en-MY")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Gross Margin</span>
                  <span
                    className="font-mono font-semibold"
                    style={{
                      color:
                        grossMarginPct >= 50
                          ? "#22c55e"
                          : grossMarginPct >= 30
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  >
                    {grossMarginPct.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Category Breakdown Donut */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-6">
                Category Breakdown
              </h3>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-48 h-48 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={80}
                        paddingAngle={2}
                        strokeWidth={0}
                      >
                        {categoryData.map((_, i) => (
                          <Cell
                            key={i}
                            fill={
                              CATEGORY_COLORS[
                                i % CATEGORY_COLORS.length
                              ]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111",
                          border: "1px solid #333",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(value: any, name: any) => [
                          `${value} items`,
                          name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        {recipes.length}
                      </p>
                      <p className="text-xs text-zinc-500">items</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-2 w-full">
                  {categoryData.slice(0, 7).map((cat, i) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              CATEGORY_COLORS[
                                i % CATEGORY_COLORS.length
                              ],
                          }}
                        />
                        <span className="text-zinc-300 truncate max-w-[140px]">
                          {cat.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-zinc-400 text-xs">
                          {cat.count} items
                        </span>
                        <span
                          className="font-mono text-xs font-semibold w-12 text-right"
                          style={{
                            color:
                              cat.margin >= 60
                                ? "#22c55e"
                                : cat.margin >= 45
                                ? "#f59e0b"
                                : "#ef4444",
                          }}
                        >
                          {cat.margin}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Overhead & Operations - EDITABLE */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">
                  Monthly Overheads
                </h3>
                {!hasOverheadData && (
                  <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                    Not configured
                  </span>
                )}
              </div>
              <button
                onClick={() =>
                  setEditingOverhead(!editingOverhead)
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Pencil className="w-3 h-3" />
                {editingOverhead ? "Cancel" : "Edit"}
              </button>
            </div>

            {editingOverhead ? (
              <OverheadEditor
                values={overhead}
                onSave={saveOverhead}
                onCancel={() => setEditingOverhead(false)}
              />
            ) : hasOverheadData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <OverheadCard
                  label="Transport & Delivery"
                  value={overhead.transport}
                />
                <OverheadCard
                  label="Food Items COGS"
                  value={overhead.cogs}
                />
                <OverheadCard
                  label="Utilities & Rent"
                  value={overhead.utilities}
                />
                <OverheadCard
                  label="Labour Cost"
                  value={overhead.labour}
                />
              </div>
            ) : (
              <div className="p-6 bg-white/5 border border-white/10 border-dashed rounded-2xl text-center">
                <p className="text-zinc-500 text-sm mb-2">
                  No overhead data entered yet
                </p>
                <p className="text-zinc-600 text-xs">
                  Click &quot;Edit&quot; above to enter your monthly transport,
                  COGS, utilities, and labour costs.
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Margin Health Chart */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-6">
                Profit Margin vs Target
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marginData}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -20,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#333"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#888"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "#222" }}
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "1px solid #333",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="margin"
                      name="Actual Margin %"
                      fill="#818cf8"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                    <Bar
                      dataKey="target"
                      name="Target Margin %"
                      fill="#3f3f46"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Movers Alerts */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Data Gap Impacts
                </h3>
                <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded-full font-medium">
                  Phase 2 Audit Result
                </span>
              </div>

              <div className="space-y-4">
                {ingredientMovers.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/recipes?search=${encodeURIComponent(item.name.split(" ")[0])}`}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group ${
                      (item as { type: string }).type === "warning"
                        ? "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/30"
                        : "border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30"
                    }`}
                  >
                    <div>
                      <h4
                        className={`font-medium group-hover:transition-colors ${
                          (item as { type: string }).type ===
                          "warning"
                            ? "text-amber-100 group-hover:text-amber-300"
                            : "text-red-100 group-hover:text-red-300"
                        }`}
                      >
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400">
                        <span>
                          Original Selling Price: RM{" "}
                          {item.oldPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center gap-2">
                      <div
                        className={`px-3 py-1.5 text-sm font-semibold rounded-lg text-center ${
                          (item as { type: string }).type ===
                          "warning"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {item.increase}
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 group-hover:transition-colors ${
                          (item as { type: string }).type ===
                          "warning"
                            ? "text-amber-500/50 group-hover:text-amber-400"
                            : "text-red-500/50 group-hover:text-red-400"
                        }`}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Overhead Card Component
function OverheadCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
        {label}
      </span>
      <p className="text-2xl font-bold text-white mt-2">
        RM {value.toLocaleString()}
      </p>
    </div>
  );
}

// Overhead Editor Component
function OverheadEditor({
  values,
  onSave,
  onCancel,
}: {
  values: typeof DEFAULT_OVERHEAD;
  onSave: (v: typeof DEFAULT_OVERHEAD) => void;
  onCancel: () => void;
}) {
  const [local, setLocal] = useState(values);

  const fields = [
    {
      key: "transport" as const,
      label: "Transport & Delivery (RM)",
      placeholder: "e.g. 850",
    },
    {
      key: "cogs" as const,
      label: "Food Items COGS (RM)",
      placeholder: "e.g. 12400",
    },
    {
      key: "utilities" as const,
      label: "Utilities & Rent (RM)",
      placeholder: "e.g. 4500",
    },
    {
      key: "labour" as const,
      label: "Labour Cost (RM)",
      placeholder: "e.g. 8200",
    },
  ];

  return (
    <div className="p-6 bg-white/5 border border-indigo-500/20 rounded-2xl space-y-4">
      <p className="text-sm text-zinc-400 mb-2">
        Enter your actual monthly figures. These will be saved
        locally.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1 block">
              {f.label}
            </label>
            <input
              type="number"
              value={local[f.key] || ""}
              onChange={(e) =>
                setLocal({
                  ...local,
                  [f.key]: Number(e.target.value) || 0,
                })
              }
              placeholder={f.placeholder}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(local)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
        >
          Save Overheads
        </button>
      </div>
    </div>
  );
}
