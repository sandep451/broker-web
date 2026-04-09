import { NextResponse } from "next/server";
import { requireUser } from "../../_lib/auth";
import { listOrders } from "../../_lib/store";

export async function GET() {
  try {
    const { user } = requireUser();
    return NextResponse.json({ orders: listOrders(user.id) });
  } catch {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
}
