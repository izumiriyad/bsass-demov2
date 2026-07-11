"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "./auth-provider";

export function GlobalExperience() {
  const { user } = useAuth();
  const [ageGate, setAgeGate] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  // Must run client-side only to avoid SSR/hydration mismatch
  useEffect(() => {
    if (window.localStorage.getItem("bsl-age-verified") !== "yes") {
      setAgeGate(true);
    }
    if (window.localStorage.getItem("bsl-cookie-consent") !== "yes") {
      setCookieOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!user || window.sessionStorage.getItem("bsl-live-toast") === "shown") return;
    const t = window.setTimeout(() => {
      toast.success("Live balance channel connected", {
        description: "ডিপোজিট, উইথড্র ও bet settlement আপডেট এখানে দেখাবে।",
      });
      window.sessionStorage.setItem("bsl-live-toast", "shown");
    }, 2500);
    return () => window.clearTimeout(t);
  }, [user]);

  const acceptAge = () => {
    window.localStorage.setItem("bsl-age-verified", "yes");
    setAgeGate(false);
  };

  const acceptCookies = () => {
    window.localStorage.setItem("bsl-cookie-consent", "yes");
    setCookieOpen(false);
  };

  return (
    <>
      {ageGate && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="age-title">
          <div className="max-w-md overflow-hidden rounded-2xl border border-[#ffdf19]/30 bg-[#1b1c1e] shadow-2xl">
            <div className="bg-gradient-to-r from-[#008d5b] to-[#006640] p-5 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-[#ffdf19]" />
                <div>
                  <h2 id="age-title" className="text-xl font-black">18+ Age Verification</h2>
                  <p className="text-sm text-white/80">বয়স নিশ্চিতকরণ</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <p className="text-sm leading-6 text-[#d8d2bf]">
                BSL Gaming is intended only for users who are legally eligible and at least 18 years old. Please play responsibly and follow applicable Bangladesh laws and platform terms.
              </p>
              <div className="rounded-lg border border-[#2a2c30] bg-[#121315] p-3 text-xs leading-5 text-[#9ca3af]">
                This is a frontend implementation. Real-money launch requires licensing, KYC/AML, payment compliance, and production backend integration.
              </div>
              <div className="flex gap-3">
                <button onClick={acceptAge} className="flex-1 rounded-lg bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-4 py-2.5 text-sm font-black text-[#241a05]">I am 18+</button>
                <Link href="/responsible-gaming" className="rounded-lg border border-[#3a3831] px-4 py-2.5 text-sm font-bold text-[#f0f0f0]">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {cookieOpen && !ageGate && (
        <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-3xl rounded-2xl border border-[#2a2c30] bg-[#1b1c1e]/95 p-4 shadow-2xl backdrop-blur sm:left-auto sm:w-[520px]" role="region" aria-label="Cookie notice">
          <button onClick={() => setCookieOpen(false)} className="absolute right-3 top-3 text-[#8c8a80] hover:text-white" aria-label="Close cookie notice"><X size={16} /></button>
          <h3 className="text-sm font-black text-[#f0f0f0]">Cookies & local storage</h3>
          <p className="mt-1 pr-6 text-xs leading-5 text-[#9ca3af]">We use essential storage for theme, age confirmation, login session UI and responsible-gaming preferences. আমরা প্রয়োজনীয় লোকাল স্টোরেজ ব্যবহার করি।</p>
          <div className="mt-3 flex gap-2"><button onClick={acceptCookies} className="rounded-lg bg-[#008d5b] px-3 py-2 text-xs font-bold text-white">Accept</button><Link href="/privacy" className="rounded-lg bg-[#242628] px-3 py-2 text-xs font-bold text-[#d8d2bf]">Privacy</Link></div>
        </div>
      )}

      <Link href="/support" className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#ffdf19] to-[#f4a700] text-[#241a05] shadow-2xl transition hover:scale-105 sm:bottom-6" aria-label="Contact support">
        <MessageCircle className="h-6 w-6" />
      </Link>
    </>
  );
}
