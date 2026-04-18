'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BUSINESS_TYPES = [
  { value: 'cafe', label: '☕ Cafe', icon: '☕' },
  { value: 'restaurant', label: '🍽️ Restaurant', icon: '🍽️' },
  { value: 'cloud_kitchen', label: '📦 Cloud Kitchen', icon: '📦' },
  { value: 'bakery', label: '🥐 Bakery', icon: '🥐' },
  { value: 'bar', label: '🍹 Bar / Bistro', icon: '🍹' },
  { value: 'other', label: '🏪 Other', icon: '🏪' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError ] = useState('')
  const [form, setForm] = useState({
    businessName: '',
    businessType: '',
    outletCount: '1',
    contactPhone: '',
  })

  function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  async function handleSubmit() {
    const { businessName, businessType, outletCount, contactPhone } = form
    if (!businessName.trim() || !businessType) {
      setError('Please complete all required fields.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/onboarding/create-org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName.trim(),
          slug: slugify(businessName.trim()),
          businessType,
          outletCount: parseInt(outletCount) || 1,
          contactPhone: contactPhone.trim(),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Setup failed. Please try again.')
        return
      }

      router.push('/dashboard')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {/* Background gradients */}
      <div className="fixed top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Welcome to ProfitPulse</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Set up your business</h1>
          <p className="text-zinc-400">This takes 30 seconds. Your data will be fully isolated from other tenants.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                s === step ? 'bg-emerald-500 text-black' :
                s < step ? 'bg-emerald-500/30 text-emerald-400' :
                'bg-zinc-800 text-zinc-500'
              }`}>{s < step ? '✓' : s}</div>
              {s < 2 && <div className={`w-12 h-0.5 ${step > s ? 'bg-emerald-500' : 'bg-zinc-700'}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-8 backdrop-blur-sm">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-white mb-1">Business details</h2>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Business Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. T&L Cafe, Absolute Thai"
                  value={form.businessName}
                  onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Business Type <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {BUSINESS_TYPES.map(bt => (
                    <button
                      key={bt.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, businessType: bt.value }))}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                        form.businessType === bt.value
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-500'
                      }`}
                    >
                      <span className="text-xl">{bt.icon}</span>
                      <span className="text-xs leading-none">{bt.label.split(' ').slice(1).join(' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Number of outlets</label>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={form.outletCount}
                  onChange={e => setForm(f => ({ ...f, outletCount: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                onClick={() => {
                  if (!form.businessName.trim() || !form.businessType) {
                    setError('Please fill in all required fields.')
                    return
                  }
                  setError('')
                  setStep(2)
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition-colors"
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-white mb-1">Confirm setup</h2>

              <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Business Name</span>
                  <span className="text-white font-medium">{form.businessName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Type</span>
                  <span className="text-white capitalize">{form.businessType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Outlets</span>
                  <span className="text-white">{form.outletCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">URL Slug</span>
                  <span className="text-emerald-400 font-mono text-xs">{slugify(form.businessName)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Plan</span>
                  <span className="text-amber-400 font-medium">Trial (14 days)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Contact Phone (optional)</label>
                <input
                  type="tel"
                  placeholder="+60 12-345 6789"
                  value={form.contactPhone}
                  onChange={e => setForm(f => ({ ...f, contactPhone: e.target.value }))}
                  className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-3 rounded-xl transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Creating...' : 'Launch ProfitPulse 🚀'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Your data is completely isolated. No other tenant can see your business information.
        </p>
      </div>
    </div>
  )
}
