import { t, Static } from "elysia";

const JobType = t.UnionEnum(["LOOKUP", "REGISTER_OPERATOR", "REGISTER_CITIZEN", "UNREGISTER_CITIZEN", "TRANSFER"]);
const JobState = t.UnionEnum(["PENDING", "RUNNING", "RETRIED", "COMPLETED", "FAILED", "DEAD"]);

export const JobSchema = t.Object({
  id: t.String(),
  type: JobType,
  payload: t.String(),
  idempotencyKey: t.Optional(t.String()),
  attempts: t.Number(),
  maxAttempts: t.Number(),
  nextRunAt: t.Number(), // epoch ms
  state: JobState,
  createdAt: t.Number(),
  updatedAt: t.Number(),
  lastError: t.Optional(t.String()),
  result: t.Optional(t.String()),
  correlationId: t.Optional(t.String()),
});

export type Job = Static<typeof JobSchema>;

export const AuditEntrySchema = t.Object({
  id: t.String(),
  correlationId: t.String(),
  endpoint: t.String(),
  requestHash: t.String(),
  statusCode: t.Optional(t.Number()),
  latencyMs: t.Optional(t.Number()),
  timestamp: t.Number(),
  scrubbedPayload: t.Optional(t.String()),
  info: t.Optional(t.String()),
});

export type AuditEntry = Static<typeof AuditEntrySchema>;