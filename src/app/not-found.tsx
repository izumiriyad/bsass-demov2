import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-3 py-8 text-center">
      <span className="text-7xl">🎮</span>
      <h1 className="mt-6 text-6xl font-bold text-[#ffdf19]">404</h1>
      <h2 className="mt-2 text-xl font-bold text-[#f0f0f0]">Game Not Found</h2>
      <p className="mt-2 max-w-md text-sm text-[#9ca3af]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back in the game.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link href="/" className="btn-primary px-6 py-2.5 text-sm font-semibold">
          Back to Home
        </Link>
        <Link
          href="/games"
          className="rounded-lg border border-[#2a2c30] bg-[#1b1c1e] px-6 py-2.5 text-sm font-semibold text-[#f0f0f0] transition hover:border-[#383b3f]"
        >
          Browse Games
        </Link>
      </div>
    </div>
  );
}
