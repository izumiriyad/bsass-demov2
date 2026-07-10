"use client";

import { useState } from "react";
import { Gift, Sparkles, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SLICES = [
  { label: "10 BDT", color: "#ef4444" },
  { label: "Empty", color: "#1b1c1e" },
  { label: "50 BDT", color: "#00a86d" },
  { label: "Try Again", color: "#242628" },
  { label: "500 BDT", color: "#ffdf19", text: "#241a05" },
  { label: "Empty", color: "#1b1c1e" },
  { label: "100 BDT", color: "#3b82f6" },
  { label: "Try Again", color: "#242628" },
];

export default function LuckySpinPage() {
  const { user } = useAuth();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (!user) {
      toast.error("Please login to spin the wheel.");
      return;
    }
    if (spinning) return;
    
    setSpinning(true);
    
    // Calculate random target
    const targetSlice = Math.floor(Math.random() * SLIDES_COUNT);
    const sliceAngle = 360 / SLIDES_COUNT;
    const spins = 5; // 5 full spins
    const targetRotation = (spins * 360) + (360 - (targetSlice * sliceAngle)) - (sliceAngle / 2);
    
    const newTotalRotation = rotation + targetRotation;
    setRotation(newTotalRotation);
    
    setTimeout(() => {
      setSpinning(false);
      const prize = SLICES[targetSlice].label;
      if (prize === "Empty" || prize === "Try Again") {
        toast.error(`Better luck next time! (${prize})`);
      } else {
        toast.success(`You won ${prize}! Bonus credited.`);
      }
    }, 4000);
  };

  const SLIDES_COUNT = SLICES.length;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-4 py-12 overflow-hidden">
      <div className="text-center space-y-2 relative z-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-[#ffdf19] to-[#f4a700] shadow-[0_0_30px_rgba(255,223,25,0.4)]">
          <Gift size={32} className="text-[#241a05]" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider text-white drop-shadow-lg">Daily Lucky Spin</h1>
        <p className="text-sm font-semibold text-[#ffdf19]">Spin every day to win up to 500 BDT!</p>
      </div>

      <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 text-[#ffdf19] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          <ChevronDown size={48} className="fill-current" />
        </div>
        
        {/* Wheel border glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffdf19] to-[#f4a700] p-1.5 shadow-[0_0_50px_rgba(255,223,25,0.2)]">
          <div 
            className="w-full h-full rounded-full overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] transition-transform duration-[4000ms] ease-[cubic-bezier(0.15,0.85,0.3,1)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {SLICES.map((slice, i) => {
              const rotationAngle = (360 / SLIDES_COUNT) * i;
              return (
                <div 
                  key={i} 
                  className="absolute top-0 left-1/2 w-1/2 h-[50%] origin-bottom-left border-l border-[#2a2c30]"
                  style={{ 
                    transform: `rotate(${rotationAngle}deg) skewY(${90 - (360/SLIDES_COUNT)}deg)`,
                    backgroundColor: slice.color 
                  }}
                >
                  <div 
                    className="absolute bottom-4 left-6 text-xs sm:text-sm font-black uppercase whitespace-nowrap drop-shadow"
                    style={{ 
                      transform: `skewY(-${90 - (360/SLIDES_COUNT)}deg) rotate(${ (360/SLIDES_COUNT) / 2 }deg)`,
                      color: slice.text || "#fff"
                    }}
                  >
                    {slice.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Center hub */}
        <button 
          onClick={spin}
          disabled={spinning}
          className="absolute z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#ffdf19] to-[#f4a700] border-4 border-[#241a05] shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition disabled:opacity-80 disabled:hover:scale-100 cursor-pointer"
        >
          <span className="font-black text-[#241a05] text-lg sm:text-xl leading-none">SPIN</span>
        </button>
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5 text-center max-w-sm w-full">
        <h3 className="font-bold text-[#f0f0f0] flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-[#ffdf19]" /> Today's Chances: 1
        </h3>
        <p className="mt-1 text-xs text-[#9ca3af]">Deposit 500 BDT to unlock another spin today.</p>
        {!user && (
          <Link href="/register" className="mt-4 block rounded-lg bg-[#242628] py-3 text-sm font-bold text-white hover:bg-[#383b3f]">
            Login to Play
          </Link>
        )}
      </div>
    </div>
  );
}
