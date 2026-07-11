import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Getting Started Guide – BSL Gaming" };

const STEPS = [
  {
    id: "register",
    emoji: "📱",
    title: "Register Your Account",
    titleBn: "অ্যাকাউন্ট রেজিস্টার করুন",
    steps: [
      "Click 'Sign Up' button in the top right corner or on the mobile header.",
      "Enter your Bangladesh mobile number (01XXXXXXXXX format).",
      "Set a strong password (8+ characters, letters + numbers).",
      "Enter the OTP sent to your phone via SMS — valid for 5 minutes.",
      "Your account is ready! You'll be logged in automatically.",
    ],
    note: "Use your real mobile number. It will be used for account recovery, deposits, and verification.",
    color: "#22c55e",
  },
  {
    id: "verify",
    emoji: "🛡️",
    title: "Verify Your Account (KYC)",
    titleBn: "পরিচয় যাচাই করুন (KYC)",
    steps: [
      "Go to Dashboard → Verification tab.",
      "Upload your NID (National ID Card) front and back photo clearly.",
      "Take a selfie holding your NID next to your face.",
      "Submit and wait 2–24 hours for approval.",
      "Verified accounts get higher deposit/withdrawal limits.",
    ],
    note: "Verification is required for withdrawals above ৳5,000. Your documents are kept encrypted and secure.",
    color: "#3b82f6",
  },
  {
    id: "deposit",
    emoji: "💳",
    title: "Make Your First Deposit",
    titleBn: "প্রথম ডিপোজিট করুন",
    steps: [
      "Click 'Deposit' button (top right or mobile bottom nav).",
      "Select your payment method: bKash, Nagad, Rocket, Upay, or Bank.",
      "Enter the amount (minimum ৳500).",
      "Send money to the displayed agent number (do NOT save this — it changes).",
      "Enter your transaction ID (TxID) from the payment app and submit.",
      "Deposit credited within 5–15 minutes. Check your wallet.",
    ],
    note: "Always copy the agent number fresh each time. Don't use saved numbers as they rotate for security.",
    color: "#f59e0b",
  },
  {
    id: "claim-bonus",
    emoji: "🎁",
    title: "Claim Your Welcome Bonus",
    titleBn: "স্বাগত বোনাস ক্লেইম করুন",
    steps: [
      "After first deposit, your 100% bonus (up to ৳10,000) is auto-credited.",
      "Go to Dashboard → Wallet to see your Main + Bonus balance.",
      "Bet on sports at odds 1.75+ to meet 10x wagering requirement.",
      "For casino, wagering is 25x on bonus amount.",
      "Once met, bonus converts to real withdrawable cash.",
    ],
    note: "Bonus expires in 7 days. Don't withdraw before wagering requirement is met — it cancels the bonus.",
    color: "#a855f7",
  },
  {
    id: "bet",
    emoji: "⚽",
    title: "Place Your First Bet",
    titleBn: "প্রথম বেট করুন",
    steps: [
      "Go to Sports → find your match (Cricket, Football, etc.).",
      "Click on the odds you want (e.g., team to win, total runs).",
      "The bet slip opens on the right side (or bottom on mobile).",
      "Enter your stake amount.",
      "Review the potential payout and click 'Place Bet'.",
      "Track your bets in Dashboard → History.",
    ],
    note: "Live bets update in real-time. You can cash out some bets early — look for the Cash Out button.",
    color: "#22c55e",
  },
  {
    id: "withdraw",
    emoji: "💰",
    title: "Withdraw Your Winnings",
    titleBn: "জেতা টাকা তুলুন",
    steps: [
      "Click 'Withdraw' in the header or Dashboard → Wallet.",
      "Select your payment method (must be in your name).",
      "Enter the amount (minimum ৳500).",
      "Enter your bKash/Nagad account number.",
      "Submit — processed within 5–30 minutes during business hours.",
    ],
    note: "Withdrawal goes to the account under your registered name only. Third-party accounts are rejected.",
    color: "#22c55e",
  },
];

const TIPS = [
  { emoji: "🎯", tip: "Always bet on events you understand well — don't chase losses." },
  { emoji: "💡", tip: "Set a daily deposit limit in Dashboard → Limits to stay in control." },
  { emoji: "🔔", tip: "Enable notifications to get live score alerts and exclusive offers." },
  { emoji: "🤝", tip: "Use the Referral Program to earn ৳500 for each friend you invite." },
  { emoji: "👑", tip: "Bet regularly to climb VIP tiers and earn up to 15% weekly cashback." },
  { emoji: "📱", tip: "Download the BSL app for 1-tap deposits and live match notifications." },
];

export default function GuidePage() {
  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#008d5b] via-[#005c3c] to-[#1b1c1e] border border-[#008d5b]/20 p-6 sm:p-8 text-white">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#ffdf19]/10 blur-2xl" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19] mb-2">New Member Guide</p>
          <h1 className="text-2xl font-black sm:text-3xl">Getting Started with BSL Gaming</h1>
          <p className="mt-2 text-sm text-white/80 max-w-lg">Everything you need to know — from creating an account to your first withdrawal. Step by step, in plain Bangla English.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Register", "Verify", "Deposit", "Bet", "Withdraw"].map((s, i) => (
              <a key={s} href={`#step-${i + 1}`} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white hover:bg-white/20 transition">
                {i + 1}. {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {STEPS.map((s, idx) => (
          <div key={s.id} id={`step-${idx + 1}`} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] overflow-hidden">
            <div className="flex items-center gap-4 border-b border-[#2a2c30] bg-[#121315] px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-[#241a05]"
                style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)` }}>
                {idx + 1}
              </div>
              <span className="text-xl">{s.emoji}</span>
              <div>
                <h2 className="text-sm font-black text-white">{s.title}</h2>
                <p className="text-[10px] text-[#9ca3af]">{s.titleBn}</p>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {s.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-black text-white mt-0.5"
                    style={{ background: `${s.color}33`, border: `1px solid ${s.color}55`, color: s.color }}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#c0b980] leading-relaxed">{step}</p>
                </div>
              ))}
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#ffdf19]/20 bg-[#ffdf19]/5 p-3">
                <span className="text-sm shrink-0">💡</span>
                <p className="text-[11px] text-[#c0b980] leading-relaxed">{s.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="mb-4 text-sm font-black text-white">Pro Tips for BD Players</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TIPS.map((t) => (
            <div key={t.tip} className="flex items-start gap-2.5">
              <span className="text-lg shrink-0">{t.emoji}</span>
              <p className="text-[11px] text-[#9ca3af] leading-relaxed">{t.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link href="/help" className="flex items-center justify-center gap-2 rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 text-sm font-black text-white hover:border-[#ffdf19]/30 transition">
          ℹ️ Help Center
        </Link>
        <Link href="/support" className="flex items-center justify-center gap-2 rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 text-sm font-black text-white hover:border-[#ffdf19]/30 transition">
          🎧 Live Support
        </Link>
        <Link href="/deposit" className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] p-4 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] hover:brightness-110 transition">
          💰 Make Deposit Now
        </Link>
      </div>
    </div>
  );
}
