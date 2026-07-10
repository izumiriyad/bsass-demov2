import type { Metadata } from "next";
import { TrendingUp, TrendingDown, Gift, Gamepad2 } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { formatBDT, timeAgo } from "@/lib/utils";

export const metadata: Metadata = { title: "Transactions" };

const TRANSACTIONS = [
  { id: 1, type: "deposit", label: "Deposit via bKash", amount: 5000, date: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 2, type: "win", label: "Cricket bet settlement", amount: 2300, date: new Date(Date.now() - 1000 * 60 * 90) },
  { id: 3, type: "loss", label: "Aviator bet settlement", amount: -800, date: new Date(Date.now() - 1000 * 60 * 60 * 3) },
  { id: 4, type: "bonus", label: "Welcome bonus credited", amount: 500, date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 5, type: "withdraw", label: "Withdrawal to Nagad", amount: -2000, date: new Date(Date.now() - 1000 * 60 * 60 * 48) },
  { id: 6, type: "deposit", label: "Deposit via Rocket", amount: 2000, date: new Date(Date.now() - 1000 * 60 * 60 * 72) },
];
function getIcon(type: string) { return type === "deposit" ? TrendingUp : type === "withdraw" ? TrendingDown : type === "bonus" ? Gift : Gamepad2; }
function getColor(type: string) { return ["deposit","win"].includes(type) ? "#00a86d" : ["withdraw","loss"].includes(type) ? "#ef4444" : type === "bonus" ? "#ffdf19" : "#9ca3af"; }
export default async function TransactionsPage(){ const user=await getSessionUser(); if(!user) return null; return <div className="space-y-5"><div><h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Transactions</h1><p className="text-sm text-[#9ca3af]">Bangladesh local payment ledger: bKash, Nagad, Rocket, Upay and bank transfer</p></div><div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4"><div className="space-y-2">{TRANSACTIONS.map((tx)=>{const Icon=getIcon(tx.type); const color=getColor(tx.type); return <div key={tx.id} className="flex items-center justify-between rounded-lg bg-[#121315] px-3 py-3"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{background:`${color}20`}}><Icon className="h-4 w-4" style={{color}} /></div><div><p className="text-sm font-medium text-[#f0f0f0]">{tx.label}</p><p className="text-xs text-[#6b7280]">{timeAgo(tx.date)}</p></div></div><p className="text-sm font-bold" style={{color}}>{tx.amount>0?"+":""}{formatBDT(tx.amount)}</p></div>})}</div></div></div>}
