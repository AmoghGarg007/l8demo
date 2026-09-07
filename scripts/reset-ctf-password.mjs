import { createClient } from "@supabase/supabase-js";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, "").split("=");
    return [key, value.join("=")];
  }),
);

const srn = (args.srn ?? "").trim().toUpperCase();
const password = process.env.CTF_INITIAL_PASSWORD;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!/^[A-Z0-9]{6,24}$/.test(srn)) {
  throw new Error("Usage: npm run ctf:reset-password -- --srn=PES...");
}
if (!url || !serviceKey || !password || password.length < 10) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and CTF_INITIAL_PASSWORD (10+ characters).",
  );
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const { data: profile, error: profileError } = await supabase
  .from("ctf_profiles")
  .select("id")
  .eq("srn", srn)
  .maybeSingle();
if (profileError) throw profileError;
if (!profile) throw new Error(`No CTF account exists for ${srn}.`);

const { error } = await supabase.auth.admin.updateUserById(profile.id, {
  password,
});
if (error) throw error;

await supabase.from("ctf_audit_log").insert({
  actor_id: null,
  action: "account.password_reset_by_script",
  entity_type: "account",
  entity_id: profile.id,
  details: { srn },
});

console.log(`Reset the temporary password for ${srn}. Share it securely and require an immediate change.`);
