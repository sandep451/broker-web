import { NextResponse } from "next/server";
import { requireUser, getIp } from "../../_lib/auth";
import { upsertKyc, db } from "../../_lib/store";
import { writeAudit } from "../../_lib/audit";

export async function POST() {
  try {
    const { user } = requireUser();
    const existing = [...db.kycApps.values()].find(k => k.userId === user.id);
    if (!existing?.pan || !existing?.dob || !existing?.address) {
      return NextResponse.json({ error: "kyc_incomplete" }, { status: 400 });
    }
    const app = upsertKyc(user.id, { status: "submitted" });
    writeAudit({ action: "KYC_SUBMIT", userId: user.id, ip: getIp() });
    return NextResponse.json({ application: app });
  } catch {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
}
