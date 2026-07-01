import { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { doc, onSnapshot } from 'firebase/firestore'

const IMAGES_DOC = 'meta/menuImages'

export function useMenuImages() {
  const [images, setImages] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ref = doc(db, IMAGES_DOC)
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setImages(snap.exists() ? snap.data() : {})
        setLoading(false)
      },
      (err) => {
        console.error('Menu images sync error', err)
        setLoading(false)
      },
    )
    return () => unsub()
  }, [])

  const getImage = (itemId) => images[itemId] || null

  return { loading, getImage }
}
