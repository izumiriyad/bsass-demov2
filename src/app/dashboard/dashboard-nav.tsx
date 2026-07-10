"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Wallet, History, Heart, Bell, Shield, ReceiptText, BadgeCheck, Hand, BarChart3, LifeBuoy } from "lucide-react";
import { cn, formatBDT } from "@/lib/utils";
import type { AuthUser } from "@/lib/auth";

interface DashboardNavProps {
  user: AuthUser;
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Profile", icon: User },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/history", label: "Bet History", icon: History },
  { href: "/dashboard/transactions", label: "Transactions", icon: ReceiptText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/tickets", label: "Tickets", icon: LifeBuoy },
  { href: "/dashboard/verification", label: "Verification", icon: BadgeCheck },
  { href: "/dashboard/limits", label: "Limits", icon: Hand },
  { href: "/dashboard/security", label: "Security", icon: Shield },
];

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-60">
      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
        <div className="mb-4 rounded-lg bg-[#121315] p-3">
          <p className="text-xs text-[#9ca3af]">Welcome,</p>
          <p className="truncate text-sm font-bold text-[#f0f0f0]">{user.username}</p>
          <p className="mt-1 text-xs text-[#9ca3af]">Balance</p>
          <p className="text-lg font-bold text-[#ffdf19]">{formatBDT(user.balance)}</p>
        </div>
        <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-primary-gradient text-white"
                    : "text-[#9ca3af] hover:bg-[#242628] hover:text-[#f0f0f0]"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
