import Link from "next/link";

const sponsorTeams = [
  { name: "Rajshahi Royals", tag: "Cricket Partner", emoji: "🏏" },
  { name: "Dhaka Tigers", tag: "Sports Partner", emoji: "🐯" },
  { name: "Chattogram Kings", tag: "Premier Partner", emoji: "👑" },
  { name: "Sylhet Strikers", tag: "Community Partner", emoji: "⚡" },
  { name: "Khulna Warriors", tag: "Regional Partner", emoji: "🛡️" },
];

const allianceBrands = [
  { name: "BSL Sports", bonus: "Cricket & football live odds", payout: "Instant settlement UI", winrate: "Live markets", emoji: "🏏", href: "/sports" },
  { name: "BSL Casino", bonus: "Live baccarat, roulette, blackjack", payout: "BDT wallet ready", winrate: "24/7 tables", emoji: "♠️", href: "/casino" },
  { name: "BSL Slots", bonus: "JILI & Pragmatic slot lobby", payout: "Fast launch", winrate: "Hot jackpots", emoji: "🎰", href: "/slots" },
  { name: "BSL VIP", bonus: "VIP rewards and cashback", payout: "Priority support", winrate: "Tier benefits", emoji: "👑", href: "/vip" },
];

const guideSteps = [
  { title: "Register", bn: "রেজিস্টার", body: "Create account with Bangladesh mobile OTP.", emoji: "📱" },
  { title: "Verify", bn: "ভেরিফাই", body: "Complete NID/address verification before higher limits.", emoji: "🛡️" },
  { title: "Deposit", bn: "ডিপোজিট", body: "Use bKash, Nagad, Rocket, Upay or bank transfer.", emoji: "💳" },
  { title: "Play responsibly", bn: "দায়িত্বশীল খেলা", body: "Set limits, take breaks and track activity.", emoji: "✅" },
];

export function SponsorStrip() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-black uppercase text-[#f0f0f0]">Bangladesh Sports Partners</h2>
        <Link href="/ambassador" className="text-xs font-bold text-[#ffdf19]">Become Partner →</Link>
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {sponsorTeams.map((team) => (
          <article key={team.name} className="flex min-w-[210px] items-center gap-3 rounded-xl bg-[#121315] p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#008d5b]/15 text-2xl">{team.emoji}</div>
            <div className="min-w-0"><p className="truncate text-sm font-black text-[#f0f0f0]">{team.name}</p><p className="truncate text-xs text-[#9ca3af]">{team.tag}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AlliancePreview() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2"><span className="section-title-bar" /><span className="text-lg">🧩</span><h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">BSL Verified Network</h2><Link href="/brands" className="ml-auto text-xs font-semibold text-[#ffdf19]">View All →</Link></div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {allianceBrands.map((brand) => (
          <Link key={brand.name} href={brand.href} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4 transition hover:-translate-y-1 hover:border-[#ffdf19]/50">
            <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffdf19]/10 text-2xl">{brand.emoji}</div><div><h3 className="font-black text-[#f0f0f0]">{brand.name}</h3><p className="text-xs text-[#9ca3af]">Verified BSL product</p></div></div>
            <div className="mt-4 space-y-2 text-xs text-[#d8d2bf]"><p>🎁 {brand.bonus}</p><p>⚡ {brand.payout}</p><p>📈 {brand.winrate}</p></div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function NewMemberGuide() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2"><span className="section-title-bar" /><span className="text-lg">🧭</span><h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0] sm:text-base">New Member Guide</h2><Link href="/guide" className="ml-auto text-xs font-semibold text-[#ffdf19]">Open Guide →</Link></div>
      <div className="grid gap-3 md:grid-cols-4">
        {guideSteps.map((step, index) => (
          <article key={step.title} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
            <div className="flex items-center justify-between"><span className="text-3xl">{step.emoji}</span><span className="rounded-full bg-[#242628] px-2 py-1 text-xs font-black text-[#ffdf19]">0{index + 1}</span></div>
            <h3 className="mt-3 text-base font-black text-[#f0f0f0]">{step.title} <span className="text-xs text-[#9ca3af]">{step.bn}</span></h3>
            <p className="mt-2 text-xs leading-5 text-[#9ca3af]">{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export { allianceBrands, guideSteps };
