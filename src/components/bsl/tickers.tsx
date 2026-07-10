"use client";

import { useEffect, useState } from "react";
import { formatBDT } from "@/lib/utils";

import { Volume2 } from "lucide-react";

export function NewsMarquee() {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-[#2a2c30] bg-[#121315]">
      <div className="flex shrink-0 items-center justify-center bg-[#1b1c1e] px-3 py-2 text-[#ffdf19]">
        <Volume2 size={16} />
      </div>
      <div className="relative flex-1 overflow-hidden py-2 text-xs font-semibold text-[#f0f0f0]">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4 text-[#ffdf19] font-black">LATEST NEWS:</span>
          Bangladesh Premier League betting is now LIVE! Bet on all BPL fixtures with unmatched odds and zero commission. 
          <span className="mx-4 text-[#ffdf19] font-black">|</span>
          Welcome Bonus 100% up to 10,000 BDT for new accounts! 
          <span className="mx-4 text-[#ffdf19] font-black">|</span>
          Crazy Time Mega Win: ৳2,450,000 paid out today! 
          <span className="mx-4 text-[#ffdf19] font-black">|</span>
          Instant withdrawals via bKash, Nagad, and Rocket now enabled 24/7.
        </div>
      </div>
    </div>
  );
}

export function WinnersTicker() {
  const [index, setIndex] = useState(0);

  const winners = [
    { name: "Rahim****", amount: "৳82,500", game: "Cricket Parlay", emoji: "🏏" },
    { name: "Nadia****", amount: "৳45,200", game: "Gates of Olympus", emoji: "⚡" },
    { name: "Sajib****", amount: "৳19,800", game: "Aviator", emoji: "🚀" },
    { name: "Mita****", amount: "৳12,450", game: "Baccarat", emoji: "🃏" },
    { name: "Kamrul****", amount: "৳6,100", game: "Crazy Time", emoji: "🎪" },
    { name: "Tariq****", amount: "৳115,000", game: "Mega Wheel", emoji: "🎡" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % winners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [winners.length]);

  return (
    <div className="relative flex h-10 w-full items-center overflow-hidden rounded-lg border border-[#2a2c30] bg-[#121315] shadow-inner mt-4">
      <div className="absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-[#121315] via-[#121315] to-transparent px-3 text-xs font-black uppercase text-[#ffdf19]">
        <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-[#22c55e]" />
        Live Wins
      </div>
      <div className="absolute left-24 flex h-full w-full items-center">
        {winners.map((winner, i) => (
          <div
            key={i}
            className="absolute flex w-full items-center gap-2 px-4 text-xs font-semibold text-[#f0f0f0] transition-all duration-500 ease-in-out"
            style={{
              transform: `translateY(${(i - index) * 100}%)`,
              opacity: i === index ? 1 : 0,
            }}
          >
            <span className="text-[#9ca3af]">{winner.name}</span>
            <span className="text-[#9ca3af]">won</span>
            <span className="font-bold text-[#22c55e]">{winner.amount}</span>
            <span className="text-[#9ca3af]">on</span>
            <span>{winner.emoji} {winner.game}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JackpotTicker() {
  const [jackpot, setJackpot] = useState(25438910.45);

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot((prev) => prev + Math.random() * 50 + 10);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const formattedJackpot = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(jackpot);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#2a2c30] bg-gradient-to-r from-[#1a1100] via-[#241a05] to-[#1a1100] p-6 text-center shadow-lg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,223,25,0.15),transparent_70%)]" />
      <p className="relative z-10 text-xs font-black uppercase tracking-[0.2em] text-[#ffdf19]">
        Grand Jackpot Progressive
      </p>
      <div className="relative z-10 mt-2 font-mono text-3xl font-black text-white sm:text-4xl">
        <span className="animate-pulse">{formattedJackpot.split(".")[0]}</span>
        <span className="text-[#ffdf19]">.{formattedJackpot.split(".")[1]}</span>
      </div>
      <p className="relative z-10 mt-2 text-[10px] text-white/50">
        Jackpot must fall before ৳50,000,000
      </p>
    </div>
  );
}
