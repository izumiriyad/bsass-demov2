"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { formatBDT } from "@/lib/utils";
import Link from "next/link";
import { Trophy } from "lucide-react";

interface VipTier {
  name: string;
  emoji: string;
  threshold: number;
  cashback: string;
  perks: string[];
  gradient: [string, string];
}

const VIP_TIERS: VipTier[] = [
  {
    name: "Bronze",
    emoji: "🥉",
    threshold: 5000,
    cashback: "0.5%",
    gradient: ["#7c2d12", "#9a3412"],
    perks: ["Daily login bonus", "Email support", "Basic promotions access"],
  },
  {
    name: "Silver",
    emoji: "🥈",
    threshold: 25000,
    cashback: "1%",
    gradient: ["#475569", "#64748b"],
    perks: ["Weekly bonus", "Priority email support", "Exclusive promotions"],
  },
  {
    name: "Gold",
    emoji: "🥇",
    threshold: 100000,
    cashback: "2%",
    gradient: ["#713f12", "#d97706"],
    perks: ["Monthly bonus", "Live chat support", "Higher withdrawal limits"],
  },
  {
    name: "Platinum",
    emoji: "💎",
    threshold: 500000,
    cashback: "3%",
    gradient: ["#0c4a6e", "#0369a1"],
    perks: ["Weekly cashback", "24/7 VIP support", "Instant withdrawals", "Custom promotions", "VIP events access"],
  },
  {
    name: "Diamond",
    emoji: "👑",
    threshold: 1000000,
    cashback: "5%",
    gradient: ["#2e1065", "#5b21b6"],
    perks: ["Daily cashback", "Personal VIP manager", "No withdrawal limits", "Exclusive luxury gifts", "Invitation to exclusive events"],
  },
];

export default function VipPage() {
  const { user } = useAuth();
  const currentTurnover = 12500; // Simulated turnover
  
  let currentTierIdx = 0;
  for(let i=0; i<VIP_TIERS.length; i++){
    if(currentTurnover >= VIP_TIERS[i].threshold){
      currentTierIdx = i;
    }
  }
  const nextTier = VIP_TIERS[currentTierIdx + 1] || VIP_TIERS[VIP_TIERS.length - 1];
  const progressPercent = Math.min(100, (currentTurnover / nextTier.threshold) * 100);

  return (
    <div className="space-y-6 px-3 py-4 sm:px-5 sm:py-6">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-xl">👑</span>
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-2xl">
          VIP Club
        </h1>
      </div>
      <p className="max-w-2xl text-sm text-[#9ca3af]">
        Join the BSL Gaming VIP Club and unlock exclusive rewards. The more you play, the higher you climb.
      </p>

      {user ? (
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#713f12] to-[#d97706] text-3xl shadow-lg shadow-[#d97706]/20">
              {VIP_TIERS[currentTierIdx].emoji}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-white">{VIP_TIERS[currentTierIdx].name} Member</h2>
              <p className="text-sm text-[#9ca3af]">Turnover: {formatBDT(currentTurnover)}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#9ca3af]">Progress to {nextTier.name}</span>
              <span className="text-[#ffdf19]">{progressPercent.toFixed(1)}%</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#121315]">
              <div className="h-full bg-gradient-to-r from-[#ffdf19] to-[#f5a400] transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="mt-2 text-right text-[10px] text-[#6b7280]">Need {formatBDT(nextTier.threshold - currentTurnover)} more</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#ffdf19]/30 bg-gradient-to-r from-[#1b1c1e] via-[#242628] to-[#1b1c1e] p-5 text-center">
          <Trophy className="mx-auto mb-2 text-[#ffdf19]" size={32} />
          <h2 className="text-base font-bold text-[#ffdf19]">Ready to join the VIP Club?</h2>
          <p className="mt-1 text-sm text-[#9ca3af]">Start playing today and climb the ranks.</p>
          <Link href="/register" className="btn-primary mt-4 inline-block px-6 py-2.5 text-sm font-semibold">Join Now</Link>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {VIP_TIERS.map((tier, i) => {
          const [c1, c2] = tier.gradient;
          const isCurrent = user && i === currentTierIdx;
          return (
            <div
              key={tier.name}
              className={cn(
                "relative overflow-hidden rounded-xl border p-5 transition-all hover:-translate-y-1",
                isCurrent ? "border-[#ffdf19] bg-[#ffdf19]/5 shadow-[0_0_20px_rgba(255,223,25,0.1)]" : "border-[#2a2c30] bg-[#1b1c1e]"
              )}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(to right, ${c1}, ${c2})` }} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{tier.emoji}</span>
                  <div>
                    <h2 className="text-lg font-bold text-[#f0f0f0]">{tier.name} {isCurrent && <span className="ml-1 text-[10px] uppercase text-[#ffdf19]">Current</span>}</h2>
                    <p className="text-xs text-[#9ca3af]">Tier {i + 1}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-[#121315] p-2 text-center">
                  <p className="text-xs text-[#9ca3af]">Turnover</p>
                  <p className="text-sm font-bold text-[#ffdf19]">{tier.threshold >= 1000 ? `${tier.threshold/1000}K` : tier.threshold}</p>
                </div>
                <div className="rounded-lg bg-[#121315] p-2 text-center">
                  <p className="text-xs text-[#9ca3af]">Cashback</p>
                  <p className="text-sm font-bold text-[#00a86d]">{tier.cashback}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                    <span className="text-[#00a86d]">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
