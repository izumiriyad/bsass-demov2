import type { Metadata } from "next";
import { Trophy, Clock, XCircle, CheckCircle2 } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { formatBDT, timeAgo } from "@/lib/utils";

export const metadata: Metadata = { title: "Bet History" };

const BETS = [
  { id: "B1001", type: "win", event: "Bangladesh vs Sri Lanka", market: "Cricket • Match Winner", stake: 1000, returnAmount: 1850, date: new Date(Date.now() - 1000 * 60 * 18) },
  { id: "B1002", type: "open", event: "Bashundhara Kings vs Abahani", market: "Football • Over 2.5", stake: 600, returnAmount: 0, date: new Date(Date.now() - 1000 * 60 * 44) },
  { id: "B1003", type: "loss", event: "Aviator", market: "Crash • Auto cashout 2.00x", stake: 500, returnAmount: 0, date: new Date(Date.now() - 1000 * 60 * 90) },
  { id: "B1004", type: "win", event: "BPL T20 Live", market: "Top team runs", stake: 750, returnAmount: 1425, date: new Date(Date.now() - 1000 * 60 * 220) },
];

function getIcon(type: string) { return type === "win" ? Trophy : type === "open" ? Clock : XCircle; }
function getColor(type: string) { return type === "win" ? "#22c55e" : type === "open" ? "#ffdf19" : "#ef4444"; }

export default async function BetHistoryPage() {
  const user = await getSessionUser(); if (!user) return null;
  return <div className="space-y-5"><div><h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Bet History</h1><p className="text-sm text-[#9ca3af]">Open bets, wins/losses, stake, odds-ready returns and Bangladesh sports activity</p></div><div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4"><div className="space-y-2">{BETS.map((bet)=>{const Icon=getIcon(bet.type); const color=getColor(bet.type); return <div key={bet.id} className="flex flex-col gap-3 rounded-lg bg-[#121315] px-3 py-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{background:`${color}20`}}><Icon className="h-4 w-4" style={{color}}/></div><div><p className="text-sm font-bold text-[#f0f0f0]">{bet.event}</p><p className="text-xs text-[#6b7280]">{bet.id} • {bet.market} • {timeAgo(bet.date)}</p></div></div><div className="grid grid-cols-2 gap-3 text-right text-sm sm:min-w-[220px]"><div><p className="text-xs text-[#6b7280]">Stake</p><p className="font-bold text-[#f0f0f0]">{formatBDT(bet.stake)}</p></div><div><p className="text-xs text-[#6b7280]">Return</p><p className="font-bold" style={{color}}>{bet.type === "open" ? "Pending" : formatBDT(bet.returnAmount)}</p></div></div></div>})}</div></div></div>;
}
