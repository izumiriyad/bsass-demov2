"use client";

import Link from "next/link";

const SPONSORSHIPS = [
  {
    id: "bpl",
    team: "Bangladesh Premier League",
    shortName: "BPL",
    tier: "TITLE SPONSOR",
    tierColor: "#ffdf19",
    years: "2024–2025",
    sport: "🏏",
    description: "Official title betting partner of BPL",
    bg1: "#001a0a", bg2: "#003320",
    accent: "#22c55e",
    href: "/sports",
  },
  {
    id: "rajshahi",
    team: "Rajshahi Royals",
    shortName: "RR",
    tier: "PLATINUM SPONSOR",
    tierColor: "#60a5fa",
    years: "2024–2025",
    sport: "🏏",
    description: "Platinum betting & jersey sponsor",
    bg1: "#00001a", bg2: "#00003d",
    accent: "#60a5fa",
    href: "/sports",
  },
  {
    id: "dhaka-tigers",
    team: "Dhaka Dominators",
    shortName: "DD",
    tier: "PREMIER SPONSOR",
    tierColor: "#f97316",
    years: "2024–2025",
    sport: "🏏",
    description: "Premier sponsorship & community partner",
    bg1: "#1a0800", bg2: "#3d1800",
    accent: "#f97316",
    href: "/sports",
  },
  {
    id: "chittagong",
    team: "Chattogram Kings",
    shortName: "CK",
    tier: "GOLD SPONSOR",
    tierColor: "#fbbf24",
    years: "2024",
    sport: "🏏",
    description: "Gold-tier official jersey sponsor",
    bg1: "#1a1400", bg2: "#3d3000",
    accent: "#fbbf24",
    href: "/sports",
  },
  {
    id: "sylhet",
    team: "Sylhet Strikers",
    shortName: "SS",
    tier: "REGIONAL PARTNER",
    tierColor: "#a855f7",
    years: "2023–2025",
    sport: "🏏",
    description: "Official regional betting partner",
    bg1: "#0f001a", bg2: "#25003d",
    accent: "#a855f7",
    href: "/sports",
  },
  {
    id: "khulna",
    team: "Khulna Tigers",
    shortName: "KT",
    tier: "COMMUNITY PARTNER",
    tierColor: "#34d399",
    years: "2024",
    sport: "🏏",
    description: "Community & outreach sponsor",
    bg1: "#001a10", bg2: "#003828",
    accent: "#34d399",
    href: "/sports",
  },
];

export function SponsorshipsSection() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-lg">🏆</span>
        <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
          Our Sponsorships{" "}
          <span className="ml-1 text-xs font-semibold text-[#9ca3af]">স্পনসরশিপ</span>
        </h2>
        <Link href="/sports" className="ml-auto text-xs font-semibold text-[#ffdf19] hover:underline">
          Bet on Cricket →
        </Link>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
        {SPONSORSHIPS.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            className="group relative shrink-0 w-[180px] overflow-hidden rounded-2xl border border-[#2a2c30] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-[.98]"
            style={{ background: `linear-gradient(145deg, ${s.bg1}, ${s.bg2})` }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `radial-gradient(circle at bottom, ${s.accent}20, transparent 60%)` }}
            />

            {/* Tier badge */}
            <div className="px-3 pt-3">
              <span
                className="inline-block rounded-full px-2 py-0.5 text-[8px] font-black text-[#121315]"
                style={{ background: s.tierColor }}
              >
                {s.tier}
              </span>
            </div>

            {/* Team icon */}
            <div className="mt-3 flex flex-col items-center gap-1">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl font-black"
                style={{ borderColor: `${s.accent}50`, background: `${s.accent}15`, color: s.accent }}
              >
                {s.sport}
              </div>
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-black text-white"
                style={{ background: `${s.accent}30` }}
              >
                {s.shortName}
              </div>
            </div>

            <div className="px-3 pb-4">
              <p className="mt-2 text-xs font-black text-white leading-tight text-center">{s.team}</p>
              <p className="text-[9px] text-center mt-0.5 text-[#9ca3af]">{s.description}</p>
              <p className="text-center mt-2" style={{ color: s.accent }}>
                <span className="text-[8px] font-black">{s.years}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
