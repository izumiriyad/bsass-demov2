import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

const TRANSACTIONS = [
  { id: 1, type: "deposit", label: "Deposit via bKash", amount: 5000, date: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: 2, type: "win", label: "Won on Aviator", amount: 2300, date: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: 3, type: "loss", label: "Lost on Crazy Time", amount: -800, date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
  { id: 4, type: "bonus", label: "Welcome bonus credited", amount: 500, date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 5, type: "withdraw", label: "Withdrawal to Nagad", amount: -2000, date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { id: 6, type: "deposit", label: "Deposit via Rocket", amount: 2000, date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
  { id: 7, type: "win", label: "Won on Gates of Olympus", amount: 4500, date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString() },
  { id: 8, type: "loss", label: "Lost on Sweet Bonanza", amount: -1200, date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString() },
  { id: 9, type: "deposit", label: "Deposit via Nagad", amount: 10000, date: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString() },
  { id: 10, type: "withdraw", label: "Withdrawal to bKash", amount: -5000, date: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString() },
];

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ transactions: TRANSACTIONS });
}
