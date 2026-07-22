import React, { useRef, useState } from 'react'
import { ORDER_TYPES, orderTypeStyle } from '../utils/orderTypeStyles.js'
import { peso } from '../utils/billMath.js'
import { usePaymentProofUpload } from '../hooks/usePaymentProofUpload.js'
import { isWithinStoreHours, storeHoursLabel } from '../utils/scheduling.js'

const COD_LIMIT = 500

const PAYMENT_METHODS = [
  { id: 'GCash', label: 'GCash', needsProof: true },
  { id: 'Bank Transfer', label: 'Bank Transfer', needsProof: true },
  { id: 'Cash on Delivery', label: 'Cash on Delivery', needsProof: false },
]

function todayDateStr() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

export default function CheckoutView({ cart, onBack, onSubmit, submitting }) {
  const [orderType, setOrderType] = useState('Dine In')
  const [orderDate, setOrderDate] = useState(todayDateStr())
  const [orderTime, setOrderTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('GCash')
  const [proofUrl, setProofUrl] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const { uploadPaymentProof, uploading } = usePaymentProofUpload()

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal

  const availablePaymentMethods = PAYMENT_METHODS.filter(
    (m) => m.id !== 'Cash on Delivery' || total < COD_LIMIT,
  )
  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod)

  const handleProofChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    try {
      const url = await uploadPaymentProof(file, 'checkout')
      setProofUrl(url)
    } catch (err) {
      setError('Could not upload that image — please try again.')
    }
  }

  const handleSubmit = async () => {
    setError('')
    if (!orderDate || !orderTime) {
      setError(
        orderType === 'Dine In'
          ? 'Please choose your preferred dine-in date and time.'
          : 'Please choose your preferred pickup date and time.',
      )
      return
    }
    if (!isWithinStoreHours(orderTime)) {
      setError(`We're only open ${storeHoursLabel()} — please pick a time within store hours.`)
      return
    }
    if (selectedMethod?.needsProof && !proofUrl) {
      setError('Please upload your proof of payment before placing the order.')
      return
    }
    try {
      await onSubmit({
        tableNumber: '—',
        orderType,
        scheduledDate: orderDate,
        scheduledTime: orderTime,
        items: cart,
        subtotal,
        tax: 0,
        total,
        paymentMethod,
        paymentProofUrl: proofUrl || null,
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
        <div className="mb-3 flex gap-2">
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

        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink/40">
          {orderType === 'Dine In' ? 'Preferred Dine-in Date & Time' : 'Preferred Pickup Date & Time'}
        </p>
        <div className="mb-1 grid grid-cols-2 gap-2">
          <input
            type="date"
            min={todayDateStr()}
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
          />
          <input
            type="time"
            min="08:00"
            max="19:00"
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
            className="w-full rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm focus:border-forest focus:outline-none"
          />
        </div>
        <p className="mb-3 text-[10px] text-ink/40">Store hours: {storeHoursLabel()}</p>

        {orderType === 'Take Away' && (
          <div className="mb-4 rounded-xl bg-cream px-3.5 py-2.5 text-xs text-ink/70">
            🍳 Estimated preparation time: <span className="font-bold">20–30 minutes</span> from
            when your order is confirmed — pick a time that gives us enough of a head
            start, and we'll have it packed and ready right when you arrive.
          </div>
        )}

        <div className="mb-4 rounded-xl border border-dashed border-clay bg-clay-light/30 px-3.5 py-2.5 text-xs text-clay-dark">
          🛵 Craving delivery? Order Take Away here, then book your favorite rider
          (Grab, Lalamove, Angkas, etc.) to pick it up — their delivery fee is settled
          with them directly and isn't part of your food bill.
        </div>

        <div className="mb-4 rounded-2xl border border-line bg-cream p-4">
          <div className="flex justify-between text-sm text-ink/70">
            <span>Subtotal</span>
            <span className="font-mono">{peso(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-line pt-2 text-base font-bold text-ink">
            <span>Total</span>
            <span className="font-mono">{peso(total)}</span>
          </div>
        </div>

        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink/40">
          Mode of Payment
        </p>
        <div className="mb-3 flex flex-col gap-2">
          {availablePaymentMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setPaymentMethod(m.id)
                setProofUrl('')
              }}
              className={`rounded-xl border-2 px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                paymentMethod === m.id
                  ? 'border-forest bg-forest text-cream'
                  : 'border-line text-ink/70'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        {total >= COD_LIMIT && (
          <p className="mb-3 text-[11px] text-ink/40">
            Cash on Delivery/Counter is only available for orders under ₱{COD_LIMIT}.
          </p>
        )}

        {selectedMethod?.needsProof && (
          <div className="mb-4 rounded-xl border border-gold bg-gold-light/40 p-3">
            <p className="text-xs font-bold text-forest-dark">
              Send payment to: <span className="font-mono">0966 332 0022</span> (GCash,
              Taal Bayview Bistro)
            </p>
            <p className="mt-1 text-[11px] text-ink/60">
              Please upload a screenshot of your payment confirmation — your order will
              be sent to the kitchen once we've verified it.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProofChange}
            />
            {proofUrl ? (
              <div className="mt-2 flex items-center gap-2">
                <img src={proofUrl} alt="Proof of payment" className="h-12 w-12 rounded-lg object-cover" />
                <span className="text-xs font-bold text-ready">✓ Uploaded</span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-forest-dark underline"
                >
                  Replace
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-2 rounded-full bg-forest px-4 py-1.5 text-xs font-bold text-cream disabled:opacity-50"
              >
                {uploading ? 'Uploading…' : '📎 Upload Proof of Payment'}
              </button>
            )}
          </div>
        )}

        {error && (
          <p className="mb-3 rounded-xl bg-terracotta-light/50 px-3 py-2 text-xs font-semibold text-terracotta-dark">
            {error}
          </p>
        )}

        <div className="mb-3 rounded-xl bg-cream px-3.5 py-3 text-xs text-ink/60">
          <p className="font-bold text-ink">Need to reach us directly?</p>
          <p className="mt-1">(043) 741 4572</p>
          <p>0966 332 0022 (Globe)</p>
          <p>0961 565 7453 (Smart)</p>
        </div>

        <p className="text-center text-[10px] text-ink/40">
          All prices are VAT-inclusive. No service charge.
        </p>
      </div>

      <div className="safe-bottom border-t border-line bg-white p-4">
        <button
          onClick={handleSubmit}
          disabled={submitting || cart.length === 0 || uploading}
          className="w-full rounded-2xl bg-terracotta py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft disabled:opacity-50"
        >
          {submitting ? 'Placing order…' : `Place Order · ${peso(total)}`}
        </button>
      </div>
    </div>
  )
}
