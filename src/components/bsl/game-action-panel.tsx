"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Maximize2, Star, X } from "lucide-react";
import { toast } from "sonner";
import type { BSLGame } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function GameActionPanel({ game, isAuthenticated }: { game: BSLGame; isAuthenticated: boolean }) {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("bsl-favorite-games");
    const favorites = stored ? (JSON.parse(stored) as string[]) : [];
    return favorites.includes(game.id);
  });
  const [spinning, setSpinning] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  useEffect(() => {
    const recentStored = window.localStorage.getItem("bsl-recent-games");
    const recent = recentStored ? (JSON.parse(recentStored) as string[]) : [];
    window.localStorage.setItem("bsl-recent-games", JSON.stringify([game.id, ...recent.filter((id) => id !== game.id)].slice(0, 12)));
  }, [game.id]);

  useEffect(() => {
    if (!open) return;
    const t = window.setInterval(() => setSessionSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [open]);

  const formattedSession = useMemo(() => {
    const minutes = Math.floor(sessionSeconds / 60).toString().padStart(2, "0");
    const seconds = (sessionSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [sessionSeconds]);

  const toggleFavorite = () => {
    const stored = window.localStorage.getItem("bsl-favorite-games");
    const favorites = stored ? (JSON.parse(stored) as string[]) : [];
    const next = favorite ? favorites.filter((id) => id !== game.id) : [...favorites, game.id];
    window.localStorage.setItem("bsl-favorite-games", JSON.stringify(Array.from(new Set(next))));
    setFavorite(!favorite);
    toast.success(favorite ? "Removed from favorites" : "Added to favorites");
  };

  const launch = () => {
    if (!isAuthenticated) return;
    setOpen(true);
    setSessionSeconds(0);
  };

  const spin = () => {
    setSpinning(true);
    window.setTimeout(() => {
      const next = Number((1 + Math.random() * 9).toFixed(2));
      setMultiplier(next);
      setSpinning(false);
      toast.success(next >= 5 ? "Big win animation" : "Round completed", { description: `${game.title} result ${next.toFixed(2)}x` });
    }, 900);
  };

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        {isAuthenticated ? (
          <button type="button" onClick={launch} className="btn-primary w-full py-3 text-base font-semibold">▶ Play Now</button>
        ) : (
          <Link href="/login" className="btn-primary w-full py-3 text-center text-base font-semibold">Login to Play</Link>
        )}
        <button type="button" onClick={toggleFavorite} className={cn("rounded-lg border px-4 py-3 text-sm font-bold transition", favorite ? "border-[#ffdf19] bg-[#ffdf19]/10 text-[#ffdf19]" : "border-[#2a2c30] bg-[#1b1c1e] text-[#9ca3af] hover:text-white")}>
          <Star className={cn("inline h-4 w-4", favorite && "fill-current")} /> Favorite
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[75] bg-black/80 p-3 backdrop-blur" role="dialog" aria-modal="true" aria-label={`${game.title} launcher`}>
          <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#111315] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2a2c30] px-4 py-3">
              <div className="min-w-0"><h2 className="truncate text-base font-black text-[#f0f0f0]">{game.title}</h2><p className="text-xs text-[#9ca3af]">{game.provider} • Session {formattedSession}</p></div>
              <div className="flex items-center gap-2"><button className="rounded-lg bg-[#242628] p-2 text-[#9ca3af] hover:text-white" aria-label="Fullscreen preview"><Maximize2 size={17} /></button><button onClick={() => setOpen(false)} className="rounded-lg bg-[#242628] p-2 text-[#9ca3af] hover:text-white" aria-label="Close game"><X size={17} /></button></div>
            </div>
            <div className="grid flex-1 gap-4 overflow-y-auto p-4 lg:grid-cols-[1fr_320px]">
              <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-[#2a2c30]" style={{ background: `linear-gradient(150deg, ${game.gradient[0]}, ${game.gradient[1]})` }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.25),transparent_28%),linear-gradient(180deg,transparent,rgba(0,0,0,.45))]" />
                <div className={cn("relative text-center transition", spinning && "scale-110 blur-[1px]")}> <div className="text-8xl drop-shadow-2xl">{game.emoji}</div><p className="mt-6 text-5xl font-black text-[#ffdf19] drop-shadow">{multiplier.toFixed(2)}x</p><p className="mt-2 text-sm font-bold text-white/80">Frontend game-launch preview</p></div>
              </div>
              <aside className="space-y-3 rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
                <h3 className="text-sm font-black uppercase text-[#f0f0f0]">Game Controls</h3>
                <button onClick={spin} disabled={spinning} className="w-full rounded-lg bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-4 py-3 text-sm font-black text-[#241a05] disabled:opacity-60">{spinning ? "Running..." : "Run Round"}</button>
                <div className="grid grid-cols-2 gap-2 text-center"><div className="rounded-lg bg-[#121315] p-3"><p className="text-xs text-[#9ca3af]">Balance</p><p className="font-black text-[#ffdf19]">Live</p></div><div className="rounded-lg bg-[#121315] p-3"><p className="text-xs text-[#9ca3af]">Mode</p><p className="font-black text-[#22c55e]">Secure</p></div></div>
                <div className="rounded-lg border border-[#ffdf19]/20 bg-[#ffdf19]/5 p-3 text-xs leading-5 text-[#d8d2bf]">Responsible gaming reminder: take regular breaks, set limits, and never play beyond your budget.</div>
                <Link href="/dashboard/limits" className="block rounded-lg bg-[#242628] px-4 py-2.5 text-center text-sm font-bold text-[#f0f0f0]">Set Limits</Link>
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
