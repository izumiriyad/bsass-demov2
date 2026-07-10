import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    tickets: [
      { id: "TCK-1001", subject: "bKash deposit pending", state: "open", priority: "high" },
      { id: "TCK-1002", subject: "KYC document review", state: "waiting", priority: "medium" },
      { id: "TCK-1003", subject: "Promotion eligibility", state: "resolved", priority: "low" },
    ],
  });
}
