import { NextResponse } from "next/server";
import { requireUser } from "../../_lib/auth";

export async function GET() {
  try {
    const { user } = requireUser();
    return NextResponse.json({ user: { id: user.id, fullName: user.fullName, email: user.email, mobile: user.mobile } });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
