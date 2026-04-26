/**
 * Creates mock Auth users + public.users + public.profiles for each app role.
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env (or .env.local).
 *
 * Run: npm run seed:mock-users
 */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function loadEnvFile(name) {
  const path = resolve(root, name)
  if (!existsSync(path)) return {}
  const raw = readFileSync(path, 'utf8')
  const out = {}
  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    let val = t.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

const env = { ...loadEnvFile('.env'), ...loadEnvFile('.env.local') }
const url = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY

const DEFAULT_PASSWORD = env.MOCK_USER_PASSWORD || 'MockPass123!'

/** App roles: public.users uses enum; JWT metadata uses same strings (+ super_admin for platform UI). */
const MOCK_ACCOUNTS = [
  {
    email: 'student.mock@vprp.local',
    password: DEFAULT_PASSWORD,
    dbRole: 'student',
    metaRole: 'student',
    fullName: 'Mock Student',
  },
  {
    email: 'cpo.mock@vprp.local',
    password: DEFAULT_PASSWORD,
    dbRole: 'cpo',
    metaRole: 'cpo',
    fullName: 'Mock CPO',
  },
  {
    email: 'recruiter.mock@vprp.local',
    password: DEFAULT_PASSWORD,
    dbRole: 'recruiter',
    metaRole: 'recruiter',
    fullName: 'Mock Recruiter',
  },
  {
    email: 'admin.mock@vprp.local',
    password: DEFAULT_PASSWORD,
    dbRole: 'admin',
    metaRole: 'super_admin',
    fullName: 'Mock Platform Admin',
  },
]

async function must(queryPromise, label) {
  const { data, error } = await queryPromise
  if (error) {
    throw new Error(`${label}: ${error.message}`)
  }
  return data
}

async function ensureJob(admin, companyId, role, cutoffScore) {
  const existing = await must(
    admin
      .from('jobs')
      .select('id')
      .eq('company_id', companyId)
      .eq('role', role)
      .maybeSingle(),
    `jobs select (${role})`
  )
  if (existing?.id) return existing.id
  const created = await must(
    admin
      .from('jobs')
      .insert({ company_id: companyId, role, cutoff_score: cutoffScore })
      .select('id')
      .single(),
    `jobs insert (${role})`
  )
  return created.id
}

async function ensureSubscription(admin, userId, plan, status) {
  const existing = await must(
    admin
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .eq('plan', plan)
      .maybeSingle(),
    `subscriptions select (${plan})`
  )
  if (existing?.id) return existing.id
  const created = await must(
    admin
      .from('subscriptions')
      .insert({ user_id: userId, plan, status })
      .select('id')
      .single(),
    `subscriptions insert (${plan})`
  )
  return created.id
}

async function hasTable(admin, table) {
  const { error } = await admin.from(table).select('id').limit(1)
  return !error
}

async function main() {
  if (!url || !serviceKey) {
    console.error(
      'Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY in .env / .env.local'
    )
    process.exit(1)
  }

  let createClient
  try {
    ;({ createClient } = await import('@supabase/supabase-js'))
  } catch {
    console.error('Could not load @supabase/supabase-js. Run: npm install @supabase/supabase-js')
    process.exit(1)
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  console.log('Seeding mock users (idempotent: updates password + metadata if email exists)…\n')

  const colleges = await must(admin.from('colleges').select('id,name').order('name'), 'colleges select')
  const companies = await must(admin.from('companies').select('id,name').order('name'), 'companies select')
  const targetRoles = await must(
    admin.from('target_roles').select('label').order('label'),
    'target_roles select'
  )

  const primaryCollegeId = colleges?.[0]?.id ?? null
  const primaryCollegeName = colleges?.[0]?.name ?? null
  let branchName = 'CSE'
  if (primaryCollegeId) {
    const departments = await must(
      admin.from('departments').select('name').eq('college_id', primaryCollegeId).order('name'),
      'departments select'
    )
    if (departments?.[0]?.name) {
      branchName = departments[0].name
    }
  }

  const targetRoleLabel =
    targetRoles?.find((r) => /software/i.test(r.label))?.label ??
    targetRoles?.[0]?.label ??
    'Software Engineer'
  const topCompanyIds = (companies ?? []).slice(0, 3).map((c) => c.id)

  if (primaryCollegeName) {
    console.log(`Using reference data: college=${primaryCollegeName}, branch=${branchName}, target=${targetRoleLabel}`)
  } else {
    console.log('Reference data missing; student profile will use fallback values where possible.')
  }

  const companyByName = new Map((companies ?? []).map((c) => [c.name.toLowerCase(), c.id]))
  const studentCompanyId =
    companyByName.get('infosys') ?? companyByName.get('tcs') ?? companyByName.get('accenture') ?? companies?.[0]?.id
  const recruiterCompanyId =
    companyByName.get('amazon') ?? companyByName.get('accenture') ?? companyByName.get('infosys') ?? companies?.[0]?.id

  let failures = 0
  const seeded = {}

  for (const row of MOCK_ACCOUNTS) {
    const { email, password, dbRole, metaRole, fullName } = row

    const createRes = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: metaRole,
        full_name: fullName,
      },
    })

    let userId = createRes.data?.user?.id

    if (createRes.error) {
      const msg = createRes.error.message || ''
      if (!/already|registered|exists/i.test(msg)) {
        console.error(`  ${email}: create failed:`, msg)
        failures += 1
        continue
      }
      const list = await admin.auth.admin.listUsers({ perPage: 200 })
      if (list.error) {
        console.error(`  ${email}: list users failed:`, list.error.message)
        failures += 1
        continue
      }
      const existing = list.data?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase())
      if (!existing?.id) {
        console.error(`  ${email}: user exists but could not resolve id`)
        failures += 1
        continue
      }
      userId = existing.id
      const upd = await admin.auth.admin.updateUserById(userId, {
        password,
        email_confirm: true,
        user_metadata: {
          ...existing.user_metadata,
          role: metaRole,
          full_name: fullName,
        },
      })
      if (upd.error) {
        console.error(`  ${email}: update failed:`, upd.error.message)
        failures += 1
        continue
      }
      console.log(`  ${email}: updated existing Auth user (${userId})`)
    } else {
      userId = createRes.data.user.id
      console.log(`  ${email}: created Auth user (${userId})`)
    }

    const { error: uErr } = await admin.from('users').upsert(
      {
        id: userId,
        role: dbRole,
        email,
        phone: null,
      },
      { onConflict: 'id' }
    )
    if (uErr) {
      console.error(`  ${email}: public.users upsert failed:`, uErr.message)
      failures += 1
      continue
    }

    const { error: pErr } = await admin.from('profiles').upsert(
      {
        user_id: userId,
        full_name: fullName,
        college_id: dbRole === 'student' ? primaryCollegeId : null,
        branch: dbRole === 'student' ? branchName : null,
        year: dbRole === 'student' ? 4 : null,
        target_role: dbRole === 'student' ? targetRoleLabel : null,
        target_companies: dbRole === 'student' ? topCompanyIds : [],
        onboarding_complete: dbRole === 'student',
        readiness_score: dbRole === 'student' ? 78 : null,
        baseline_completed_at: dbRole === 'student' ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id' }
    )
    if (pErr) {
      console.error(`  ${email}: public.profiles upsert failed:`, pErr.message)
      failures += 1
      continue
    }
    seeded[dbRole] = { userId, email }
  }

  const tables = {
    jobs: await hasTable(admin, 'jobs'),
    applications: await hasTable(admin, 'applications'),
    subscriptions: await hasTable(admin, 'subscriptions'),
    rankings: await hasTable(admin, 'rankings'),
    passports: await hasTable(admin, 'passports'),
    projects: await hasTable(admin, 'projects'),
  }

  // Role-linked dashboard entities
  if (seeded.student?.userId) {
    const studentId = seeded.student.userId

    try {
      if (tables.jobs && tables.applications && studentCompanyId) {
        const jobId = await ensureJob(admin, studentCompanyId, 'Associate Software Engineer', 70)
        await must(
          admin.from('applications').upsert(
            { user_id: studentId, job_id: jobId, status: 'shortlisted' },
            { onConflict: 'user_id,job_id' }
          ),
          'applications upsert'
        )
      }

      if (tables.subscriptions) {
        await ensureSubscription(admin, studentId, 'Pro Annual', 'active')
      }
      if (tables.rankings) {
        await must(
          admin.from('rankings').upsert(
            { user_id: studentId, rank: 12, percentile: 92.4, scope: 'college' },
            { onConflict: 'user_id,scope' }
          ),
          'rankings upsert (college)'
        )
        await must(
          admin.from('rankings').upsert(
            { user_id: studentId, rank: 104, percentile: 88.2, scope: 'state' },
            { onConflict: 'user_id,scope' }
          ),
          'rankings upsert (state)'
        )
      }
      if (tables.passports) {
        await must(
          admin.from('passports').upsert(
            {
              user_id: studentId,
              summary: 'Strong aptitude and consistent coding progress.',
              score_trend: [62, 69, 74, 78],
            },
            { onConflict: 'user_id' }
          ),
          'passports upsert'
        )
      }
      if (tables.projects) {
        await must(
          admin
            .from('projects')
            .delete()
            .eq('user_id', studentId)
            .eq('title', 'Campus Placement Prep Tracker'),
          'projects cleanup'
        )
        await must(
          admin.from('projects').insert({
            user_id: studentId,
            title: 'Campus Placement Prep Tracker',
            link: 'https://github.com/mock/student-placement-tracker',
          }),
          'projects insert'
        )
      }
    } catch (e) {
      failures += 1
      console.error('  student role-linked seed failed:', e instanceof Error ? e.message : e)
    }
  }

  if (seeded.recruiter?.userId && recruiterCompanyId && tables.jobs) {
    try {
      await ensureJob(admin, recruiterCompanyId, 'Graduate SDE', 75)
      await ensureJob(admin, recruiterCompanyId, 'Data Analyst Trainee', 68)
    } catch (e) {
      failures += 1
      console.error('  recruiter role-linked seed failed:', e instanceof Error ? e.message : e)
    }
  }

  console.log('\nDone. Sign in at /auth/login (Password tab) with:\n')
  for (const row of MOCK_ACCOUNTS) {
    console.log(`  ${row.email}  /  ${row.password}  →  metadata.role=${row.metaRole}, public.users.role=${row.dbRole}`)
  }
  console.log('\nOverride password for all with env MOCK_USER_PASSWORD before running.\n')
  const skipped = Object.entries(tables)
    .filter(([, ok]) => !ok)
    .map(([name]) => name)
  if (skipped.length) {
    console.log(`Skipped optional entities (tables missing): ${skipped.join(', ')}`)
  }

  if (failures > 0) {
    console.error(`Completed with ${failures} failure(s).`)
    process.exit(2)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
