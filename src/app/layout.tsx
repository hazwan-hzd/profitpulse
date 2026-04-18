import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar";
import { TenantProvider } from "./components/TenantProvider";
import { getUserOrganization } from "@/utils/supabase/server";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ProfitPulse - AI-Powered FnB Cost Intelligence",
    template: "%s | ProfitPulse",
  },
  description: "AI-powered invoice OCR, recipe costing, and margin analysis for FnB businesses. Track ingredient costs, analyze profit margins, and optimize menu pricing with ProfitPulse.",
  keywords: ["FnB cost intelligence", "invoice OCR", "recipe costing", "profit margin", "COGS tracking", "menu pricing", "ProfitPulse"],
  authors: [{ name: "Neuramerge Sdn Bhd" }],
  openGraph: {
    title: "ProfitPulse - AI-Powered FnB Cost Intelligence",
    description: "Upload supplier invoices, extract ingredient costs with AI, and track real-time recipe profitability for your FnB business.",
    type: "website",
    locale: "en_MY",
    siteName: "ProfitPulse by Neuramerge",
  },
  twitter: {
    card: "summary",
    title: "ProfitPulse - AI-Powered FnB Cost Intelligence",
    description: "AI-powered invoice OCR and recipe costing for FnB businesses.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolve tenant context server-side once per request
  const membership = await getUserOrganization();
  const tenantValue = {
    organization: membership?.organizations ?? null,
    organizationId: membership?.organization_id ?? null,
    organizationName: membership?.organizations?.name ?? 'ProfitPulse',
    plan: membership?.organizations?.plan ?? 'trial',
    role: membership?.role ?? null,
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="h-full flex bg-black text-zinc-100 font-sans overflow-hidden">
        <TenantProvider value={tenantValue}>
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 h-full overflow-y-auto relative bg-transparent backdrop-blur-[2px]">
            {/* Global Gradients for Glassmorphism Background */}
            <div className="fixed top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full min-h-full">
              {children}
            </div>
          </main>
        </TenantProvider>
      </body>
    </html>
  );
}
