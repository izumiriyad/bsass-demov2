"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Slide { eyebrow: string; title: string; subtitle: string; cta: string; href: string; emoji: string; c1: string; c2: string; }

const SLIDES: Slide[] = [
  { eyebrow: "BANGLADESH CRICKET SPECIAL", title: "Live Cricket Betting in BDT", subtitle: "BPL, IPL, ICC and Bangladesh fixtures with live/upcoming match states", cta: "Bet Cricket", href: "/sports?filter=cricket", emoji: "🏏", c1: "#043b2a", c2: "#008d5b" },
  { eyebrow: "WELCOME BONUS", title: "100% Bonus up to ৳10,000", subtitle: "Local wallet friendly registration, deposit and promotion claim UI", cta: "Claim Bonus", href: "/promotions", emoji: "🎁", c1: "#2e2300", c2: "#b57400" },
  { eyebrow: "LIVE CASINO", title: "Baccarat, Roulette & Blackjack", subtitle: "Premium live dealer lobby with Bangladesh-ready BDT account flow", cta: "Open Casino", href: "/casino", emoji: "♠️", c1: "#3b0011", c2: "#8b0033" },
  { eyebrow: "CRASH & SLOTS", title: "Aviator, JILI & Pragmatic Play", subtitle: "Fast game cards, filters, favorites and responsive launch screens", cta: "Play Now", href: "/popular", emoji: "🚀", c1: "#1e1b4b", c2: "#5b21b6" },
];

export function HeroBanner() {
  const [index, setIndex] = useState(0);
  const go = useCallback((next: number) => setIndex((next + SLIDES.length) % SLIDES.length), []);
  useEffect(() => { const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5200); return () => clearInterval(t); }, []);

  return (
    <div className="relative -mx-3 h-[190px] overflow-hidden sm:-mx-5 sm:h-[260px] lg:h-[310px]">
      {SLIDES.map((slide, i) => (
        <div key={slide.title} className={cn("absolute inset-0 transition-opacity duration-700", i === index ? "opacity-100" : "pointer-events-none opacity-0")} style={{ background: `linear-gradient(90deg, ${slide.c1}, ${slide.c2} 58%, #111315)` }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(255,255,255,.28),transparent_12%),radial-gradient(circle_at_78%_45%,rgba(255,223,25,.32),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.06),transparent)]" />
          <div className="absolute inset-y-0 right-[6%] flex items-center justify-center"><div className="animate-float-soft text-[92px] drop-shadow-2xl sm:text-[145px] lg:text-[180px]">{slide.emoji}</div></div>
          <div className="relative mx-auto flex h-full max-w-5xl items-center px-6 sm:px-10">
            <div className="max-w-[70%] text-left sm:max-w-[58%]">
              <p className="mb-2 text-[11px] font-black tracking-[.18em] text-[#ffdf75] sm:text-sm">{slide.eyebrow}</p>
              <h2 className="text-2xl font-black uppercase leading-[.95] text-white drop-shadow sm:text-4xl lg:text-5xl">{slide.title}</h2>
              <p className="mt-3 hidden max-w-md text-xs font-semibold text-white/85 sm:block">{slide.subtitle}</p>
              <Link href={slide.href} className="mt-4 inline-flex rounded-full bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-5 py-2 text-xs font-black text-[#251700] shadow-lg transition hover:brightness-110">{slide.cta}</Link>
            </div>
          </div>
        </div>
      ))}
      <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/60">‹</button>
      <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/60">›</button>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">{SLIDES.map((_, i) => <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => go(i)} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-[#ffdf19]" : "w-2 bg-white/45")} />)}</div>
    </div>
  );
}
