import React, { useState } from 'react'
import { ORDER_TYPES, orderTypeStyle } from '../utils/orderTypeStyles.js'
import { computeBill, peso } from '../utils/billMath.js'

export default function CheckoutView({ cart, onBack, onSubmit, submitting }) {
  const [tableNumber, setTableNumber] = useState('')
  const [orderType, setOrderType] = useState('Dine In')
  const [totalGuests, setTotalGuests] = useState('1')
  const [seniorCount, setSeniorCount] = useState('0')
  const [error, setError] = useState('')

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const guestsNum = Number(totalGuests) || 1
  const seniorNum = Number(seniorCount) || 0
  const bill = computeBill({ totalGuests: guestsNum, seniorCount: seniorNum, totalBill: subtotal })
  const finalAmount = bill.error ? subtotal : bill.finalAmount

  const handleSubmit = async () => {
    setError('')
    if (bill.error) {
      setError(bill.error)
      return
    }
    try {
      await onSubmit({
        tableNumber: tableNumber || '—',
        orderType,
        items: cart,
        totalGuests: guestsNum,
        seniorPwdCount: seniorNum,
        subtotal,
        pricePerPax: bill.pricePerPax,
        discountPerSenior: bill.discountPerSenior,
        totalDiscount: bill.totalDiscount,
        tax: 0,
        total: finalAmount,
        orderSource: 'Facebook',
      })
    } catch (err) {
      setError(err?.message || 'Could not place the order. Please try again.')
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-white px-4 py-3 shadow-soft">
        <button onClick={onBack} className="text-xl text-ink/60" disabled={submitting}>
          ←
        </button>
        <h1 className="text-base font-bold text-ink">Checkout</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink/40">
          Order Type
        </p>
        <div className="mb-4 flex gap-2">
          {ORDER_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition ${
                orderType === t ? orderTypeStyle(t).solid : 'border border-line text-ink/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <label className="mb-4 block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/40">
            Table / Reference #
          </span>
          <input
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="e.g. Table 5"
            className="w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
          />
        </label>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/40">
              Guests
            </span>
            <input
              type="number"
              min="1"
              step="1"
              value={totalGuests}
              onChange={(e) => setTotalGuests(e.target.value)}
              className="w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/40">
              Senior/PWD
            </span>
            <input
              type="number"
              min="0"
              step="1"
              value={seniorCount}
              onChange={(e) => setSeniorCount(e.target.value)}
              className="w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-line bg-cream p-4">
          <div className="flex justify-between text-sm text-ink/70">
            <span>Subtotal</span>
            <span className="font-mono">{peso(subtotal)}</span>
          </div>
          {!bill.error && seniorNum > 0 && (
            <>
              <div className="mt-1 flex justify-between text-sm text-ink/70">
                <span>Senior/PWD Discount (20%)</span>
                <span className="font-mono text-terracotta-dark">−{peso(bill.totalDiscount)}</span>
              </div>
            </>
          )}
          <div className="mt-2 flex justify-between border-t border-line pt-2 text-base font-bold text-ink">
            <span>Total</span>
            <span className="font-mono">{peso(finalAmount)}</span>
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-xl bg-terracotta-light/50 px-3 py-2 text-xs font-semibold text-terracotta-dark">
            {error}
          </p>
        )}

        <p className="mt-3 text-center text-[10px] text-ink/40">
          All prices are VAT-inclusive. No service charge.
        </p>
      </div>

      <div className="safe-bottom border-t border-line bg-white p-4">
        <button
          onClick={handleSubmit}
          disabled={submitting || cart.length === 0}
          className="w-full rounded-2xl bg-terracotta py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft disabled:opacity-50"
        >
          {submitting ? 'Placing order…' : `Place Order · ${peso(finalAmount)}`}
        </button>
      </div>
    </div>
  )
}
