"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, Download, FileText, Calendar, DollarSign, Package, ChevronRight, Inbox } from "lucide-react";
import { getSupabase } from "@/utils/supabase/client";
import clsx from "clsx";

interface Invoice {
  id: string;
  supplier_name: string;
  invoice_date: string;
  invoice_number: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface InvoiceLineItem {
  id: string;
  invoice_id: string;
  raw_name: string;
  raw_quantity: string;
  raw_unit: string;
  unit_price: number;
  total_price: number;
}

export default function InvoiceHistoryPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [lineItems, setLineItems] = useState<Map<string, InvoiceLineItem[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingItems, setLoadingItems] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const client = getSupabase();
        if (!client) throw new Error("Not configured");

        const { data, error } = await client
          .from("invoices")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) throw error;
        setIsLive(true);
        setInvoices(data || []);
      } catch {
        setIsLive(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  const toggleExpand = async (invoiceId: string) => {
    if (expandedId === invoiceId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(invoiceId);

    // Load line items if not cached
    if (!lineItems.has(invoiceId)) {
      setLoadingItems(invoiceId);
      try {
        const client = getSupabase();
        if (!client) return;

        const { data } = await client
          .from("invoice_line_items")
          .select("*")
          .eq("invoice_id", invoiceId)
          .order("created_at", { ascending: true });

        setLineItems(prev => new Map(prev).set(invoiceId, data || []));
      } catch {
        // ignore
      } finally {
        setLoadingItems(null);
      }
    }
  };

  const handleExportCSV = () => {
    const headers = ["Supplier", "Invoice #", "Date", "Total (RM)", "Status", "Processed"];
    const rows = filteredInvoices.map(inv => [
      inv.supplier_name,
      inv.invoice_number,
      inv.invoice_date,
      Number(inv.total_amount).toFixed(2),
      inv.status,
      new Date(inv.created_at).toLocaleDateString('en-MY')
    ]);

    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `profitpulse-invoices-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredInvoices = invoices.filter(inv => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      inv.supplier_name?.toLowerCase().includes(q) ||
      inv.invoice_number?.toLowerCase().includes(q) ||
      inv.invoice_date?.includes(q)
    );
  });

  const totalAmount = filteredInvoices.reduce((acc, inv) => acc + Number(inv.total_amount || 0), 0);

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
          <h1 className="text-3xl font-bold text-white tracking-tight">Invoice History</h1>
          <p className="text-zinc-400 mt-1">
            {isLive ? "All processed invoices from your database." : "Connect Supabase to see invoice history."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {invoices.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${isLive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
            {isLive ? "Live Data" : "Demo Mode"}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by supplier, invoice number, or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total Invoices</p>
          <p className="text-xl font-bold text-white">{filteredInvoices.length}</p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total Spend</p>
          <p className="text-xl font-bold text-emerald-400">RM {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl hidden md:block">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Unique Suppliers</p>
          <p className="text-xl font-bold text-white">{new Set(filteredInvoices.map(i => i.supplier_name)).size}</p>
        </div>
      </div>

      {/* Invoice List */}
      {filteredInvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4">
            <Inbox className="w-7 h-7 text-zinc-600" />
          </div>
          <p className="text-zinc-500 text-lg mb-1">
            {!isLive ? "Supabase not connected" : searchQuery ? "No invoices match your search" : "No invoices yet"}
          </p>
          <p className="text-zinc-600 text-sm">
            {!isLive
              ? "Configure your Supabase credentials to see invoice history."
              : searchQuery
              ? "Try adjusting your search query."
              : "Upload your first supplier invoice to get started."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInvoices.map((inv) => (
            <div key={inv.id} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.07] transition-colors">
              <button
                onClick={() => toggleExpand(inv.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
                    <FileText className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{inv.supplier_name || "Unknown Supplier"}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        {inv.invoice_number || "N/A"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {inv.invoice_date || new Date(inv.created_at).toLocaleDateString('en-MY')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-white font-bold">RM {Number(inv.total_amount || 0).toFixed(2)}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {new Date(inv.created_at).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <ChevronRight className={clsx(
                    "w-4 h-4 text-zinc-600 transition-transform",
                    expandedId === inv.id && "rotate-90"
                  )} />
                </div>
              </button>

              {/* Expanded Line Items */}
              {expandedId === inv.id && (
                <div className="border-t border-white/10 px-5 py-4 bg-black/20">
                  {loadingItems === inv.id ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
                    </div>
                  ) : (lineItems.get(inv.id) || []).length > 0 ? (
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                      <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="bg-white/5 text-zinc-300">
                          <tr>
                            <th className="px-4 py-3 font-medium">Ingredient</th>
                            <th className="px-4 py-3 font-medium">Qty</th>
                            <th className="px-4 py-3 font-medium">Unit Price</th>
                            <th className="px-4 py-3 font-medium text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {(lineItems.get(inv.id) || []).map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-4 py-2.5 font-medium text-zinc-200">{item.raw_name}</td>
                              <td className="px-4 py-2.5">{item.raw_quantity} {item.raw_unit}</td>
                              <td className="px-4 py-2.5">RM {Number(item.unit_price).toFixed(2)}</td>
                              <td className="px-4 py-2.5 text-right">RM {Number(item.total_price).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-sm text-center py-4">No line items found for this invoice.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
