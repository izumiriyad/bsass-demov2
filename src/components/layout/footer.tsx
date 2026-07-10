import Link from "next/link";
import { PAYMENT_OPTIONS, PROVIDERS, SITE } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[#2a2c30] bg-[#11120f] px-4 py-8 text-[#9ca3af] sm:px-6">
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="bsl-logo text-3xl font-black"><span className="bsl-main">BSL</span><span className="bsl-sub ml-1">Gaming</span></div>
          <p className="mt-3 max-w-xl text-sm leading-6">{SITE.description}</p>
          <p className="mt-3 max-w-xl text-xs leading-5 text-[#7d8078]">18+ only. Please play responsibly. Real-money operation requires applicable licensing, KYC/AML controls, payment compliance and responsible-gaming safeguards.</p>
          <div className="mt-4 flex flex-wrap gap-2">{PAYMENT_OPTIONS.map((p) => <span key={p.id} className="rounded-full bg-[#1b1c1e] px-3 py-1 text-xs font-bold">{p.emoji} {p.name}</span>)}</div>
        </div>
        <div><h3 className="text-sm font-black uppercase text-[#f0f0f0]">Providers</h3><div className="mt-3 grid grid-cols-2 gap-2">{PROVIDERS.map((p) => <span key={p.name} className="text-xs font-semibold">{p.emoji} {p.name}</span>)}</div></div>
        <div><h3 className="text-sm font-black uppercase text-[#f0f0f0]">Support</h3><div className="mt-3 grid gap-2 text-sm"><Link href="/help">Help Page</Link><Link href="/terms">Terms & Conditions</Link><Link href="/privacy">Privacy Policy</Link><Link href="/responsible-gaming">Responsible Gaming</Link><Link href="/bonus-terms">Bonus Terms</Link><Link href="/fair-play">Fair Play</Link><Link href="/withdrawal-policy">Withdrawal Policy</Link><Link href="/aml-policy">AML Policy</Link><Link href="/kyc-policy">KYC Policy</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/accessibility">Accessibility</Link><Link href="/complaints">Complaints</Link><Link href="/status">System Status</Link><Link href="/support">Contact Us</Link></div></div>
      </div>
      <div className="mt-6 border-t border-[#2a2c30] pt-4 text-xs">© 2026 {SITE.name}. Bangladesh-focused BDT gaming experience.</div>
    </footer>
  );
}
