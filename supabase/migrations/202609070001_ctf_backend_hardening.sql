-- Backend hardening for the Layer8 Weekly CTF.
-- Apply after 202609060001_weekly_ctf.sql.

create index if not exists ctf_weeks_active_idx
  on public.ctf_weeks (published, starts_at, ends_at);

create index if not exists ctf_challenges_week_list_idx
  on public.ctf_challenges (week_id, published, points);

create index if not exists ctf_solves_user_time_idx
  on public.ctf_solves (user_id, solved_at desc);

create table if not exists public.ctf_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.ctf_profiles(id) on delete set null,
  action text not null,
  entity_type text not null check (entity_type in ('week', 'challenge', 'attachment', 'account')),
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ctf_audit_log_created_idx
  on public.ctf_audit_log (created_at desc);

alter table public.ctf_audit_log enable row level security;
revoke all on public.ctf_audit_log from anon, authenticated;

-- Performs validation, rate limiting, flag checking, and solve creation in one
-- database transaction. The advisory lock serializes attempts by one user for
-- one challenge so concurrent requests cannot bypass the attempt limit.
create or replace function public.submit_ctf_flag(
  p_challenge_id uuid,
  p_submitted_hash text
)
returns table (
  outcome text,
  awarded_points integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_now timestamptz := clock_timestamp();
  v_points integer;
  v_starts_at timestamptz;
  v_expected_hash text;
  v_inserted_rows integer;
begin
  if v_user_id is null then
    return query select 'unauthenticated'::text, 0;
    return;
  end if;

  if p_submitted_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid flag hash';
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(v_user_id::text || ':' || p_challenge_id::text, 0)
  );

  if (
    select count(*)
    from public.ctf_submissions
    where user_id = v_user_id
      and submitted_at >= v_now - interval '1 minute'
  ) >= 8 then
    return query select 'rate_limited'::text, 0;
    return;
  end if;

  select c.points, w.starts_at, s.flag_hash
    into v_points, v_starts_at, v_expected_hash
  from public.ctf_challenges c
  join public.ctf_weeks w on w.id = c.week_id
  join public.ctf_challenge_secrets s on s.challenge_id = c.id
  where c.id = p_challenge_id
    and c.published = true
    and w.published = true
    and v_now between w.starts_at and w.ends_at;

  if not found then
    return query select 'unavailable'::text, 0;
    return;
  end if;

  if exists (
    select 1 from public.ctf_solves
    where user_id = v_user_id and challenge_id = p_challenge_id
  ) then
    return query select 'solved'::text, 0;
    return;
  end if;

  insert into public.ctf_submissions
    (user_id, challenge_id, submitted_hash, correct)
  values
    (v_user_id, p_challenge_id, p_submitted_hash, p_submitted_hash = v_expected_hash);

  if p_submitted_hash <> v_expected_hash then
    return query select 'wrong'::text, 0;
    return;
  end if;

  insert into public.ctf_solves
    (user_id, challenge_id, points_awarded, elapsed_seconds)
  values
    (
      v_user_id,
      p_challenge_id,
      v_points,
      greatest(0, floor(extract(epoch from (v_now - v_starts_at)))::integer)
    )
  on conflict (user_id, challenge_id) do nothing;

  get diagnostics v_inserted_rows = row_count;
  if v_inserted_rows = 0 then
    return query select 'solved'::text, 0;
  else
    return query select 'correct'::text, v_points;
  end if;
end;
$$;

revoke all on function public.submit_ctf_flag(uuid, text) from public, anon;
grant execute on function public.submit_ctf_flag(uuid, text) to authenticated;

update storage.buckets
set
  public = false,
  file_size_limit = 52428800,
  allowed_mime_types = array[
    'application/zip',
    'application/x-7z-compressed',
    'application/gzip',
    'application/octet-stream',
    'application/pdf',
    'application/json',
    'text/plain',
    'image/png',
    'image/jpeg',
    'image/webp',
    'audio/mpeg',
    'audio/wav',
    'application/vnd.tcpdump.pcap'
  ]::text[]
where id = 'ctf-files';
