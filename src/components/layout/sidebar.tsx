"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, Home, LogIn } from "lucide-react";
import { useSidebar } from "./sidebar-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { cn } from "@/lib/utils";

/* ─── bj88-style icon tile data ─── */
const GAME_TILES = [
  { id: "popular",   icon: "✦",  label: "POPULAR",   href: "/popular" },
  { id: "sports",    icon: "⚽", label: "SPORTS",    href: "/sports",      live: true },
  { id: "cockfight", icon: "🐓", label: "COCKFIGHT", href: "/cockfighting" },
  { id: "slots",     icon: "🎰", label: "SLOTS",     href: "/slots" },
  { id: "casino",    icon: "♠️", label: "CASINO",    href: "/casino" },
  { id: "table",     icon: "🎲", label: "TABLE",     href: "/table" },
  { id: "fishing",   icon: "🎣", label: "FISHING",   href: "/fishing" },
  { id: "lottery",   icon: "🎟️", label: "LOTTERY",   href: "/lottery" },
  { id: "arcade",    icon: "🕹️", label: "ARCADE",    href: "/arcade" },
  { id: "crash",     icon: "🚀", label: "CRASH",     href: "/crash" },
];

const EXTRA_TILES = [
  { id: "promotions",  icon: "🎁", label: "Promotions",         href: "/promotions" },
  { id: "vip",         icon: "👑", label: "VIP Club",           href: "/vip" },
  { id: "tournaments", icon: "🏆", label: "Tournaments",        href: "/tournaments" },
  { id: "winners",     icon: "💰", label: "Winner Board",       href: "/winners" },
  { id: "leaderboard", icon: "🏅", label: "Leaderboard",        href: "/leaderboard" },
  { id: "forum",       icon: "💬", label: "Forum",              href: "/forum" },
  { id: "download",    icon: "📲", label: "Download",           href: "/app-download" },
  { id: "affiliate",   icon: "🤝", label: "Affiliate",          href: "/affiliate" },
  { id: "ambassador",  icon: "🌟", label: "Ambassador",         href: "/ambassador" },
  { id: "referral",    icon: "👥", label: "Referral\nProgram",  href: "/referral" },
  { id: "help",        icon: "ℹ️", label: "Help Page",          href: "/help" },
];

/* ─── Desktop nav items (icon + label rows) ─── */
const DESKTOP_NAV = [
  { icon: "🏠", label: "Home",         href: "/" },
  { icon: "⭐", label: "Popular",       href: "/popular" },
  { icon: "⚽", label: "Sports",        href: "/sports",       live: true },
  { icon: "🐓", label: "Cockfighting",  href: "/cockfighting" },
  { icon: "🎰", label: "Slots",         href: "/slots" },
  { icon: "♠️", label: "Casino",        href: "/casino" },
  { icon: "🎲", label: "Table",         href: "/table" },
  { icon: "🎣", label: "Fishing",       href: "/fishing" },
  { icon: "🎟️", label: "Lottery",       href: "/lottery" },
  { icon: "🕹️", label: "Arcade",        href: "/arcade" },
  { icon: "🚀", label: "Crash",         href: "/crash" },
  { icon: "🎁", label: "Promotions",    href: "/promotions" },
  { icon: "👑", label: "VIP Club",      href: "/vip" },
  { icon: "🏆", label: "Tournaments",   href: "/tournaments" },
  { icon: "💰", label: "Winner Board",  href: "/winners" },
  { icon: "🏅", label: "Leaderboard",   href: "/leaderboard" },
  { icon: "💬", label: "Forum",         href: "/forum" },
  { icon: "📲", label: "Download",      href: "/app-download" },
  { icon: "🤝", label: "Affiliate",     href: "/affiliate" },
  { icon: "🌟", label: "Ambassador",    href: "/ambassador" },
  { icon: "💸", label: "Cashback",      href: "/cashback" },
  { icon: "🧧", label: "Red Envelope",  href: "/red-envelope" },
  { icon: "💬", label: "Live Chat",     href: "/live-chat" },
];

/* ─── Shared icon button for tiles ─── */
function Tile({ icon, label, href, onClick, active, live }: {
  icon: string; label: string; href?: string; onClick?: () => void;
  active?: boolean; live?: boolean;
}) {
  const cls = cn(
    "relative flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 min-h-[72px] transition-all active:scale-95 cursor-pointer select-none",
    active
      ? "border-[#ffdf19]/60 bg-[#ffdf19]/10"
      : "border-[#2e2f33] bg-[#1e2026] hover:border-[#ffdf19]/30 hover:bg-[#262830]"
  );

  const content = (
    <>
      {live && (
        <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
          <span className="absolute h-full w-full animate-ping rounded-full bg-[#ef4444] opacity-75" />
          <span className="relative h-2 w-2 rounded-full bg-[#ef4444]" />
        </span>
      )}
      <span
        className={cn(
          "text-xl leading-none transition-transform group-hover:scale-110",
          active ? "text-[#ffdf19]" : "text-[#c8a800]"
        )}
        style={{ filter: active ? "drop-shadow(0 0 6px #ffdf1988)" : "none" }}
      >
        {icon}
      </span>
      <span className={cn(
        "text-center text-[10px] font-black leading-tight tracking-wide whitespace-pre-line",
        active ? "text-[#ffdf19]" : "text-[#c0b980]"
      )}>
        {label}
      </span>
    </>
  );

  if (href) return <Link href={href} className={cn("group", cls)}>{content}</Link>;
  return <button type="button" onClick={onClick} className={cn("group", cls)}>{content}</button>;
}

export function Sidebar() {
  const pathname  = usePathname();
  const router    = useRouter();
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();
  const { user }        = useAuth();
  const { openModal }   = useModal();

  // Auto-close on route change
  useEffect(() => { setMobileOpen(false); }, [pathname, setMobileOpen]);

  // Lock body scroll on mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    return pathname === base || (base !== "/" && pathname.startsWith(base));
  };

  /* ═══════════════════════════ MOBILE DRAWER ═══════════════════════════ */
  const MobileDrawer = (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="absolute left-0 top-0 h-full w-[320px] max-w-[88vw] flex flex-col overflow-hidden animate-slide-in-left"
        style={{ background: "linear-gradient(180deg, #16181d 0%, #1a1c22 100%)" }}
      >
        {/* ─ Header row ─ */}
        <div className="flex items-center justify-between px-4 pt-5 pb-4 flex-shrink-0 border-b border-[#2a2c30]">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
            {/* bj88-style logo badge */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#008d5b] to-[#004d32] shadow-lg">
              <span className="text-base font-black text-white">BSL</span>
            </div>
            <div>
              <p className="text-base font-black text-white leading-tight">Hi Welcome</p>
              <p className="text-[10px] text-[#9ca3af]">Bangladesh #1 Platform</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#9ca3af] hover:bg-white/10 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="no-scrollbar flex-1 overflow-y-auto">

          {/* ─ Login / Sign Up row (yellow, bj88 exact) ─ */}
          {!user && (
            <div className="mx-4 mt-4 flex gap-2">
              <button
                onClick={() => { openModal("login"); setMobileOpen(false); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3.5 text-sm font-black text-[#241a05] shadow-[0_4px_15px_rgba(255,223,25,0.3)] border-b-[3px] border-[#c28400] transition hover:brightness-110 active:scale-[.98]"
              >
                <LogIn size={16} />
                LOGIN
              </button>
              <button
                onClick={() => { openModal("register"); setMobileOpen(false); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#242628] border border-[#3a3c42] py-3.5 text-sm font-black text-white transition hover:bg-[#2d2f35] active:scale-[.98]"
              >
                SIGN UP
              </button>
            </div>
          )}

          {/* ─ Logged in: Balance row ─ */}
          {user && (
            <div
              className="mx-4 mt-4 flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#f4a700] p-3 cursor-pointer"
              onClick={() => { router.push("/dashboard"); setMobileOpen(false); }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-base font-black text-[#241a05]">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-black text-[#241a05]">{user.username}</p>
                <p className="text-sm font-black text-[#241a05]">৳ {user.balance.toLocaleString()}</p>
              </div>
              <span className="ml-auto text-[10px] font-black text-[#241a05] opacity-60">Main Wallet</span>
            </div>
          )}

          {/* ─ Logged in: Quick Deposit/Withdraw ─ */}
          {user && (
            <div className="mx-4 mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => { openModal("deposit"); setMobileOpen(false); }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#008d5b] py-2.5 text-xs font-black text-white border-b-[2px] border-[#005c3c] hover:brightness-110 transition active:scale-95"
              >
                💳 Deposit
              </button>
              <button
                onClick={() => { router.push("/withdraw"); setMobileOpen(false); }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] py-2.5 text-xs font-black text-white hover:bg-[#242628] transition active:scale-95"
              >
                🏦 Withdraw
              </button>
            </div>
          )}

          {/* ─ Sponsor bar (BD Cricket Board partner style) ─ */}
          <div className="mx-4 mt-3 flex items-center gap-3 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#c8102e] to-[#8b0d22] text-xl font-black text-white shadow-md flex-shrink-0">
              🏏
            </div>
            <div>
              <p className="text-xs font-black text-[#ffdf19] leading-tight">OFFICIAL PARTNER</p>
              <p className="text-xs text-white font-bold">Bangladesh Cricket Board</p>
              <p className="text-[10px] text-[#9ca3af]">Official Betting Partner</p>
            </div>
          </div>

          {/* ─ Game Category Tiles (bj88 3-col grid) ─ */}
          <div className="px-4 mt-3">
            <div className="grid grid-cols-3 gap-2">
              {GAME_TILES.map((tile) => (
                <Tile
                  key={tile.id}
                  icon={tile.icon}
                  label={tile.label}
                  href={tile.href}
                  active={isActive(tile.href)}
                  live={tile.live}
                />
              ))}
            </div>
          </div>

          {/* ─ Divider ─ */}
          <div className="mx-4 my-3 h-px bg-[#2a2c30]" />

          {/* ─ Extra tiles (promotions, VIP, etc.) ─ */}
          <div className="px-4 mb-3">
            <div className="grid grid-cols-3 gap-2">
              {EXTRA_TILES.map((tile) => (
                <Tile
                  key={tile.id}
                  icon={tile.icon}
                  label={tile.label}
                  href={tile.href}
                  active={isActive(tile.href)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─ Bottom bar: Home | Login (bj88 exact) ─ */}
        <div className="flex-shrink-0 border-t border-[#2a2c30] bg-[#16181d]">
          <div className="flex">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 py-4 text-sm font-black transition",
                pathname === "/" ? "text-[#ffdf19]" : "text-[#9ca3af] hover:text-white"
              )}
            >
              <Home size={18} />
              Home
            </Link>
            <div className="w-px bg-[#2a2c30]" />
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-black text-[#9ca3af] hover:text-white transition"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008d5b] text-[10px] font-black text-white">
                  {user.username.charAt(0).toUpperCase()}
                </span>
                Account
              </Link>
            ) : (
              <button
                onClick={() => { openModal("login"); setMobileOpen(false); }}
                className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-black text-[#9ca3af] hover:text-white transition"
              >
                <LogIn size={18} />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════ DESKTOP SIDEBAR ═══════════════════════════ */
  const DesktopSidebar = (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full border-r border-black/30 transition-all duration-300 hidden lg:flex flex-col",
        collapsed ? "w-[64px]" : "w-[220px]"
      )}
      style={{ background: "linear-gradient(180deg, #16181d 0%, #1a1c22 100%)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-black/30 px-3 py-4 flex-shrink-0">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#008d5b] to-[#004d32] text-xs font-black text-white shadow-lg">
          BSL
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">BSL Gaming</p>
            <p className="truncate text-[9px] text-[#9ca3af]">BD #1 Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="no-scrollbar flex-1 overflow-y-auto py-2">
        {DESKTOP_NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold transition-all duration-150",
                collapsed && "justify-center px-0",
                active
                  ? "bg-[#ffdf19]/10 text-[#ffdf19] border-l-2 border-[#ffdf19]"
                  : "text-[#9ca3af] hover:bg-white/5 hover:text-white border-l-2 border-transparent"
              )}
            >
              <span
                className={cn(
                  "text-lg flex-shrink-0 transition-transform group-hover:scale-110",
                  active ? "text-[#ffdf19]" : "text-[#c8a800]"
                )}
                style={{ filter: active ? "drop-shadow(0 0 5px #ffdf1966)" : undefined }}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span className="truncate flex-1">{item.label}</span>
              )}
              {!collapsed && item.live && (
                <span className="flex h-2 w-2 flex-shrink-0">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#ef4444] opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-[#ef4444]" />
                </span>
              )}
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="pointer-events-none absolute left-14 z-50 hidden whitespace-nowrap rounded-lg border border-[#2a2c30] bg-[#1b1c1e] px-2.5 py-1.5 text-xs font-bold text-white shadow-xl group-hover:block">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: auth buttons */}
      {!collapsed && (
        <div className="flex-shrink-0 border-t border-black/30 p-3 space-y-2">
          {!user ? (
            <>
              <button
                onClick={() => openModal("login")}
                className="w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-2.5 text-xs font-black text-[#241a05] border-b-[2px] border-[#c28400] transition hover:brightness-110"
              >
                LOGIN
              </button>
              <button
                onClick={() => openModal("register")}
                className="w-full rounded-xl border border-[#3a3c42] bg-[#242628] py-2.5 text-xs font-black text-white transition hover:bg-[#2d2f35]"
              >
                SIGN UP
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-2.5 hover:border-[#ffdf19]/30 transition"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#008d5b] text-xs font-black text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-black text-white">{user.username}</p>
                  <p className="text-[10px] text-[#ffdf19] font-bold">৳ {user.balance.toLocaleString()}</p>
                </div>
              </Link>
              <button
                onClick={() => openModal("deposit")}
                className="w-full rounded-xl bg-[#008d5b] py-2 text-xs font-black text-white border-b-[2px] border-[#005c3c] hover:brightness-110 transition"
              >
                💳 Deposit Now
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );

  return (
    <>
      {DesktopSidebar}
      {mobileOpen && MobileDrawer}
    </>
  );
}
