"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../../lib/supabase/server";
import { isSupabaseConfigured } from "../../lib/supabase/config";
import { isValidSrn, srnToAuthEmail } from "../../lib/ctf-auth";
import { createHash } from "node:crypto";

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

  const { data, error } = await supabase
    .rpc("submit_ctf_flag", {
      p_challenge_id: challengeId,
      p_submitted_hash: hashFlag(flag),
    })
    .single();

  if (error || !data) {
    return { status: "error", message: "The submission service is unavailable. Try again." };
  }

  const result = data as { outcome: string; awarded_points: number };
  if (result.outcome === "rate_limited") {
    return { status: "error", message: "Rate limit reached. Wait one minute and try again." };
  }
  if (result.outcome === "unauthenticated") {
    return { status: "error", message: "Sign in before submitting a flag." };
  }
  if (result.outcome === "unavailable") {
    return { status: "error", message: "This operation is not accepting submissions." };
  }
  if (result.outcome === "solved") {
    return { status: "solved", message: "You already own this flag." };
  }
  if (result.outcome === "wrong") {
    return { status: "wrong", message: "Flag rejected. Inspect the target and try again." };
  }
  if (result.outcome !== "correct") {
    return { status: "error", message: "The submission returned an unexpected result." };
  }

  revalidatePath("/weekly-ctfs");
  if (/^[a-z0-9-]+$/.test(slug)) revalidatePath(`/weekly-ctfs/${slug}`);
  return {
    status: "correct",
    message: `Flag accepted. +${result.awarded_points} points.`,
  };
}
