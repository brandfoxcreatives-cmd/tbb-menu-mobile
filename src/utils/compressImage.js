// Resizes + compresses an image file in the browser before upload,
// matching the pattern used in the MICO Inventory app.
export function compressImage(file, { maxWidth = 800, quality = 0.8 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Could not compress image'))
            resolve(blob)
          },
          'image/jpeg',
          quality,
        )
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
