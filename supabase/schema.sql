-- VPRP baseline schema (setup-only, no business logic)
-- PostgreSQL (Supabase)

create extension if not exists "pgcrypto";

create type public.user_role as enum ('student', 'cpo', 'recruiter', 'admin');
create type public.application_status as enum ('applied', 'shortlisted', 'rejected', 'hired');
create type public.subscription_status as enum ('active', 'inactive', 'cancelled', 'trial');

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  role public.user_role not null,
  email text not null unique,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.colleges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  created_at timestamptz not null default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  college_id uuid references public.colleges(id) on delete set null,
  branch text,
  year int,
  target_role text,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  difficulty text not null,
  topic text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tests (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  duration int not null,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  test_id uuid not null references public.tests(id) on delete cascade,
  score numeric(6,2),
  integrity_score numeric(6,2),
  created_at timestamptz not null default now()
);

create table if not exists public.answers (
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  response jsonb,
  created_at timestamptz not null default now(),
  primary key (attempt_id, question_id)
);

create table if not exists public.scores (
  user_id uuid not null references public.users(id) on delete cascade,
  test_id uuid not null references public.tests(id) on delete cascade,
  normalized_score numeric(6,2) not null,
  created_at timestamptz not null default now(),
  primary key (user_id, test_id)
);

create table if not exists public.rankings (
  user_id uuid not null references public.users(id) on delete cascade,
  rank int not null,
  percentile numeric(5,2) not null,
  scope text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, scope)
);

create table if not exists public.passports (
  user_id uuid primary key references public.users(id) on delete cascade,
  summary text,
  score_trend jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  link text,
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  role text not null,
  cutoff_score numeric(6,2),
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  user_id uuid not null references public.users(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  status public.application_status not null default 'applied',
  created_at timestamptz not null default now(),
  primary key (user_id, job_id)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  plan text not null,
  status public.subscription_status not null default 'trial',
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  razorpay_payment_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.integrity_logs (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  event_type text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Storage bucket placeholders
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('projects', 'projects', false)
on conflict (id) do nothing;

-- Basic RLS placeholders
alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.tests enable row level security;
alter table public.attempts enable row level security;
alter table public.rankings enable row level security;
alter table public.passports enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;

create policy "placeholder_select_policy_users"
on public.users
for select
using (true);

create policy "placeholder_select_policy_profiles"
on public.profiles
for select
using (true);
