import type { Metadata } from "next";
export const metadata: Metadata = { title: "Winner Wall – BSL Gaming" };

const WINNERS = [
  { name: "Rahim***",  prize: 82500,  game: "Cricket Parlay",    time: "2 mins ago",    emoji: "🏏", badge: "BIGGEST WIN" },
  { name: "Nadia***",  prize: 45200,  game: "Gates of Olympus", time: "8 mins ago",    emoji: "⚡", badge: null },
  { name: "Karim***",  prize: 39100,  game: "Aviator",           time: "14 mins ago",   emoji: "🚀", badge: null },
  { name: "Sadia***",  prize: 24400,  game: "Baccarat Live",     time: "21 mins ago",   emoji: "🃏", badge: null },
  { name: "Jamal***",  prize: 19800,  game: "JILI Slots",        time: "35 mins ago",   emoji: "🎰", badge: null },
  { name: "Mitu***",   prize: 14600,  game: "Football Live",     time: "1 hour ago",    emoji: "⚽", badge: null },
  { name: "Sajib***",  prize: 12450,  game: "Happy Fishing",     time: "1.5 hrs ago",   emoji: "🎣", badge: null },
  { name: "Ayesha***", prize: 9800,   game: "Lightning Roulette",time: "2 hours ago",   emoji: "🎡", badge: null },
  { name: "Tanvir***", prize: 8200,   game: "Dragon Tiger",      time: "3 hours ago",   emoji: "🐉", badge: null },
  { name: "Lima***",   prize: 7100,   game: "Crazy Time",        time: "4 hours ago",   emoji: "🎪", badge: null },
  { name: "Rasel***",  prize: 5800,   game: "Plinko",            time: "5 hours ago",   emoji: "🎯", badge: null },
  { name: "Shila***",  prize: 4900,   game: "SV388 Derby",       time: "6 hours ago",   emoji: "🐓", badge: null },
];

const GAMES = ["All Games", "Cricket", "Casino", "Slots", "Crash", "Sports", "Fishing"];

export default function WinnersPage() {
  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1400] via-[#241a05] to-[#1b1c1e] border border-[#ffdf19]/20 p-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,223,25,0.15),transparent_70%)]" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19] mb-2">Live Proof</p>
          <h1 className="text-2xl font-black text-white sm:text-3xl">Winner Wall</h1>
          <p className="mt-2 text-sm text-[#9ca3af]">Real winnings from real BSL Gaming members — updated every minute.</p>
          <div className="mt-4 grid grid-cols-3 gap-3 max-w-md mx-auto">
            {[
              { label: "Total Paid Out Today", val: "৳12.4 Cr" },
              { label: "Winners Today", val: "1,284" },
              { label: "Biggest Win", val: "৳82,500" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <p className="text-sm font-black text-[#ffdf19]">{s.val}</p>
                <p className="text-[9px] text-[#9ca3af] font-bold mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {GAMES.map((g, i) => (
          <button
            key={g}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
              i === 0
                ? "border-[#ffdf19]/50 bg-[#ffdf19]/10 text-[#ffdf19]"
                : "border-[#2a2c30] bg-[#1b1c1e] text-[#9ca3af] hover:text-white"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Winners grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {WINNERS.map((w, i) => (
          <div
            key={w.name}
            className={`relative rounded-2xl border p-5 transition-all hover:scale-[1.01] ${
              i === 0
                ? "border-[#ffdf19]/40 bg-gradient-to-br from-[#1c1400] to-[#241a05] shadow-[0_0_20px_rgba(255,223,25,0.1)]"
                : "border-[#2a2c30] bg-[#1b1c1e]"
            }`}
          >
            {w.badge && (
              <span className="absolute -top-2 left-4 rounded-full bg-[#ffdf19] px-2.5 py-0.5 text-[9px] font-black text-[#241a05] shadow-lg">
                {w.badge}
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl ${i === 0 ? "bg-[#ffdf19]/20 border-2 border-[#ffdf19]/40" : "bg-[#242628]"}`}>
                {w.emoji}
              </div>
              <div>
                <p className={`text-sm font-black ${i === 0 ? "text-[#ffdf19]" : "text-white"}`}>{w.name}</p>
                <p className="text-[10px] text-[#6b7280]">{w.time}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#9ca3af] mb-1">{w.game}</p>
              <p className={`text-2xl font-black ${i === 0 ? "text-[#ffdf19]" : "text-[#22c55e]"}`}>
                ৳{w.prize.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
