import type { Metadata } from "next";
import { LiveSportsBoard } from "@/components/bsl/live-sports-board";
import { ExchangeSimulator } from "@/components/bsl/exchange-simulator";

export const metadata: Metadata = { title: "Betting Exchange" };

export default function ExchangePage() {
  return (
    <div className="space-y-5 px-3 py-5 sm:px-5">
      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 bsl-card-glow">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Exchange</p>
        <h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">BSL Betting Exchange</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9ca3af]">Exchange-style market UI inspired by Bangladesh cricket platforms: back/lay prices, liquidity ladder, live markets and bet slip integration.</p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[.8fr_1.2fr]">
        <article>
          <ExchangeSimulator />
        </article>
        <article className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
          <h2 className="text-lg font-black text-[#f0f0f0]">Exchange Rules Snapshot</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {['Back and lay prices update live','Unmatched orders can be cancelled','Settlement follows official result source','Suspicious patterns enter risk review'].map((item)=><div key={item} className="rounded-xl bg-[#121315] p-4 text-sm font-bold text-[#d8d2bf]">✅ {item}</div>)}
          </div>
        </article>
      </section>

      <LiveSportsBoard defaultSport="Cricket" />
    </div>
  );
}
