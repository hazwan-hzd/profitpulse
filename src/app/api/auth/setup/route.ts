import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'

// Keep this route protected or remove it perfectly after bootstrap.
// We will allow generating the admin user.
export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient()

    // Create the admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@tlcafe.com',
      password: 'thriveandlove',
      email_confirm: true,
    })

    if (error) {
      if (error.status === 422 && error.message.includes('already exists')) {
        return NextResponse.json({ message: 'Admin user already exists.' })
      }
      throw error
    }

    return NextResponse.json({ message: 'Admin user successfully created.', data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
