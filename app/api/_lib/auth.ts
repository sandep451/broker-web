import { cookies, headers } from "next/headers";
import { db, getUserBySession } from "./store";

export function getIp() {
  const h = headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function requireUser() {
  const token = cookies().get("session")?.value;
  const user = getUserBySession(token);
  if (!user) throw new Error("UNAUTHENTICATED");
  return { user, token: token! };
}

export function clearSession(token?: string) {
  if (token) db.sessions.delete(token);
}
