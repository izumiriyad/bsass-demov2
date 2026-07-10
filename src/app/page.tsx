import Link from "next/link";
import { GameCard, FeatureCard, GameGrid } from "@/components/bsl/game-card";
import { HeroBanner } from "@/components/bsl/hero-banner";
import { WinnersTicker, JackpotTicker, NewsMarquee } from "@/components/bsl/tickers";
import { LiveWinners } from "@/components/bsl/live-winners";
import { CategoryTabs } from "@/components/bsl/category-tabs";
import { GameSection } from "@/components/bsl/game-section";
import { OddsButton } from "@/components/bsl/odds-button";
import { ExchangeSimulator } from "@/components/bsl/exchange-simulator";
import { AlliancePreview, NewMemberGuide, SponsorStrip } from "@/components/bsl/trust-sections";
import { EngagementSections } from "@/components/bsl/engagement-sections";
import {
  SITE,
  POPULAR_GAMES,
  SLOTS_GAMES,
  CASINO_GAMES,
  CRASH_GAMES,
  COCKFIGHTING_GAMES,
  FEATURED_GAMES,
  SPORTS_EVENTS,
  PROMOTIONS,
  PROVIDERS,
} from "@/lib/catalog";

export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-6 pb-20">
      {/* 1. News Marquee & Global Tickers */}
      <div className="px-3 pt-3 sm:px-5 sm:pt-4">
        <NewsMarquee />
      </div>

      <div className="px-3 sm:px-5">
        <HeroBanner />
      </div>

      <div className="px-3 sm:px-5">
        <WinnersTicker />
      </div>

      <div className="px-3 sm:px-5">
        <SponsorStrip />
      </div>

      <div className="px-3 sm:px-5">
        <CategoryTabs />
      </div>

      {/* 2. Core Exchange Engine (Moved to Homepage for instant conversion) */}
      <div className="px-3 sm:px-5 space-y-3 mt-4">
        <div className="flex items-center gap-2">
          <span className="section-title-bar" />
          <span className="text-lg">⚡</span>
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
            Live Exchange
          </h2>
          <Link href="/exchange" className="ml-auto text-xs font-semibold text-[#ffdf19] hover:underline">
            Go to Exchange →
          </Link>
        </div>
        <ExchangeSimulator />
      </div>

      <div className="px-3 sm:px-5 mt-6">
        <NewMemberGuide />
      </div>

      <div className="px-3 sm:px-5">
        <EngagementSections />
      </div>

      <div className="px-3 sm:px-5">
        <GameSection
          title="Popular"
          emoji="⭐"
          games={POPULAR_GAMES}
          href="/popular"
          columns={10}
        />
      </div>

      <div className="px-3 sm:px-5">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="section-title-bar" />
            <span className="text-lg">🔥</span>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
              Featured Games
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {FEATURED_GAMES.map((game) => (
              <FeatureCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </div>

      <div className="px-3 sm:px-5">
        <AlliancePreview />
      </div>

      <div className="px-3 sm:px-5">
        <GameSection
          title="Slots"
          emoji="🎰"
          games={SLOTS_GAMES}
          href="/slots"
          columns={10}
        />
      </div>

      <div className="px-3 sm:px-5">
        <GameSection
          title="Casino"
          emoji="🃏"
          games={CASINO_GAMES}
          href="/casino"
          columns={10}
        />
      </div>

      <div className="px-3 sm:px-5">
        <GameSection
          title="Crash"
          emoji="🚀"
          games={CRASH_GAMES}
          href="/crash"
          columns={10}
        />
      </div>

      {/* 3. Providers Premium Grid */}
      <div className="px-3 sm:px-5">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="section-title-bar" />
            <span className="text-lg">🏢</span>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
              Top Providers
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PROVIDERS.map((provider) => (
              <div
                key={provider.name}
                className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#1b1c1e] to-[#121315] p-5 shadow-lg border border-[#2a2c30] transition-all hover:border-[#ffdf19] hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,223,25,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#ffdf19]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="text-4xl filter drop-shadow-md transition-transform group-hover:scale-110">{provider.emoji}</span>
                <span className="mt-1 truncate text-[11px] font-black uppercase tracking-wider text-[#9ca3af] group-hover:text-white transition-colors">
                  {provider.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-3 sm:px-5">
        <JackpotTicker />
      </div>

      <div className="px-3 sm:px-5">
        <section className="rounded-xl border border-[#2a2c30] bg-[#121315] p-5 text-center">
          <p className="text-xs text-[#9ca3af] leading-relaxed">
            <span className="font-bold text-[#ffdf19]">{SITE.shortName}</span> is
            committed to responsible gaming. Play responsibly. 18+ only. If you
            need help, contact{" "}
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="text-[#ffdf19] hover:underline"
            >
              {SITE.supportEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
