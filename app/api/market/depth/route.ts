import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "NSE:RELIANCE";
  const mid = 100 + Math.random() * 2000;
  const bids = Array.from({ length: 5 }).map((_, i) => ({
    price: Number((mid - (i + 1) * 0.5).toFixed(2)),
    qty: Math.floor(10 + Math.random() * 200)
  }));
  const asks = Array.from({ length: 5 }).map((_, i) => ({
    price: Number((mid + (i + 1) * 0.5).toFixed(2)),
    qty: Math.floor(10 + Math.random() * 200)
  }));
  return NextResponse.json({ symbol, bids, asks });
}
