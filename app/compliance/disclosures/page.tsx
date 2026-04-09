export default function DisclosuresPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Disclosures</h1>
      <p className="mt-2 text-slate-700">This page publishes broker/DP information, key contacts, and processes for transparency.</p>

      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Basic details</h2>
        <div className="mt-3 text-sm text-slate-700 space-y-1">
          <div><span className="font-medium">Legal name:</span> {{BrandName}} ({{LegalEntity}})</div>
          <div><span className="font-medium">SEBI registration no:</span> {{SEBI_REG_NO}}</div>
          <div><span className="font-medium">DP registration no (if applicable):</span> {{DP_REG_NO}}</div>
          <div><span className="font-medium">Head office:</span> {{HO_ADDRESS}}</div>
          <div><span className="font-medium">Branches:</span> {{BRANCHES_OR_NA}}</div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Key managerial personnel (KMP) & compliance officer</h2>
        <div className="mt-3 text-sm text-slate-700 space-y-2">
          <div>
            <div className="font-medium">Compliance Officer</div>
            <div>{{CO_NAME}} • {{CO_EMAIL}} • {{CO_PHONE}}</div>
          </div>
          <div>
            <div className="font-medium">KMP</div>
            <div>{{KMP_LIST_WITH_EMAILS}}</div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Account opening procedure (step-by-step)</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700 space-y-1">
          <li>Submit signup details and verify OTP.</li>
          <li>Provide KYC information (PAN, DOB, address).</li>
          <li>Upload documents and complete eSign (as applicable).</li>
          <li>Complete selfie/video verification (as applicable).</li>
          <li>Track application status from your dashboard/support.</li>
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Authorized Persons (if applicable)</h2>
        <p className="mt-2 text-sm text-slate-700">{{AUTHORIZED_PERSONS_LIST_OR_NA}}</p>
      </section>
    </main>
  );
}
