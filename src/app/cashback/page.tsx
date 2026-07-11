"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import Link from "next/link";
import { formatBDT } from "@/lib/utils";

const CASHBACK_HISTORY = [
  { week: "This Week", loss: 2400, cashback: 240, status: "Pending" },
  { week: "Last Week", loss: 5800, cashback: 580, status: "Credited" },
  { week: "2 Weeks Ago", loss: 1200, cashback: 120, status: "Credited" },
];

const TIERS = [
  { name: "Standard", rate: "5%", min: "৳1,000", max: "৳2,000/week", color: "#9ca3af" },
  { name: "Silver VIP", rate: "8%", min: "৳1,000", max: "৳5,000/week", color: "#c0c0c0" },
  { name: "Gold VIP", rate: "10%", min: "৳1,000", max: "৳15,000/week", color: "#ffdf19" },
  { name: "Diamond VIP", rate: "15%", min: "৳1,000", max: "Unlimited", color: "#b9f2ff" },
];

export default function CashbackPage() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [claimed, setClaimed] = useState(false);

  const eligibleCashback = 240; // demo

  const handleClaim = () => {
    if (!user) { openModal("login"); return; }
    if (claimed) { toast.error("Already claimed this week!"); return; }
    setClaimed(true);
    toast.success(`৳${eligibleCashback} cashback credited to your wallet! 🎉`);
  };

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a5f] via-[#1d4ed8] to-[#1e3a5f] border border-[#3b82f6]/20 p-6 text-white">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#ffdf19]/10 blur-2xl" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19]">Weekly Cashback</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">Get Back Your Losses</h1>
          <p className="mt-2 text-sm text-white/80">Up to 15% cashback on net weekly losses. Credited every Monday.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "My Rate", val: "10%" },
              { label: "This Week Loss", val: "৳2,400" },
              { label: "Cashback Due", val: `৳${eligibleCashback}` },
              { label: "Credited So Far", val: "৳700" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-base font-black text-[#ffdf19]">{s.val}</p>
                <p className="text-[9px] text-white/60 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Claim this week */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 text-center">
        <p className="text-xs text-[#9ca3af] mb-1">This Week's Cashback</p>
        <p className="text-3xl font-black text-[#ffdf19] mb-3">৳{eligibleCashback}</p>
        <button
          onClick={handleClaim}
          className={`w-full rounded-xl py-3.5 text-sm font-black border-b-[3px] transition active:scale-[.98] ${
            claimed || !user
              ? "bg-[#242628] border-[#2a2c30] text-[#6b7280] cursor-not-allowed"
              : "bg-gradient-to-b from-[#ffdf19] to-[#f4a700] border-[#c28400] text-[#241a05] hover:brightness-110 animate-pulse"
          }`}
        >
          {!user ? "Login to Claim" : claimed ? "✅ Claimed — Next claim Monday" : "💸 Claim Cashback Now"}
        </button>
        {!user && (
          <button onClick={() => openModal("login")} className="mt-2 text-xs text-[#ffdf19] hover:underline">
            Login →
          </button>
        )}
      </div>

      {/* Cashback tiers */}
      <div>
        <h2 className="mb-3 text-sm font-black text-white">Cashback Rates by VIP Tier</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: t.color }}>{t.name}</p>
              <p className="text-2xl font-black" style={{ color: t.color }}>{t.rate}</p>
              <div className="mt-3 space-y-1 text-xs text-[#9ca3af]">
                <div className="flex justify-between"><span>Min loss:</span><span className="text-white">{t.min}</span></div>
                <div className="flex justify-between"><span>Max weekly:</span><span className="text-white">{t.max}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      {user && (
        <div>
          <h2 className="mb-3 text-sm font-black text-white">Cashback History</h2>
          <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
            <div className="divide-y divide-[#2a2c30]">
              {CASHBACK_HISTORY.map((row) => (
                <div key={row.week} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-white">{row.week}</p>
                    <p className="text-[10px] text-[#6b7280]">Net Loss: ৳{row.loss.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#22c55e]">৳{row.cashback.toLocaleString()}</p>
                    <span className={`text-[10px] font-bold ${row.status === "Credited" ? "text-[#22c55e]" : "text-[#f59e0b]"}`}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
