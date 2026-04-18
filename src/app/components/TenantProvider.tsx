'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Organization } from '@/utils/supabase/server'

// ============================================================
// TENANT CONTEXT
// Provides org data to all client components.
// The org is resolved server-side in RootLayout and passed as a prop.
// ============================================================

export type TenantContextValue = {
  organization: Organization | null
  organizationId: string | null
  organizationName: string
  plan: string
  role: string | null
}

const TenantContext = createContext<TenantContextValue>({
  organization: null,
  organizationId: null,
  organizationName: 'ProfitPulse',
  plan: 'trial',
  role: null,
})

export function TenantProvider({
  children,
  value,
}: {
  children: ReactNode
  value: TenantContextValue
}) {
  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant(): TenantContextValue {
  return useContext(TenantContext)
}
