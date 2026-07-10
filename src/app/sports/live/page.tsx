import type { Metadata } from "next";
import { LiveSportsBoard } from "@/components/bsl/live-sports-board";
export const metadata: Metadata = { title: "Live Sports" };
export default function LiveSportsPage(){return <div className="space-y-5 px-3 py-5 sm:px-5"><section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-[#ef4444]">Live Betting</p><h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">Live Sports Markets</h1><p className="mt-3 max-w-2xl text-sm text-[#9ca3af]">Real-time sportsbook board UI with bet slip integration.</p></section><LiveSportsBoard defaultState="live" /></div>}
