import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = await db();
  const result = await client.execute(`
    SELECT id, srn, user_type, action, detail, created_at
    FROM audit_logs
    ORDER BY created_at DESC
    LIMIT 100
  `);

  return NextResponse.json({ logs: result.rows });
}

// Wipes the audit log table entirely, then writes a single fresh entry
// recording who cleared it — so the "clear" itself is still accountable,
// without leaving anything from before it.
export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = await db();
  await client.execute(`DELETE FROM audit_logs`);
  await client.execute({
    sql: `INSERT INTO audit_logs (srn, ip, user_type, action, detail) VALUES (?, ?, ?, ?, ?)`,
    args: [
      admin.srn,
      getClientIp(req),
      admin.role,
      "audit_log.cleared",
      "Cleared all audit log entries",
    ],
  });

  return NextResponse.json({ success: true });
}
