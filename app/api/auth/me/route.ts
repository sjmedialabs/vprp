import { createClient } from '@/lib/supabase/server'
import { successResponse, unauthorizedResponse } from '@/lib/api-response'
import { postAuthDashboardPath } from '@/lib/auth/post-auth'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return unauthorizedResponse()
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_complete, baseline_completed_at, readiness_score')
    .eq('user_id', user.id)
    .maybeSingle()

  const role = user.user_metadata?.role as string | undefined
  const state = {
    onboarding_complete: !!profile?.onboarding_complete,
    baseline_completed_at: profile?.baseline_completed_at ?? null,
  }

  return successResponse({
    userId: user.id,
    email: user.email,
    role,
    ...state,
    readiness_score: profile?.readiness_score ?? null,
    redirectTo: postAuthDashboardPath(role, state),
  })
}
