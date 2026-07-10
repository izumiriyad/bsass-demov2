import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const event = await req.json().catch(() => null);
  return NextResponse.json({ status: "accepted", type: event?.type ?? "unknown" }, { status: 202 });
}
