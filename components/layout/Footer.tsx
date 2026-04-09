import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold">{{BrandName}}</div>
          <p className="mt-2 text-slate-600">Trust-first broking. Transparent charges. Compliance-forward disclosures.</p>
        </div>
        <div className="grid gap-2">
          <div className="font-semibold">Company</div>
          <Link href="/platform">Platform</Link>
          <Link href="/products">Products</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <div className="grid gap-2">
          <div className="font-semibold">Compliance</div>
          <Link href="/compliance/disclosures">Disclosures</Link>
          <Link href="/compliance/grievance">Grievance & Complaints</Link>
          <Link href="/compliance/risk">Risk Disclosure</Link>
        </div>
        <div className="grid gap-2">
          <div className="font-semibold">Support</div>
          <Link href="/support">Help Center</Link>
          <Link href="/open-account">Open Account</Link>
        </div>
      </div>
      <div className="px-4 pb-8 text-xs text-slate-500 mx-auto max-w-6xl">
        Investing and trading involve market risk. Read all disclosures carefully.
      </div>
    </footer>
  );
}
