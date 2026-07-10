"use client";

import { useEffect, useState } from "react";
import { formatBDT } from "@/lib/utils";

interface Win {
  username: string;
  amount: number;
  game: string;
}

const WINS: Win[] = [
  { username: "Rahim***", amount: 12500, game: "Aviator" },
  { username: "Karim***", amount: 8200, game: "Crazy Time" },
  { username: "Sabi***", amount: 45300, game: "Gates of Olympus" },
  { username: "Naye***", amount: 15800, game: "Sweet Bonanza" },
  { username: "Tahi***", amount: 9600, game: "Lightning Roulette" },
  { username: "Fari***", amount: 32100, game: "Mega Wheel" },
  { username: "Jame***", amount: 7400, game: "Baccarat" },
  { username: "Araf***", amount: 18900, game: "Dragon Tiger" },
  { username: "Mitu***", amount: 6300, game: "Teen Patti" },
  { username: "Hasa***", amount: 27500, game: "Super Ace" },
  { username: "Rifa***", amount: 11200, game: "Fortune Gems 3" },
  { username: "Saki***", amount: 5800, game: "Plinko" },
];

export function WinnersTicker() {
  const items = [...WINS, ...WINS];

  return (
    <div className="flex items-center gap-2 overflow-hidden border-y border-[#2a2c30] bg-[#1b1c1e] px-3 py-2">
      <span className="flex shrink-0 items-center gap-1.5 rounded bg-[#008d5b]/15 px-2 py-1 text-[10px] font-bold text-[#22c55e]">
        <span className="live-dot live-dot-pulse" />
        LIVE WINS
      </span>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap">
          {items.map((win, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
              <span className="font-semibold text-[#f0f0f0]">{win.username}</span>
              <span className="font-bold text-[#ffdf19]">{formatBDT(win.amount)}</span>
              <span className="text-[#6b7280]">on {win.game}</span>
              <span className="text-[#2a2c30]">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function JackpotTicker() {
  const [value, setValue] = useState(18_245_900);

  useEffect(() => {
    const t = setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * 350) + 50);
    }, 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-[#ffdf19]/30 bg-gradient-to-r from-[#1b1c1e] via-[#242628] to-[#1b1c1e] px-4 py-3">
      <span className="text-xl">💰</span>
      <div className="text-center">
        <p className="text-[10px] font-bold tracking-widest text-[#9ca3af]">
          MEGA JACKPOT
        </p>
        <p className="text-lg font-extrabold text-[#ffdf19] sm:text-2xl">
          {formatBDT(value)}
        </p>
      </div>
    </div>
  );
}
