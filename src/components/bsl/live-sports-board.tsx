"use client";

import { useMemo, useState } from "react";
import { Search, Radio, CalendarClock } from "lucide-react";
import { SPORTS_EVENTS } from "@/lib/catalog";
import { OddsButton } from "./odds-button";
import { cn } from "@/lib/utils";

const sports = ["all", "Cricket", "Football"];
const states = ["all", "live", "upcoming"];

export function LiveSportsBoard({ defaultSport = "all", defaultState = "all" }: { defaultSport?: string; defaultState?: string }) {
  const [sport, setSport] = useState(defaultSport);
  const [state, setState] = useState(defaultState);
  const [query, setQuery] = useState("");

  const events = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SPORTS_EVENTS
      .filter((event) => sport === "all" || event.sport === sport)
      .filter((event) => state === "all" || event.status === state)
      .filter((event) => !q || `${event.league} ${event.team1} ${event.team2} ${event.sport}`.toLowerCase().includes(q));
  }, [query, sport, state]);

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 bsl-card-glow">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="flex h-12 items-center rounded-xl border border-[#2a2c30] bg-[#121315] px-3 text-[#9ca3af] focus-within:border-[#ffdf19]">
            <Search size={17} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search live matches, leagues, teams" className="w-full bg-transparent px-3 text-sm text-[#f0f0f0] outline-none" />
          </label>
          <div className="flex gap-2 overflow-x-auto">
            {sports.map((item) => <button key={item} onClick={() => setSport(item)} className={cn("rounded-xl px-4 py-2 text-sm font-black", sport === item ? "bg-[#ffdf19] text-[#241a05]" : "bg-[#121315] text-[#d8d2bf]")}>{item === "all" ? "All Sports" : item}</button>)}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {states.map((item) => <button key={item} onClick={() => setState(item)} className={cn("rounded-xl px-4 py-2 text-sm font-black capitalize", state === item ? "bg-[#008d5b] text-white" : "bg-[#121315] text-[#d8d2bf]")}>{item}</button>)}
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {events.map((event) => (
          <article key={event.id} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 transition hover:border-[#ffdf19]/40">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#242628] px-2 py-1 text-xs font-bold text-[#9ca3af]">{event.league}</span>
              {event.status === "live" ? <span className="flex items-center gap-1 rounded-full bg-[#ef4444]/15 px-2 py-1 text-xs font-black text-[#ef4444]"><Radio size={12} /> LIVE {event.minute}</span> : <span className="flex items-center gap-1 rounded-full bg-[#ffdf19]/10 px-2 py-1 text-xs font-black text-[#ffdf19]"><CalendarClock size={12} /> UPCOMING</span>}
              <span className="ml-auto text-xs font-bold text-[#9ca3af]">BDT markets</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-lg font-black text-[#f0f0f0]">{event.team1}</p>
                <p className="text-lg font-black text-[#f0f0f0]">{event.team2}</p>
                <p className="mt-1 text-xs text-[#9ca3af]">Match winner • Live odds preview</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {event.odds.map((odd, i) => <OddsButton key={i} label={i === 0 ? "1" : i === 1 ? "X" : "2"} odd={odd} event={`${event.team1} vs ${event.team2}`} />)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
