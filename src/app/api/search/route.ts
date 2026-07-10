import { NextRequest, NextResponse } from "next/server";
import { ALL_GAMES, PROMOTIONS, PUBLIC_LINKS } from "@/lib/catalog";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase();
  const games = ALL_GAMES.filter((game) => !q || `${game.title} ${game.provider} ${game.category}`.toLowerCase().includes(q)).slice(0, 20);
  const promotions = PROMOTIONS.filter((promo) => !q || `${promo.title} ${promo.subtitle} ${promo.badge}`.toLowerCase().includes(q)).slice(0, 10);
  const links = PUBLIC_LINKS.filter((link) => !q || `${link.title} ${link.description}`.toLowerCase().includes(q)).slice(0, 10);
  return NextResponse.json({ status: "ok", query: q, results: { games, promotions, links } });
}
