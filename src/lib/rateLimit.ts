import { db } from "./db";

// Backed by the `rate_limits` table in Turso rather than an in-memory Map:
// on Vercel's serverless model, each concurrent/cold-started instance
// would otherwise get its own independent counter, making the limits
// below effectively per-instance instead of global. The single UPSERT
// statement is atomic at the SQLite level, so concurrent hits on the
// same key can't race each other into over-counting.
async function hit(key: string, windowMs: number, limit: number): Promise<boolean> {
  const client = await db();
  const now = Date.now();
  const resetAt = now + windowMs;

  const result = await client.execute({
    sql: `
      INSERT INTO rate_limits (key, count, reset_at)
      VALUES (?1, 1, ?2)
      ON CONFLICT(key) DO UPDATE SET
        count = CASE WHEN reset_at <= ?3 THEN 1 ELSE count + 1 END,
        reset_at = CASE WHEN reset_at <= ?3 THEN ?2 ELSE reset_at END
      RETURNING count
    `,
    args: [key, resetAt, now],
  });

  // Opportunistic cleanup of long-expired rows — cheap enough to skip
  // most of the time rather than paying for it on every hit.
  if (Math.random() < 0.01) {
    client
      .execute({
        sql: `DELETE FROM rate_limits WHERE reset_at < ?1`,
        args: [now - 24 * 60 * 60_000],
      })
      .catch(() => {});
  }

  const row = result.rows[0] as unknown as { count: number } | undefined;
  const count = row?.count ?? 1;
  return count <= limit;
}

// 5 submissions per IP per 5-second window.
export async function checkSubmissionRateLimit(ip: string): Promise<boolean> {
  return hit(`submit:${ip}`, 5_000, 5);
}

// 10 login attempts per key (IP or username) per 10-minute window. Every
// POST to /api/auth/login counts here, not just failed ones — real
// credentials with a mistyped password (or someone logging in/out a few
// times while testing) shouldn't burn through the budget in a couple of
// tries, so this is deliberately generous relative to what a credential-
// stuffing attempt would need.
export async function checkAuthRateLimit(
  ip: string,
  email?: string
): Promise<boolean> {
  const ipOk = await hit(`auth-ip:${ip}`, 10 * 60_000, 10);
  const emailOk = email ? await hit(`auth-email:${email}`, 10 * 60_000, 10) : true;
  return ipOk && emailOk;
}
