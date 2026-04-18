"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { Loader2, ArrowUpDown, Download } from "lucide-react";
import { getSupabase } from "@/utils/supabase/client";
import clsx from "clsx";
import {
  MENU_DATA,
  CATEGORIES,
  calcRecipeFinancials,
  loadRecipesFromStorage,
  type Recipe,
} from "@/app/recipes/recipe-data";

type SortOption = "margin" | "price" | "cogs";

function getMarginTier(margin: number) {
  if (margin >= 60) return { label: "High", color: "#22c55e" };
  if (margin >= 45) return { label: "Mid", color: "#f59e0b" };
  return { label: "Low", color: "#ef4444" };
}

interface EnrichedItem {
  name: string;
  category: string;
  price: number;
  cost: number;
  cogsPct: number;
  margin: number;
  profit: number;
  tier: { label: string; color: string };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#111] border border-[#333] rounded-lg p-3 shadow-xl z-50">
        <p className="text-white font-medium mb-2 text-sm">{label}</p>
        <div className="space-y-1 text-xs">
          <p className="text-zinc-400">
            COGS: <span className="text-[#ef4444] font-mono font-semibold">{data.cogsPct}%</span>
          </p>
          <p className="text-zinc-400">
            Margin: <span className="text-emerald-400 font-mono font-semibold">{data.margin}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function MenuIntelPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>(MENU_DATA);
  const [sortBy, setSortBy] = useState<SortOption>("margin");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchData() {
      let activeRecipes = MENU_DATA;
      try {
        const stored = await loadRecipesFromStorage();
        if (stored && stored.length > 0) activeRecipes = stored;
      } catch {
        /* fallback */
      }

      // Try live price overrides
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
          activeRecipes = activeRecipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients.map((ing) => ({
              ...ing,
              cost: latestPrices.get(ing.name) ?? ing.cost,
            })),
          }));
        }
      } catch {
        setIsLive(false);
      }

      setRecipes(activeRecipes);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  // Enrich recipes with financial data
  const items: EnrichedItem[] = recipes
    .filter((r) => r.sellingPrice > 0)
    .filter((r) => filter === "All" || r.category === filter)
    .map((r) => {
      const fin = calcRecipeFinancials(r);
      const cogsPct =
        r.sellingPrice > 0 ? (fin.totalCost / r.sellingPrice) * 100 : 0;
      return {
        name: r.name,
        category: r.category,
        price: r.sellingPrice,
        cost: fin.totalCost,
        cogsPct,
        margin: fin.actualMargin,
        profit: fin.profit,
        tier: getMarginTier(fin.actualMargin),
      };
    })
    .sort((a, b) => {
      if (sortBy === "margin") return a.margin - b.margin;
      if (sortBy === "price") return b.price - a.price;
      return b.cogsPct - a.cogsPct;
    });

  // Chart data - show top 25 worst COGS items for readability
  const chartData = items
    .sort((a, b) => b.cogsPct - a.cogsPct)
    .slice(0, 25)
    .map((m) => ({
      name:
        m.name.length > 35 ? m.name.slice(0, 32) + "..." : m.name,
      cogsPct: Math.round(m.cogsPct * 10) / 10,
      margin: Math.round(m.margin * 10) / 10,
    }));

  // Summary stats
  const totalItems = items.length;
  const avgMargin =
    totalItems > 0
      ? items.reduce((s, i) => s + i.margin, 0) / totalItems
      : 0;
  const highCount = items.filter((i) => i.tier.label === "High").length;
  const lowCount = items.filter((i) => i.tier.label === "Low").length;

  // CSV export
  const handleExportCSV = () => {
    const headers = [
      "Item",
      "Category",
      "Price (RM)",
      "True Cost (RM)",
      "COGS %",
      "Margin %",
      "Profit (RM)",
      "Tier",
    ];
    const rows = items.map((i) => [
      i.name,
      i.category,
      i.price.toFixed(2),
      i.cost.toFixed(2),
      i.cogsPct.toFixed(1),
      i.margin.toFixed(1),
      i.profit.toFixed(2),
      i.tier.label,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `profitpulse-menu-intel-${new Date().toISOString().split("T")[0]}.csv`;
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Menu Intelligence
          </h1>
          <p className="text-zinc-400 mt-1">
            {totalItems} items - item-level COGS and margin analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
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
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Total Items
          </p>
          <p className="text-xl font-bold text-white">{totalItems}</p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Avg Margin
          </p>
          <p className="text-xl font-bold text-emerald-400">
            {avgMargin.toFixed(1)}%
          </p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            High Margin
          </p>
          <p className="text-xl font-bold text-emerald-400">{highCount}</p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Low Margin
          </p>
          <p className="text-xl font-bold text-red-400">{lowCount}</p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={clsx(
              "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
              filter === c
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* COGS % Horizontal Bar Chart */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">
              COGS % by Item
            </h3>
            <p className="text-zinc-500 text-sm mt-1">
              Lower is better - Top 25 highest cost items
            </p>
          </div>
        </div>
        <div style={{ height: Math.max(400, chartData.length * 28) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 20, right: 20, top: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
              />
              <XAxis
                type="number"
                domain={[0, 80]}
                tick={{ fill: "#888", fontSize: 11 }}
                tickFormatter={(v: number) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#aaa", fontSize: 11 }}
                width={220}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="cogsPct" name="COGS %" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.cogsPct > 50
                        ? "#ef4444"
                        : entry.cogsPct > 40
                        ? "#f59e0b"
                        : "#22c55e"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Menu Table */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Full Menu Table</h3>
          <div className="flex gap-2">
            {(
              [
                { key: "margin" as SortOption, label: "Margin" },
                { key: "price" as SortOption, label: "Price" },
                { key: "cogs" as SortOption, label: "COGS" },
              ] as const
            ).map((s) => (
              <button
                key={s.key}
                onClick={() => setSortBy(s.key)}
                className={clsx(
                  "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  sortBy === s.key
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
                )}
              >
                <ArrowUpDown className="w-3 h-3" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                  Item
                </th>
                <th className="text-left py-3 px-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                  Category
                </th>
                <th className="text-right py-3 px-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                  Price
                </th>
                <th className="text-right py-3 px-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                  Cost
                </th>
                <th className="text-right py-3 px-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                  COGS %
                </th>
                <th className="text-right py-3 px-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                  Margin %
                </th>
                <th className="text-right py-3 px-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                  Profit
                </th>
                <th className="text-left py-3 px-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                  Tier
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((m, idx) => (
                <tr
                  key={idx}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-3 px-3 text-white font-medium">
                    {m.name}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                      {m.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-zinc-300">
                    RM {m.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-zinc-400">
                    RM {m.cost.toFixed(2)}
                  </td>
                  <td
                    className="py-3 px-3 text-right font-mono font-semibold"
                    style={{
                      color:
                        m.cogsPct > 50
                          ? "#ef4444"
                          : m.cogsPct > 40
                          ? "#f59e0b"
                          : "#a1a1aa",
                    }}
                  >
                    {m.cogsPct.toFixed(1)}%
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    {m.margin.toFixed(1)}%
                  </td>
                  <td
                    className="py-3 px-3 text-right font-mono"
                    style={{
                      color: m.profit >= 0 ? "#22c55e" : "#ef4444",
                    }}
                  >
                    RM {m.profit.toFixed(2)}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: m.tier.color + "20",
                        color: m.tier.color,
                      }}
                    >
                      {m.tier.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
