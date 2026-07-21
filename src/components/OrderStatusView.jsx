import React from 'react'
import { useOrderTracking } from '../hooks/useCustomerOrder.js'
import OrderTracker from './OrderTracker.jsx'

export default function OrderStatusView({ orderId, orderNumber, onNewOrder, onViewMyOrders }) {
  const { order, loading } = useOrderTracking(orderId)

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-6 py-10 text-center">
      <div className="mb-2 text-5xl">✅</div>
      <h1 className="text-xl font-bold text-forest-dark">Order Placed!</h1>
      <p className="mt-1 font-mono text-sm font-bold text-ink">{orderNumber}</p>
      <p className="mt-1 text-xs text-ink/50">
        {order?.tableNumber && order.tableNumber !== '—' ? `Table ${order.tableNumber} · ` : ''}
        Show this screen to a staff member if you need help.
      </p>
      {order?.scheduledDate && order?.scheduledTime && (
        <p className="mt-2 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/70">
          📅 {order.orderType === 'Dine In' ? 'Dine-in' : 'Pickup'} for {order.scheduledDate} at{' '}
          {order.scheduledTime}
        </p>
      )}

      <div className="mt-8">
        <OrderTracker order={order} loading={loading} />
      </div>

      <div className="mt-10 flex w-full flex-col gap-2">
        <button
          onClick={onNewOrder}
          className="rounded-full bg-forest px-6 py-2.5 text-sm font-bold text-cream"
        >
          Order More
        </button>
        <button
          onClick={onViewMyOrders}
          className="rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink/70"
        >
          🧾 View My Orders
        </button>
      </div>
    </div>
  )
}
