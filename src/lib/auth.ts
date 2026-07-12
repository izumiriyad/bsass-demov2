import { cookies } from "next/headers";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  phone?: string;
  balance: number;
  role?: "user" | "admin" | "agent";
  vipLevel?: number;
  referralCode?: string;
  joinedAt?: string;
}

const SESSION_COOKIE = "bsl-session";
const ROLE_COOKIE    = "bsl-role";
const cookieOptions  = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 604800, // 7 days
};

/* ─── In-memory store (replace with DB in real deployment) ─── */
interface UserRecord {
  id: string; username: string; email: string; phone?: string;
  password: string; balance: number; role: "user" | "admin" | "agent";
  vipLevel: number; referralCode: string; joinedAt: string;
}
const USERS = new Map<string, UserRecord>();

// Pre-seed demo accounts
function seedDemoUsers() {
  if (USERS.size > 0) return;
  const demos: Omit<UserRecord, "id">[] = [
    { username: "demo1",  email: "demo1@bsl.bd",  phone: "01877000001", password: "demo123", balance: 12500,  role: "user",  vipLevel: 2, referralCode: "DEMO1REF", joinedAt: "2024-01-15" },
    { username: "demo2",  email: "demo2@bsl.bd",  phone: "01855000002", password: "pass456", balance: 5000,   role: "user",  vipLevel: 1, referralCode: "DEMO2REF", joinedAt: "2024-03-20" },
    { username: "demo3",  email: "demo3@bsl.bd",  phone: "01844000003", password: "test789", balance: 25000,  role: "user",  vipLevel: 3, referralCode: "DEMO3REF", joinedAt: "2024-02-10" },
    { username: "admin",  email: "admin@bsl.bd",  phone: "01700000000", password: "admin123",balance: 999999, role: "admin", vipLevel: 9, referralCode: "ADMINREF", joinedAt: "2023-06-01" },
    { username: "agent1", email: "agent1@bsl.bd", phone: "01800000001", password: "agent123",balance: 50000,  role: "agent", vipLevel: 4, referralCode: "AGNT1REF", joinedAt: "2023-10-01" },
  ];
  for (const d of demos) {
    const id = crypto.randomUUID();
    USERS.set(id, { ...d, id });
  }
}

seedDemoUsers();

/* ─── Public helpers ─────────────────────────────────────── */
export async function getSessionUser(): Promise<AuthUser | null> {
  const store   = await cookies();
  const session = store.get(SESSION_COOKIE)?.value;
  if (!session) return null;
  const user = USERS.get(session);
  if (!user) return null;
  return toAuthUser(user);
}

export async function createSession(
  username: string,
  password: string,
  email?: string,
  phone?: string,
  referralCode?: string,
): Promise<AuthUser | null> {
  // Try login first (find by username or phone)
  let user = Array.from(USERS.values()).find(
    u => u.username === username || u.phone === username
  );

  if (user) {
    // Login path — verify password
    if (user.password !== password) return null;
  } else {
    // Register path — create new user
    const newUser: UserRecord = {
      id:           crypto.randomUUID(),
      username,
      email:        email ?? `${username}@bsl.bd`,
      phone,
      password,
      balance:      500, // welcome bonus ৳500
      role:         username.toLowerCase() === "admin" ? "admin" : "user",
      vipLevel:     0,
      referralCode: generateReferralCode(username),
      joinedAt:     new Date().toISOString().split("T")[0],
    };
    USERS.set(newUser.id, newUser);
    user = newUser;

    // If referral code was used, credit referrer
    if (referralCode) {
      const referrer = Array.from(USERS.values()).find(u => u.referralCode === referralCode.toUpperCase());
      if (referrer) referrer.balance += 200; // ৳200 referral reward
    }
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, user.id, cookieOptions);
  store.set(ROLE_COOKIE, user.role, cookieOptions);
  return toAuthUser(user);
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(ROLE_COOKIE);
}

export async function updateBalance(userId: string, amount: number): Promise<number> {
  const user = USERS.get(userId);
  if (!user) throw new Error("User not found");
  user.balance = Math.max(0, user.balance + amount);
  return user.balance;
}

export function getDemoUserById(userId: string): UserRecord | undefined {
  return USERS.get(userId);
}

/* ─── Private ───────────────────────────────────────────── */
function toAuthUser(u: UserRecord): AuthUser {
  return {
    id:           u.id,
    username:     u.username,
    email:        u.email,
    phone:        u.phone,
    balance:      u.balance,
    role:         u.role,
    vipLevel:     u.vipLevel,
    referralCode: u.referralCode,
    joinedAt:     u.joinedAt,
  };
}

function generateReferralCode(username: string): string {
  const clean = username.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6).padEnd(4, "X");
  const suffix = Math.floor(Math.random() * 9000 + 1000);
  return `${clean}${suffix}`;
}
