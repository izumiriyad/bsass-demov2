"use client";

import Link from "next/link";

const AMBASSADORS = [
  {
    id: "mashrafe",
    name: "Mashrafe Mortaza",
    role: "Cricket Legend",
    nameLocal: "মাশরাফি মুর্তজা",
    sport: "🏏",
    badge: "BRAND AMBASSADOR",
    badgeColor: "#ffdf19",
    description: "Former Bangladesh Cricket Captain & National Icon",
    grad1: "#0a1a0a",
    grad2: "#0f2d14",
    accentColor: "#22c55e",
    href: "/ambassador",
    stats: { matches: "220+", fans: "5M+", since: "2023" },
  },
  {
    id: "sakib",
    name: "Shakib Al Hasan",
    role: "All-Rounder Icon",
    nameLocal: "সাকিব আল হাসান",
    sport: "🏏",
    badge: "SPORTS PARTNER",
    badgeColor: "#ef4444",
    description: "World's Best All-Rounder & Bangladesh Star",
    grad1: "#1a0a0a",
    grad2: "#2d0f0f",
    accentColor: "#ef4444",
    href: "/ambassador",
    stats: { matches: "400+", fans: "8M+", since: "2024" },
  },
  {
    id: "jili-star",
    name: "JILI Gaming",
    role: "Official Game Partner",
    nameLocal: "জিলি গেমিং",
    sport: "🎰",
    badge: "GAME PARTNER",
    badgeColor: "#a855f7",
    description: "Exclusive JILI Partner — Bangladesh's #1 Slots Provider",
    grad1: "#0a001a",
    grad2: "#1a0030",
    accentColor: "#a855f7",
    href: "/slots",
    stats: { games: "100+", players: "2M+", since: "2022" },
  },
  {
    id: "bpl-partner",
    name: "Bangladesh Premier League",
    role: "Official Betting Partner",
    nameLocal: "বাংলাদেশ প্রিমিয়ার লিগ",
    sport: "🏆",
    badge: "OFFICIAL PARTNER",
    badgeColor: "#008d5b",
    description: "Official odds & betting partner of BPL 2025",
    grad1: "#001510",
    grad2: "#002820",
    accentColor: "#008d5b",
    href: "/sports",
    stats: { teams: "10", seasons: "3+", matches: "500+" },
  },
];

export function BrandAmbassadors() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-lg">🌟</span>
        <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
          Brand Ambassadors{" "}
          <span className="ml-1 text-xs font-semibold text-[#9ca3af]">ব্র্যান্ড অ্যাম্বাসেডর</span>
        </h2>
        <Link href="/ambassador" className="ml-auto text-xs font-semibold text-[#ffdf19] hover:underline">
          All Ambassadors →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {AMBASSADORS.map((amb) => (
          <Link
            key={amb.id}
            href={amb.href}
            className="group relative overflow-hidden rounded-2xl border border-[#2a2c30] transition-all hover:-translate-y-1 hover:border-[#ffdf19]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] active:scale-[.98]"
            style={{ background: `linear-gradient(145deg, ${amb.grad1}, ${amb.grad2})` }}
          >
            {/* Accent glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(ellipse at bottom, ${amb.accentColor}25, transparent 70%)` }}
            />

            {/* Badge */}
            <div className="px-3 pt-3">
              <span
                className="inline-block rounded-full px-2 py-0.5 text-[8px] font-black text-[#241a05]"
                style={{ background: amb.badgeColor }}
              >
                {amb.badge}
              </span>
            </div>

            {/* Avatar */}
            <div
              className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full border-2 text-4xl"
              style={{ borderColor: `${amb.accentColor}60`, background: `${amb.accentColor}20` }}
            >
              {amb.sport}
            </div>

            <div className="px-3 py-3">
              <p className="text-xs font-black text-white leading-tight">{amb.name}</p>
              <p className="text-[9px] font-bold mt-0.5" style={{ color: amb.accentColor }}>
                {amb.role}
              </p>
              <p className="text-[9px] text-[#9ca3af] mt-0.5 leading-snug">{amb.description}</p>

              {/* Stats row */}
              <div className="mt-2.5 flex justify-around border-t pt-2.5 border-white/10">
                {Object.entries(amb.stats).map(([k, v]) => (
                  <div key={k} className="text-center">
                    <p className="text-[10px] font-black text-white leading-none">{v}</p>
                    <p className="text-[8px] capitalize text-[#6b7280] leading-none mt-0.5">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
