"use client";

import { useEffect, useMemo, useState } from "react";

type Quote = { symbol: string; price: number; change: number };

const defaultSymbols = ["NSE:RELIANCE", "NSE:TCS", "NSE:INFY"];

export default function WatchlistPage() {
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});

  useEffect(() => {
    let alive = true;
    async function tick() {
      for (const s of defaultSymbols) {
        const r = await fetch(`/api/market/quote?symbol=${encodeURIComponent(s)}`);
        const q = await r.json();
        if (!alive) return;
        setQuotes(prev => ({ ...prev, [q.symbol]: q }));
      }
    }
    tick();
    const id = setInterval(tick, 1200);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const list = useMemo(() => defaultSymbols.map(s => quotes[s]).filter(Boolean) as Quote[], [quotes]);

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <h1 className="text-xl font-semibold">Watchlist</h1>
        <div className="mt-4 divide-y divide-slate-800">
          {list.map(q => (
            <div key={q.symbol} className="py-3 flex items-center justify-between">
              <div className="text-sm font-semibold">{q.symbol}</div>
              <div className="text-right">
                <div className="text-sm">{q.price.toFixed(2)}</div>
                <div className={`text-xs ${q.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {q.change >= 0 ? "+" : ""}{q.change.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-slate-400">Demo quotes are mocked. Replace with real-time feed later.</div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <h2 className="text-sm font-semibold">Order ticket (demo)</h2>
        <OrderTicket />
        <div className="mt-4 text-xs text-slate-400">Risk reminder: Trading involves market risk. Use appropriate order types.</div>
      </section>
    </div>
  );
}

function OrderTicket() {
  const [symbol, setSymbol] = useState("NSE:RELIANCE");
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [type, setType] = useState<"MARKET" | "LIMIT" | "SL" | "SL-M">("MARKET");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState<number | "">("");
  const [msg, setMsg] = useState("");

  async function place() {
    setMsg("");
    const payload: any = { symbol, side, type, qty };
    if (type !== "MARKET" && price !== "") payload.price = Number(price);
    const r = await fetch("/api/orders/place", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error || "order_failed");
    setMsg(`Order placed: ${j.order.id}`);
  }

  return (
    <div className="mt-4 grid gap-3 text-sm">
      <input className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2" value={symbol} onChange={e => setSymbol(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <select className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2" value={side} onChange={e => setSide(e.target.value as any)}>
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
        <select className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2" value={type} onChange={e => setType(e.target.value as any)}>
          <option value="MARKET">Market</option>
          <option value="LIMIT">Limit</option>
          <option value="SL">Stop-Loss</option>
          <option value="SL-M">SL-M</option>
        </select>
      </div>
      <input className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2" type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />
      {type !== "MARKET" && (
        <input className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2" type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value === "" ? "" : Number(e.target.value))} />
      )}
      <button onClick={place} className="rounded-xl bg-white text-slate-900 font-semibold py-2 hover:bg-slate-100">Place order</button>
      {msg && <div className="text-xs text-slate-300">{msg}</div>}
    </div>
  );
}
