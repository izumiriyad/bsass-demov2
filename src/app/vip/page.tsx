"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { formatBDT, cn } from "@/lib/utils";
import Link from "next/link";
import { Trophy, Gift, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface VipTier {
  name: string;
  emoji: string;
  threshold: number;
  cashback: string;
  withdrawal: string;
  bonus: string;
  manager: boolean;
  gradient: [string, string];
}

const VIP_TIERS: VipTier[] = [
  { name: "Bronze", emoji: "🥉", threshold: 5000, cashback: "0.5%", withdrawal: "৳25K/day", bonus: "৳50", manager: false, gradient: ["#7c2d12", "#9a3412"] },
  { name: "Silver", emoji: "🥈", threshold: 25000, cashback: "1%", withdrawal: "৳100K/day", bonus: "৳250", manager: false, gradient: ["#475569", "#64748b"] },
  { name: "Gold", emoji: "🥇", threshold: 100000, cashback: "2%", withdrawal: "৳500K/day", bonus: "৳1,500", manager: true, gradient: ["#713f12", "#d97706"] },
  { name: "Platinum", emoji: "💎", threshold: 500000, cashback: "3%", withdrawal: "৳2M/day", bonus: "৳10,000", manager: true, gradient: ["#0c4a6e", "#0369a1"] },
  { name: "Diamond", emoji: "👑", threshold: 1000000, cashback: "5%", withdrawal: "Unlimited", bonus: "৳50,000", manager: true, gradient: ["#2e1065", "#5b21b6"] },
];

export default function VipPage() {
  const { user } = useAuth();
  const [claimed, setClaimed] = useState(false);
  
  const currentTurnover = 12500; // Simulated turnover
  
  let currentTierIdx = 0;
  for (let i = 0; i < VIP_TIERS.length; i++) {
    if (currentTurnover >= VIP_TIERS[i].threshold) {
      currentTierIdx = i;
    }
  }
  const currentTier = VIP_TIERS[currentTierIdx];
  const nextTier = VIP_TIERS[currentTierIdx + 1] || VIP_TIERS[VIP_TIERS.length - 1];
  const progressPercent = Math.min(100, (currentTurnover / nextTier.threshold) * 100);

  const handleClaim = () => {
    setClaimed(true);
    toast.success(`Claimed ${currentTier.bonus} Daily VIP Bonus!`);
  };

  return (
    <div className="space-y-8 px-3 py-6 sm:px-5 sm:py-8 pb-24">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b1c1e] to-[#242628] p-6 shadow-2xl border border-[#ffdf19]/20">
        <div className="absolute -right-10 -top-10 opacity-10">
          <Trophy size={150} />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-gold-gradient tracking-tight drop-shadow-md">
              BSL VIP Club
            </h1>
            <p className="mt-2 max-w-md text-sm text-[#9ca3af]">
              The most exclusive luxury rewards program in Bangladesh. Bet, climb the ranks, and unlock unlimited cashbacks and personal managers.
            </p>
          </div>
        </div>
      </div>

      {user ? (
        <div className="relative overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%', animation: 'shimmer 3s infinite linear' }} />
          <div className="relative bg-[#121315] rounded-xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              <div className="flex items-center gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-4xl shadow-2xl shadow-[#ffdf19]/20 border-2 border-[#ffdf19]/30"
                     style={{ backgroundImage: `linear-gradient(to bottom right, ${currentTier.gradient[0]}, ${currentTier.gradient[1]})` }}>
                  {currentTier.emoji}
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-[#1b1c1e] p-1 text-[#ffdf19]">
                    <CheckCircle2 size={16} className="fill-[#ffdf19] text-[#1b1c1e]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#9ca3af] uppercase tracking-wider">Current Status</h2>
                  <h3 className="text-2xl font-black text-white">{currentTier.name} Member</h3>
                  <p className="text-xs text-[#00a86d] mt-1 font-bold">Total Turnover: {formatBDT(currentTurnover)}</p>
                </div>
              </div>

              <div className="w-full sm:w-72 rounded-xl bg-[#1b1c1e] border border-[#2a2c30] p-4 text-center">
                <p className="text-xs text-[#9ca3af] font-bold mb-1">Daily VIP Bonus</p>
                <p className="text-xl font-black text-[#ffdf19] mb-3">{currentTier.bonus}</p>
                <button 
                  onClick={handleClaim}
                  disabled={claimed}
                  className={cn(
                    "w-full rounded-lg py-2.5 text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2",
                    claimed ? "bg-[#2a2c30] text-[#6b7280] cursor-not-allowed" : "bg-gradient-to-r from-[#ffdf19] to-[#f4a700] text-[#241a05] animate-pulse hover:brightness-110"
                  )}
                >
                  {claimed ? "Claimed Today" : <><Gift size={16} /> Claim Now</>}
                </button>
              </div>

            </div>

            <div className="mt-8">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-[#9ca3af]">Progress to <span className="text-white">{nextTier.name}</span></span>
                <span className="text-[#ffdf19]">{progressPercent.toFixed(1)}%</span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-[#1b1c1e] border border-[#2a2c30] shadow-inner">
                <div className="h-full bg-gradient-to-r from-[#ffdf19] via-[#f5a400] to-[#ffdf19] transition-all duration-1000 relative" style={{ width: `${progressPercent}%` }}>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgo8cmVjdCB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPScjZmZmJyBmaWxsLW9wYWNpdHk9JzAuMScvPgo8cGF0aCBkPSdNMCAwaDh2OEgweicgZmlsbD0nbm9uZScvPgo8cGF0aCBkPSdNMCA0bDQtNCA0IDR2NGwtNC00LTQgNHonIGZpbGw9JyNmZmYnIGZpbGwtb3BhY2l0eT0nMC4wNScvPgo8L3N2Zz4=')]"></div>
                </div>
              </div>
              <p className="mt-2 text-right text-[11px] text-[#9ca3af] font-semibold">Turnover {formatBDT(nextTier.threshold - currentTurnover)} more to upgrade</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#ffdf19]/30 bg-gradient-to-r from-[#1b1c1e] via-[#242628] to-[#1b1c1e] p-8 text-center shadow-[0_10px_30px_rgba(255,223,25,0.1)]">
          <Sparkles className="mx-auto mb-3 text-[#ffdf19] animate-pulse" size={40} />
          <h2 className="text-2xl font-black text-[#ffdf19]">Unlock the Ultimate Luxury</h2>
          <p className="mt-2 text-sm text-[#9ca3af]">Join the VIP Club to get unlimited cashbacks, personal managers, and luxury gifts.</p>
          <Link href="/register" className="btn-primary mt-6 inline-flex items-center gap-2 px-8 py-3 text-sm font-black uppercase tracking-wide">
            Join VIP Club <ChevronRight size={16} />
          </Link>
        </div>
      )}

      {/* Luxury Matrix Table */}
      <div>
        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2"><Trophy size={20} className="text-[#ffdf19]" /> VIP Privileges Matrix</h2>
        <div className="overflow-x-auto rounded-xl border border-[#2a2c30] bg-[#1b1c1e] shadow-xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#242628] border-b border-[#2a2c30]">
                <th className="px-4 py-4 font-bold text-[#9ca3af]">Tier</th>
                <th className="px-4 py-4 font-bold text-[#9ca3af]">Req. Turnover</th>
                <th className="px-4 py-4 font-bold text-[#9ca3af]">Daily Cashback</th>
                <th className="px-4 py-4 font-bold text-[#9ca3af]">Withdrawal Limit</th>
                <th className="px-4 py-4 font-bold text-[#9ca3af]">VIP Manager</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2c30]">
              {VIP_TIERS.map((tier) => (
                <tr key={tier.name} className="transition-colors hover:bg-[#242628]/50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tier.emoji}</span>
                      <span className="font-bold text-white">{tier.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-[#ffdf19] font-bold">{tier.threshold >= 1000 ? `${tier.threshold/1000}K` : tier.threshold}</td>
                  <td className="px-4 py-4 font-bold text-[#00a86d]">{tier.cashback}</td>
                  <td className="px-4 py-4 text-[#f0f0f0]">{tier.withdrawal}</td>
                  <td className="px-4 py-4">
                    {tier.manager ? <CheckCircle2 size={18} className="text-[#22c55e]" /> : <span className="text-[#6b7280]">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
