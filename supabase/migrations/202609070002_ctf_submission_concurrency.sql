-- Serialize every submission made by one account, regardless of challenge.
-- This closes the cross-challenge race where concurrent requests could each
-- observe fewer than eight recent attempts before inserting their own row.

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
  v_now timestamptz;
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

  -- One transaction per account may evaluate the rate limit at a time. Other
  -- users receive different lock keys and can continue submitting normally.
  perform pg_advisory_xact_lock(
    hashtextextended('ctf-submit:' || v_user_id::text, 0)
  );

  -- Capture the timestamp after acquiring the lock so a queued request does
  -- not evaluate availability or the rate window with a stale timestamp.
  v_now := clock_timestamp();

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
