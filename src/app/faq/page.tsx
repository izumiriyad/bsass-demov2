import type { Metadata } from "next";
import { FAQAccordion } from "./faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about BSL Gaming Bangladesh",
};

const FAQS = [
  {
    q: "How do I create an account?",
    a: "Click the 'Sign Up' button at the top of the page, fill in your username, email, and password, and you're ready to go. New members receive a ৳500 welcome credit to get started.",
  },
  {
    q: "What payment methods are available?",
    a: "We support bKash, Nagad, Rocket, Bank Transfer, and Crypto. All deposits are instant except bank transfers which may take 1–3 hours. Withdrawals are processed quickly to your preferred method.",
  },
  {
    q: "How long do withdrawals take?",
    a: "Withdrawals via bKash, Nagad, and Rocket are typically instant. Bank transfers may take 1–3 hours. The minimum withdrawal amount is ৳200.",
  },
  {
    q: "Is BSL Gaming safe and legal?",
    a: "Yes. BSL Gaming uses industry-standard encryption to protect your data and funds. We are committed to responsible gaming and comply with all applicable regulations. Players must be 18+ to participate.",
  },
  {
    q: "What is the minimum deposit?",
    a: "The minimum deposit amount is ৳100. We offer quick deposit options of ৳500, ৳1,000, ৳5,000, and ৳10,000 for your convenience.",
  },
  {
    q: "How do I claim bonuses?",
    a: "Visit the Promotions page to see all available offers. Click on any promotion to view details and claim it. Some bonuses are automatically credited to your account.",
  },
  {
    q: "What games are available?",
    a: "We offer 100+ games including sports betting, cricket betting, live casino (baccarat, roulette, blackjack), slots, cockfighting, fishing games, lottery, arcade games, and crash games from top providers like Pragmatic Play, Evolution, JILI, and PG Soft.",
  },
  {
    q: "How does the VIP Club work?",
    a: "The VIP Club has 5 tiers: Bronze, Silver, Gold, Platinum, and Diamond. As you play more, you climb the tiers and unlock better rewards including higher cashback, personal account managers, exclusive promotions, and luxury gifts.",
  },
  {
    q: "Can I set deposit limits?",
    a: "Yes. We encourage responsible gaming. You can set daily, weekly, or monthly deposit limits in your account settings. If you need help, please contact our support team.",
  },
  {
    q: "How do I contact support?",
    a: "Our support team is available 24/7. You can reach us via email at support@bslgaming.com.bd, through live chat, or by phone. Visit the Support page for all contact options.",
  },
];

export default function FAQPage() {
  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-xl">❓</span>
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-2xl">
          FAQ
        </h1>
      </div>
      <p className="max-w-2xl text-sm text-[#9ca3af]">
        Frequently asked questions about BSL Gaming Bangladesh. Can&apos;t find what you&apos;re looking for? Contact our support team.
      </p>
      <FAQAccordion faqs={FAQS} />
    </div>
  );
}
