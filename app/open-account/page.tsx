"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { track } from "../../lib/analytics";

type Step = 1 | 2 | 3 | 4;

export default function OpenAccountPage() {
  const [step, setStep] = useState<Step>(1);
  const [signup, setSignup] = useState({ fullName: "", email: "", mobile: "" });
  const [otp, setOtp] = useState({ emailOrMobile: "", otp: "", demoOtp: "" });
  const [kyc, setKyc] = useState({ pan: "", dob: "", address: "" });
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    track("view_open_account", "/open-account");
  }, []);

  const progress = useMemo(() => Math.round((step / 4) * 100), [step]);

  async function doSignup() {
    setMsg("");
    const r = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(signup)
    });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error || "signup_failed");
    setOtp(o => ({ ...o, demoOtp: j.otp_demo, emailOrMobile: signup.mobile }));
    setStep(2);
  }

  async function doVerify() {
    setMsg("");
    const r = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ emailOrMobile: otp.emailOrMobile, otp: otp.otp })
    });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error || "otp_failed");
    setStep(3);
  }

  async function saveKycDraft() {
    setMsg("");
    const r = await fetch("/api/kyc/application", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(kyc)
    });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error || "kyc_save_failed");
    setMsg("Saved. You can submit when ready.");
  }

  async function submitKyc() {
    setMsg("");
    const r = await fetch("/api/kyc/submit", { method: "POST" });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error || "kyc_submit_failed");
    setStep(4);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">Open your account</h1>
          <p className="mt-2 text-slate-700">
            Guided steps. Save and resume. Transparent disclosures always one click away.
          </p>

          <div className="mt-6 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900" style={{ width: `${progress}%` }} />
          </div>

          {msg && <div className="mt-4 text-sm text-rose-700">{msg}</div>}

          {step === 1 && (
            <section className="mt-8 rounded-2xl border bg-white p-6">
              <div className="text-sm font-semibold">Step 1 — Signup</div>
              <div className="mt-4 grid gap-3">
                <input className="border rounded-xl p-3" placeholder="Full name" value={signup.fullName} onChange={e => setSignup({ ...signup, fullName: e.target.value })} />
                <input className="border rounded-xl p-3" placeholder="Email" value={signup.email} onChange={e => setSignup({ ...signup, email: e.target.value })} />
                <input className="border rounded-xl p-3" placeholder="Mobile" value={signup.mobile} onChange={e => setSignup({ ...signup, mobile: e.target.value })} />
                <button className="rounded-xl bg-slate-900 text-white font-semibold py-3" onClick={doSignup}>Send OTP</button>
              </div>
              <div className="mt-4 text-xs text-slate-500">Investing and trading involve market risk. No returns are guaranteed.</div>
            </section>
          )}

          {step === 2 && (
            <section className="mt-8 rounded-2xl border bg-white p-6">
              <div className="text-sm font-semibold">Step 2 — Verify OTP</div>
              <div className="mt-2 text-xs text-slate-500">Demo OTP (remove in production): <span className="font-mono">{otp.demoOtp}</span></div>
              <div className="mt-4 grid gap-3">
                <input className="border rounded-xl p-3" placeholder="Mobile or Email" value={otp.emailOrMobile} onChange={e => setOtp({ ...otp, emailOrMobile: e.target.value })} />
                <input className="border rounded-xl p-3" placeholder="6-digit OTP" value={otp.otp} onChange={e => setOtp({ ...otp, otp: e.target.value })} />
                <button className="rounded-xl bg-slate-900 text-white font-semibold py-3" onClick={doVerify}>Verify & Continue</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="mt-8 rounded-2xl border bg-white p-6">
              <div className="text-sm font-semibold">Step 3 — KYC details</div>
              <div className="mt-4 grid gap-3">
                <input className="border rounded-xl p-3" placeholder="PAN" value={kyc.pan} onChange={e => setKyc({ ...kyc, pan: e.target.value.toUpperCase() })} />
                <input className="border rounded-xl p-3" placeholder="DOB (YYYY-MM-DD)" value={kyc.dob} onChange={e => setKyc({ ...kyc, dob: e.target.value })} />
                <textarea className="border rounded-xl p-3 min-h-[100px]" placeholder="Address" value={kyc.address} onChange={e => setKyc({ ...kyc, address: e.target.value })} />
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-xl border px-4 py-3 font-semibold" onClick={saveKycDraft}>Save draft</button>
                  <button className="rounded-xl bg-slate-900 text-white px-4 py-3 font-semibold" onClick={submitKyc}>Submit KYC</button>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-500">Document upload, eSign, and video/selfie verification can be added as next steps (placeholders in MVP).</div>
            </section>
          )}

          {step === 4 && (
            <section className="mt-8 rounded-2xl border bg-white p-6">
              <div className="text-sm font-semibold">Submitted</div>
              <p className="mt-2 text-sm text-slate-700">Your application has been submitted. You can now explore the demo trading app.</p>
              <div className="mt-4 flex gap-3">
                <Link href="/app" className="rounded-xl bg-slate-900 text-white font-semibold px-4 py-3">Go to App</Link>
                <Link href="/compliance/disclosures" className="rounded-xl border px-4 py-3 font-semibold">View disclosures</Link>
              </div>
            </section>
          )}
        </div>

        <aside className="hidden lg:block w-[320px]">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">Need transparency?</div>
            <div className="mt-2 text-sm text-slate-600">Disclosures, grievance process, and risk information are always accessible.</div>
            <div className="mt-4 grid gap-2 text-sm">
              <Link className="underline" href="/compliance/disclosures">Disclosures & contacts</Link>
              <Link className="underline" href="/compliance/grievance">Complaints & status</Link>
              <Link className="underline" href="/compliance/risk">Risk disclosure</Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
