// "Order ready" alert using the Web Audio API — no audio file to host or load, and
// it works the moment a browser tab is active (Kitchen Display is expected to stay
// open, so autoplay restrictions aren't an issue after the first user interaction
// with the page, e.g. clicking a nav item).
//
// Designed to sound like a classic restaurant service bell ("ding-ding!") rather
// than a generic phone notification blip — layered harmonics give it a metallic
// bell timbre, and it strikes twice so it's easy to recognize even from across the
// kitchen without looking at the screen.
let ctx = null

function getContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    ctx = new AudioCtx()
  }
  return ctx
}

// A single bell strike: fundamental + two inharmonic-ish overtones (bell timbre
// comes from partials that AREN'T simple octaves/fifths — closer to ~2.4x and ~4x
// the fundamental), each with its own fast-attack/slow-decay envelope.
function bellStrike(context, freq, startTime, volume = 0.3) {
  const partials = [
    { mult: 1, gain: 1, decay: 1.1 },
    { mult: 2.4, gain: 0.45, decay: 0.7 },
    { mult: 4.05, gain: 0.22, decay: 0.4 },
  ]
  partials.forEach(({ mult, gain, decay }) => {
    const osc = context.createOscillator()
    const gainNode = context.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq * mult
    const peak = volume * gain
    gainNode.gain.setValueAtTime(0.0001, startTime)
    gainNode.gain.linearRampToValueAtTime(peak, startTime + 0.008)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + decay)
    osc.connect(gainNode)
    gainNode.connect(context.destination)
    osc.start(startTime)
    osc.stop(startTime + decay + 0.05)
  })
}

export function playReadyChime() {
  const context = getContext()
  if (!context) return
  if (context.state === 'suspended') context.resume()
  const now = context.currentTime
  // Three strikes at the same bright pitch, like tapping a service bell three times.
  bellStrike(context, 1318.5, now) // E6
  bellStrike(context, 1318.5, now + 0.32)
  bellStrike(context, 1318.5, now + 0.64)
}

// "New order received" alert — a two-note "ding-dong" (like a doorbell/notification
// chime), deliberately a different pitch pattern from the kitchen's flat double-bell
// so the two are easy to tell apart by ear. Repeats 3 times with a short pause
// between repeats, for a new Facebook/mobile order landing in the approval queue.
function dingDong(context, startTime, volume = 0.28) {
  bellStrike(context, 987.8, startTime, volume) // B5 — "ding"
  bellStrike(context, 740, startTime + 0.22, volume) // F#5 — "dong"
}

export function playNewOrderAlert() {
  const context = getContext()
  if (!context) return
  if (context.state === 'suspended') context.resume()
  const now = context.currentTime
  dingDong(context, now)
  dingDong(context, now + 0.85)
  dingDong(context, now + 1.7)
}

// "Advance order due soon" reminder — a rising 3-note run (like a gentle alarm
// clock), the opposite shape of the flat double-bell "ready" sound and the
// alternating "ding-dong". This one climbs upward, so it reads as "heads up,
// something's coming" rather than "this is done" or "new order arrived" — meant
// to be unmistakably different from the other two by ear alone.
function risingRun(context, startTime, volume = 0.26) {
  const notes = [659.25, 830.61, 987.77] // E5, G#5, B5 — rising
  notes.forEach((freq, i) => {
    bellStrike(context, freq, startTime + i * 0.16, volume)
  })
}

export function playAdvanceReminderChime() {
  const context = getContext()
  if (!context) return
  if (context.state === 'suspended') context.resume()
  const now = context.currentTime
  risingRun(context, now)
  risingRun(context, now + 0.75)
}

