import Link from "next/link";
import { SITE } from "@/lib/catalog";

const GAME_LINKS = [
  { label: "Sports", href: "/sports" },
  { label: "Cricket", href: "/sports?filter=cricket" },
  { label: "Casino", href: "/casino" },
  { label: "Slots", href: "/slots" },
  { label: "Fishing", href: "/fishing" },
  { label: "Arcade", href: "/arcade" },
  { label: "Crash", href: "/crash" },
  { label: "Lottery", href: "/lottery" },
  { label: "Table", href: "/table" },
  { label: "Popular", href: "/popular" },
];

const PROMO_LINKS = [
  { label: "Welcome Bonus", href: "/promotions" },
  { label: "VIP Club", href: "/vip" },
  { label: "Cashback", href: "/cashback" },
  { label: "Referral Program", href: "/referral" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Tournaments", href: "/tournaments" },
  { label: "Daily Check-In", href: "/daily-check-in" },
  { label: "Red Envelope", href: "/red-envelope" },
  { label: "Lucky Spin", href: "/lucky-spin" },
  { label: "Ambassador", href: "/ambassador" },
];

const HELP_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "Live Support", href: "/live-chat" },
  { label: "Deposit Guide", href: "/guide" },
  { label: "Responsible Gaming", href: "/responsible-gaming" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "AML Policy", href: "/aml-policy" },
  { label: "KYC Policy", href: "/kyc-policy" },
  { label: "Betting Rules", href: "/betting-rules" },
  { label: "Verify Agent", href: "/verify-agent" },
];

const PAYMENT_METHODS = [
  { name: "bKash",  color: "#e2136e",     text: "bKash" },
  { name: "Nagad",  color: "#f47b20",     text: "NAGAD" },
  { name: "Rocket", color: "#8c1566",     text: "Rocket" },
  { name: "Upay",   color: "#0070ba",     text: "UPAY" },
  { name: "DBBL",   color: "#006E3C",     text: "DBBL" },
  { name: "Bank",   color: "#1d4ed8",     text: "Bank TT" },
];

const SOCIAL_LINKS = [
  { name: "Facebook",  href: "#", emoji: "📘" },
  { name: "YouTube",   href: "#", emoji: "📺" },
  { name: "Telegram",  href: "#", emoji: "✈️" },
  { name: "WhatsApp",  href: "#", emoji: "💬" },
  { name: "Instagram", href: "#", emoji: "📸" },
  { name: "Twitter",   href: "#", emoji: "🐦" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1e2026] bg-[#0d0f10] pb-20 pt-10 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Top section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#008d5b] to-[#004d32] text-sm font-black text-white shadow-lg">
                BSL
              </div>
              <div>
                <p className="text-base font-black text-white leading-tight">BSL Gaming</p>
                <p className="text-[10px] text-[#6b7280]">Bangladesh #1 Platform</p>
              </div>
            </Link>
            <p className="text-[11px] text-[#6b7280] leading-relaxed max-w-[220px]">
              Bangladesh's most trusted betting platform. Licensed, regulated, and 100% secure for BD players.
            </p>

            {/* Social */}
            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1b1c1e] border border-[#2a2c30] text-sm transition hover:border-[#ffdf19]/40 hover:scale-110"
                >
                  {s.emoji}
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-2.5 py-1 text-[9px] font-black text-[#22c55e]">✓ SSL Secured</span>
              <span className="rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2.5 py-1 text-[9px] font-black text-[#3b82f6]">✓ PAGCOR Licensed</span>
              <span className="rounded-full border border-[#ffdf19]/30 bg-[#ffdf19]/10 px-2.5 py-1 text-[9px] font-black text-[#ffdf19]">18+ Only</span>
            </div>
          </div>

          {/* Games */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-[#ffdf19]">Games</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {GAME_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="text-[11px] text-[#6b7280] hover:text-white transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Promotions */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-[#ffdf19]">Promotions</h3>
            <div className="space-y-1.5">
              {PROMO_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block text-[11px] text-[#6b7280] hover:text-white transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-[#ffdf19]">Help & Legal</h3>
            <div className="space-y-1.5">
              {HELP_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block text-[11px] text-[#6b7280] hover:text-white transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 rounded-2xl border border-[#1e2026] bg-[#111315] p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#6b7280]">Accepted Payment Methods</p>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((p) => (
              <div
                key={p.name}
                className="flex h-8 items-center justify-center rounded-lg px-4 text-[10px] font-black text-white shadow"
                style={{ background: p.color }}
              >
                {p.text}
              </div>
            ))}
            <div className="flex h-8 items-center justify-center rounded-lg border border-[#2a2c30] px-4 text-[10px] font-black text-[#9ca3af]">
              + More
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <p className="text-[10px] text-[#6b7280]">⚡ Instant deposits · Same-day withdrawals · Zero fees for bKash/Nagad</p>
          </div>
        </div>

        {/* Responsible Gaming */}
        <div className="mt-6 rounded-2xl border border-[#ef4444]/10 bg-[#ef4444]/5 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="text-2xl flex-shrink-0">🛡️</span>
            <p className="text-[11px] text-[#9ca3af] leading-relaxed">
              <span className="font-black text-[#ffdf19]">Responsible Gaming: </span>
              BSL Gaming is committed to promoting responsible gambling. 18+ only. If you or someone you know has a gambling problem, please visit{" "}
              <Link href="/responsible-gaming" className="text-[#ffdf19] hover:underline">our Responsible Gaming page</Link> or contact our 24/7 support team.
              Never bet more than you can afford to lose.
            </p>
            <div className="flex gap-2 sm:ml-auto sm:flex-shrink-0">
              <Link href="/responsible-gaming" className="shrink-0 rounded-lg border border-[#2a2c30] bg-[#1b1c1e] px-3 py-1.5 text-[9px] font-black text-[#9ca3af] hover:text-white transition">Set Limits</Link>
              <Link href="/self-assessment" className="shrink-0 rounded-lg border border-[#2a2c30] bg-[#1b1c1e] px-3 py-1.5 text-[9px] font-black text-[#9ca3af] hover:text-white transition">Self-Assess</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-2 border-t border-[#1e2026] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[#4b5563]">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. Operated by BSL Gaming Ltd. Licensed under PAGCOR.
          </p>
          <div className="flex gap-4">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Cookies", href: "/cookie-policy" },
              { label: "Contact", href: "/support" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-[10px] text-[#4b5563] hover:text-[#9ca3af] transition">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
