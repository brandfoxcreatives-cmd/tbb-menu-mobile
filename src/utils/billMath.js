// Shared bill math — Taal Bayview Bistro Senior/PWD 20% per-pax discount.
// Used by the Current Order ticket (live bill for the order being built) and the
// standalone Bill Calculator (ad-hoc quick math). Keeping the logic in one place
// means a fix here applies everywhere it's used.

export function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function peso(n) {
  return `₱${round2(n).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

// Validates inputs exactly per the Taal Bayview bill calculator spec.
export function validateBillInputs({ totalGuests, seniorCount, totalBill }) {
  if (totalGuests === '' || totalGuests == null || isNaN(totalGuests) || totalGuests < 1) {
    return 'Total guests must be at least 1.'
  }
  if (
    seniorCount === '' ||
    seniorCount == null ||
    isNaN(seniorCount) ||
    seniorCount < 0 ||
    seniorCount > totalGuests
  ) {
    return 'Senior/PWD count must be between 0 and the total number of guests.'
  }
  if (totalBill === '' || totalBill == null || isNaN(totalBill) || totalBill <= 0) {
    return 'Total bill must be greater than 0.'
  }
  return null
}

// Exact computation sequence from the spec:
// price per pax -> discount per senior -> total discount -> final amount.
export function computeBill({ totalGuests, seniorCount, totalBill }) {
  const error = validateBillInputs({ totalGuests, seniorCount, totalBill })
  if (error) return { error }

  const pricePerPax = totalBill / totalGuests
  const discountPerSenior = pricePerPax * 0.2
  const totalDiscount = discountPerSenior * seniorCount
  const finalAmount = totalBill - totalDiscount
  const seniorPayEach = pricePerPax - discountPerSenior
  const nonSeniorPayEach = pricePerPax

  return {
    error: null,
    pricePerPax,
    discountPerSenior,
    totalDiscount,
    finalAmount,
    seniorPayEach,
    nonSeniorPayEach,
  }
}
