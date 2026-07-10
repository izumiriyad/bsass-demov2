import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ready",
    service: "bsl-gaming-frontend",
    checks: { app: "ok", routes: "ok", staticAssets: "ok" },
    timestamp: new Date().toISOString(),
  });
}
