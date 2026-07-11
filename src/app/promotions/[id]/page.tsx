"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { PROMOTIONS } from "@/lib/catalog";
import { CheckCircle2, Clock, Shield, ChevronLeft } from "lucide-react";
import { use } from "react";

const PROMO_DETAILS: Record<string, {
  description: string;
  minDeposit: string;
  maxBonus: string;
  wagering: string;
  validity: string;
  steps: string[];
  terms: string[];
}> = {
  "welcome-bonus": {
    description: "BSL Gaming's flagship 100% Welcome Bonus doubles your first deposit instantly — up to ৳10,000 free credit. One of the most generous BD betting welcome offers available.",
    minDeposit: "৳500",
    maxBonus: "৳10,000",
    wagering: "10x on Sports / 25x on Casino",
    validity: "7 days after credit",
    steps: [
      "Register a new BSL Gaming account with your BD mobile number",
      "Make your first deposit of at least ৳500 via bKash, Nagad, or Rocket",
      "The 100% bonus is automatically credited within 5 minutes",
      "Wager the bonus amount to meet requirements, then withdraw!",
    ],
    terms: [
      "New accounts only. One bonus per person/IP/device.",
      "Minimum deposit: ৳500. Maximum bonus: ৳10,000.",
      "Wagering: 10x on Sports, 25x on Casino.",
      "Bonus expires in 7 days if wagering not met.",
      "Cricket and Sports bets at odds 1.75+ count towards wagering.",
      "BSL Gaming reserves the right to void bonuses in case of abuse.",
    ],
  },
  "reload-bonus": {
    description: "Earn 15% extra on every single deposit you make, every day. The Daily Reload Bonus is our way of rewarding loyal BSL members. No limits on how many times you can claim.",
    minDeposit: "৳500",
    maxBonus: "৳5,000/day",
    wagering: "5x on Sports",
    validity: "24 hours after credit",
    steps: [
      "Login to your BSL Gaming account",
      "Go to Promotions and click 'Claim Reload Bonus'",
      "Make a deposit of ৳500 or more",
      "15% bonus is credited automatically within 5 minutes",
    ],
    terms: [
      "Minimum deposit: ৳500. Maximum bonus per day: ৳5,000.",
      "Wagering requirement: 5x on Sports bets only.",
      "Cannot be combined with other active bonuses.",
      "One reload claim per account per day.",
      "Odds must be 1.70+ for wagering to count.",
    ],
  },
  "cashback": {
    description: "Get back a percentage of your net weekly losses automatically. VIP tiers earn between 5%–15% cashback credited every Monday.",
    minDeposit: "৳500",
    maxBonus: "Unlimited for Diamond VIP",
    wagering: "No wagering! Withdraw anytime.",
    validity: "Credited every Monday",
    steps: [
      "Simply play any game during the week",
      "If you have net losses, cashback is automatically calculated",
      "Credited every Monday by 12:00 PM BDT",
      "Cashback is real money — no wagering requirements",
    ],
    terms: [
      "Standard: 5% · Silver VIP: 8% · Gold VIP: 10% · Diamond VIP: 15%.",
      "Based on net losses (deposits minus withdrawals minus wins).",
      "No wagering requirement on cashback funds.",
      "Minimum qualifying loss: ৳1,000 per week.",
    ],
  },
};

export default function PromotionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const { openModal } = useModal();
  const router = useRouter();

  const promo = PROMOTIONS.find((p) => p.id === id);
  if (!promo) notFound();

  const details = PROMO_DETAILS[id] || {
    description: `${promo.title} — ${promo.subtitle}. This exclusive offer is available to all BSL Gaming Bangladesh members.`,
    minDeposit: "৳500",
    maxBonus: "Varies",
    wagering: "See terms below",
    validity: "Limited time",
    steps: [
      "Login or register your BSL Gaming account",
      "Visit the Promotions page and select this offer",
      "Complete the required deposit or action",
      "Bonus is credited automatically",
    ],
    terms: [
      "Available to all registered BSL Gaming members.",
      "Minimum deposit may apply.",
      "Bonus must be wagered before withdrawal.",
      "Limited time offer — claim before it expires.",
      "Contact support if you have any questions.",
    ],
  };

  const handleClaim = () => {
    if (!user) { openModal("login"); return; }
    openModal("deposit");
    toast.success("Opening deposit to claim your bonus! 🎁");
  };

  const [c1, c2] = promo.gradient;

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Back */}
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-bold text-[#9ca3af] hover:text-white transition">
        <ChevronLeft size={16} /> Back to Promotions
      </button>

      {/* Hero */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
        style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 75% 30%, rgba(255,255,255,0.2), transparent 50%)" }} />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {promo.badge && (
              <span className="inline-block rounded-full bg-black/30 px-3 py-1 text-[10px] font-black text-white mb-3">{promo.badge}</span>
            )}
            <h1 className="text-2xl font-black text-white sm:text-4xl">{promo.title}</h1>
            <p className="mt-1 text-white/80 text-base font-semibold">{promo.subtitle}</p>
          </div>
          <span className="text-6xl sm:text-8xl drop-shadow-2xl" style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))" }}>
            {promo.emoji}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Min. Deposit", val: details.minDeposit, icon: "💳" },
          { label: "Max Bonus", val: details.maxBonus, icon: "🎁" },
          { label: "Wagering", val: details.wagering, icon: "🎯" },
          { label: "Validity", val: details.validity, icon: "⏰" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
            <p className="text-xl">{s.icon}</p>
            <p className="mt-1.5 text-sm font-black text-white leading-tight">{s.val}</p>
            <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="text-sm font-black text-white mb-3">About This Promotion</h2>
        <p className="text-sm text-[#9ca3af] leading-relaxed">{details.description}</p>
      </div>

      {/* Steps */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="text-sm font-black text-white mb-4">How to Claim</h2>
        <div className="space-y-3">
          {details.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffdf19] text-[10px] font-black text-[#241a05] mt-0.5">{i + 1}</div>
              <p className="text-sm text-[#9ca3af] leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleClaim}
        className="w-full rounded-2xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-4 text-base font-black text-[#241a05] border-b-[4px] border-[#c28400] transition hover:brightness-110 active:scale-[.98] shadow-[0_4px_20px_rgba(255,223,25,0.35)]"
      >
        {user ? "💰 Claim Bonus Now" : "🔐 Login to Claim"}
      </button>

      {/* Terms */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#121315] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className="text-[#9ca3af]" />
          <h2 className="text-xs font-black uppercase tracking-widest text-[#9ca3af]">Terms & Conditions</h2>
        </div>
        <div className="space-y-2">
          {details.terms.map((t, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#6b7280]">
              <span className="text-[#ffdf19] mt-0.5 flex-shrink-0">•</span>
              {t}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-[#4b5563]">
          Full terms: <Link href="/bonus-terms" className="text-[#ffdf19] hover:underline">bonus-terms</Link>
        </p>
      </div>

      {/* Other promos */}
      <div>
        <h2 className="mb-3 text-sm font-black text-white">More Promotions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PROMOTIONS.filter((p) => p.id !== id).slice(0, 4).map((p) => (
            <Link
              key={p.id}
              href={`/promotions/${p.id}`}
              className="relative overflow-hidden rounded-xl p-4 transition hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1), transparent 55%)" }} />
              <p className="relative text-2xl">{p.emoji}</p>
              <p className="relative mt-2 text-xs font-black text-white leading-tight">{p.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
