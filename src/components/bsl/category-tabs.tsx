"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { GAME_CATEGORIES } from "@/lib/catalog";

interface CategoryTabsProps { active?: string; }

export function CategoryTabs({ active }: CategoryTabsProps) {
  return (
    <div className="sticky top-[72px] z-20 -mx-3 bg-[#1b1c1e]/95 px-3 py-3 backdrop-blur sm:-mx-5 sm:px-5">
      <div className="no-scrollbar bsl-pill flex gap-1 overflow-x-auto rounded-full p-1.5">
        <Link href="/sports?filter=cricket" className="flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white transition hover:bg-white/15"><span>🏏</span>CRICKET</Link>
        {GAME_CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <Link key={cat.id} href={`/${cat.id}`} className={cn("flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-black transition", isActive ? "bsl-pill-active" : "text-[#e7e1cf] hover:bg-white/10 hover:text-white")}>
              <span className="text-sm">{cat.emoji}</span><span>{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
