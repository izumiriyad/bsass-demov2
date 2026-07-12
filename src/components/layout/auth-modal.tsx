"use client";

import { useState, useCallback, useEffect } from "react";
import { X, Eye, EyeOff, Phone, Lock, User, Mail, Gift, ArrowRight, CheckCircle, AlertCircle, Loader2, QrCode } from "lucide-react";
import { toast } from "sonner";
import { useModal } from "@/components/providers/modal-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { cn, formatBDT } from "@/lib/utils";

const DEPOSIT_METHODS = [
  { id: "bkash",  label: "bKash",    emoji: "📱", color: "#E2136E", bg: "rgba(226,19,110,0.08)",  min: 500,  max: 50000,  time: "2–5 min",   agentNo: "01877-BSLPAY" },
  { id: "nagad",  label: "Nagad",    emoji: "📲", color: "#F6821F", bg: "rgba(246,130,31,0.08)",  min: 500,  max: 50000,  time: "2–5 min",   agentNo: "01855-BSLPAY" },
  { id: "rocket", label: "Rocket",   emoji: "🚀", color: "#8B2FC9", bg: "rgba(139,47,201,0.08)",  min: 500,  max: 50000,  time: "2–5 min",   agentNo: "01844-BSLPAY" },
  { id: "upay",   label: "Upay",     emoji: "💜", color: "#7B3AED", bg: "rgba(123,58,237,0.08)",  min: 500,  max: 25000,  time: "5–10 min",  agentNo: "01866-BSLPAY" },
  { id: "dbbl",   label: "Nexus Pay",emoji: "🏦", color: "#1D4ED8", bg: "rgba(29,78,216,0.08)",   min: 500,  max: 100000, time: "5–15 min",  agentNo: "01833-BSLPAY" },
  { id: "bank",   label: "Bank Wire",emoji: "🏛️", color: "#22c55e", bg: "rgba(34,197,94,0.08)",   min: 1000, max: 500000, time: "30–60 min", agentNo: "ACC: 0192-BSLGM" },
];
const WITHDRAW_METHODS = [
  { id: "bkash",  label: "bKash",    emoji: "📱", color: "#E2136E", bg: "rgba(226,19,110,0.08)",  min: 500,  max: 50000,  time: "5–30 min",  agentNo: "" },
  { id: "nagad",  label: "Nagad",    emoji: "📲", color: "#F6821F", bg: "rgba(246,130,31,0.08)",  min: 500,  max: 50000,  time: "5–30 min",  agentNo: "" },
  { id: "rocket", label: "Rocket",   emoji: "🚀", color: "#8B2FC9", bg: "rgba(139,47,201,0.08)",  min: 500,  max: 50000,  time: "5–30 min",  agentNo: "" },
  { id: "bank",   label: "Bank Wire",emoji: "🏛️", color: "#22c55e", bg: "rgba(34,197,94,0.08)",   min: 1000, max: 500000, time: "1–3 hours", agentNo: "" },
];
const QUICK = [500, 1000, 2000, 5000, 10000, 25000];

/* ─── Login ───────────────────────────── */
function LoginForm({ switchToRegister }: { switchToRegister: () => void }) {
  const { signIn } = useAuth();
  const { closeModal } = useModal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError("সকল ফিল্ড পূরণ করুন।"); return; }
    setLoading(true); setError("");
    try {
      const user = await signIn(username, password);
      toast.success(`স্বাগতম, ${user.username}! 🎉`);
      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#9ca3af]"><User size={12} />Username / Phone</span>
          <div className="flex items-center gap-2 rounded-xl border border-[#2a2c30] bg-[#121315] px-3 focus-within:border-[#ffdf19] transition">
            <Phone size={16} className="text-[#6b7280]" />
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="ইউজারনেম বা ফোন নম্বর" className="w-full bg-transparent py-3 text-sm text-[#f0f0f0] outline-none placeholder:text-[#4b5563]" autoComplete="username" />
          </div>
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#9ca3af]"><Lock size={12} />Password</span>
          <div className="flex items-center gap-2 rounded-xl border border-[#2a2c30] bg-[#121315] px-3 focus-within:border-[#ffdf19] transition">
            <Lock size={16} className="text-[#6b7280]" />
            <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="পাসওয়ার্ড" className="w-full bg-transparent py-3 text-sm text-[#f0f0f0] outline-none placeholder:text-[#4b5563]" autoComplete="current-password" />
            <button type="button" onClick={() => setShow(p => !p)} className="text-[#6b7280] hover:text-white">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
        </label>
      </div>
      {error && <div className="flex items-center gap-2 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-2 text-xs text-[#ef4444]"><AlertCircle size={14} />{error}</div>}
      <div className="flex justify-end"><button type="button" className="text-xs text-[#ffdf19] hover:underline">Forgot password?</button></div>
      <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f5a400] py-3.5 text-sm font-black text-[#241a05] shadow-[0_4px_20px_rgba(255,223,25,0.3)] transition hover:brightness-110 disabled:opacity-60">
        {loading ? <Loader2 size={18} className="animate-spin" /> : <><ArrowRight size={18} />লগইন করুন</>}
      </button>
      <div className="grid grid-cols-3 gap-2">
        {["01877000001 / demo123", "01855000002 / pass456", "01844000003 / test789"].map((d, i) => (
          <button key={i} type="button" onClick={() => { const [u, p] = d.split(" / "); setUsername(u); setPassword(p); }} className="rounded-lg border border-[#2a2c30] bg-[#121315] py-1.5 text-[9px] font-bold text-[#9ca3af] hover:border-[#ffdf19]/50 hover:text-[#ffdf19] transition truncate px-1">Demo {i+1}</button>
        ))}
      </div>
      <p className="text-center text-xs text-[#6b7280]">অ্যাকাউন্ট নেই? <button type="button" onClick={switchToRegister} className="font-bold text-[#ffdf19] hover:underline">এখনই রেজিস্টার করুন</button></p>
    </form>
  );
}

/* ─── Register ─────────────────────────── */
function RegisterForm({ switchToLogin }: { switchToLogin: () => void }) {
  const { signIn } = useAuth();
  const { closeModal } = useModal();
  const [form, setForm] = useState({ username: "", phone: "", email: "", password: "", confirm: "", referral: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.phone || !form.password) { setError("সকল ফিল্ড পূরণ করুন।"); return; }
    if (form.password !== form.confirm) { setError("পাসওয়ার্ড মিলছে না।"); return; }
    if (form.password.length < 6) { setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে।"); return; }
    if (!agreed) { setError("শর্তাবলী মেনে নিতে হবে।"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, phone: form.phone, email: form.email, password: form.password, referralCode: form.referral }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Registration failed");
      await signIn(form.username, form.password);
      toast.success("🎉 স্বাগতম! ৳500 Welcome Bonus অর্জিত হয়েছে!");
      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/10 px-3 py-2.5 flex items-center gap-2">
        <Gift size={16} className="text-[#22c55e] shrink-0" />
        <p className="text-xs font-bold text-[#22c55e]">রেজিস্টার করুন → ৳500 Welcome Bonus পান!</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[["username","Username","ইউজারনেম"], ["phone","Phone","01XXXXXXXXX"]].map(([k,l,p]) => (
          <label key={k} className="block">
            <span className="mb-1 block text-[10px] font-bold text-[#9ca3af]">{l}</span>
            <input value={(form as Record<string,string>)[k]} onChange={set(k)} placeholder={p} className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#ffdf19] transition placeholder:text-[#4b5563]" />
          </label>
        ))}
      </div>
      <label className="block">
        <span className="mb-1 flex items-center gap-1 text-[10px] font-bold text-[#9ca3af]"><Mail size={10} />Email (optional)</span>
        <input value={form.email} onChange={set("email")} placeholder="email@example.com" type="email" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#ffdf19] transition placeholder:text-[#4b5563]" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        {(["password","confirm"] as const).map((k) => (
          <label key={k} className="block">
            <span className="mb-1 block text-[10px] font-bold text-[#9ca3af]">{k === "password" ? "Password" : "Confirm"}</span>
            <div className="flex items-center rounded-xl border border-[#2a2c30] bg-[#121315] px-3 focus-within:border-[#ffdf19] transition">
              <input type={show ? "text" : "password"} value={form[k]} onChange={set(k)} placeholder="••••••" className="w-full bg-transparent py-2.5 text-sm text-[#f0f0f0] outline-none placeholder:text-[#4b5563]" />
              {k === "password" && <button type="button" onClick={() => setShow(p => !p)} className="text-[#6b7280]">{show ? <EyeOff size={14} /> : <Eye size={14} />}</button>}
            </div>
          </label>
        ))}
      </div>
      <label className="block">
        <span className="mb-1 block text-[10px] font-bold text-[#9ca3af]">Referral Code (optional)</span>
        <input value={form.referral} onChange={set("referral")} placeholder="রেফারেল কোড (ঐচ্ছিক)" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#ffdf19] transition placeholder:text-[#4b5563]" />
      </label>
      {error && <div className="flex items-center gap-2 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-2 text-xs text-[#ef4444]"><AlertCircle size={14} />{error}</div>}
      <label className="flex cursor-pointer items-start gap-2.5">
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#ffdf19] shrink-0" />
        <span className="text-xs text-[#9ca3af] leading-5">আমি <a href="/terms" target="_blank" className="text-[#ffdf19] hover:underline">Terms & Conditions</a> এবং <a href="/responsible-gaming" target="_blank" className="text-[#ffdf19] hover:underline">Responsible Gaming</a> নীতি মেনে নিচ্ছি। আমি ১৮+ বছর বয়সী।</span>
      </label>
      <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f5a400] py-3.5 text-sm font-black text-[#241a05] shadow-[0_4px_20px_rgba(255,223,25,0.3)] transition hover:brightness-110 disabled:opacity-60">
        {loading ? <Loader2 size={18} className="animate-spin" /> : <><Gift size={18} />রেজিস্টার করুন ও ৳500 পান</>}
      </button>
      <p className="text-center text-xs text-[#6b7280]">ইতিমধ্যে অ্যাকাউন্ট আছে? <button type="button" onClick={switchToLogin} className="font-bold text-[#ffdf19] hover:underline">লগইন করুন</button></p>
    </form>
  );
}

/* ─── Deposit / Withdraw Modal ─────────── */
function WalletModal({ action }: { action: "deposit" | "withdraw" }) {
  const { user } = useAuth();
  const { openModal } = useModal();
  const methods = action === "deposit" ? DEPOSIT_METHODS : WITHDRAW_METHODS;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [txId, setTxId] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const selMethod = methods.find(m => m.id === selectedMethod);

  useEffect(() => { if (!user) openModal("login"); }, [user, openModal]);
  if (!user) return null;

  const handleSubmit = async () => {
    if (!amount || Number(amount) < (selMethod?.min ?? 500)) { toast.error(`Minimum ${action}: ৳${selMethod?.min ?? 500}`); return; }
    if (!accountNo) { toast.error("মোবাইল নম্বর দিন"); return; }
    if (action === "deposit" && !txId) { toast.error("Transaction ID দিন"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false); setDone(true);
    toast.success(action === "deposit" ? `৳${Number(amount).toLocaleString()} জমার আবেদন সফল!` : `৳${Number(amount).toLocaleString()} উত্তোলনের আবেদন সফল!`);
  };

  if (done) return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/20"><CheckCircle size={40} className="text-[#22c55e]" /></div>
      <div><h3 className="text-xl font-black text-[#f0f0f0]">আবেদন সফল!</h3><p className="mt-1 text-sm text-[#9ca3af]">আপনার {action === "deposit" ? "ডিপোজিট" : "উত্তোলনের"} আবেদন পাঠানো হয়েছে।</p></div>
      <div className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] p-4 text-sm">
        <div className="flex justify-between py-1"><span className="text-[#9ca3af]">পরিমাণ</span><span className="font-black text-[#ffdf19]">{formatBDT(Number(amount))}</span></div>
        <div className="flex justify-between py-1"><span className="text-[#9ca3af]">পদ্ধতি</span><span className="font-bold text-[#f0f0f0]">{selMethod?.label}</span></div>
        <div className="flex justify-between py-1"><span className="text-[#9ca3af]">প্রক্রিয়ার সময়</span><span className="font-bold text-[#22c55e]">{selMethod?.time}</span></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-1">
        {[1,2,3].map(n => (<div key={n} className={cn("h-1 flex-1 rounded-full transition-all", step >= n ? "bg-[#ffdf19]" : "bg-[#2a2c30]")} />))}
      </div>
      <p className="text-[10px] font-bold text-[#6b7280]">Step {step}/3 — {["পদ্ধতি বেছে নিন","পরিমাণ ও নম্বর","নিশ্চিত করুন"][step-1]}</p>

      {step === 1 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {methods.map(m => (
            <button key={m.id} onClick={() => { setSelectedMethod(m.id); setStep(2); }} className={cn("flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition hover:scale-105", selectedMethod === m.id ? "border-[#ffdf19] bg-[#ffdf19]/10" : "border-[#2a2c30] bg-[#121315] hover:border-[#ffdf19]/50")} style={selectedMethod === m.id ? { borderColor: m.color } : {}}>
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs font-black text-[#f0f0f0]">{m.label}</span>
              <span className="text-[9px] text-[#6b7280]">min ৳{m.min.toLocaleString()}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && selMethod && (
        <div className="space-y-3">
          {action === "deposit" && (
            <div className="rounded-xl border p-3 text-xs space-y-1" style={{ borderColor: selMethod.color + "60", background: selMethod.bg }}>
              <p className="font-black" style={{ color: selMethod.color }}>{selMethod.emoji} {selMethod.label} Agent Number</p>
              <div className="flex items-center justify-between">
                <code className="text-base font-black text-[#f0f0f0]">{selMethod.agentNo}</code>
                <button onClick={() => { navigator.clipboard.writeText(selMethod.agentNo); toast.success("Copied!"); }} className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] px-2 py-1 text-[10px] font-bold text-[#9ca3af] hover:text-white transition">Copy</button>
              </div>
              <p className="text-[#9ca3af]">উপরের নম্বরে পাঠান, তারপর নিচে আপনার নম্বর ও TxID দিন।</p>
            </div>
          )}
          <div>
            <p className="mb-1.5 text-[10px] font-bold text-[#9ca3af]">Quick Amount</p>
            <div className="flex flex-wrap gap-1.5">{QUICK.map(q => (<button key={q} type="button" onClick={() => setAmount(String(q))} className={cn("rounded-lg border px-3 py-1.5 text-xs font-bold transition", amount === String(q) ? "border-[#ffdf19] bg-[#ffdf19]/10 text-[#ffdf19]" : "border-[#2a2c30] bg-[#121315] text-[#9ca3af] hover:border-[#ffdf19]/50")}>৳{q.toLocaleString()}</button>))}</div>
          </div>
          <label className="block">
            <span className="mb-1 block text-[10px] font-bold text-[#9ca3af]">পরিমাণ (৳)</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={`min ৳${selMethod.min}`} className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-3 py-2.5 text-sm font-black text-[#ffdf19] outline-none focus:border-[#ffdf19] transition" />
            <p className="mt-1 text-[10px] text-[#6b7280]">Max: ৳{selMethod.max.toLocaleString()} · Process: {selMethod.time}</p>
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] font-bold text-[#9ca3af]">আপনার মোবাইল নম্বর</span>
            <input value={accountNo} onChange={e => setAccountNo(e.target.value)} placeholder="01XXXXXXXXX" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#ffdf19] transition" />
          </label>
          {action === "deposit" && (
            <label className="block">
              <span className="mb-1 flex items-center gap-1 text-[10px] font-bold text-[#9ca3af]"><QrCode size={10} />Transaction ID (TxID)</span>
              <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="bKash/Nagad TxID" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#ffdf19] transition" />
            </label>
          )}
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-sm font-bold text-[#9ca3af] hover:text-white transition">← Back</button>
            <button onClick={() => setStep(3)} disabled={!amount || !accountNo || (action === "deposit" && !txId)} className="flex-1 rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f5a400] py-2.5 text-sm font-black text-[#241a05] disabled:opacity-40 transition hover:brightness-110">Next →</button>
          </div>
        </div>
      )}

      {step === 3 && selMethod && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#2a2c30] bg-[#121315] p-4 space-y-2 text-sm">
            <h3 className="font-black text-[#f0f0f0]">নিশ্চিত করুন</h3>
            {[["পদ্ধতি", `${selMethod.emoji} ${selMethod.label}`], ["পরিমাণ", formatBDT(Number(amount))], ["মোবাইল", accountNo], ...(txId ? [["TxID", txId]] : []), ["ফি", "Free ✓"], ["প্রক্রিয়ার সময়", selMethod.time]].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-[#1f2023] pb-2 last:border-0 last:pb-0">
                <span className="text-[#9ca3af]">{k}</span><span className="font-bold text-[#f0f0f0]">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(2)} className="rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-sm font-bold text-[#9ca3af] hover:text-white transition">← Back</button>
            <button onClick={handleSubmit} disabled={loading} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f5a400] py-2.5 text-sm font-black text-[#241a05] disabled:opacity-60 transition hover:brightness-110">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
              {action === "deposit" ? "ডিপোজিট নিশ্চিত করুন" : "উত্তোলন নিশ্চিত করুন"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Root Modal Shell ─────────────────── */
export function AuthModal() {
  const { modal, closeModal } = useModal();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (modal) {
      if (modal === "login") setTab("login");
      if (modal === "register") setTab("register");
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [modal]);

  if (!modal) return null;

  const isAuth = modal === "login" || modal === "register";
  const isWallet = modal === "deposit" || modal === "withdraw";

  const title = isAuth
    ? tab === "login" ? "লগইন" : "রেজিস্টার"
    : modal === "deposit" ? "💳 ডিপোজিট" : "💸 উত্তোলন";

  return (
    <div
      className={cn("fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300", visible ? "bg-black/70 backdrop-blur-sm" : "bg-transparent")}
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
      role="dialog" aria-modal="true"
    >
      <div className={cn("relative w-full sm:max-w-md max-h-[95dvh] overflow-y-auto no-scrollbar rounded-t-3xl sm:rounded-3xl border border-[#2a2c30] bg-[#1b1c1e] shadow-2xl transition-all duration-300", visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-[0.97]")}>
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 sm:hidden"><div className="h-1 w-10 rounded-full bg-[#3a3c40]" /></div>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2a2c30] bg-[#1b1c1e] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffdf19]">
              <span className="text-xs font-black text-[#241a05]">BSL</span>
            </div>
            <h2 className="text-base font-black text-[#f0f0f0]">{title}</h2>
          </div>
          <button onClick={closeModal} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#242628] text-[#9ca3af] hover:bg-[#2f3135] hover:text-white transition" aria-label="Close"><X size={18} /></button>
        </div>

        {/* Auth tabs */}
        {isAuth && (
          <div className="flex border-b border-[#2a2c30]">
            {(["login","register"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={cn("flex-1 py-3 text-xs font-black uppercase tracking-wide transition", tab === t ? "border-b-2 border-[#ffdf19] text-[#ffdf19] bg-[#ffdf19]/5" : "text-[#6b7280] hover:text-[#9ca3af]")}>
                {t === "login" ? "লগইন" : "রেজিস্টার"}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="p-5">
          {isAuth && tab === "login" && <LoginForm switchToRegister={() => setTab("register")} />}
          {isAuth && tab === "register" && <RegisterForm switchToLogin={() => setTab("login")} />}
          {isWallet && <WalletModal action={modal as "deposit" | "withdraw"} />}
        </div>
      </div>
    </div>
  );
}
