"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare, Phone, Mail, HeadphonesIcon } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    category: "Accounts",
    emoji: "👤",
    items: [
      { q: "How do I create a BSL Gaming account?", a: "Click 'Sign Up' on the top right or in the mobile menu. Fill in your mobile number, set a password, verify via OTP, and your account is ready in under 2 minutes." },
      { q: "I forgot my password. How do I reset it?", a: "Click 'Login' then 'Forgot Password'. Enter your registered mobile number and you'll receive an OTP. Use the OTP to set a new password." },
      { q: "How do I verify my account (KYC)?", a: "Go to Dashboard → Verification. Upload your NID (National ID Card) front and back, plus a selfie. Verification takes 2–24 hours. Higher deposit/withdrawal limits are unlocked after verification." },
      { q: "Can I have multiple accounts?", a: "No. BSL Gaming strictly allows one account per person. Multiple accounts result in permanent suspension and forfeiture of all balances." },
    ]
  },
  {
    category: "Deposits",
    emoji: "💳",
    items: [
      { q: "How do I deposit via bKash?", a: "Go to Deposit, select bKash, enter your amount, then send money (or Cash Out) to our official agent number shown on screen. Enter your transaction ID (TxID) and submit. Credited within 5–15 minutes." },
      { q: "What is the minimum deposit?", a: "Minimum deposit is ৳500 for all payment methods. No maximum limit for verified accounts." },
      { q: "Why hasn't my deposit appeared yet?", a: "Most deposits are credited within 5–15 minutes. If it's been over 30 minutes, contact support with your TxID and we'll resolve it immediately." },
      { q: "What payment methods are accepted?", a: "We accept bKash, Nagad, Rocket, Upay, DBBL, and local bank transfers. All transactions are processed in BDT with zero fees." },
    ]
  },
  {
    category: "Withdrawals",
    emoji: "💰",
    items: [
      { q: "How long do withdrawals take?", a: "bKash and Nagad withdrawals are typically processed within 5–30 minutes during working hours. Bank transfers take 1–2 business days." },
      { q: "What is the minimum withdrawal?", a: "Minimum withdrawal is ৳500. No maximum for verified Diamond VIP accounts." },
      { q: "Why was my withdrawal rejected?", a: "Common reasons: unfulfilled wagering requirement on bonus funds, KYC not completed, or the withdrawal account doesn't match your registered name." },
      { q: "Do I need to verify before withdrawing?", a: "Yes. For withdrawals above ৳5,000, basic KYC verification is required. For ৳50,000+, full NID verification is mandatory." },
    ]
  },
  {
    category: "Betting & Games",
    emoji: "🎮",
    items: [
      { q: "How do I place a sports bet?", a: "Go to Sports, find your match, click on the odds you want. The bet slip opens on the right. Enter your stake and click 'Place Bet'. Done!" },
      { q: "Can I cash out a bet?", a: "Yes. Selected markets offer in-play cash out. Open your bet history in Dashboard and look for the Cash Out button on eligible bets." },
      { q: "What happens if a match is abandoned?", a: "If a cricket match is abandoned before a result, all bets are voided and stakes returned. Check our Betting Rules for full details." },
      { q: "Are the casino games fair?", a: "Yes. All casino games use certified RNG (Random Number Generator) technology from licensed providers like JILI, Pragmatic Play, and Evolution Gaming." },
    ]
  },
  {
    category: "Bonuses",
    emoji: "🎁",
    items: [
      { q: "How do I claim my welcome bonus?", a: "Register, make your first deposit of ৳500+, and the 100% bonus (up to ৳10,000) is automatically credited. The bonus has a 10x wagering requirement on sports and 25x on casino." },
      { q: "What is the wagering requirement?", a: "Each bonus has a wagering requirement. For example, a ৳500 bonus with 10x means you must bet a total of ৳5,000 before the bonus is released as withdrawable cash." },
      { q: "How does VIP cashback work?", a: "Each VIP tier earns a weekly cashback on net losses. Standard = 5%, Silver = 8%, Gold = 10%, Diamond = 15%. Credited every Monday automatically." },
      { q: "Can I use multiple bonuses at once?", a: "No. Only one bonus can be active at a time. Complete or forfeit the current bonus before claiming another." },
    ]
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-[#2a2c30] last:border-0 transition-colors ${open ? "bg-[#ffdf19]/3" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm font-semibold text-white leading-snug">{q}</span>
        {open ? <ChevronUp size={16} className="shrink-0 text-[#ffdf19]" /> : <ChevronDown size={16} className="shrink-0 text-[#6b7280]" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm leading-relaxed text-[#9ca3af]">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("Accounts");

  const active = FAQS.find((f) => f.category === activeCategory) || FAQS[0];

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b1c1e] to-[#242628] border border-[#2a2c30] p-6 text-center">
        <h1 className="text-2xl font-black text-white sm:text-3xl">Help Center</h1>
        <p className="mt-2 text-sm text-[#9ca3af]">Find answers to your questions about accounts, deposits, withdrawals, and more.</p>
      </div>

      {/* Contact options */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: "💬", label: "WhatsApp", sub: "01XXXXXXXXX", color: "#22c55e", href: "https://wa.me/01XXXXXXXXX" },
          { icon: "✈️", label: "Telegram", sub: "@bslgaming_bd", color: "#3b82f6", href: "https://t.me/bslgaming" },
          { icon: "📧", label: "Email", sub: "help@bslgaming.bd", color: "#6366f1", href: "mailto:help@bslgaming.bd" },
          { icon: "🎧", label: "Live Chat", sub: "24/7 Support", color: "#ffdf19", href: "/live-chat" },
        ].map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 text-center transition hover:border-[#ffdf19]/30 hover:-translate-y-0.5"
          >
            <span className="text-3xl">{c.icon}</span>
            <div>
              <p className="text-xs font-black text-white">{c.label}</p>
              <p className="text-[10px] text-[#6b7280]">{c.sub}</p>
            </div>
          </a>
        ))}
      </div>

      {/* FAQ */}
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        {/* Category sidebar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-x-visible">
          {FAQS.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-left transition-all ${
                activeCategory === cat.category
                  ? "bg-[#ffdf19]/10 border border-[#ffdf19]/40 text-[#ffdf19]"
                  : "bg-[#1b1c1e] border border-[#2a2c30] text-[#9ca3af] hover:text-white"
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#2a2c30] px-4 py-3 bg-[#121315]">
            <span className="text-lg">{active.emoji}</span>
            <h2 className="text-sm font-black text-white">{active.category}</h2>
          </div>
          {active.items.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

      {/* Still need help */}
      <div className="rounded-2xl border border-[#ffdf19]/20 bg-gradient-to-br from-[#1c1400] to-[#1b1c1e] p-5 text-center">
        <p className="text-sm font-black text-white mb-2">Still need help?</p>
        <p className="text-xs text-[#9ca3af] mb-4">Our support team is available 24/7. Average response time: under 5 minutes.</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/support" className="rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-6 py-3 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110">
            Open a Support Ticket
          </Link>
          <a href="https://wa.me/01XXXXXXXXX" className="rounded-xl border border-[#22c55e]/40 bg-[#22c55e]/10 px-6 py-3 text-sm font-black text-[#22c55e] transition hover:bg-[#22c55e]/20">
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
