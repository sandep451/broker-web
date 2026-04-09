import "../globals.css";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
          <aside className="border-r border-slate-800 p-4">
            <div className="font-semibold">{{BrandName}} App</div>
            <nav className="mt-6 grid gap-2 text-sm text-slate-200">
              <Link href="/app/watchlist" className="hover:text-white">Watchlist</Link>
              <Link href="/app/orders" className="hover:text-white">Orders</Link>
              <Link href="/app/portfolio" className="hover:text-white">Portfolio</Link>
              <Link href="/app/funds" className="hover:text-white">Funds</Link>
            </nav>
            <form action="/api/auth/logout" method="post" className="mt-8">
              <button className="w-full rounded-xl border border-slate-800 px-3 py-2 text-sm hover:bg-slate-900">Logout</button>
            </form>
          </aside>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
