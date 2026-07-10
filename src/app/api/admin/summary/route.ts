import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json({
    status: "ok",
    summary: {
      activeUsers: 12840,
      pendingKyc: 218,
      depositsToday: 4280000,
      openIncidents: 0,
      currency: "BDT",
    },
  });
}
