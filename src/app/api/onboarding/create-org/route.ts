import { NextRequest, NextResponse } from 'next/server'
import { createClientForServer, createServerSupabaseClient } from '@/utils/supabase/server'
import { unauthorizedResponse } from '@/lib/tenant'

export async function POST(req: NextRequest) {
  try {
    // 1. Verify user is authenticated
    const supabase = await createClientForServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return unauthorizedResponse()

    // 2. Check user doesn't already have an org (prevent duplicate creation)
    const serviceClient = createServerSupabaseClient()
    const { data: existingMembership } = await serviceClient
      .schema('thrive' as any)
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (existingMembership?.organization_id) {
      return NextResponse.json(
        { error: 'You already have an organization. Refresh the app.' },
        { status: 409 }
      )
    }

    // 3. Parse request body
    const body = await req.json()
    const { name, slug, businessType, outletCount, contactPhone } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Business name is required.' }, { status: 400 })
    }

    // 4. Create organization record
    const { data: org, error: orgError } = await serviceClient
      .schema('thrive' as any)
      .from('organizations')
      .insert({
        name,
        slug,
        plan: 'trial',
        is_active: true,
        owner_id: user.id,
        business_type: businessType || null,
        outlet_count: outletCount || 1,
        contact_email: user.email,
        contact_phone: contactPhone || null,
      })
      .select('id, name, slug')
      .single()

    if (orgError) {
      // Slug conflict
      if (orgError.code === '23505') {
        return NextResponse.json(
          { error: 'A business with that name already exists. Please use a different name.' },
          { status: 409 }
        )
      }
      throw orgError
    }

    // 5. Create owner membership
    const { error: memberError } = await serviceClient
      .schema('thrive' as any)
      .from('organization_members')
      .insert({
        organization_id: org.id,
        user_id: user.id,
        role: 'owner',
      })

    if (memberError) throw memberError

    return NextResponse.json({
      success: true,
      organization: { id: org.id, name: org.name, slug: org.slug },
    })
  } catch (error: any) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: error.message || 'Setup failed. Please try again.' },
      { status: 500 }
    )
  }
}
