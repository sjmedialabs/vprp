import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import {
  errorResponse,
  forbiddenResponse,
  successResponse,
  unauthorizedResponse,
} from '@/lib/api-response'
import { isSignupRole } from '@/lib/auth/dashboard-path'

const DB_ROLES = ['student', 'cpo', 'recruiter', 'admin'] as const
type DbRole = (typeof DB_ROLES)[number]

function normalizeMetaRole(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  return raw === 'super_admin' ? 'admin' : raw
}

function resolveBootstrapRole(
  bodyRole: string | undefined,
  metaRaw: string | undefined
): { role: DbRole; error?: Response } {
  const meta = normalizeMetaRole(metaRaw)
  const bodyNorm = bodyRole === 'super_admin' ? 'admin' : bodyRole

  let role: string =
    bodyNorm && isSignupRole(bodyNorm)
      ? bodyNorm
      : meta && DB_ROLES.includes(meta as DbRole)
        ? meta
        : 'student'

  if (!DB_ROLES.includes(role as DbRole)) {
    role = 'student'
  }

  if (role === 'admin') {
    const metaAllowsAdmin = metaRaw === 'admin' || metaRaw === 'super_admin' || meta === 'admin'
    if (!metaAllowsAdmin) {
      if (bodyNorm === 'admin' || bodyRole === 'super_admin') {
        return { role: 'student', error: forbiddenResponse('Cannot self-assign admin role') }
      }
      role = 'student'
    }
  }

  return { role: role as DbRole }
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user?.id) {
    return unauthorizedResponse()
  }

  let body: { role?: string; full_name?: string; phone?: string | null }
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const { role, error } = resolveBootstrapRole(body.role, user.user_metadata?.role as string | undefined)
  if (error) {
    return error
  }

  const admin = createAdminClient()
  if (!admin) {
    return errorResponse('Server bootstrap unavailable (missing SUPABASE_SERVICE_ROLE_KEY)', 503)
  }

  const fullName = body.full_name ?? (user.user_metadata?.full_name as string | undefined) ?? null
  const phone = body.phone ?? user.phone ?? user.user_metadata?.phone ?? null

  const { error: metaError } = await admin.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...user.user_metadata,
      role,
      full_name: fullName,
      phone,
    },
  })
  if (metaError) {
    return errorResponse(metaError.message, 400)
  }

  const { error: usersError } = await admin.from('users').upsert(
    {
      id: user.id,
      role,
      email: user.email ?? '',
      phone: typeof phone === 'string' ? phone : null,
    },
    { onConflict: 'id' }
  )
  if (usersError) {
    return errorResponse(usersError.message, 400)
  }

  const { error: profileError } = await admin.from('profiles').upsert(
    {
      user_id: user.id,
      full_name: fullName,
    },
    { onConflict: 'user_id' }
  )
  if (profileError) {
    return errorResponse(profileError.message, 400)
  }

  return successResponse({ userId: user.id, role })
}
