import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROMOTIONS } from "@/lib/catalog";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const promo = PROMOTIONS.find((p) => p.id === id);
  if (!promo) return { title: "Promotion Not Found" };
  return { title: promo.title };
}

export default async function PromotionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const promo = PROMOTIONS.find((p) => p.id === id);
  if (!promo) notFound();

  const [c1, c2] = promo.gradient;

  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <Link href="/promotions" className="text-sm font-semibold text-[#22c55e] transition hover:text-[#00a86d]">
        ← Back to Promotions
      </Link>

      <div
        className="relative overflow-hidden rounded-2xl p-8"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.18), transparent 55%)" }}
        />
        <div className="relative flex flex-col items-start gap-4">
          <span className="inline-block rounded bg-black/25 px-3 py-1 text-xs font-bold text-white">
            {promo.badge}
          </span>
          <span className="text-6xl" style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.45))" }}>
            {promo.emoji}
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{promo.title}</h1>
          <p className="text-lg text-white/90">{promo.subtitle}</p>
        </div>
      </div>

      <div className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">About this promotion</h2>
        <div className="space-y-3 text-sm leading-relaxed text-[#9ca3af]">
          <p>
            {promo.title} — {promo.subtitle}. This exclusive offer is available to all BSL Gaming Bangladesh members.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Available to all registered BSL Gaming members.</li>
            <li>Minimum deposit may apply depending on the promotion.</li>
            <li>Bonus must be wagered before withdrawal.</li>
            <li>Limited time offer — claim now before it expires.</li>
            <li>Contact support if you have any questions about this promotion.</li>
          </ul>
        </div>
      </div>

      <button type="button" className="btn-primary w-full py-3 text-base font-semibold">
        Claim Now
      </button>
    </div>
  );
}
