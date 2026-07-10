"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { PAYMENT_OPTIONS } from "@/lib/catalog";
import { formatBDT, cn } from "@/lib/utils";
import { Copy, CheckCircle2 } from "lucide-react";

const QUICK_AMOUNTS = [500, 1000, 5000, 10000];
const AGENT_NUMBERS: Record<string, string> = {
  bkash: "01711223344",
  nagad: "01622334455",
  rocket: "01933445566",
  upay: "01444556677",
};

export function DepositModal() {
  const { modal, closeModal } = useModal();
  const { user, refreshUser } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<string>("");
  const [txId, setTxId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 500) {
      toast.error("Minimum deposit is ৳500");
      return;
    }
    if (!method) {
      toast.error("Please select a payment method");
      return;
    }
    setStep(2);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Number copied to clipboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (txId.length < 8) {
      toast.error("Please enter a valid Transaction ID");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deposit", amount, method, txId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Deposit failed");
      toast.success(`Deposit request for ${formatBDT(amount)} submitted! Pending verification.`);
      await refreshUser();
      setAmount(0);
      setMethod("");
      setTxId("");
      setStep(1);
      closeModal();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={modal === "deposit"} onClose={() => { closeModal(); setTimeout(() => setStep(1), 300); }}>
      <DialogTitle>Deposit Funds</DialogTitle>
      
      {/* Stepper */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold", step >= 1 ? "bg-[#008d5b] text-white" : "bg-[#2a2c30] text-[#6b7280]")}>1</div>
        <div className={cn("h-0.5 w-8", step === 2 ? "bg-[#008d5b]" : "bg-[#2a2c30]")} />
        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold", step === 2 ? "bg-[#008d5b] text-white" : "bg-[#2a2c30] text-[#6b7280]")}>2</div>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNext} className="space-y-4">
          <div className="rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-3">
            <p className="text-sm text-[#9ca3af]">Current Balance</p>
            <p className="text-lg font-bold text-[#ffdf19]">{formatBDT(user?.balance ?? 0)}</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Amount (৳)</label>
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Min. 500"
              className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]"
            />
            <div className="mt-2 grid grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((amt) => (
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
          <button type="submit" className="btn-primary w-full py-2.5 text-sm">Next Step</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg bg-[#2a2c30]/50 p-4 text-center">
            <p className="text-sm text-[#9ca3af]">Transfer exactly</p>
            <p className="text-2xl font-black text-[#ffdf19]">৳{amount.toLocaleString()}</p>
            <p className="text-xs text-[#9ca3af]">to the {PAYMENT_OPTIONS.find(m => m.id === method)?.name} Agent Number below</p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Agent Number</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={AGENT_NUMBERS[method] || "01700000000"} 
                className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 font-mono text-[#f0f0f0] outline-none"
              />
              <button 
                type="button" 
                onClick={() => handleCopy(AGENT_NUMBERS[method] || "01700000000")}
                className="flex shrink-0 items-center gap-1 rounded-lg bg-[#242628] px-3 py-2.5 text-xs font-bold text-white hover:bg-[#2d2f32]"
              >
                <Copy size={14} /> Copy
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Transaction ID (TxID)</label>
            <input
              type="text"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder="e.g. TRXR123456"
              className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 font-mono text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]"
            />
            <p className="mt-1 text-xs text-[#6b7280]">Enter the 10-digit transaction ID from your SMS</p>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(1)} className="rounded-lg bg-[#242628] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#2d2f32]">Back</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-50">
              {loading ? "Verifying..." : "Submit Verification"}
            </button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
