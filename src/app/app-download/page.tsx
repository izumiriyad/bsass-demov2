import type { Metadata } from "next";
import Link from "next/link";
import { Download, Smartphone, Shield, Zap, Gift } from "lucide-react";

export const metadata: Metadata = { title: "Download App – BSL Gaming" };

const FEATURES = [
  { icon: "⚡", title: "Instant Betting", body: "Place bets in 2 taps, optimized for BD mobile data." },
  { icon: "🔔", title: "Live Notifications", body: "Get real-time score & goal alerts for your bets." },
  { icon: "💳", title: "1-Tap Deposit", body: "bKash / Nagad / Rocket built-in, no passwords needed." },
  { icon: "🎁", title: "App Exclusive Bonus", body: "৳500 free bonus for your first app deposit." },
  { icon: "🔒", title: "Secure & Licensed", body: "SSL-encrypted, PAGCOR licensed, 24/7 monitored." },
  { icon: "🌐", title: "Works Offline", body: "View bet history, transactions, and profile offline." },
];

export default function AppDownloadPage() {
  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#008d5b] via-[#005c3c] to-[#1b1c1e] p-6 md:p-8 text-white">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#ffdf19]/10 blur-3xl" />
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19]">Official App</p>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">BSL Gaming App</h1>
            <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-md">
              The fastest, most secure betting experience in Bangladesh. Available for Android & iOS.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/30 px-5 py-3.5 text-left transition hover:bg-black/40 active:scale-[.98] backdrop-blur">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-[10px] text-white/60">Download for</p>
                  <p className="text-sm font-black text-white">Android APK</p>
                </div>
                <Download size={16} className="ml-auto text-[#ffdf19]" />
              </button>
              <button className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/30 px-5 py-3.5 text-left transition hover:bg-black/40 active:scale-[.98] backdrop-blur">
                <span className="text-2xl">🍎</span>
                <div>
                  <p className="text-[10px] text-white/60">Download for</p>
                  <p className="text-sm font-black text-white">iPhone / iOS</p>
                </div>
                <Download size={16} className="ml-auto text-[#ffdf19]" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffdf19]/10 border border-[#ffdf19]/30 px-3 py-1 text-xs font-black text-[#ffdf19]">
                <Gift size={12} /> ৳500 App Bonus
              </span>
              <span className="text-[10px] text-white/50">Free. No spam. Instant install.</span>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative flex h-[220px] w-[110px] items-center justify-center rounded-[28px] border-4 border-white/20 bg-[#121315] shadow-2xl">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-16 rounded-full bg-[#2a2c30]" />
              <Smartphone size={60} className="text-[#008d5b]" />
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div>
        <h2 className="mb-4 text-sm font-black text-white">How to Install (Android)</h2>
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { step: "1", title: "Click Download", body: "Tap 'Android APK' button above to start download." },
            { step: "2", title: "Allow Unknown Sources", body: "Go to Settings → Security → Enable 'Unknown Sources'." },
            { step: "3", title: "Install APK", body: "Open the downloaded file and tap Install." },
            { step: "4", title: "Login & Bet!", body: "Login with your BSL account and start winning." },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffdf19] text-sm font-black text-[#241a05] mb-3">{s.step}</div>
              <h3 className="text-xs font-black text-white">{s.title}</h3>
              <p className="mt-1 text-[11px] text-[#9ca3af] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="mb-4 text-sm font-black text-white">Why Use the App?</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-3 rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <span className="text-2xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="text-xs font-black text-white">{f.title}</h3>
                <p className="mt-1 text-[11px] text-[#9ca3af]">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} className="text-[#22c55e]" />
          <h2 className="text-sm font-black text-white">Requirements</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div><p className="text-[#9ca3af]">Android</p><p className="font-bold text-white">5.0+ (Lollipop)</p></div>
          <div><p className="text-[#9ca3af]">iOS</p><p className="font-bold text-white">12.0+</p></div>
          <div><p className="text-[#9ca3af]">File size</p><p className="font-bold text-white">~22 MB</p></div>
          <div><p className="text-[#9ca3af]">Version</p><p className="font-bold text-white">v3.4.1 (Latest)</p></div>
        </div>
      </div>
    </div>
  );
}
