import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const metric = await req.json().catch(() => null);
  return NextResponse.json({ status: "accepted", metric: metric?.name ?? "unknown" }, { status: 202 });
}
