import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/index.html', '/login', '/api/auth/setup', '/onboarding']

function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(r => path === r || path.startsWith(r))
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // ── Unauthenticated user on protected route → redirect to login
  if (!user && !isPublicRoute(path)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // ── Authenticated user on login page → redirect to dashboard
  if (user && path.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // ── Inject organization_id header for authenticated requests
  // This allows API routes and Server Components to skip a DB round trip.
  // The header is resolved once here and forwarded downstream.
  if (user) {
    try {
      const { data: membership } = await supabase
        .schema('thrive' as any)
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id)
        .limit(1)
        .single()

      if (membership?.organization_id) {
        // Clone request to inject header into downstream server components + API routes
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-organization-id', membership.organization_id)
        requestHeaders.set('x-user-id', user.id)

        supabaseResponse = NextResponse.next({
          request: { headers: requestHeaders },
        })

        // Re-apply auth cookies to the new response
        supabaseResponse.headers.set('x-organization-id', membership.organization_id)
      } else if (!isPublicRoute(path) && !path.startsWith('/onboarding') && !path.startsWith('/admin')) {
        // Authenticated user has no org yet → redirect to onboarding
        const url = request.nextUrl.clone()
        url.pathname = '/onboarding'
        return NextResponse.redirect(url)
      }
    } catch {
      // Org lookup failed (e.g. migration not yet run) - allow through, routes handle gracefully
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
}
