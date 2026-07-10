"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { CategoryTabs } from "@/components/bsl/category-tabs";
import { WinnersTicker } from "@/components/bsl/tickers";
import { cn } from "@/lib/utils";

/* ─── Sport Provider Cards (bj88 style) ─── */
interface SportProvider {
  id: string;
  name: string;
  nameLocal: string; // Bengali
  tagline: string;
  gradient: [string, string, string]; // 3-stop gradient
  accentColor: string;
  glowColor: string;
  logo: string; // emoji as logo
  athleteEmoji: string;
  badge?: string;
  isHot?: boolean;
  isNew?: boolean;
  liveCount: number;
  sports: string[];
}

const SPORT_PROVIDERS: SportProvider[] = [
  {
    id: "bti-sports",
    name: "BTI Sports",
    nameLocal: "বিটিআই স্পোর্টস",
    tagline: "Live Betting • Cricket • Football • Tennis",
    gradient: ["#c2440a", "#e05c1a", "#f97316"],
    accentColor: "#f97316",
    glowColor: "rgba(249,115,22,0.35)",
    logo: "🏅",
    athleteEmoji: "⚽",
    isHot: true,
    liveCount: 847,
    sports: ["Cricket", "Football", "Tennis", "Basketball", "Kabaddi"],
  },
  {
    id: "cmd-sports",
    name: "CMD Sports",
    nameLocal: "সিএমডি স্পোর্টস",
    tagline: "Asian Handicap • Full Coverage • Best Odds",
    gradient: ["#6b21a8", "#a855f7", "#c084fc"],
    accentColor: "#a855f7",
    glowColor: "rgba(168,85,247,0.35)",
    logo: "🎽",
    athleteEmoji: "🏃",
    isHot: true,
    liveCount: 632,
    sports: ["Cricket", "Football", "Tennis", "Volleyball", "Esports"],
  },
  {
    id: "ug-sports",
    name: "UG Sports",
    nameLocal: "ইউজি স্পোর্টস",
    tagline: "In-Play Betting • Real-Time Odds",
    gradient: ["#991b1b", "#dc2626", "#f87171"],
    accentColor: "#dc2626",
    glowColor: "rgba(220,38,38,0.35)",
    logo: "🏆",
    athleteEmoji: "🤸",
    badge: "LIVE",
    liveCount: 414,
    sports: ["Football", "Basketball", "Baseball", "Hockey", "Rugby"],
  },
  {
    id: "pinnacle",
    name: "Pinnacle",
    nameLocal: "পিনাকেল",
    tagline: "Highest Limits • Sharpest Odds in Asia",
    gradient: ["#be185d", "#ec4899", "#f9a8d4"],
    accentColor: "#ec4899",
    glowColor: "rgba(236,72,153,0.35)",
    logo: "💎",
    athleteEmoji: "🥊",
    badge: "VIP",
    liveCount: 289,
    sports: ["Cricket", "Football", "Tennis", "MMA", "Boxing"],
  },
  {
    id: "fb-sports",
    name: "FBSports",
    nameLocal: "এফবি স্পোর্টস",
    tagline: "Football Specialist • Perfect Match Odds",
    gradient: ["#d97706", "#f59e0b", "#fcd34d"],
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.35)",
    logo: "⚽",
    athleteEmoji: "🦵",
    isNew: true,
    liveCount: 198,
    sports: ["Football", "Cricket", "Tennis", "Futsal", "Kabaddi"],
  },
  {
    id: "saba-sports",
    name: "SABA Sports",
    nameLocal: "সাবা স্পোর্টস",
    tagline: "Virtual Sports • E-Sports • Classic Betting",
    gradient: ["#0f766e", "#14b8a6", "#5eead4"],
    accentColor: "#14b8a6",
    glowColor: "rgba(20,184,166,0.35)",
    logo: "🎯",
    athleteEmoji: "🏊",
    liveCount: 156,
    sports: ["Esports", "Virtual Sports", "Football", "Cricket"],
  },
];

const SUB_SPORTS = [
  { id: "all", label: "All Sports", bn: "সব", emoji: "🏆" },
  { id: "cricket", label: "Cricket", bn: "ক্রিকেট", emoji: "🏏" },
  { id: "football", label: "Football", bn: "ফুটবল", emoji: "⚽" },
  { id: "tennis", label: "Tennis", bn: "টেনিস", emoji: "🎾" },
  { id: "basketball", label: "Basketball", bn: "বাস্কেটবল", emoji: "🏀" },
  { id: "esports", label: "Esports", bn: "ই-স্পোর্টস", emoji: "🎮" },
  { id: "kabaddi", label: "Kabaddi", bn: "কাবাডি", emoji: "🤼" },
];

/* ─── Provider Card (Exact bj88 style) ─── */
function SportProviderCard({ provider }: { provider: SportProvider }) {
  const { user } = useAuth();
  const { openModal } = useModal();

  const handleGo = () => {
    if (!user) openModal("login");
    else openModal("deposit");
  };

  const [g1, g2, g3] = provider.gradient;

  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl select-none"
      style={{
        background: `linear-gradient(135deg, ${g1} 0%, ${g2} 55%, ${g3} 100%)`,
        boxShadow: `0 4px 24px ${provider.glowColor}`,
        minHeight: "170px",
      }}
      onClick={handleGo}
    >
      {/* Diagonal light sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
        }}
      />

      {/* Geometric pattern bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        }}
      />

      {/* Hot/New/Live badges */}
      <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-20">
        {provider.isHot && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ef4444] px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-lg">
            🔥 HOT
          </span>
        )}
        {provider.isNew && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#22c55e] px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-lg">
            ✨ NEW
          </span>
        )}
        {provider.badge === "LIVE" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ef4444]/90 px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-lg animate-pulse">
            ● LIVE
          </span>
        )}
        {provider.badge === "VIP" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ffdf19] px-2 py-0.5 text-[9px] font-black uppercase text-[#241a05] shadow-lg">
            👑 VIP
          </span>
        )}
      </div>

      {/* Provider logo top-right */}
      <div className="absolute right-3 top-3 z-20 flex items-center justify-center h-9 w-9 rounded-lg bg-black/25 backdrop-blur-sm text-xl shadow-lg border border-white/20">
        {provider.logo}
      </div>

      {/* Huge athlete emoji (simulates player cutout) */}
      <div
        className="absolute -right-2 bottom-0 z-10 select-none pointer-events-none transition-transform duration-300 group-hover:translate-x-1"
        style={{
          fontSize: "clamp(80px, 10vw, 110px)",
          filter: "drop-shadow(-6px 4px 12px rgba(0,0,0,0.5))",
          lineHeight: 1,
        }}
      >
        {provider.athleteEmoji}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4">
        {/* Provider name */}
        <p className="text-base font-black uppercase tracking-wide text-white drop-shadow-lg sm:text-lg">
          {provider.name}
        </p>
        <p className="text-[10px] font-semibold text-white/70 mt-0.5">{provider.nameLocal}</p>

        {/* Live count */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_6px_#22c55e]" />
          <span className="text-[10px] font-bold text-white/80">
            {provider.liveCount.toLocaleString()} live events
          </span>
        </div>
      </div>

      {/* GO button (exact bj88 circle button) */}
      <button
        onClick={(e) => { e.stopPropagation(); handleGo(); }}
        className="absolute bottom-4 right-16 sm:right-20 z-30 flex h-11 w-11 items-center justify-center rounded-full font-black text-sm text-white shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-all duration-200 hover:scale-110 active:scale-95 border-2 border-white/30"
        style={{
          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3), transparent 60%), ${provider.accentColor}`,
        }}
        aria-label={`Go to ${provider.name}`}
      >
        GO
      </button>
    </div>
  );
}

/* ─── Live Sports Scoreboard (below provider cards) ─── */
const LIVE_MATCHES = [
  {
    id: "m1",
    sport: "cricket",
    league: "BPL 2025",
    team1: "Dhaka Dominators",
    team2: "Rangpur Riders",
    score1: "142/6",
    score2: "98/3",
    overs1: "20",
    overs2: "14.2",
    status: "LIVE",
    time: "In Progress",
    provider: "BTI Sports",
    odds: { team1: "2.10", draw: null, team2: "1.75" },
  },
  {
    id: "m2",
    sport: "football",
    league: "EPL",
    team1: "Man City",
    team2: "Arsenal",
    score1: "2",
    score2: "1",
    overs1: "",
    overs2: "",
    status: "LIVE",
    time: "67'",
    provider: "CMD Sports",
    odds: { team1: "1.45", draw: "4.20", team2: "6.50" },
  },
  {
    id: "m3",
    sport: "cricket",
    league: "IPL 2025",
    team1: "Mumbai Indians",
    team2: "CSK",
    score1: "185/4",
    score2: "162/8",
    overs1: "20",
    overs2: "20",
    status: "FINISHED",
    time: "Result",
    provider: "BTI Sports",
    odds: { team1: "—", draw: null, team2: "—" },
  },
  {
    id: "m4",
    sport: "football",
    league: "La Liga",
    team1: "Real Madrid",
    team2: "Barcelona",
    score1: "1",
    score2: "1",
    overs1: "",
    overs2: "",
    status: "LIVE",
    time: "78'",
    provider: "UG Sports",
    odds: { team1: "2.80", draw: "3.10", team2: "2.55" },
  },
  {
    id: "m5",
    sport: "tennis",
    league: "Wimbledon",
    team1: "Djokovic",
    team2: "Alcaraz",
    score1: "6-3, 4",
    score2: "2-6, 6",
    overs1: "",
    overs2: "",
    status: "LIVE",
    time: "Set 3",
    provider: "Pinnacle",
    odds: { team1: "1.90", draw: null, team2: "1.95" },
  },
  {
    id: "m6",
    sport: "cricket",
    league: "BPL 2025",
    team1: "Sylhet Strikers",
    team2: "Chattogram Challengers",
    score1: "TBD",
    score2: "TBD",
    overs1: "",
    overs2: "",
    status: "UPCOMING",
    time: "Today 8:00 PM",
    provider: "BTI Sports",
    odds: { team1: "1.85", draw: null, team2: "2.05" },
  },
];

function MatchCard({ match }: { match: typeof LIVE_MATCHES[0] }) {
  const { user } = useAuth();
  const { openModal } = useModal();

  const handleOddsClick = () => {
    if (!user) openModal("login");
    else openModal("deposit");
  };

  const isLive = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";

  return (
    <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden hover:border-[#ffdf19]/30 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#121315] border-b border-[#2a2c30]">
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1 rounded-full bg-[#ef4444] px-2 py-0.5 text-[9px] font-black text-white animate-pulse">
              ● LIVE
            </span>
          )}
          {isFinished && (
            <span className="rounded-full bg-[#374151] px-2 py-0.5 text-[9px] font-bold text-[#9ca3af]">
              FINISHED
            </span>
          )}
          {match.status === "UPCOMING" && (
            <span className="rounded-full bg-[#1e3a5f] px-2 py-0.5 text-[9px] font-bold text-[#60a5fa]">
              UPCOMING
            </span>
          )}
          <span className="text-[10px] font-semibold text-[#9ca3af]">{match.league}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-[#6b7280]">{match.provider}</span>
          <span className="text-[10px] font-bold text-[#ffdf19]">{match.time}</span>
        </div>
      </div>

      {/* Match Content */}
      <div className="p-3">
        <div className="flex items-center justify-between gap-3">
          {/* Team 1 */}
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-black text-white">{match.team1}</p>
            {match.score1 && match.score1 !== "TBD" && (
              <p className={cn("text-sm font-black mt-0.5", isLive ? "text-[#ffdf19]" : "text-[#9ca3af]")}>
                {match.score1}
                {match.overs1 && <span className="ml-1 text-[9px] font-semibold text-[#6b7280]">({match.overs1} ov)</span>}
              </p>
            )}
          </div>

          {/* VS */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <span className="text-[10px] font-black text-[#4b5563]">VS</span>
            {isLive && (
              <span className="h-1 w-1 rounded-full bg-[#22c55e] animate-pulse" />
            )}
          </div>

          {/* Team 2 */}
          <div className="flex-1 min-w-0 text-right">
            <p className="truncate text-xs font-black text-white">{match.team2}</p>
            {match.score2 && match.score2 !== "TBD" && (
              <p className={cn("text-sm font-black mt-0.5", isLive ? "text-[#ffdf19]" : "text-[#9ca3af]")}>
                {match.score2}
                {match.overs2 && <span className="ml-1 text-[9px] font-semibold text-[#6b7280]">({match.overs2} ov)</span>}
              </p>
            )}
          </div>
        </div>

        {/* Odds Row */}
        {!isFinished && (
          <div className={cn("mt-3 grid gap-1.5", match.odds.draw ? "grid-cols-3" : "grid-cols-2")}>
            <button
              onClick={handleOddsClick}
              className="rounded-lg bg-[#1d4ed8]/20 border border-[#1d4ed8]/30 py-2 text-center text-xs font-black text-[#60a5fa] transition hover:bg-[#1d4ed8]/30 hover:border-[#1d4ed8]/60 active:scale-95"
            >
              <div className="text-[8px] text-[#9ca3af] font-semibold mb-0.5">1</div>
              {match.odds.team1}
            </button>
            {match.odds.draw && (
              <button
                onClick={handleOddsClick}
                className="rounded-lg bg-[#374151]/50 border border-[#4b5563]/30 py-2 text-center text-xs font-black text-[#9ca3af] transition hover:bg-[#374151] active:scale-95"
              >
                <div className="text-[8px] text-[#6b7280] font-semibold mb-0.5">X</div>
                {match.odds.draw}
              </button>
            )}
            <button
              onClick={handleOddsClick}
              className="rounded-lg bg-[#ec4899]/20 border border-[#ec4899]/30 py-2 text-center text-xs font-black text-[#f472b6] transition hover:bg-[#ec4899]/30 hover:border-[#ec4899]/60 active:scale-95"
            >
              <div className="text-[8px] text-[#9ca3af] font-semibold mb-0.5">2</div>
              {match.odds.team2}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Sports Page ─── */
export default function SportsPageComponent() {
  const [activeSport, setActiveSport] = useState("all");

  const filteredMatches = activeSport === "all"
    ? LIVE_MATCHES
    : LIVE_MATCHES.filter((m) => m.sport === activeSport);

  return (
    <div className="space-y-0 pb-24">
      <WinnersTicker />

      {/* Category tabs */}
      <CategoryTabs active="sports" />

      <div className="space-y-6 px-3 py-4 sm:px-5 sm:py-5">
        {/* ── Section Header ── */}
        <div className="flex items-center gap-2">
          <span className="section-title-bar" />
          <span className="text-xl">⚽</span>
          <h1 className="text-base font-black uppercase tracking-wide text-[#f0f0f0] sm:text-xl">
            Sports
          </h1>
          <span className="ml-1 text-sm text-[#9ca3af] font-semibold">স্পোর্টস</span>
          <span className="ml-auto flex items-center gap-1 text-[10px] font-black text-[#22c55e] bg-[#22c55e]/10 rounded-full px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            {LIVE_MATCHES.filter(m => m.status === "LIVE").length} Live Now
          </span>
        </div>

        {/* ── Provider Cards Grid (bj88 style) ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Top 3 — large */}
          {SPORT_PROVIDERS.slice(0, 3).map((provider) => (
            <SportProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
        {/* Bottom row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SPORT_PROVIDERS.slice(3).map((provider) => (
            <SportProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {/* ── Live Matches Section ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="section-title-bar" />
            <span className="text-base">📺</span>
            <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
              Live & Upcoming Matches
            </h2>
          </div>

          {/* Sub-sport filter tabs */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {SUB_SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setActiveSport(sport.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black transition-all duration-150",
                  activeSport === sport.id
                    ? "bg-[#ffdf19] text-[#241a05] shadow-[0_2px_8px_rgba(255,223,25,0.4)]"
                    : "bg-[#242628] text-[#9ca3af] hover:bg-[#2f3235] hover:text-white border border-[#2a2c30]"
                )}
              >
                <span>{sport.emoji}</span>
                <span>{sport.label}</span>
              </button>
            ))}
          </div>

          {/* Match Cards Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
            {filteredMatches.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-[#383b3f] bg-[#121315] py-12 text-center">
                <p className="text-4xl mb-3">⚽</p>
                <h3 className="text-base font-black text-[#f0f0f0]">No matches available</h3>
                <p className="mt-1 text-xs text-[#9ca3af]">Check back soon for live events</p>
                <button
                  onClick={() => setActiveSport("all")}
                  className="mt-4 rounded-lg bg-[#ffdf19] px-4 py-2 text-xs font-bold text-[#241a05]"
                >
                  Show All Sports
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Sports Features Strip ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: "⚡", title: "Live In-Play", sub: "Real-time odds", color: "#ffdf19" },
            { icon: "💳", title: "bKash / Nagad", sub: "Fast deposits", color: "#e91e8c" },
            { icon: "🏆", title: "500+ Markets", sub: "Per match", color: "#22c55e" },
            { icon: "🔒", title: "100% Secure", sub: "Licensed & Safe", color: "#3b82f6" },
          ].map((feat) => (
            <div
              key={feat.title}
              className="flex flex-col items-center gap-2 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4 text-center hover:border-[#ffdf19]/30 transition"
              style={{ boxShadow: `0 0 0 0 ${feat.color}` }}
            >
              <span className="text-2xl" style={{ filter: `drop-shadow(0 0 6px ${feat.color}55)` }}>
                {feat.icon}
              </span>
              <div>
                <p className="text-xs font-black text-white">{feat.title}</p>
                <p className="text-[10px] text-[#9ca3af]">{feat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
