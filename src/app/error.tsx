"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="max-w-lg rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ef4444]/10 text-3xl">⚠️</div>
        <h1 className="mt-4 text-2xl font-black text-[#f0f0f0]">Something went wrong</h1>
        <p className="mt-2 text-sm leading-6 text-[#9ca3af]">We could not load this section. Please try again or contact support if the problem continues.</p>
        {error.digest && <p className="mt-2 text-xs text-[#6b7280]">Error reference: {error.digest}</p>}
        <div className="mt-5 flex justify-center gap-3">
          <button onClick={reset} className="rounded-lg bg-[#008d5b] px-4 py-2 text-sm font-bold text-white">Try again</button>
          <Link href="/support" className="rounded-lg bg-[#242628] px-4 py-2 text-sm font-bold text-[#f0f0f0]">Support</Link>
        </div>
      </div>
    </div>
  );
}
