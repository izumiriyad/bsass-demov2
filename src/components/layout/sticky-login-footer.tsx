"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { Gift, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function StickyLoginFooter() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || user) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden lg:block animate-in slide-in-from-bottom-full duration-700">
      <div className="border-t-2 border-[#ffdf19] bg-gradient-to-r from-[#1b1c1e] via-[#2a2c30] to-[#1b1c1e] px-8 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffdf19] to-[#f4a700] shadow-[0_0_20px_rgba(255,223,25,0.4)]">
              <Gift size={28} className="text-[#241a05] animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase text-[#f0f0f0] tracking-tight">
                New Player Exclusive Offer
              </h3>
              <p className="text-sm text-[#ffdf19] font-bold mt-0.5 flex items-center gap-2">
                <span className="flex items-center gap-1"><Zap size={14} /> Instant ৳500 Bonus</span>
                <span className="text-[#9ca3af] font-normal">•</span>
                <span className="flex items-center gap-1 text-[#22c55e]"><ShieldCheck size={14} /> 100% Safe & Secure</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-xs text-[#9ca3af] hidden xl:block mr-4">
              Join <strong className="text-white">2,000,000+</strong> players from Bangladesh today!
            </p>
            <button 
              onClick={() => openModal("login")} 
              className="rounded-lg bg-[#2a2c30] px-6 py-3 font-bold text-white transition hover:bg-[#383b3f]"
            >
              Log In
            </button>
            <div className="relative">
              <div className="absolute inset-0 z-0 animate-[spin_4s_linear_infinite] rounded-lg bg-gradient-to-tr from-[#ffdf19] via-transparent to-[#008d5b] blur-sm opacity-70"></div>
              <button 
                onClick={() => openModal("register")} 
                className="relative z-10 rounded-lg bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-8 py-3 font-black text-[#241a05] shadow-xl transition hover:brightness-110 active:scale-95"
              >
                REGISTER NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
