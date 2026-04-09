export default function GrievancePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Grievance & complaint process</h1>
      <p className="mt-2 text-slate-700">Steps to file a complaint and check its status are published here for easy access.</p>

      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">How to file a complaint</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700 space-y-1">
          <li>Email us at {{GRIEVANCE_EMAIL}} with subject “Complaint: {{ClientID}}” and details.</li>
          <li>Include order IDs/screenshots where relevant.</li>
          <li>You will receive a ticket/reference number for tracking.</li>
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">How to check complaint status</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700 space-y-1">
          <li>Use your reference number in the Support → Track status section.</li>
          <li>Or email {{GRIEVANCE_EMAIL}} with the reference number for an update.</li>
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Escalation matrix</h2>
        <div className="mt-3 text-sm text-slate-700 space-y-2">
          <div><span className="font-medium">Level 1:</span> Support — {{SUPPORT_EMAIL}}</div>
          <div><span className="font-medium">Level 2:</span> Compliance Officer — {{CO_EMAIL}}</div>
          <div><span className="font-medium">Level 3:</span> Nodal Officer — {{NODAL_EMAIL}}</div>
        </div>
      </section>
    </main>
  );
}
