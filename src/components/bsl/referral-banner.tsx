"use client";

import Link from "next/link";
import { useModal } from "@/components/providers/modal-provider";
import { useAuth } from "@/components/providers/auth-provider";

const TIERS = [
  { level: "Level 1", label: "Direct Referral", reward: "৳200", desc: "Per friend who deposits ৳500+", color: "#ffdf19", bg: "#1c1400" },
  { level: "Level 2", label: "Friend's Friend", reward: "৳100", desc: "When your friend refers someone", color: "#f97316", bg: "#1a0800" },
  { level: "Level 3", label: "3rd Layer", reward: "৳50", desc: "3rd-level network earnings", color: "#a855f7", bg: "#0f0015" },
];

export function ReferralBanner() {
  const { user } = useAuth();
  const { openModal } = useModal();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#2a2c30] bg-gradient-to-br from-[#0f1012] to-[#1b1c1e] p-5 sm:p-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,223,25,0.07),transparent_50%)]" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19] mb-1">
              3-Level Referral Program
            </p>
            <h2 className="text-xl font-black text-white sm:text-2xl">
              Earn Up to <span className="text-[#ffdf19]">৳350</span> Per Signup
            </h2>
            <p className="mt-1 text-xs text-[#9ca3af]">
              রেফার করুন, উপার্জন করুন — Invite friends &amp; earn from 3 levels deep
            </p>
          </div>
          <div className="mt-3 sm:mt-0 flex gap-2">
            {user ? (
              <Link
                href="/referral"
                className="rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-5 py-2.5 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110 active:scale-[.98]"
              >
                My Referral Link →
              </Link>
            ) : (
              <button
                onClick={() => openModal("register")}
                className="rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-5 py-2.5 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110 active:scale-[.98]"
              >
                Join &amp; Refer Now →
              </button>
            )}
          </div>
        </div>

        {/* 3 Tier cards */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {TIERS.map((tier) => (
            <div
              key={tier.level}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-[#2a2c30] p-3 text-center"
              style={{ background: tier.bg, borderColor: `${tier.color}20` }}
            >
              <span className="text-[9px] font-black uppercase tracking-wide" style={{ color: tier.color }}>
                {tier.level}
              </span>
              <p className="text-base font-black sm:text-lg" style={{ color: tier.color }}>{tier.reward}</p>
              <p className="text-[9px] font-bold text-white leading-tight">{tier.label}</p>
              <p className="text-[8px] text-[#6b7280] leading-relaxed">{tier.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[#2a2c30] pt-3">
          {[
            { v: "31,042+", l: "Active Referrers" },
            { v: "৳2.1 কোটি", l: "Paid Out This Month" },
            { v: "No Limit", l: "Max Earnings" },
            { v: "Instant", l: "Referral Credit" },
          ].map((s) => (
            <div key={s.l} className="text-center sm:text-left">
              <p className="text-sm font-black text-[#ffdf19]">{s.v}</p>
              <p className="text-[9px] font-bold uppercase tracking-wide text-[#6b7280]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
