import Link from "next/link";

export const metadata = { title: "Unauthorized" };

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10 text-center">
      <div className="max-w-md rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 shadow-2xl">
        <div className="text-6xl">🔒</div>
        <h1 className="mt-4 text-3xl font-black text-[#f0f0f0]">Unauthorized</h1>
        <p className="mt-3 text-sm leading-6 text-[#9ca3af]">You do not have permission to access this area. Admin and operations pages require an authorized role.</p>
        <div className="mt-5 flex justify-center gap-3"><Link href="/dashboard" className="rounded-lg bg-[#008d5b] px-5 py-3 text-sm font-black text-white">Dashboard</Link><Link href="/support" className="rounded-lg bg-[#242628] px-5 py-3 text-sm font-bold text-[#f0f0f0]">Support</Link></div>
      </div>
    </div>
  );
}
