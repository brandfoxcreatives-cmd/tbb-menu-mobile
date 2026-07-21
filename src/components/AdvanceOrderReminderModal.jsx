import React, { useState } from 'react'

function formatTime12h(time24) {
  if (!time24) return ''
  const [h, m] = time24.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

export default function AdvanceOrderReminderModal({ orders, onAcknowledge }) {
  const [index, setIndex] = useState(0)
  const [busy, setBusy] = useState(false)

  if (!orders.length) return null
  const order = orders[Math.min(index, orders.length - 1)]

  const handleAcknowledge = async () => {
    setBusy(true)
    try {
      await onAcknowledge(order.id)
      setIndex((i) => (i + 1 < orders.length ? i + 1 : 0))
    } finally {
      setBusy(false)
    }
  }

  const typeLabel =
    order.orderType === 'Take Away'
      ? 'pickup'
      : order.orderType === 'Delivery'
        ? 'delivery'
        : 'dine-in'

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/50 p-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-clay bg-white shadow-card">
        <div className="rounded-t-2xl bg-clay px-5 py-4 text-cream">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase leading-none tracking-wide">
              <span className="leading-none">⏰</span> Your Order Is Coming Up
            </p>
            {orders.length > 1 && (
              <span className="shrink-0 whitespace-nowrap rounded-full bg-clay-dark px-2 py-0.5 font-mono text-[11px] font-bold leading-none">
                {index + 1} / {orders.length}
              </span>
            )}
          </div>
          <p className="mt-1 font-mono text-sm font-bold">{order.orderNumber}</p>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-snug text-ink">
            Your <span className="font-bold">{typeLabel}</span> order is scheduled for{' '}
            <span className="font-bold">
              {order.scheduledDate} at {formatTime12h(order.scheduledTime)}
            </span>{' '}
            — that's about an hour from now.
          </p>

          <div className="mt-3 rounded-xl bg-cream p-3 text-xs text-ink/70">
            {order.orderType === 'Take Away'
              ? "Please make sure you're on your way so it's fresh when you arrive."
              : "Please make sure you're on your way to the restaurant."}
          </div>

          {(order.items || []).length > 0 && (
            <ul className="mt-3 flex flex-col gap-1 text-xs text-ink/60">
              {order.items.slice(0, 4).map((it, i) => (
                <li key={i}>
                  {it.qty}× {it.name}
                </li>
              ))}
              {order.items.length > 4 && <li>+{order.items.length - 4} more…</li>}
            </ul>
          )}
        </div>

        <div className="border-t border-line p-4">
          <button
            onClick={handleAcknowledge}
            disabled={busy}
            className="w-full rounded-xl bg-clay py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-clay-dark disabled:opacity-50"
          >
            {busy ? '…' : '✅ Got it, thanks!'}
          </button>
        </div>
      </div>
    </div>
  )
}
