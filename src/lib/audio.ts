// Kesan bunyi ringkas melalui Web Audio API (tiada fail audio diperlukan)
// dan bacaan soalan melalui Web Speech API (Text-to-Speech).

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  // Pelayar menghentikan audio sehingga ada interaksi pengguna.
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = 'sine', gain = 0.2) {
  const ac = getCtx()
  if (!ac) return
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, ac.currentTime + start)
  g.gain.setValueAtTime(0.0001, ac.currentTime + start)
  g.gain.exponentialRampToValueAtTime(gain, ac.currentTime + start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + duration)
  osc.connect(g)
  g.connect(ac.destination)
  osc.start(ac.currentTime + start)
  osc.stop(ac.currentTime + start + duration + 0.02)
}

/** Melodi ceria naik — jawapan betul. */
export function playCorrect() {
  tone(523.25, 0, 0.14, 'triangle') // C5
  tone(659.25, 0.12, 0.14, 'triangle') // E5
  tone(783.99, 0.24, 0.22, 'triangle') // G5
}

/** Nada lembut turun — jawapan salah (tidak menakutkan). */
export function playWrong() {
  tone(392.0, 0, 0.18, 'sine') // G4
  tone(293.66, 0.16, 0.26, 'sine') // D4
}

/** Fanfare tamat kuiz. */
export function playFinish() {
  tone(523.25, 0, 0.15, 'triangle')
  tone(659.25, 0.13, 0.15, 'triangle')
  tone(783.99, 0.26, 0.15, 'triangle')
  tone(1046.5, 0.39, 0.3, 'triangle')
}

export function playTap() {
  tone(660, 0, 0.06, 'square', 0.08)
}

// ---------------------------------------------------------------------------
// Text-to-Speech
// ---------------------------------------------------------------------------
function pickMalayVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis?.getVoices?.() ?? []
  return (
    voices.find((v) => /ms-?MY|^ms\b/i.test(v.lang)) ||
    voices.find((v) => /id-?ID|^id\b/i.test(v.lang)) || // Bahasa Indonesia paling hampir
    voices.find((v) => /^en-?/i.test(v.lang))
  )
}

export function speak(text: string) {
  const synth = window.speechSynthesis
  if (!synth) return
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const voice = pickMalayVoice()
  if (voice) u.voice = voice
  u.lang = voice?.lang || 'ms-MY'
  u.rate = 0.9
  u.pitch = 1.1
  synth.speak(u)
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel()
}
