import Link from "next/link";
import { TrustStack } from "../../components/layout/TrustStack";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Trade and invest with clarity—built for speed, safety, and transparency.
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Open your account online, complete KYC with guided steps, and start with transparent charges and prominent disclosures.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/open-account" className="rounded-2xl bg-slate-900 text-white px-5 py-3 font-semibold shadow-sm hover:bg-slate-800">Open Account</Link>
            <Link href="/pricing" className="rounded-2xl border px-5 py-3 font-semibold hover:bg-white">View Pricing</Link>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border p-4">
              <div className="text-sm font-semibold">Trust-first onboarding</div>
              <div className="text-sm text-slate-600 mt-1">Progress, save & resume, and clear next steps.</div>
            </div>
            <div className="rounded-2xl bg-white border p-4">
              <div className="text-sm font-semibold">Transparent charges</div>
              <div className="text-sm text-slate-600 mt-1">Know what you pay before you begin.</div>
            </div>
            <div className="rounded-2xl bg-white border p-4">
              <div className="text-sm font-semibold">Fast, responsive UI</div>
              <div className="text-sm text-slate-600 mt-1">Designed to stay smooth on mobile networks.</div>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500">Investing and trading involve market risk. We do not promise returns.</div>
        </div>

        <div className="lg:pt-2">
          <TrustStack />
          <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">3 steps to start</div>
            <ol className="mt-3 space-y-2 text-sm text-slate-700 list-decimal pl-5">
              <li>Sign up and verify OTP</li>
              <li>Complete KYC (documents + eSign placeholders)</li>
              <li>Add funds and place your first order (demo)</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
