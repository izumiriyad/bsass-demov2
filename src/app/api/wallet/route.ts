import { NextResponse } from "next/server";
import { getSessionUser, updateBalance } from "@/lib/auth";

const MIN_DEPOSIT = 100;
const MIN_WITHDRAW = 200;

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, amount, method } = (await request.json()) as {
      action?: "deposit" | "withdraw";
      amount?: number;
      method?: string;
    };

    if (!action || (action !== "deposit" && action !== "withdraw")) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!method) {
      return NextResponse.json({ error: "Payment method is required" }, { status: 400 });
    }

    if (action === "deposit" && amount < MIN_DEPOSIT) {
      return NextResponse.json({ error: `Minimum deposit is ৳${MIN_DEPOSIT}` }, { status: 400 });
    }

    if (action === "withdraw" && amount < MIN_WITHDRAW) {
      return NextResponse.json({ error: `Minimum withdrawal is ৳${MIN_WITHDRAW}` }, { status: 400 });
    }

    if (action === "withdraw" && amount > user.balance) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    const delta = action === "deposit" ? amount : -amount;
    const newBalance = await updateBalance(user.id, delta);

    return NextResponse.json({ balance: newBalance, action, amount });
  } catch {
    return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
  }
}
