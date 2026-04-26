import { createClient } from '@/lib/supabase/server'
import { errorResponse, successResponse, unauthorizedResponse } from '@/lib/api-response'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return unauthorizedResponse()
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(
      'user_id,full_name,college_id,branch,year,target_role,target_companies,onboarding_complete,readiness_score,baseline_completed_at'
    )
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    return errorResponse(error.message, 500)
  }

  return successResponse({ profile, email: user.email, role: user.user_metadata?.role })
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return unauthorizedResponse()
  }

  let body: {
    full_name?: string
    college_id?: string | null
    branch?: string | null
    year?: number | null
    target_role?: string | null
    target_companies?: string[] | null
    onboarding_complete?: boolean
  }
  try {
    body = await request.json()
  } catch {
    return errorResponse('Invalid JSON body', 400)
  }

  const payload: Record<string, unknown> = {}
  if (body.full_name !== undefined) payload.full_name = body.full_name
  if (body.college_id !== undefined) payload.college_id = body.college_id
  if (body.branch !== undefined) payload.branch = body.branch
  if (body.year !== undefined) payload.year = body.year
  if (body.target_role !== undefined) payload.target_role = body.target_role
  if (body.target_companies !== undefined) payload.target_companies = body.target_companies
  if (body.onboarding_complete !== undefined) payload.onboarding_complete = body.onboarding_complete

  const row = { user_id: user.id, ...payload }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(row, { onConflict: 'user_id' })
    .select()
    .maybeSingle()

  if (error) {
    return errorResponse(error.message, 400)
  }

  return successResponse(data)
}
