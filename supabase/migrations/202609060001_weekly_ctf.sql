-- Layer8 Weekly CTF platform
-- Run this migration in the Supabase SQL editor before enabling the feature.

create extension if not exists pgcrypto;

create table if not exists public.ctf_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  srn text not null unique check (srn = upper(srn) and srn ~ '^[A-Z0-9]{6,24}$'),
  handle text not null unique check (handle ~ '^[a-z0-9_-]{3,24}$'),
  display_name text not null check (char_length(display_name) between 2 and 80),
  role text not null default 'student' check (role in ('student', 'host', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.ctf_weeks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  sequence_no integer not null unique check (sequence_no > 0),
  title text not null,
  summary text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  published boolean not null default false,
  created_by uuid references public.ctf_profiles(id),
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table if not exists public.ctf_challenges (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references public.ctf_weeks(id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  category text not null check (category in ('web', 'pwn', 'rev', 'crypto', 'forensics', 'stego', 'osint', 'net', 'misc')),
  difficulty text not null check (difficulty in ('beginner', 'easy', 'medium', 'hard')),
  points integer not null check (points between 10 and 1000),
  summary text not null,
  description text not null,
  connection_info text,
  attachment_path text,
  published boolean not null default false,
  solve_count integer not null default 0 check (solve_count >= 0),
  created_by uuid references public.ctf_profiles(id),
  created_at timestamptz not null default now(),
  unique (week_id, slug)
);

-- Kept separate so public challenge reads can never disclose flag hashes.
create table if not exists public.ctf_challenge_secrets (
  challenge_id uuid primary key references public.ctf_challenges(id) on delete cascade,
  flag_hash text not null check (flag_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now()
);

create table if not exists public.ctf_submissions (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.ctf_profiles(id) on delete cascade,
  challenge_id uuid not null references public.ctf_challenges(id) on delete cascade,
  submitted_hash text not null check (submitted_hash ~ '^[a-f0-9]{64}$'),
  correct boolean not null,
  submitted_at timestamptz not null default now()
);

create index if not exists ctf_submissions_rate_limit_idx
  on public.ctf_submissions (user_id, submitted_at desc);

create table if not exists public.ctf_solves (
  user_id uuid not null references public.ctf_profiles(id) on delete cascade,
  challenge_id uuid not null references public.ctf_challenges(id) on delete cascade,
  solved_at timestamptz not null default now(),
  points_awarded integer not null,
  elapsed_seconds integer not null check (elapsed_seconds >= 0),
  primary key (user_id, challenge_id)
);

create index if not exists ctf_solves_score_idx
  on public.ctf_solves (points_awarded desc, solved_at asc);

alter table public.ctf_profiles enable row level security;
alter table public.ctf_weeks enable row level security;
alter table public.ctf_challenges enable row level security;
alter table public.ctf_challenge_secrets enable row level security;
alter table public.ctf_submissions enable row level security;
alter table public.ctf_solves enable row level security;

create policy "profiles can read themselves"
  on public.ctf_profiles for select
  using (auth.uid() = id);

create policy "published weeks are readable"
  on public.ctf_weeks for select
  using (published or exists (
    select 1 from public.ctf_profiles p
    where p.id = auth.uid() and p.role in ('host', 'admin')
  ));

create policy "published challenges are readable"
  on public.ctf_challenges for select
  using (published or exists (
    select 1 from public.ctf_profiles p
    where p.id = auth.uid() and p.role in ('host', 'admin')
  ));

create policy "users can read their submissions"
  on public.ctf_submissions for select
  using (auth.uid() = user_id);

create policy "users can read their solves"
  on public.ctf_solves for select
  using (auth.uid() = user_id);

-- Only server-side code using the service role may read secrets or write results.
revoke all on public.ctf_challenge_secrets from anon, authenticated;
revoke insert, update, delete on public.ctf_submissions from anon, authenticated;
revoke insert, update, delete on public.ctf_solves from anon, authenticated;

create or replace function public.increment_ctf_solve_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.ctf_challenges
  set solve_count = solve_count + 1
  where id = new.challenge_id;
  return new;
end;
$$;

drop trigger if exists ctf_solve_count_after_insert on public.ctf_solves;
create trigger ctf_solve_count_after_insert
after insert on public.ctf_solves
for each row execute function public.increment_ctf_solve_count();

revoke execute on function public.increment_ctf_solve_count() from public;

create or replace function public.ctf_leaderboard(limit_count integer default 10)
returns table (
  handle text,
  total_points bigint,
  solve_count bigint,
  last_solve_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.handle,
    coalesce(sum(s.points_awarded), 0)::bigint as total_points,
    count(s.challenge_id)::bigint as solve_count,
    max(s.solved_at) as last_solve_at
  from public.ctf_profiles p
  join public.ctf_solves s on s.user_id = p.id
  group by p.id, p.handle
  order by total_points desc, last_solve_at asc
  limit least(greatest(limit_count, 1), 100);
$$;

grant execute on function public.ctf_leaderboard(integer) to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('ctf-files', 'ctf-files', false)
on conflict (id) do nothing;
