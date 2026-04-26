-- Production foundation: missing operational tables + strict role-based RLS.
-- Safe to run on partially-initialized environments.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'application_status') then
    create type public.application_status as enum ('applied', 'shortlisted', 'rejected', 'hired');
  end if;

  if not exists (select 1 from pg_type where typname = 'subscription_status') then
    create type public.subscription_status as enum ('active', 'inactive', 'cancelled', 'trial');
  end if;
end $$;

-- Core recruiter/student/admin operational entities.
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

create table if not exists public.rankings (
  user_id uuid not null references public.users(id) on delete cascade,
  rank int not null,
  percentile numeric(5,2) not null,
  scope text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, scope)
);

-- Idempotency and lookup indexes.
create unique index if not exists idx_jobs_company_role_unique on public.jobs(company_id, role);
create unique index if not exists idx_subscriptions_user_plan_unique on public.subscriptions(user_id, plan);
create unique index if not exists idx_projects_user_title_unique on public.projects(user_id, title);
create unique index if not exists idx_payments_razorpay_unique
  on public.payments(razorpay_payment_id)
  where razorpay_payment_id is not null;

create index if not exists idx_jobs_company_id on public.jobs(company_id);
create index if not exists idx_applications_user_id on public.applications(user_id);
create index if not exists idx_applications_job_id on public.applications(job_id);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_payments_user_id on public.payments(user_id);
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_rankings_scope on public.rankings(scope);

-- RLS role resolver via public.users.
create or replace function public.current_user_role()
returns text
language sql
stable
as $$
  select role::text from public.users where id = auth.uid()
$$;

alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.passports enable row level security;
alter table public.projects enable row level security;
alter table public.rankings enable row level security;

-- Remove permissive placeholders if present.
drop policy if exists "placeholder_select_policy_users" on public.users;
drop policy if exists "placeholder_select_policy_profiles" on public.profiles;
drop policy if exists "placeholder_select_policy_jobs" on public.jobs;
drop policy if exists "placeholder_select_policy_applications" on public.applications;
drop policy if exists "placeholder_select_policy_subscriptions" on public.subscriptions;
drop policy if exists "placeholder_select_policy_payments" on public.payments;
drop policy if exists "placeholder_select_policy_passports" on public.passports;
drop policy if exists "placeholder_select_policy_rankings" on public.rankings;

-- USERS: own record + admins can inspect/update all.
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own_or_admin"
  on public.users for select to authenticated
  using (
    id = auth.uid()
    or public.current_user_role() in ('admin', 'super_admin')
  );

drop policy if exists "users_update_admin_only" on public.users;
create policy "users_update_admin_only"
  on public.users for update to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'))
  with check (public.current_user_role() in ('admin', 'super_admin'));

-- PROFILES: own record + admin can inspect/update all, cpo/recruiter can read only students.
drop policy if exists "profiles_select_own_or_staff" on public.profiles;
create policy "profiles_select_own_or_staff"
  on public.profiles for select to authenticated
  using (
    user_id = auth.uid()
    or public.current_user_role() in ('admin', 'super_admin')
    or (
      public.current_user_role() in ('cpo', 'recruiter')
      and exists (
        select 1 from public.users u
        where u.id = public.profiles.user_id
          and u.role = 'student'
      )
    )
  );

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert to authenticated
  with check (
    user_id = auth.uid()
    or public.current_user_role() in ('admin', 'super_admin')
  );

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
  on public.profiles for update to authenticated
  using (
    user_id = auth.uid()
    or public.current_user_role() in ('admin', 'super_admin')
  )
  with check (
    user_id = auth.uid()
    or public.current_user_role() in ('admin', 'super_admin')
  );

-- JOBS: recruiters/admin manage; authenticated users can read.
drop policy if exists "jobs_select_authenticated" on public.jobs;
create policy "jobs_select_authenticated"
  on public.jobs for select to authenticated
  using (true);

drop policy if exists "jobs_manage_recruiter_admin" on public.jobs;
create policy "jobs_manage_recruiter_admin"
  on public.jobs for all to authenticated
  using (public.current_user_role() in ('recruiter', 'admin', 'super_admin'))
  with check (public.current_user_role() in ('recruiter', 'admin', 'super_admin'));

-- APPLICATIONS: student owns applications; recruiters/cpo/admin can read.
drop policy if exists "applications_select_own_or_staff" on public.applications;
create policy "applications_select_own_or_staff"
  on public.applications for select to authenticated
  using (
    user_id = auth.uid()
    or public.current_user_role() in ('recruiter', 'cpo', 'admin', 'super_admin')
  );

drop policy if exists "applications_insert_own_student" on public.applications;
create policy "applications_insert_own_student"
  on public.applications for insert to authenticated
  with check (
    user_id = auth.uid()
    and public.current_user_role() = 'student'
  );

drop policy if exists "applications_update_staff" on public.applications;
create policy "applications_update_staff"
  on public.applications for update to authenticated
  using (public.current_user_role() in ('recruiter', 'cpo', 'admin', 'super_admin'))
  with check (public.current_user_role() in ('recruiter', 'cpo', 'admin', 'super_admin'));

-- SUBSCRIPTIONS/PAYMENTS: own read; admins full access.
drop policy if exists "subscriptions_select_own_or_admin" on public.subscriptions;
create policy "subscriptions_select_own_or_admin"
  on public.subscriptions for select to authenticated
  using (user_id = auth.uid() or public.current_user_role() in ('admin', 'super_admin'));

drop policy if exists "subscriptions_manage_admin" on public.subscriptions;
create policy "subscriptions_manage_admin"
  on public.subscriptions for all to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'))
  with check (public.current_user_role() in ('admin', 'super_admin'));

drop policy if exists "payments_select_own_or_admin" on public.payments;
create policy "payments_select_own_or_admin"
  on public.payments for select to authenticated
  using (user_id = auth.uid() or public.current_user_role() in ('admin', 'super_admin'));

drop policy if exists "payments_manage_admin" on public.payments;
create policy "payments_manage_admin"
  on public.payments for all to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'))
  with check (public.current_user_role() in ('admin', 'super_admin'));

-- PASSPORTS/PROJECTS/RANKINGS: own read/write; staff read.
drop policy if exists "passports_select_own_or_staff" on public.passports;
create policy "passports_select_own_or_staff"
  on public.passports for select to authenticated
  using (
    user_id = auth.uid()
    or public.current_user_role() in ('recruiter', 'cpo', 'admin', 'super_admin')
  );

drop policy if exists "passports_write_own_or_admin" on public.passports;
create policy "passports_write_own_or_admin"
  on public.passports for all to authenticated
  using (user_id = auth.uid() or public.current_user_role() in ('admin', 'super_admin'))
  with check (user_id = auth.uid() or public.current_user_role() in ('admin', 'super_admin'));

drop policy if exists "projects_select_own_or_staff" on public.projects;
create policy "projects_select_own_or_staff"
  on public.projects for select to authenticated
  using (
    user_id = auth.uid()
    or public.current_user_role() in ('recruiter', 'cpo', 'admin', 'super_admin')
  );

drop policy if exists "projects_write_own_or_admin" on public.projects;
create policy "projects_write_own_or_admin"
  on public.projects for all to authenticated
  using (user_id = auth.uid() or public.current_user_role() in ('admin', 'super_admin'))
  with check (user_id = auth.uid() or public.current_user_role() in ('admin', 'super_admin'));

drop policy if exists "rankings_select_authenticated" on public.rankings;
create policy "rankings_select_authenticated"
  on public.rankings for select to authenticated
  using (true);

drop policy if exists "rankings_manage_admin" on public.rankings;
create policy "rankings_manage_admin"
  on public.rankings for all to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'))
  with check (public.current_user_role() in ('admin', 'super_admin'));
