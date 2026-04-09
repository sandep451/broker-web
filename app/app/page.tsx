import Link from "next/link";

export default function AppHome() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-slate-300">Go to watchlist to see streaming demo quotes and place demo orders.</p>
      <Link href="/app/watchlist" className="inline-block rounded-xl bg-white text-slate-900 font-semibold px-4 py-2">Open Watchlist</Link>
    </main>
  );
}
