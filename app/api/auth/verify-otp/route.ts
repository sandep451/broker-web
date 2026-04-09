import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { VerifyOtpSchema } from "../../_lib/validate";
import { db, createSession } from "../../_lib/store";
import { writeAudit } from "../../_lib/audit";
import { getIp } from "../../_lib/auth";

export async function POST(req: Request) {
  const ip = getIp();
  const body = await req.json();
  const parsed = VerifyOtpSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const { emailOrMobile, otp } = parsed.data;
  const record = db.otps.get(emailOrMobile);
  if (!record || record.expiresAt < Date.now() || record.otp !== otp) {
    return NextResponse.json({ error: "invalid_otp" }, { status: 401 });
  }

  const session = createSession(record.userId);
  cookies().set("session", session, { httpOnly: true, sameSite: "lax", secure: true, path: "/" });

  writeAudit({ action: "AUTH_LOGIN", userId: record.userId, ip, metadata: { via: "otp" } });
  return NextResponse.json({ ok: true });
}
