import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { DashboardNav } from "./dashboard-nav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <div className="px-3 py-4 sm:px-5 sm:py-6">
      <div className="flex flex-col gap-4 lg:flex-row">
        <DashboardNav user={user} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
