import { NextResponse } from "next/server";
import { writeAudit } from "../../_lib/audit";
import { getIp } from "../../_lib/auth";

export async function POST(req: Request) {
  const ip = getIp();
  const body = await req.json().catch(() => ({} as any));
  const event = {
    name: String(body?.name || "unknown"),
    page: String(body?.page || "unknown"),
    ts: Date.now()
  };
  writeAudit({ action: "ANALYTICS_EVENT", ip, metadata: event });
  return NextResponse.json({ ok: true });
}
