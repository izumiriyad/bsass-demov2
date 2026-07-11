"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/components/providers/modal-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DEPOSIT_METHODS = [
  { id: "bkash",   label: "bKash",   emoji: "📱", color: "#E2136E", bg: "#1a0012", min: 500,  max: 50000,  time: "2–5 min",   fee: "Free" },
  { id: "nagad",   label: "Nagad",   emoji: "📲", color: "#F6821F", bg: "#1a0d00", min: 500,  max: 50000,  time: "2–5 min",   fee: "Free" },
  { id: "rocket",  label: "Rocket",  emoji: "🚀", color: "#8B2FC9", bg: "#0d001a", min: 500,  max: 50000,  time: "2–5 min",   fee: "Free" },
  { id: "upay",    label: "Upay",    emoji: "💜", color: "#7B3AED", bg: "#0e0a1a", min: 500,  max: 25000,  time: "5–10 min",  fee: "Free" },
  { id: "dbbl",    label: "Nexus Pay",emoji: "🏦", color: "#1D4ED8", bg: "#000e1a", min: 500,  max: 100000, time: "5–15 min",  fee: "Free" },
  { id: "bank",    label: "Bank Wire",emoji: "🏛️", color: "#22c55e", bg: "#001a0d", min: 1000, max: 500000, time: "30–60 min", fee: "Free" },
];

const WITHDRAW_METHODS = [
  { id: "bkash",   label: "bKash",   emoji: "📱", color: "#E2136E", bg: "#1a0012", min: 500,  max: 50000,  time: "5–30 min",  fee: "Free" },
  { id: "nagad",   label: "Nagad",   emoji: "📲", color: "#F6821F", bg: "#1a0d00", min: 500,  max: 50000,  time: "5–30 min",  fee: "Free" },
  { id: "rocket",  label: "Rocket",  emoji: "🚀", color: "#8B2FC9", bg: "#0d001a", min: 500,  max: 50000,  time: "5–30 min",  fee: "Free" },
  { id: "bank",    label: "Bank Wire",emoji: "🏛️", color: "#22c55e", bg: "#001a0d", min: 1000, max: 500000, time: "1–3 hours", fee: "Free" },
];

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 25000];

export function WalletActionPage({ action }: { action: "deposit" | "withdraw" }) {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [txId, setTxId] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: method, 2: details, 3: confirm
  const [submitted, setSubmitted] = useState(false);
  const [agentNo] = useState(() => "01" + Math.floor(Math.random() * 900000000 + 100000000));

  const methods = action === "deposit" ? DEPOSIT_METHODS : WITHDRAW_METHODS;
  const selMethod = methods.find((m) => m.id === selectedMethod);

  const isDeposit = action === "deposit";

  const handleSubmit = () => {
    if (!user) { openModal("login"); return; }
    if (!amount || Number(amount) < (selMethod?.min ?? 500)) {
      toast.error(`Minimum ${action} is ৳${selMethod?.min ?? 500}`);
      return;
    }
    if (!accountNo) { toast.error("Please enter your mobile/account number"); return; }
    if (isDeposit && !txId) { toast.error("Please enter the transaction ID (TxID)"); return; }
    setSubmitted(true);
    toast.success(isDeposit ? `Deposit of ৳${Number(amount).toLocaleString()} submitted! Processing in ${selMethod?.time}.` : `Withdrawal of ৳${Number(amount).toLocaleString()} submitted! Processing in ${selMethod?.time}.`);
  };

  if (!user) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4 py-10">
        <div className="max-w-sm text-center">
          <div className="text-6xl mb-4">{isDeposit ? "💳" : "🏦"}</div>
          <h1 className="text-2xl font-black text-white mb-2">{isDeposit ? "Make Deposit" : "Withdraw Funds"}</h1>
          <p className="text-sm text-[#9ca3af] mb-6">Please log in to your account to {action} funds.</p>
          <button onClick={() => openModal("login")} className="w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400]">
            Login to Continue →
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4 py-10">
        <div className="max-w-sm text-center">
          <div className="text-7xl mb-5 animate-bounce">✅</div>
          <h1 className="text-2xl font-black text-white mb-2">
            {isDeposit ? "Deposit Submitted!" : "Withdrawal Submitted!"}
          </h1>
          <p className="text-sm text-[#9ca3af] mb-2">
            ৳{Number(amount).toLocaleString()} via {selMethod?.label}
          </p>
          <p className="text-xs text-[#6b7280] mb-6">
            Processing time: {selMethod?.time}. Check your wallet for updates.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setStep(1); setSelectedMethod(null); setAmount(""); setTxId(""); setAccountNo(""); }} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#242628] transition">
              New {isDeposit ? "Deposit" : "Withdrawal"}
            </button>
            <Link href="/dashboard/transactions" className="rounded-xl bg-[#008d5b] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#00a86d] transition">
              View History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${isDeposit ? "bg-gradient-to-br from-[#008d5b]/20 to-[#004d32]/20 border border-[#008d5b]/30" : "bg-gradient-to-br from-[#3b82f6]/20 to-[#1d4ed8]/20 border border-[#3b82f6]/30"}`}>
          {isDeposit ? "💳" : "🏦"}
        </div>
        <div>
          <h1 className="text-xl font-black text-white">{isDeposit ? "Make Deposit" : "Withdraw Funds"}</h1>
          <p className="text-xs text-[#9ca3af]">Balance: <span className="text-[#ffdf19] font-bold">৳{user.balance.toLocaleString()}</span></p>
        </div>
      </div>

      {/* Step 1: Select Method */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
        <div className="border-b border-[#2a2c30] bg-[#121315] px-4 py-3 flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008d5b] text-[10px] font-black text-white">1</span>
          <span className="text-sm font-black text-white">Select Payment Method</span>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 transition-all text-left active:scale-[.98]",
                selectedMethod === m.id
                  ? "border-[#ffdf19]/60 bg-[#ffdf19]/10 shadow-[0_0_12px_rgba(255,223,25,0.15)]"
                  : "border-[#2a2c30] bg-[#121315] hover:border-[#2a2c30]/60 hover:bg-[#242628]"
              )}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
                style={{ background: m.bg, border: `1px solid ${m.color}33` }}
              >
                {m.emoji}
              </div>
              <div>
                <p className={cn("text-xs font-black", selectedMethod === m.id ? "text-[#ffdf19]" : "text-white")}>{m.label}</p>
                <p className="text-[9px] text-[#6b7280]">{m.fee} · {m.time}</p>
              </div>
              {selectedMethod === m.id && <span className="ml-auto text-[#ffdf19]">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Enter Amount + Details */}
      {selectedMethod && selMethod && (
        <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
          <div className="border-b border-[#2a2c30] bg-[#121315] px-4 py-3 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008d5b] text-[10px] font-black text-white">2</span>
            <span className="text-sm font-black text-white">Enter Amount & Details</span>
          </div>
          <div className="p-4 space-y-4">
            {/* Method info */}
            <div className="flex items-center gap-3 rounded-xl border border-[#2a2c30] bg-[#121315] p-3">
              <span className="text-2xl">{selMethod.emoji}</span>
              <div>
                <p className="text-sm font-black text-white">{selMethod.label}</p>
                <p className="text-xs text-[#9ca3af]">Min: ৳{selMethod.min.toLocaleString()} · Max: ৳{selMethod.max.toLocaleString()}</p>
              </div>
            </div>

            {/* Agent number for deposit */}
            {isDeposit && (
              <div className="rounded-xl border border-[#ffdf19]/30 bg-[#ffdf19]/5 p-3">
                <p className="text-[10px] font-black uppercase text-[#ffdf19] mb-1">Send money to this number</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-lg font-black text-white">{agentNo}</p>
                  <button
                    onClick={() => { navigator.clipboard.writeText(agentNo); toast.success("Agent number copied!"); }}
                    className="rounded-lg border border-[#ffdf19]/30 bg-[#ffdf19]/10 px-3 py-1.5 text-[10px] font-black text-[#ffdf19] hover:bg-[#ffdf19]/20 transition"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-[10px] text-[#9ca3af] mt-1">⚠️ This number changes each time. Don't save it.</p>
              </div>
            )}

            {/* Quick amounts */}
            <div>
              <p className="text-[10px] font-black uppercase text-[#9ca3af] mb-2">Quick Select Amount (৳)</p>
              <div className="grid grid-cols-3 gap-2">
                {QUICK_AMOUNTS.map((qa) => (
                  <button
                    key={qa}
                    onClick={() => setAmount(String(qa))}
                    className={cn(
                      "rounded-lg border py-2 text-xs font-black transition",
                      amount === String(qa)
                        ? "border-[#ffdf19]/60 bg-[#ffdf19]/15 text-[#ffdf19]"
                        : "border-[#2a2c30] bg-[#121315] text-[#9ca3af] hover:border-[#2a2c30]/80 hover:text-white"
                    )}
                  >
                    ৳{qa.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount input */}
            <div>
              <label className="text-[10px] font-black uppercase text-[#9ca3af] mb-1.5 block">Amount (৳)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Min ৳${selMethod.min} – Max ৳${selMethod.max.toLocaleString()}`}
                className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white outline-none focus:border-[#ffdf19]/50 placeholder:text-[#6b7280]"
              />
            </div>

            {/* Account/mobile number */}
            <div>
              <label className="text-[10px] font-black uppercase text-[#9ca3af] mb-1.5 block">
                {isDeposit ? "Your" : ""} {selMethod.label} {selMethod.id === "bank" ? "Account Number" : "Mobile Number"}
              </label>
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder={selMethod.id === "bank" ? "e.g. 01XXXXXXXXX-Bank" : "01XXXXXXXXX"}
                className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white outline-none focus:border-[#ffdf19]/50 placeholder:text-[#6b7280]"
              />
            </div>

            {/* TxID for deposits */}
            {isDeposit && (
              <div>
                <label className="text-[10px] font-black uppercase text-[#9ca3af] mb-1.5 block">Transaction ID (TxID)</label>
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder="e.g. A1B2C3D4E5"
                  className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white outline-none focus:border-[#ffdf19]/50 placeholder:text-[#6b7280]"
                />
                <p className="text-[10px] text-[#6b7280] mt-1">Find TxID in your {selMethod.label} app under transaction history.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submit */}
      {selectedMethod && (
        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-4 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110 active:scale-[.98]"
        >
          {isDeposit ? `Submit Deposit → ৳${Number(amount || 0).toLocaleString()}` : `Submit Withdrawal → ৳${Number(amount || 0).toLocaleString()}`}
        </button>
      )}

      {/* Info */}
      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4 space-y-2">
        <p className="text-[10px] font-black uppercase text-[#9ca3af]">Important Notes</p>
        {isDeposit ? (
          <ul className="space-y-1.5 text-[11px] text-[#9ca3af]">
            <li className="flex items-start gap-2"><span className="text-[#22c55e] shrink-0">✓</span>Send money to the agent number shown above, not our company number.</li>
            <li className="flex items-start gap-2"><span className="text-[#22c55e] shrink-0">✓</span>Keep your TxID — it's required to complete the deposit.</li>
            <li className="flex items-start gap-2"><span className="text-[#ffdf19] shrink-0">⚠️</span>Agent numbers rotate for security — never use a saved number.</li>
            <li className="flex items-start gap-2"><span className="text-[#22c55e] shrink-0">✓</span>Deposits are usually credited within 5–15 minutes.</li>
          </ul>
        ) : (
          <ul className="space-y-1.5 text-[11px] text-[#9ca3af]">
            <li className="flex items-start gap-2"><span className="text-[#22c55e] shrink-0">✓</span>Withdrawals are processed in under 30 minutes during business hours.</li>
            <li className="flex items-start gap-2"><span className="text-[#22c55e] shrink-0">✓</span>Account must be in your registered name. Third-party accounts are rejected.</li>
            <li className="flex items-start gap-2"><span className="text-[#ffdf19] shrink-0">⚠️</span>Meet wagering requirements before withdrawing bonus funds.</li>
            <li className="flex items-start gap-2"><span className="text-[#22c55e] shrink-0">✓</span>Identity verification may be required for large withdrawals.</li>
          </ul>
        )}
      </div>
    </div>
  );
}
