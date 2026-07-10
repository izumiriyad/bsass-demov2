import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Cashback" };
const tiers=[
 {level:"Bronze", rate:"2%", need:"৳5,000 weekly stake"},
 {level:"Silver", rate:"4%", need:"৳25,000 weekly stake"},
 {level:"Gold", rate:"6%", need:"৳75,000 weekly stake"},
 {level:"Diamond", rate:"8%", need:"৳2,00,000 weekly stake"},
];
export default function CashbackPage(){return <div className="px-3 py-5 sm:px-5"><section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Weekly Rewards</p><h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">Cashback Center</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#9ca3af]">Transparent cashback UI with tier rules, claim status and responsible-gaming messages.</p></section><section className="mt-5 grid gap-4 md:grid-cols-4">{tiers.map((t)=><article key={t.level} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5"><h2 className="text-xl font-black text-[#f0f0f0]">{t.level}</h2><p className="mt-4 text-4xl font-black text-[#ffdf19]">{t.rate}</p><p className="mt-3 text-sm text-[#9ca3af]">{t.need}</p><button className="mt-4 rounded-lg bg-[#242628] px-4 py-2 text-sm font-bold text-[#f0f0f0]">Claim Status</button></article>)}</section><Link href="/promotions" className="mt-5 inline-flex rounded-lg bg-[#008d5b] px-5 py-3 text-sm font-black text-white">All Promotions</Link></div>}
