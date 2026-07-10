import Link from "next/link";
import { GameCard, FeatureCard, GameGrid } from "@/components/bsl/game-card";
import { HeroBanner } from "@/components/bsl/hero-banner";
import { WinnersTicker, JackpotTicker } from "@/components/bsl/tickers";
import { LiveWinners } from "@/components/bsl/live-winners";
import { CategoryTabs } from "@/components/bsl/category-tabs";
import { GameSection } from "@/components/bsl/game-section";
import { OddsButton } from "@/components/bsl/odds-button";
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
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <LiveWinners />
      
      <WinnersTicker />

      <HeroBanner />

      <SponsorStrip />

      <CategoryTabs />

      <NewMemberGuide />

      <EngagementSections />

      <GameSection
        title="Popular"
        emoji="⭐"
        games={POPULAR_GAMES}
        href="/popular"
        columns={10}
      />

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

      <AlliancePreview />

      <GameSection
        title="Slots"
        emoji="🎰"
        games={SLOTS_GAMES}
        href="/slots"
        columns={10}
      />

      <GameSection
        title="Casino"
        emoji="🃏"
        games={CASINO_GAMES}
        href="/casino"
        columns={10}
      />

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="section-title-bar" />
          <span className="text-lg">🏆</span>
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
            Tournaments
          </h2>
          <Link
            href="/vip"
            className="ml-auto text-xs font-semibold text-[#22c55e] transition hover:text-[#00a86d]"
          >
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <FeatureCard
            game={{
              id: "tournament-slots",
              title: "Slots Championship",
              provider: "৳5,000,000 Prize Pool",
              category: "popular",
              gradient: ["#2e1065", "#5b21b6"],
              emoji: "🎰",
              isFeatured: true,
            }}
          />
          <FeatureCard
            game={{
              id: "tournament-cricket",
              title: "Cricket Betting Cup",
              provider: "৳2,000,000 Prize Pool",
              category: "popular",
              gradient: ["#0c4a6e", "#1d4ed8"],
              emoji: "🏏",
              isFeatured: true,
            }}
          />
        </div>
      </section>

      <GameSection
        title="Crash"
        emoji="🚀"
        games={CRASH_GAMES}
        href="/crash"
        columns={10}
      />

      <GameSection
        title="Cockfighting"
        emoji="🐓"
        games={COCKFIGHTING_GAMES}
        href="/cockfighting"
        columns={10}
      />

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="section-title-bar" />
          <span className="text-lg">🎁</span>
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
            Promotions
          </h2>
          <Link
            href="/promotions"
            className="ml-auto text-xs font-semibold text-[#22c55e] transition hover:text-[#00a86d]"
          >
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PROMOTIONS.map((promo) => {
            const [c1, c2] = promo.gradient;
            return (
              <Link
                key={promo.id}
                href="/promotions"
                className="relative overflow-hidden rounded-xl p-4 transition hover:opacity-95"
                style={{
                  background: `linear-gradient(135deg, ${c1}, ${c2})`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 55%)",
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="inline-block rounded bg-black/25 px-2 py-0.5 text-[10px] font-bold text-white">
                      {promo.badge}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {promo.title}
                    </h3>
                    <p className="text-xs text-white/80">{promo.subtitle}</p>
                  </div>
                  <span
                    className="text-3xl"
                    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}
                  >
                    {promo.emoji}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="section-title-bar" />
          <span className="text-lg">⚽</span>
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
            Sportsbook
          </h2>
          <Link
            href="/sports"
            className="ml-auto text-xs font-semibold text-[#22c55e] transition hover:text-[#00a86d]"
          >
            See All →
          </Link>
        </div>
        <div className="space-y-2">
          {SPORTS_EVENTS.map((event) => (
            <div
              key={event.id}
              className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] p-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold text-[#9ca3af]">
                  {event.league}
                </span>
                {event.status === "live" ? (
                  <span className="flex items-center gap-1 rounded bg-[#ef4444]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#ef4444]">
                    <span className="live-dot live-dot-pulse" style={{ background: "#ef4444" }} />
                    LIVE {event.minute}
                  </span>
                ) : (
                  <span className="rounded bg-[#2a2c30] px-1.5 py-0.5 text-[10px] font-bold text-[#9ca3af]">
                    UPCOMING
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#f0f0f0]">
                    {event.team1}
                  </p>
                  <p className="truncate text-sm font-semibold text-[#f0f0f0]">
                    {event.team2}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  {event.odds.map((odd, i) => (
                    <OddsButton
                      key={i}
                      label={i === 0 ? "1" : i === 1 ? "X" : "2"}
                      odd={odd}
                      event={`${event.team1} vs ${event.team2}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <JackpotTicker />

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="section-title-bar" />
          <span className="text-lg">🏢</span>
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
            Providers
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="flex items-center gap-2 rounded-lg border border-[#2a2c30] bg-[#1b1c1e] p-3 transition hover:border-[#383b3f]"
            >
              <span className="text-2xl">{provider.emoji}</span>
              <span className="truncate text-xs font-bold text-[#f0f0f0]">
                {provider.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] p-4 text-center">
        <p className="text-xs text-[#9ca3af]">
          <span className="font-bold text-[#ffdf19]">{SITE.shortName}</span> is
          committed to responsible gaming. Play responsibly. 18+ only. If you
          need help, contact{" "}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-[#22c55e] underline hover:text-[#00a86d]"
          >
            {SITE.supportEmail}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
