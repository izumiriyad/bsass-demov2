"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";

const rewards = [
  { day: "Day 1", value: "৳20",  state: "Ready",   done: false },
  { day: "Day 2", value: "৳30",  state: "Tomorrow", done: false },
  { day: "Day 3", value: "৳50",  state: "Locked",   done: false },
  { day: "Day 4", value: "৳75",  state: "Locked",   done: false },
  { day: "Day 5", value: "৳100", state: "Locked",   done: false },
  { day: "Day 6", value: "৳150", state: "Locked",   done: false },
  { day: "Day 7", value: "৳500", state: "Super",    done: false },
];

const winners = [
  { name: "Rahim***",  prize: "৳82,500",  game: "Cricket Parlay",    emoji: "🏏" },
  { name: "Nadia***",  prize: "৳45,200",  game: "Gates of Olympus",  emoji: "⚡" },
  { name: "Sajib***",  prize: "৳19,800",  game: "Aviator",           emoji: "✈️" },
  { name: "Mita***",   prize: "৳12,450",  game: "Baccarat",          emoji: "🃏" },
];

export function EngagementSections() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [claimed, setClaimed] = useState(false);
  const [streakDay, setStreakDay] = useState(0);

  const handleCheckIn = () => {
    if (!user) { openModal("login"); return; }
    if (claimed) { toast.info("Already checked in today! Come back tomorrow."); return; }
    setClaimed(true);
    setStreakDay(1);
    toast.success("🎉 Day 1 check-in bonus ৳20 credited to your wallet!");
  };

  const handleEnvelope = () => {
    if (!user) { openModal("login"); return; }
    openModal("deposit");
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_.9fr]">
      {/* ─ Red Envelope Section ─ */}
      <section className="rounded-2xl border border-[#ef4444]/20 bg-gradient-to-br from-[#4a0505] to-[#1b1c1e] p-5 bsl-card-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#ffdf19]">Limited Event</p>
            <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">Red Envelope Rain 🧧</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
              Claim festival-style random rewards, deposit boosts and free spin envelopes during Bangladesh cricket nights.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={handleEnvelope}
                className="rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-5 py-2.5 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110 active:scale-[.98]"
              >
                Open Envelopes
              </button>
              <Link href="/bonus-terms" className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition">
                Terms
              </Link>
            </div>
          </div>
          <button
            onClick={handleEnvelope}
            className="text-7xl sm:text-8xl drop-shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer select-none self-center sm:self-auto"
          >
            🧧
          </button>
        </div>
      </section>

      {/* ─ Daily Check-In Section ─ */}
      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 bsl-card-glow">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#ffdf19]">Daily Rewards</p>
            <h2 className="mt-1 text-base font-black text-[#f0f0f0]">Check-in Streak Bonus</h2>
          </div>
          <Link href="/daily-check-in" className="text-xs font-bold text-[#ffdf19] hover:underline">Full Calendar →</Link>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {rewards.slice(0, 4).map((r, i) => (
            <div
              key={r.day}
              className={`rounded-xl p-2.5 text-center border transition ${
                i < streakDay
                  ? "border-[#22c55e]/40 bg-[#22c55e]/10"
                  : i === streakDay
                  ? "border-[#ffdf19]/60 bg-[#ffdf19]/10 animate-pulse"
                  : "border-[#2a2c30] bg-[#121315]"
              }`}
            >
              <p className="text-[10px] font-bold text-[#9ca3af]">{r.day}</p>
              <p className={`mt-1 text-sm font-black ${i < streakDay ? "text-[#22c55e]" : "text-[#ffdf19]"}`}>{r.value}</p>
              <p className="mt-0.5 text-[9px] text-[#6b7280]">
                {i < streakDay ? "✓" : i === streakDay ? "Ready" : "🔒"}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckIn}
          disabled={claimed}
          className={`w-full rounded-xl py-2.5 text-sm font-black border-b-[2px] transition active:scale-[.98] ${
            claimed
              ? "bg-[#242628] border-[#2a2c30] text-[#6b7280] cursor-not-allowed"
              : "bg-gradient-to-b from-[#ffdf19] to-[#f4a700] border-[#c28400] text-[#241a05] hover:brightness-110"
          }`}
        >
          {claimed ? "✓ Checked In Today" : "🎯 Check In Now — Claim ৳20"}
        </button>
      </section>

      {/* ─ Recent Big Winners (full width) ─ */}
      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 xl:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#ffdf19]">Live Proof</p>
            <h2 className="mt-1 text-base font-black text-[#f0f0f0]">Recent Big Winners</h2>
          </div>
          <Link href="/winners" className="text-xs font-bold text-[#ffdf19] hover:underline">Winner Wall →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {winners.map((w) => (
            <article
              key={w.name}
              className="rounded-xl border border-[#2a2c30] bg-[#121315] p-4 hover:border-[#ffdf19]/20 transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{w.emoji}</span>
                <p className="text-sm font-black text-[#f0f0f0]">{w.name}</p>
              </div>
              <p className="text-2xl font-black text-[#22c55e]">{w.prize}</p>
              <p className="mt-1 text-xs text-[#9ca3af]">{w.game}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[9px] text-[#6b7280] font-bold">Just won</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
