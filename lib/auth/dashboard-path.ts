export function dashboardPathForRole(role: string | undefined): string {
  switch (role) {
    case 'cpo':
      return '/dashboard/cpo'
    case 'recruiter':
      return '/dashboard/recruiter'
    case 'admin':
    case 'super_admin':
      return '/dashboard/admin'
    default:
      return '/dashboard/student'
  }
}

export type SignupRole = 'student' | 'cpo' | 'recruiter'

export function isSignupRole(v: string): v is SignupRole {
  return v === 'student' || v === 'cpo' || v === 'recruiter'
}
