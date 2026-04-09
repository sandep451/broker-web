import { nanoid } from "nanoid";

export type User = { id: string; fullName: string; email: string; mobile: string };
export type Session = { token: string; userId: string; createdAt: number };

export type KycApp = {
  id: string;
  userId: string;
  status: "draft" | "submitted";
  pan?: string;
  dob?: string;
  address?: string;
  updatedAt: number;
};

export type Order = {
  id: string;
  userId: string;
  symbol: string;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT" | "SL" | "SL-M";
  qty: number;
  price?: number;
  status: "FILLED";
  createdAt: number;
};

const users = new Map<string, User>();
const sessions = new Map<string, Session>();
const otps = new Map<string, { otp: string; expiresAt: number; userId: string }>();
const kycApps = new Map<string, KycApp>();
const orders: Order[] = [];

export const db = { users, sessions, otps, kycApps, orders };

export function createUser(payload: Omit<User, "id">) {
  const id = nanoid();
  const user = { id, ...payload };
  users.set(id, user);
  return user;
}

export function findUserByEmailOrMobile(email: string, mobile: string) {
  for (const u of users.values()) {
    if (u.email === email || u.mobile === mobile) return u;
  }
  return null;
}

export function createSession(userId: string) {
  const token = nanoid();
  sessions.set(token, { token, userId, createdAt: Date.now() });
  return token;
}

export function getUserBySession(token?: string) {
  if (!token) return null;
  const s = sessions.get(token);
  if (!s) return null;
  return users.get(s.userId) || null;
}

export function upsertKyc(userId: string, patch: Partial<KycApp>) {
  let app = [...kycApps.values()].find(k => k.userId === userId);
  if (!app) {
    app = { id: nanoid(), userId, status: "draft", updatedAt: Date.now() };
    kycApps.set(app.id, app);
  }
  const next = { ...app, ...patch, updatedAt: Date.now() };
  kycApps.set(next.id, next);
  return next;
}

export function listOrders(userId: string) {
  return orders.filter(o => o.userId === userId).sort((a, b) => b.createdAt - a.createdAt);
}

export function placeOrder(userId: string, order: Omit<Order, "id" | "userId" | "status" | "createdAt">) {
  const o: Order = { id: nanoid(), userId, status: "FILLED", createdAt: Date.now(), ...order };
  orders.unshift(o);
  return o;
}
