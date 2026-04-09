import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "./app/api/_lib/rateLimit";
import { buildSecurityHeaders } from "./lib/csp";

const PROTECTED_PREFIX = "/app";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const headers = buildSecurityHeaders(req);
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v));

  if (req.nextUrl.pathname.startsWith("/api/")) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const key = `${ip}:${req.nextUrl.pathname}`;
    const allowed = rateLimit(key, 60, 60_000);
    if (!allowed) {
      return new NextResponse(JSON.stringify({ error: "rate_limited" }), {
        status: 429,
        headers: { "content-type": "application/json" }
      });
    }
  }

  if (req.nextUrl.pathname.startsWith(PROTECTED_PREFIX)) {
    const token = req.cookies.get("session")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("reason", "signin_required");
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*", "/app/:path*"]
};
