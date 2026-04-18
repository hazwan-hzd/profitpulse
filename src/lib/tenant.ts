/**
 * ProfitPulse Tenant Context Library
 *
 * Centralizes organization_id resolution and injection for all API routes.
 * This is the single source of truth for multi-tenant operations.
 *
 * Usage pattern in API routes:
 *   const orgId = await resolveOrgId(request)
 *   if (!orgId) return unauthorizedResponse()
 *   // Use orgId in all insert/update operations
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClientForServer, createServerSupabaseClient, getOrgIdForUser } from '@/utils/supabase/server'

// ============================================================
// CONSTANTS
// ============================================================

export const TENANT_HEADER = 'x-organization-id'

// ============================================================
// RESPONSE HELPERS
// ============================================================

export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 })
}

export function tenantNotFoundResponse() {
  return NextResponse.json(
    { error: 'No organization found for this account. Please complete onboarding.' },
    { status: 403 }
  )
}

// ============================================================
// RESOLVE ORG ID
// Primary function for API routes to get the calling user's org ID.
// Checks middleware-injected header first (fast path), then falls
// back to a DB lookup (needed if middleware header is absent).
// ============================================================

export async function resolveOrgId(request: NextRequest): Promise<string | null> {
  // Fast path: middleware injects the header after auth check
  const headerOrgId = request.headers.get(TENANT_HEADER)
  if (headerOrgId) return headerOrgId

  // Fallback: resolve from auth session via DB lookup
  try {
    const supabase = await createClientForServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    return getOrgIdForUser(user.id)
  } catch {
    return null
  }
}

// ============================================================
// REQUIRE ORG - Wrap API route handlers with auth + org check
// Returns [orgId, userId] or responds with error.
// ============================================================

export async function requireOrg(
  request: NextRequest
): Promise<{ orgId: string; userId: string } | NextResponse> {
  try {
    const supabase = await createClientForServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return unauthorizedResponse()

    const orgId = request.headers.get(TENANT_HEADER) || await getOrgIdForUser(user.id)
    if (!orgId) return tenantNotFoundResponse()

    return { orgId, userId: user.id }
  } catch {
    return unauthorizedResponse('Session error. Please log in again.')
  }
}

// ============================================================
// ADMIN GUARD
// Restricts access to users with 'owner' or 'admin' role in their org.
// ============================================================

export async function requireOrgAdmin(
  request: NextRequest
): Promise<{ orgId: string; userId: string; role: string } | NextResponse> {
  const result = await requireOrg(request)
  if (result instanceof NextResponse) return result

  const { orgId, userId } = result

  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .schema('thrive')
      .from('organization_members')
      .select('role')
      .eq('user_id', userId)
      .eq('organization_id', orgId)
      .single()

    if (error || !data) return unauthorizedResponse('Access denied.')
    if (!['owner', 'admin'].includes(data.role)) {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 })
    }

    return { orgId, userId, role: data.role }
  } catch {
    return unauthorizedResponse()
  }
}

// ============================================================
// SUPER ADMIN GUARD (Neuramerge internal only)
// Checks auth.users.user_metadata.is_superadmin flag.
// ============================================================

export async function requireSuperAdmin(
  request: NextRequest
): Promise<{ userId: string } | NextResponse> {
  try {
    const supabase = await createClientForServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return unauthorizedResponse()

    const isSuperAdmin = user.user_metadata?.is_superadmin === true
    if (!isSuperAdmin) {
      return NextResponse.json({ error: 'Super admin access required.' }, { status: 403 })
    }

    return { userId: user.id }
  } catch {
    return unauthorizedResponse()
  }
}
