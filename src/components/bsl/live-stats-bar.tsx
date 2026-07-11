"use client";

import { useEffect, useState } from "react";

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function LiveStatsBar() {
  const [online, setOnline] = useState(4812);
  const [jackpot, setJackpot] = useState(12480500);
  const [wins, setWins] = useState(1284);

  useEffect(() => {
    const t = setInterval(() => {
      setOnline((v) => v + randomRange(-8, 20));
      setJackpot((v) => v + randomRange(200, 1500));
      setWins((v) => v + randomRange(0, 3));
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) => n.toLocaleString("en-BD");

  return (
    <div
      className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar rounded-xl border border-[#1e2026] bg-[#0d0f10] px-4 py-2.5"
      style={{ background: "linear-gradient(90deg, #0d0f10, #141618, #0d0f10)" }}
    >
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="flex h-2 w-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_6px_#22c55e]" />
        <span className="text-[10px] font-black text-[#9ca3af] uppercase tracking-wider">Online</span>
        <span className="text-[10px] font-black text-[#22c55e]">{fmt(online)}</span>
      </div>

      <div className="h-3 w-px bg-[#2a2c30] shrink-0" />

      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[10px]">🏆</span>
        <span className="text-[10px] font-black text-[#9ca3af] uppercase tracking-wider">Daily Pot</span>
        <span className="text-[10px] font-black text-[#ffdf19]">৳{fmt(jackpot)}</span>
      </div>

      <div className="h-3 w-px bg-[#2a2c30] shrink-0" />

      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[10px]">🎉</span>
        <span className="text-[10px] font-black text-[#9ca3af] uppercase tracking-wider">Wins Today</span>
        <span className="text-[10px] font-black text-[#22c55e]">{fmt(wins)}</span>
      </div>

      <div className="h-3 w-px bg-[#2a2c30] shrink-0 hidden sm:block" />

      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        <span className="text-[10px]">🔒</span>
        <span className="text-[10px] font-black text-[#9ca3af] uppercase tracking-wider">Secured</span>
        <span className="text-[10px] font-black text-[#3b82f6]">SSL + PAGCOR</span>
      </div>
    </div>
  );
}
