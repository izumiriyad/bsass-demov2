"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { RefreshCw, MessageSquare, LogOut, ChevronRight, Copy, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useModal } from "@/components/providers/modal-provider";
import { formatBDT, cn } from "@/lib/utils";

/* ─── Icon Tile Component (exact bj88 style) ─── */
function IconTile({
  icon, label, href, onClick, badge, highlight,
}: {
  icon: string; label: string; href?: string; onClick?: () => void;
  badge?: string; highlight?: boolean;
}) {
  const cls = cn(
    "flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all active:scale-95 cursor-pointer",
    highlight
      ? "border-[#ffdf19]/30 bg-gradient-to-br from-[#ffdf19]/10 to-[#1b1c1e]"
      : "border-[#2a2c30] bg-[#1b1c1e] hover:border-[#ffdf19]/30 hover:bg-[#242628]"
  );
  const inner = (
    <>
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#242628] text-2xl shadow-inner border border-[#2e3035]" style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)" }}>
          {icon}
        </div>
        {badge && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[8px] font-black text-white">
            {badge}
          </span>
        )}
      </div>
      <span className="text-center text-[10px] font-bold leading-tight text-[#d8d2bf]">{label}</span>
    </>
  );

  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
}

/* ─── Section Group ─── */
function Section({ title, children, cols = 3 }: { title: string; children: React.ReactNode; cols?: number }) {
  return (
    <div className="rounded-2xl border border-[#2a2c30] bg-[#121315] overflow-hidden">
      <div className="border-b border-[#2a2c30] bg-[#1b1c1e] px-4 py-2.5">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af]">{title}</p>
      </div>
      <div className={cn("grid p-3 gap-2", cols === 2 ? "grid-cols-2" : cols === 4 ? "grid-cols-4" : "grid-cols-3")}>
        {children}
      </div>
    </div>
  );
}

/* ─── VIP Progress ─── */
const VIP_TIERS = [
  { name: "Bronze", min: 0, max: 5000, color: "#cd7f32" },
  { name: "Silver", min: 5000, max: 20000, color: "#c0c0c0" },
  { name: "Gold", min: 20000, max: 100000, color: "#ffdf19" },
  { name: "Platinum", min: 100000, max: 500000, color: "#e5e4e2" },
  { name: "Diamond", min: 500000, max: Infinity, color: "#b9f2ff" },
];

function VipBar({ xp }: { xp: number }) {
  const tier = VIP_TIERS.find(t => xp >= t.min && xp < t.max) ?? VIP_TIERS[0];
  const next = VIP_TIERS[VIP_TIERS.indexOf(tier) + 1];
  const pct = next ? ((xp - tier.min) / (next.min - tier.min)) * 100 : 100;
  return (
    <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl" style={{ filter: `drop-shadow(0 0 6px ${tier.color}88)` }}>💎</span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af]">VIP Status</p>
            <p className="text-sm font-black" style={{ color: tier.color }}>{tier.name}</p>
          </div>
        </div>
        <Link href="/vip" className="rounded-full border border-[#ffdf19]/30 bg-[#ffdf19]/10 px-3 py-1 text-[10px] font-black text-[#ffdf19] hover:bg-[#ffdf19]/20 transition">
          VIP Club →
        </Link>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#242628]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${tier.color}88, ${tier.color})` }}
        />
      </div>
      {next && (
        <p className="mt-1.5 text-[10px] text-[#6b7280]">
          {(next.min - xp).toLocaleString()} XP to <span style={{ color: next.color }}>{next.name}</span>
        </p>
      )}
    </div>
  );
}

/* ─── Main Account Panel ─── */
export function AccountPanel() {
  const { user, signOut, refreshUser } = useAuth();
  const { openModal } = useModal();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const xp = 8500; // demo XP
  const referralCode = `BSL${user.username.toUpperCase().slice(0, 4)}2025`;

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshUser();
    setRefreshing(false);
    toast.success("Balance updated");
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out safely. নিরাপদে লগআউট হয়েছে।");
    router.push("/");
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      toast.success("Referral code copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-3 pb-6">
      {/* ── Profile Header (bj88 style) ── */}
      <div className="rounded-2xl border border-[#2a2c30] bg-gradient-to-br from-[#1b1c1e] to-[#121315] overflow-hidden">
        {/* Avatar + Name Row */}
        <div className="flex items-center gap-3 p-4 border-b border-[#2a2c30]">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#008d5b] to-[#005c3c] text-xl font-black text-white shadow-lg ring-2 ring-[#ffdf19]/20">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#22c55e] text-[8px] font-black text-white border-2 border-[#121315]">✓</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-base font-black text-white">{user.username}</p>
            <p className="truncate text-xs text-[#9ca3af]">{user.email}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="rounded-full bg-[#008d5b]/20 border border-[#008d5b]/30 px-2 py-0.5 text-[9px] font-black text-[#22c55e]">✓ VERIFIED</span>
              <span className="rounded-full bg-[#ffdf19]/15 border border-[#ffdf19]/30 px-2 py-0.5 text-[9px] font-black text-[#ffdf19]">VIP SILVER</span>
            </div>
          </div>
          <Link href="/dashboard/profile" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#242628] text-[#9ca3af] hover:text-white transition">
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Wallet Balance (bj88 yellow bar style) */}
        <div className="bg-gradient-to-r from-[#d4a017] to-[#f4a700] px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#241a05] uppercase tracking-wider">Main Wallet</p>
              <p className="text-xl font-black text-[#241a05] mt-0.5">{formatBDT(user.balance)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/15 text-[#241a05] hover:bg-black/25 transition"
                aria-label="Refresh balance"
              >
                <RefreshCw size={16} className={cn(refreshing && "animate-spin")} />
              </button>
              <Link href="/support" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/15 text-[#241a05] hover:bg-black/25 transition">
                <MessageSquare size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── VIP Bar ── */}
      <VipBar xp={xp} />

      {/* ── Referral Code ── */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9ca3af]">Your Referral Code</p>
            <p className="mt-1 font-mono text-base font-black text-[#ffdf19]">{referralCode}</p>
            <p className="text-[10px] text-[#6b7280] mt-0.5">Share & earn ৳500 per friend</p>
          </div>
          <button onClick={copyReferral} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#242628] text-[#9ca3af] hover:text-[#ffdf19] transition">
            {copied ? <CheckCircle2 size={16} className="text-[#22c55e]" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* ── Funds ── */}
      <Section title="Funds" cols={2}>
        <IconTile icon="💳" label="Deposit" onClick={() => openModal("deposit")} highlight />
        <IconTile icon="💰" label="Withdrawal" onClick={() => openModal("withdraw")} />
      </Section>

      {/* ── Games ── */}
      <Section title="Games" cols={3}>
        <IconTile icon="⭐" label="Popular" href="/popular" />
        <IconTile icon="⚽" label="Sports" href="/sports" />
        <IconTile icon="🐓" label="Cockfighting" href="/cockfighting" />
        <IconTile icon="🎰" label="Slots" href="/slots" />
        <IconTile icon="♠️" label="Casino" href="/casino" />
        <IconTile icon="🎲" label="Table" href="/table" />
        <IconTile icon="🎣" label="Fishing" href="/fishing" />
        <IconTile icon="🎟️" label="Lottery" href="/lottery" />
        <IconTile icon="🕹️" label="Arcade" href="/arcade" />
        <IconTile icon="🚀" label="Crash" href="/crash" />
      </Section>

      {/* ── History ── */}
      <Section title="History" cols={3}>
        <IconTile icon="📋" label="Betting Records" href="/dashboard/history" />
        <IconTile icon="📊" label="Turnover" href="/dashboard/analytics" />
        <IconTile icon="🧾" label="Transaction Records" href="/dashboard/transactions" />
      </Section>

      {/* ── My Account ── */}
      <Section title="My Account" cols={4}>
        <IconTile icon="👤" label="Personal Info" href="/dashboard/profile" />
        <IconTile icon="👑" label="My VIP" href="/vip" />
        <IconTile icon="🔑" label="Reset Password" href="/dashboard/security" />
        <IconTile icon="🤝" label="Referral" href="/referral" />
        <IconTile icon="🔔" label="Notifications" href="/dashboard/notifications" badge="3" />
        <IconTile icon="🛡️" label="Verification" href="/dashboard/verification" />
        <IconTile icon="📱" label="App Download" href="/app-download" />
        <IconTile icon="⚙️" label="Limits" href="/dashboard/limits" />
      </Section>

      {/* ── Promotions & More ── */}
      <Section title="Promotions" cols={3}>
        <IconTile icon="🎁" label="Promotions" href="/promotions" highlight />
        <IconTile icon="🏆" label="VIP Club" href="/vip" />
        <IconTile icon="🏅" label="Leaderboard" href="/leaderboard" />
        <IconTile icon="📲" label="Download App" href="/app-download" />
        <IconTile icon="🤝" label="Affiliate" href="/affiliate" />
        <IconTile icon="🌟" label="Ambassador" href="/ambassador" />
        <IconTile icon="👥" label="Referral Program" href="/referral" />
        <IconTile icon="🧧" label="Red Envelope" href="/red-envelope" />
        <IconTile icon="📅" label="Daily Check-in" href="/daily-check-in" />
      </Section>

      {/* ── Social ── */}
      <Section title="Social" cols={4}>
        <IconTile icon="📘" label="Facebook" onClick={() => toast.info("Facebook: @BSLGaming")} />
        <IconTile icon="📸" label="Instagram" onClick={() => toast.info("Instagram: @bslgaming")} />
        <IconTile icon="🐦" label="Twitter/X" onClick={() => toast.info("Twitter: @BSLGaming")} />
        <IconTile icon="✈️" label="Telegram" onClick={() => toast.info("Telegram: t.me/bslgaming")} />
        <IconTile icon="💬" label="WhatsApp" onClick={() => toast.info("WhatsApp support available 24/7")} />
        <IconTile icon="▶️" label="YouTube" onClick={() => toast.info("YouTube: BSL Gaming BD")} />
        <IconTile icon="📌" label="Pinterest" onClick={() => toast.info("Pinterest: BSL Gaming")} />
        <IconTile icon="❓" label="Help Page" href="/help" />
      </Section>

      {/* ── Logout ── */}
      <button
        onClick={handleLogout}
        className="w-full rounded-2xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-4 text-sm font-black text-[#241a05] shadow-[0_4px_15px_rgba(255,223,25,0.3)] transition hover:brightness-110 active:scale-[.98] border-b-[3px] border-[#c28400] flex items-center justify-center gap-2"
      >
        <LogOut size={16} />
        Log out / লগআউট
      </button>
    </div>
  );
}
