import { nanoid } from "nanoid";

export type AuditAction =
  | "AUTH_SIGNUP"
  | "AUTH_LOGIN"
  | "AUTH_LOGOUT"
  | "KYC_SAVE"
  | "KYC_SUBMIT"
  | "DEPOSIT_CREATE"
  | "ORDER_PLACE"
  | "ANALYTICS_EVENT";

type AuditEvent = {
  id: string;
  at: string;
  userId?: string;
  action: AuditAction;
  ip?: string;
  metadata?: Record<string, unknown>;
};

const auditLog: AuditEvent[] = [];

export function writeAudit(event: Omit<AuditEvent, "id" | "at">) {
  auditLog.unshift({ id: nanoid(), at: new Date().toISOString(), ...event });
}

export function listAudit(limit = 50) {
  return auditLog.slice(0, limit);
}
