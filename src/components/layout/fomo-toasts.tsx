"use client";

import { useEffect, useState } from "react";
import { formatBDT, cn } from "@/lib/utils";
import { X, Trophy, Wallet, Zap } from "lucide-react";

interface FomoEvent {
  id: number;
  type: "win" | "withdraw" | "jackpot";
  user: string;
  amount: number;
  game?: string;
  method?: string;
}

const USERS = ["Rahim***", "Karim***", "Sabi***", "Naye***", "Tahi***", "Fari***", "Jame***", "Araf***", "Mitu***", "Hasa***"];
const GAMES = ["Aviator", "Crazy Time", "Super Ace", "Gates of Olympus", "Lightning Roulette", "Baccarat", "Mega Wheel"];
const METHODS = ["bKash", "Nagad", "Rocket"];

function generateRandomEvent(): FomoEvent {
  const type = Math.random() > 0.6 ? "withdraw" : (Math.random() > 0.9 ? "jackpot" : "win");
  const user = USERS[Math.floor(Math.random() * USERS.length)];
  
  if (type === "withdraw") {
    return {
      id: Date.now(),
      type: "withdraw",
      user,
      amount: Math.floor(Math.random() * 50000) + 5000,
      method: METHODS[Math.floor(Math.random() * METHODS.length)]
    };
  } else if (type === "jackpot") {
    return {
      id: Date.now(),
      type: "jackpot",
      user,
      amount: Math.floor(Math.random() * 500000) + 100000,
      game: GAMES[Math.floor(Math.random() * GAMES.length)]
    };
  } else {
    return {
      id: Date.now(),
      type: "win",
      user,
      amount: Math.floor(Math.random() * 20000) + 1000,
      game: GAMES[Math.floor(Math.random() * GAMES.length)]
    };
  }
}

export function FomoToasts() {
  const [event, setEvent] = useState<FomoEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first toast
    const initialTimer = setTimeout(() => triggerNewToast(), 8000);
    return () => clearTimeout(initialTimer);
  }, []);

  const triggerNewToast = () => {
    setEvent(generateRandomEvent());
    setVisible(true);
    
    // Hide after 5 seconds
    setTimeout(() => {
      setVisible(false);
      
      // Trigger next toast between 15-45 seconds
      const nextDelay = Math.floor(Math.random() * 30000) + 15000;
      setTimeout(triggerNewToast, nextDelay);
    }, 5000);
  };

  if (!event) return null;

  return (
    <div className={cn(
      "fixed bottom-[88px] left-4 z-40 lg:bottom-6 lg:left-6 transition-all duration-500 ease-in-out pointer-events-none",
      visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    )}>
      <div className="relative flex max-w-[280px] items-start gap-3 rounded-xl border border-[#35342e] bg-[#1b1c1e]/95 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm pointer-events-auto">
        <button 
          onClick={() => setVisible(false)}
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2a2c30] text-[#9ca3af] hover:text-white border border-[#35342e]"
        >
          <X size={12} />
        </button>
        
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-lg",
          event.type === "win" ? "bg-gradient-to-br from-[#ffdf19] to-[#f4a700] text-[#241a05]" :
          event.type === "withdraw" ? "bg-gradient-to-br from-[#008d5b] to-[#00a86d] text-white" :
          "bg-gradient-to-br from-[#ef4444] to-[#b91c1c] text-white"
        )}>
          {event.type === "win" && <Trophy size={20} />}
          {event.type === "withdraw" && <Wallet size={20} />}
          {event.type === "jackpot" && <Zap size={20} className="animate-pulse" />}
        </div>
        
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#8c8a80]">
            {event.type === "win" && "JUST WON"}
            {event.type === "withdraw" && "JUST WITHDREW"}
            {event.type === "jackpot" && "MEGA JACKPOT HIT!"}
          </p>
          <p className="font-bold leading-tight text-[#f0f0f0] text-sm mt-0.5">
            {event.user} <span className={cn(
              "font-black",
              event.type === "withdraw" ? "text-[#22c55e]" : "text-[#ffdf19]"
            )}>{formatBDT(event.amount)}</span>
          </p>
          <p className="text-[11px] font-semibold text-[#8c8a80] mt-1">
            {event.type === "withdraw" ? `via ${event.method}` : `playing ${event.game}`}
          </p>
        </div>
      </div>
    </div>
  );
}
