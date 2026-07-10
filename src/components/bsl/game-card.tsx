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
      className="game-card group"
      style={{
        background: `linear-gradient(150deg, ${c1}, ${c2})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.18), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15) 60%, transparent)",
        }}
      />

      <span className="absolute right-1 top-1 rounded bg-[#ffdf19] px-1 py-0.5 text-[8px] font-bold leading-none text-[#121315]">
        BSL
      </span>

      {game.isHot && (
        <span className="absolute left-1 top-1 rounded bg-[#ef4444] px-1 py-0.5 text-[8px] font-bold leading-none text-white">
          HOT
        </span>
      )}
      {game.isNew && !game.isHot && (
        <span className="absolute left-1 top-1 rounded bg-[#22c55e] px-1 py-0.5 text-[8px] font-bold leading-none text-white">
          NEW
        </span>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-3xl"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}
        >
          {game.emoji}
        </span>
      </div>

      {typeof game.players === "number" && (
        <span className="absolute bottom-7 left-1 flex items-center gap-0.5 text-[9px] font-medium text-white/80">
          <span className="live-dot live-dot-pulse" />
          {new Intl.NumberFormat("en-BD").format(game.players)} playing
        </span>
      )}

      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="btn-primary rounded-full px-3 py-1 text-[11px] font-semibold">
          ▶ Play Now
        </span>
      </div>

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
      className="feature-card group"
      style={{
        background: `linear-gradient(150deg, ${c1}, ${c2})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.15) 60%, transparent)",
        }}
      />

      <span className="absolute right-2 top-2 rounded bg-[#ffdf19] px-1.5 py-0.5 text-[9px] font-bold leading-none text-[#121315]">
        BSL
      </span>

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-5xl"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.55))" }}
        >
          {game.emoji}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="btn-primary rounded-full px-4 py-1.5 text-xs font-semibold">
          ▶ Play Now
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-5">
        <p className="truncate text-sm font-bold text-white">{game.title}</p>
        <p className="truncate text-[11px] text-white/60">{game.provider}</p>
      </div>
    </Link>
  );
}

interface GameGridProps {
  games: BSLGame[];
  columns?: 5 | 7 | 8 | 10;
}

export function GameGrid({ games, columns = 7 }: GameGridProps) {
  const colsClass = {
    5: "grid-cols-5",
    7: "grid-cols-4 sm:grid-cols-6 lg:grid-cols-7",
    8: "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8",
    10: "grid-cols-5 sm:grid-cols-8 lg:grid-cols-10",
  }[columns];

  return (
    <div className={cn("grid gap-1.5 sm:gap-2", colsClass)}>
      {games.map((game, index) => (
        <GameCard key={`${game.category}-${game.id}-${index}`} game={game} />
      ))}
    </div>
  );
}
