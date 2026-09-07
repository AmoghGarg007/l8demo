import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createAdminClient } from "../../../../../lib/supabase/admin";
import { isSupabaseConfigured } from "../../../../../lib/supabase/config";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "CTF storage is not configured." }, { status: 503 });
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return NextResponse.redirect(new URL("/weekly-ctfs", _request.url));

  const { id } = await params;
  const admin = createAdminClient();
  const { data: challenge } = await admin.from("ctf_challenges").select("attachment_path,published").eq("id", id).maybeSingle();
  if (!challenge?.published || !challenge.attachment_path) return NextResponse.json({ error: "Attachment not found." }, { status: 404 });

  const { data, error } = await admin.storage.from("ctf-files").createSignedUrl(challenge.attachment_path, 60);
  if (error || !data.signedUrl) return NextResponse.json({ error: "Could not sign the download." }, { status: 500 });
  return NextResponse.redirect(data.signedUrl);
}
