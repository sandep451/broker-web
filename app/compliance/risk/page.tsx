export default function RiskPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Risk disclosure</h1>
      <p className="mt-3 text-slate-700">Investing and trading in securities involve market risk. Prices can move against you and losses may exceed expectations.</p>
      <div className="mt-6 rounded-2xl border bg-white p-6 text-sm text-slate-700 space-y-2">
        <p>• No returns are guaranteed.</p>
        <p>• Derivatives carry additional risk due to leverage.</p>
        <p>• Ensure you understand product types and order types before trading.</p>
        <p>• Please review all disclosures and charges before placing orders.</p>
      </div>
    </main>
  );
}
