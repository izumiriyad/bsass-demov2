"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

const DAILY_REWARDS = [
  { day: 1, amount: "৳20",   icon: "🎁", desc: "Day 1 bonus" },
  { day: 2, amount: "৳30",   icon: "🎁", desc: "Day 2 bonus" },
  { day: 3, amount: "৳50",   icon: "🎁", desc: "Day 3 bonus" },
  { day: 4, amount: "৳70",   icon: "🎁", desc: "Day 4 bonus" },
  { day: 5, amount: "৳100",  icon: "🎁", desc: "Day 5 bonus" },
  { day: 6, amount: "৳150",  icon: "🎁", desc: "Day 6 bonus" },
  { day: 7, amount: "৳300",  icon: "👑", desc: "SUPER REWARD" },
];

export default function DailyCheckInPage() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [claimed, setClaimed] = useState(false);
  const currentDay = 3; // Demo: user is on day 3 streak

  const handleClaim = () => {
    if (!user) { openModal("login"); return; }
    if (claimed) { toast.error("Already claimed today! Come back tomorrow."); return; }
    setClaimed(true);
    toast.success(`✅ Day ${currentDay} bonus claimed! ৳${DAILY_REWARDS[currentDay - 1].amount} added to your wallet!`);
  };

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4a0505] via-[#2d0a0a] to-[#1b1c1e] border border-[#ef4444]/20 p-6 text-center">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#ffdf19]/10 blur-xl" />
        <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-[#ef4444]/10 blur-xl" />
        <div className="relative">
          <span className="text-5xl">🧧</span>
          <h1 className="mt-3 text-2xl font-black text-white">Daily Check-In</h1>
          <p className="mt-2 text-sm text-[#9ca3af]">Log in every day and collect growing rewards. 7 days = Super Jackpot!</p>
          {user && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
              <span className="flex h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-xs font-black text-white">Current Streak: {currentDay} days 🔥</span>
            </div>
          )}
        </div>
      </div>

      {/* 7-day grid */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {DAILY_REWARDS.map((reward) => {
          const isCompleted = reward.day < currentDay;
          const isCurrent = reward.day === currentDay;
          const isLocked = reward.day > currentDay;
          return (
            <div
              key={reward.day}
              className={`relative flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all ${
                isCompleted
                  ? "border-[#22c55e]/40 bg-[#22c55e]/10"
                  : isCurrent
                  ? "border-[#ffdf19]/50 bg-gradient-to-br from-[#ffdf19]/15 to-[#f4a700]/10 shadow-[0_0_20px_rgba(255,223,25,0.2)]"
                  : "border-[#2a2c30] bg-[#1b1c1e] opacity-60"
              }`}
            >
              {reward.day === 7 && <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-[#ffdf19] px-2 py-0.5 text-[8px] font-black text-[#241a05]">SUPER</span>}
              <span className="text-xs font-black text-[#9ca3af]">Day {reward.day}</span>
              <span className="text-2xl">{isCompleted ? "✅" : isLocked ? "🔒" : reward.icon}</span>
              <span className={`text-sm font-black ${isCompleted ? "text-[#22c55e]" : isCurrent ? "text-[#ffdf19]" : "text-[#6b7280]"}`}>
                {reward.amount}
              </span>
              <span className="text-[9px] text-[#6b7280]">{reward.desc}</span>
            </div>
          );
        })}
      </div>

      {/* Claim button */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 text-center">
        {!user ? (
          <>
            <p className="text-sm text-[#9ca3af] mb-3">Login to claim your daily check-in bonus</p>
            <button
              onClick={() => openModal("login")}
              className="w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3.5 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110"
            >
              Login to Claim →
            </button>
          </>
        ) : claimed ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 size={40} className="text-[#22c55e]" />
            <p className="text-lg font-black text-white">Claimed! Come back tomorrow 🎉</p>
            <p className="text-sm text-[#9ca3af]">Day {currentDay + 1} reward: {DAILY_REWARDS[currentDay]?.amount}</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-[#9ca3af] mb-1">Today's Reward</p>
            <p className="text-3xl font-black text-[#ffdf19] mb-3">{DAILY_REWARDS[currentDay - 1].amount}</p>
            <button
              onClick={handleClaim}
              className="w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3.5 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110 active:scale-[.98] animate-pulse"
            >
              🎁 Claim Day {currentDay} Bonus
            </button>
          </>
        )}
      </div>

      {/* Rules */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
        <p className="text-xs font-black text-[#9ca3af] uppercase tracking-widest mb-3">Rules & Conditions</p>
        <div className="space-y-2">
          {[
            "Check-in must be done within 24 hours each day.",
            "Missing a day resets your streak to Day 1.",
            "Bonus credited instantly to Main Wallet.",
            "Minimum ৳500 deposit required to activate check-in.",
            "One check-in per account per day.",
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#9ca3af]">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#242628] text-[9px] font-black text-[#ffdf19] mt-0.5">{i + 1}</span>
              {rule}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
