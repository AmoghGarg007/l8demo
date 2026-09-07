import { createClient } from "@supabase/supabase-js";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, "").split("=");
    return [key, value.join("=")];
  }),
);

const srn = (args.srn ?? "").trim().toUpperCase();
const displayName = (args.name ?? "").trim();
const handle = (args.handle ?? srn.toLowerCase()).trim().toLowerCase();
const role = args.role ?? "student";
const password = process.env.CTF_INITIAL_PASSWORD;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!/^[A-Z0-9]{6,24}$/.test(srn) || !displayName || !/^[a-z0-9_-]{3,24}$/.test(handle)) {
  throw new Error("Usage: npm run ctf:provision-user -- --srn=PES... --name=\"Student Name\" --handle=alias [--role=student|host|admin]");
}
if (!url || !serviceKey || !password || password.length < 10) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and CTF_INITIAL_PASSWORD (10+ characters).");
}
if (!["student", "host", "admin"].includes(role)) throw new Error("Invalid role.");

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const email = `${srn.toLowerCase()}@accounts.layer8.local`;
const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});
if (error) throw error;

const { error: profileError } = await supabase.from("ctf_profiles").insert({
  id: data.user.id,
  srn,
  display_name: displayName,
  handle,
  role,
});
if (profileError) {
  await supabase.auth.admin.deleteUser(data.user.id);
  throw profileError;
}

await supabase.from("ctf_audit_log").insert({
  actor_id: null,
  action: "account.provisioned_by_script",
  entity_type: "account",
  entity_id: data.user.id,
  details: { srn, role },
});

console.log(`Provisioned ${srn} as ${role}. Ask the student to change the temporary password when that flow is enabled.`);
