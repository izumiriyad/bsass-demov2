"use client";

import { useState } from "react";
import { Search, ShieldCheck, AlertOctagon } from "lucide-react";

export default function VerifyAgentPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<"idle" | "valid" | "invalid">("idle");
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setResult("idle");
    
    // Simulate API call
    setTimeout(() => {
      // Fake validation logic for demo purposes
      if (query.includes("017000") || query.includes("official")) {
        setResult("valid");
      } else {
        setResult("invalid");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-3 py-8 sm:px-5">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#008d5b]/20 text-[#00a86d]">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-2xl font-black uppercase text-[#f0f0f0]">Verify Official Agent</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#9ca3af]">
          Protect yourself from scammers. Enter the WhatsApp, Facebook link, or Phone Number of the agent to verify if they are officially affiliated with BSL Gaming.
        </p>
      </div>

      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 shadow-2xl">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#f0f0f0]">Agent Info (Number/Link)</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 01700000000 or WhatsApp Link"
                className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] py-4 pl-12 pr-4 text-white outline-none transition focus:border-[#ffdf19]"
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading || !query}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#008d5b] to-[#00a86d] py-4 font-black text-white shadow-lg transition hover:brightness-110 disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify Agent Now"}
          </button>
        </form>

        {result === "valid" && (
          <div className="mt-6 flex items-start gap-4 rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/10 p-5 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-black text-[#22c55e]">OFFICIAL AGENT VERIFIED</h3>
              <p className="mt-1 text-sm text-[#d8d5c7]">This is an authorized BSL Master Agent. It is 100% safe to transact with this number.</p>
            </div>
          </div>
        )}

        {result === "invalid" && (
          <div className="mt-6 flex items-start gap-4 rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/10 p-5 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ef4444] text-white">
              <AlertOctagon size={20} />
            </div>
            <div>
              <h3 className="font-black text-[#ef4444]">WARNING: UNAUTHORIZED</h3>
              <p className="mt-1 text-sm text-[#d8d5c7]">This number is NOT found in our official database. Please do not send any funds to this person, as they might be a scammer.</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="rounded-xl border border-[#ffdf19]/20 bg-[#ffdf19]/5 p-4 text-center">
        <p className="text-xs text-[#9ca3af]">For immediate assistance, please contact our <a href="/live-chat" className="font-bold text-[#ffdf19] hover:underline">24/7 Live Chat Support</a>.</p>
      </div>
    </div>
  );
}
