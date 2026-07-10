import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    defaults: {
      dailyDepositLimit: 20000,
      weeklyLossLimit: 35000,
      sessionReminderMinutes: 60,
      currency: "BDT",
    },
  });
}
