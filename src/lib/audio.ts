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

// Senarai suara dimuatkan secara tak segerak oleh pelayar. Kita simpan (cache)
// dan "panaskan" awal supaya tidak kosong semasa ketikan pertama pengguna
// (punca biasa "tiada bunyi" di Safari / pelayar lain selain localhost).
let cachedVoices: SpeechSynthesisVoice[] = []

function refreshVoices() {
  const v = window.speechSynthesis?.getVoices?.() ?? []
  if (v.length) cachedVoices = v
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  refreshVoices()
  // Event ini terpicu apabila senarai suara siap dimuatkan.
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices)
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  if (!cachedVoices.length) refreshVoices()
  const voices = cachedVoices
  return (
    voices.find((v) => /ms-?MY|^ms\b/i.test(v.lang)) ||
    voices.find((v) => /id-?ID|^id\b/i.test(v.lang)) || // Bahasa Indonesia paling hampir
    voices.find((v) => /^en-?/i.test(v.lang)) || // seterusnya Inggeris
    voices[0] // akhir sekali: apa-apa suara yang ada supaya tetap berbunyi
  )
}

function utter(text: string, voice: SpeechSynthesisVoice | undefined) {
  const synth = window.speechSynthesis
  if (!synth) return
  const u = new SpeechSynthesisUtterance(text)
  if (voice) {
    u.voice = voice
    u.lang = voice.lang
  } else {
    // Tiada suara dikenali — biar pelayar guna suara lalai (jangan paksa ms-MY
    // kerana sesetengah pelayar terus senyap jika tiada suara ms-MY).
    u.lang = 'ms-MY'
  }
  u.rate = 0.9
  u.pitch = 1.1
  synth.speak(u)
}

export function speak(text: string) {
  const synth = window.speechSynthesis
  if (!synth) return
  synth.cancel()

  const voice = pickVoice()
  if (voice || cachedVoices.length) {
    utter(text, voice)
    return
  }

  // Suara belum siap dimuatkan: cuba sekali lagi sebaik sahaja ia tersedia.
  const once = () => {
    refreshVoices()
    synth.removeEventListener?.('voiceschanged', once)
    utter(text, pickVoice())
  }
  synth.addEventListener?.('voiceschanged', once)
  // Jaring keselamatan jika event tidak terpicu.
  setTimeout(() => {
    if (!cachedVoices.length) return
    synth.removeEventListener?.('voiceschanged', once)
    utter(text, pickVoice())
  }, 250)
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel()
}
