# Layer8 Weekly CTF

The Weekly CTF uses Supabase for PostgreSQL, password authentication, and private challenge-file storage. The visible login remains **SRN + password**. Internally, Supabase Auth receives a non-routable email-shaped identifier derived from the normalized SRN because its password provider accepts email or phone identifiers.

## Security decisions

- There is no public self-registration in the first release. Hosts provision accounts from the verified college roster so an attacker cannot claim a known SRN.
- Passwords are handled by Supabase Auth and are never stored in application tables.
- Raw flags are never sent to the browser or saved with submissions. PostgreSQL receives only a SHA-256 hash of the submitted value.
- Challenge secrets are isolated from public challenge metadata and accessible only through the service role.
- RLS limits students to their own profile, submissions, and solves.
- Submission validation, rate limiting, scoring, and solve creation run atomically in PostgreSQL using server timestamps.
- All concurrent attempts from the same account are serialized before the rate limit is evaluated, including attempts against different challenges. Different students are not blocked by one another.
- The service-role key is server-only. Never prefix it with `NEXT_PUBLIC_`.
- Host mutations are authorized against the stored profile role and recorded in `ctf_audit_log`.

## Project setup

1. Create a Supabase project.
2. In Authentication settings, disable public user signups. Account creation is performed only with the server-side admin script.
3. In the SQL editor, run the migrations in order:
   - `supabase/migrations/202609060001_weekly_ctf.sql`
   - `supabase/migrations/202609070001_ctf_backend_hardening.sql`
   - `supabase/migrations/202609070002_ctf_submission_concurrency.sql`
4. Optionally run `supabase/seed.sql` for one demo challenge. Replace its flag before production.
5. Copy `.env.example` to `.env.local` and add the project URL, publishable key, and service-role key.
6. Run `npm run ctf:verify-backend` to confirm the tables, leaderboard function, and private bucket are reachable.
7. Add the same three variables to the Vercel project. Keep the service-role value secret.
8. Run `npm run dev` and open `/weekly-ctfs`.

## Provision an account

Set a temporary password in the shell for this command only, then run:

```powershell
$env:CTF_INITIAL_PASSWORD="temporary-password-here"
npm run ctf:provision-user -- --srn=PES2UGXXCS000 --name="Student Name" --handle=student_alias
Remove-Item Env:CTF_INITIAL_PASSWORD
```

Use `--role=host` or `--role=admin` for trusted organizers. Students should immediately change their temporary password from `/weekly-ctfs/account`.

## Reset a password

Because the visible accounts use internal, non-routable email identifiers, password recovery is handled by an administrator in the first release:

```powershell
$env:CTF_INITIAL_PASSWORD="new-temporary-password"
npm run ctf:reset-password -- --srn=PES2UGXXCS000
Remove-Item Env:CTF_INITIAL_PASSWORD
```

Share temporary passwords through a private channel and require the student to change the password after signing in.

## Publishing challenges

Hosts can open `/weekly-ctfs/admin` to create, update, publish, and remove weekly operations and challenges. Drafts are invisible to students until `published` is enabled.

The admin UI should call `POST /api/ctf/uploads` with `challengeId`, `fileName`, and `fileSize`. The response contains a short-lived Supabase upload token and object path. Upload the file directly from the browser with `uploadToSignedUrl`, then pass the returned path to `attachChallengeFile`. This avoids sending large evidence files through a Vercel function.

The private `ctf-files` bucket limits objects to 50 MB. Student downloads use 60-second signed URLs and are available only while both the challenge and its week are published and active.

Use a separate challenge infrastructure host for intentionally vulnerable web services and binaries. Do not deploy exploitable challenge services inside this website's Vercel application or Supabase database.

## Scoring and streaks

- A challenge awards its configured points once per student.
- Rankings sort by total points, then the server-recorded completion time.
- A streak counts consecutive published week numbers where the student solved at least one challenge.
- The submission endpoint allows eight attempts per account per minute.

## UI integration contracts

- Student forms import `signIn`, `signOut`, `changePassword`, and `submitFlag` from `src/app/weekly-ctfs/actions.ts`.
- Host forms import the create/update/delete and attachment actions from `src/app/weekly-ctfs/admin/actions.ts`.
- Host pages load editable data through `loadCtfAdminData` from `src/lib/ctf-admin.ts`.
- Public/student pages load data through `loadCtfDashboard` and `loadChallenge` from `src/lib/ctf.ts`.

## Before production

- Confirm the exact SRN format and tighten the database and application regex.
- Agree on an account-provisioning process and initial-password distribution channel.
- Enable leaked-password protection and a strong password policy in Supabase Auth.
- Configure backups and review RLS with two test accounts.
- Test unpublished, upcoming, active, and closed challenge states.
- Add CAPTCHA or infrastructure-level rate limiting if abuse appears.
- Run a 50-user burst test against a preview deployment before the first live event.
