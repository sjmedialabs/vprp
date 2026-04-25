// Authentication Utilities
// Role-based access control and session management

import { createClient } from '@/lib/supabase/server'
import type { User, UserRole } from '@/types'

// Role hierarchy for permission checking
export const roleHierarchy: Record<UserRole, number> = {
  student: 1,
  cpo: 2,
  recruiter: 2,
  admin: 4,
  super_admin: 4,
}

// Route access configuration
export const routeAccess: Record<string, UserRole[]> = {
  '/dashboard/student': ['student'],
  '/dashboard/cpo': ['cpo'],
  '/dashboard/recruiter': ['recruiter'],
  '/student/dashboard': ['student'],
  '/cpo/dashboard': ['cpo'],
  '/recruiter/dashboard': ['recruiter'],
  '/admin/dashboard': ['admin', 'super_admin'],
  '/dashboard/admin': ['super_admin'],
}

/**
 * Get the current authenticated user with role
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  
  const { data: { user: authUser } } = await supabase.auth.getUser()
  
  if (!authUser) return null
  
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single()
  
  return user
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(userRole: UserRole, pathname: string): boolean {
  // Super admin can access everything
  if (userRole === 'super_admin') return true
  
  // Check specific route access
  for (const [route, allowedRoles] of Object.entries(routeAccess)) {
    if (pathname.startsWith(route)) {
      return allowedRoles.includes(userRole)
    }
  }
  
  // Default: allow access to non-protected routes
  return true
}

/**
 * Get dashboard URL for a specific role
 */
export function getDashboardUrl(role: UserRole): string {
  const dashboardRoutes: Record<UserRole, string> = {
    student: '/dashboard/student',
    cpo: '/dashboard/cpo',
    recruiter: '/dashboard/recruiter',
    admin: '/dashboard/admin',
    super_admin: '/dashboard/admin',
  }
  
  return dashboardRoutes[role]
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const displayNames: Record<UserRole, string> = {
    student: 'Student',
    cpo: 'College Placement Officer',
    recruiter: 'Recruiter',
    admin: 'Administrator',
    super_admin: 'Super Administrator',
  }
  
  return displayNames[role]
}

/**
 * Validate role for signup
 */
export function isValidRole(role: string): role is UserRole {
  return ['student', 'cpo', 'recruiter', 'admin', 'super_admin'].includes(role)
}
