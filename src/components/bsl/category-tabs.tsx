"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GAME_CATEGORIES } from "@/lib/catalog";

interface CategoryTabsProps { active?: string; }

export function CategoryTabs({ active }: CategoryTabsProps) {
  const pathname = usePathname();

  const isActive = (id: string, href: string) => {
    if (active) return active === id;
    const base = href.split("?")[0];
    return pathname === base || (base !== "/" && pathname.startsWith(base));
  };

  return (
    <div className="sticky top-[72px] z-20 -mx-3 border-b border-[#2a2c30] bg-[#111315]/95 px-3 py-2 backdrop-blur sm:-mx-5 sm:px-5">
      <div className="no-scrollbar flex gap-1 overflow-x-auto">
        {/* Cricket first — always highlighted */}
        <Link
          href="/sports?filter=cricket"
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black transition whitespace-nowrap",
            isActive("cricket", "/sports?filter=cricket")
              ? "bg-gradient-to-b from-[#ffdf19] to-[#f4a700] text-[#241a05] shadow-[0_2px_10px_rgba(255,223,25,0.3)]"
              : "text-[#c0b980] hover:bg-white/10 hover:text-white"
          )}
        >
          <span className="text-sm">🏏</span>
          CRICKET
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse" />
        </Link>

        {GAME_CATEGORIES.map((cat) => {
          const href = `/${cat.id}`;
          const active_cat = isActive(cat.id, href);
          return (
            <Link
              key={cat.id}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black transition whitespace-nowrap",
                active_cat
                  ? "bg-gradient-to-b from-[#ffdf19] to-[#f4a700] text-[#241a05] shadow-[0_2px_10px_rgba(255,223,25,0.3)]"
                  : "text-[#c0b980] hover:bg-white/10 hover:text-white"
              )}
            >
              <span className="text-sm">{cat.emoji}</span>
              {cat.label.toUpperCase()}
              {cat.id === "sports" && (
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
