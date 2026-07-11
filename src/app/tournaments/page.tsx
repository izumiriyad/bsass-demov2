"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import Link from "next/link";
import { Trophy, Timer, Users, ChevronRight } from "lucide-react";

const TOURNAMENTS = [
  {
    id: "bcc-2025",
    name: "Bangladesh Cricket Cup",
    nameLocal: "বাংলাদেশ ক্রিকেট কাপ",
    type: "Sports",
    emoji: "🏏",
    status: "LIVE",
    prize: 1000000,
    participants: 1482,
    endsIn: "2 days, 14 hours",
    gradient: ["#043b2a", "#008d5b"],
    leaderboard: [
      { rank: 1, name: "Rahim***", score: "৳48,200", avatar: "R" },
      { rank: 2, name: "Nadia***", score: "৳32,700", avatar: "N" },
      { rank: 3, name: "Arif***",  score: "৳24,100", avatar: "A" },
    ],
  },
  {
    id: "jili-race",
    name: "JILI Slot Race",
    nameLocal: "জিলি স্লট রেস",
    type: "Slots",
    emoji: "🎰",
    status: "LIVE",
    prize: 500000,
    participants: 3241,
    endsIn: "18 hours",
    gradient: ["#7c2d12", "#c2410c"],
    leaderboard: [
      { rank: 1, name: "Karim***", score: "৳18,500", avatar: "K" },
      { rank: 2, name: "Sadia***", score: "৳14,200", avatar: "S" },
      { rank: 3, name: "Lima***",  score: "৳11,000", avatar: "L" },
    ],
  },
  {
    id: "aviator-hf",
    name: "Aviator High Flyer",
    nameLocal: "অ্যাভিয়েটর হাই ফ্লায়ার",
    type: "Crash",
    emoji: "🚀",
    status: "UPCOMING",
    prize: 350000,
    participants: 892,
    endsIn: "Starts in 5 days",
    gradient: ["#1e1b4b", "#5b21b6"],
    leaderboard: [],
  },
  {
    id: "casino-lb",
    name: "Live Casino Leaderboard",
    nameLocal: "লাইভ ক্যাসিনো লিডারবোর্ড",
    type: "Casino",
    emoji: "♠️",
    status: "LIVE",
    prize: 750000,
    participants: 2108,
    endsIn: "Weekly — Mon reset",
    gradient: ["#450a0a", "#991b1b"],
    leaderboard: [
      { rank: 1, name: "Jamal***", score: "৳62,100", avatar: "J" },
      { rank: 2, name: "Mitu***",  score: "৳45,800", avatar: "M" },
      { rank: 3, name: "Tuhin***", score: "৳38,200", avatar: "T" },
    ],
  },
  {
    id: "fishing-king",
    name: "Fishing King Tournament",
    nameLocal: "ফিশিং কিং টুর্নামেন্ট",
    type: "Fishing",
    emoji: "🎣",
    status: "UPCOMING",
    prize: 200000,
    participants: 341,
    endsIn: "Starts in 3 days",
    gradient: ["#0c4a6e", "#0369a1"],
    leaderboard: [],
  },
  {
    id: "bpl-parlay",
    name: "BPL Parlay Challenge",
    nameLocal: "বিপিএল পার্লে চ্যালেঞ্জ",
    type: "Sports",
    emoji: "🏆",
    status: "ENDED",
    prize: 300000,
    participants: 1840,
    endsIn: "Ended",
    gradient: ["#1c1400", "#3d2e00"],
    leaderboard: [
      { rank: 1, name: "Akter***", score: "৳88,000", avatar: "A" },
      { rank: 2, name: "Rony***",  score: "৳52,000", avatar: "R" },
      { rank: 3, name: "Fatema***",score: "৳40,000", avatar: "F" },
    ],
  },
];

const FILTERS = ["All", "Sports", "Casino", "Slots", "Crash", "Fishing"];
const STATUS_FILTERS = ["All", "LIVE", "UPCOMING", "ENDED"];

export default function TournamentsPage() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>("bcc-2025");

  const handleJoin = (t: typeof TOURNAMENTS[0]) => {
    if (!user) { openModal("login"); return; }
    if (t.status === "ENDED") { toast.error("This tournament has ended."); return; }
    if (t.status === "UPCOMING") { toast.info("Tournament starts soon! You've been registered."); return; }
    openModal("deposit");
  };

  const filtered = TOURNAMENTS.filter((t) => {
    if (typeFilter !== "All" && t.type !== typeFilter) return false;
    if (statusFilter !== "All" && t.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1400] via-[#241a05] to-[#1b1c1e] border border-[#ffdf19]/20 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,223,25,0.12),transparent_60%)]" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19]">Race & Win</p>
            <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">BSL Tournaments</h1>
            <p className="mt-2 text-sm text-[#9ca3af]">Compete for massive prize pools. New tournaments every week.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/30 px-3 py-1 text-xs font-bold text-[#ef4444]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse" /> 3 Live Now
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffdf19]/10 border border-[#ffdf19]/30 px-3 py-1 text-xs font-bold text-[#ffdf19]">
                <Trophy size={12} /> Total Prize Pool: ৳28,00,000
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:w-40">
            {[
              { label: "Active", val: "3" },
              { label: "Upcoming", val: "2" },
              { label: "Players", val: "9.8K" },
              { label: "Paid Out", val: "৳4.2Cr" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-2.5 text-center">
                <p className="text-sm font-black text-[#ffdf19]">{s.val}</p>
                <p className="text-[9px] text-[#9ca3af] font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setTypeFilter(f)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${typeFilter === f ? "border-[#ffdf19]/50 bg-[#ffdf19]/10 text-[#ffdf19]" : "border-[#2a2c30] bg-[#1b1c1e] text-[#9ca3af] hover:text-white"}`}>{f}</button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {STATUS_FILTERS.map((f) => (
            <button key={f} onClick={() => setStatusFilter(f)} className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-black transition ${statusFilter === f ? "border-[#ffdf19]/50 bg-[#ffdf19]/10 text-[#ffdf19]" : "border-[#2a2c30] bg-[#1b1c1e] text-[#6b7280] hover:text-white"}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Tournament cards */}
      <div className="space-y-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl overflow-hidden border transition-all"
            style={{ borderColor: expanded === t.id ? "rgba(255,223,25,0.3)" : "#2a2c30" }}
          >
            {/* Card header */}
            <div
              className="relative overflow-hidden cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})` }}
              onClick={() => setExpanded(expanded === t.id ? null : t.id)}
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_50%)]" />
              <div className="relative flex items-center gap-4 p-4">
                <span className="text-4xl drop-shadow">{t.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {t.status === "LIVE" && <span className="rounded-full bg-[#ef4444] px-2 py-0.5 text-[9px] font-black text-white animate-pulse">● LIVE</span>}
                    {t.status === "UPCOMING" && <span className="rounded-full bg-[#1d4ed8]/80 px-2 py-0.5 text-[9px] font-black text-[#60a5fa]">UPCOMING</span>}
                    {t.status === "ENDED" && <span className="rounded-full bg-[#374151] px-2 py-0.5 text-[9px] font-black text-[#9ca3af]">ENDED</span>}
                    <span className="text-[9px] text-white/50">{t.type}</span>
                  </div>
                  <h2 className="text-sm font-black text-white truncate">{t.name}</h2>
                  <p className="text-[10px] text-white/60">{t.nameLocal}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-black text-[#ffdf19]">৳{(t.prize / 1000).toFixed(0)}K</p>
                  <p className="text-[9px] text-white/50">Prize Pool</p>
                  <div className="mt-1 flex items-center justify-end gap-1">
                    <Users size={10} className="text-white/40" />
                    <span className="text-[10px] text-white/60">{t.participants.toLocaleString()}</span>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-white/40 transition-transform ${expanded === t.id ? "rotate-90" : ""}`} />
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2">
                <Timer size={10} className="text-white/40 shrink-0" />
                <span className="text-[10px] text-white/60">{t.endsIn}</span>
              </div>
            </div>

            {/* Expanded content */}
            {expanded === t.id && (
              <div className="bg-[#1b1c1e] p-4 space-y-4">
                {t.leaderboard.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af] mb-3">Current Top 3</p>
                    <div className="space-y-2">
                      {t.leaderboard.map((r) => (
                        <div key={r.rank} className="flex items-center gap-3 rounded-xl bg-[#121315] px-3 py-2.5">
                          <span className="text-sm font-black" style={{ color: r.rank === 1 ? "#ffdf19" : r.rank === 2 ? "#c0c0c0" : "#cd7f32" }}>
                            {r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : "🥉"}
                          </span>
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2a2c30] text-xs font-black text-white">
                            {r.avatar}
                          </div>
                          <span className="flex-1 text-sm font-bold text-white">{r.name}</span>
                          <span className="text-sm font-black text-[#22c55e]">{r.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleJoin(t)}
                    className={`flex-1 rounded-xl py-3 text-sm font-black border-b-[3px] transition active:scale-[.98] ${
                      t.status === "ENDED"
                        ? "bg-[#242628] border-[#2a2c30] text-[#6b7280] cursor-not-allowed"
                        : "bg-gradient-to-b from-[#ffdf19] to-[#f4a700] border-[#c28400] text-[#241a05] hover:brightness-110"
                    }`}
                  >
                    {t.status === "LIVE" ? "🎯 Join & Play" : t.status === "UPCOMING" ? "📅 Register Now" : "🏁 Tournament Ended"}
                  </button>
                  <Link href="/leaderboard" className="rounded-xl border border-[#2a2c30] bg-[#242628] px-4 py-3 text-sm font-black text-[#9ca3af] hover:text-white transition">
                    Full Board
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* How tournaments work */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <p className="text-xs font-black uppercase tracking-widest text-[#9ca3af] mb-4">How It Works</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { step: "01", icon: "📝", title: "Register", body: "Click 'Join' on any active tournament. No extra cost — play with your normal bets." },
            { step: "02", icon: "🎯", title: "Play & Score", body: "Every bet on the tournament game contributes to your score. Higher wins = higher rank." },
            { step: "03", icon: "💰", title: "Win Prizes", body: "Top players share the prize pool. Winnings credited instantly after the tournament ends." },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ffdf19] text-[10px] font-black text-[#241a05]">{s.step}</div>
              <div>
                <p className="text-xs font-black text-white">{s.title} {s.icon}</p>
                <p className="mt-1 text-[11px] text-[#9ca3af] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
