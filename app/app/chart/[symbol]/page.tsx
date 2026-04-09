"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Depth = { bids: { price: number; qty: number }[]; asks: { price: number; qty: number }[] };

export default function ChartPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const router = useRouter();
  const [q, setQ] = useState(String(symbol || "NSE:RELIANCE"));
  const [depth, setDepth] = useState<Depth | null>(null);

  useEffect(() => {
    async function load() {
      const r = await fetch(`/api/market/depth?symbol=${encodeURIComponent(String(symbol))}`);
      const j = await r.json();
      setDepth(j);
    }
    load();
  }, [symbol]);

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">Chart</h1>
          <div className="flex gap-2">
            <input className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm w-[220px]" placeholder="Search symbol…" value={q} onChange={e => setQ(e.target.value)} />
            <button className="rounded-xl bg-white text-slate-900 font-semibold px-3 py-2 text-sm" onClick={() => router.push(`/app/chart/${encodeURIComponent(q)}`)}>Go</button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-950 border border-slate-800 p-6">
          <div className="text-sm text-slate-300">Mock chart area for {String(symbol)}</div>
          <div className="mt-2 text-xs text-slate-500">Replace with a charting library later; keep it lightweight for performance.</div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <h2 className="text-sm font-semibold">Market depth (inside chart)</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-slate-400 mb-2">Bids</div>
            <div className="space-y-2">
              {depth?.bids?.map((b, idx) => (
                <button key={idx} className="w-full text-left rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 hover:bg-slate-900" onClick={() => alert(`Prefill BUY at ${b.price} (demo)`)}>
                  <div className="flex justify-between"><span className="text-emerald-400">{b.price.toFixed(2)}</span><span className="text-slate-300">{b.qty}</span></div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-slate-400 mb-2">Asks</div>
            <div className="space-y-2">
              {depth?.asks?.map((a, idx) => (
                <button key={idx} className="w-full text-left rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 hover:bg-slate-900" onClick={() => alert(`Prefill SELL at ${a.price} (demo)`)}>
                  <div className="flex justify-between"><span className="text-rose-400">{a.price.toFixed(2)}</span><span className="text-slate-300">{a.qty}</span></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
