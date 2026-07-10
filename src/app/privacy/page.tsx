import type { Metadata } from "next";
import { SITE } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}`,
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly to us, such as your username, email address, and payment information when you register for an account or make a transaction. We also collect usage data such as your IP address, browser type, and pages visited.`,
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to: (a) create and manage your account; (b) process deposits and withdrawals; (c) communicate with you about promotions and updates; (d) prevent fraud and ensure platform security; (e) comply with legal obligations.",
  },
  {
    title: "3. Information Sharing",
    body: `${SITE.name} does not sell or rent your personal information to third parties. We may share your information with payment processors, game providers, and legal authorities when required by law or to prevent fraud.`,
  },
  {
    title: "4. Data Security",
    body: "We use industry-standard encryption and security measures to protect your personal and financial information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Cookies",
    body: "We use cookies to maintain your session, remember your preferences, and analyze platform usage. You can control cookies through your browser settings, but disabling them may affect platform functionality.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to: (a) access your personal information; (b) correct inaccurate information; (c) request deletion of your account; (d) opt out of promotional communications. Contact support to exercise these rights.",
  },
  {
    title: "7. Data Retention",
    body: "We retain your personal information for as long as your account is active or as necessary to provide our services. We may retain certain information after account closure to comply with legal obligations.",
  },
  {
    title: "8. Children's Privacy",
    body: `${SITE.name} is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has provided us with information, please contact support.`,
  },
  {
    title: "9. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page. Continued use of the Platform constitutes acceptance of the updated policy.",
  },
  {
    title: "10. Contact Us",
    body: `If you have questions about this Privacy Policy, please contact us at ${SITE.supportEmail}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-xl">🔒</span>
        <h1 className="text-lg font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-2xl">
          Privacy Policy
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
