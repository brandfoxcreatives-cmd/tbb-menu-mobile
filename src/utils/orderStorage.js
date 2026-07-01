// No login system for customers, so "my orders" is tracked per-device via
// localStorage — just enough to let someone check back on an order they placed
// earlier without needing an account. Caps at the most recent 20 orders.
const STORAGE_KEY = 'tbb-mobile-my-orders'
const MAX_STORED = 20

export function getStoredOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function addStoredOrder({ orderId, orderNumber, tableNumber, total }) {
  try {
    const existing = getStoredOrders().filter((o) => o.orderId !== orderId)
    const next = [{ orderId, orderNumber, tableNumber, total, placedAt: Date.now() }, ...existing].slice(
      0,
      MAX_STORED,
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // localStorage unavailable (e.g. private browsing) — the order still succeeded
    // on the server, it just won't show up in "My Orders" on this device.
  }
}

export function removeStoredOrder(orderId) {
  try {
    const next = getStoredOrders().filter((o) => o.orderId !== orderId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
}
