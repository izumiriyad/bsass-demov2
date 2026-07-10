import { NextResponse } from "next/server";
import { ALL_GAMES, GAME_CATEGORIES, PROMOTIONS, PUBLIC_LINKS } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    navigation: {
      categories: GAME_CATEGORIES.map((cat) => ({ ...cat, href: `/${cat.id}` })),
      publicLinks: PUBLIC_LINKS,
      promotions: PROMOTIONS.map((promo) => ({ id: promo.id, title: promo.title, href: `/promotions/${promo.id}` })),
      gamesCount: ALL_GAMES.length,
    },
  });
}
