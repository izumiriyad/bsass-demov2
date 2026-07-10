import { NextResponse } from "next/server";
import { SPORTS_EVENTS } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    updatedAt: new Date().toISOString(),
    currency: "BDT",
    events: SPORTS_EVENTS,
  });
}
