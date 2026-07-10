import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const report = await req.json().catch(() => null);
  return NextResponse.json({ status: "accepted", type: "csp-report", received: Boolean(report) }, { status: 202 });
}
