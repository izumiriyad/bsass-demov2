import type { Metadata } from "next";
import { LiveSportsBoard } from "@/components/bsl/live-sports-board";

export const metadata: Metadata = { title: "Betting Exchange" };

const orderBook = [
  { price: 1.82, back: 48200, lay: 36800 },
  { price: 1.86, back: 34500, lay: 28900 },
  { price: 1.91, back: 22100, lay: 19400 },
  { price: 2.04, back: 18500, lay: 16300 },
];

export default function ExchangePage() {
  return (
    <div className="space-y-5 px-3 py-5 sm:px-5">
      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 bsl-card-glow">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Exchange</p>
        <h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">BSL Betting Exchange</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9ca3af]">Exchange-style market UI inspired by Bangladesh cricket platforms: back/lay prices, liquidity ladder, live markets and bet slip integration.</p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[.8fr_1.2fr]">
        <article className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
          <h2 className="text-lg font-black text-[#f0f0f0]">Market Depth</h2>
          <p className="mt-1 text-xs text-[#9ca3af]">Bangladesh vs India • Match Winner</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-[#2a2c30]">
            <table className="w-full text-center text-sm">
              <thead className="bg-[#242628] text-xs uppercase text-[#9ca3af]"><tr><th className="px-3 py-2">Back</th><th className="px-3 py-2">Price</th><th className="px-3 py-2">Lay</th></tr></thead>
              <tbody>{orderBook.map((row)=><tr key={row.price} className="border-t border-[#2a2c30]"><td className="bg-[#008d5b]/10 px-3 py-3 font-black text-[#22c55e]">৳{row.back.toLocaleString('en-BD')}</td><td className="px-3 py-3 text-xl font-black text-[#ffdf19]">{row.price.toFixed(2)}</td><td className="bg-[#ef4444]/10 px-3 py-3 font-black text-[#ef4444]">৳{row.lay.toLocaleString('en-BD')}</td></tr>)}</tbody>
            </table>
          </div>
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
