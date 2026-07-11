"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { PROMOTIONS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Welcome", "Deposit", "Sports", "Casino", "VIP", "Seasonal"];

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? PROMOTIONS
      : PROMOTIONS.filter((p) => p.badge?.toLowerCase().includes(activeTab.toLowerCase()) || p.title?.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1200] via-[#241800] to-[#1b1c1e] border border-[#ffdf19]/20 p-6">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#ffdf19]/10 blur-2xl" />
        <div className="absolute right-4 top-4 text-5xl opacity-20">🎁</div>
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19] mb-1">Exclusive Offers</p>
          <h1 className="text-2xl font-black text-white sm:text-3xl">Bonuses & Promotions</h1>
          <p className="mt-1.5 max-w-lg text-sm text-white/70">
            Double your money, earn cashback, and claim free spins. Updated daily with Bangladesh-exclusive deals.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-3 py-1 text-[#22c55e] font-bold">✓ Instant Bonus Credit</span>
            <span className="rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-[#3b82f6] font-bold">✓ bKash / Nagad Friendly</span>
            <span className="rounded-full border border-[#ffdf19]/30 bg-[#ffdf19]/10 px-3 py-1 text-[#ffdf19] font-bold">✓ No Hidden Terms</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-xs font-black transition whitespace-nowrap",
              activeTab === cat
                ? "bg-gradient-to-b from-[#ffdf19] to-[#f4a700] text-[#241a05] shadow-[0_2px_10px_rgba(255,223,25,0.25)]"
                : "border border-[#2a2c30] bg-[#1b1c1e] text-[#9ca3af] hover:border-[#ffdf19]/30 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Promo Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((promo) => {
          const [c1, c2] = promo.gradient;
          return (
            <Link
              key={promo.id}
              href={`/promotions/${promo.id}`}
              className="group relative overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            >
              {/* Shine overlay */}
              <div className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.18), transparent 55%)" }}
              />

              {/* Hot/New badge */}
              <div className="absolute left-3 top-3">
                <span className="inline-block rounded-full border border-white/25 bg-black/30 px-2.5 py-0.5 text-[9px] font-black uppercase text-white backdrop-blur-sm">
                  {promo.badge}
                </span>
              </div>

              <div className="relative p-5 pt-10">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-black leading-tight text-white sm:text-lg">{promo.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{promo.subtitle}</p>
                  </div>
                  <span className="text-4xl flex-shrink-0 drop-shadow-lg transition-transform group-hover:scale-110">
                    {promo.emoji}
                  </span>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex flex-wrap gap-3 text-[11px]">
                  {promo.minDeposit && (
                    <span className="flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-white">
                      💳 Min ৳{promo.minDeposit.toLocaleString()}
                    </span>
                  )}
                  {promo.wagering && (
                    <span className="flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-white">
                      🔄 {promo.wagering}x Wagering
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-white/90 underline-offset-2 group-hover:underline">
                    View Details →
                  </span>
                  <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider">
                    {promo.validity ?? "Limited Time"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-5xl mb-3">😔</span>
          <p className="text-sm font-bold text-[#9ca3af]">No promotions in this category right now.</p>
          <button onClick={() => setActiveTab("All")} className="mt-3 rounded-full bg-[#1b1c1e] border border-[#2a2c30] px-4 py-2 text-xs font-bold text-white hover:bg-[#242628] transition">
            Show All Promos
          </button>
        </div>
      )}

      {/* Promo notice */}
      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4 text-center">
        <p className="text-[11px] text-[#6b7280]">
          All promotions are subject to{" "}
          <Link href="/bonus-terms" className="text-[#ffdf19] hover:underline">Bonus Terms & Conditions</Link>.
          {" "}Wagering requirements apply. Responsible gaming: play within your means.
        </p>
      </div>
    </div>
  );
}
