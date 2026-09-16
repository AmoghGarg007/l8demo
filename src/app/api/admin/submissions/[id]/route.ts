import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteRowFromSheetBySrn } from "@/lib/googleSheets";
import { SHEET_TAB_NAME, SHEET_HEADER_ROW } from "@/app/api/apply/route";

export const runtime = "nodejs";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const client = await db();

  const existing = await client.execute({
    sql: `SELECT fullName, srn FROM applications WHERE id = ?`,
    args: [id],
  });
  const row = existing.rows[0] as unknown as
    | { fullName: string; srn: string }
    | undefined;

  if (!row) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  await client.execute({
    sql: `DELETE FROM applications WHERE id = ?`,
    args: [id],
  });

  // Best-effort — never fail the delete because Sheets is unreachable.
  await deleteRowFromSheetBySrn(SHEET_TAB_NAME, SHEET_HEADER_ROW, row.srn);

  await client.execute({
    sql: `INSERT INTO audit_logs (srn, ip, user_type, action, detail) VALUES (?, ?, ?, ?, ?)`,
    args: [
      admin.srn,
      getClientIp(req),
      admin.role,
      "submission.deleted",
      `Deleted application from ${row.fullName} (${row.srn})`,
    ],
  });

  return NextResponse.json({ success: true });
}
