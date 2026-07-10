import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

const favoritesStore = new Map<string, Set<string>>();

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = favoritesStore.get(user.id) ?? new Set<string>();
  return NextResponse.json({ favorites: Array.from(favorites) });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { gameId } = (await request.json()) as { gameId?: string };
    if (!gameId) {
      return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
    }

    let favorites = favoritesStore.get(user.id);
    if (!favorites) {
      favorites = new Set<string>();
      favoritesStore.set(user.id, favorites);
    }

    if (favorites.has(gameId)) {
      favorites.delete(gameId);
    } else {
      favorites.add(gameId);
    }

    return NextResponse.json({ favorites: Array.from(favorites) });
  } catch {
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 });
  }
}
