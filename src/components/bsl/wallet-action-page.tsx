"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useModal } from "@/components/providers/modal-provider";
import { useAuth } from "@/components/providers/auth-provider";

export function WalletActionPage({ action }: { action: "deposit" | "withdraw" }) {
  const { user } = useAuth();
  const { openModal } = useModal();
  useEffect(() => { if (user) openModal(action); }, [action, openModal, user]);
  return <div className="flex min-h-[65vh] items-center justify-center px-4 py-10 text-center"><div className="max-w-md rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6"><div className="text-5xl">{action === "deposit" ? "💳" : "🏦"}</div><h1 className="mt-4 text-2xl font-black capitalize text-[#f0f0f0]">{action}</h1><p className="mt-2 text-sm leading-6 text-[#9ca3af]">{user ? `Opening ${action} modal...` : `Please login to ${action}.`}</p><div className="mt-5 flex justify-center gap-3">{user ? <button onClick={() => openModal(action)} className="rounded-lg bg-[#ffdf19] px-5 py-3 text-sm font-black text-[#241a05]">Open {action}</button> : <Link href="/login" className="rounded-lg bg-[#ffdf19] px-5 py-3 text-sm font-black text-[#241a05]">Login</Link>}<Link href="/payments" className="rounded-lg bg-[#242628] px-5 py-3 text-sm font-bold text-[#f0f0f0]">Payment Methods</Link></div></div></div>;
}
