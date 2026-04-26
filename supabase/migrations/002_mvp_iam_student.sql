-- MVP: student profile fields, reference data, RLS for self-service profile
-- Run in Supabase SQL editor or via supabase db push

-- Ensure core tables exist when this migration is run standalone.
create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('student', 'cpo', 'recruiter', 'admin');
  end if;
end $$;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  role public.user_role not null default 'student',
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

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
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

alter table public.profiles
  add column if not exists full_name text,
  add column if not exists target_companies jsonb default '[]'::jsonb,
  add column if not exists onboarding_complete boolean default false,
  add column if not exists readiness_score numeric(6,2),
  add column if not exists baseline_completed_at timestamptz;

create table if not exists public.target_roles (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  created_at timestamptz not null default now()
);

insert into public.target_roles (label)
values
  ('Software Engineer'),
  ('Data Engineer'),
  ('Product Manager'),
  ('Consulting'),
  ('Core / Non-IT')
on conflict (label) do nothing;

-- Demo colleges / departments for dropdowns (replace with CPO-managed data in production)
insert into public.colleges (name, location)
select 'Demo Institute of Technology', 'Bengaluru'
where not exists (select 1 from public.colleges where name = 'Demo Institute of Technology');

insert into public.colleges (name, location)
select 'National Engineering College', 'Chennai'
where not exists (select 1 from public.colleges where name = 'National Engineering College');

insert into public.departments (college_id, name)
select c.id, d.name
from public.colleges c
cross join (values ('CSE'), ('IT'), ('ECE'), ('Mechanical')) as d(name)
where c.name = 'Demo Institute of Technology'
  and not exists (
    select 1 from public.departments x where x.college_id = c.id and x.name = d.name
  );

insert into public.departments (college_id, name)
select c.id, d.name
from public.colleges c
cross join (values ('CSE'), ('IT'), ('EEE')) as d(name)
where c.name = 'National Engineering College'
  and not exists (
    select 1 from public.departments x where x.college_id = c.id and x.name = d.name
  );

insert into public.companies (name)
select t.v
from (values ('TCS'), ('Infosys'), ('Wipro'), ('Accenture'), ('Amazon')) as t(v)
where not exists (select 1 from public.companies c where c.name = t.v);

alter table public.colleges enable row level security;
alter table public.departments enable row level security;
alter table public.companies enable row level security;
alter table public.target_roles enable row level security;

drop policy if exists "colleges_select_authenticated" on public.colleges;
create policy "colleges_select_authenticated"
  on public.colleges for select using (true);

drop policy if exists "departments_select_authenticated" on public.departments;
create policy "departments_select_authenticated"
  on public.departments for select using (true);

drop policy if exists "companies_select_authenticated" on public.companies;
create policy "companies_select_authenticated"
  on public.companies for select using (true);

drop policy if exists "target_roles_select_authenticated" on public.target_roles;
create policy "target_roles_select_authenticated"
  on public.target_roles for select using (true);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (user_id = auth.uid());

drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
  on public.users for select to authenticated
  using (id = auth.uid());
