"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Match {
  id: string;
  sport: string;
  flag: string;
  league: string;
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  detail: string;
  status: "LIVE" | "SOON" | "FIN";
}

const MATCHES: Match[] = [
  { id: "m1", sport: "cricket", flag: "🏏", league: "BPL 2025", team1: "Dhaka Dominators", team2: "Rajshahi Royals", score1: "182/6", score2: "145/8", detail: "Over 18.3 ● RESULT", status: "FIN" },
  { id: "m2", sport: "cricket", flag: "🏏", league: "India vs Bangladesh", team1: "India", team2: "Bangladesh", score1: "278/9", score2: "124/4", detail: "43rd Over", status: "LIVE" },
  { id: "m3", sport: "football", flag: "⚽", league: "EPL", team1: "Man City", team2: "Arsenal", score1: "2", score2: "1", detail: "67'", status: "LIVE" },
  { id: "m4", sport: "cricket", flag: "🏏", league: "ICC T20 WC", team1: "Pakistan", team2: "Sri Lanka", score1: "Today 7:00 PM", score2: "", detail: "BD Standard Time", status: "SOON" },
  { id: "m5", sport: "football", flag: "⚽", league: "La Liga", team1: "Real Madrid", team2: "Barcelona", score1: "1", score2: "1", detail: "78'", status: "LIVE" },
  { id: "m6", sport: "cricket", flag: "🏏", league: "PSL 2025", team1: "Lahore Qal.", team2: "Karachi K.", score1: "198/4", score2: "Chasing", detail: "Now Live!", status: "LIVE" },
  { id: "m7", sport: "tennis", flag: "🎾", league: "Wimbledon", team1: "Djokovic", team2: "Alcaraz", score1: "6-3, 5-4", score2: "", detail: "Set 2 in progress", status: "LIVE" },
  { id: "m8", sport: "cricket", flag: "🏏", league: "IPL 2025", team1: "Mumbai Indians", team2: "CSK", score1: "Tomorrow 8:00 PM", score2: "", detail: "BD Standard Time", status: "SOON" },
];

function useOscillatingScores(matches: Match[]) {
  const [liveMatches, setLiveMatches] = useState(matches);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatches((prev) =>
        prev.map((m) => {
          if (m.status !== "LIVE" || m.sport !== "cricket") return m;
          const parts = m.score1.split("/");
          if (parts.length !== 2) return m;
          const runs = parseInt(parts[0]) + (Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0);
          return { ...m, score1: `${Math.min(runs, 300)}/${parts[1]}` };
        })
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return liveMatches;
}

export function LiveScoreTicker() {
  const matches = useOscillatingScores(MATCHES);

  return (
    <section className="rounded-2xl border border-[#2a2c30] bg-[#0f1012] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2a2c30] bg-[#1b1c1e] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#ef4444] animate-pulse shadow-[0_0_6px_#ef4444]" />
          <span className="text-xs font-black uppercase tracking-wide text-white">Live Scores</span>
          <span className="rounded-full bg-[#ef4444]/15 px-2 py-0.5 text-[8px] font-black text-[#ef4444]">
            {matches.filter((m) => m.status === "LIVE").length} LIVE
          </span>
        </div>
        <Link href="/sports" className="text-[10px] font-bold text-[#ffdf19] hover:underline">
          Full Scoreboard →
        </Link>
      </div>

      {/* Scrollable score row */}
      <div className="no-scrollbar flex overflow-x-auto divide-x divide-[#2a2c30]">
        {matches.map((m) => (
          <Link
            key={m.id}
            href="/sports"
            className="group shrink-0 flex min-w-[195px] flex-col gap-1.5 px-4 py-3 transition hover:bg-white/4"
          >
            {/* League + status */}
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{m.flag}</span>
              <span className="truncate text-[9px] font-bold uppercase tracking-wide text-[#6b7280]">
                {m.league}
              </span>
              {m.status === "LIVE" && (
                <span className="ml-auto shrink-0 rounded-full bg-[#ef4444] px-1.5 py-0.5 text-[7px] font-black text-white animate-pulse">
                  LIVE
                </span>
              )}
              {m.status === "SOON" && (
                <span className="ml-auto shrink-0 rounded-full bg-[#1d4ed8]/30 px-1.5 py-0.5 text-[7px] font-black text-[#60a5fa]">
                  SOON
                </span>
              )}
              {m.status === "FIN" && (
                <span className="ml-auto shrink-0 rounded-full bg-[#374151] px-1.5 py-0.5 text-[7px] font-black text-[#9ca3af]">
                  FIN
                </span>
              )}
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-black text-white truncate flex-1">{m.team1}</p>
              {m.score1 && (
                <p
                  className="shrink-0 text-[11px] font-black tabular-nums"
                  style={{ color: m.status === "LIVE" ? "#22c55e" : "#9ca3af" }}
                >
                  {m.score1}
                </p>
              )}
            </div>
            {m.team2 && (
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-[#9ca3af] truncate flex-1">{m.team2}</p>
                {m.score2 && (
                  <p className="shrink-0 text-[11px] font-black text-[#ffdf19] tabular-nums">{m.score2}</p>
                )}
              </div>
            )}

            {/* Detail */}
            <p className="text-[9px] text-[#6b7280] truncate">{m.detail}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
