import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { requireSuperAdmin } from '@/lib/tenant'

/**
 * GET /api/admin/tenants
 * Returns all organizations with member count and usage stats.
 * Neuramerge super-admin only.
 */
export async function GET(req: NextRequest) {
  const adminResult = await requireSuperAdmin(req)
  if (adminResult instanceof NextResponse) return adminResult

  try {
    const supabase = createServerSupabaseClient()

    const { data: orgs, error } = await supabase
      .schema('thrive' as any)
      .from('organizations')
      .select(`
        id,
        created_at,
        name,
        slug,
        plan,
        is_active,
        business_type,
        outlet_count,
        contact_email,
        contact_phone,
        owner_id
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Enrich with member counts and usage stats
    const enriched = await Promise.all((orgs || []).map(async (org) => {
      const [{ count: memberCount }, { count: invoiceCount }, { count: recipeCount }] = await Promise.all([
        supabase.schema('thrive' as any).from('organization_members')
          .select('id', { count: 'exact', head: true })
          .eq('organization_id', org.id),
        supabase.schema('thrive' as any).from('invoices')
          .select('id', { count: 'exact', head: true })
          .eq('organization_id', org.id),
        supabase.schema('thrive' as any).from('recipes')
          .select('id', { count: 'exact', head: true })
          .eq('organization_id', org.id),
      ])

      return {
        ...org,
        stats: {
          members: memberCount ?? 0,
          invoices: invoiceCount ?? 0,
          recipes: recipeCount ?? 0,
        },
      }
    }))

    return NextResponse.json({ organizations: enriched, total: enriched.length })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PATCH /api/admin/tenants
 * Update a tenant's plan or active status.
 */
export async function PATCH(req: NextRequest) {
  const adminResult = await requireSuperAdmin(req)
  if (adminResult instanceof NextResponse) return adminResult

  try {
    const { orgId, plan, is_active } = await req.json()
    if (!orgId) return NextResponse.json({ error: 'orgId required' }, { status: 400 })

    const supabase = createServerSupabaseClient()
    const updates: Record<string, any> = {}
    if (plan !== undefined) updates.plan = plan
    if (is_active !== undefined) updates.is_active = is_active

    const { data, error } = await supabase
      .schema('thrive' as any)
      .from('organizations')
      .update(updates)
      .eq('id', orgId)
      .select('id, name, plan, is_active')
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, organization: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
