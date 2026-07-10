"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { formatBDT } from "@/lib/utils";

const GAMES = ["Crazy Time", "Lightning Roulette", "Baccarat", "Mega Wheel", "Aviator", "Cricket Exchange"];
const USERS = ["017****281", "019****992", "018****445", "013****112", "016****773", "017****001"];

export function LiveWinners() {
  const [winners, setWinners] = useState(
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      user: USERS[Math.floor(Math.random() * USERS.length)],
      amount: Math.floor(Math.random() * 450000) + 5000,
      game: GAMES[Math.floor(Math.random() * GAMES.length)],
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWinners((prev) => {
        const next = [...prev];
        next.pop();
        next.unshift({
          id: Date.now(),
          user: USERS[Math.floor(Math.random() * USERS.length)],
          amount: Math.floor(Math.random() * 450000) + 5000,
          game: GAMES[Math.floor(Math.random() * GAMES.length)],
        });
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-10 w-full items-center overflow-hidden rounded-full bg-[#1b1c1e] px-4 shadow-[inset_0_1px_rgba(255,255,255,0.05)] border border-[#2a2c30]">
      <div className="flex shrink-0 items-center gap-2 pr-4 font-black uppercase text-[#ffdf19]">
        <Trophy size={16} /> Live Wins
      </div>
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        <div className="flex animate-marquee items-center gap-8 whitespace-nowrap">
          {[...winners, ...winners].map((w, i) => (
            <div key={`${w.id}-${i}`} className="flex items-center gap-2 text-sm">
              <span className="font-bold text-[#f0f0f0]">{w.user}</span>
              <span className="text-[#9ca3af]">won</span>
              <span className="font-black text-[#22c55e]">{formatBDT(w.amount)}</span>
              <span className="text-[#9ca3af]">in</span>
              <span className="font-bold text-[#f0f0f0]">{w.game}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
