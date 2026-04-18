"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TrendingUp, LayoutDashboard, Receipt, FileText, BarChart3, Menu, X, ClipboardList, LogOut, Brain } from "lucide-react";
import clsx from "clsx";
import { getSupabase } from "@/utils/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Invoice Upload", icon: Receipt },
  { href: "/invoices", label: "Invoice History", icon: ClipboardList },
  { href: "/recipes", label: "Recipes & Costing", icon: FileText },
  { href: "/menu-intel", label: "Menu Intel", icon: Brain },
  { href: "/price-monitor", label: "Price Monitor", icon: BarChart3 },
  { href: "/reports", label: "Reports & Audit", icon: ClipboardList },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Hide sidebar on the login page entirely
  if (pathname === '/login') {
    return null;
  }

  // Auto-detect live/demo mode
  useEffect(() => {
    async function checkConnection() {
      try {
        const client = getSupabase();
        if (!client) return;
        const { count, error } = await client
          .from("invoices")
          .select("*", { count: "exact", head: true });
        if (!error) setIsLive(true);
      } catch {
        setIsLive(false);
      }
    }
    checkConnection();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const client = getSupabase();
      if (client) {
        await client.auth.signOut();
      }
    } catch {
      // Proceed with redirect regardless
    }
    router.push('/login');
    router.refresh();
  };

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-xl bg-zinc-900 border border-white/10 text-white"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:static z-50 w-64 h-full border-r border-white/10 bg-zinc-950 flex flex-col pt-8 pb-6 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="px-6 mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold text-white tracking-wide">ProfitPulse</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1 text-zinc-400 hover:text-white"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                isActive(item.href)
                  ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-6 mt-auto space-y-3">
          {/* Auto-detect system status */}
          <div className={clsx(
            "p-4 rounded-xl border",
            isLive
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-amber-500/10 border-amber-500/20"
          )}>
            <p className={clsx("text-xs font-medium", isLive ? "text-emerald-300" : "text-amber-300")}>
              System Status
            </p>
            <p className="text-white text-sm font-semibold mt-1 flex items-center gap-2">
              <span className={clsx("w-2 h-2 rounded-full animate-pulse", isLive ? "bg-emerald-500" : "bg-amber-500")}></span>
              {isLive ? "Live" : "Demo Mode"}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/20 transition-all text-sm font-medium disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </aside>
    </>
  );
}
