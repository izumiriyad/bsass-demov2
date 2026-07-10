import type { Metadata } from "next";
import Link from "next/link";
import { allianceBrands } from "@/components/bsl/trust-sections";

export const metadata: Metadata = { title: "Verified BSL Network" };

export default function BrandsPage() {
  return (
    <div className="px-3 py-5 sm:px-5">
      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 bsl-card-glow">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Verified Network</p>
        <h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">BSL Product Alliance</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#9ca3af]">Inspired by multi-brand gaming hubs, this page organizes BSL Gaming products under one verified Bangladesh-focused experience with transparent product cards, benefits and responsible-gaming routing.</p>
      </section>
      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {allianceBrands.map((brand) => <Link key={brand.name} href={brand.href} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 transition hover:-translate-y-1 hover:border-[#ffdf19]/50"><div className="text-5xl">{brand.emoji}</div><h2 className="mt-4 text-xl font-black text-[#f0f0f0]">{brand.name}</h2><div className="mt-4 space-y-2 text-sm text-[#d8d2bf]"><p>🎁 {brand.bonus}</p><p>⚡ {brand.payout}</p><p>📈 {brand.winrate}</p></div><span className="mt-5 inline-flex rounded-lg bg-[#ffdf19] px-4 py-2 text-sm font-black text-[#241a05]">Open</span></Link>)}
      </section>
    </div>
  );
}
