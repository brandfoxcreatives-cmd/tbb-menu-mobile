import { useState } from 'react'
import { storage } from '../firebase.js'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { compressImage } from '../utils/compressImage.js'

export function usePaymentProofUpload() {
  const [uploading, setUploading] = useState(false)

  const uploadPaymentProof = async (file, orderNumberHint) => {
    setUploading(true)
    try {
      const blob = await compressImage(file, { maxWidth: 1000, quality: 0.85 })
      const safeName = `${Date.now()}-${(orderNumberHint || 'order').replace(/[^\w-]/g, '')}`
      const storageRef = ref(storage, `payment-proofs/${safeName}.jpg`)
      await uploadBytes(storageRef, blob)
      return await getDownloadURL(storageRef)
    } finally {
      setUploading(false)
    }
  }

  return { uploadPaymentProof, uploading }
}
