import type { SupabaseClient } from '@supabase/supabase-js'
import { postAuthDashboardPath } from '@/lib/auth/post-auth'

export async function resolvePostAuthRedirect(supabase: SupabaseClient): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return '/auth/login'
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_complete, baseline_completed_at')
    .eq('user_id', user.id)
    .maybeSingle()

  return postAuthDashboardPath(user.user_metadata?.role as string | undefined, {
    onboarding_complete: !!profile?.onboarding_complete,
    baseline_completed_at: profile?.baseline_completed_at ?? null,
  })
}
