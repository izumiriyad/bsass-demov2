import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { formatBDT } from "@/lib/utils";
import Link from "next/link";
import { Wallet, TrendingUp, TrendingDown, Gift, Activity, ChevronRight } from "lucide-react";
import { AccountPanel } from "@/components/auth/account-panel";

export const metadata: Metadata = { title: "My Account – BSL Gaming" };

const RECENT_ACTIVITY = [
  { id: 1, type: "deposit", label: "Deposit via bKash", amount: 5000, time: "30 min ago", emoji: "💳" },
  { id: 2, type: "win", label: "Won on Aviator", amount: 2300, time: "1.5 hr ago", emoji: "✈️" },
  { id: 3, type: "loss", label: "Lost on Crazy Time", amount: -800, time: "3 hr ago", emoji: "🎪" },
  { id: 4, type: "bonus", label: "Welcome bonus credited", amount: 500, time: "1 day ago", emoji: "🎁" },
  { id: 5, type: "withdraw", label: "Withdrawal to Nagad", amount: -2000, time: "2 days ago", emoji: "💰" },
];

const QUICK_LINKS = [
  { label: "Deposit", sub: "ডিপোজিট", href: "/dashboard/wallet", emoji: "💳", color: "#22c55e" },
  { label: "Withdraw", sub: "উত্তোলন", href: "/dashboard/wallet", emoji: "💸", color: "#3b82f6" },
  { label: "Bet History", sub: "বাজির ইতিহাস", href: "/dashboard/history", emoji: "📋", color: "#f59e0b" },
  { label: "Transactions", sub: "লেনদেন", href: "/dashboard/transactions", emoji: "🧾", color: "#a855f7" },
  { label: "Promotions", sub: "প্রোমোশন", href: "/promotions", emoji: "🎁", color: "#ec4899" },
  { label: "VIP Club", sub: "ভিআইপি", href: "/vip", emoji: "👑", color: "#ffdf19" },
];

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const stats = [
    { label: "Current Balance", value: formatBDT(user.balance), icon: Wallet, color: "#ffdf19" },
    { label: "Total Deposited", value: formatBDT(25000), icon: TrendingUp, color: "#22c55e" },
    { label: "Total Withdrawn", value: formatBDT(8000), icon: TrendingDown, color: "#ef4444" },
    { label: "Bonuses Received", value: formatBDT(1500), icon: Gift, color: "#a855f7" },
  ];

  return (
    <div className="space-y-4">
      {/* Mobile: show full account panel (bj88 style) */}
      <div className="lg:hidden">
        <AccountPanel />
      </div>

      {/* Desktop: show stats + activity */}
      <div className="hidden lg:block space-y-5">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-[#2a2c30] bg-gradient-to-r from-[#1b1c1e] via-[#242628] to-[#1b1c1e] p-5 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#008d5b] to-[#005c3c] text-2xl font-black text-white shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-[#9ca3af]">Welcome back</p>
            <p className="text-xl font-black text-white mt-0.5">{user.username}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded-full bg-[#008d5b]/20 border border-[#008d5b]/30 px-2 py-0.5 text-[9px] font-black text-[#22c55e]">✓ VERIFIED</span>
              <span className="rounded-full bg-[#ffdf19]/15 border border-[#ffdf19]/30 px-2 py-0.5 text-[9px] font-black text-[#ffdf19]">VIP SILVER</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#9ca3af]">Main Wallet</p>
            <p className="text-2xl font-black text-[#ffdf19]">{formatBDT(user.balance)}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4 hover:border-[#ffdf19]/20 transition">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#9ca3af]">{stat.label}</p>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#242628]">
                    <Icon size={14} style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="flex flex-col items-center gap-2 rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 text-center hover:border-[#ffdf19]/30 hover:-translate-y-1 transition-all"
            >
              <span className="text-2xl" style={{ filter: `drop-shadow(0 0 6px ${link.color}55)` }}>{link.emoji}</span>
              <div>
                <p className="text-xs font-black text-white">{link.label}</p>
                <p className="text-[9px] text-[#9ca3af]">{link.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#2a2c30] bg-[#121315] px-4 py-3">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[#22c55e]" />
              <h2 className="text-xs font-black uppercase tracking-wider text-[#f0f0f0]">Recent Activity</h2>
            </div>
            <Link href="/dashboard/transactions" className="text-[10px] font-bold text-[#ffdf19] hover:underline flex items-center gap-0.5">
              View All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#2a2c30]">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#242628] transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#242628] text-base shrink-0">
                    {item.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#f0f0f0]">{item.label}</p>
                    <p className="text-[10px] text-[#6b7280]">{item.time}</p>
                  </div>
                </div>
                <p className={item.amount > 0 ? "text-sm font-black text-[#22c55e]" : "text-sm font-black text-[#ef4444]"}>
                  {item.amount > 0 ? "+" : ""}{formatBDT(item.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
