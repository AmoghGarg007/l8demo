import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken, type L8TokenPayload } from "./jwt";
import { db } from "./db";

/**
 * Reads the session cookie, verifies the JWT, and confirms the caller
 * currently has the 'admin' role. The role is re-checked against the
 * database on every call rather than trusted from the JWT claim alone
 * — the JWT lives for 7 days, and a demoted admin's token would
 * otherwise still say `role: "admin"` until it expires or they log in
 * again. Returns the token payload (role always "admin" when non-null)
 * on success, or null if unauthenticated / not currently an admin.
 */
export async function requireAdmin(): Promise<L8TokenPayload | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const payload = await verifyToken(token);

  if (!payload) {
    return null;
  }

  const client = await db();
  const result = await client.execute({
    sql: `SELECT role FROM users WHERE srn = ?`,
    args: [payload.srn],
  });
  const row = result.rows[0] as unknown as { role: string } | undefined;

  if (row?.role !== "admin") {
    return null;
  }

  return payload;
}

/**
 * Reads the session cookie and verifies the JWT for any logged-in user
 * (member or admin). Returns the token payload, or null if unauthenticated.
 */
export async function requireUser(): Promise<L8TokenPayload | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return verifyToken(token);
}
