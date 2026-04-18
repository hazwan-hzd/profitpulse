"use client";

import { useState, useCallback, useEffect } from "react";
import { UploadCloud, FileText, Loader2, CheckCircle2, ChevronRight, Database, Inbox } from "lucide-react";
import clsx from "clsx";
import { getSupabase } from "@/utils/supabase/client";
import { loadRecentInvoices } from "@/app/recipes/recipe-data";

interface RecentInvoice {
  id: string;
  supplier_name: string;
  invoice_date: string;
  invoice_number: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedToDb, setSavedToDb] = useState(false);
  const [recentInvoices, setRecentInvoices] = useState<RecentInvoice[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Load recent invoices from Supabase
  useEffect(() => {
    async function fetchRecent() {
      try {
        const invoices = await loadRecentInvoices(5);
        setRecentInvoices(invoices as RecentInvoice[]);
      } catch {
        // No Supabase - leave empty
      } finally {
        setLoadingRecent(false);
      }
    }
    fetchRecent();
  }, [savedToDb]); // Re-fetch after successful save

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setSavedToDb(false);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/process-invoice", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to process");
      
      setResult(data.data);
      setSavedToDb(data.savedToDb || false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setSavedToDb(false);
  };

  return (
    <div className="flex flex-col items-center w-full px-6 py-12 md:py-24 z-10">
      <main className="flex flex-col items-center justify-center w-full max-w-5xl px-6 py-24 z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Inbox
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Upload Invoice
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Upload supplier invoices to automatically extract ingredients, normalize units, and track real-time recipe costs.
          </p>
        </div>

        {/* Upload Card (Glassmorphism) */}
        <div 
          className={clsx(
            "w-full max-w-2xl p-8 md:p-12 rounded-3xl border backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center text-center",
            isDragging 
              ? "bg-indigo-500/10 border-indigo-500/50 scale-[1.02]" 
              : "bg-white/5 border-white/10 hover:bg-white/[0.07]"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="w-full flex flex-col items-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <FileText className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{file.name}</h3>
                <p className="text-zinc-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB - Ready to process
                </p>
              </div>
              
              <div className="flex gap-4 w-full max-w-sm pt-4">
                <button 
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 transition-colors font-medium text-sm"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpload}
                  disabled={isProcessing}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      Process Invoice
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">Drag & Drop your invoice</h3>
                <p className="text-zinc-400 text-sm">Supports PDF, JPG, PNG up to 10MB</p>
              </div>
              
              <div className="relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
                <button className="mt-4 py-3 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors font-medium text-sm border border-white/5">
                  Browse Files
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Output Display */}
        <div className="w-full max-w-2xl mt-12 space-y-8">
          {(result || error) && (
            <div className="w-full p-6 bg-zinc-900/50 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Extraction Result</h3>
                {savedToDb && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Saved to Database
                  </div>
                )}
              </div>
              {error ? (
                <div className="p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
                  {error}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Supplier</p>
                      <p className="text-zinc-200 font-medium truncate">{result?.supplierName}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Date</p>
                      <p className="text-zinc-200 font-medium">{result?.invoiceDate}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Inv #</p>
                      <p className="text-zinc-200 font-medium">{result?.invoiceNumber}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total</p>
                      <p className="text-zinc-200 font-medium">RM {result?.totalAmount}</p>
                    </div>
                  </div>
                  
                  <div className="w-full overflow-x-auto rounded-xl border border-white/10">
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
                        {result?.lineItems?.map((item: any, i: number) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-medium text-zinc-200">{item.rawName}</td>
                            <td className="px-4 py-3">{item.rawQuantity} {item.rawUnit}</td>
                            <td className="px-4 py-3">RM {item.unitPrice}</td>
                            <td className="px-4 py-3 text-right">RM {item.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Action bar */}
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-white/10">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      Upload Another
                    </button>
                    {!savedToDb && (
                      <p className="text-xs text-amber-400/80">Data saved automatically via OCR pipeline</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recent Invoices - Live from Supabase */}
          <div>
            <div className="flex items-center justify-between mb-4 mt-8">
              <h3 className="text-lg font-medium text-zinc-300">Recent Extractions</h3>
            </div>
            
            {loadingRecent ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
              </div>
            ) : recentInvoices.length > 0 ? (
              <div className="space-y-3">
                {recentInvoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-zinc-200 font-medium">{inv.supplier_name}</h4>
                        <p className="text-zinc-500 text-sm">
                          {inv.invoice_number} - {new Date(inv.created_at).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <span className="text-zinc-300 font-medium">RM {Number(inv.total_amount).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                  <Inbox className="w-7 h-7 text-zinc-600" />
                </div>
                <p className="text-zinc-500 text-sm mb-1">No invoices processed yet</p>
                <p className="text-zinc-600 text-xs">Upload your first supplier invoice above to get started.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
