import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "VIP Club" };

interface VipTier {
  name: string;
  emoji: string;
  threshold: string;
  cashback: string;
  perks: string[];
  gradient: [string, string];
}

const VIP_TIERS: VipTier[] = [
  {
    name: "Bronze",
    emoji: "🥉",
    threshold: "৳5,000",
    cashback: "0.5%",
    gradient: ["#7c2d12", "#9a3412"],
    perks: ["Daily login bonus", "Email support", "Basic promotions access"],
  },
  {
    name: "Silver",
    emoji: "🥈",
    threshold: "৳25,000",
    cashback: "1%",
    gradient: ["#475569", "#64748b"],
    perks: ["Weekly bonus", "Priority email support", "Exclusive promotions", "Birthday bonus"],
  },
  {
    name: "Gold",
    emoji: "🥇",
    threshold: "৳100,000",
    cashback: "2%",
    gradient: ["#713f12", "#d97706"],
    perks: ["Monthly bonus", "Live chat support", "Higher withdrawal limits", "Personal account manager", "Exclusive tournaments"],
  },
  {
    name: "Platinum",
    emoji: "💎",
    threshold: "৳500,000",
    cashback: "3%",
    gradient: ["#0c4a6e", "#0369a1"],
    perks: ["Weekly cashback", "24/7 VIP support", "Instant withdrawals", "Custom promotions", "VIP events access", "Dedicated VIP host"],
  },
  {
    name: "Diamond",
    emoji: "👑",
    threshold: "৳1,000,000",
    cashback: "5%",
    gradient: ["#2e1065", "#5b21b6"],
    perks: ["Daily cashback", "Personal VIP manager", "No withdrawal limits", "Exclusive luxury gifts", "Invitation to exclusive events", "Custom betting limits", "Premium 24/7 support"],
  },
];

export default function VipPage() {
  return (
    <div className="space-y-6 px-3 py-4 sm:px-5 sm:py-6">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-xl">👑</span>
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-2xl">
          VIP Club
        </h1>
      </div>
      <p className="max-w-2xl text-sm text-[#9ca3af]">
        Join the BSL Gaming VIP Club and unlock exclusive rewards, higher cashback, personal managers, and luxury perks. The more you play, the higher you climb.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {VIP_TIERS.map((tier, i) => {
          const [c1, c2] = tier.gradient;
          return (
            <div
              key={tier.name}
              className="relative overflow-hidden rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(to right, ${c1}, ${c2})` }}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{tier.emoji}</span>
                  <div>
                    <h2 className="text-lg font-bold text-[#f0f0f0]">{tier.name}</h2>
                    <p className="text-xs text-[#9ca3af]">Tier {i + 1}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-[#121315] p-2 text-center">
                  <p className="text-xs text-[#9ca3af]">Threshold</p>
                  <p className="text-sm font-bold text-[#ffdf19]">{tier.threshold}</p>
                </div>
                <div className="rounded-lg bg-[#121315] p-2 text-center">
                  <p className="text-xs text-[#9ca3af]">Cashback</p>
                  <p className="text-sm font-bold text-[#00a86d]">{tier.cashback}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                    <span className="text-[#00a86d]">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-[#ffdf19]/30 bg-gradient-to-r from-[#1b1c1e] via-[#242628] to-[#1b1c1e] p-5 text-center">
        <h2 className="text-base font-bold text-[#ffdf19]">Ready to join the VIP Club?</h2>
        <p className="mt-1 text-sm text-[#9ca3af]">
          Start playing today and climb the ranks to unlock exclusive rewards.
        </p>
        <Link href="/register" className="btn-primary mt-4 inline-block px-6 py-2.5 text-sm font-semibold">
          Join Now
        </Link>
      </div>
    </div>
  );
}
