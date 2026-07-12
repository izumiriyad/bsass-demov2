"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: "🏠", label: "Home",    href: "/",           live: false },
  { icon: "⚽", label: "Sports",  href: "/sports",     live: true  },
  { icon: "🎰", label: "Slots",   href: "/slots",      live: false },
  { icon: "🎁", label: "Promos",  href: "/promotions", live: false },
  { icon: "👤", label: "Account", href: "/dashboard",  isAccount: true },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { openModal } = useModal();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: "linear-gradient(180deg, #1a1c22 0%, #121315 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-1.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);

          if (item.isAccount) {
            return (
              <button
                key={item.label}
                onClick={() => user ? window.location.assign("/dashboard") : openModal("login")}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 min-w-[52px] transition-all active:scale-90"
              >
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-black transition-all",
                  active ? "bg-[#ffdf19] text-[#241a05] shadow-[0_0_12px_rgba(255,223,25,0.5)]" : "bg-[#2a2c30] text-[#9ca3af]"
                )}>
                  {user ? user.username.charAt(0).toUpperCase() : "👤"}
                </div>
                <span className={cn("text-[9px] font-black leading-none", active ? "text-[#ffdf19]" : "text-[#6b7280]")}>
                  {user ? "Account" : "Login"}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 min-w-[52px] transition-all active:scale-90"
            >
              {active && (
                <div className="absolute inset-x-1 top-0 h-0.5 rounded-full bg-[#ffdf19] shadow-[0_0_8px_rgba(255,223,25,0.6)]" />
              )}
              <span className={cn(
                "text-xl leading-none transition-all",
                active ? "scale-110 drop-shadow-[0_0_6px_rgba(255,223,25,0.6)]" : "opacity-60"
              )}>
                {item.icon}
              </span>
              {item.live && !active && (
                <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse" />
              )}
              <span className={cn(
                "text-[9px] font-black leading-none",
                active ? "text-[#ffdf19]" : "text-[#6b7280]"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
