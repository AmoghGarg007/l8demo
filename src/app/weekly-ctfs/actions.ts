"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../../lib/supabase/server";
import { isSupabaseConfigured } from "../../lib/supabase/config";
import { isValidSrn, srnToAuthEmail } from "../../lib/ctf-auth";
import { createAdminClient } from "../../lib/supabase/admin";
import { createHash, timingSafeEqual } from "node:crypto";

export type AuthState = { error: string | null };
export type FlagState = {
  status: "idle" | "error" | "wrong" | "correct" | "solved";
  message: string | null;
};
export type PasswordState = { status: "idle" | "error" | "success"; message: string | null };

export async function signIn(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured()) {
    return { error: "CTF authentication has not been configured yet." };
  }

  const srn = String(formData.get("srn") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!isValidSrn(srn) || password.length < 8) {
    return { error: "Enter a valid SRN and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: srnToAuthEmail(srn),
    password,
  });

  if (error) return { error: "Invalid SRN or password." };
  revalidatePath("/weekly-ctfs", "layout");
  redirect("/weekly-ctfs");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/weekly-ctfs", "layout");
  redirect("/weekly-ctfs");
}

export async function changePassword(
  _previousState: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  if (!isSupabaseConfigured()) return { status: "error", message: "Authentication is not configured." };
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  if (newPassword.length < 10) return { status: "error", message: "Use at least 10 characters." };
  if (newPassword !== confirmation) return { status: "error", message: "The new passwords do not match." };

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { status: "error", message: "Your session has expired. Sign in again." };
  const { error } = await supabase.auth.updateUser({ password: newPassword, current_password: currentPassword });
  if (error) return { status: "error", message: "Current password rejected or the new password is not allowed." };
  return { status: "success", message: "Password updated." };
}

function hashFlag(flag: string) {
  return createHash("sha256").update(flag.trim()).digest("hex");
}

export async function submitFlag(
  _previousState: FlagState,
  formData: FormData,
): Promise<FlagState> {
  if (!isSupabaseConfigured()) return { status: "error", message: "Submissions are disabled in demo mode." };

  const flag = String(formData.get("flag") ?? "").trim();
  const challengeId = String(formData.get("challengeId") ?? "");
  const slug = String(formData.get("slug") ?? "");
  if (!flag || !challengeId) return { status: "error", message: "Enter a flag before submitting." };
  if (flag.length > 512) return { status: "error", message: "That flag is unexpectedly long." };

  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return { status: "error", message: "Sign in before submitting a flag." };

  const admin = createAdminClient();
  const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();
  const { count } = await admin
    .from("ctf_submissions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", authData.user.id)
    .gte("submitted_at", oneMinuteAgo);
  if ((count ?? 0) >= 8) return { status: "error", message: "Rate limit reached. Wait one minute and try again." };

  const [{ data: challenge }, { data: secret }, { data: existingSolve }] = await Promise.all([
    admin
      .from("ctf_challenges")
      .select("id,points,published,ctf_weeks!inner(starts_at,ends_at,published)")
      .eq("id", challengeId)
      .eq("published", true)
      .maybeSingle(),
    admin.from("ctf_challenge_secrets").select("flag_hash").eq("challenge_id", challengeId).maybeSingle(),
    admin.from("ctf_solves").select("challenge_id").eq("user_id", authData.user.id).eq("challenge_id", challengeId).maybeSingle(),
  ]);

  if (existingSolve) return { status: "solved", message: "You already own this flag." };
  if (!challenge || !secret) return { status: "error", message: "This challenge is unavailable." };

  const week = challenge.ctf_weeks as unknown as { starts_at: string; ends_at: string; published: boolean };
  const now = Date.now();
  if (!week.published || now < new Date(week.starts_at).getTime() || now > new Date(week.ends_at).getTime()) {
    return { status: "error", message: "This operation is not accepting submissions." };
  }

  const submittedHash = hashFlag(flag);
  const expected = Buffer.from(secret.flag_hash, "hex");
  const actual = Buffer.from(submittedHash, "hex");
  const correct = expected.length === actual.length && timingSafeEqual(expected, actual);

  await admin.from("ctf_submissions").insert({
    user_id: authData.user.id,
    challenge_id: challengeId,
    submitted_hash: submittedHash,
    correct,
  });

  if (!correct) return { status: "wrong", message: "Flag rejected. Inspect the target and try again." };

  const elapsedSeconds = Math.max(0, Math.floor((now - new Date(week.starts_at).getTime()) / 1000));
  const { error } = await admin.from("ctf_solves").insert({
    user_id: authData.user.id,
    challenge_id: challengeId,
    points_awarded: challenge.points,
    elapsed_seconds: elapsedSeconds,
  });
  if (error && error.code !== "23505") return { status: "error", message: "The flag was valid, but the solve could not be recorded." };

  revalidatePath("/weekly-ctfs");
  revalidatePath(`/weekly-ctfs/${slug}`);
  return { status: "correct", message: `Flag accepted. +${challenge.points} points.` };
}
