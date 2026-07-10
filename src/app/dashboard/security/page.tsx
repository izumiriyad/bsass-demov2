import type { Metadata } from "next";
import { Shield, Lock, Smartphone } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { SecurityForm } from "./security-form";

export const metadata: Metadata = { title: "Security" };

export default async function SecurityPage() {
  const user = await getSessionUser();
  if (!user) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-[#00a86d]" />
        <h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">Security</h1>
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-[#00a86d]" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">Change Password</h2>
        </div>
        <SecurityForm />
      </div>

      <div className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-[#a855f7]" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#f0f0f0]">Two-Factor Authentication</h2>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#121315] p-4">
          <div>
            <p className="text-sm font-medium text-[#f0f0f0]">2FA Status</p>
            <p className="text-xs text-[#9ca3af]">Add an extra layer of security to your account</p>
          </div>
          <button type="button" className="relative h-6 w-11 rounded-full bg-[#2a2c30] transition">
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-[#9ca3af] transition" />
          </button>
        </div>
        <p className="mt-2 text-xs text-[#6b7280]">
          Two-factor authentication is currently disabled. Enable it for enhanced account security.
        </p>
      </div>
    </div>
  );
}
