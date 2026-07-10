import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { PAYMENT_OPTIONS } from "@/lib/catalog";
import { formatBDT } from "@/lib/utils";
import { WalletForm } from "./wallet-form";

export const metadata: Metadata = { title: "Wallet" };

const QUICK_AMOUNTS = [500, 1000, 5000, 10000];

export default async function WalletPage() {
  const user = await getSessionUser();
  if (!user) return null;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Wallet</h1>
        <p className="text-sm text-[#9ca3af]">Manage your funds and transactions</p>
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <p className="text-xs text-[#9ca3af]">Current Balance</p>
        <p className="mt-1 text-3xl font-bold text-[#ffdf19]">{formatBDT(user.balance)}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#00a86d]">Deposit</h2>
          <WalletForm action="deposit" balance={user.balance} methods={PAYMENT_OPTIONS} quickAmounts={QUICK_AMOUNTS} />
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#ef4444]">Withdraw</h2>
          <WalletForm action="withdraw" balance={user.balance} methods={PAYMENT_OPTIONS} quickAmounts={QUICK_AMOUNTS} />
        </div>
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">Payment Methods</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {PAYMENT_OPTIONS.map((opt) => (
            <div key={opt.id} className="rounded-lg border border-[#2a2c30] bg-[#121315] p-3 text-center">
              <p className="text-2xl">{opt.emoji}</p>
              <p className="mt-1 text-sm font-semibold text-[#f0f0f0]">{opt.name}</p>
              <p className="text-xs text-[#6b7280]">{opt.fee} · {opt.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
