import { NextResponse } from "next/server";

const instruments = [
  { symbol: "NSE:RELIANCE", name: "Reliance Industries" },
  { symbol: "NSE:TCS", name: "Tata Consultancy Services" },
  { symbol: "NSE:INFY", name: "Infosys" },
  { symbol: "NSE:HDFCBANK", name: "HDFC Bank" }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const out = instruments.filter(i => i.symbol.toLowerCase().includes(q) || i.name.toLowerCase().includes(q));
  return NextResponse.json({ instruments: out });
}
