"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Grid2X2, List, Search, SlidersHorizontal, X } from "lucide-react";
import { ALL_GAMES, GAME_CATEGORIES, PROVIDERS, type BSLGame } from "@/lib/catalog";
import { GameGrid } from "./game-card";
import { cn } from "@/lib/utils";

function getCategoryLabel(id: string) {
  return GAME_CATEGORIES.find((cat) => cat.id === id)?.label ?? id.toUpperCase();
}

export function AllGamesExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [provider, setProvider] = useState("all");
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");

  const providers = useMemo(() => ["all", ...Array.from(new Set(ALL_GAMES.map((game) => game.provider))).sort()], []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...ALL_GAMES]
      .filter((game) => category === "all" || game.category === category)
      .filter((game) => provider === "all" || game.provider === provider)
      .filter((game) => !q || `${game.title} ${game.provider} ${game.category}`.toLowerCase().includes(q))
      .sort((a, b) => {
        if (sort === "az") return a.title.localeCompare(b.title);
        if (sort === "new") return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
        if (sort === "hot") return Number(Boolean(b.isHot)) - Number(Boolean(a.isHot));
        return (b.players ?? 0) - (a.players ?? 0);
      });
  }, [category, provider, query, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setProvider("all");
    setSort("popular");
  };

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 bsl-card-glow">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <label className="flex h-12 flex-1 items-center rounded-xl border border-[#2a2c30] bg-[#121315] px-3 text-[#8f8b80] focus-within:border-[#ffdf19]">
            <Search size={17} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search games, providers, cricket, slots..." className="w-full bg-transparent px-3 text-sm text-[#f0f0f0] outline-none" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}
          </label>
          <div className="grid gap-2 sm:grid-cols-3 xl:w-[560px]">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-12 rounded-xl border border-[#2a2c30] bg-[#121315] px-3 text-sm font-bold text-[#f0f0f0] outline-none focus:border-[#ffdf19]">
              <option value="all">All Categories</option>
              {GAME_CATEGORIES.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
            </select>
            <select value={provider} onChange={(e) => setProvider(e.target.value)} className="h-12 rounded-xl border border-[#2a2c30] bg-[#121315] px-3 text-sm font-bold text-[#f0f0f0] outline-none focus:border-[#ffdf19]">
              <option value="all">All Providers</option>
              {providers.filter((p) => p !== "all").map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-12 rounded-xl border border-[#2a2c30] bg-[#121315] px-3 text-sm font-bold text-[#f0f0f0] outline-none focus:border-[#ffdf19]">
              <option value="popular">Most Played</option>
              <option value="hot">Hot</option>
              <option value="new">New</option>
              <option value="az">A-Z</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setView("grid")} className={cn("rounded-xl border px-3 py-3", view === "grid" ? "border-[#ffdf19] text-[#ffdf19]" : "border-[#2a2c30] text-[#9ca3af]")} aria-label="Grid view"><Grid2X2 size={18} /></button>
            <button type="button" onClick={() => setView("list")} className={cn("rounded-xl border px-3 py-3", view === "list" ? "border-[#ffdf19] text-[#ffdf19]" : "border-[#2a2c30] text-[#9ca3af]")} aria-label="List view"><List size={18} /></button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#9ca3af]"><SlidersHorizontal size={14} /><span>{results.length} results</span>{category !== "all" && <button onClick={() => setCategory("all")} className="rounded-full bg-[#ffdf19]/10 px-2 py-1 text-[#ffdf19]">{getCategoryLabel(category)} ×</button>}{provider !== "all" && <button onClick={() => setProvider("all")} className="rounded-full bg-[#ffdf19]/10 px-2 py-1 text-[#ffdf19]">{provider} ×</button>}</div>
      </div>

      {results.length ? (
        view === "grid" ? <GameGrid games={results} columns={10} /> : <GameList games={results} />
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#3a3d42] bg-[#1b1c1e] text-center">
          <p className="text-5xl">🔎</p>
          <h2 className="mt-4 text-xl font-black text-[#f0f0f0]">No games found</h2>
          <p className="mt-2 max-w-md text-sm text-[#9ca3af]">Try another keyword, category or provider.</p>
          <button onClick={reset} className="mt-5 rounded-lg bg-[#ffdf19] px-5 py-2.5 text-sm font-black text-[#241a05]">Reset filters</button>
        </div>
      )}

      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
        <h2 className="text-sm font-black uppercase text-[#f0f0f0]">Provider quick filter</h2>
        <div className="mt-3 flex flex-wrap gap-2">{PROVIDERS.map((p) => <button key={p.name} onClick={() => setProvider(p.name)} className="rounded-full bg-[#121315] px-3 py-1.5 text-xs font-bold text-[#d8d2bf] hover:text-[#ffdf19]">{p.emoji} {p.name}</button>)}</div>
      </section>
    </section>
  );
}

function GameList({ games }: { games: BSLGame[] }) {
  return (
    <div className="space-y-2">
      {games.map((game) => (
        <Link key={`${game.category}-${game.id}`} href={`/games/${game.id}`} className="flex items-center gap-3 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-3 transition hover:border-[#ffdf19]/50">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg text-2xl" style={{ background: `linear-gradient(150deg, ${game.gradient[0]}, ${game.gradient[1]})` }}>{game.emoji}</div>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-[#f0f0f0]">{game.title}</p><p className="truncate text-xs text-[#9ca3af]">{game.provider} • {getCategoryLabel(game.category)}</p></div>
          <div className="text-right"><p className="text-xs text-[#9ca3af]">Players</p><p className="text-sm font-black text-[#ffdf19]">{game.players ? game.players.toLocaleString("en-BD") : "—"}</p></div>
        </Link>
      ))}
    </div>
  );
}
