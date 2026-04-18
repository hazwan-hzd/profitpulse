import { redirect } from 'next/navigation'
import { createClientForServer } from '@/utils/supabase/server'

export const metadata = {
  title: 'Admin - ProfitPulse',
}

// ── Server Component: verify super-admin before rendering
async function getSuperAdminData() {
  const supabase = await createClientForServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !user.user_metadata?.is_superadmin) redirect('/dashboard')

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/tenants`, {
    headers: { cookie: '' }, // headers forwarded by Next.js SSR context
    cache: 'no-store',
  })

  if (!res.ok) return { orgs: [], total: 0 }
  return res.json().then(d => ({ orgs: d.organizations ?? [], total: d.total ?? 0 }))
}

const PLAN_COLORS: Record<string, string> = {
  trial: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  starter: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  pro: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
}

export default async function AdminPage() {
  const { orgs, total } = await getSuperAdminData()

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-400 text-xs font-medium">Neuramerge Super Admin</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Tenant Management</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {total} organizations registered across ProfitPulse
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orgs', value: total, color: 'text-white' },
          { label: 'Trial', value: orgs.filter((o: any) => o.plan === 'trial').length, color: 'text-amber-400' },
          { label: 'Pro', value: orgs.filter((o: any) => o.plan === 'pro').length, color: 'text-emerald-400' },
          { label: 'Active', value: orgs.filter((o: any) => o.is_active).length, color: 'text-blue-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-zinc-900 border border-zinc-700/50 rounded-xl p-4">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tenant Table */}
      <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-700/50">
          <h2 className="text-sm font-semibold text-zinc-300">All Tenants</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Business</th>
                <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3">Plan</th>
                <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3">Status</th>
                <th className="text-right text-xs font-medium text-zinc-500 px-4 py-3">Members</th>
                <th className="text-right text-xs font-medium text-zinc-500 px-4 py-3">Invoices</th>
                <th className="text-right text-xs font-medium text-zinc-500 px-4 py-3">Recipes</th>
                <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {orgs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-zinc-500 py-12">
                    No organizations yet. Run the migration and seed T&L Cafe.
                  </td>
                </tr>
              ) : (
                orgs.map((org: any) => (
                  <tr key={org.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white text-sm">{org.name}</div>
                      <div className="text-zinc-500 text-xs font-mono mt-0.5">{org.slug}</div>
                      {org.business_type && (
                        <div className="text-zinc-600 text-xs capitalize mt-0.5">{org.business_type.replace('_', ' ')} - {org.outlet_count} outlet(s)</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${PLAN_COLORS[org.plan] || 'text-zinc-400 bg-zinc-800 border-zinc-600'}`}>
                        {org.plan}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${org.is_active ? 'text-emerald-400' : 'text-red-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${org.is_active ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {org.is_active ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-zinc-300 text-sm">{org.stats?.members ?? 0}</td>
                    <td className="px-4 py-4 text-right text-zinc-300 text-sm">{org.stats?.invoices ?? 0}</td>
                    <td className="px-4 py-4 text-right text-zinc-300 text-sm">{org.stats?.recipes ?? 0}</td>
                    <td className="px-4 py-4 text-zinc-500 text-xs">
                      {new Date(org.created_at).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-zinc-700 text-xs text-center mt-6">
        ProfitPulse Admin - Neuramerge Sdn Bhd - Confidential
      </p>
    </div>
  )
}
