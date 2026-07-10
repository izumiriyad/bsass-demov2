"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Footer } from "./footer";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { useSidebar } from "./sidebar-provider";
import { cn } from "@/lib/utils";

import { SupportWidget } from "./support-widget";
import { AppInstallBanner } from "./app-install-banner";
import { FomoToasts } from "./fomo-toasts";
import { FloatingEnvelope } from "./floating-envelope";
import { WelcomeModal } from "./welcome-modal";

export function AppShell({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#121315]">
      <Sidebar />
      <Header />
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "lg:pl-[63px]" : "lg:pl-[260px]"
        )}
      >
        <AppInstallBanner />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#ffdf19] focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:text-[#241a05]">Skip to content</a>
        <main id="main-content" className="min-h-screen pb-20 pt-[72px] lg:pb-0">{children}<Footer /></main>
        <MobileBottomNav />
        <SupportWidget />
        <FomoToasts />
        <FloatingEnvelope />
        <WelcomeModal />
      </div>
    </div>
  );
}
