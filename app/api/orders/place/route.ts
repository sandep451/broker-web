import { NextResponse } from "next/server";
import { requireUser, getIp } from "../../_lib/auth";
import { PlaceOrderSchema } from "../../_lib/validate";
import { placeOrder } from "../../_lib/store";
import { writeAudit } from "../../_lib/audit";

export async function POST(req: Request) {
  try {
    const { user } = requireUser();
    const body = await req.json();
    const parsed = PlaceOrderSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

    const order = placeOrder(user.id, parsed.data);
    writeAudit({ action: "ORDER_PLACE", userId: user.id, ip: getIp(), metadata: { symbol: order.symbol, side: order.side, qty: order.qty } });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
}
