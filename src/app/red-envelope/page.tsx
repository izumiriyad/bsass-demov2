"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import Link from "next/link";

const ENVELOPES = [
  { id: 1, amount: "৳20",  color: "#ef4444", opened: false },
  { id: 2, amount: "৳150", color: "#f97316", opened: false },
  { id: 3, amount: "৳50",  color: "#ef4444", opened: false },
  { id: 4, amount: "৳500", color: "#ffdf19", opened: false },
  { id: 5, amount: "৳30",  color: "#ef4444", opened: false },
  { id: 6, amount: "৳200", color: "#f97316", opened: false },
];

export default function RedEnvelopePage() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [envelopes, setEnvelopes] = useState(ENVELOPES);
  const [totalWon, setTotalWon] = useState(0);

  const open = (id: number) => {
    if (!user) { openModal("login"); return; }
    const env = envelopes.find(e => e.id === id);
    if (!env || env.opened) return;
    const amount = parseInt(env.amount.replace(/[৳,]/g, ""));
    setEnvelopes(prev => prev.map(e => e.id === id ? { ...e, opened: true } : e));
    setTotalWon(prev => prev + amount);
    toast.success(`🧧 You got ${env.amount}! Added to your wallet!`, { duration: 3000 });
  };

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7f1d1d] via-[#991b1b] to-[#4a0505] p-6 text-center border border-[#ef4444]/20">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ffdf19 0%, transparent 30%), radial-gradient(circle at 80% 50%, #ef4444 0%, transparent 30%)" }} />
        <div className="relative">
          <span className="text-6xl animate-bounce" style={{ display: "inline-block" }}>🧧</span>
          <h1 className="mt-3 text-2xl font-black text-[#ffdf19]">Red Envelope Rain</h1>
          <p className="mt-2 text-sm text-white/80">Festival special! Tap envelopes to claim random cash rewards during Bangladesh cricket nights.</p>
          {totalWon > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#ffdf19]/20 border border-[#ffdf19]/40 px-4 py-1.5">
              <span className="text-sm font-black text-[#ffdf19]">Total Won: ৳{totalWon.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Envelopes Grid */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <p className="text-xs font-black uppercase tracking-widest text-[#9ca3af] mb-4">Tap to Open</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {envelopes.map((env) => (
            <button
              key={env.id}
              onClick={() => open(env.id)}
              disabled={env.opened}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all active:scale-95 ${
                env.opened
                  ? "border-[#2a2c30] bg-[#121315] opacity-60 cursor-not-allowed"
                  : "border-[#ef4444]/30 bg-gradient-to-br from-[#991b1b] to-[#7f1d1d] hover:border-[#ef4444] hover:scale-105 cursor-pointer shadow-[0_4px_15px_rgba(239,68,68,0.2)]"
              }`}
            >
              <span className="text-3xl">{env.opened ? "✅" : "🧧"}</span>
              <span className={`text-sm font-black ${env.opened ? "text-[#22c55e]" : "text-[#ffdf19]"}`}>
                {env.opened ? env.amount : "???"}
              </span>
              <span className="text-[9px] font-bold text-white/40">{env.opened ? "CLAIMED" : "TAP"}</span>
            </button>
          ))}
        </div>
        {!user && (
          <button
            onClick={() => openModal("login")}
            className="mt-4 w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400]"
          >
            Login to Open Envelopes
          </button>
        )}
      </div>

      {/* Rules */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
        <p className="text-xs font-black text-[#9ca3af] uppercase tracking-widest mb-3">Event Rules</p>
        <div className="space-y-2">
          {[
            "Event runs during Bangladesh cricket match days.",
            "Each account can claim up to 6 envelopes per event.",
            "Amounts are randomized from ৳20 to ৳500.",
            "Special golden envelopes worth ৳1,000–৳5,000 drop randomly.",
            "Balance credited instantly with no wagering requirement.",
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#9ca3af]">
              <span className="text-[#ef4444] mt-0.5 flex-shrink-0">•</span>
              {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
