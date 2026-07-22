import React, { useState } from 'react'
import { useMultiOrderTracking } from '../hooks/useCustomerOrder.js'
import OrderTracker, { STEPS } from './OrderTracker.jsx'

const STATUS_STYLES = {
  awaiting_approval: 'bg-clay-light text-clay-dark',
  pending: 'bg-gold-light text-forest-dark',
  cooking: 'bg-terracotta-light text-terracotta-dark',
  ready: 'bg-ready-light text-ready',
  served: 'bg-line text-ink/60',
}

function timeAgo(ms) {
  const mins = Math.max(0, Math.round((Date.now() - ms) / 60000))
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function MyOrdersView({ storedOrders, onBack, onOrderMore }) {
  const [selectedId, setSelectedId] = useState(null)
  const orderIds = storedOrders.map((o) => o.orderId)
  const liveOrders = useMultiOrderTracking(orderIds)

  const selected = selectedId ? liveOrders[selectedId] : null
  const selectedStored = storedOrders.find((o) => o.orderId === selectedId)

  if (selectedId) {
    return (
      <div className="flex h-full flex-col">
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-white px-4 py-3 shadow-soft">
          <button onClick={() => setSelectedId(null)} className="text-xl text-ink/60">
            ←
          </button>
          <h1 className="text-base font-bold text-ink">Order Details</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-8 text-center">
          <p className="font-mono text-sm font-bold text-ink">
            {selectedStored?.orderNumber || selected?.orderNumber}
          </p>
          <p className="mt-1 text-xs text-ink/50">
            {selected?.tableNumber && selected.tableNumber !== '—'
              ? `Table ${selected.tableNumber}`
              : ''}
          </p>
          {selected?.scheduledDate && selected?.scheduledTime && (
            <p className="mt-2 inline-block rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/70">
              📅 {selected.orderType === 'Take Away' ? 'Pickup' : 'Dine-in'} for{' '}
              {selected.scheduledDate} at {selected.scheduledTime}
            </p>
          )}
          {selected === undefined ? (
            <p className="mt-8 text-sm text-ink/40">Loading…</p>
          ) : selected === null ? (
            <p className="mt-8 text-sm text-ink/40">
              This order could not be found — it may have been removed by staff.
            </p>
          ) : (
            <>
              <div className="mt-8">
                <OrderTracker order={selected} loading={false} />
              </div>
              {selected.items?.length > 0 && (
                <div className="mt-8 rounded-2xl border border-line bg-cream p-4 text-left">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink/40">
                    Items
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {selected.items.map((it, i) => (
                      <li key={i} className="flex justify-between text-sm">
                        <span className="text-ink">
                          {it.qty}× {it.name}
                        </span>
                        <span className="font-mono text-ink/70">
                          ₱{(it.price * it.qty).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex justify-between border-t border-line pt-2 text-sm font-bold text-ink">
                    <span>Total</span>
                    <span className="font-mono">₱{(selected.total || 0).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-white px-4 py-3 shadow-soft">
        <button onClick={onBack} className="text-xl text-ink/60">
          ←
        </button>
        <h1 className="text-base font-bold text-ink">My Orders</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {storedOrders.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-sm text-ink/40">You haven't placed any orders on this device yet.</p>
            <button
              onClick={onOrderMore}
              className="mt-4 rounded-full bg-terracotta px-5 py-2 text-sm font-bold text-white"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {storedOrders.map((stored) => {
              const live = liveOrders[stored.orderId]
              const status = live?.status
              return (
                <li key={stored.orderId}>
                  <button
                    onClick={() => setSelectedId(stored.orderId)}
                    className="w-full rounded-2xl border border-line bg-paper p-4 text-left shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-forest-dark">
                        {stored.orderNumber}
                      </span>
                      {status && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${
                            STATUS_STYLES[status] || ''
                          }`}
                        >
                          {status === 'pending'
                            ? 'Order Received'
                            : STEPS.find((s) => s.status === status)?.label || status}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-ink/50">
                      <span>
                        {stored.tableNumber && stored.tableNumber !== '—'
                          ? `Table ${stored.tableNumber} · `
                          : ''}
                        {timeAgo(stored.placedAt)}
                      </span>
                      <span className="font-mono font-semibold text-ink/70">
                        ₱{(stored.total || 0).toLocaleString()}
                      </span>
                    </div>
                    {live?.scheduledDate && live?.scheduledTime && (
                      <p className="mt-1 text-[11px] font-semibold text-clay-dark">
                        📅 {live.scheduledDate} at {live.scheduledTime}
                      </p>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
