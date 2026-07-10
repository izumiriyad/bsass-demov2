"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Copy, Users, DollarSign, TrendingUp, Link as LinkIcon, QrCode, BarChart3, MessageSquareText } from "lucide-react";
import { formatBDT } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

export default function AffiliatePage() {
  const { user } = useAuth();
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const promoText = `🔥 Join BSL Gaming - Bangladesh's #1 Platform! 🔥\n\n🎁 Get ৳500 Free Bonus Instantly!\n⚡️ Instant bKash/Nagad Withdrawals\n💎 VIP Cashbacks up to 5%\n\nRegister now using my official link:\nhttps://bslgaming.com.bd/join?ref=${user?.username || 'agent'}`;

  if (!user) {
    return (
      <div className="space-y-6 px-3 py-6 sm:px-5 pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b1c1e] to-[#242628] p-8 text-center shadow-2xl border border-[#ffdf19]/20">
          <div className="absolute -left-10 -top-10 opacity-10"><Users size={150} /></div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-gold-gradient tracking-tight drop-shadow-md">BSL Master Agent</h1>
          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-[#9ca3af]">
            Take control of your wealth. Join the most lucrative B2B affiliate program in Bangladesh. Earn up to <span className="text-[#00a86d] font-bold">45% Lifetime Revenue Share</span> on every player you refer.
          </p>
          <Link href="/register" className="btn-primary mt-8 inline-block px-10 py-4 font-black uppercase tracking-widest shadow-xl shadow-[#008d5b]/20">Become a Master Agent</Link>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6 text-center hover:bg-[#242628] transition">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#008d5b] to-[#00a86d] text-white shadow-lg"><TrendingUp size={24} /></div>
            <h3 className="mt-4 font-black text-white text-lg">45% RevShare</h3>
            <p className="mt-2 text-xs text-[#9ca3af] leading-relaxed">The highest commission rate in the BD market. You earn when the house earns, for life.</p>
          </div>
          <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6 text-center hover:bg-[#242628] transition">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#ffdf19] to-[#f5a400] text-[#241a05] shadow-lg"><DollarSign size={24} /></div>
            <h3 className="mt-4 font-black text-white text-lg">Weekly Payouts</h3>
            <p className="mt-2 text-xs text-[#9ca3af] leading-relaxed">No waiting. Withdraw your commissions every Monday directly to bKash or local bank.</p>
          </div>
          <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6 text-center hover:bg-[#242628] transition">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white shadow-lg"><BarChart3 size={24} /></div>
            <h3 className="mt-4 font-black text-white text-lg">Live Analytics</h3>
            <p className="mt-2 text-xs text-[#9ca3af] leading-relaxed">Track every click, registration, and deposit in real-time through your B2B dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-3 py-5 sm:px-5 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2c30] pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2"><BarChart3 className="text-[#00a86d]" /> Master Agent Dashboard</h1>
          <p className="text-xs text-[#9ca3af] mt-1">ID: BSL-AGT-{user.id.substring(0,6).toUpperCase()}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded bg-[#ffdf19]/10 border border-[#ffdf19]/30 px-3 py-1.5 text-sm font-black text-[#ffdf19] shadow-[0_0_10px_rgba(255,223,25,0.1)]">Level 2 (35% Tier)</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#00a86d]/30 bg-gradient-to-br from-[#1b1c1e] to-[#008d5b]/10 p-5 shadow-lg">
          <p className="text-xs text-[#9ca3af] font-bold uppercase tracking-wider mb-1">Withdrawable Commission</p>
          <p className="text-3xl font-black text-[#00a86d]">{formatBDT(45800)}</p>
          <button className="mt-4 w-full rounded-lg bg-[#008d5b] py-2.5 text-sm font-bold text-white hover:bg-[#00a86d] shadow-[0_5px_15px_rgba(0,141,91,0.3)] active:scale-95 transition">Request Payout</button>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-[#9ca3af] font-bold uppercase tracking-wider mb-1">Total Referrals (Network)</p>
            <p className="text-3xl font-black text-white">1,248</p>
          </div>
          <p className="text-xs text-[#00a86d] font-bold flex items-center gap-1 mt-4"><TrendingUp size={12} /> +24 new this week</p>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-[#9ca3af] font-bold uppercase tracking-wider mb-1">Active Players (30d)</p>
            <p className="text-3xl font-black text-white">492</p>
          </div>
          <p className="text-xs text-[#00a86d] font-bold flex items-center gap-1 mt-4"><TrendingUp size={12} /> +5% retention vs last month</p>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-[#9ca3af] font-bold uppercase tracking-wider mb-1">Total NGR Generated</p>
            <p className="text-3xl font-black text-[#ffdf19]">{formatBDT(1240000)}</p>
          </div>
          <div className="h-1.5 w-full bg-[#121315] rounded-full overflow-hidden mt-4">
            <div className="h-full bg-[#ffdf19] w-[75%]"></div>
          </div>
          <p className="text-[10px] text-[#6b7280] mt-1 text-right">75% to Level 3 Tier</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Analytics Chart Simulation */}
        <div className="lg:col-span-2 rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6">
          <h2 className="font-bold text-white mb-6">Last 7 Days Revenue (BDT)</h2>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[4500, 7200, 3100, 9800, 12500, 8400, 15600].map((val, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="text-[10px] text-[#ffdf19] font-bold opacity-0 group-hover:opacity-100 transition">{val/1000}K</div>
                <div 
                  className="w-full bg-gradient-to-t from-[#008d5b] to-[#00a86d] rounded-t-sm transition-all duration-500 hover:brightness-125"
                  style={{ height: `${(val / 15600) * 100}%` }}
                ></div>
                <div className="text-[10px] text-[#6b7280]">Day {i+1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MLM Tier Visualizer */}
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6">
          <h2 className="font-bold text-white mb-6">Commission Structure</h2>
          <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 before:w-[2px] before:bg-[#2a2c30]">
            <div className="relative flex items-center gap-4">
              <div className="h-6 w-6 shrink-0 rounded-full bg-[#008d5b] border-4 border-[#1b1c1e] z-10 flex items-center justify-center"></div>
              <div className="flex-1 bg-[#121315] p-3 rounded-lg border border-[#2a2c30]">
                <p className="text-[10px] text-[#9ca3af] font-bold uppercase">Direct Referrals (Level 1)</p>
                <p className="text-lg font-black text-white">45% <span className="text-xs font-normal text-[#6b7280]">RevShare</span></p>
              </div>
            </div>
            <div className="relative flex items-center gap-4">
              <div className="h-6 w-6 shrink-0 rounded-full bg-[#ffdf19] border-4 border-[#1b1c1e] z-10 flex items-center justify-center"></div>
              <div className="flex-1 bg-[#121315] p-3 rounded-lg border border-[#2a2c30]">
                <p className="text-[10px] text-[#9ca3af] font-bold uppercase">Sub-Agents (Level 2)</p>
                <p className="text-lg font-black text-white">15% <span className="text-xs font-normal text-[#6b7280]">RevShare</span></p>
              </div>
            </div>
            <div className="relative flex items-center gap-4">
              <div className="h-6 w-6 shrink-0 rounded-full bg-[#3b82f6] border-4 border-[#1b1c1e] z-10 flex items-center justify-center"></div>
              <div className="flex-1 bg-[#121315] p-3 rounded-lg border border-[#2a2c30]">
                <p className="text-[10px] text-[#9ca3af] font-bold uppercase">Network (Level 3)</p>
                <p className="text-lg font-black text-white">5% <span className="text-xs font-normal text-[#6b7280]">RevShare</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6">
          <h2 className="font-bold text-white flex items-center gap-2 mb-6"><LinkIcon size={18} className="text-[#ffdf19]" /> Referral Links & Assets</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-bold text-[#9ca3af] uppercase">Primary Referral Link</label>
              <div className="flex items-center gap-0">
                <input type="text" readOnly value={`https://bslgaming.com.bd/join?ref=${user.username}`} className="w-full rounded-l-lg border border-[#2a2c30] bg-[#121315] px-4 py-3 text-sm font-mono text-[#f0f0f0] outline-none" />
                <button onClick={() => handleCopy(`https://bslgaming.com.bd/join?ref=${user.username}`)} className="shrink-0 rounded-r-lg bg-[#ffdf19] px-5 py-3 text-sm font-bold text-[#241a05] hover:brightness-110 border border-[#ffdf19] flex items-center gap-2"><Copy size={16}/> Copy</button>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-[#9ca3af] uppercase">Downloadable QR Code</label>
              <div className="flex items-center gap-5 bg-[#121315] p-4 rounded-xl border border-[#2a2c30]">
                <div className="flex shrink-0 items-center justify-center rounded-lg bg-white p-2">
                  <QrCode size={80} className="text-black" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Offline Marketing QR</p>
                  <p className="text-xs text-[#9ca3af] leading-relaxed">Print this QR code on flyers or share in physical locations. Scans auto-tag players to your ID.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Toolkit */}
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-6">
          <h2 className="font-bold text-white flex items-center gap-2 mb-6"><MessageSquareText size={18} className="text-[#00a86d]" /> WhatsApp/Telegram Promo Kit</h2>
          <p className="text-xs text-[#9ca3af] mb-4">Copy and paste this high-converting message directly to your social groups to instantly acquire players.</p>
          
          <div className="relative">
            <textarea 
              readOnly 
              className="w-full h-48 rounded-xl border border-[#2a2c30] bg-[#121315] p-4 text-sm text-[#f0f0f0] outline-none font-mono resize-none leading-relaxed"
              value={promoText}
            />
            <button 
              onClick={() => handleCopy(promoText)}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-[#008d5b] px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-[#00a86d] active:scale-95 transition"
            >
              <Copy size={14} /> Copy Text
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
