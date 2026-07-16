"use client";

import Link from "next/link";
import { Star, Camera, Users, Gift } from "lucide-react";


const BENEFITS = [
  { icon: "💰", title: "Monthly Salary", body: "৳20,000–৳100,000/month based on your audience size and engagement rate." },
  { icon: "🎁", title: "VIP Bonuses", body: "Diamond VIP status, exclusive deposits, and cashback perks for all ambassadors." },
  { icon: "🏆", title: "Performance Incentives", body: "Tiered bonus for bringing 100/500/1000+ active players per month." },
  { icon: "📱", title: "Dedicated Support", body: "Personal B2B manager, priority support channel and real-time analytics." },
  { icon: "🖼️", title: "Brand Assets", body: "Custom creatives, HD banners, and branded templates tailored to your audience." },
  { icon: "🎟️", title: "Event Invitations", body: "Exclusive invites to cricket stadium events, VIP boxes, and partner meetups." },
];

const REQUIREMENTS = [
  "Minimum 5,000 followers on Facebook, YouTube, or Instagram",
  "Active engagement rate (not just follower count)",
  "Content related to sports, cricket, or gaming in Bangladesh",
  "Age 18+ with valid National ID",
];

export default function AmbassadorPage() {
  return (
    <div className="space-y-5 px-3 py-5 sm:px-5 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1200] via-[#2d1e00] to-[#1b1c1e] border border-[#ffdf19]/20 p-6 md:p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,223,25,0.15),transparent_60%)]" />
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ffdf19]/10 border border-[#ffdf19]/30 px-3 py-1.5 mb-3">
              <Star size={12} className="text-[#ffdf19]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ffdf19]">Creator Club</span>
            </div>
            <h1 className="text-3xl font-black md:text-4xl">Become a BSL Gaming Ambassador</h1>
            <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-md">
              Join Bangladesh's most exclusive creator partnership program. Earn real income sharing what you love — sports, cricket, and winning.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] px-6 py-3.5 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110">
                ⭐ Apply Now — It's Free
              </a>
              <a href="#benefits" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/10">
                See Benefits →
              </a>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3">
            {[
              { label: "Active Ambassadors", val: "120+" },
              { label: "Avg. Monthly Earning", val: "৳45K" },
              { label: "Countries", val: "BD, IN, PK" },
              { label: "Total Paid Out", val: "৳2.4Cr" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
                <p className="text-xl font-black text-[#ffdf19]">{s.val}</p>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div id="benefits">
        <h2 className="mb-4 text-sm font-black text-white">Ambassador Benefits</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex gap-3 rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <span className="text-2xl shrink-0">{b.icon}</span>
              <div>
                <h3 className="text-xs font-black text-white">{b.title}</h3>
                <p className="mt-1 text-[11px] text-[#9ca3af] leading-relaxed">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who qualifies */}
      <div className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-[#ffdf19]" />
          <h2 className="text-sm font-black text-white">Who Can Apply?</h2>
        </div>
        <div className="space-y-2">
          {REQUIREMENTS.map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#9ca3af]">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#22c55e]/20 text-[#22c55e] text-[9px] font-black mt-0.5">✓</span>
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div>
        <h2 className="mb-4 text-sm font-black text-white">How it Works</h2>
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { step: "1", icon: "📝", title: "Apply", body: "Fill the form below with your social media links." },
            { step: "2", icon: "📞", title: "Verification", body: "Our team reviews and contacts you within 24–48hrs." },
            { step: "3", icon: "🎯", title: "Onboarding", body: "Get your creator kit, tracking links, and B2B manager." },
            { step: "4", icon: "💰", title: "Earn", body: "Start earning immediately. Paid every Monday." },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffdf19] text-sm font-black text-[#241a05] mb-3">{s.step}</div>
              <span className="text-xl">{s.icon}</span>
              <h3 className="mt-2 text-xs font-black text-white">{s.title}</h3>
              <p className="mt-1 text-[11px] text-[#9ca3af]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application form */}
      <div id="apply" className="rounded-2xl border border-[#ffdf19]/20 bg-[#1b1c1e] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Camera size={16} className="text-[#ffdf19]" />
          <h2 className="text-sm font-black text-white">Apply to be an Ambassador</h2>
        </div>
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert("Application submitted! We'll contact you within 48hrs."); }}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input type="text" placeholder="Full Name" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50" />
            <input type="tel" placeholder="Mobile Number (e.g. 01XXXXXXXXX)" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50" />
          </div>
          <input type="url" placeholder="Facebook / YouTube / Instagram URL" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50" />
          <select className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white outline-none focus:border-[#ffdf19]/50">
            <option value="">Platform Type</option>
            <option>Facebook Page / Group</option>
            <option>YouTube Channel</option>
            <option>Instagram</option>
            <option>Telegram Channel</option>
            <option>Other</option>
          </select>
          <input type="number" placeholder="Approx. Followers/Subscribers" className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50" />
          <textarea placeholder="Tell us about your content and audience..." className="w-full rounded-xl border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-[#ffdf19]/50 resize-none h-24" />
          <button type="submit" className="w-full rounded-xl bg-gradient-to-b from-[#ffdf19] to-[#f4a700] py-4 text-sm font-black text-[#241a05] border-b-[3px] border-[#c28400] transition hover:brightness-110 active:scale-[.98]">
            ⭐ Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
