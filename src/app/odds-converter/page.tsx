import type { Metadata } from "next";

export const metadata: Metadata = { title: "Odds Converter" };

const odds = [
  { decimal: 1.5, probability: "66.67%", american: "-200", fraction: "1/2" },
  { decimal: 1.85, probability: "54.05%", american: "-118", fraction: "17/20" },
  { decimal: 2.0, probability: "50.00%", american: "+100", fraction: "1/1" },
  { decimal: 3.5, probability: "28.57%", american: "+250", fraction: "5/2" },
];

export default function OddsConverterPage() {
  return <div className="px-3 py-5 sm:px-5"><section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Sportsbook Tools</p><h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">Odds Converter</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#9ca3af]">Quick reference for decimal odds, implied probability, American odds and fractional odds. BSL uses decimal odds by default for Bangladesh users.</p></section><section className="mt-5 overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#1b1c1e]"><table className="w-full text-left text-sm"><thead className="bg-[#242628] text-xs uppercase text-[#9ca3af]"><tr><th className="px-4 py-3">Decimal</th><th className="px-4 py-3">Implied probability</th><th className="px-4 py-3">American</th><th className="px-4 py-3">Fractional</th></tr></thead><tbody>{odds.map((o)=><tr key={o.decimal} className="border-t border-[#2a2c30]"><td className="px-4 py-3 font-black text-[#ffdf19]">{o.decimal.toFixed(2)}</td><td className="px-4 py-3 text-[#f0f0f0]">{o.probability}</td><td className="px-4 py-3 text-[#9ca3af]">{o.american}</td><td className="px-4 py-3 text-[#9ca3af]">{o.fraction}</td></tr>)}</tbody></table></section></div>;
}
