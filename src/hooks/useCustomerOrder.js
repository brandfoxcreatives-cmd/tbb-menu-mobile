import { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  runTransaction,
} from 'firebase/firestore'

const ORDERS_COL = 'orders'
const COUNTERS_COL = 'counters'

function dateParts(d = new Date()) {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const yyyy = d.getFullYear()
  return { mm, dd, yyyy, dateKey: `${yyyy}${mm}${dd}` }
}

export function useCustomerOrder() {
  const submitOrder = async (orderPayload) => {
    const { mm, dd, yyyy, dateKey } = dateParts()
    const counterRef = doc(db, COUNTERS_COL, dateKey)

    let sequence
    let orderNumber
    try {
      // Same shared daily counter the staff app uses — order numbers stay unified
      // across both apps (e.g. table-side mobile orders and cashier-entered orders
      // never collide or duplicate a number).
      sequence = await runTransaction(db, async (tx) => {
        const snap = await tx.get(counterRef)
        const next = (snap.exists() ? snap.data().count : 0) + 1
        tx.set(counterRef, { count: next, dateKey }, { merge: true })
        return next
      })
      orderNumber = `${mm}/${dd}/${yyyy}-${String(sequence).padStart(4, '0')}`
    } catch (err) {
      console.warn('Order numbering fallback used:', err)
      sequence = null
      orderNumber = `${mm}/${dd}/${yyyy}-T${Date.now().toString().slice(-6)}`
    }

    let docRef
    try {
      docRef = await addDoc(collection(db, ORDERS_COL), {
        ...orderPayload,
        orderNumber,
        dateKey,
        sequence,
        scheduledDate: `${yyyy}-${mm}-${dd}`,
        isAdvanceOrder: false,
        // Customer-submitted orders wait for a staff member to review and approve
        // them (see the Dashboard approval popup in the staff app) before they're
        // released to the Kitchen Display — they do NOT start as 'pending'.
        status: 'awaiting_approval',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    } catch (err) {
      console.error('submitOrder failed:', err)
      throw new Error(
        err?.code === 'permission-denied'
          ? 'Permission denied — the restaurant\u2019s ordering system is temporarily unavailable. Please tell a staff member.'
          : err?.message || 'Could not place the order. Please try again.',
      )
    }

    return { orderId: docRef.id, orderNumber }
  }

  return { submitOrder }
}

// Live status tracker for a single placed order — used on the confirmation screen
// so the guest can watch their order move from Pending -> Cooking -> Ready without
// needing to ask a waiter.
export function useOrderTracking(orderId) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(!!orderId)

  useEffect(() => {
    if (!orderId) {
      setOrder(null)
      setLoading(false)
      return
    }
    setLoading(true)
    const ref = doc(db, ORDERS_COL, orderId)
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setOrder(snap.exists() ? { id: snap.id, ...snap.data() } : null)
        setLoading(false)
      },
      (err) => {
        console.error('Order tracking error', err)
        setLoading(false)
      },
    )
    return () => unsub()
  }, [orderId])

  return { order, loading }
}

// Live status for several orders at once — used by the "My Orders" list so every
// order shown updates its status badge in real time, not just the one currently
// open in detail view.
export function useMultiOrderTracking(orderIds) {
  const [ordersById, setOrdersById] = useState({})

  useEffect(() => {
    if (!orderIds || orderIds.length === 0) {
      setOrdersById({})
      return
    }
    const unsubs = orderIds.map((id) =>
      onSnapshot(
        doc(db, ORDERS_COL, id),
        (snap) => {
          setOrdersById((prev) => ({
            ...prev,
            [id]: snap.exists() ? { id: snap.id, ...snap.data() } : null,
          }))
        },
        (err) => console.error('Order tracking error', id, err),
      ),
    )
    return () => unsubs.forEach((u) => u())
  }, [JSON.stringify(orderIds)])

  return ordersById
}
