import type { Metadata } from "next";
import { CheckCircle2, Clock3, FileCheck2, ShieldCheck, UploadCloud } from "lucide-react";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Verification" };

const steps = [
  { title: "Mobile OTP", status: "Verified", icon: CheckCircle2, color: "#22c55e" },
  { title: "NID / Passport", status: "Pending review", icon: Clock3, color: "#ffdf19" },
  { title: "Address", status: "Required before high-limit withdrawals", icon: FileCheck2, color: "#9ca3af" },
];

export default async function VerificationPage() {
  const user = await getSessionUser();
  if (!user) return null;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#f0f0f0] sm:text-2xl">KYC Verification</h1>
        <p className="text-sm text-[#9ca3af]">Bangladesh account safety, withdrawal security and responsible gaming verification UI</p>
      </div>

      <section className="grid gap-3 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <article key={step.title} className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${step.color}20`, color: step.color }}><Icon size={20} /></div>
              <h2 className="mt-3 text-sm font-black text-[#f0f0f0]">{step.title}</h2>
              <p className="mt-1 text-xs font-semibold" style={{ color: step.color }}>{step.status}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-xl border border-[#2a2c30] bg-[#1b1c1e] p-4">
        <div className="mb-4 flex items-center gap-3"><ShieldCheck className="text-[#008d5b]" /><div><h2 className="text-lg font-black text-[#f0f0f0]">Verification Form</h2><p className="text-xs text-[#9ca3af]">Frontend-ready form for production KYC provider/API integration.</p></div></div>
        <form className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1.5"><span className="text-sm font-semibold text-[#9ca3af]">Full legal name</span><input className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none focus:border-[#008d5b]" placeholder="As shown on NID" /></label>
          <label className="space-y-1.5"><span className="text-sm font-semibold text-[#9ca3af]">Date of birth</span><input type="date" className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none focus:border-[#008d5b]" /></label>
          <label className="space-y-1.5"><span className="text-sm font-semibold text-[#9ca3af]">NID / Passport number</span><input className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none focus:border-[#008d5b]" placeholder="Bangladesh NID number" /></label>
          <label className="space-y-1.5"><span className="text-sm font-semibold text-[#9ca3af]">District</span><select className="w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none focus:border-[#008d5b]"><option>Rajshahi</option><option>Dhaka</option><option>Chattogram</option><option>Khulna</option><option>Sylhet</option><option>Barishal</option><option>Rangpur</option><option>Mymensingh</option></select></label>
          <label className="space-y-1.5 md:col-span-2"><span className="text-sm font-semibold text-[#9ca3af]">Current address</span><textarea className="min-h-24 w-full rounded-lg border border-[#2a2c30] bg-[#121315] px-4 py-2.5 text-[#f0f0f0] outline-none focus:border-[#008d5b]" placeholder="House, road, area, district" /></label>
          <div className="md:col-span-2 rounded-xl border border-dashed border-[#3a3d42] bg-[#121315] p-6 text-center"><UploadCloud className="mx-auto text-[#ffdf19]" /><p className="mt-2 text-sm font-bold text-[#f0f0f0]">Upload NID front/back or passport image</p><p className="mt-1 text-xs text-[#9ca3af]">JPG, PNG or PDF up to 10MB. Production integration should scan, encrypt and store securely.</p></div>
          <button type="button" className="md:col-span-2 rounded-lg bg-[#008d5b] px-5 py-3 text-sm font-black text-white">Submit for Review</button>
        </form>
      </section>
    </div>
  );
}
