"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, X, Phone, Lock, User, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { cn } from "@/lib/utils";

/* ─────────────────────────────── Shared Input ─── */
function Input({
  label, type = "text", value, onChange, placeholder, icon: Icon, hint, error,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  icon?: React.ElementType; hint?: string; error?: string;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]">
            <Icon size={15} />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={isPassword ? "current-password" : "off"}
          className={cn(
            "w-full rounded-xl border bg-[#0d0e10] py-3 text-sm text-[#f0f0f0] placeholder:text-[#4b5563] outline-none transition-all",
            Icon ? "pl-10 pr-10" : "px-4",
            error ? "border-[#ef4444] focus:border-[#ef4444]" : "border-[#2a2c30] focus:border-[#ffdf19]"
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#9ca3af]"
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {error && <p className="flex items-center gap-1 text-[10px] text-[#ef4444]"><AlertCircle size={10} />{error}</p>}
      {hint && !error && <p className="text-[10px] text-[#6b7280]">{hint}</p>}
    </div>
  );
}

/* ────────────────────────────────── LOGIN ─── */
export function LoginModal() {
  const { modal, closeModal, openModal } = useModal();
  const { signIn } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"username" | "mobile">("username");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (modal !== "login") return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (tab === "username" && !username.trim()) e.username = "Username is required";
    if (tab === "mobile" && !/^01\d{9}$/.test(mobile)) e.mobile = "Enter valid BD number (01XXXXXXXXX)";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const id = tab === "username" ? username : mobile;
      await signIn(id, password);
      toast.success("স্বাগতম! Welcome back to BSL Gaming 🎉");
      closeModal();
      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={closeModal} />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#111315] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1b1c1e] to-[#0d0e10] px-6 pt-7 pb-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#ffdf19]/5 blur-2xl" />
          <div className="absolute -left-8 -bottom-4 h-24 w-24 rounded-full bg-[#008d5b]/10 blur-2xl" />
          <button onClick={closeModal} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#9ca3af] hover:bg-white/10 hover:text-white transition">
            <X size={16} />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008d5b] text-base font-black text-white shadow-lg">BSL</div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">Bangladesh #1</p>
              <p className="text-lg font-black text-white leading-tight">BSL Gaming</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-[#9ca3af] mt-2">Sign in to your account</p>
        </div>

        {/* Login Tabs */}
        <div className="mx-6 mt-5 flex rounded-xl bg-[#0d0e10] p-1 gap-1">
          {(["username", "mobile"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-lg py-2 text-xs font-black uppercase tracking-wider transition",
                tab === t ? "bg-[#ffdf19] text-[#241a05] shadow" : "text-[#6b7280] hover:text-[#9ca3af]"
              )}
            >
              {t === "username" ? "Username" : "Mobile"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {tab === "username" ? (
            <Input label="Username" value={username} onChange={setUsername} placeholder="Enter username" icon={User} error={errors.username} />
          ) : (
            <Input label="Bangladesh Mobile" type="tel" value={mobile} onChange={setMobile} placeholder="017XXXXXXXX" icon={Phone} error={errors.mobile} hint="Format: 01XXXXXXXXX (11 digits)" />
          )}
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="Enter password" icon={Lock} error={errors.password} />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-[#9ca3af] cursor-pointer">
              <input type="checkbox" className="rounded border-[#2a2c30] bg-[#0d0e10] accent-[#008d5b] h-3.5 w-3.5" />
              Remember me
            </label>
            <button type="button" onClick={() => toast.info("Contact support to reset password")} className="text-xs font-semibold text-[#ffdf19] hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3.5 text-sm font-black text-[#241a05] shadow-[0_4px_15px_rgba(255,223,25,0.4)] transition hover:brightness-110 active:scale-[.98] disabled:opacity-60 border-b-[3px] border-[#c28400]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#241a05] border-t-transparent" />
                Signing In...
              </span>
            ) : "Login / লগইন"}
          </button>

          {/* Demo hint */}
          <div className="rounded-xl bg-[#008d5b]/10 border border-[#008d5b]/20 px-4 py-3">
            <p className="text-[10px] font-bold text-[#22c55e] uppercase tracking-wider mb-1">Demo Account</p>
            <p className="text-[11px] text-[#9ca3af]">Username: <b className="text-white">demo</b> &nbsp;|&nbsp; Password: <b className="text-white">demo123</b></p>
          </div>

          <p className="text-center text-xs text-[#9ca3af]">
            New to BSL?{" "}
            <button type="button" onClick={() => openModal("register")} className="font-black text-[#ffdf19] hover:underline">
              Create Account →
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────── REGISTER ─── */
const STEPS = ["Account", "Verify", "Security"];

export function RegisterModal() {
  const { modal, closeModal, openModal } = useModal();
  const { signIn } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [referral, setReferral] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (modal !== "register") return null;

  const sendOtp = async () => {
    if (!/^01\d{9}$/.test(mobile)) { setErrors({ mobile: "Enter valid BD number (01XXXXXXXXX)" }); return; }
    setOtpLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setOtpSent(true);
    setOtpLoading(false);
    toast.success("OTP sent! Use 123456 for demo");
  };

  const verifyOtp = () => {
    if (otp === "123456") { setOtpVerified(true); toast.success("Mobile verified! ✓"); }
    else setErrors({ otp: "Invalid OTP. Use 123456 for demo" });
  };

  const next = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!username.trim()) e.username = "Required";
      if (!/^01\d{9}$/.test(mobile)) e.mobile = "Valid BD number required";
      if (!otpVerified) e.otp = "Please verify your mobile number";
    }
    if (step === 1) {
      if (!email.trim() || !email.includes("@")) e.email = "Valid email required";
    }
    if (step === 2) {
      if (password.length < 6) e.password = "Min 6 characters";
      if (password !== confirm) e.confirm = "Passwords do not match";
      if (!agree) e.agree = "You must agree to continue";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(s => Math.min(s + 1, 2));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eCheck: Record<string, string> = {};
    if (password.length < 6) eCheck.password = "Min 6 characters";
    if (password !== confirm) eCheck.confirm = "Passwords do not match";
    if (!agree) eCheck.agree = "You must agree to continue";
    if (Object.keys(eCheck).length) { setErrors(eCheck); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, mobile }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Registration failed");
      await signIn(username, password);
      toast.success("Account created! ৳500 welcome bonus added 🎉");
      closeModal();
      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={closeModal} />
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#111315] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1b1c1e] to-[#0d0e10] px-6 pt-6 pb-4">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#ffdf19]/5 blur-2xl" />
          <button onClick={closeModal} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#9ca3af] hover:bg-white/10 transition">
            <X size={16} />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008d5b] text-base font-black text-white shadow-lg">BSL</div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">Bangladesh #1 Platform</p>
              <p className="text-base font-black text-white leading-tight">Create Account</p>
            </div>
          </div>
          {/* Step progress */}
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition",
                    i < step ? "bg-[#008d5b] text-white" : i === step ? "bg-[#ffdf19] text-[#241a05]" : "bg-[#242628] text-[#6b7280]"
                  )}>
                    {i < step ? <CheckCircle2 size={14} /> : i + 1}
                  </div>
                  <span className={cn("text-[9px] font-bold", i === step ? "text-[#ffdf19]" : "text-[#6b7280]")}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-1 mb-4 transition", i < step ? "bg-[#008d5b]" : "bg-[#242628]")} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Banner */}
        <div className="mx-6 mt-4 flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#ffdf19]/10 to-[#008d5b]/10 border border-[#ffdf19]/20 px-4 py-3">
          <span className="text-2xl">🎁</span>
          <div>
            <p className="text-xs font-black text-[#ffdf19]">Welcome Bonus</p>
            <p className="text-[11px] text-[#9ca3af]">Get ৳10,000 bonus on first deposit + ৳500 free credit</p>
          </div>
        </div>

        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); next(); }} className="space-y-4 px-6 py-5">

          {/* Step 0 — Account Info */}
          {step === 0 && (
            <>
              <Input label="Username" value={username} onChange={setUsername} placeholder="Choose username (min 4 chars)" icon={User} error={errors.username} />
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider">Bangladesh Mobile</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]"><Phone size={15} /></div>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => { setMobile(e.target.value); setOtpSent(false); setOtpVerified(false); }}
                      placeholder="01XXXXXXXXX"
                      className={cn("w-full rounded-xl border bg-[#0d0e10] pl-10 pr-4 py-3 text-sm text-[#f0f0f0] outline-none transition", errors.mobile ? "border-[#ef4444]" : "border-[#2a2c30] focus:border-[#ffdf19]")}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={otpLoading || otpVerified}
                    className="shrink-0 rounded-xl bg-[#242628] border border-[#2a2c30] px-4 text-xs font-black text-[#ffdf19] hover:bg-[#2d2f32] transition disabled:opacity-50"
                  >
                    {otpLoading ? "..." : otpVerified ? "✓" : "Send OTP"}
                  </button>
                </div>
                {errors.mobile && <p className="text-[10px] text-[#ef4444] flex items-center gap-1"><AlertCircle size={10} />{errors.mobile}</p>}
              </div>
              {otpSent && !otpVerified && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider">OTP Code</label>
                  <div className="flex gap-2">
                    <input
                      value={otp}
                      onChange={(e) => { setOtp(e.target.value); setErrors({}); }}
                      placeholder="Enter OTP (demo: 123456)"
                      inputMode="numeric"
                      maxLength={6}
                      className={cn("flex-1 rounded-xl border bg-[#0d0e10] px-4 py-3 text-sm text-[#f0f0f0] outline-none transition tracking-[0.3em] font-mono", errors.otp ? "border-[#ef4444]" : "border-[#2a2c30] focus:border-[#ffdf19]")}
                    />
                    <button type="button" onClick={verifyOtp} className="shrink-0 rounded-xl bg-[#008d5b] px-4 text-xs font-black text-white hover:bg-[#009966] transition">
                      Verify
                    </button>
                  </div>
                  {errors.otp && <p className="text-[10px] text-[#ef4444] flex items-center gap-1"><AlertCircle size={10} />{errors.otp}</p>}
                </div>
              )}
              {otpVerified && (
                <div className="flex items-center gap-2 rounded-xl bg-[#008d5b]/10 border border-[#008d5b]/30 px-4 py-2.5">
                  <CheckCircle2 size={16} className="text-[#22c55e] shrink-0" />
                  <p className="text-xs font-bold text-[#22c55e]">Mobile number verified!</p>
                </div>
              )}
              {errors.otp && <p className="text-[10px] text-[#ef4444]">{errors.otp}</p>}
            </>
          )}

          {/* Step 1 — Personal Info */}
          {step === 1 && (
            <>
              <Input label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@email.com" icon={Mail} error={errors.email} hint="For account recovery and notifications" />
              <Input label="Referral Code (Optional)" value={referral} onChange={setReferral} placeholder="Enter referral code" hint="Get extra ৳100 bonus with a valid code" />
              <div className="rounded-xl bg-[#1b1c1e] border border-[#2a2c30] p-4 space-y-2">
                <p className="text-xs font-black text-[#9ca3af] uppercase tracking-wider">Your Benefits</p>
                {[
                  "৳500 free credit on registration",
                  "100% bonus up to ৳10,000 on first deposit",
                  "bKash / Nagad / Rocket deposits",
                  "24/7 Bangla customer support",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-xs text-[#d8d2bf]">
                    <CheckCircle2 size={12} className="text-[#22c55e] shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2 — Security */}
          {step === 2 && (
            <>
              <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="Min 6 characters" icon={Lock} error={errors.password} hint="Use letters, numbers, symbols" />
              <Input label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Re-enter password" icon={Lock} error={errors.confirm} />
              <label className={cn("flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition", agree ? "border-[#008d5b]/50 bg-[#008d5b]/10" : "border-[#2a2c30] bg-[#0d0e10]")}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-[#2a2c30] accent-[#008d5b] shrink-0" />
                <span className="text-xs text-[#9ca3af] leading-relaxed">
                  I am 18+ years old and agree to the{" "}
                  <span className="text-[#ffdf19]">Terms & Conditions</span>,{" "}
                  <span className="text-[#ffdf19]">Privacy Policy</span>, and{" "}
                  <span className="text-[#ffdf19]">Responsible Gaming</span> guidelines.
                </span>
              </label>
              {errors.agree && <p className="text-[10px] text-[#ef4444] flex items-center gap-1"><AlertCircle size={10} />{errors.agree}</p>}
            </>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-1">
            {step > 0 && (
              <button type="button" onClick={() => setStep(s => s - 1)} className="flex-1 rounded-xl border border-[#2a2c30] py-3 text-sm font-bold text-[#9ca3af] hover:border-[#383b3f] hover:text-white transition">
                ← Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3.5 text-sm font-black text-[#241a05] shadow-[0_4px_15px_rgba(255,223,25,0.3)] transition hover:brightness-110 active:scale-[.98] disabled:opacity-60 border-b-[3px] border-[#c28400]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#241a05] border-t-transparent" />
                  Creating...
                </span>
              ) : step < 2 ? "Next →" : "Create Account"}
            </button>
          </div>

          <p className="text-center text-xs text-[#9ca3af]">
            Already have an account?{" "}
            <button type="button" onClick={() => openModal("login")} className="font-black text-[#ffdf19] hover:underline">
              Login →
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
