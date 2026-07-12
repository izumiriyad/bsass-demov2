"use client";

import Link from "next/link";

const EVENTS = [
  {
    id: "daily-wins",
    title: "Daily Wins",
    subtitle: "Complete the wheel for weekly prize",
    prize: "৳9,00,00,000",
    prizeLabel: "PRIZE POOL",
    badge: "DAILY",
    badgeColor: "#f59e0b",
    bg1: "#1a0a00",
    bg2: "#3d1f00",
    accentColor: "#f97316",
    emoji: "🎡",
    href: "/promotions",
    endDate: "Resets daily",
    participants: "12,847",
  },
  {
    id: "fury-anubis",
    title: "Fury of Anubis",
    subtitle: "JILI Daily Tournaments",
    prize: "৳1,90,00,000",
    prizeLabel: "PRIZE POOL",
    badge: "TOURNAMENT",
    badgeColor: "#a855f7",
    bg1: "#0a001a",
    bg2: "#1f003d",
    accentColor: "#a855f7",
    emoji: "🏺",
    href: "/tournaments",
    endDate: "Ends Jul 31",
    participants: "8,291",
  },
  {
    id: "jili-win-daily",
    title: "JILI Win Daily",
    subtitle: "Play JILI • Win Daily",
    prize: "৳15,00,00,000",
    prizeLabel: "GRAND POOL",
    badge: "HOT",
    badgeColor: "#ef4444",
    bg1: "#001a0a",
    bg2: "#003d1f",
    accentColor: "#22c55e",
    emoji: "⚽",
    href: "/slots",
    endDate: "Ongoing",
    participants: "24,156",
  },
  {
    id: "bkash-lucky-draw",
    title: "bKash Lucky Draw",
    subtitle: "iPhone 16 Pro + ৳2 Lakh Cash",
    prize: "৳2,00,000+",
    prizeLabel: "TOP PRIZE",
    badge: "NEW",
    badgeColor: "#e2136e",
    bg1: "#1a0015",
    bg2: "#3d0031",
    accentColor: "#e2136e",
    emoji: "📱",
    href: "/promotions",
    endDate: "Ends Aug 15",
    participants: "31,042",
  },
  {
    id: "eid-special",
    title: "Festival Special",
    subtitle: "Exclusive BD festival bonus campaign",
    prize: "৳5,00,00,000",
    prizeLabel: "TOTAL BONUS",
    badge: "SPECIAL",
    badgeColor: "#008d5b",
    bg1: "#001510",
    bg2: "#003328",
    accentColor: "#008d5b",
    emoji: "🎊",
    href: "/promotions",
    endDate: "Limited time",
    participants: "19,884",
  },
];

export function EventsSection() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-lg">🏆</span>
        <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
          Events &amp; Tournaments <span className="ml-1 text-xs font-semibold text-[#9ca3af]">ইভেন্টস</span>
        </h2>
        <Link href="/tournaments" className="ml-auto text-xs font-semibold text-[#ffdf19] hover:underline">
          All Events →
        </Link>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
        {EVENTS.map((ev) => (
          <Link
            key={ev.id}
            href={ev.href}
            className="group relative shrink-0 w-[220px] sm:w-[260px] overflow-hidden rounded-2xl border border-[#2a2c30] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-[.98]"
            style={{ background: `linear-gradient(135deg, ${ev.bg1}, ${ev.bg2})` }}
          >
            {/* Glow overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `radial-gradient(ellipse at top, ${ev.accentColor}20, transparent 60%)` }}
            />

            {/* Badge */}
            <div className="absolute top-3 left-3">
              <span
                className="rounded-full px-2.5 py-1 text-[9px] font-black text-white"
                style={{ background: ev.badgeColor }}
              >
                {ev.badge}
              </span>
            </div>

            {/* Emoji */}
            <div
              className="absolute top-3 right-3 text-3xl"
              style={{ filter: `drop-shadow(0 0 12px ${ev.accentColor}80)` }}
            >
              {ev.emoji}
            </div>

            <div className="px-4 pt-12 pb-4">
              <h3 className="text-base font-black text-white leading-tight">{ev.title}</h3>
              <p className="text-[10px] text-[#9ca3af] mt-0.5 leading-snug">{ev.subtitle}</p>

              {/* Prize pool */}
              <div
                className="mt-3 rounded-xl border py-2 px-3 text-center"
                style={{ borderColor: `${ev.accentColor}40`, background: `${ev.accentColor}10` }}
              >
                <p
                  className="text-[8px] font-black uppercase tracking-widest"
                  style={{ color: ev.accentColor }}
                >
                  {ev.prizeLabel}
                </p>
                <p className="text-lg font-black text-white">{ev.prize}</p>
              </div>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[9px] text-[#6b7280]">
                  <p>👥 {ev.participants} joined</p>
                  <p>⏰ {ev.endDate}</p>
                </div>
                <span
                  className="rounded-lg px-3 py-1.5 text-[10px] font-black text-white transition group-hover:brightness-110"
                  style={{ background: ev.accentColor }}
                >
                  Join Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
