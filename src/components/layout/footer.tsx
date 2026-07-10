import Link from "next/link";
import { PAYMENT_OPTIONS, PROVIDERS, SITE } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[#2a2c30] bg-[#0c0d0f] px-4 py-8 text-[#9ca3af] sm:px-6">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="bsl-logo text-3xl font-black"><span className="bsl-main">BSL</span><span className="bsl-sub ml-1">Gaming</span></div>
          <p className="max-w-xl text-sm leading-6 text-[#9ca3af]">{SITE.description}</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-bold text-white">18+</span>
            <p className="max-w-xs text-[10px] leading-4 text-[#7d8078]">Play responsibly. Real-money operation requires applicable licensing, KYC/AML controls, and payment compliance.</p>
          </div>
          
          <div className="pt-2">
            <h3 className="text-xs font-black uppercase text-[#f0f0f0] mb-3">Accepted Payment Methods</h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center justify-center rounded bg-[#e2136e] px-3 py-1.5 shadow-sm">
                <span className="text-xs font-black text-white tracking-widest">bKash</span>
              </div>
              <div className="flex items-center justify-center rounded bg-gradient-to-r from-[#ec1c24] to-[#f47b20] px-3 py-1.5 shadow-sm">
                <span className="text-xs font-black text-white tracking-widest">NAGAD</span>
              </div>
              <div className="flex items-center justify-center rounded bg-[#8c1566] px-3 py-1.5 shadow-sm">
                <span className="text-xs font-black italic text-white tracking-wider">Rocket</span>
              </div>
              <div className="flex items-center justify-center rounded bg-[#0070ba] px-3 py-1.5 shadow-sm">
                <span className="text-xs font-black text-white tracking-wider">UPAY</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-black uppercase text-[#f0f0f0] mb-4">Gaming Providers</h3>
          <div className="grid grid-cols-2 gap-3">
            {PROVIDERS.map((p) => (
              <span key={p.name} className="flex items-center gap-2 text-xs font-semibold text-[#9ca3af] transition hover:text-white">
                <span className="text-sm">{p.emoji}</span> {p.name}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-black uppercase text-[#f0f0f0] mb-4">Support & Info</h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs font-semibold text-[#9ca3af]">
            <Link href="/help" className="hover:text-white transition">Help Center</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/responsible-gaming" className="hover:text-white transition">Responsible Gaming</Link>
            <Link href="/bonus-terms" className="hover:text-white transition">Bonus Terms</Link>
            <Link href="/withdrawal-policy" className="hover:text-white transition">Withdrawal Policy</Link>
            <Link href="/aml-policy" className="hover:text-white transition">AML Policy</Link>
            <Link href="/support" className="hover:text-[#ffdf19] transition">24/7 Live Chat</Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-[#2a2c30] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#6b7280]">
          © 2026 {SITE.name}. Bangladesh's Premium Gaming Exchange.
        </div>
        <div className="flex gap-2 opacity-60">
          <div className="h-6 w-10 rounded border border-[#2a2c30] bg-[#1b1c1e]" />
          <div className="h-6 w-10 rounded border border-[#2a2c30] bg-[#1b1c1e]" />
          <div className="h-6 w-10 rounded border border-[#2a2c30] bg-[#1b1c1e]" />
        </div>
      </div>
    </footer>
  );
}
