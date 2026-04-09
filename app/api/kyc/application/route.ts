import { NextResponse } from "next/server";
import { requireUser, getIp } from "../../_lib/auth";
import { KycSchema } from "../../_lib/validate";
import { upsertKyc, db } from "../../_lib/store";
import { writeAudit } from "../../_lib/audit";

export async function GET() {
  try {
    const { user } = requireUser();
    const app = [...db.kycApps.values()].find(k => k.userId === user.id) || null;
    return NextResponse.json({ application: app });
  } catch {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const { user } = requireUser();
    const body = await req.json();
    const parsed = KycSchema.partial().safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

    const app = upsertKyc(user.id, { ...parsed.data, status: "draft" });
    writeAudit({ action: "KYC_SAVE", userId: user.id, ip: getIp(), metadata: { status: app.status } });
    return NextResponse.json({ application: app });
  } catch {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
}
