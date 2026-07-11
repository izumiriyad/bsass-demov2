"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { Copy, CheckCircle2, Users, Gift, TrendingUp, Share2 } from "lucide-react";
import Link from "next/link";

const TIERS = [
  { level: "Tier 1", friends: "1-5 Friends", reward: "৳500", yourBonus: "৳500/friend", color: "#22c55e" },
  { level: "Tier 2", friends: "6-20 Friends", reward: "৳700", yourBonus: "৳700/friend", color: "#3b82f6" },
  { level: "Tier 3", friends: "21+ Friends", reward: "৳1,000", yourBonus: "৳1,000/friend", color: "#ffdf19" },
];

const DEMO_REFERRALS = [
  { name: "Karim***", date: "Today, 09:14 AM", status: "Verified", bonus: "৳500" },
  { name: "Sadia***", date: "Yesterday, 5:32 PM", status: "Pending", bonus: "৳500" },
  { name: "Arif***", date: "2 days ago", status: "Verified", bonus: "৳500" },
];

export default function ReferralPage() {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [copied, setCopied] = useState(false);

  const refCode = user ? `BSL${user.username.toUpperCase().slice(0, 4)}2025` : "BSLREF2025";
  const refLink = `https://bslgaming.com/register?ref=${refCode}`;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#008d5b] via-[#005c3c] to-[#003d28] p-6 text-white">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-[#ffdf19]/10 blur-2xl" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19]">Invite & Earn</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">BSL Referral Program</h1>
          <p className="mt-2 max-w-lg text-sm text-white/80 leading-relaxed">
            Invite friends to BSL Gaming and earn ৳500–৳1,000 for each friend who registers and deposits.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: "👥", label: "Friends Referred", val: user ? "3" : "0" },
              { icon: "💰", label: "Total Earned", val: user ? "৳1,500" : "৳0" },
              { icon: "⏳", label: "Pending", val: user ? "৳500" : "৳0" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/10 p-3 text-center backdrop-blur">
                <p className="text-xl">{s.icon}</p>
                <p className="mt-1 text-base font-black text-white">{s.val}</p>
                <p className="text-[9px] text-white/60 font-bold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Code */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af] mb-3">Your Referral Details</p>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-[#9ca3af] mb-1.5">Referral Code</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-xl border border-[#ffdf19]/30 bg-[#121315] px-4 py-3 font-mono text-lg font-black tracking-widest text-[#ffdf19]">
                {refCode}
              </div>
              <button
                onClick={() => copy(refCode)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffdf19] text-[#241a05] transition hover:brightness-110 active:scale-95"
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#9ca3af] mb-1.5">Referral Link</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-xs text-[#9ca3af] truncate font-mono">
                {refLink}
              </div>
              <button
                onClick={() => copy(refLink)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#242628] border border-[#2a2c30] text-[#9ca3af] transition hover:border-[#ffdf19]/40 hover:text-[#ffdf19]"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
        {!user && (
          <button
            onClick={() => openModal("register")}
            className="mt-4 w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-3 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110"
          >
            Register to Get Your Referral Code
          </button>
        )}
      </div>

      {/* Reward Tiers */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-white">
          <TrendingUp size={16} className="text-[#ffdf19]" /> Reward Tiers
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div key={tier.level} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: tier.color }}>{tier.level}</p>
              <p className="mt-1 text-sm font-bold text-[#9ca3af]">{tier.friends}</p>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9ca3af]">Friend gets</span>
                  <span className="text-xs font-black text-[#22c55e]">{tier.reward}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9ca3af]">You earn</span>
                  <span className="text-xs font-black" style={{ color: tier.color }}>{tier.yourBonus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-white">
          <Gift size={16} className="text-[#ffdf19]" /> How It Works
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { step: "01", icon: "📤", title: "Share Your Code", body: "Share your unique referral code with friends via WhatsApp, Telegram or any social media." },
            { step: "02", icon: "📝", title: "Friend Registers", body: "Your friend uses your code when registering and makes their first deposit of at least ৳500." },
            { step: "03", icon: "💰", title: "Both Get Rewarded", body: "Your friend gets ৳500 welcome credit and you get ৳500 added to your main wallet instantly." },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffdf19] text-xs font-black text-[#241a05]">{s.step}</span>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <h3 className="text-sm font-black text-white">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#9ca3af]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Referral history */}
      {user && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <Users size={16} className="text-[#ffdf19]" /> Your Referrals
          </h2>
          <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
            <div className="divide-y divide-[#2a2c30]">
              {DEMO_REFERRALS.map((r) => (
                <div key={r.name} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-white">{r.name}</p>
                    <p className="text-[10px] text-[#6b7280]">{r.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#22c55e]">{r.bonus}</p>
                    <span className={`text-[10px] font-bold ${r.status === "Verified" ? "text-[#22c55e]" : "text-[#f59e0b]"}`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Terms */}
      <p className="text-center text-[10px] text-[#6b7280]">
        Referral bonuses credited after friend verifies identity and makes first deposit.{" "}
        <Link href="/bonus-terms" className="text-[#ffdf19] hover:underline">Full terms</Link>
      </p>
    </div>
  );
}
