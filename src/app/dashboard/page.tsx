import type { Metadata } from "next";
import Link from "next/link";
import { Wallet, TrendingUp, TrendingDown, Gift, Activity } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { formatBDT, timeAgo } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

const RECENT_ACTIVITY = [
  { id: 1, type: "deposit", label: "Deposit via bKash", amount: 5000, date: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 2, type: "win", label: "Won on Aviator", amount: 2300, date: new Date(Date.now() - 1000 * 60 * 90) },
  { id: 3, type: "loss", label: "Lost on Crazy Time", amount: -800, date: new Date(Date.now() - 1000 * 60 * 60 * 3) },
  { id: 4, type: "bonus", label: "Welcome bonus credited", amount: 500, date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 5, type: "withdraw", label: "Withdrawal to Nagad", amount: -2000, date: new Date(Date.now() - 1000 * 60 * 60 * 48) },
];

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const stats = [
    { label: "Current Balance", value: formatBDT(user.balance), icon: Wallet, color: "#ffdf19" },
    { label: "Total Deposited", value: formatBDT(25000), icon: TrendingUp, color: "#00a86d" },
    { label: "Total Withdrawn", value: formatBDT(8000), icon: TrendingDown, color: "#ef4444" },
    { label: "Bonuses", value: formatBDT(1500), icon: Gift, color: "#a855f7" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Dashboard</h1>
        <p className="text-sm text-[#9ca3af]">Welcome back, {user.username}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#9ca3af]">{stat.label}</p>
                <Icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
              <p className="mt-2 text-lg font-bold text-[#f0f0f0] sm:text-xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
        <div className="mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#00a86d]" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">Recent Activity</h2>
        </div>
        <div className="space-y-2">
          {RECENT_ACTIVITY.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg bg-[#121315] px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-[#f0f0f0]">{item.label}</p>
                <p className="text-xs text-[#6b7280]">{timeAgo(item.date)}</p>
              </div>
              <p
                className={
                  item.amount > 0
                    ? "text-sm font-bold text-[#00a86d]"
                    : "text-sm font-bold text-[#ef4444]"
                }
              >
                {item.amount > 0 ? "+" : ""}
                {formatBDT(item.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Link href="/dashboard/wallet" className="btn-primary rounded-lg px-4 py-3 text-center text-sm font-semibold">
          Deposit
        </Link>
        <Link href="/games" className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] px-4 py-3 text-center text-sm font-semibold text-[#f0f0f0] transition hover:border-[#383b3f]">
          Browse Games
        </Link>
        <Link href="/promotions" className="rounded-lg border border-[#ffdf19]/30 bg-[#1b1c1e] px-4 py-3 text-center text-sm font-semibold text-[#ffdf19] transition hover:border-[#ffdf19]/50">
          Promotions
        </Link>
      </div>
    </div>
  );
}
