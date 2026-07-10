"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import toast from "react-hot-toast";

interface OddData {
  price: number;
  size: number;
}

interface Runner {
  id: string;
  name: string;
  back: OddData[];
  lay: OddData[];
}

export function ExchangeSimulator() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [runners, setRunners] = useState<Runner[]>([
    {
      id: "r1",
      name: "Bangladesh",
      back: [{ price: 1.82, size: 48200 }, { price: 1.81, size: 12000 }, { price: 1.80, size: 5000 }],
      lay: [{ price: 1.84, size: 36800 }, { price: 1.85, size: 9000 }, { price: 1.86, size: 2000 }],
    },
    {
      id: "r2",
      name: "India",
      back: [{ price: 2.04, size: 18500 }, { price: 2.02, size: 8500 }, { price: 2.00, size: 3000 }],
      lay: [{ price: 2.06, size: 16300 }, { price: 2.08, size: 7000 }, { price: 2.10, size: 1500 }],
    }
  ]);

  const [flashing, setFlashing] = useState<Record<string, 'back' | 'lay' | null>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setRunners((prev) => {
        const newRunners = [...prev];
        const rIndex = Math.floor(Math.random() * newRunners.length);
        const type = Math.random() > 0.5 ? 'back' : 'lay';
        const colIndex = Math.floor(Math.random() * 3);
        
        const change = (Math.random() - 0.5) * 0.04;
        const runner = newRunners[rIndex];
        const oldPrice = runner[type][colIndex].price;
        
        runner[type][colIndex].price = Math.max(1.01, oldPrice + change);
        runner[type][colIndex].size += Math.floor((Math.random() - 0.5) * 5000);
        
        if (runner[type][colIndex].size < 0) runner[type][colIndex].size = Math.abs(runner[type][colIndex].size);

        setFlashing({ [`${rIndex}-${type}-${colIndex}`]: type });
        setTimeout(() => setFlashing({}), 300);

        return newRunners;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleOddClick = (type: string, price: number) => {
    if (!user) {
      openModal("login");
      return;
    }
    toast.error(`Insufficient balance to place ৳500 ${type} bet at ${price.toFixed(2)}. Please deposit.`);
    openModal("deposit");
  };

  return (
    <div className="rounded-xl border border-[#2a2c30] bg-[#121315] overflow-hidden shadow-2xl">
      <div className="bg-[#1b1c1e] p-3 border-b border-[#2a2c30] flex items-center justify-between">
        <div>
          <span className="flex items-center gap-2 text-xs font-bold text-[#ffdf19]">
            <span className="live-dot live-dot-pulse bg-[#ef4444]" /> LIVE
          </span>
          <h3 className="text-sm font-black text-white mt-1">Match Odds</h3>
        </div>
        <span className="text-xs text-[#9ca3af]">Matched: ৳ 12,450,200</span>
      </div>
      
      <div className="grid grid-cols-[1fr_auto] border-b border-[#2a2c30] text-xs font-bold text-[#9ca3af]">
        <div className="p-3 flex items-center gap-2">
          <span>Min/Max: 100 / 100,000</span>
        </div>
        <div className="flex">
          <div className="w-[150px] grid grid-cols-3 text-center bg-[#72bbef]/20 text-[#72bbef]">
            <div className="p-2 border-r border-[#2a2c30]/50">Back</div>
          </div>
          <div className="w-[150px] grid grid-cols-3 text-center bg-[#faa9ba]/20 text-[#faa9ba]">
            <div className="p-2">Lay</div>
          </div>
        </div>
      </div>

      {runners.map((runner, rIdx) => (
        <div key={runner.id} className="grid grid-cols-[1fr_auto] border-b border-[#2a2c30] hover:bg-[#1b1c1e] transition">
          <div className="p-3 flex flex-col justify-center">
            <span className="text-sm font-bold text-white">{runner.name}</span>
          </div>
          <div className="flex">
            <div className="flex w-[150px]">
              {runner.back.slice().reverse().map((b, i) => {
                const colIdx = 2 - i;
                const isFlash = flashing[`${rIdx}-back-${colIdx}`] === 'back';
                return (
                  <button 
                    key={i} 
                    onClick={() => handleOddClick('Back', b.price)}
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center border-r border-white/5 py-1 px-1 transition-colors active:scale-95 cursor-pointer",
                      i === 2 ? "bg-[#72bbef] text-black" : "bg-[#72bbef]/80 hover:bg-[#72bbef]",
                      isFlash && "bg-[#ffdf19]"
                    )}
                  >
                    <span className="text-sm font-black">{b.price.toFixed(2)}</span>
                    <span className="text-[9px] opacity-80">{(b.size / 1000).toFixed(1)}K</span>
                  </button>
                )
              })}
            </div>
            <div className="flex w-[150px]">
              {runner.lay.map((l, i) => {
                const isFlash = flashing[`${rIdx}-lay-${i}`] === 'lay';
                return (
                  <button 
                    key={i} 
                    onClick={() => handleOddClick('Lay', l.price)}
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center border-r border-white/5 py-1 px-1 transition-colors active:scale-95 cursor-pointer",
                      i === 0 ? "bg-[#faa9ba] text-black" : "bg-[#faa9ba]/80 hover:bg-[#faa9ba]",
                      isFlash && "bg-[#ffdf19]"
                    )}
                  >
                    <span className="text-sm font-black">{l.price.toFixed(2)}</span>
                    <span className="text-[9px] opacity-80">{(l.size / 1000).toFixed(1)}K</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
