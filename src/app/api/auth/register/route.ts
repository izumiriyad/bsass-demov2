import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, email, phone, password, referralCode } = (await request.json()) as {
      username?: string;
      email?: string;
      phone?: string;
      password?: string;
      referralCode?: string;
    };

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }
    if (!phone && !email) {
      return NextResponse.json({ error: "Phone number or email is required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 });
    }

    // Use phone as email fallback for session creation
    const effectiveEmail = email || `${phone}@bsl.bd`;
    const user = await createSession(username, password, effectiveEmail, phone, referralCode);
    if (!user) {
      return NextResponse.json({ error: "Registration failed. Username may already exist." }, { status: 500 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
