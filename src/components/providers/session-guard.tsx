"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Wifi, WifiOff, X } from "lucide-react";
import { useAuth } from "./auth-provider";

export function SessionGuard() {
  const { user } = useAuth();
  const [online, setOnline] = useState(() => typeof navigator === "undefined" ? true : navigator.onLine);
  const [showBreak, setShowBreak] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const t = window.setTimeout(() => setShowBreak(true), 1000 * 60 * 20);
    return () => window.clearTimeout(t);
  }, [user]);

  return (
    <>
      {!online && (
        <div className="fixed left-0 right-0 top-[72px] z-50 flex items-center justify-center gap-2 bg-[#ef4444] px-3 py-2 text-center text-xs font-bold text-white">
          <WifiOff size={15} /> You are offline. Wallet and betting actions are paused. <Link href="/offline" className="underline">Details</Link>
        </div>
      )}
      {online && user && (
        <div className="sr-only" aria-live="polite"><Wifi size={1} /> Connected</div>
      )}
      {showBreak && !dismissed && (
        <div className="fixed bottom-24 left-4 right-4 z-[65] mx-auto max-w-md rounded-2xl border border-[#ffdf19]/30 bg-[#1b1c1e] p-4 shadow-2xl sm:left-auto sm:right-6">
          <button onClick={() => setDismissed(true)} className="absolute right-3 top-3 text-[#9ca3af] hover:text-white" aria-label="Dismiss reminder"><X size={16} /></button>
          <div className="flex gap-3 pr-6"><Clock className="mt-0.5 text-[#ffdf19]" /><div><h3 className="text-sm font-black text-[#f0f0f0]">Take a quick break?</h3><p className="mt-1 text-xs leading-5 text-[#9ca3af]">Responsible gaming reminder: review your limits and keep play within budget.</p><Link href="/dashboard/limits" className="mt-3 inline-flex rounded-lg bg-[#242628] px-3 py-2 text-xs font-bold text-[#ffdf19]">Review Limits</Link></div></div>
        </div>
      )}
    </>
  );
}
