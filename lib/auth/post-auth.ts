import { dashboardPathForRole } from '@/lib/auth/dashboard-path'

export type PostAuthProfileState = {
  onboarding_complete: boolean
  baseline_completed_at: string | null
}

/** Where to send the user immediately after a successful auth session is established. */
export function postAuthDashboardPath(
  role: string | undefined,
  profile: PostAuthProfileState
): string {
  const r = role === 'super_admin' ? 'admin' : role
  if (r === 'student' || r === undefined) {
    if (!profile.onboarding_complete) {
      return '/dashboard/student/onboarding'
    }
    if (!profile.baseline_completed_at) {
      return '/dashboard/student/baseline'
    }
  }
  return dashboardPathForRole(r)
}
