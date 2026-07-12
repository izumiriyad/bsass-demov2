"use client";

import Link from "next/link";

const PROVIDERS = [
  { id: "jili",      name: "JILI",      logo: "JL",  color: "#e2136e", bg: "#1a0010", href: "/slots?provider=jili",      games: "100+" },
  { id: "evolution", name: "Evolution", logo: "EVO", color: "#c8a44a", bg: "#1a1600", href: "/casino?provider=evolution", games: "80+" },
  { id: "spribe",    name: "Spribe",    logo: "SPR", color: "#3b82f6", bg: "#00101a", href: "/crash?provider=spribe",     games: "12+" },
  { id: "pgsoft",    name: "PG Soft",   logo: "PG",  color: "#22c55e", bg: "#001a08", href: "/slots?provider=pgsoft",    games: "150+" },
  { id: "fc",        name: "FC",        logo: "FC",  color: "#ef4444", bg: "#1a0000", href: "/slots?provider=fc",        games: "60+" },
  { id: "jdb",       name: "JDB",       logo: "JDB", color: "#f59e0b", bg: "#1a1000", href: "/slots?provider=jdb",       games: "70+" },
  { id: "sexy",      name: "AE Sexy",   logo: "SEX", color: "#a855f7", bg: "#0f0015", href: "/casino?provider=sexy",    games: "30+" },
  { id: "pp",        name: "Pragmatic", logo: "PP",  color: "#f97316", bg: "#1a0a00", href: "/slots?provider=pp",       games: "200+" },
  { id: "heyvip",   name: "HeyVIP",    logo: "HV",  color: "#008d5b", bg: "#001510", href: "/slots?provider=heyvip",   games: "50+" },
  { id: "sv388",     name: "SV388",     logo: "SV",  color: "#dc2626", bg: "#1a0000", href: "/cockfighting",             games: "Live" },
  { id: "yesbingo",  name: "YesBingo",  logo: "YB",  color: "#06b6d4", bg: "#001018", href: "/lottery",                  games: "20+" },
  { id: "spade",     name: "Spade",     logo: "SP",  color: "#64748b", bg: "#0a0e14", href: "/fishing",                  games: "40+" },
];

export function ProvidersCarousel() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="section-title-bar" />
        <span className="text-lg">🏢</span>
        <h2 className="text-sm font-black uppercase tracking-wide text-[#f0f0f0] sm:text-base">
          Game Providers <span className="ml-1 text-xs font-semibold text-[#9ca3af]">প্রভাইডার</span>
        </h2>
        <Link href="/popular" className="ml-auto text-xs font-semibold text-[#ffdf19] hover:underline">
          All Games →
        </Link>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
        {PROVIDERS.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className="group shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#2a2c30] p-4 min-w-[90px] sm:min-w-[100px] transition-all hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] active:scale-95"
            style={{ background: p.bg }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-black"
              style={{ borderColor: `${p.color}40`, background: `${p.color}15`, color: p.color }}
            >
              {p.logo}
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-white leading-none">{p.name}</p>
              <p className="text-[8px] mt-0.5 font-bold" style={{ color: p.color }}>{p.games} games</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
