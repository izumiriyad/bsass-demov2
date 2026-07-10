import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_GAMES, GAME_CATEGORIES } from "@/lib/catalog";
import { getSessionUser } from "@/lib/auth";
import { GameGrid } from "@/components/bsl/game-card";
import { GameActionPanel } from "@/components/bsl/game-action-panel";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const game = ALL_GAMES.find((g) => g.id === id);
  if (!game) return { title: "Game Not Found" };
  return { title: game.title };
}

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = ALL_GAMES.find((g) => g.id === id);
  if (!game) notFound();

  const user = await getSessionUser();
  const [c1, c2] = game.gradient;
  const category = GAME_CATEGORIES.find((cat) => cat.id === game.category);
  const related = ALL_GAMES.filter((g) => g.category === game.category && g.id !== game.id).slice(0, 6);

  return (
    <div className="space-y-6 px-3 py-4 sm:px-5 sm:py-6">
      <Link href={`/${game.category}`} className="text-sm font-semibold text-[#22c55e] transition hover:text-[#00a86d]">
        ← Back to {category?.label ?? "Games"}
      </Link>

      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-xl"
          style={{ background: `linear-gradient(150deg, ${c1}, ${c2})` }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.18), transparent 55%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl" style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.55))" }}>
              {game.emoji}
            </span>
          </div>
          {game.isHot && (
            <span className="absolute left-3 top-3 rounded bg-[#ef4444] px-2 py-0.5 text-xs font-bold text-white">
              🔥 HOT
            </span>
          )}
          {game.isNew && !game.isHot && (
            <span className="absolute left-3 top-3 rounded bg-[#22c55e] px-2 py-0.5 text-xs font-bold text-white">
              NEW
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="inline-block rounded bg-[#2a2c30] px-2 py-0.5 text-xs font-semibold text-[#9ca3af]">
              {category?.label ?? game.category}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-[#f0f0f0] sm:text-3xl">{game.title}</h1>
            <p className="text-sm text-[#9ca3af]">by {game.provider}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] p-3 text-center">
              <p className="text-xs text-[#9ca3af]">Players</p>
              <p className="text-sm font-bold text-[#f0f0f0]">
                {typeof game.players === "number" ? new Intl.NumberFormat("en-BD").format(game.players) : "—"}
              </p>
            </div>
            <div className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] p-3 text-center">
              <p className="text-xs text-[#9ca3af]">Category</p>
              <p className="text-sm font-bold text-[#f0f0f0]">{category?.label ?? game.category}</p>
            </div>
            <div className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] p-3 text-center">
              <p className="text-xs text-[#9ca3af]">Provider</p>
              <p className="text-sm font-bold text-[#f0f0f0]">{game.provider}</p>
            </div>
          </div>

          <GameActionPanel game={game} isAuthenticated={Boolean(user)} />

          <div className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] p-4">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">About {game.title}</h2>
            <p className="text-sm leading-relaxed text-[#9ca3af]">
              {game.title} by {game.provider} is one of the most popular {category?.label.toLowerCase() ?? "games"} games on BSL Gaming Bangladesh. Enjoy smooth gameplay, exciting features, and the chance to win big in BDT. Join thousands of players across Bangladesh already enjoying this title.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="section-title-bar" />
            <span className="text-lg">🎯</span>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">
              Related Games
            </h2>
          </div>
          <GameGrid games={related} columns={7} />
        </section>
      )}
    </div>
  );
}
