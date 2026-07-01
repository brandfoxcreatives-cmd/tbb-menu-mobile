import React from 'react'

export default function CartBar({ itemCount, total, onView }) {
  if (itemCount === 0) return null
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white p-3 shadow-card">
      <button
        onClick={onView}
        className="flex w-full items-center justify-between rounded-2xl bg-forest px-5 py-3.5 text-cream shadow-soft"
      >
        <span className="flex items-center gap-2 text-sm font-bold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-forest-dark">
            {itemCount}
          </span>
          View Order
        </span>
        <span className="font-mono text-sm font-bold">₱{total.toLocaleString()}</span>
      </button>
    </div>
  )
}
