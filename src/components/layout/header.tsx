"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, Globe2, Menu, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { useSidebar } from "./sidebar-provider";
import { formatBDT, cn } from "@/lib/utils";

const LANGUAGES = ["EN", "বাংলা"];

export function Header() {
  const { user, signOut, refreshUser } = useAuth();
  const { toggle, setMobileOpen } = useSidebar();
  const { openModal } = useModal();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [balanceFlash, setBalanceFlash] = useState(false);

  useEffect(() => {
    if (!user) return;
    const start = window.setTimeout(() => setBalanceFlash(true), 0);
    const stop = window.setTimeout(() => setBalanceFlash(false), 900);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, [user?.balance, user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshUser();
    setBalanceFlash(true);
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await signOut();
    setMenuOpen(false);
    toast.success("নিরাপদে লগআউট সম্পন্ন হয়েছে");
    router.push("/");
  };

  const menuItems = [
    { label: "Dashboard", sub: "ড্যাশবোর্ড", href: "/dashboard" },
    { label: "Bet History", sub: "বাজির ইতিহাস", href: "/dashboard/history" },
    { label: "Transactions", sub: "লেনদেন", href: "/dashboard/transactions" },
    { label: "Deposit", sub: "জমা", action: () => { openModal("deposit"); setMenuOpen(false); } },
    { label: "Withdraw", sub: "উত্তোলন", action: () => { openModal("withdraw"); setMenuOpen(false); } },
    { label: "Profile", sub: "প্রোফাইল", href: "/dashboard/profile" },
  ];

  return (
    <header className="bsl-topbar fixed left-0 right-0 top-0 z-30 flex h-[72px] items-center px-3 sm:px-5">
      <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-lg text-[#d8d5c7] transition hover:bg-white/5 lg:hidden"><Menu size={22} /></button>
      <button onClick={toggle} aria-label="Toggle sidebar" className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[#d8d5c7] transition hover:bg-white/10 lg:flex"><ChevronDown className="rotate-90" size={20} /></button>

      <Link href="/" className="bsl-logo ml-2 flex items-end gap-1 text-[25px] font-black leading-none sm:text-[30px]" aria-label="BSL Gaming home">
        <span className="bsl-main">BSL</span><span className="bsl-sub">Gaming</span>
      </Link>
      <span className="ml-4 hidden rounded-full border border-[#ffdf19]/30 bg-[#ffdf19]/10 px-3 py-1 text-[11px] font-black uppercase text-[#ffdf19] md:inline-flex">Bangladesh • BDT</span>

      <label className="ml-5 hidden h-10 max-w-[380px] flex-1 items-center rounded-full border border-white/5 bg-black/20 px-4 text-[#858277] focus-within:border-[#ffdf19]/50 xl:flex">
        <Search size={16} />
        <input className="w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#858277]" placeholder="Search cricket, football, casino, slots..." onKeyDown={(e) => { if (e.key === "Enter") router.push(`/games?search=${encodeURIComponent((e.target as HTMLInputElement).value)}`); }} />
      </label>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {!user ? (
          <>
            <button onClick={() => openModal("login")} className="rounded-lg bg-gradient-to-b from-[#ffdf19] to-[#f5a400] px-5 py-2.5 text-sm font-bold text-[#241a05] shadow-lg transition hover:brightness-110 active:scale-[.98]">Login</button>
            <button onClick={() => openModal("register")} className="hidden rounded-lg bg-[#4a4840] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#5a574e] sm:block">Sign up</button>
          </>
        ) : (
          <>
            <div className={cn("hidden items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 transition sm:flex", balanceFlash && "ring-2 ring-[#22c55e]/60")}>
              <span className="flex h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_12px_#22c55e]" title="Live balance" />
              <span className="text-sm font-black text-[#ffdf19]">{formatBDT(user.balance)}</span>
              <button onClick={handleRefresh} aria-label="Refresh balance" className="text-[#aaa79c] hover:text-white"><RefreshCw size={14} className={cn(refreshing && "animate-spin")} /></button>
            </div>
            <button onClick={() => openModal("deposit")} className="rounded-lg bg-gradient-to-b from-[#ffdf19] to-[#f5a400] px-4 py-2 text-sm font-bold text-[#241a05]">Deposit</button>
            <Link href="/dashboard/notifications" aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#d8d5c7] transition hover:bg-white/10"><Bell size={18} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef4444]" /></Link>
            <div className="relative">
              <button onClick={() => setMenuOpen((o) => !o)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#008d5b] text-sm font-bold text-white ring-1 ring-white/10">{user.username.charAt(0).toUpperCase()}</button>
              {menuOpen && <><div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} /><div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-[#35342e] bg-[#1b1c1e] shadow-2xl">
                <div className="border-b border-[#2a2c30] px-4 py-3"><p className="flex items-center gap-1.5 text-sm font-bold text-[#f0f0f0]">{user.username} <span className="flex items-center gap-1 rounded bg-[#22c55e]/20 px-1.5 py-0.5 text-[9px] font-black uppercase text-[#22c55e]">✓ Verified</span></p><p className="truncate text-xs text-[#8c8a80]">{user.email}</p></div>
                {menuItems.map((item) => item.href ? <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm text-[#bdb9ab] transition hover:bg-[#242628] hover:text-white"><span className="font-semibold">{item.label}</span><span className="ml-2 text-xs text-[#777369]">{item.sub}</span></Link> : <button key={item.label} onClick={item.action} className="block w-full px-4 py-2.5 text-left text-sm text-[#bdb9ab] transition hover:bg-[#242628] hover:text-white"><span className="font-semibold">{item.label}</span><span className="ml-2 text-xs text-[#777369]">{item.sub}</span></button>)}
                <button onClick={handleLogout} className="block w-full border-t border-[#2a2c30] px-4 py-2.5 text-left text-sm font-semibold text-[#ef4444] transition hover:bg-[#242628]">Logout <span className="ml-2 text-xs">লগআউট</span></button>
              </div></>}
            </div>
          </>
        )}
        <div className="relative">
          <button onClick={() => setLangOpen((o) => !o)} className="flex h-10 items-center gap-1 rounded-lg bg-white/5 px-2 text-xs font-bold text-[#d8d5c7] transition hover:bg-white/10" aria-label="Select language"><Globe2 size={16} /><span className="hidden sm:inline">EN</span></button>
          {langOpen && <><div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} /><div className="absolute right-0 top-12 z-50 w-28 overflow-hidden rounded-lg border border-[#35342e] bg-[#1b1c1e] py-1 shadow-2xl">{LANGUAGES.map((l) => <button key={l} onClick={() => { setLangOpen(false); toast.info(`${l} selected`); }} className="block w-full px-3 py-2 text-left text-xs font-semibold text-[#d8d5c7] hover:bg-[#242628]">{l}</button>)}</div></>}
        </div>
      </div>
    </header>
  );
}
