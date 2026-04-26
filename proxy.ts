import { type NextRequest, NextResponse } from 'next/server'

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/auth/callback',
]

const roleProtectedPrefixes: Record<string, string[]> = {
  '/dashboard/student': ['student'],
  '/dashboard/cpo': ['cpo'],
  '/dashboard/recruiter': ['recruiter'],
  '/dashboard/admin': ['admin', 'super_admin'],
  '/student/dashboard': ['student'],
  '/cpo/dashboard': ['cpo'],
  '/recruiter/dashboard': ['recruiter'],
  '/admin/dashboard': ['admin', 'super_admin'],
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If Supabase is not configured, allow all routes (demo mode)
  if (!isSupabaseConfigured()) {
    return NextResponse.next()
  }

  // Dynamically import updateSession only when Supabase is configured
  const { updateSession } = await import('@/lib/supabase/middleware')

  // Update session and get user
  const { supabaseResponse, user } = await updateSession(request)

  // Allow public routes
  const isPublicRoute = publicRoutes.some((route) =>
    route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isPublicRoute || pathname.startsWith('/api/public')) {
    return supabaseResponse
  }

  // Check if route requires authentication
  const requiresAuth =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/student/dashboard') ||
    pathname.startsWith('/cpo/dashboard') ||
    pathname.startsWith('/recruiter/dashboard') ||
    pathname.startsWith('/admin/dashboard') ||
    pathname.startsWith('/api/protected')

  if (requiresAuth && !user) {
    // Redirect to login if not authenticated
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (user) {
    const role = user.user_metadata?.role as string | undefined

    for (const [prefix, allowedRoles] of Object.entries(roleProtectedPrefixes)) {
      if (pathname.startsWith(prefix)) {
        if (!role || !allowedRoles.includes(role)) {
          const url = request.nextUrl.clone()
          url.pathname = '/auth/login'
          url.searchParams.set('redirect', pathname)
          return NextResponse.redirect(url)
        }
        break
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
