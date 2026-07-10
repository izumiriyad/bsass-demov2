import type { Metadata } from "next";
import { SITE } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for ${SITE.name}`,
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing and using ${SITE.name} ("the Platform"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Platform.`,
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years of age to use this Platform. By registering an account, you confirm that you are of legal age and that the information you provide is accurate and complete.",
  },
  {
    title: "3. Account Registration",
    body: "To access certain features of the Platform, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    title: "4. Deposits and Withdrawals",
    body: "The minimum deposit is ৳100 and the minimum withdrawal is ৳200. We support bKash, Nagad, Rocket, Bank Transfer, and Crypto. All transactions are subject to verification. We reserve the right to suspend accounts with suspicious activity.",
  },
  {
    title: "5. Bonuses and Promotions",
    body: "Bonuses and promotions are subject to specific terms which may include wagering requirements, minimum deposit amounts, and expiration dates. We reserve the right to modify or cancel any promotion at any time.",
  },
  {
    title: "6. Prohibited Activities",
    body: "You agree not to: (a) use the Platform for any illegal purpose; (b) attempt to gain unauthorized access to any part of the Platform; (c) use bots, scripts, or automated systems; (d) create multiple accounts; (e) engage in money laundering or fraudulent activities.",
  },
  {
    title: "7. Limitation of Liability",
    body: `${SITE.name} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our maximum liability shall not exceed the amount you have deposited.`,
  },
  {
    title: "8. Account Suspension",
    body: "We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or show suspicious patterns. Suspended accounts may forfeit any bonuses or pending withdrawals.",
  },
  {
    title: "9. Changes to Terms",
    body: "We may update these Terms and Conditions from time to time. Continued use of the Platform after changes are posted constitutes your acceptance of the updated terms.",
  },
  {
    title: "10. Governing Law",
    body: "These Terms shall be governed by and construed in accordance with the laws of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bangladesh.",
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-xl">📋</span>
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-2xl">
          Terms &amp; Conditions
        </h1>
      </div>
      <p className="text-xs text-[#6b7280]">Last updated: {new Date().toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" })}</p>
      <div className="space-y-4">
        {SECTIONS.map((section) => (
          <div key={section.title} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
            <h2 className="text-sm font-bold text-[#f0f0f0]">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#9ca3af]">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
