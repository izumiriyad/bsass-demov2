"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BSLGame } from "@/lib/catalog";
import { GameGrid } from "./game-card";

interface GameSectionProps {
  title: string;
  emoji: string;
  games: BSLGame[];
  href: string;
  columns?: 5 | 7 | 8 | 10;
  defaultOpen?: boolean;
}

export function GameSection({
  title,
  emoji,
  games,
  href,
  columns = 7,
  defaultOpen = true,
}: GameSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2"
        >
          <span className="section-title-bar" />
          <span className="text-base sm:text-lg">{emoji}</span>
          <span className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
            {title}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-[#9ca3af] transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
        <Link
          href={href}
          className="shrink-0 text-xs font-semibold text-[#22c55e] transition hover:text-[#00a86d]"
        >
          See All →
        </Link>
      </div>
      {open && <GameGrid games={games} columns={columns} />}
    </section>
  );
}
