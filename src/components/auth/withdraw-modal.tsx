"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { PAYMENT_OPTIONS } from "@/lib/catalog";
import { formatBDT, cn } from "@/lib/utils";

export function WithdrawModal() {
  const { modal, closeModal } = useModal();
  const { user, refreshUser } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (user && amount > user.balance) {
      toast.error("Insufficient balance");
      return;
    }
    if (!method) {
      toast.error("Please select a withdrawal method");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "withdraw", amount, method }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Withdrawal failed");
      toast.success(`Withdrawal of ${formatBDT(amount)} requested!`);
      await refreshUser();
      setAmount(0);
      setMethod("");
      closeModal();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={modal === "withdraw"} onClose={closeModal}>
      <DialogTitle>Withdraw Funds</DialogTitle>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-3">
          <p className="text-sm text-[#9ca3af]">Available Balance</p>
          <p className="text-lg font-bold text-[#ffdf19]">{formatBDT(user?.balance ?? 0)}</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Amount (৳)</label>
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Withdrawal Method</label>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_OPTIONS.map((opt) => (
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
          className="btn-primary w-full py-2.5 text-sm disabled:opacity-50"
        >
          {loading ? "Processing..." : `Withdraw ${amount > 0 ? formatBDT(amount) : ""}`}
        </button>
      </form>
    </Dialog>
  );
}
