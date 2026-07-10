"use client";

import { Download, Apple, MonitorSmartphone, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AppDownloadPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] shadow-[0_10px_30px_rgba(255,223,25,0.3)]">
          <Download size={40} className="text-[#241a05] animate-bounce" />
        </div>
        <h1 className="text-3xl font-black uppercase text-[#f0f0f0] tracking-tight">Install BSL App</h1>
        <p className="mx-auto mt-3 max-w-md text-[#9ca3af]">
          Get the ultimate betting experience directly on your home screen. Faster loading, exclusive app-only bonuses, and instant notifications.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        {/* iOS Guide */}
        <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Apple size={100} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white text-black rounded-lg">
              <Apple size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">iOS (iPhone/iPad)</h2>
          </div>
          <ol className="space-y-4 text-sm text-[#9ca3af] relative z-10">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffdf19] font-bold text-[#241a05]">1</span>
              <span>Open this website in <strong>Safari</strong> browser.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffdf19] font-bold text-[#241a05]">2</span>
              <span>Tap the <strong>Share</strong> button at the bottom of the screen.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffdf19] font-bold text-[#241a05]">3</span>
              <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
            </li>
          </ol>
        </div>

        {/* Android Guide */}
        <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <MonitorSmartphone size={100} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#22c55e] text-white rounded-lg">
              <MonitorSmartphone size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Android</h2>
          </div>
          <ol className="space-y-4 text-sm text-[#9ca3af] relative z-10">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffdf19] font-bold text-[#241a05]">1</span>
              <span>Open this website in <strong>Google Chrome</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffdf19] font-bold text-[#241a05]">2</span>
              <span>Tap the <strong>Menu (3 dots)</strong> at the top right.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffdf19] font-bold text-[#241a05]">3</span>
              <span>Tap <strong>Install App</strong> or <strong>Add to Home screen</strong>.</span>
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-[#008d5b]/30 bg-[#008d5b]/10 p-5 flex items-start gap-4">
        <ShieldCheck size={28} className="text-[#00a86d] shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-[#00a86d]">100% Safe & Secure</h3>
          <p className="text-sm text-[#d8d5c7] mt-1">
            Our Progressive Web App (PWA) bypasses the App Store to give you direct access without restrictions. It is fully encrypted and secure.
          </p>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <Link href="/" className="text-[#9ca3af] hover:text-white underline text-sm">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
