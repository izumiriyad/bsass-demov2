"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BSLGame } from "@/lib/catalog";

interface GameCardProps {
  game: BSLGame;
}

export function GameCard({ game }: GameCardProps) {
  const [c1, c2] = game.gradient;

  return (
    <Link
      href={`/games/${game.id}`}
      className="game-card group relative block w-full overflow-hidden rounded-xl cursor-pointer text-left"
      style={{ background: `linear-gradient(150deg, ${c1}, ${c2})` }}
      aria-label={`Play ${game.title}`}
    >
      {/* Shimmer overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.18), transparent 55%)" }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15) 60%, transparent)" }}
      />

      {/* BSL badge */}
      <span className="absolute right-1 top-1 rounded bg-[#ffdf19] px-1 py-0.5 text-[8px] font-bold leading-none text-[#121315] z-10">
        BSL
      </span>

      {game.isHot && (
        <span className="absolute left-1 top-1 rounded bg-[#ef4444] px-1 py-0.5 text-[8px] font-bold leading-none text-white z-10 animate-pulse">
          HOT 🔥
        </span>
      )}
      {game.isNew && !game.isHot && (
        <span className="absolute left-1 top-1 rounded bg-[#22c55e] px-1 py-0.5 text-[8px] font-bold leading-none text-white z-10">
          NEW
        </span>
      )}

      {/* Game emoji */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>
          {game.emoji}
        </span>
      </div>

      {/* Live players */}
      {typeof game.players === "number" && (
        <span className="absolute bottom-7 left-1 flex items-center gap-0.5 text-[9px] font-medium text-white/80 z-10">
          <span className="live-dot live-dot-pulse" />
          {new Intl.NumberFormat("en-BD").format(game.players)} playing
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="rounded-full bg-gradient-to-b from-[#ffdf19] to-[#f5a400] px-4 py-1.5 text-[11px] font-black text-[#241a05] shadow-lg">
          ▶ Play Now
        </span>
      </div>

      {/* Title */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1 pt-3">
        <p className="truncate text-xs font-bold text-white">{game.title}</p>
        <p className="truncate text-[10px] text-white/60">{game.provider}</p>
      </div>
    </Link>
  );
}

interface FeatureCardProps {
  game: BSLGame;
}

export function FeatureCard({ game }: FeatureCardProps) {
  const [c1, c2] = game.gradient;

  return (
    <Link
      href={`/games/${game.id}`}
      className="feature-card group relative block w-full overflow-hidden rounded-2xl cursor-pointer text-left"
      style={{ background: `linear-gradient(160deg, ${c1}, ${c2})` }}
      aria-label={`Play ${game.title}`}
    >
      {/* Shimmer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.22), transparent 60%)" }}
      />

      {/* Badge */}
      {game.isFeatured && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-[#ffdf19] px-2 py-0.5 text-[9px] font-black text-[#241a05] shadow-lg">
          ⭐ FEATURED
        </span>
      )}
      {game.isHot && !game.isFeatured && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-[#ef4444] px-2 py-0.5 text-[9px] font-black text-white shadow-lg animate-pulse">
          🔥 HOT
        </span>
      )}

      {/* Emoji center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.45))" }}>
          {game.emoji}
        </span>
      </div>

      {/* Live players */}
      {typeof game.players === "number" && (
        <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-bold text-white">
          <span className="live-dot live-dot-pulse" />
          {new Intl.NumberFormat("en-BD").format(game.players)}
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="rounded-full bg-gradient-to-b from-[#ffdf19] to-[#f5a400] px-5 py-2 text-sm font-black text-[#241a05] shadow-lg">
          ▶ Play Now
        </span>
      </div>

      {/* Title bar */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2.5 pt-6">
        <p className="truncate text-sm font-black text-white">{game.title}</p>
        <p className="truncate text-[11px] text-white/60">{game.provider}</p>
      </div>
    </Link>
  );
}

/* ─── Grid / List layouts used across the site ─── */
interface GameGridProps {
  games: BSLGame[];
  columns?: number;
}

export function GameGrid({ games, columns = 5 }: GameGridProps) {
  const colClass =
    columns >= 10
      ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
      : columns >= 7
        ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  return (
    <div className={cn("grid gap-3", colClass)}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export function GameList({ games }: { games: BSLGame[] }) {
  return (
    <div className="space-y-2">
      {games.map((game) => {
        const [c1, c2] = game.gradient;
        return (
          <Link
            key={game.id}
            href={`/games/${game.id}`}
            className="flex items-center gap-3 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-3 transition hover:border-[#ffdf19]/40 hover:bg-[#242628] active:scale-[.99]"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            >
              <span className="text-xl">{game.emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#f0f0f0]">{game.title}</p>
              <p className="truncate text-xs text-[#6b7280]">{game.provider}</p>
            </div>
            {game.isHot && <span className="shrink-0 rounded bg-[#ef4444] px-1.5 py-0.5 text-[9px] font-bold text-white">HOT</span>}
            {game.isNew && !game.isHot && <span className="shrink-0 rounded bg-[#22c55e] px-1.5 py-0.5 text-[9px] font-bold text-white">NEW</span>}
            <span className="shrink-0 text-xs font-bold text-[#ffdf19]">Play →</span>
          </Link>
        );
      })}
    </div>
  );
}
