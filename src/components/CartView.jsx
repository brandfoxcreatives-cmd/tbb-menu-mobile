import React from 'react'

export default function CartView({ cart, updateQty, updateNote, removeItem, onBack, onCheckout }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-white px-4 py-3 shadow-soft">
        <button onClick={onBack} className="text-xl text-ink/60">
          ←
        </button>
        <h1 className="text-base font-bold text-ink">Your Order</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {cart.length === 0 ? (
          <p className="mt-10 text-center text-sm text-ink/40">Your order is empty.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {cart.map((line, idx) => (
              <li key={idx} className="rounded-2xl border border-line bg-paper p-3 shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{line.name}</p>
                  <button
                    onClick={() => removeItem(idx)}
                    className="shrink-0 text-xs font-semibold text-terracotta-dark"
                  >
                    Remove
                  </button>
                </div>
                <input
                  value={line.note || ''}
                  onChange={(e) => updateNote(idx, e.target.value)}
                  placeholder="Add note (e.g. no onions)"
                  className="mt-2 w-full rounded-lg border border-line bg-cream px-2.5 py-1.5 text-xs focus:outline-none"
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(idx, line.qty - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-ink"
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-mono text-sm">{line.qty}</span>
                    <button
                      onClick={() => updateQty(idx, line.qty + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-ink"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-mono text-sm font-bold text-forest-dark">
                    ₱{(line.price * line.qty).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <div className="safe-bottom border-t border-line bg-white p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-ink/60">Subtotal</span>
            <span className="font-mono text-base font-bold text-ink">₱{subtotal.toLocaleString()}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full rounded-2xl bg-terracotta py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}
