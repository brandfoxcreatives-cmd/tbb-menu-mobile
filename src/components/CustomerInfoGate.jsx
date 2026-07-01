import React, { useState } from 'react'

export default function CustomerInfoGate({ initialProfile, onSubmit }) {
  const [name, setName] = useState(initialProfile?.name || '')
  const [facebookName, setFacebookName] = useState(initialProfile?.facebookName || '')
  const [mobileNumber, setMobileNumber] = useState(initialProfile?.mobileNumber || '')
  const [address, setAddress] = useState(initialProfile?.address || '')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name.trim() || !mobileNumber.trim() || !address.trim()) {
      setError('Please fill in your name, mobile number, and address to continue.')
      return
    }
    setError('')
    onSubmit({
      name: name.trim(),
      facebookName: facebookName.trim(),
      mobileNumber: mobileNumber.trim(),
      address: address.trim(),
    })
  }

  return (
    <div className="mx-auto flex h-screen max-w-md flex-col bg-white">
      <div className="border-b border-line bg-forest px-5 pb-6 pt-10 text-cream">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
          Taal Bayview Bistro
        </p>
        <h1 className="mt-1 text-lg font-bold leading-snug">
          Welcome! Let's get a few details before you order.
        </h1>
        <p className="mt-1 text-xs text-cream/70">
          This helps us reach you about your order — takes less than a minute.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <label className="mb-4 block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">
            Full Name *
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Dela Cruz"
            className="w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">
            Facebook Name
          </span>
          <input
            value={facebookName}
            onChange={(e) => setFacebookName(e.target.value)}
            placeholder="Optional, if you have one"
            className="w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">
            Mobile Number *
          </span>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="09XX XXX XXXX"
            className="w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
          />
        </label>

        <label className="mb-2 block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">
            Address *
          </span>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House/street, barangay, city"
            rows={3}
            className="w-full resize-none rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
          />
        </label>

        {error && (
          <p className="mt-2 rounded-xl bg-terracotta-light/50 px-3 py-2 text-xs font-semibold text-terracotta-dark">
            {error}
          </p>
        )}
      </div>

      <div className="safe-bottom border-t border-line bg-white p-4">
        <button
          onClick={handleSubmit}
          className="w-full rounded-2xl bg-terracotta py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft"
        >
          Continue to Menu
        </button>
      </div>
    </div>
  )
}
