import { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { doc, onSnapshot } from 'firebase/firestore'

const STOCK_DOC = 'stock/availability'

export function useStock() {
  const [stock, setStock] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ref = doc(db, STOCK_DOC)
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setStock(snap.exists() ? snap.data() : {})
        setLoading(false)
      },
      (err) => {
        console.error('Stock sync error', err)
        setLoading(false)
      },
    )
    return () => unsub()
  }, [])

  const isAvailable = (itemId) => stock[itemId] !== false

  return { loading, isAvailable }
}
