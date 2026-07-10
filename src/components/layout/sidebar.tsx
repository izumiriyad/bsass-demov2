"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
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
  { id: "sports", label: "Sports", bn: "স্পোর্টস", emoji: "⚽", href: "/sports" },
  { id: "casino", label: "Casino", bn: "ক্যাসিনো", emoji: "🃏", href: "/casino" },
  { id: "slots", label: "Slots", bn: "স্লট", emoji: "🎰", href: "/slots" },
  { id: "crash", label: "Crash", bn: "ক্র্যাশ", emoji: "🚀", href: "/crash" },
  { id: "fishing", label: "Fishing", bn: "মাছ ধরা", emoji: "🎣", href: "/fishing" },
  { id: "cockfighting", label: "Cockfighting", bn: "মোরগ লড়াই", emoji: "🐓", href: "/cockfighting" },
  { id: "promotions", label: "Promotions", bn: "প্রোমোশন", emoji: "🎁", href: "/promotions" },
  { id: "verify-agent", label: "Verify Agent", bn: "এজেন্ট যাচাই", emoji: "🛡️", href: "/verify-agent" },
  { id: "vip", label: "VIP", bn: "ভিআইপি", emoji: "👑", href: "/vip" },
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

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    return pathname === base || pathname.startsWith(base + "/");
  };

  const rowClass = (active: boolean) => cn("group flex items-center gap-3 px-4 py-[11px] text-[14px] font-extrabold transition", collapsed && "justify-center px-0", active ? "bg-[#ffdf19]/10 text-[#ffdf19]" : "text-[#f2f0e8] hover:bg-white/[0.06]");

  const sidebarContent = (
    <div className="bsl-sidebar flex h-full flex-col text-[#f5f2e8]">
      <div className="border-b border-black/20 px-3 py-3">
        {!collapsed && <Link href="/" className="mb-3 flex items-center gap-2 rounded-lg bg-black/10 p-2 transition hover:bg-black/20"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#008d5b] text-xl font-black text-white">BSL</div><div className="min-w-0"><p className="truncate text-[16px] font-black text-[#ffdf19]">BSL Gaming</p><p className="truncate text-[11px] font-bold text-[#cfcab9]">Bangladesh Betting Platform</p></div></Link>}
        <div className={cn("grid gap-2", collapsed ? "grid-cols-1" : "grid-cols-2")}>{QUICK.map((q) => <Link key={q.label} href={q.href} className="bsl-pill flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs font-black text-white transition hover:brightness-110"><span>{q.emoji}</span>{!collapsed && q.label}</Link>)}</div>
      </div>
      <div className={cn("flex items-center border-b border-black/20 px-4 py-3", collapsed && "justify-center px-0")}>{!collapsed && <span className="mr-auto text-sm font-medium text-[#d7d2c2]">{theme === "dark" ? "Dark" : "Light"}</span>}<button onClick={toggleTheme} className="flex h-7 w-12 items-center rounded-full bg-black/30 p-1 transition hover:bg-black/45" aria-label="Toggle theme"><span className={cn("flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#2b281f] transition", theme === "light" && "translate-x-5")}>{theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}</span></button></div>
      <nav className="no-scrollbar flex-1 overflow-y-auto py-2">
        <Link href="/" className={rowClass(pathname === "/")}><span className="text-lg">🏠</span>{!collapsed && <span>Home <span className="ml-1 text-xs text-[#a9a391]">হোম</span></span>}</Link>
        {GAME_CATEGORIES.map((cat) => {
          const href = `/${cat.id}`; const active = isActive(href); const hasSubmenu = !!SUBMENU_MAP[cat.id]; const isExpanded = expanded === cat.id; const showLiveDot = cat.id === "sports";
          return <div key={cat.id}><div className={rowClass(active)} onClick={() => hasSubmenu && !collapsed && setExpanded(isExpanded ? null : cat.id)}><Link href={href} className="flex min-w-0 flex-1 items-center gap-3" onClick={(e) => { if (hasSubmenu && !collapsed) e.preventDefault(); }}><span className="text-lg drop-shadow" style={{ color: cat.color }}>{cat.emoji}</span>{!collapsed && <span className="truncate">{cat.label} <span className="ml-1 text-xs text-[#a9a391]">{bnLabel[cat.id]}</span></span>}{!collapsed && showLiveDot && <span className="live-dot live-dot-pulse" />}</Link>{!collapsed && hasSubmenu && <span className={cn("text-lg text-[#d8d2bf] transition-transform", isExpanded && "rotate-180")}>⌄</span>}</div>{!collapsed && hasSubmenu && isExpanded && <div className="ml-7 border-l border-white/10 py-1">{SUBMENU_MAP[cat.id].map((sub) => <Link key={sub.href} href={sub.href} className="block px-5 py-1.5 text-xs font-semibold text-[#aaa496] transition hover:text-white">{sub.label} <span className="ml-1 text-[#777369]">{sub.bn}</span></Link>)}</div>}</div>;
        })}
      </nav>
      <div className="border-t border-black/20 py-2">{EXTRA_ITEMS.map((item) => <Link key={item.id} href={item.href} className={rowClass(isActive(item.href))}><span className="text-lg">{item.emoji}</span>{!collapsed && <span>{item.label} <span className="ml-1 text-xs text-[#a9a391]">{item.bn}</span></span>}</Link>)}</div>
    </div>
  );
  return <><aside className={cn("fixed left-0 top-0 z-40 h-full border-r border-black/25 transition-all duration-300", collapsed ? "w-[63px]" : "w-[260px]")}><div className="hidden h-full lg:block">{sidebarContent}</div></aside>{mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setMobileOpen(false)} /><div className="absolute left-0 top-0 h-full w-[260px] animate-slide-in-left">{sidebarContent}</div></div>}</>;
}
