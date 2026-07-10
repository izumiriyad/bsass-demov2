"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Wallet, Gift, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";

const NAV_ITEMS = [
  { href: "/", label: "Home", bn: "হোম", icon: Home },
  { href: "/sports", label: "Sports", bn: "স্পোর্টস", icon: Trophy },
  { href: "/promotions", label: "Offers", bn: "অফার", icon: Gift, notification: true },
  { href: "/dashboard", label: "Account", bn: "একাউন্ট", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { openModal } = useModal();

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#2a2c30] bg-[#1b1c1e]/97 px-1 pt-1 pb-safe backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 4px)" }}
      aria-label="Mobile bottom navigation"
    >
      <div className="grid grid-cols-5 gap-0.5 items-end">
        {/* First 2 items */}
        {NAV_ITEMS.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg py-2 text-[10px] font-bold transition-all duration-150 active:scale-90",
                active ? "text-[#ffdf19]" : "text-[#9ca3af] hover:text-[#d8d2bf]"
              )}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[#ffdf19]" />
                )}
              </div>
              <span className="mt-0.5 leading-none">{item.label}</span>
            </Link>
          );
        })}

        {/* Center Deposit CTA */}
        <div className="relative -mt-5 flex flex-col items-center">
          <div className="absolute inset-0 z-0 animate-[spin_4s_linear_infinite] rounded-full bg-gradient-to-tr from-[#ffdf19] via-transparent to-[#008d5b] blur-md opacity-70" />
          <button
            onClick={() => (user ? openModal("deposit") : openModal("login"))}
            className="relative z-10 flex flex-col items-center gap-0.5 rounded-2xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] p-3.5 text-[10px] font-black text-[#241a05] shadow-[0_4px_20px_rgba(255,223,25,0.6)] transition-all hover:scale-105 active:scale-95 border-b-[3px] border-[#c28400]"
            aria-label="Deposit"
          >
            <div className="relative">
              <Wallet size={24} strokeWidth={2.5} className="animate-pulse" />
              <span className="absolute -right-1.5 -top-1.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
            </div>
            <span className="mt-1 leading-none tracking-tight">Deposit</span>
          </button>
        </div>

        {/* Last 2 items */}
        {NAV_ITEMS.slice(2).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const handleClick = item.href === "/dashboard" && !user
            ? (e: React.MouseEvent) => { e.preventDefault(); openModal("login"); }
            : undefined;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleClick}
              className={cn(
                "relative flex flex-col items-center gap-0.5 rounded-lg py-2 text-[10px] font-bold transition-all duration-150 active:scale-90",
                active ? "text-[#ffdf19]" : "text-[#9ca3af] hover:text-[#d8d2bf]"
              )}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {item.notification && !user && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#ef4444] border-2 border-[#1b1c1e]" />
                )}
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[#ffdf19]" />
                )}
              </div>
              <span className="mt-0.5 leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
