import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearSession, getIp, requireUser } from "../../_lib/auth";
import { writeAudit } from "../../_lib/audit";

export async function POST() {
  try {
    const { user, token } = requireUser();
    clearSession(token);
    cookies().delete("session");
    writeAudit({ action: "AUTH_LOGOUT", userId: user.id, ip: getIp() });
  } catch {
    // ignore
  }
  return NextResponse.json({ ok: true });
}
