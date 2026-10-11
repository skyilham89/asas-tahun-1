// Kesan bunyi ringkas melalui Web Audio API (tiada fail audio diperlukan)
// dan bacaan soalan melalui klip audio pra-rakam (paling natural & sama di
// semua peranti). Jika klip tiada untuk sesuatu teks (cth soalan matematik
// dinamik), ia jatuh balik ke Web Speech API (TTS peranti).

import ttsManifest from '../data/ttsManifest.json'

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

// Safari (dan sesetengah pelayar) memulakan AudioContext dalam keadaan
// "suspended" dan resume() berjalan secara tak segerak. Jadi nada PERTAMA
// selepas sentuhan boleh hilang kerana ia dijadualkan sebelum konteks bangun.
// Kita "buka kunci" audio pada interaksi pertama: cipta konteks, resume, dan
// mainkan satu bunyi senyap supaya konteks benar-benar hidup selepas itu.
if (typeof window !== 'undefined') {
  let unlocked = false
  const unlock = () => {
    if (unlocked) return
    const ac = getCtx()
    if (!ac) return
    void ac.resume()
    // Bunyi senyap untuk "menghidupkan" konteks pada Safari.
    try {
      const buffer = ac.createBuffer(1, 1, 22050)
      const src = ac.createBufferSource()
      src.buffer = buffer
      src.connect(ac.destination)
      src.start(0)
    } catch {
      // abaikan — tidak kritikal
    }
    if (ac.state === 'running') {
      unlocked = true
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }
  window.addEventListener('pointerdown', unlock)
  window.addEventListener('touchstart', unlock)
  window.addEventListener('keydown', unlock)
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

// Beri markah setiap suara supaya kita pilih yang paling NATURAL, bukan sekadar
// yang pertama dijumpai. Keutamaan: bahasa yang betul (ms, kemudian id yang
// hampir sama) + suara berkualiti tinggi (Google/neural/enhanced/online).
// Suara macOS "compact" (cth Amira) bunyi robotik; suara Google dalam talian
// (cth "Google Bahasa Indonesia") jauh lebih semula jadi — jadi kita utamakannya.
function scoreVoice(v: SpeechSynthesisVoice): number {
  const lang = (v.lang || '').toLowerCase()
  const name = (v.name || '').toLowerCase()
  let score = 0

  // Padanan bahasa (perkataan asas Melayu = Indonesia, jadi id sangat hampir).
  if (/ms[-_]?my|^ms\b/.test(lang)) score += 1000
  else if (/id[-_]?id|^id\b/.test(lang)) score += 800
  else if (/^en[-_]?/.test(lang)) score += 100

  // Bonus kualiti: suara neural / Google / enhanced bunyi lebih semula jadi.
  if (/google|natural|neural|wavenet|enhanced|premium|siri/.test(name)) score += 400

  // Suara dalam talian (localService === false) biasanya lebih berkualiti
  // daripada suara "compact" tempatan.
  if (v.localService === false) score += 120

  return score
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  if (!cachedVoices.length) refreshVoices()
  const voices = cachedVoices
  if (!voices.length) return undefined
  // Pilih markah tertinggi; jika seri, kekal pada yang pertama.
  let best = voices[0]
  let bestScore = scoreVoice(best)
  for (const v of voices) {
    const s = scoreVoice(v)
    if (s > bestScore) {
      best = v
      bestScore = s
    }
  }
  // Jika tiada satu pun suara relevan (ms/id/en), biar undefined supaya
  // utter() guna lalai pelayar.
  return bestScore > 0 ? best : voices[0]
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
  // Sedikit perlahan + nada hampir semula jadi: lebih jelas & mesra untuk
  // kanak-kanak, dan mengurangkan kesan "robot".
  u.rate = 0.92
  u.pitch = 1.05
  synth.speak(u)
}

// Bacaan menerusi Web Speech API (TTS peranti) — digunakan sebagai sandaran
// apabila tiada klip pra-rakam untuk teks berkenaan.
function webSpeak(text: string) {
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

// ---------------------------------------------------------------------------
// Klip audio pra-rakam (MP3 statik di public/tts/) — suara paling natural dan
// sama di semua peranti/pelayar. Manifest memetakan teks → nama fail.
// ---------------------------------------------------------------------------
const CLIP_MANIFEST = ttsManifest as Record<string, string>
const CLIP_BASE = (import.meta.env.BASE_URL || '/') + 'tts/'
let currentAudio: HTMLAudioElement | null = null
// Token jujukan: setiap main baharu / stop menaikkannya supaya onended lama
// berhenti meneruskan jujukan klip yang telah dibatalkan.
let playToken = 0

/**
 * Baca teks dengan suara paling natural yang ada:
 *  1. Klip pra-rakam untuk teks penuh (paling baik), jika ada.
 *  2. Jika `parts` diberi & setiap serpihan ada klip → gubah (main berturutan).
 *     Berguna untuk teks dinamik (cth banding nombor rawak).
 *  3. Jika tidak → TTS peranti (Web Speech API).
 */
export function speak(text: string, parts?: string[]) {
  const key = text.trim()
  const file = CLIP_MANIFEST[key]
  if (file) {
    playClips([file], text)
    return
  }

  // Cuba gubah daripada serpihan — hanya jika SEMUA serpihan ada klipnya.
  if (parts && parts.length) {
    const files: string[] = []
    let complete = true
    for (const p of parts) {
      const f = CLIP_MANIFEST[p.trim()]
      if (!f) {
        complete = false
        break
      }
      files.push(f)
    }
    if (complete) {
      playClips(files, text)
      return
    }
  }

  // Tiada klip (cth teks dinamik tanpa serpihan) → guna TTS peranti.
  webSpeak(text)
}

// Mainkan satu atau beberapa klip berturutan. `fallbackText` dibaca oleh TTS
// peranti jika klip PERTAMA gagal dimuatkan/dimainkan (cth autoplay disekat).
function playClips(files: string[], fallbackText: string) {
  stopSpeaking()
  const token = ++playToken
  let i = 0
  const playNext = () => {
    if (token !== playToken) return // dibatalkan oleh stop / main baharu
    if (i >= files.length) {
      currentAudio = null
      return
    }
    const first = i === 0
    const audio = new Audio(CLIP_BASE + files[i++])
    currentAudio = audio
    audio.onended = playNext
    audio.play().catch(() => {
      if (token !== playToken) return
      currentAudio = null
      // Hanya jatuh balik ke TTS jika klip pertama gagal; jika tidak, biar senyap.
      if (first) webSpeak(fallbackText)
    })
  }
  playNext()
}

export function stopSpeaking() {
  playToken++
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  window.speechSynthesis?.cancel()
}
