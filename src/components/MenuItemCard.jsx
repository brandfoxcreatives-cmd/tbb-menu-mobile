import React, { useState } from 'react'
import { BADGE_META } from '../data/menuData.js'

export default function MenuItemCard({ item, categoryIcon, image, available, qtyInCart, onAdd, onDecrement }) {
  const hasVariants = !!item.variants
  const [variantIdx, setVariantIdx] = useState(0)
  const price = hasVariants ? item.variants[variantIdx].price : item.price

  return (
    <div
      className={`flex gap-3 border-b border-line py-3 ${available ? '' : 'opacity-50 grayscale'}`}
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream">
        {image ? (
          <img src={image} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-2xl">{categoryIcon || '🍽️'}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
        {item.badges?.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {item.badges.slice(0, 2).map((b) => {
              const meta = BADGE_META[b]
              if (!meta) return null
              return (
                <span key={b} className="text-[10px] text-gold-dark">
                  {meta.icon} {meta.label}
                </span>
              )
            })}
          </div>
        )}
        {item.serving && <p className="mt-0.5 text-[10px] text-ink/40">{item.serving}</p>}

        {hasVariants && (
          <div className="mt-1.5 flex gap-1">
            {item.variants.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setVariantIdx(i)}
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  i === variantIdx
                    ? 'border-forest bg-forest text-cream'
                    : 'border-line text-ink/60'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-mono text-sm font-bold text-forest-dark">
            ₱{price.toLocaleString()}
          </span>

          {!available ? (
            <span className="rounded-full bg-terracotta-dark px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              Out of stock
            </span>
          ) : qtyInCart > 0 ? (
            <div className="flex items-center gap-2 rounded-full bg-forest px-1 py-1">
              <button
                onClick={() => onDecrement(item, hasVariants ? variantIdx : null)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-dark text-cream"
              >
                −
              </button>
              <span className="w-4 text-center font-mono text-xs font-bold text-cream">
                {qtyInCart}
              </span>
              <button
                onClick={() => onAdd(item, price, hasVariants ? variantIdx : null)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-dark text-cream"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(item, price, hasVariants ? variantIdx : null)}
              className="rounded-full bg-terracotta px-3 py-1 text-xs font-bold text-white"
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
