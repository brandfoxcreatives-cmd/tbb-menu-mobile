const STORAGE_KEY = 'tbb-mobile-customer-profile'

export function getCustomerProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.name || !parsed?.mobileNumber) return null
    return parsed
  } catch {
    return null
  }
}

export function saveCustomerProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // localStorage unavailable (e.g. private browsing) — the person will just be
    // asked to fill the form in again on their next visit.
  }
}
