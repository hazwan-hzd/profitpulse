"use client";

import { useState } from "react";
import { Copy, CheckCircle2, XCircle, Download } from "lucide-react";
import { REAL_MENU_DATA } from "@/app/recipes/real-menu-data";

export default function ReportsPage() {
  const [copied, setCopied] = useState(false);

  // Flatten ingredients into a single table
  const allIngredients = REAL_MENU_DATA.flatMap((recipe) => 
    recipe.ingredients.map(i => ({
      recipeName: recipe.name,
      ingredientName: i.name,
      cost: i.cost,
      quantity: i.quantity,
      source: i.source as string
    }))
  );

  const handleCopy = () => {
    // Generate CSV string
    const header = "Recipe Name,Ingredient Name,Cost (RM),Quantity,Source\n";
    const rows = allIngredients.map(i => 
      `"${i.recipeName}","${i.ingredientName}",${i.cost},"${i.quantity}","${i.source}"`
    ).join("\n");
    
    navigator.clipboard.writeText(header + rows);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const invoiceVerified = allIngredients.filter(i => i.source === "Invoice").length;
  const proxyResolved = allIngredients.filter(i => i.source.includes("Proxy")).length;
  const missing = allIngredients.filter(i => i.source === "Missing").length;
  const total = allIngredients.length;

  return (
    <div className="w-full min-h-full p-8 md:p-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Reports</h1>
          <p className="text-zinc-400 mt-1">Data Hygiene and Forensic Audit Tracker</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied as CSV" : "Copy as CSV"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-semibold text-white text-lg">Invoice Verified</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-400">{invoiceVerified}</p>
          <p className="text-sm text-zinc-500 mt-1">Found in T&L Invoices ({((invoiceVerified/total)*100).toFixed(1)}%)</p>
        </div>
        <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-amber-400">
            <Download className="w-5 h-5" />
            <h3 className="font-semibold text-white text-lg">Proxy Resolved</h3>
          </div>
          <p className="text-3xl font-bold text-amber-400">{proxyResolved}</p>
          <p className="text-sm text-zinc-500 mt-1">Market research proxy ({((proxyResolved/total)*100).toFixed(1)}%)</p>
        </div>
        <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-red-400">
            <XCircle className="w-5 h-5" />
            <h3 className="font-semibold text-white text-lg">Still Missing</h3>
          </div>
          <p className="text-3xl font-bold text-red-400">{missing}</p>
          <p className="text-sm text-zinc-500 mt-1">Unresolved gaps ({((missing/total)*100).toFixed(1)}%)</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ingredient</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Used In Recipe</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Cost (RM)</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status / Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allIngredients.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white">{item.ingredientName}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{item.recipeName}</td>
                  <td className="px-6 py-4 text-sm font-mono text-zinc-300">{item.cost.toFixed(4)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      item.source === "Invoice" 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : item.source === "Missing"
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {item.source}
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
