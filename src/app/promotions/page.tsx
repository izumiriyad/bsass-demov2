import type { Metadata } from "next";
import Link from "next/link";
import { PROMOTIONS } from "@/lib/catalog";

export const metadata: Metadata = { title: "Promotions" };

export default function PromotionsPage() {
  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-xl">🎁</span>
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-2xl">
          Promotions
        </h1>
      </div>
      <p className="max-w-2xl text-sm text-[#9ca3af]">
        Exclusive bonuses and rewards for BSL Gaming members. Claim your bonus today and boost your winnings.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROMOTIONS.map((promo) => {
          const [c1, c2] = promo.gradient;
          return (
            <Link
              key={promo.id}
              href={`/promotions/${promo.id}`}
              className="relative overflow-hidden rounded-xl p-5 transition hover:opacity-95"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 55%)" }}
              />
              <div className="relative flex items-start justify-between">
                <div className="space-y-2">
                  <span className="inline-block rounded bg-black/25 px-2 py-0.5 text-[10px] font-bold text-white">
                    {promo.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white">{promo.title}</h3>
                  <p className="text-sm text-white/80">{promo.subtitle}</p>
                </div>
                <span className="text-4xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}>
                  {promo.emoji}
                </span>
              </div>
              <span className="relative mt-4 inline-block text-xs font-semibold text-white/90">
                View Details →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
