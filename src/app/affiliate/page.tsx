"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Copy, Users, DollarSign, TrendingUp, Link as LinkIcon, QrCode } from "lucide-react";
import { formatBDT } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

export default function AffiliatePage() {
  const { user } = useAuth();
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Affiliate link copied!");
  };

  if (!user) {
    return (
      <div className="space-y-6 px-3 py-6 sm:px-5">
        <div className="rounded-2xl border border-[#ffdf19]/20 bg-gradient-to-br from-[#1b1c1e] to-[#242628] p-6 text-center shadow-2xl">
          <h1 className="text-3xl font-black uppercase text-[#ffdf19]">BSL Partners</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#9ca3af]">Join the most lucrative affiliate program in Bangladesh. Earn up to 45% revenue share on every referred player.</p>
          <Link href="/register" className="btn-primary mt-6 inline-block px-8 py-3 font-bold">Become a Partner</Link>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#008d5b]/20 text-[#00a86d]"><TrendingUp size={24} /></div>
            <h3 className="mt-3 font-bold text-white">45% RevShare</h3>
            <p className="mt-1 text-xs text-[#9ca3af]">Industry leading commission rates.</p>
          </div>
          <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ffdf19]/20 text-[#ffdf19]"><DollarSign size={24} /></div>
            <h3 className="mt-3 font-bold text-white">Weekly Payouts</h3>
            <p className="mt-1 text-xs text-[#9ca3af]">Fast & secure payouts via local methods.</p>
          </div>
          <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#3b82f6]/20 text-[#3b82f6]"><Users size={24} /></div>
            <h3 className="mt-3 font-bold text-white">Dedicated Support</h3>
            <p className="mt-1 text-xs text-[#9ca3af]">1-on-1 VIP account manager.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-3 py-5 sm:px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white">Affiliate Dashboard</h1>
        <span className="rounded bg-[#008d5b]/20 px-2 py-1 text-xs font-bold text-[#00a86d]">Tier: Gold (35%)</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <p className="text-xs text-[#9ca3af]">Available Commission</p>
          <p className="mt-1 text-2xl font-black text-[#ffdf19]">{formatBDT(45800)}</p>
          <button className="mt-3 w-full rounded-lg bg-[#242628] py-2 text-xs font-bold text-white hover:bg-[#2d2f32]">Withdraw</button>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <p className="text-xs text-[#9ca3af]">Total Referrals</p>
          <p className="mt-1 text-2xl font-black text-white">1,248</p>
          <p className="mt-1 text-xs text-[#00a86d]">+24 this week</p>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <p className="text-xs text-[#9ca3af]">Active Players (30d)</p>
          <p className="mt-1 text-2xl font-black text-white">492</p>
          <p className="mt-1 text-xs text-[#00a86d]">+5% vs last month</p>
        </div>
        <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
          <p className="text-xs text-[#9ca3af]">Total Revenue Generated</p>
          <p className="mt-1 text-2xl font-black text-white">{formatBDT(1240000)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <h2 className="font-bold text-white">Your Referral Assets</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs text-[#9ca3af]">Default Referral Link</label>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#242628]"><LinkIcon size={16} className="text-[#9ca3af]" /></div>
              <input type="text" readOnly value={`https://bslgaming.com.bd/join?ref=${user.username}`} className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-3 py-2 text-sm text-[#f0f0f0] outline-none" />
              <button onClick={() => handleCopy(`https://bslgaming.com.bd/join?ref=${user.username}`)} className="shrink-0 rounded-lg bg-[#ffdf19] px-4 py-2 text-sm font-bold text-[#241a05] hover:brightness-110">Copy</button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#9ca3af]">QR Code</label>
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-[#2a2c30] bg-white text-black p-2">
                <QrCode size={80} />
              </div>
              <p className="text-xs text-[#9ca3af] max-w-[200px]">Players can scan this QR code to download the app and automatically register under your affiliate tree.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
