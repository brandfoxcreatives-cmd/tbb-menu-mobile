import React from 'react'

export const STEPS = [
  { status: 'awaiting_approval', label: 'Awaiting Confirmation', icon: '⏳' },
  { status: 'pending', label: 'Order Received', icon: '📝' },
  { status: 'cooking', label: 'Preparing', icon: '👨‍🍳' },
  { status: 'ready', label: 'Ready to Serve', icon: '🔔' },
  { status: 'served', label: 'Served — Enjoy!', icon: '🍽️' },
]

export default function OrderTracker({ order, loading }) {
  const currentIndex = order ? STEPS.findIndex((s) => s.status === order.status) : 0
  const activeIndex = currentIndex < 0 ? 0 : currentIndex

  return (
    <div className="flex w-full flex-col gap-4">
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
  )
}
