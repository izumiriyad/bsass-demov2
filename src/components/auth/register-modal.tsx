"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";

export function RegisterModal() {
  const { modal, closeModal, openModal } = useModal();
  const { signIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    if (!/^01\d{9}$/.test(mobile)) { toast.error("Enter a valid Bangladesh mobile number, e.g. 017XXXXXXXX"); return; }
    setOtpSent(true); setOtp("123456");
    toast.success("OTP sent: 123456");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !mobile || !email || !password) { toast.error("Please fill in all required fields"); return; }
    if (!/^01\d{9}$/.test(mobile)) { toast.error("Please enter a valid Bangladesh mobile number"); return; }
    if (!otpSent || otp !== "123456") { toast.error("Please verify mobile number with OTP 123456"); return; }
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return; }
    if (!agree) { toast.error("Please agree to the terms and confirm you are 18+"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, email, password, mobile }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Registration failed");
      await signIn(username, password);
      toast.success("Account created! ৳500 welcome credit added.");
      closeModal(); router.push("/dashboard");
    } catch (err) { toast.error(err instanceof Error ? err.message : "Registration failed"); }
    finally { setLoading(false); }
  };

  return (
    <Dialog open={modal === "register"} onClose={closeModal}>
      <DialogTitle>Create BSL Gaming Account</DialogTitle>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-lg border border-[#ffdf19]/20 bg-[#ffdf19]/5 px-3 py-2 text-xs text-[#d8d2bf]">Bangladesh users only • BDT wallet • OTP: <b>123456</b></div>
        <div><label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Username</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Bangladesh Mobile Number</label><div className="flex gap-2"><input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="017XXXXXXXX" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]" /><button type="button" onClick={sendOtp} className="shrink-0 rounded-lg bg-[#242628] px-3 text-xs font-bold text-[#ffdf19] hover:bg-[#2d2f32]">Send OTP</button></div></div>
        {otpSent && <div><label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">OTP Verification</label><input inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]" /></div>}
        <div><label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]" /></div>
        <div className="grid gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]" /></div><div><label className="mb-1.5 block text-sm font-medium text-[#9ca3af]">Confirm</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] placeholder:text-[#6b7280] outline-none transition focus:border-[#008d5b]" /></div></div>
        <label className="flex items-center gap-2 text-sm text-[#9ca3af]"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="h-4 w-4 rounded border-[#2a2c30] bg-[#121315] accent-[#008d5b]" />I agree to Terms & Conditions and confirm I am 18+ years old</label>
        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm disabled:opacity-50">{loading ? "Creating account..." : "Create Account"}</button>
        <p className="text-center text-sm text-[#9ca3af]">Already have an account? <button type="button" onClick={() => openModal("login")} className="font-semibold text-[#ffdf19] hover:underline">Login</button></p>
      </form>
    </Dialog>
  );
}
