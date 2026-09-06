# Layer8 Weekly CTF

The Weekly CTF uses Supabase for PostgreSQL, password authentication, and private challenge-file storage. The visible login remains **SRN + password**. Internally, Supabase Auth receives a non-routable email-shaped identifier derived from the normalized SRN because its password provider accepts email or phone identifiers.

## Security decisions

- There is no public self-registration in the first release. Hosts provision accounts from the verified college roster so an attacker cannot claim a known SRN.
- Passwords are handled by Supabase Auth and are never stored in application tables.
- Raw flags are never sent to the browser or saved with submissions. The server compares SHA-256 hashes using a timing-safe comparison.
- Challenge secrets are isolated from public challenge metadata and accessible only through the service role.
- RLS limits students to their own profile, submissions, and solves.
- Submission validation, scoring, streak inputs, and solve time use server timestamps.
- The service-role key is server-only. Never prefix it with `NEXT_PUBLIC_`.

## Project setup

1. Create a Supabase project.
2. In Authentication settings, disable public user signups. Account creation is performed only with the server-side admin script.
3. In the SQL editor, run `supabase/migrations/202609060001_weekly_ctf.sql`.
4. Optionally run `supabase/seed.sql` for one demo challenge. Replace its flag before production.
5. Copy `.env.example` to `.env.local` and add the project URL, publishable key, and service-role key.
6. Add the same three variables to the Vercel project. Keep the service-role value secret.
7. Run `npm run dev` and open `/weekly-ctfs`.

## Provision an account

Set a temporary password in the shell for this command only, then run:

```powershell
$env:CTF_INITIAL_PASSWORD="temporary-password-here"
npm run ctf:provision-user -- --srn=PES2UGXXCS000 --name="Student Name" --handle=student_alias
Remove-Item Env:CTF_INITIAL_PASSWORD
```

Use `--role=host` or `--role=admin` for trusted organizers. Students should immediately change their temporary password from `/weekly-ctfs/account`.

## Publishing challenges

Hosts can open `/weekly-ctfs/admin` to create weekly operations and challenges. Drafts are invisible to students until `published` is enabled. Upload downloadable evidence to the private `ctf-files` Storage bucket and save its object path on the challenge. Downloads use 60-second signed URLs.

Use a separate challenge infrastructure host for intentionally vulnerable web services and binaries. Do not deploy exploitable challenge services inside this website's Vercel application or Supabase database.

## Scoring and streaks

- A challenge awards its configured points once per student.
- Rankings sort by total points, then the server-recorded completion time.
- A streak counts consecutive published week numbers where the student solved at least one challenge.
- The submission endpoint allows eight attempts per account per minute.

## Before production

- Confirm the exact SRN format and tighten the database and application regex.
- Agree on an account-provisioning process and initial-password distribution channel.
- Enable leaked-password protection and a strong password policy in Supabase Auth.
- Configure backups and review RLS with two test accounts.
- Test unpublished, upcoming, active, and closed challenge states.
- Add CAPTCHA or infrastructure-level rate limiting if abuse appears.
