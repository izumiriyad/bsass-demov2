"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { formatBDT, cn } from "@/lib/utils";

interface PaymentOption {
  id: string;
  name: string;
  emoji: string;
  fee: string;
  time: string;
}

interface WalletFormProps {
  action: "deposit" | "withdraw";
  balance: number;
  methods: PaymentOption[];
  quickAmounts: number[];
}

export function WalletForm({ action, balance, methods, quickAmounts }: WalletFormProps) {
  const { refreshUser } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const isDeposit = action === "deposit";
  const minAmount = isDeposit ? 100 : 200;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < minAmount) {
      toast.error(`Minimum ${isDeposit ? "deposit" : "withdrawal"} is ${formatBDT(minAmount)}`);
      return;
    }
    if (!method) {
      toast.error("Please select a payment method");
      return;
    }
    if (!isDeposit && amount > balance) {
      toast.error("Insufficient balance");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, amount, method }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? `${isDeposit ? "Deposit" : "Withdrawal"} failed`);
      toast.success(`${isDeposit ? "Deposited" : "Withdrew"} ${formatBDT(amount)} successfully!`);
      await refreshUser();
      setAmount(0);
      setMethod("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Amount (৳)</label>
        <input
          type="number"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder={`Min ${formatBDT(minAmount)}`}
          className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]"
        />
        <div className="mt-2 grid grid-cols-4 gap-2">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={cn(
                "rounded-md border py-1.5 text-xs font-semibold transition",
                amount === amt
                  ? "border-[#008d5b] bg-[#008d5b]/10 text-[#00a86d]"
                  : "border-[#2a2c30] bg-[#1b1c1e] text-[#9ca3af] hover:border-[#383b3f] hover:text-[#f0f0f0]"
              )}
            >
              ৳{amt.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Payment Method</label>
        <div className="grid grid-cols-2 gap-2">
          {methods.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMethod(opt.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition",
                method === opt.id
                  ? "border-[#008d5b] bg-[#008d5b]/10"
                  : "border-[#2a2c30] bg-[#1b1c1e] hover:border-[#383b3f]"
              )}
            >
              <span className="text-lg">{opt.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-[#f0f0f0]">{opt.name}</p>
                <p className="text-xs text-[#6b7280]">{opt.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full py-2.5 text-sm font-semibold disabled:opacity-50",
          isDeposit ? "btn-primary" : "rounded-lg border border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444] transition hover:bg-[#ef4444]/20"
        )}
      >
        {loading ? "Processing..." : `${isDeposit ? "Deposit" : "Withdraw"}${amount > 0 ? ` ${formatBDT(amount)}` : ""}`}
      </button>
    </form>
  );
}
