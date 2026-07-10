import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    jurisdiction: "Bangladesh",
    ageLimit: 18,
    requiredControls: ["KYC", "AML", "ResponsibleGaming", "PaymentAudit", "RiskMonitoring"],
  });
}
