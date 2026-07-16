"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { ALL_GAMES, GAME_CATEGORIES, PROVIDERS, type BSLGame } from "@/lib/catalog";
import { GameCard } from "@/components/bsl/game-card";
import { cn } from "@/lib/utils";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"popular" | "new" | "az">("popular");
  const [showFilters, setShowFilters] = useState(false);

  const uniqueProviders = useMemo(() => {
    const set = new Set(ALL_GAMES.map((g) => g.provider));
    return Array.from(set).sort();
  }, []);

  const results = useMemo(() => {
    let filtered = ALL_GAMES;

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.provider.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((g) => g.category === selectedCategory);
    }

    // Provider filter
    if (selectedProvider) {
      filtered = filtered.filter((g) => g.provider === selectedProvider);
    }

    // Sort
    if (sortBy === "new") {
      filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === "az") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      filtered = [...filtered].sort((a, b) => (b.players ?? 0) - (a.players ?? 0));
    }

    return filtered;
  }, [query, selectedCategory, selectedProvider, sortBy]);

  const clearAll = () => {
    setQuery("");
    setSelectedCategory(null);
    setSelectedProvider(null);
  };

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#f0f0f0]">🔍 Search Games</h1>
        <p className="mt-1 text-sm text-[#9ca3af]">Find your favorite games from {ALL_GAMES.length}+ titles</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by game name, provider, or category..."
            className="w-full rounded-xl border border-[#2a2c30] bg-[#1b1c1e] py-3 pl-11 pr-10 text-sm text-[#f0f0f0] outline-none focus:border-[#ffdf19] transition placeholder:text-[#4b5563]"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white">
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn("flex items-center gap-1.5 rounded-xl border px-4 text-xs font-bold transition", showFilters ? "border-[#ffdf19] bg-[#ffdf19]/10 text-[#ffdf19]" : "border-[#2a2c30] bg-[#1b1c1e] text-[#9ca3af] hover:text-white")}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="space-y-3 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase text-[#6b7280]">Category</p>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setSelectedCategory(null)} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold transition", !selectedCategory ? "bg-[#ffdf19] text-[#241a05]" : "bg-[#242628] text-[#9ca3af] hover:text-white")}>All</button>
              {GAME_CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setSelectedCategory(selectedCategory === c.id ? null : c.id)} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold transition", selectedCategory === c.id ? "bg-[#ffdf19] text-[#241a05]" : "bg-[#242628] text-[#9ca3af] hover:text-white")}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase text-[#6b7280]">Provider</p>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setSelectedProvider(null)} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold transition", !selectedProvider ? "bg-[#ffdf19] text-[#241a05]" : "bg-[#242628] text-[#9ca3af] hover:text-white")}>All</button>
              {uniqueProviders.map((p) => (
                <button key={p} onClick={() => setSelectedProvider(selectedProvider === p ? null : p)} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold transition", selectedProvider === p ? "bg-[#ffdf19] text-[#241a05]" : "bg-[#242628] text-[#9ca3af] hover:text-white")}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase text-[#6b7280]">Sort By</p>
            <div className="flex gap-1.5">
              {([["popular", "🔥 Popular"], ["new", "🆕 Newest"], ["az", "🔤 A–Z"]] as const).map(([key, label]) => (
                <button key={key} onClick={() => setSortBy(key)} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold transition", sortBy === key ? "bg-[#ffdf19] text-[#241a05]" : "bg-[#242628] text-[#9ca3af] hover:text-white")}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          {(query || selectedCategory || selectedProvider) && (
            <button onClick={clearAll} className="text-xs font-bold text-[#ef4444] hover:underline">Clear all filters</button>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-[#6b7280]">
          {results.length} game{results.length !== 1 ? "s" : ""} found
          {query && <span className="text-[#ffdf19]"> for "{query}"</span>}
        </p>
      </div>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {results.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">🎮</span>
          <h3 className="text-xl font-black text-[#f0f0f0]">No games found</h3>
          <p className="mt-1 text-sm text-[#9ca3af]">Try a different search term or adjust your filters</p>
          <button onClick={clearAll} className="mt-4 rounded-xl bg-[#ffdf19] px-6 py-2.5 text-sm font-black text-[#241a05]">Clear Filters</button>
        </div>
      )}
    </div>
  );
}
