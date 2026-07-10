"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function FloatingEnvelope() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Only show if user is logged in
    if (!user) return;
    
    // Check local storage if user already claimed/closed it today
    const checkStatus = () => {
      const claimed = localStorage.getItem(`envelope_${user.id}_${new Date().toDateString()}`);
      if (claimed) {
        setVisible(false);
      } else {
        setTimeout(() => setVisible(true), 3000);
      }
    };
    
    checkStatus();
  }, [user]);

  if (!visible || closed) return null;

  return (
    <div className="fixed right-4 top-[20%] z-40 lg:right-8 transition-transform animate-in fade-in zoom-in duration-500 hover:scale-110">
      <div className="relative group cursor-pointer">
        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setClosed(true);
            if (user) {
              localStorage.setItem(`envelope_${user.id}_${new Date().toDateString()}`, "true");
            }
          }}
          className="absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#1b1c1e] text-[#9ca3af] hover:text-white border border-[#35342e] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={12} />
        </button>

        <Link 
          href="/red-envelope"
          className="block relative w-16 h-20 sm:w-20 sm:h-24 animate-bounce-slow"
          onClick={() => {
            if (user) {
              localStorage.setItem(`envelope_${user.id}_${new Date().toDateString()}`, "true");
            }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#ef4444] to-[#991b1b] rounded-md shadow-[0_10px_25px_rgba(239,68,68,0.4)] border border-[#fca5a5]/30 flex flex-col items-center justify-center overflow-hidden">
            {/* Flap shape */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#dc2626] border-b-2 border-[#991b1b] shadow-sm transform origin-top rotate-[-15deg] scale-110 -translate-y-4"></div>
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#dc2626] border-b-2 border-[#991b1b] shadow-sm transform origin-top rotate-[15deg] scale-110 -translate-y-4"></div>
            
            {/* Coin shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#ffdf19] to-[#f4a700] border-2 border-[#241a05] shadow-lg flex items-center justify-center z-10">
              <span className="text-[10px] font-black text-[#241a05]">৳</span>
            </div>
          </div>
          
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1b1c1e] px-2 py-0.5 text-[9px] font-bold text-[#ffdf19] shadow-lg border border-[#35342e]">
            FREE CASH
          </div>
        </Link>
      </div>
    </div>
  );
}
