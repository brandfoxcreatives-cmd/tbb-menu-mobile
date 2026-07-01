import React from 'react'
import { CATEGORIES, CATEGORY_ICONS } from '../data/menuData.js'

export default function CategoryTabs({ activeCategory, onSelect }) {
  return (
    <div className="sticky top-0 z-10 flex gap-2 overflow-x-auto bg-white px-4 py-2.5 shadow-soft">
      <button
        onClick={() => onSelect('all')}
        className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
          activeCategory === 'all'
            ? 'bg-forest text-cream'
            : 'border border-line bg-paper text-ink/70'
        }`}
      >
        🍴 All
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
            activeCategory === c.id
              ? 'bg-forest text-cream'
              : 'border border-line bg-paper text-ink/70'
          }`}
        >
          {CATEGORY_ICONS[c.id]} {c.name}
        </button>
      ))}
    </div>
  )
}
