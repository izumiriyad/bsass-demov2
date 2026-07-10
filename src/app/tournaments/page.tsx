import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Tournaments" };
const events=[
 {name:"Bangladesh Cricket Cup", prize:"৳10,00,000", ends:"2 days", type:"Sports", emoji:"🏏"},
 {name:"JILI Slot Race", prize:"৳5,00,000", ends:"18 hours", type:"Slots", emoji:"🎰"},
 {name:"Aviator High Flyer", prize:"৳3,50,000", ends:"5 days", type:"Crash", emoji:"🚀"},
 {name:"Live Casino Leaderboard", prize:"৳7,50,000", ends:"Weekly", type:"Casino", emoji:"♠️"},
];
export default function TournamentsPage(){return <div className="px-3 py-5 sm:px-5"><section className="rounded-2xl border border-[#2a2c30] bg-gradient-to-br from-[#291b00] to-[#121315] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Race & Win</p><h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">BSL Tournaments</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#9ca3af]">Frontend tournament center with prize pools, countdown states, category filters and leaderboard-ready cards.</p></section><section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{events.map((e)=><article key={e.name} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5"><div className="text-5xl">{e.emoji}</div><p className="mt-4 text-xs font-black uppercase text-[#ffdf19]">{e.type}</p><h2 className="mt-1 text-xl font-black text-[#f0f0f0]">{e.name}</h2><p className="mt-3 text-sm text-[#9ca3af]">Prize Pool</p><p className="text-2xl font-black text-[#22c55e]">{e.prize}</p><p className="mt-3 text-xs text-[#9ca3af]">Ends: {e.ends}</p><Link href="/leaderboard" className="mt-4 inline-flex rounded-lg bg-[#ffdf19] px-4 py-2 text-sm font-black text-[#241a05]">View Race</Link></article>)}</section></div>}
