import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "NSE:RELIANCE";
  const price = 100 + Math.random() * 2000;
  const change = (Math.random() - 0.5) * 20;
  return NextResponse.json({ symbol, price: Number(price.toFixed(2)), change: Number(change.toFixed(2)) });
}
