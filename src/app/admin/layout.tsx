import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { AdminNav } from "./admin-nav";

export const metadata: Metadata = {
  title: "Admin Console",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/admin");
  if (user.role !== "admin") redirect("/unauthorized");

  return <div className="space-y-5 px-3 py-5 sm:px-5"><section className="rounded-2xl border border-[#2a2c30] bg-gradient-to-br from-[#1b1c1e] to-[#111315] p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-[#ffdf19]">Operations</p><h1 className="mt-2 text-3xl font-black text-[#f0f0f0]">BSL Admin Console</h1><p className="mt-2 max-w-3xl text-sm text-[#9ca3af]">Frontend operations center for future production integrations: users, KYC, payments, risk, content, audit logs and incident readiness.</p></section><AdminNav />{children}</div>;
}
