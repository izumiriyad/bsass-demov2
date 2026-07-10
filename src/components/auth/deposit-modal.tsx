"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { PAYMENT_OPTIONS } from "@/lib/catalog";
import { formatBDT, cn } from "@/lib/utils";
import { Copy, Clock, AlertTriangle, QrCode } from "lucide-react";

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
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast.error("Deposit session expired. Please restart.");
      setStep(1);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

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
    setTimeLeft(900); // Reset timer to 15 mins
    setStep(2);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Agent Number Copied!");
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
      resetForm();
      closeModal();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAmount(0);
    setMethod("");
    setTxId("");
    setStep(1);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const selectedMethodName = PAYMENT_OPTIONS.find(m => m.id === method)?.name || "Agent";
  // Dynamically decide warning message
  const warningMsg = method === "bkash" || method === "nagad" 
    ? "⚠️ Use 'Cash Out' ONLY! Do NOT use Send Money." 
    : "⚠️ Use 'Send Money' to the number below.";

  return (
    <Dialog open={modal === "deposit"} onClose={() => { closeModal(); setTimeout(resetForm, 300); }}>
      <DialogTitle className="flex items-center justify-between">
        <span>Deposit Funds</span>
        {step === 2 && (
          <span className="flex items-center gap-1 rounded bg-[#ef4444]/20 px-2 py-1 text-[11px] font-bold text-[#ef4444] animate-pulse">
            <Clock size={12} /> {formatTime(timeLeft)}
          </span>
        )}
      </DialogTitle>
      
      {/* Stepper */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold", step >= 1 ? "bg-[#008d5b] text-white" : "bg-[#2a2c30] text-[#6b7280]")}>1</div>
        <div className={cn("h-0.5 w-8 transition-colors", step === 2 ? "bg-[#008d5b]" : "bg-[#2a2c30]")} />
        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors", step === 2 ? "bg-[#008d5b] text-white" : "bg-[#2a2c30] text-[#6b7280]")}>2</div>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNext} className="space-y-4 animate-in slide-in-from-left-4 fade-in">
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
                    "rounded-md border py-1.5 text-xs font-semibold transition active:scale-95",
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
            <label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Select Method</label>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMethod(opt.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition active:scale-[.98]",
                    method === opt.id
                      ? "border-[#ffdf19] bg-[#ffdf19]/10 shadow-[0_0_15px_rgba(255,223,25,0.15)]"
                      : "border-[#2a2c30] bg-[#1b1c1e] hover:border-[#383b3f]"
                  )}
                >
                  <span className="text-xl drop-shadow">{opt.emoji}</span>
                  <div>
                    <p className={cn("text-sm font-bold", method === opt.id ? "text-[#ffdf19]" : "text-[#f0f0f0]")}>{opt.name}</p>
                    <p className="text-[10px] text-[#6b7280]">{opt.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <button type="submit" disabled={!amount || !method} className="btn-primary w-full py-3 text-sm font-black tracking-wide disabled:opacity-50">NEXT STEP</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-4 fade-in">
          
          <div className="rounded-xl border border-[#ef4444]/40 bg-[#ef4444]/10 p-3 text-center animate-warning-pulse">
            <p className="flex items-center justify-center gap-1.5 text-xs font-black text-[#ef4444]">
              <AlertTriangle size={14} /> {warningMsg}
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#1b1c1e] to-[#242628] border border-[#35342e] p-4 text-center shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-[0.03] p-2 pointer-events-none">
              <QrCode size={100} />
            </div>
            <p className="text-xs text-[#9ca3af] font-semibold uppercase tracking-wider">Transfer Exactly</p>
            <p className="text-3xl font-black text-[#ffdf19] drop-shadow-md my-1">৳{amount.toLocaleString()}</p>
            <p className="text-xs text-[#6b7280]">to the {selectedMethodName} number below</p>
          </div>

          <div>
            <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-[#9ca3af]">
              <span>Official Agent Number</span>
              <span className="text-[10px] text-[#00a86d] flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#00a86d] animate-pulse"></span> Online</span>
            </label>
            <div className="flex items-center gap-2 relative">
              <input 
                type="text" 
                readOnly 
                value={AGENT_NUMBERS[method] || "01700000000"} 
                className="w-full rounded-xl border-2 border-[#ffdf19]/30 bg-[#121315] pl-4 pr-24 py-3 font-mono text-lg font-bold tracking-widest text-[#f0f0f0] outline-none"
              />
              <button 
                type="button" 
                onClick={() => handleCopy(AGENT_NUMBERS[method] || "01700000000")}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-lg bg-[#ffdf19] px-3 py-1.5 text-xs font-black uppercase text-[#241a05] shadow-md transition hover:brightness-110 active:scale-95"
              >
                <Copy size={12} strokeWidth={3} /> Copy
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
              className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 font-mono text-lg font-bold uppercase text-[#f0f0f0] placeholder:text-[#383b3f] outline-none transition focus:border-[#008d5b] focus:ring-1 focus:ring-[#008d5b]/50"
            />
            <p className="mt-1.5 text-[11px] text-[#6b7280]">Enter the 10-digit TrxID from your successful payment SMS</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => setStep(1)} className="rounded-xl bg-[#242628] px-5 py-3 text-sm font-bold text-white hover:bg-[#2d2f32] active:scale-95 transition">Back</button>
            <button type="submit" disabled={loading || txId.length < 5} className="btn-primary flex-1 rounded-xl py-3 text-sm font-black tracking-wide shadow-lg disabled:opacity-50 transition active:scale-[.98]">
              {loading ? "VERIFYING..." : "SUBMIT DEPOSIT"}
            </button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
