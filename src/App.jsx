import React, { useMemo, useState } from 'react'
import { CATEGORIES, CATEGORY_ICONS } from './data/menuData.js'
import { useStock } from './hooks/useStock.js'
import { useMenuImages } from './hooks/useMenuImages.js'
import { useCustomerOrder } from './hooks/useCustomerOrder.js'
import CategoryTabs from './components/CategoryTabs.jsx'
import MenuItemCard from './components/MenuItemCard.jsx'
import CartBar from './components/CartBar.jsx'
import CartView from './components/CartView.jsx'
import CheckoutView from './components/CheckoutView.jsx'
import OrderStatusView from './components/OrderStatusView.jsx'

export default function App() {
  const [view, setView] = useState('menu') // menu | cart | checkout | confirmation
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  const { isAvailable, loading: stockLoading } = useStock()
  const { getImage } = useMenuImages()
  const { submitOrder } = useCustomerOrder()

  const visibleCategories = useMemo(() => {
    const term = search.trim().toLowerCase()
    return CATEGORIES.filter((c) => activeCategory === 'all' || c.id === activeCategory)
      .map((c) => ({
        ...c,
        items: c.items.filter((it) => !term || it.name.toLowerCase().includes(term)),
      }))
      .filter((c) => c.items.length > 0)
  }, [activeCategory, search])

  const cartQtyFor = (name) => cart.find((l) => l.name === name)?.qty || 0

  const addToCart = (item, price, variantIdx) => {
    const name = item.variants ? `${item.name} (${item.variants[variantIdx].label})` : item.name
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.name === name)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 }
        return next
      }
      return [...prev, { itemId: item.id, name, price, qty: 1, note: '' }]
    })
  }

  const decrementInCart = (item, variantIdx) => {
    const name = item.variants ? `${item.name} (${item.variants[variantIdx].label})` : item.name
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.name === name)
      if (idx < 0) return prev
      if (prev[idx].qty <= 1) return prev.filter((_, i) => i !== idx)
      const next = [...prev]
      next[idx] = { ...next[idx], qty: next[idx].qty - 1 }
      return next
    })
  }

  const updateQty = (idx, qty) => {
    if (qty <= 0) return removeItem(idx)
    setCart((prev) => prev.map((l, i) => (i === idx ? { ...l, qty } : l)))
  }
  const updateNote = (idx, note) => {
    setCart((prev) => prev.map((l, i) => (i === idx ? { ...l, note } : l)))
  }
  const removeItem = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx))

  const itemCount = cart.reduce((s, l) => s + l.qty, 0)
  const cartTotal = cart.reduce((s, l) => s + l.price * l.qty, 0)

  const handleSubmitOrder = async (payload) => {
    setSubmitting(true)
    try {
      const { orderId, orderNumber } = await submitOrder(payload)
      setPlacedOrder({ orderId, orderNumber, tableNumber: payload.tableNumber })
      setCart([])
      setView('confirmation')
    } finally {
      setSubmitting(false)
    }
  }

  const startNewOrder = () => {
    setPlacedOrder(null)
    setView('menu')
  }

  if (view === 'confirmation' && placedOrder) {
    return (
      <div className="mx-auto h-screen max-w-md bg-white">
        <OrderStatusView
          orderId={placedOrder.orderId}
          orderNumber={placedOrder.orderNumber}
          onNewOrder={startNewOrder}
        />
      </div>
    )
  }

  if (view === 'cart') {
    return (
      <div className="mx-auto h-screen max-w-md bg-white">
        <CartView
          cart={cart}
          updateQty={updateQty}
          updateNote={updateNote}
          removeItem={removeItem}
          onBack={() => setView('menu')}
          onCheckout={() => setView('checkout')}
        />
      </div>
    )
  }

  if (view === 'checkout') {
    return (
      <div className="mx-auto h-screen max-w-md bg-white">
        <CheckoutView
          cart={cart}
          onBack={() => setView('cart')}
          onSubmit={handleSubmitOrder}
          submitting={submitting}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto flex h-screen max-w-md flex-col bg-white">
      <div className="border-b border-line bg-forest px-4 pb-4 pt-6 text-cream">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
          Taal Bayview Bistro
        </p>
        <h1 className="text-xl font-bold">What would you like today?</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu…"
          className="mt-3 w-full rounded-xl border border-forest-light bg-forest-dark px-3.5 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
        />
      </div>

      <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />

      <div className={`flex-1 overflow-y-auto px-4 ${itemCount > 0 ? 'pb-24' : 'pb-6'}`}>
        {stockLoading ? (
          <p className="mt-10 text-center text-sm text-ink/40">Loading menu…</p>
        ) : visibleCategories.length === 0 ? (
          <p className="mt-10 text-center text-sm text-ink/40">No items match your search.</p>
        ) : (
          visibleCategories.map((c) => (
            <div key={c.id} className="mt-4">
              <h2 className="mb-1 text-base font-bold text-forest-dark">{c.name}</h2>
              {c.serving && <p className="mb-1 text-[11px] text-ink/40">{c.serving}</p>}
              {c.items.map((item) => {
                const displayName = item.variants
                  ? `${item.name} (${item.variants[0].label})`
                  : item.name
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    categoryIcon={CATEGORY_ICONS[c.id]}
                    image={getImage(item.id)}
                    available={isAvailable(item.id)}
                    qtyInCart={cartQtyFor(displayName)}
                    onAdd={addToCart}
                    onDecrement={decrementInCart}
                  />
                )
              })}
            </div>
          ))
        )}
      </div>

      <CartBar itemCount={itemCount} total={cartTotal} onView={() => setView('cart')} />
    </div>
  )
}
