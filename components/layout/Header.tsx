import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">{{BrandName}}</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <Link href="/products" className="hover:text-slate-900">Products</Link>
          <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
          <Link href="/platform" className="hover:text-slate-900">Platform</Link>
          <Link href="/learn" className="hover:text-slate-900">Learn</Link>
          <Link href="/support" className="hover:text-slate-900">Support</Link>
          <Link href="/compliance/disclosures" className="hover:text-slate-900">Disclosures</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/open-account" className="rounded-2xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-800">Open Account</Link>
          <Link href="/app" className="rounded-2xl border px-4 py-2 text-sm font-semibold hover:bg-slate-100">Sign in</Link>
        </div>
      </div>
    </header>
  );
}
