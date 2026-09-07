import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireCtfHost } from "../../../../lib/ctf-host";

const MAX_FILE_BYTES = 50 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  "7z",
  "bin",
  "elf",
  "exe",
  "gz",
  "jpeg",
  "jpg",
  "json",
  "mp3",
  "pcap",
  "pcapng",
  "pdf",
  "png",
  "tar",
  "txt",
  "wav",
  "webp",
  "zip",
]);

function cleanFileName(value: string) {
  const fileName = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!fileName || fileName.length > 120 || fileName.startsWith(".")) {
    throw new Error("Invalid file name.");
  }
  const extension = fileName.split(".").pop() ?? "";
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    throw new Error("This file type is not allowed for CTF attachments.");
  }
  return fileName;
}

export async function POST(request: Request) {
  try {
    const { admin, userId } = await requireCtfHost();
    const body = (await request.json()) as {
      challengeId?: unknown;
      fileName?: unknown;
      fileSize?: unknown;
    };
    const challengeId = String(body.challengeId ?? "");
    const fileSize = Number(body.fileSize);
    const fileName = cleanFileName(String(body.fileName ?? ""));

    if (!challengeId || !Number.isSafeInteger(fileSize) || fileSize < 1) {
      return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
    }
    if (fileSize > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "Challenge files are limited to 50 MB." },
        { status: 413 },
      );
    }

    const { data: challenge, error: challengeError } = await admin
      .from("ctf_challenges")
      .select("id,ctf_weeks!inner(slug)")
      .eq("id", challengeId)
      .maybeSingle();
    if (challengeError) throw challengeError;
    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found." }, { status: 404 });
    }

    const week = challenge.ctf_weeks as unknown as { slug: string };
    const path = `${week.slug}/${challenge.id}/${randomUUID()}-${fileName}`;
    const { data, error } = await admin.storage
      .from("ctf-files")
      .createSignedUploadUrl(path, { upsert: false });
    if (error || !data) throw error ?? new Error("Could not create an upload URL.");

    const { error: auditError } = await admin.from("ctf_audit_log").insert({
      actor_id: userId,
      action: "attachment.upload_authorized",
      entity_type: "attachment",
      entity_id: challenge.id,
      details: { path, fileSize },
    });
    if (auditError) console.error("Could not write CTF audit event", auditError.message);

    return NextResponse.json(
      { path: data.path, token: data.token, signedUrl: data.signedUrl },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not authorize the upload.";
    const status = message.includes("Host access") ? 403 : message.includes("Sign in") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
