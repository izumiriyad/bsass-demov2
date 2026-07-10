import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Clock, Headphones, Award, Users, Zap } from "lucide-react";
import { SITE } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name} — ${SITE.tagline}`,
};

const STATS = [
  { label: "Active Players", value: "500K+" },
  { label: "Games Available", value: "100+" },
  { label: "Paid Out", value: "৳50Cr+" },
  { label: "Years of Service", value: "5+" },
];

const FEATURES = [
  { icon: Shield, title: "Secure & Licensed", desc: "Your data and funds are protected with industry-standard encryption." },
  { icon: Clock, title: "24/7 Availability", desc: "Play anytime, anywhere. Our platform is always open for you." },
  { icon: Headphones, title: "Round-the-Clock Support", desc: "Our support team is available 24/7 to help with any questions." },
  { icon: Award, title: "Trusted by Players", desc: "Bangladesh's most trusted online gaming platform with 500K+ players." },
  { icon: Users, title: "Community Focused", desc: "Built for Bangladeshi players, with local payment methods and BDT support." },
  { icon: Zap, title: "Instant Transactions", desc: "Fast deposits and withdrawals via bKash, Nagad, Rocket, and more." },
];

export default function AboutPage() {
  return (
    <div className="space-y-8 px-3 py-4 sm:px-5 sm:py-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#2a2c30] bg-gradient-to-br from-[#1b1c1e] via-[#242628] to-[#1b1c1e] p-8 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,141,91,0.15), transparent 60%)" }}
        />
        <div className="relative">
          <span className="text-5xl">🎮</span>
          <h1 className="mt-4 text-3xl font-bold text-[#f0f0f0] sm:text-4xl">About {SITE.name}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#9ca3af] sm:text-base">
            {SITE.tagline}. We provide a safe, secure, and entertaining online gaming experience for players across Bangladesh.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5 text-center">
            <p className="text-2xl font-bold text-[#ffdf19] sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs text-[#9ca3af] sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6">
        <h2 className="text-lg font-bold text-[#f0f0f0]">Our Story</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#9ca3af]">
          <p>
            {SITE.name} was founded with a simple mission: to bring world-class online gaming to Bangladesh. We saw a gap in the market for a platform that truly understood Bangladeshi players — one that offered local payment methods, BDT currency support, and games that resonate with our community.
          </p>
          <p>
            Today, {SITE.name} is one of the leading online gaming platforms in Bangladesh, offering a wide range of games including sports betting, cricket, live casino, slots, cockfighting, fishing games, lottery, arcade games, and crash games. We partner with the world-class game providers including Pragmatic Play, Evolution, JILI, PG Soft, and more.
          </p>
          <p>
            We are committed to responsible gaming and the safety of our players. Our platform uses industry-standard encryption to protect your data and funds, and we offer 24/7 support to ensure you always have help when you need it.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-[#f0f0f0]">Why Choose {SITE.name}?</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#008d5b]/15">
                  <Icon className="h-5 w-5 text-[#00a86d]" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#f0f0f0]">{feature.title}</h3>
                <p className="mt-1 text-xs text-[#9ca3af]">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-[#ffdf19]/30 bg-gradient-to-r from-[#1b1c1e] via-[#242628] to-[#1b1c1e] p-6 text-center">
        <h2 className="text-lg font-bold text-[#ffdf19]">Ready to start playing?</h2>
        <p className="mt-1 text-sm text-[#9ca3af]">Join thousands of players across Bangladesh today.</p>
        <Link href="/register" className="btn-primary mt-4 inline-block px-6 py-2.5 text-sm font-semibold">
          Create Free Account
        </Link>
      </section>
    </div>
  );
}
