"use client";

import Link from "next/link";
import { useModal } from "@/components/providers/modal-provider";

/* Real-looking live odds data */
const LIVE_MATCHES = [
  {
    id: "m1",
    sport: "Cricket",
    league: "Major League Cricket",
    country: "USA",
    flag: "🇺🇸",
    team1: "Texas Super Kings",
    team2: "Washington Freedom",
    score1: "165/10",
    score2: "98/3",
    detail: "1 INN, 14.0 OV",
    status: "LIVE",
    odds: ["2.74", "2.8", "1.55", "1.57"],
    oddsLabel: ["1", "X", "2", "T"],
  },
  {
    id: "m2",
    sport: "Cricket",
    league: "ICC ODI Championship",
    country: "International",
    flag: "🌍",
    team1: "West Indies",
    team2: "New Zealand",
    score1: "0/0",
    score2: "267/10",
    detail: "1 INN, 0.0 OV",
    status: "LIVE",
    odds: ["3.35", "3.45", "1.41", "1.42"],
    oddsLabel: ["1", "X", "2", "T"],
  },
  {
    id: "m3",
    sport: "Cricket",
    league: "Major League Cricket",
    country: "USA",
    flag: "🇺🇸",
    team1: "Seattle Orcas",
    team2: "San Francisco Unicorns",
    score1: "-",
    score2: "-",
    detail: "Today, 06:30",
    status: "SOON",
    odds: ["2.04", "2.22", "1.83", "1.97"],
    oddsLabel: ["1", "X", "2", "T"],
  },
  {
    id: "m4",
    sport: "Cricket",
    league: "T20 Blast",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    team1: "Kent",
    team2: "Middlesex",
    score1: "-",
    score2: "-",
    detail: "Today, 19:30",
    status: "SOON",
    odds: ["1.68", "1.77", "2.28", "2.48"],
    oddsLabel: ["1", "X", "2", "T"],
  },
];

const SPORT_FILTERS = ["All", "Cricket", "Football", "Tennis", "Basketball"];

export function LiveOddsPanel() {
  const { openModal } = useModal();

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="flex h-2 w-2 rounded-full bg-[#ef4444] animate-pulse shadow-[0_0_6px_#ef4444]" />
        <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
          Live Odds
        </h2>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar ml-2">
          {SPORT_FILTERS.map((f, i) => (
            <button key={f}
              className={"shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold transition " +
                (i === 0 ? "bg-[#ffdf19] text-[#241a05]" : "bg-[#1b1c1e] text-[#9ca3af] border border-[#2a2c30] hover:border-[#ffdf19]/40")}>
              {f}
            </button>
          ))}
        </div>
        <Link href="/sports" className="ml-auto shrink-0 text-[11px] font-bold text-[#ffdf19] hover:underline">
          Full Exchange →
        </Link>
      </div>

      {/* Odds cards scroll */}
      <div className="overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#1b1c1e]">
        {/* Column header */}
        <div className="grid grid-cols-[1fr_auto] border-b border-[#2a2c30] bg-[#121315] px-4 py-2 text-[9px] font-black uppercase tracking-widest text-[#6b7280]">
          <span>Match</span>
          <div className="flex gap-2 text-center">
            {["1", "X", "2", "T"].map((l) => (
              <span key={l} className="w-12 text-center">{l}</span>
            ))}
          </div>
        </div>

        {LIVE_MATCHES.map((m, idx) => (
          <div key={m.id} className={"border-b last:border-b-0 border-[#2a2c30] " + (idx % 2 === 0 ? "bg-[#1b1c1e]" : "bg-[#19191c]")}>
            <div className="flex items-center gap-2 px-4 py-1.5 border-b border-[#2a2c30]/50">
              <span className="text-[10px]">{m.flag}</span>
              <span className="text-[10px] text-[#6b7280] font-bold truncate">{m.league}</span>
              {m.status === "LIVE" ? (
                <span className="ml-auto shrink-0 flex items-center gap-1 rounded-full bg-[#ef4444] px-2 py-0.5 text-[8px] font-black text-white animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" /> LIVE
                </span>
              ) : (
                <span className="ml-auto shrink-0 rounded-full bg-[#1d4ed8]/30 px-2 py-0.5 text-[8px] font-black text-[#60a5fa]">{m.detail}</span>
              )}
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center px-4 py-2.5">
              <div>
                <p className="text-xs font-black text-white">{m.team1}</p>
                {m.status === "LIVE" && <p className="text-[10px] font-bold text-[#ffdf19]">{m.score1}</p>}
                <p className="text-xs font-bold text-[#9ca3af] mt-0.5">{m.team2}</p>
                {m.status === "LIVE" && <p className="text-[10px] font-bold text-[#ffdf19]">{m.score2}</p>}
                {m.status === "LIVE" && <p className="text-[9px] text-[#6b7280] mt-0.5">{m.detail}</p>}
              </div>

              <div className="flex gap-1.5">
                {m.odds.map((odd, i) => (
                  <button key={i}
                    onClick={() => openModal("login")}
                    className="flex w-12 flex-col items-center justify-center rounded-lg border border-[#2a2c30] bg-[#121315] px-2 py-1.5 text-center transition hover:border-[#ffdf19]/50 hover:bg-[#ffdf19]/5 active:scale-95">
                    <span className="text-[8px] font-bold text-[#6b7280]">{m.oddsLabel[i]}</span>
                    <span className="text-[11px] font-black text-[#3b82f6]">{odd}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
