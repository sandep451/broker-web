"use client";

import { useEffect, useState } from "react";

type Order = { id: string; symbol: string; side: string; type: string; qty: number; status: string; createdAt: number };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function load() {
      const r = await fetch("/api/orders/list");
      const j = await r.json();
      if (r.ok) setOrders(j.orders);
    }
    load();
  }, []);

  return (
    <main className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <h1 className="text-xl font-semibold">Orders</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Symbol</th>
              <th className="text-left py-2">Side</th>
              <th className="text-left py-2">Type</th>
              <th className="text-right py-2">Qty</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {orders.map(o => (
              <tr key={o.id}>
                <td className="py-2 font-mono text-xs">{o.id}</td>
                <td className="py-2">{o.symbol}</td>
                <td className="py-2">{o.side}</td>
                <td className="py-2">{o.type}</td>
                <td className="py-2 text-right">{o.qty}</td>
                <td className="py-2">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
