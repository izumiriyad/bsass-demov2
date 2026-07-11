import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, Medal, Crown } from "lucide-react";

export const metadata: Metadata = { title: "Leaderboard – BSL Gaming" };

const TABS = ["Daily", "Weekly", "Monthly", "All Time"];

const LEADERBOARD = [
  { rank: 1, name: "Rahim***",  win: 258900, game: "Gates of Olympus",  streak: 12, avatar: "R", color: "#ffdf19" },
  { rank: 2, name: "Nadia***",  win: 198420, game: "SV388 Derby",        streak: 8,  avatar: "N", color: "#c0c0c0" },
  { rank: 3, name: "Karim***",  win: 145100, game: "Mega Wheel",         streak: 6,  avatar: "K", color: "#cd7f32" },
  { rank: 4, name: "Sadia***",  win: 112880, game: "Aviator",            streak: 5,  avatar: "S", color: "#9ca3af" },
  { rank: 5, name: "Arif***",   win: 98600,  game: "Aztec Gems",         streak: 4,  avatar: "A", color: "#9ca3af" },
  { rank: 6, name: "Mila***",   win: 76220,  game: "Baccarat Live",      streak: 3,  avatar: "M", color: "#9ca3af" },
  { rank: 7, name: "Tuhin***",  win: 64400,  game: "Happy Fishing",      streak: 3,  avatar: "T", color: "#9ca3af" },
  { rank: 8, name: "Joya***",   win: 50120,  game: "Cricket Parlay",     streak: 2,  avatar: "J", color: "#9ca3af" },
  { rank: 9, name: "Farhan***", win: 41800,  game: "Crazy Time",         streak: 2,  avatar: "F", color: "#9ca3af" },
  { rank: 10, name: "Lima***",  win: 33500,  game: "Lightning Roulette", streak: 1,  avatar: "L", color: "#9ca3af" },
];

const PRIZE_POOL = [
  { rank: "1st", prize: "৳50,000", icon: "🥇" },
  { rank: "2nd", prize: "৳25,000", icon: "🥈" },
  { rank: "3rd", prize: "৳10,000", icon: "🥉" },
  { rank: "4th–5th", prize: "৳5,000", icon: "🎖️" },
  { rank: "6th–10th", prize: "৳1,000", icon: "🎁" },
];

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown size={18} className="text-[#ffdf19]" />;
  if (rank === 2) return <Medal size={18} className="text-[#c0c0c0]" />;
  if (rank === 3) return <Medal size={18} className="text-[#cd7f32]" />;
  return <span className="text-sm font-black text-[#6b7280]">#{rank}</span>;
}

export default function LeaderboardPage() {
  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1400] via-[#241a05] to-[#1c1400] border border-[#ffdf19]/20 p-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,223,25,0.15),transparent_70%)]" />
        <div className="relative">
          <Trophy size={40} className="mx-auto text-[#ffdf19] mb-3" />
          <h1 className="text-2xl font-black text-white sm:text-3xl">Daily Race Leaderboard</h1>
          <p className="mt-2 text-sm text-[#9ca3af]">Top 10 biggest winners today. Prize pool resets every 24 hours.</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#ffdf19]/10 border border-[#ffdf19]/30 px-4 py-1.5">
            <span className="flex h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-xs font-black text-[#ffdf19]">Total Prize Pool: ৳96,000</span>
          </div>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-black transition ${
              i === 0
                ? "border-[#ffdf19]/50 bg-[#ffdf19]/10 text-[#ffdf19]"
                : "border-[#2a2c30] bg-[#1b1c1e] text-[#9ca3af] hover:border-[#ffdf19]/20 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {/* 2nd */}
        <div className="flex flex-col items-center gap-2 pt-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#475569] text-xl font-black text-white shadow-lg border-2 border-[#c0c0c0]">
            {LEADERBOARD[1].avatar}
          </div>
          <span className="text-lg">🥈</span>
          <p className="text-[11px] font-black text-white text-center">{LEADERBOARD[1].name}</p>
          <p className="text-xs font-black text-[#c0c0c0]">৳{LEADERBOARD[1].win.toLocaleString()}</p>
        </div>
        {/* 1st */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="flex h-18 w-18 h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-[#d97706] to-[#92400e] text-2xl font-black text-white shadow-2xl border-[3px] border-[#ffdf19]">
              {LEADERBOARD[0].avatar}
            </div>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">👑</span>
          </div>
          <p className="text-[11px] font-black text-white text-center">{LEADERBOARD[0].name}</p>
          <p className="text-sm font-black text-[#ffdf19]">৳{LEADERBOARD[0].win.toLocaleString()}</p>
          <span className="rounded-full bg-[#ffdf19]/20 border border-[#ffdf19]/40 px-2 py-0.5 text-[9px] font-black text-[#ffdf19]">CHAMPION</span>
        </div>
        {/* 3rd */}
        <div className="flex flex-col items-center gap-2 pt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7c2d12] text-lg font-black text-white shadow-lg border-2 border-[#cd7f32]">
            {LEADERBOARD[2].avatar}
          </div>
          <span className="text-lg">🥉</span>
          <p className="text-[11px] font-black text-white text-center">{LEADERBOARD[2].name}</p>
          <p className="text-xs font-black text-[#cd7f32]">৳{LEADERBOARD[2].win.toLocaleString()}</p>
        </div>
      </div>

      {/* Full table */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
        <div className="border-b border-[#2a2c30] bg-[#121315] px-4 py-3 grid grid-cols-[36px_1fr_1fr_auto] gap-3 text-[10px] font-black uppercase tracking-widest text-[#6b7280]">
          <span>Rank</span><span>Player</span><span>Game</span><span>Win</span>
        </div>
        <div className="divide-y divide-[#2a2c30]">
          {LEADERBOARD.map((row) => (
            <div
              key={row.rank}
              className={`grid grid-cols-[36px_1fr_1fr_auto] gap-3 items-center px-4 py-3 hover:bg-[#242628] transition ${row.rank <= 3 ? "bg-[#ffdf19]/5" : ""}`}
            >
              <div className="flex items-center justify-center">
                <RankIcon rank={row.rank} />
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                  style={{ background: `linear-gradient(135deg, ${row.color}33, ${row.color}55)`, border: `1.5px solid ${row.color}55` }}
                >
                  {row.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-white truncate">{row.name}</p>
                  <p className="text-[9px] text-[#6b7280]">🔥 {row.streak}-win streak</p>
                </div>
              </div>
              <p className="text-[11px] text-[#9ca3af] truncate">{row.game}</p>
              <p className="text-sm font-black text-[#22c55e] whitespace-nowrap">৳{row.win.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prize Pool */}
      <div>
        <h2 className="mb-3 text-sm font-black text-white">Today's Prize Pool</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {PRIZE_POOL.map((p) => (
            <div key={p.rank} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 text-center">
              <span className="text-2xl">{p.icon}</span>
              <p className="mt-1 text-sm font-black text-[#ffdf19]">{p.prize}</p>
              <p className="text-[10px] text-[#9ca3af]">{p.rank}</p>
            </div>
          ))}
        </div>
      </div>

      <Link href="/vip" className="block w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3 text-center text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110">
        Join VIP for Bigger Prizes →
      </Link>
    </div>
  );
}
