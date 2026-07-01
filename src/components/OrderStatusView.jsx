import React from 'react'
import { useOrderTracking } from '../hooks/useCustomerOrder.js'

const STEPS = [
  { status: 'pending', label: 'Order Received', icon: '📝' },
  { status: 'cooking', label: 'Preparing', icon: '👨‍🍳' },
  { status: 'ready', label: 'Ready to Serve', icon: '🔔' },
  { status: 'served', label: 'Served — Enjoy!', icon: '🍽️' },
]

export default function OrderStatusView({ orderId, orderNumber, onNewOrder }) {
  const { order, loading } = useOrderTracking(orderId)
  const currentIndex = order ? STEPS.findIndex((s) => s.status === order.status) : 0
  const activeIndex = currentIndex < 0 ? 0 : currentIndex

  return (
    <div className="flex h-full flex-col items-center px-6 py-10 text-center">
      <div className="mb-2 text-5xl">✅</div>
      <h1 className="text-xl font-bold text-forest-dark">Order Placed!</h1>
      <p className="mt-1 font-mono text-sm font-bold text-ink">{orderNumber}</p>
      <p className="mt-1 text-xs text-ink/50">
        {order?.tableNumber && order.tableNumber !== '—' ? `Table ${order.tableNumber} · ` : ''}
        Show this screen to a staff member if you need help.
      </p>

      <div className="mt-8 flex w-full flex-col gap-4">
        {STEPS.map((step, i) => {
          const done = i <= activeIndex
          return (
            <div key={step.status} className="flex items-center gap-3 text-left">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                  done ? 'bg-ready text-white' : 'bg-cream text-ink/30'
                }`}
              >
                {step.icon}
              </div>
              <div>
                <p className={`text-sm font-semibold ${done ? 'text-ink' : 'text-ink/40'}`}>
                  {step.label}
                </p>
                {i === activeIndex && !loading && (
                  <p className="text-[11px] font-semibold text-ready">● Current status</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={onNewOrder}
        className="mt-10 rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-cream"
      >
        Order More
      </button>
    </div>
  )
}
