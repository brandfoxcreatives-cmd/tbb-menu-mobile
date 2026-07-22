// Taal Bayview Bistro's operating hours. Used to validate that a chosen order
// time actually falls within hours the kitchen is open, and to reason about
// same-day scheduling (an order for 6 hours from now, even though it's "today",
// still shouldn't hit Kitchen Display immediately).
export const STORE_OPEN_TIME = '08:00'
export const STORE_CLOSE_TIME = '19:00'

export function isWithinStoreHours(timeStr) {
  if (!timeStr) return true // no time chosen — nothing to validate yet
  return timeStr >= STORE_OPEN_TIME && timeStr <= STORE_CLOSE_TIME
}

export function storeHoursLabel() {
  const fmt = (t) => {
    const [h, m] = t.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 === 0 ? 12 : h % 12
    return `${h12}:${String(m).padStart(2, '0')} ${period}`
  }
  return `${fmt(STORE_OPEN_TIME)}–${fmt(STORE_CLOSE_TIME)}`
}

// Minutes from now until the given date+time (negative if already past).
// Returns null if either piece is missing.
export function minutesUntil(scheduledDate, scheduledTime) {
  if (!scheduledDate || !scheduledTime) return null
  const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`)
  if (Number.isNaN(scheduledAt.getTime())) return null
  return (scheduledAt.getTime() - Date.now()) / 60000
}

// An order counts as a genuine "advance order" — kept off Kitchen Display and
// eligible for the 1-hour-ahead reminder — whenever its scheduled date+time is
// more than `thresholdMinutes` away, REGARDLESS of whether that's later today or
// a future day. Previously this only checked the calendar date, so an order
// placed at 9am for a 5pm dine-in slot went straight to the kitchen as if it were
// immediate. If no time was given at all, there's nothing to schedule against, so
// it's treated as immediate (matches the original behavior for orders without a
// time slot).
export function shouldTreatAsAdvance(scheduledDate, scheduledTime, thresholdMinutes = 60) {
  const mins = minutesUntil(scheduledDate, scheduledTime)
  if (mins === null) return false
  return mins > thresholdMinutes
}
