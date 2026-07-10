import type { Metadata } from "next";
import Link from "next/link";
import { Shield, TriangleAlert as AlertTriangle, Phone, Clock, Ban } from "lucide-react";
import { SITE } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Responsible Gaming",
  description: `Responsible gaming at ${SITE.name}`,
};

const PRINCIPLES = [
  {
    icon: Shield,
    title: "Play for Fun, Not Profit",
    desc: "Treat gaming as entertainment, not as a way to make money. Only play with money you can afford to lose.",
  },
  {
    icon: Clock,
    title: "Set Time Limits",
    desc: "Decide how much time you want to spend gaming and stick to it. Take regular breaks.",
  },
  {
    icon: Ban,
    title: "Set Deposit Limits",
    desc: "Set daily, weekly, or monthly deposit limits in your account settings to control your spending.",
  },
  {
    icon: AlertTriangle,
    title: "Know the Signs",
    desc: "If gaming is affecting your finances, relationships, or mental health, it may be time to seek help.",
  },
];

const SIGNS = [
  "Spending more money than you can afford",
  "Chasing losses by betting more",
  "Neglecting work, family, or personal responsibilities",
  "Borrowing money to gamble",
  "Feeling anxious or irritable when not gambling",
  "Lying about your gambling habits",
];

export default function ResponsibleGamingPage() {
  return (
    <div className="space-y-6 px-3 py-4 sm:px-5 sm:py-6">
      <div className="relative overflow-hidden rounded-2xl border border-[#008d5b]/30 bg-gradient-to-br from-[#1b1c1e] via-[#242628] to-[#1b1c1e] p-8 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,141,91,0.15), transparent 60%)" }}
        />
        <div className="relative">
          <Shield className="mx-auto h-12 w-12 text-[#00a86d]" />
          <h1 className="mt-4 text-2xl font-bold text-[#f0f0f0] sm:text-3xl">Responsible Gaming</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#9ca3af]">
            At {SITE.name}, we are committed to promoting responsible gaming. Gaming should be fun and entertaining — never a financial burden.
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-bold text-[#f0f0f0]">Our Principles</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#008d5b]/15">
                  <Icon className="h-5 w-5 text-[#00a86d]" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#f0f0f0]">{p.title}</h3>
                <p className="mt-1 text-xs text-[#9ca3af]">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-[#ffdf19]/30 bg-[#1b1c1e] p-5">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-[#ffdf19]" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#ffdf19]">Signs of Problem Gaming</h2>
        </div>
        <ul className="space-y-2">
          {SIGNS.map((sign) => (
            <li key={sign} className="flex items-start gap-2 text-sm text-[#9ca3af]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffdf19]" />
              <span>{sign}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">Self-Exclusion</h2>
        <p className="text-sm leading-relaxed text-[#9ca3af]">
          If you feel you need a break from gaming, you can self-exclude from {SITE.name} for a period of your choice. During self-exclusion, you will not be able to access your account or make deposits. Contact our support team to request self-exclusion.
        </p>
      </section>

      <section className="rounded-xl border border-[#008d5b]/30 bg-[#008d5b]/10 p-5">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-[#00a86d]" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#00a86d]">Get Help</h2>
        </div>
        <p className="mt-2 text-sm text-[#9ca3af]">
          If you or someone you know is struggling with problem gaming, reach out for help. Contact our support team at{" "}
          <a href={`mailto:${SITE.supportEmail}`} className="font-semibold text-[#00a86d] underline hover:text-[#00a86d]/80">
            {SITE.supportEmail}
          </a>{" "}
          or visit the support page for more options.
        </p>
        <Link href="/support" className="btn-primary mt-4 inline-block px-6 py-2.5 text-sm font-semibold">
          Contact Support
        </Link>
      </section>

      <p className="text-center text-xs text-[#6b7280]">
        {SITE.name} is committed to responsible gaming. 18+ only. Play responsibly.
      </p>
    </div>
  );
}
