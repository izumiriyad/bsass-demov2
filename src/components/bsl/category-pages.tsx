"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { WinnersTicker } from "./tickers";
import { CategoryTabs } from "./category-tabs";
import { GameGrid } from "./game-card";
import { cn } from "@/lib/utils";
import {
  POPULAR_GAMES,
  SLOTS_GAMES,
  CASINO_GAMES,
  FISHING_GAMES,
  ARCADE_GAMES,
  LOTTERY_GAMES,
  CRASH_GAMES,
  TABLE_GAMES,
  COCKFIGHTING_GAMES,
  CRICKET_GAMES_LIST,
  SPORTS_GAMES_LIST,
  type BSLGame,
} from "@/lib/catalog";

interface CategoryPageProps { title: string; emoji: string; games: BSLGame[]; description?: string; active: string; }

export function CategoryPage({ title, emoji, games, description, active }: CategoryPageProps) {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("All");
  const [sort, setSort] = useState("popular");
  const providers = useMemo(() => ["All", ...Array.from(new Set(games.map((g) => g.provider)))], [games]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...games]
      .filter((g) => (provider === "All" || g.provider === provider) && (!q || `${g.title} ${g.provider}`.toLowerCase().includes(q)))
      .sort((a, b) => sort === "az" ? a.title.localeCompare(b.title) : sort === "new" ? Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) : (b.players ?? 0) - (a.players ?? 0));
  }, [games, provider, query, sort]);

  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <WinnersTicker />
      <CategoryTabs active={active} />
      <section className="overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 bsl-card-glow sm:p-5">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2"><span className="section-title-bar" /><span className="text-2xl">{emoji}</span><h1 className="text-xl font-black uppercase tracking-wide text-[#f0f0f0] sm:text-3xl">{title}</h1></div>
            {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-[#9ca3af]">{description}</p>}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex h-11 min-w-[240px] items-center rounded-xl border border-[#2a2c30] bg-[#121315] px-3 text-[#8f8b80] focus-within:border-[#fbb70b]"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search games" className="w-full bg-transparent px-3 text-sm text-[#f0f0f0] outline-none" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}</label>
            <select value={provider} onChange={(e) => setProvider(e.target.value)} className="h-11 rounded-xl border border-[#2a2c30] bg-[#121315] px-3 text-sm font-semibold text-[#f0f0f0] outline-none focus:border-[#fbb70b]">{providers.map((p) => <option key={p}>{p}</option>)}</select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 rounded-xl border border-[#2a2c30] bg-[#121315] px-3 text-sm font-semibold text-[#f0f0f0] outline-none focus:border-[#fbb70b]"><option value="popular">Popular</option><option value="new">Newest</option><option value="az">A–Z</option></select>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#9ca3af]"><SlidersHorizontal size={14} /><span>{filtered.length} games</span>{provider !== "All" && <button onClick={() => setProvider("All")} className="rounded-full bg-[#fbb70b]/10 px-2 py-1 text-[#fbb70b]">{provider} ×</button>}</div>
        {filtered.length ? <GameGrid games={filtered} columns={10} /> : <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-[#383b3f] bg-[#121315] text-center"><p className="text-4xl">🔎</p><h2 className="mt-3 text-lg font-black text-[#f0f0f0]">No games found</h2><p className="mt-1 max-w-md text-sm text-[#9ca3af]">Try another keyword, provider, or sorting option.</p><button onClick={() => { setQuery(""); setProvider("All"); }} className="mt-4 rounded-lg bg-[#fbb70b] px-4 py-2 text-sm font-bold text-[#211b0d]">Reset filters</button></div>}
      </section>
    </div>
  );
}

export function PopularPage() { return <CategoryPage title="Popular" emoji="⭐" games={POPULAR_GAMES} active="popular" description="The Bangladesh-focused BSL Gaming hot lobby: trending casino, slots, crash, sports and live cricket, casino, slots and crash experiences." />; }
export function SportsPage() { return <CategoryPage title="Sports" emoji="⚽" games={SPORTS_GAMES_LIST} active="sports" description="Football, cricket, basketball, tennis, kabaddi and esports betting cards with odds-ready UI." />; }
export function CricketPage() { return <CategoryPage title="Cricket" emoji="🏏" games={CRICKET_GAMES_LIST} active="cricket" description="Live cricket betting on BPL, IPL, ICC events and regional fixtures." />; }
export function CockfightingPage() { return <CategoryPage title="SV388" emoji="🐓" games={COCKFIGHTING_GAMES} active="cockfighting" description="Live SV388 cockfighting derbies and arena cards." />; }
export function SlotsPage() { return <CategoryPage title="Slots" emoji="🎰" games={SLOTS_GAMES} active="slots" description="Premium slots from Pragmatic Play, JILI, PG Soft and more." />; }
export function CasinoPage() { return <CategoryPage title="Casino" emoji="♠️" games={CASINO_GAMES} active="casino" description="Live casino with real-dealer baccarat, roulette, blackjack and game shows." />; }
export function FishingPage() { return <CategoryPage title="Fishing" emoji="🐟" games={FISHING_GAMES} active="fishing" description="Arcade fishing games from JILI, Fa Chai, JDB and Spade Gaming." />; }
export function ArcadePage() { return <CategoryPage title="Arcade" emoji="🕹️" games={ARCADE_GAMES} active="arcade" description="Instant-win arcade games: Plinko, Mines, Dice, Tower and more." />; }
export function LotteryPage() { return <CategoryPage title="Lottery" emoji="🪙" games={LOTTERY_GAMES} active="lottery" description="Keno, Bingo, Lucky 5 and Power Ball draws." />; }
export function CrashPage() { return <CategoryPage title="Crash" emoji="🚀" games={CRASH_GAMES} active="crash" description="Aviator, JetX, High Flyer, Spaceman and more crash games." />; }
export function TablePage() { return <CategoryPage title="Table" emoji="🎲" games={TABLE_GAMES} active="table" description="Texas Hold'em, Blackjack, Baccarat, Sic Bo and Dragon Tiger." />; }
