import type { Metadata } from "next";
import { WinnersTicker } from "@/components/bsl/tickers";
import { CategoryTabs } from "@/components/bsl/category-tabs";
import { AllGamesExplorer } from "@/components/bsl/all-games-explorer";
import { ALL_GAMES } from "@/lib/catalog";

export const metadata: Metadata = { title: "All Games" };

export default async function GamesPage({ searchParams }: { searchParams: Promise<{ search?: string; q?: string }> }) {
  const params = await searchParams;
  const initialQuery = params.search ?? params.q ?? "";

  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <WinnersTicker />
      <CategoryTabs />
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-xl">🎮</span>
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-2xl">All Games</h1>
        <span className="ml-1 rounded-full bg-[#2a2c30] px-2 py-0.5 text-xs font-semibold text-[#9ca3af]">{ALL_GAMES.length}</span>
      </div>
      <AllGamesExplorer initialQuery={initialQuery} />
    </div>
  );
}
