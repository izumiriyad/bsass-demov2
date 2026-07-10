"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, X, ChevronDown } from "lucide-react";
import { GAME_CATEGORIES } from "@/lib/catalog";
import { useTheme } from "@/components/providers/theme-provider";
import { useSidebar } from "./sidebar-provider";
import { cn } from "@/lib/utils";

const QUICK = [
  { label: "Cricket", emoji: "🏏", href: "/sports?filter=cricket" },
  { label: "Casino", emoji: "♠️", href: "/casino" },
];

const EXTRA_ITEMS = [
  { id: "promotions", label: "Promotions", bn: "প্রোমোশন", emoji: "🎁", href: "/promotions" },
  { id: "exchange", label: "Exchange", bn: "এক্সচেঞ্জ", emoji: "📊", href: "/exchange" },
  { id: "vip", label: "VIP Club", bn: "ভিআইপি", emoji: "👑", href: "/vip" },
  { id: "rewards", label: "Rewards", bn: "রিওয়ার্ড", emoji: "🎯", href: "/rewards" },
  { id: "lucky-spin", label: "Lucky Spin", bn: "লাকি স্পিন", emoji: "🎡", href: "/lucky-spin" },
  { id: "checkin", label: "Daily Check-in", bn: "চেক-ইন", emoji: "📅", href: "/daily-check-in" },
  { id: "envelope", label: "Red Envelope", bn: "রেড এনভেলপ", emoji: "🧧", href: "/red-envelope" },
  { id: "cashback", label: "Cashback", bn: "ক্যাশব্যাক", emoji: "💸", href: "/cashback" },
  { id: "tournaments", label: "Tournaments", bn: "টুর্নামেন্ট", emoji: "🏅", href: "/tournaments" },
  { id: "verify-agent", label: "Verify Agent", bn: "এজেন্ট যাচাই", emoji: "🛡️", href: "/verify-agent" },
  { id: "affiliate", label: "Affiliate", bn: "অ্যাফিলিয়েট", emoji: "🤝", href: "/affiliate" },
  { id: "livechat", label: "Live Chat", bn: "লাইভ চ্যাট", emoji: "💬", href: "/live-chat" },
];

const SUBMENU_MAP: Record<string, { label: string; bn: string; href: string }[]> = {
  sports: [
    { label: "Live Betting", bn: "লাইভ বাজি", href: "/sports?filter=live" },
    { label: "Cricket", bn: "ক্রিকেট", href: "/sports?filter=cricket" },
    { label: "Football", bn: "ফুটবল", href: "/sports?filter=football" },
    { label: "Tennis", bn: "টেনিস", href: "/sports?filter=tennis" },
    { label: "Kabaddi", bn: "কাবাডি", href: "/sports?filter=kabaddi" },
    { label: "Esports", bn: "ই-স্পোর্টস", href: "/sports?filter=esports" },
  ],
  cockfighting: [
    { label: "Live Stream", bn: "লাইভ স্ট্রিম", href: "/cockfighting?filter=live" },
    { label: "Derby", bn: "ডার্বি", href: "/cockfighting?filter=derby" },
    { label: "Results", bn: "রেজাল্ট", href: "/cockfighting?filter=results" },
  ],
  slots: [
    { label: "JILI", bn: "জিলি", href: "/slots?provider=jili" },
    { label: "Pragmatic Play", bn: "প্র্যাগম্যাটিক", href: "/slots?provider=pragmatic" },
    { label: "PG Soft", bn: "পিজি সফট", href: "/slots?provider=pgsoft" },
    { label: "Jackpot", bn: "জ্যাকপট", href: "/slots?filter=jackpot" },
  ],
  casino: [
    { label: "Live Casino", bn: "লাইভ ক্যাসিনো", href: "/casino?filter=live" },
    { label: "Baccarat", bn: "ব্যাকারাট", href: "/casino?filter=baccarat" },
    { label: "Roulette", bn: "রুলেট", href: "/casino?filter=roulette" },
    { label: "Blackjack", bn: "ব্ল্যাকজ্যাক", href: "/casino?filter=blackjack" },
  ],
  table: [
    { label: "Card Games", bn: "কার্ড গেম", href: "/table?filter=cards" },
    { label: "Board Games", bn: "বোর্ড গেম", href: "/table?filter=board" },
  ],
  fishing: [
    { label: "JILI Fishing", bn: "জিলি ফিশিং", href: "/fishing?provider=jili" },
    { label: "Fish Hunter", bn: "ফিশ হান্টার", href: "/fishing?filter=hunter" },
  ],
  lottery: [
    { label: "Keno", bn: "কেনো", href: "/lottery?filter=keno" },
    { label: "Number Draw", bn: "নম্বর ড্র", href: "/lottery?filter=draw" },
  ],
  arcade: [
    { label: "Instant Win", bn: "ইনস্ট্যান্ট উইন", href: "/arcade?filter=instant" },
    { label: "Casual", bn: "ক্যাজুয়াল", href: "/arcade?filter=casual" },
  ],
  crash: [
    { label: "Aviator", bn: "এভিয়েটর", href: "/crash?filter=aviator" },
    { label: "Multiplier", bn: "মাল্টিপ্লায়ার", href: "/crash?filter=multiplier" },
  ],
};

const bnLabel: Record<string, string> = {
  popular: "জনপ্রিয়", sports: "স্পোর্টস", cockfighting: "মোরগ লড়াই", slots: "স্লট", casino: "ক্যাসিনো", table: "টেবিল", fishing: "ফিশিং", lottery: "লটারি", arcade: "আর্কেড", crash: "ক্র্যাশ",
};

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle, mobileOpen, setMobileOpen } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Auto-close mobile sidebar whenever route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    return pathname === base || pathname.startsWith(base + "/");
  };

  const rowClass = (active: boolean) =>
    cn(
      "group flex items-center gap-3 px-4 py-[11px] text-[14px] font-extrabold transition-all duration-150 cursor-pointer",
      collapsed && "justify-center px-0",
      active
        ? "bg-[#ffdf19]/10 text-[#ffdf19] border-l-2 border-[#ffdf19]"
        : "text-[#f2f0e8] hover:bg-white/[0.06] border-l-2 border-transparent"
    );

  const sidebarContent = (
    <div className="bsl-sidebar flex h-full flex-col text-[#f5f2e8] overflow-hidden">
      {/* Logo & Quick Access */}
      <div className="border-b border-black/20 px-3 py-3 flex-shrink-0">
        {/* Mobile close button */}
        <div className="flex items-center justify-between mb-2 lg:hidden">
          <Link href="/" className="flex items-center gap-2 rounded-lg bg-black/10 p-1.5 transition hover:bg-black/20">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#008d5b] text-base font-black text-white">BSL</div>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-black text-[#ffdf19]">BSL Gaming</p>
              <p className="truncate text-[10px] font-bold text-[#cfcab9]">Bangladesh Betting Platform</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[#d8d5c7] hover:bg-white/10 transition"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Desktop logo */}
        {!collapsed && (
          <Link href="/" className="mb-3 hidden lg:flex items-center gap-2 rounded-lg bg-black/10 p-2 transition hover:bg-black/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#008d5b] text-xl font-black text-white">BSL</div>
            <div className="min-w-0">
              <p className="truncate text-[16px] font-black text-[#ffdf19]">BSL Gaming</p>
              <p className="truncate text-[11px] font-bold text-[#cfcab9]">Bangladesh Betting Platform</p>
            </div>
          </Link>
        )}

        <div className={cn("grid gap-2", collapsed ? "grid-cols-1" : "grid-cols-2")}>
          {QUICK.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="bsl-pill flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs font-black text-white transition hover:brightness-110"
            >
              <span>{q.emoji}</span>
              {!collapsed && q.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Theme toggle */}
      <div className={cn("flex items-center border-b border-black/20 px-4 py-3 flex-shrink-0", collapsed && "justify-center px-0")}>
        {!collapsed && <span className="mr-auto text-sm font-medium text-[#d7d2c2]">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>}
        <button
          onClick={toggleTheme}
          className="flex h-7 w-12 items-center rounded-full bg-black/30 p-1 transition hover:bg-black/45"
          aria-label="Toggle theme"
        >
          <span className={cn("flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#2b281f] transition-transform duration-300", theme === "light" && "translate-x-5")}>
            {theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="no-scrollbar flex-1 overflow-y-auto py-2">
        <Link href="/" className={rowClass(pathname === "/")}>
          <span className="text-lg">🏠</span>
          {!collapsed && <span>Home <span className="ml-1 text-xs text-[#a9a391]">হোম</span></span>}
        </Link>

        {GAME_CATEGORIES.map((cat) => {
          const href = `/${cat.id}`;
          const active = isActive(href);
          const hasSubmenu = !!SUBMENU_MAP[cat.id];
          const isExpanded = expanded === cat.id;
          const showLiveDot = cat.id === "sports";

          return (
            <div key={cat.id}>
              <div
                className={rowClass(active)}
                onClick={() => {
                  if (hasSubmenu && !collapsed) {
                    setExpanded(isExpanded ? null : cat.id);
                  }
                }}
              >
                <Link
                  href={href}
                  className="flex min-w-0 flex-1 items-center gap-3"
                  onClick={(e) => {
                    if (hasSubmenu && !collapsed) e.preventDefault();
                  }}
                >
                  <span className="text-lg drop-shadow flex-shrink-0" style={{ color: cat.color }}>{cat.emoji}</span>
                  {!collapsed && (
                    <span className="truncate">
                      {cat.label} <span className="ml-1 text-xs text-[#a9a391]">{bnLabel[cat.id]}</span>
                    </span>
                  )}
                  {!collapsed && showLiveDot && <span className="live-dot live-dot-pulse ml-auto flex-shrink-0" />}
                </Link>
                {!collapsed && hasSubmenu && (
                  <ChevronDown
                    size={14}
                    className={cn("text-[#d8d2bf] transition-transform duration-200 flex-shrink-0", isExpanded && "rotate-180")}
                  />
                )}
              </div>

              {!collapsed && hasSubmenu && isExpanded && (
                <div className="ml-7 border-l border-white/10 py-1 animate-in slide-in-from-top-2 duration-200">
                  {SUBMENU_MAP[cat.id].map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-5 py-1.5 text-xs font-semibold text-[#aaa496] transition hover:text-white hover:bg-white/5"
                    >
                      {sub.label} <span className="ml-1 text-[#777369]">{sub.bn}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Extra items */}
      <div className="border-t border-black/20 py-2 flex-shrink-0 max-h-[280px] overflow-y-auto no-scrollbar">
        {EXTRA_ITEMS.map((item) => (
          <Link key={`${item.id}-${item.href}`} href={item.href} className={rowClass(isActive(item.href))}>
            <span className="text-lg flex-shrink-0">{item.emoji}</span>
            {!collapsed && (
              <span className="truncate">
                {item.label} <span className="ml-1 text-xs text-[#a9a391]">{item.bn}</span>
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Promo card */}
      {!collapsed && (
        <div className="m-4 mt-auto rounded-xl border border-[#ffdf19]/20 bg-gradient-to-br from-[#1b1c1e] to-[#242628] p-4 text-center shadow-lg relative overflow-hidden flex-shrink-0">
          <div className="absolute -right-4 -top-4 opacity-10 text-6xl">🏏</div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#ffdf19]">Official Partner</p>
          <p className="mt-1 text-sm font-black text-white">Shakib Al Hasan</p>
          <div className="mt-2 text-[10px] text-[#9ca3af]">Play with the champion. Safe, secure, and licensed in BD.</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full border-r border-black/25 transition-all duration-300 hidden lg:block",
          collapsed ? "w-[63px]" : "w-[260px]"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-[280px] max-w-[85vw] animate-slide-in-left shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
