import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export type Organization = {
  id: string
  name: string
  slug: string
  plan: string
  is_active: boolean
  business_type: string | null
  outlet_count: number
  owner_id: string | null
}

export type OrganizationMember = {
  id: string
  organization_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  organizations: Organization
}

// ============================================================
// SSR CLIENT (for Server Components and auth checks)
// ============================================================

export async function createClientForServer() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      db: { schema: 'thrive' as any }
    }
  )
}

// ============================================================
// SERVICE ROLE CLIENT (for API routes - writes, admin ops)
// NEVER expose the service role key to the browser
// ============================================================

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
    )
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: { schema: 'thrive' as any }
  })
}

// ============================================================
// TENANT RESOLVER
// Resolves the calling user's active organization membership.
// Used in Server Components and API routes to get organization context.
// ============================================================

export async function getUserOrganization(): Promise<OrganizationMember | null> {
  try {
    const supabase = await createClientForServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .schema('thrive')
      .from('organization_members')
      .select(`
        id,
        organization_id,
        user_id,
        role,
        organizations (
          id,
          name,
          slug,
          plan,
          is_active,
          business_type,
          outlet_count,
          owner_id
        )
      `)
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (error || !data) return null
    return data as unknown as OrganizationMember
  } catch {
    return null
  }
}

// ============================================================
// SERVICE ROLE TENANT RESOLVER
// For API routes that need org context using the service role.
// Pass the authenticated user's ID resolved from the SSR client.
// ============================================================

export async function getOrgIdForUser(userId: string): Promise<string | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .schema('thrive')
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', userId)
      .limit(1)
      .single()

    if (error || !data) return null
    return data.organization_id
  } catch {
    return null
  }
}
