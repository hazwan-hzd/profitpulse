import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'

// We no longer manually cache _supabase because createBrowserClient handles memoization under the hood in Next.js
export function getSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, { db: { schema: 'thrive' as any } })
}

// Legacy export for backward compat
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase()
    if (!client) {
      throw new Error('Supabase not configured')
    }
    return (client as any)[prop]
  },
})
