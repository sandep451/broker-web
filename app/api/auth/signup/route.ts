import { NextResponse } from "next/server";
import { SignupSchema } from "../../_lib/validate";
import { createUser, findUserByEmailOrMobile, db } from "../../_lib/store";
import { nanoid } from "nanoid";
import { writeAudit } from "../../_lib/audit";
import { getIp } from "../../_lib/auth";

export async function POST(req: Request) {
  const ip = getIp();
  const body = await req.json();
  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const { fullName, email, mobile } = parsed.data;
  const existing = findUserByEmailOrMobile(email, mobile);
  const user = existing ?? createUser({ fullName, email, mobile });

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  db.otps.set(email, { otp, expiresAt: Date.now() + 5 * 60_000, userId: user.id });
  db.otps.set(mobile, { otp, expiresAt: Date.now() + 5 * 60_000, userId: user.id });

  writeAudit({ action: "AUTH_SIGNUP", userId: user.id, ip, metadata: { channel: "otp_mock" } });

  // DEMO ONLY — remove otp_demo in production
  return NextResponse.json({ ok: true, otp_demo: otp, signupId: nanoid() });
}
