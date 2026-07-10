"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { GameCard, FeatureCard } from "@/components/bsl/game-card";
import { HeroBanner } from "@/components/bsl/hero-banner";
import { WinnersTicker, JackpotTicker, NewsMarquee } from "@/components/bsl/tickers";
import { CategoryTabs } from "@/components/bsl/category-tabs";
import { GameSection } from "@/components/bsl/game-section";
import { ExchangeSimulator } from "@/components/bsl/exchange-simulator";
import { NewMemberGuide, SponsorStrip } from "@/components/bsl/trust-sections";
import { EngagementSections } from "@/components/bsl/engagement-sections";
import {
  SITE,
  POPULAR_GAMES,
  SLOTS_GAMES,
  CASINO_GAMES,
  CRASH_GAMES,
  FEATURED_GAMES,
  PROVIDERS,
} from "@/lib/catalog";

/* ─── Live Sports Mini Strip ─── */
const LIVE_MINI = [
  { flag: "🏏", league: "BPL 2025", match: "Dhaka vs Rangpur", score: "142/6 – 98/3", time: "14.2 Ov", status: "LIVE" },
  { flag: "⚽", league: "EPL", match: "Man City vs Arsenal", score: "2 – 1", time: "67'", status: "LIVE" },
  { flag: "🏏", league: "IPL 2025", match: "Mumbai vs CSK", score: "Today 7:30 PM", time: "", status: "SOON" },
  { flag: "⚽", league: "La Liga", match: "Real Madrid vs Barca", score: "1 – 1", time: "78'", status: "LIVE" },
  { flag: "🎾", league: "Wimbledon", match: "Djokovic vs Alcaraz", score: "6-3, 4-6", time: "Set 3", status: "LIVE" },
];

/* ─── Promotions Strip ─── */
const PROMOS = [
  { id: "welcome", title: "100% Welcome Bonus", sub: "স্বাগত বোনাস", detail: "Up to ৳10,000 on first deposit", badge: "NEW", emoji: "🎁", color: "#22c55e", href: "/promotions" },
  { id: "reload", title: "Daily Reload 15%", sub: "ডেইলি রিলোড", detail: "Every deposit earns 15% bonus", badge: "HOT", emoji: "🔁", color: "#f59e0b", href: "/promotions" },
  { id: "cashback", title: "Weekly Cashback 10%", sub: "সাপ্তাহিক ক্যাশব্যাক", detail: "Get back 10% of net losses", badge: "", emoji: "💸", color: "#3b82f6", href: "/cashback" },
  { id: "referral", title: "Refer & Earn ৳500", sub: "রেফার করুন", detail: "Per friend who deposits", badge: "", emoji: "🤝", color: "#a855f7", href: "/referral" },
];

function LiveSportsMini() {
  const { user } = useAuth();
  const { openModal } = useModal();

  return (
    <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2a2c30] bg-[#121315] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#ef4444] animate-pulse shadow-[0_0_6px_#ef4444]" />
          <span className="text-xs font-black uppercase tracking-wider text-[#f0f0f0]">Live & Upcoming</span>
          <span className="rounded-full bg-[#ef4444]/15 px-2 py-0.5 text-[9px] font-black text-[#ef4444]">
            {LIVE_MINI.filter(m => m.status === "LIVE").length} LIVE
          </span>
        </div>
        <Link href="/sports" className="text-[11px] font-bold text-[#ffdf19] hover:underline">
          All Sports →
        </Link>
      </div>

      {/* Matches */}
      <div className="no-scrollbar flex gap-0 overflow-x-auto divide-x divide-[#2a2c30]">
        {LIVE_MINI.map((m, i) => (
          <button
            key={i}
            onClick={() => user ? openModal("deposit") : openModal("login")}
            className="flex min-w-[160px] flex-col gap-1 px-4 py-3 text-left transition hover:bg-white/5 active:scale-[.98] flex-shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{m.flag}</span>
              <span className="text-[9px] font-bold text-[#6b7280] uppercase tracking-wider truncate">{m.league}</span>
              {m.status === "LIVE" ? (
                <span className="ml-auto shrink-0 rounded-full bg-[#ef4444] px-1.5 py-0.5 text-[8px] font-black text-white animate-pulse">LIVE</span>
              ) : (
                <span className="ml-auto shrink-0 rounded-full bg-[#1d4ed8]/30 px-1.5 py-0.5 text-[8px] font-black text-[#60a5fa]">SOON</span>
              )}
            </div>
            <p className="text-[11px] font-black text-white truncate">{m.match}</p>
            <p className="text-[10px] font-semibold text-[#ffdf19]">{m.score}</p>
            {m.time && <p className="text-[9px] text-[#6b7280]">{m.time}</p>}
          </button>
        ))}
      </div>
    </section>
  );
}

function PromoStrip() {
  const { user } = useAuth();
  const { openModal } = useModal();

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-lg">🎁</span>
        <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
          Hot Promotions <span className="ml-1 text-xs font-semibold text-[#9ca3af]">প্রোমোশন</span>
        </h2>
        <Link href="/promotions" className="ml-auto text-xs font-semibold text-[#ffdf19] hover:underline">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PROMOS.map((promo) => (
          <button
            key={promo.id}
            onClick={() => user ? openModal("deposit") : openModal("login")}
            className="group relative overflow-hidden rounded-2xl border border-[#2a2c30] bg-gradient-to-br from-[#1b1c1e] to-[#121315] p-4 text-left transition-all hover:-translate-y-1 hover:border-[#ffdf19]/40 hover:shadow-[0_4px_20px_rgba(255,223,25,0.1)] active:scale-95"
          >
            {/* Glow bg */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: `radial-gradient(ellipse at top left, ${promo.color}15, transparent 60%)` }}
            />
            {/* Badge */}
            {promo.badge && (
              <span
                className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-black text-white"
                style={{ background: promo.badge === "HOT" ? "#ef4444" : "#22c55e" }}
              >
                {promo.badge}
              </span>
            )}
            <span className="text-3xl" style={{ filter: `drop-shadow(0 0 8px ${promo.color}55)` }}>
              {promo.emoji}
            </span>
            <p className="mt-2 text-xs font-black text-white leading-tight">{promo.title}</p>
            <p className="text-[9px] font-semibold text-[#9ca3af] mt-0.5">{promo.sub}</p>
            <p className="mt-2 text-[10px] leading-relaxed text-[#9ca3af]">{promo.detail}</p>
            <div
              className="mt-3 rounded-full px-3 py-1.5 text-[10px] font-black text-center"
              style={{ background: `${promo.color}20`, color: promo.color }}
            >
              Claim Now →
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ─── Payment Methods strip ─── */
function PaymentStrip() {
  return (
    <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af]">Accepted Payments</p>
          <p className="mt-1 text-sm font-black text-white">Fast & Secure BD Transactions</p>
          <p className="mt-0.5 text-[10px] text-[#6b7280]">Instant deposits via local payment apps. Same-day withdrawals.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "bKash", bg: "#e2136e", text: "bKash" },
            { name: "Nagad", bg: "linear-gradient(90deg,#ec1c24,#f47b20)", text: "NAGAD" },
            { name: "Rocket", bg: "#8c1566", text: "Rocket" },
            { name: "Upay", bg: "#0070ba", text: "UPAY" },
            { name: "Bank", bg: "#1d4ed8", text: "Bank TT" },
          ].map((p) => (
            <div
              key={p.name}
              className="flex h-8 items-center justify-center rounded-md px-3 text-[10px] font-black text-white shadow-md"
              style={{ background: p.bg }}
            >
              {p.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Providers Section ─── */
function ProvidersSection() {
  const { user } = useAuth();
  const { openModal } = useModal();

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-lg">🏢</span>
        <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
          Top Game Providers
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {PROVIDERS.map((provider) => (
          <button
            key={provider.name}
            onClick={() => user ? openModal("deposit") : openModal("login")}
            className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#1b1c1e] to-[#121315] p-4 border border-[#2a2c30] transition-all hover:border-[#ffdf19]/50 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,223,25,0.12)] active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#ffdf19]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="text-3xl transition-transform duration-200 group-hover:scale-110" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}>
              {provider.emoji}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#9ca3af] group-hover:text-white transition-colors text-center leading-tight">
              {provider.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ─── Main Homepage ─── */
export default function HomePage() {
  return (
    <div className="space-y-4 pb-24 sm:space-y-5">

      {/* 1. News Marquee */}
      <div className="px-3 pt-3 sm:px-5 sm:pt-4">
        <NewsMarquee />
      </div>

      {/* 2. Hero Banner */}
      <div className="px-3 sm:px-5">
        <HeroBanner />
      </div>

      {/* 3. Live Winners Ticker */}
      <div className="px-3 sm:px-5">
        <WinnersTicker />
      </div>

      {/* 4. Sponsor Partners strip */}
      <div className="px-3 sm:px-5">
        <SponsorStrip />
      </div>

      {/* 5. Category Navigation Tabs */}
      <div className="px-3 sm:px-5">
        <CategoryTabs />
      </div>

      {/* 6. Live Sports Mini Strip */}
      <div className="px-3 sm:px-5">
        <LiveSportsMini />
      </div>

      {/* 7. Live Exchange */}
      <div className="px-3 sm:px-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="section-title-bar" />
          <span className="text-lg">⚡</span>
          <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
            Live Betting Exchange
          </h2>
          <Link href="/exchange" className="ml-auto text-xs font-semibold text-[#ffdf19] hover:underline">
            Full Exchange →
          </Link>
        </div>
        <ExchangeSimulator />
      </div>

      {/* 8. Promotions */}
      <div className="px-3 sm:px-5">
        <PromoStrip />
      </div>

      {/* 9. New Member Guide */}
      <div className="px-3 sm:px-5">
        <NewMemberGuide />
      </div>

      {/* 10. Engagement: Red Envelope + Check-in + Winners */}
      <div className="px-3 sm:px-5">
        <EngagementSections />
      </div>

      {/* 11. Popular Games */}
      <div className="px-3 sm:px-5">
        <GameSection title="Popular" emoji="⭐" games={POPULAR_GAMES} href="/popular" columns={10} />
      </div>

      {/* 12. Featured Games */}
      <div className="px-3 sm:px-5">
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="section-title-bar" />
              <span className="text-lg">🔥</span>
              <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
                Featured Games
              </h2>
            </div>
            <Link href="/popular" className="shrink-0 text-xs font-semibold text-[#22c55e] hover:underline">See All →</Link>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {FEATURED_GAMES.map((game) => (
              <FeatureCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </div>

      {/* 13. Slots */}
      <div className="px-3 sm:px-5">
        <GameSection title="Slots" emoji="🎰" games={SLOTS_GAMES} href="/slots" columns={10} />
      </div>

      {/* 14. Casino */}
      <div className="px-3 sm:px-5">
        <GameSection title="Casino" emoji="♠️" games={CASINO_GAMES} href="/casino" columns={10} />
      </div>

      {/* 15. Crash */}
      <div className="px-3 sm:px-5">
        <GameSection title="Crash" emoji="🚀" games={CRASH_GAMES} href="/crash" columns={10} />
      </div>

      {/* 16. Providers */}
      <div className="px-3 sm:px-5">
        <ProvidersSection />
      </div>

      {/* 17. Jackpot Ticker */}
      <div className="px-3 sm:px-5">
        <JackpotTicker />
      </div>

      {/* 18. Payment Methods */}
      <div className="px-3 sm:px-5">
        <PaymentStrip />
      </div>

      {/* 19. Trust / Responsible Gaming */}
      <div className="px-3 sm:px-5">
        <section className="rounded-xl border border-[#2a2c30] bg-[#121315] p-5">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <span className="text-4xl flex-shrink-0">🛡️</span>
            <div>
              <p className="text-xs font-black uppercase text-[#ffdf19] tracking-widest">Responsible Gaming</p>
              <p className="mt-1 text-xs text-[#9ca3af] leading-relaxed max-w-2xl">
                <span className="font-bold text-[#ffdf19]">{SITE.shortName}</span> is committed to responsible gaming. Play responsibly. 18+ only.
                Use our self-exclusion and deposit limit tools. Need help? Contact{" "}
                <a href={`mailto:${SITE.supportEmail}`} className="text-[#ffdf19] hover:underline">{SITE.supportEmail}</a>
              </p>
            </div>
            <div className="flex gap-2 sm:ml-auto flex-shrink-0">
              <Link href="/responsible-gaming" className="rounded-lg bg-[#1b1c1e] border border-[#2a2c30] px-3 py-1.5 text-[10px] font-black text-[#9ca3af] hover:text-white transition">
                Set Limits
              </Link>
              <Link href="/self-assessment" className="rounded-lg bg-[#1b1c1e] border border-[#2a2c30] px-3 py-1.5 text-[10px] font-black text-[#9ca3af] hover:text-white transition">
                Self-Assess
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
