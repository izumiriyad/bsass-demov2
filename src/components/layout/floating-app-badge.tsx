"use client";

import { useState } from "react";
import Link from "next/link";

export function FloatingAppBadge() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="fixed right-3 z-40 flex flex-col items-center gap-0 sm:right-4"
      style={{ bottom: "calc(80px + env(safe-area-inset-bottom, 0px))" }}
    >
      <button
        onClick={() => setDismissed(true)}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2a2c30] text-[#6b7280] text-[10px] mb-1 hover:bg-[#3a3c40] transition"
        aria-label="Dismiss"
      >
        ✕
      </button>
      <Link
        href="/app-download"
        className="group flex flex-col items-center gap-1.5 rounded-2xl border border-[#2a2c30] bg-gradient-to-b from-[#1b1c1e] to-[#121315] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition hover:border-[#22c55e]/40 hover:-translate-y-0.5 active:scale-95"
        style={{ width: 60 }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#008d5b] to-[#006640] text-xl shadow-lg">
          📱
        </div>
        <span className="text-center text-[8px] font-black leading-tight text-white">GET APP</span>
        <span className="rounded-full bg-[#22c55e] px-2 py-0.5 text-[7px] font-black text-white">
          FREE
        </span>
      </Link>
    </div>
  );
}
