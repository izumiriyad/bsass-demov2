import Link from "next/link";
import { HeroBanner } from "@/components/bsl/hero-banner";
import { CategoryTabs } from "@/components/bsl/category-tabs";
import { SponsorStrip, NewMemberGuide } from "@/components/bsl/trust-sections";
import { GameSection } from "@/components/bsl/game-section";
import { POPULAR_GAMES, SPORTS_GAMES_LIST, CASINO_GAMES, SLOTS_GAMES } from "@/lib/catalog";

export const metadata = { title: "বাংলা" };

export default function BanglaHomePage() {
  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6">
      <section className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">বাংলাদেশ</p>
        <h1 className="mt-2 text-2xl font-black text-[#f0f0f0] sm:text-4xl">BSL Gaming বাংলা অভিজ্ঞতা</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#9ca3af]">ক্রিকেট বাজি, লাইভ ক্যাসিনো, স্লট, ফিশিং, ক্র্যাশ, প্রোমোশন এবং BDT ওয়ালেট—সবকিছু বাংলাদেশি ব্যবহারকারীদের জন্য ডিজাইন করা।</p>
        <div className="mt-4 flex flex-wrap gap-3"><Link href="/register" className="rounded-lg bg-[#ffdf19] px-5 py-3 text-sm font-black text-[#241a05]">অ্যাকাউন্ট খুলুন</Link><Link href="/guide" className="rounded-lg bg-[#242628] px-5 py-3 text-sm font-bold text-[#f0f0f0]">নতুন সদস্য গাইড</Link></div>
      </section>
      <HeroBanner />
      <SponsorStrip />
      <CategoryTabs />
      <NewMemberGuide />
      <GameSection title="জনপ্রিয়" emoji="⭐" games={POPULAR_GAMES} href="/popular" columns={10} />
      <GameSection title="স্পোর্টস" emoji="🏏" games={SPORTS_GAMES_LIST} href="/sports" columns={10} />
      <GameSection title="ক্যাসিনো" emoji="♠️" games={CASINO_GAMES} href="/casino" columns={10} />
      <GameSection title="স্লট" emoji="🎰" games={SLOTS_GAMES} href="/slots" columns={10} />
    </div>
  );
}
