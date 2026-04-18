"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight, Loader2, Database, Inbox } from "lucide-react";
import clsx from "clsx";
import { getSupabase } from "@/utils/supabase/client";

interface PriceItem {
  name: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  supplier: string;
  lastUpdated: string;
}

// Fallback data shown only when Supabase has zero invoice data
const FALLBACK_PRICE_DATA: PriceItem[] = [
  { name: "Australian Grass-Fed Ribeye", category: "Meat & Seafood", currentPrice: 36.90, previousPrice: 30.50, unit: "200g", supplier: "Jaya Grocer (Reference)", lastUpdated: "Reference" },
  { name: "Anchor Butter (Salted)", category: "Dairy & Butter", currentPrice: 14.99, previousPrice: 12.50, unit: "227g", supplier: "Jaya Grocer (Reference)", lastUpdated: "Reference" },
  { name: "Callebaut Chocolate", category: "Baking & Specialty", currentPrice: 80.00, previousPrice: 75.00, unit: "1kg", supplier: "Baking Supply Co (Reference)", lastUpdated: "Reference" },
  { name: "Lotus Biscoff Spread", category: "Baking & Specialty", currentPrice: 27.50, previousPrice: 25.00, unit: "380g", supplier: "Jaya Grocer (Reference)", lastUpdated: "Reference" },
  { name: "Atlantis King Frozen Salmon Fillet", category: "Meat & Seafood", currentPrice: 24.90, previousPrice: 22.00, unit: "200g", supplier: "Jaya Grocer (Reference)", lastUpdated: "Reference" },
  { name: "Salted Eggs", category: "Produce & Fruits", currentPrice: 14.00, previousPrice: 12.00, unit: "10 pcs", supplier: "Local Supplier (Reference)", lastUpdated: "Reference" },
];

function getPriceChange(current: number, previous: number) {
  const diff = current - previous;
  const pct = previous > 0 ? ((diff / previous) * 100) : 0;
  return { diff, pct, direction: diff > 0 ? "up" : diff < 0 ? "down" : "flat" as const };
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString("en-MY", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}

function PriceMonitorContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceData, setPriceData] = useState<PriceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchPriceData() {
      try {
        const client = getSupabase();
        if (!client) throw new Error("Not configured");

        // Fetch all line items with their invoice supplier info
        const { data: lineItems, error } = await client
          .from("invoice_line_items")
          .select("raw_name, raw_unit, unit_price, total_price, created_at, invoice_id")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (lineItems && lineItems.length > 0) {
          // Fetch invoice details for supplier names
          const invoiceIds = [...new Set(lineItems.map(i => i.invoice_id))];
          const { data: invoices } = await client
            .from("invoices")
            .select("id, supplier_name")
            .in("id", invoiceIds);

          const supplierMap = new Map<string, string>();
          if (invoices) {
            for (const inv of invoices) {
              supplierMap.set(inv.id, inv.supplier_name || "Unknown Supplier");
            }
          }

          // Group by ingredient name, track price history
          const ingredientMap = new Map<string, {
            prices: { price: number; date: string; supplier: string }[];
            unit: string;
          }>();

          for (const item of lineItems) {
            const name = item.raw_name;
            if (!ingredientMap.has(name)) {
              ingredientMap.set(name, { prices: [], unit: item.raw_unit || "" });
            }
            ingredientMap.get(name)!.prices.push({
              price: Number(item.unit_price),
              date: item.created_at,
              supplier: supplierMap.get(item.invoice_id) || "Unknown",
            });
          }

          // Build price items with change tracking
          const liveItems: PriceItem[] = [];
          for (const [name, data] of ingredientMap.entries()) {
            const latest = data.prices[0]; // most recent (sorted desc)
            const previous = data.prices.length > 1 ? data.prices[1] : latest;
            
            // Auto-categorize based on ingredient name
            const category = categorizeIngredient(name);

            liveItems.push({
              name,
              category,
              currentPrice: latest.price,
              previousPrice: previous.price,
              unit: data.unit,
              supplier: latest.supplier,
              lastUpdated: formatDate(latest.date),
            });
          }

          setIsLive(true);
          setPriceData(liveItems);
        } else {
          // No invoice data - show fallback reference prices
          setIsLive(false);
          setPriceData(FALLBACK_PRICE_DATA);
        }
      } catch {
        setIsLive(false);
        setPriceData(FALLBACK_PRICE_DATA);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPriceData();
  }, []);

  // Dynamic categories from actual data
  const categories = ["All", ...new Set(priceData.map(i => i.category))].filter(Boolean);

  const filtered = priceData
    .filter(item =>
      (activeCategory === "All" || item.category === activeCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const pctA = a.previousPrice > 0 ? ((a.currentPrice - a.previousPrice) / a.previousPrice) * 100 : 0;
      const pctB = b.previousPrice > 0 ? ((b.currentPrice - b.previousPrice) / b.previousPrice) * 100 : 0;
      return pctB - pctA;
    });

  const totalItems = priceData.length;
  const priceUpCount = priceData.filter(i => i.currentPrice > i.previousPrice).length;
  const priceDownCount = priceData.filter(i => i.currentPrice < i.previousPrice).length;
  const stableCount = priceData.filter(i => i.currentPrice === i.previousPrice).length;

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
          <h1 className="text-3xl font-bold text-white tracking-tight">Price Monitor</h1>
          <p className="text-zinc-400 mt-1">
            {isLive
              ? "Live ingredient prices from your uploaded invoices."
              : "Reference prices shown. Upload invoices to see your actual supplier costs."}
          </p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
          isLive
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
          {isLive ? "Live Data" : "Reference Prices"}
        </div>
      </div>

      {/* Info banner when using fallback */}
      {!isLive && (
        <div className="mb-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
          <Database className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-300 font-medium">Showing reference prices</p>
            <p className="text-xs text-zinc-400 mt-1">
              These are benchmark prices from Jaya Grocer. Upload your first supplier invoice to see your actual ingredient costs here.
            </p>
          </div>
        </div>
      )}

      {/* Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Tracked Items</p>
          <p className="text-2xl font-bold text-white">{totalItems}</p>
        </div>
        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-center">
          <p className="text-red-400 text-xs uppercase tracking-wider mb-1">Price Up</p>
          <p className="text-2xl font-bold text-red-400">{priceUpCount}</p>
        </div>
        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-center">
          <p className="text-emerald-400 text-xs uppercase tracking-wider mb-1">Price Down</p>
          <p className="text-2xl font-bold text-emerald-400">{priceDownCount}</p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
          <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Stable</p>
          <p className="text-2xl font-bold text-zinc-300">{stableCount}</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                activeCategory === cat
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Cards Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4">
            <Inbox className="w-7 h-7 text-zinc-600" />
          </div>
          <p className="text-zinc-500 text-lg mb-1">No ingredients found</p>
          <p className="text-zinc-600 text-sm">
            {searchQuery ? "Try adjusting your search." : "Upload invoices to start tracking ingredient prices."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item, idx) => {
            const change = getPriceChange(item.currentPrice, item.previousPrice);
            const isUp = change.direction === "up";
            const isDown = change.direction === "down";

            return (
              <div
                key={idx}
                className={clsx(
                  "rounded-2xl border p-5 flex flex-col transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg",
                  isUp ? "bg-red-500/[0.02] border-red-500/15 hover:border-red-500/30"
                    : isDown ? "bg-emerald-500/[0.02] border-emerald-500/15 hover:border-emerald-500/30"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-zinc-500">{item.lastUpdated}</span>
                </div>

                {/* Item Name */}
                <h3 className="text-sm font-semibold text-white mb-1 leading-tight">{item.name}</h3>
                <p className="text-[11px] text-zinc-500 mb-4">{item.supplier} - per {item.unit}</p>

                {/* Price Display */}
                <div className="mt-auto">
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="text-2xl font-bold text-white">RM {item.currentPrice.toFixed(2)}</p>
                      {item.currentPrice !== item.previousPrice && (
                        <p className="text-xs text-zinc-500 line-through mt-0.5">RM {item.previousPrice.toFixed(2)}</p>
                      )}
                    </div>

                    {/* Change Badge */}
                    <div className={clsx(
                      "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold",
                      isUp ? "bg-red-500/10 text-red-400"
                        : isDown ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-white/5 text-zinc-400"
                    )}>
                      {isUp ? <ArrowUpRight className="w-3 h-3" />
                        : isDown ? <ArrowDownRight className="w-3 h-3" />
                        : <Minus className="w-3 h-3" />}
                      {change.pct !== 0 ? `${change.pct > 0 ? "+" : ""}${change.pct.toFixed(1)}%` : "0%"}
                    </div>
                  </div>

                  {/* Mini price bar */}
                  {change.pct !== 0 && (
                    <div className="w-full bg-white/5 rounded-full h-1 mt-2">
                      <div
                        className={clsx(
                          "h-1 rounded-full transition-all",
                          isUp ? "bg-red-400" : isDown ? "bg-emerald-400" : "bg-zinc-500"
                        )}
                        style={{ width: `${Math.min(Math.abs(change.pct) * 3, 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Auto-categorize ingredients based on name keywords.
 * In production, this would come from a taxonomy table in Supabase.
 */
function categorizeIngredient(name: string): string {
  const lower = name.toLowerCase();
  
  // Meat & Seafood
  if (/beef|chicken|lamb|salmon|fish|prawn|shrimp|meat|ribeye|striploin|steak|seafood|squid|crab|duck|pork|bacon|sausage|pepperoni/.test(lower)) {
    return "Meat & Seafood";
  }
  // Dairy & Butter
  if (/butter|cream|cheese|milk|yogurt|egg|dairy|whipping/.test(lower)) {
    return "Dairy & Butter";
  }
  // Baking & Specialty
  if (/chocolate|vanilla|biscoff|biscuit|flour|sugar|yeast|baking|cocoa|fondant|gelatin|icing/.test(lower)) {
    return "Baking & Specialty";
  }
  // Produce & Fruits
  if (/berry|berries|strawberry|mango|banana|apple|lemon|lime|orange|fruit|vegetable|potato|onion|garlic|tomato|lettuce|spinach|mushroom|carrot|celery|capsicum/.test(lower)) {
    return "Produce & Fruits";
  }
  // Staples & Dry Goods
  if (/pasta|spaghetti|rice|noodle|oil|sauce|soy|vinegar|salt|pepper|spice|coconut|curry|flour/.test(lower)) {
    return "Staples & Dry Goods";
  }
  // Beverages
  if (/coffee|tea|syrup|juice|water|soda|drink|matcha|espresso/.test(lower)) {
    return "Beverages";
  }
  return "Other";
}

export default function PriceMonitorPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-full p-8 md:p-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    }>
      <PriceMonitorContent />
    </Suspense>
  );
}
