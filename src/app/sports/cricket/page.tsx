import type { Metadata } from "next";
import { LiveSportsBoard } from "@/components/bsl/live-sports-board";
export const metadata: Metadata = { title: "Cricket Betting" };
export default function CricketSportsPage(){return <div className="space-y-5 px-3 py-5 sm:px-5"><section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Bangladesh Cricket</p><h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">Cricket Betting Board</h1><p className="mt-3 max-w-2xl text-sm text-[#9ca3af]">BPL, IPL, ICC and Bangladesh cricket market UI with bet slip selection.</p></section><LiveSportsBoard defaultSport="Cricket" /></div>}
