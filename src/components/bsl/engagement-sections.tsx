import Link from "next/link";

const rewards = [
  { day: "Day 1", value: "৳20", state: "Ready" },
  { day: "Day 2", value: "৳30", state: "Tomorrow" },
  { day: "Day 3", value: "৳50", state: "Locked" },
  { day: "Day 7", value: "৳200", state: "Super" },
];

const winners = [
  { name: "Rahim***", prize: "৳82,500", game: "Cricket Parlay" },
  { name: "Nadia***", prize: "৳45,200", game: "Gates of Olympus" },
  { name: "Sajib***", prize: "৳19,800", game: "Aviator" },
  { name: "Mita***", prize: "৳12,450", game: "Baccarat" },
];

export function EngagementSections() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_.9fr]">
      <section className="rounded-2xl border border-[#2a2c30] bg-gradient-to-br from-[#4a0505] to-[#1b1c1e] p-5 bsl-card-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Limited Event</p>
            <h2 className="mt-2 text-2xl font-black text-white">Red Envelope Rain</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">Claim festival-style random rewards, deposit boosts and free spin envelopes during Bangladesh cricket nights.</p>
            <div className="mt-4 flex flex-wrap gap-2"><Link href="/red-envelope" className="rounded-lg bg-[#ffdf19] px-4 py-2 text-sm font-black text-[#241a05]">Open Envelopes</Link><Link href="/bonus-terms" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white">Terms</Link></div>
          </div>
          <div className="text-8xl drop-shadow-2xl">🧧</div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 bsl-card-glow">
        <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Daily Rewards</p><h2 className="mt-1 text-xl font-black text-[#f0f0f0]">Check-in Bonus</h2></div><Link href="/daily-check-in" className="text-xs font-bold text-[#ffdf19]">Claim →</Link></div>
        <div className="grid grid-cols-4 gap-2">{rewards.map((r)=><div key={r.day} className="rounded-xl bg-[#121315] p-3 text-center"><p className="text-[11px] font-bold text-[#9ca3af]">{r.day}</p><p className="mt-1 text-sm font-black text-[#ffdf19]">{r.value}</p><p className="mt-1 text-[10px] text-[#6b7280]">{r.state}</p></div>)}</div>
      </section>

      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5 xl:col-span-2">
        <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Live Proof</p><h2 className="mt-1 text-xl font-black text-[#f0f0f0]">Recent Big Winners</h2></div><Link href="/winners" className="text-xs font-bold text-[#ffdf19]">Winner Wall →</Link></div>
        <div className="grid gap-3 md:grid-cols-4">{winners.map((w)=><article key={w.name} className="rounded-xl border border-[#2a2c30] bg-[#121315] p-4"><p className="text-sm font-black text-[#f0f0f0]">{w.name}</p><p className="mt-2 text-2xl font-black text-[#22c55e]">{w.prize}</p><p className="mt-1 text-xs text-[#9ca3af]">{w.game}</p></article>)}</div>
      </section>
    </div>
  );
}
