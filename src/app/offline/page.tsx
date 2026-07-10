import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10 text-center">
      <div className="max-w-md rounded-2xl border border-[#2a2c30] bg-[#1b1c1e] p-6 shadow-2xl">
        <div className="text-5xl">📡</div>
        <h1 className="mt-4 text-2xl font-black text-[#f0f0f0]">You are offline</h1>
        <p className="mt-2 text-sm leading-6 text-[#9ca3af]">Please check your internet connection. BSL Gaming needs a secure live connection for wallet, betting and account actions.</p>
        <Link href="/" className="mt-5 inline-flex rounded-lg bg-[#008d5b] px-5 py-2.5 text-sm font-bold text-white">Try Home</Link>
      </div>
    </div>
  );
}
