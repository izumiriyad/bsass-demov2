"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Wallet, Gift, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/sports", label: "Sports", icon: Trophy },
  { href: "/promotions", label: "Offers", icon: Gift },
  { href: "/dashboard", label: "Account", icon: User, notification: true },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { openModal } = useModal();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#2a2c30] bg-[#1b1c1e]/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur lg:hidden" aria-label="Mobile bottom navigation">
      <div className="grid grid-cols-5 gap-1">
        {items.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return <Link key={item.href} href={item.href} className={cn("flex flex-col items-center gap-0.5 rounded-lg py-2 text-[10px] font-bold transition-transform active:scale-95", active ? "text-[#ffdf19]" : "text-[#9ca3af]")}><Icon size={19} /><span>{item.label}</span></Link>;
        })}
        <button onClick={() => user ? openModal("deposit") : openModal("login")} className="-mt-5 flex flex-col items-center gap-0.5 rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] p-3 text-[10px] font-black text-[#241a05] shadow-[0_4px_15px_rgba(255,223,25,0.4)] transition-transform active:scale-95 animate-in slide-in-from-bottom-4">
          <div className="relative">
            <Wallet size={24} className="animate-pulse" />
            <span className="absolute -right-1 -top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
          </div>
          <span className="mt-1 leading-none tracking-tight">Deposit</span>
        </button>
        {items.slice(2).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} className={cn("relative flex flex-col items-center gap-0.5 rounded-lg py-2 text-[10px] font-bold transition-transform active:scale-95", active ? "text-[#ffdf19]" : "text-[#9ca3af]")}>
              <div className="relative">
                <Icon size={19} />
                {item.notification && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#ef4444] border-2 border-[#1b1c1e]" />
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
