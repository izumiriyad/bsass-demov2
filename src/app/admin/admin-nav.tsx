"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Landmark, ShieldAlert, Users, ScrollText, Siren } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/users", label: "Users & KYC", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: Landmark },
  { href: "/admin/risk", label: "Risk", icon: ShieldAlert },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/audit", label: "Audit", icon: ScrollText },
  { href: "/admin/incidents", label: "Incidents", icon: Siren },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="no-scrollbar flex gap-2 overflow-x-auto rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-2" aria-label="Admin navigation">
      {items.map((item) => { const Icon = item.icon; const active = pathname === item.href; return <Link key={item.href} href={item.href} className={cn("flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition", active ? "bg-[#ffdf19] text-[#241a05]" : "text-[#9ca3af] hover:bg-[#242628] hover:text-white")}><Icon size={16}/>{item.label}</Link>; })}
    </nav>
  );
}
