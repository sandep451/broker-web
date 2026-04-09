import Link from "next/link";

export function TrustStack() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm p-5">
      <div className="text-sm font-semibold text-slate-900">Trust & transparency</div>
      <p className="mt-2 text-sm text-slate-600">
        Clear disclosures, visible grievance process, and risk information—easy to find before you sign up.
      </p>
      <div className="mt-4 grid gap-2 text-sm">
        <Link className="underline" href="/compliance/disclosures">Disclosures & key contacts</Link>
        <Link className="underline" href="/compliance/grievance">Grievance & complaint process</Link>
        <Link className="underline" href="/compliance/risk">Risk disclosure</Link>
        <Link className="underline" href="/pricing">Transparent charges</Link>
      </div>
      <div className="mt-4 text-xs text-slate-500">Investing and trading involve market risk. No returns are guaranteed.</div>
    </div>
  );
}
