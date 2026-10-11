// Enumerator teks sebutan (dibundel oleh esbuild, diimport oleh collect-phrases.mjs).
// Mengimport DATA SEBENAR app supaya liputan klip audio sentiasa jujur & menyeluruh,
// bukan bergantung pada imbasan regex yang rapuh.

import { JAWI_UNITS } from '../src/data/jawi'
import { SCIENCE_UNITS } from '../src/data/science'
import { READING_LEVELS } from '../src/data/reading'

export interface Phrase {
  text: string
  module: string
}

export function collectPhrases(): { phrases: Phrase[]; bandingCombos: number } {
  const out: Phrase[] = []
  const add = (text: string, module: string) => {
    const t = (text || '').trim()
    if (t) out.push({ text: t, module })
  }

  // --- JAWI: card.speak + question.speak ---
  for (const unit of JAWI_UNITS) {
    for (const c of unit.learn) add(c.speak, 'jawi')
    for (const q of unit.questions) if ('speak' in q && q.speak) add(q.speak, 'jawi')
  }

  // --- SAINS: learn `${title}. ${desc}` + question.speak ---
  for (const unit of SCIENCE_UNITS) {
    for (const c of unit.learn) add(`${c.title}. ${c.desc}`, 'sains')
    for (const q of unit.questions) if ('speak' in q && q.speak) add(q.speak, 'sains')
  }

  // --- MEMBACA ---
  for (const lvl of READING_LEVELS) {
    // Peringkat 1: carta suku kata (setiap petak boleh ditekan)
    if (lvl.syllableChart) for (const syl of lvl.syllableChart.flat()) add(syl, 'membaca')
    // Peringkat 2–4: perkataan + setiap suku kata (ketik untuk dengar)
    for (const w of lvl.words) {
      add(w.word, 'membaca')
      for (const syl of w.syllables) add(syl, 'membaca')
    }
    // Peringkat 5: petikan penuh + kefahaman (petikan + soalan)
    if (lvl.passages) {
      for (const p of lvl.passages) {
        const full = p.sentences.join(' ')
        add(full, 'membaca')
        for (const qq of p.questions) add(`${full} ${qq.q}`, 'membaca')
      }
    }
  }

  // --- MATEMATIK (template questionGenerator.ts; nombor TERHAD sahaja) ---
  // Statik
  add('Berapakah jumlah semua wang syiling ini?', 'matematik')
  add('Lihat muka jam. Pukul berapakah ini?', 'matematik')
  add('Apakah nama bentuk ini?', 'matematik')
  // Tertib (statik, tiada nombor dalam sebutan)
  add('Bilang secara tertib menaik. Nombor manakah yang hilang?', 'matematik')
  add('Bilang secara tertib menurun. Nombor manakah yang hilang?', 'matematik')
  // Cerakin: tens 10..90, ones 1..9  → total 11..99 (unik)
  for (let tens = 10; tens <= 90; tens += 10) {
    for (let ones = 1; ones <= 9; ones++) {
      const total = tens + ones
      add(`Cerakinkan nombor ${total}. ${total} sama dengan ${tens} tambah berapa?`, 'matematik')
      add(`Cerakinkan nombor ${total}. ${total} sama dengan berapa tambah ${ones}?`, 'matematik')
    }
  }
  // Tambah: a 1..9, bb 1..(10-a)
  for (let a = 1; a <= 9; a++) {
    for (let bb = 1; bb <= 10 - a; bb++) {
      add(`${a} tambah ${bb} sama dengan berapa?`, 'matematik')
    }
  }
  // Tolak: a 3..10, b 1..(a-1)
  for (let a = 3; a <= 10; a++) {
    for (let b = 1; b <= a - 1; b++) {
      add(`${a} tolak ${b} sama dengan berapa?`, 'matematik')
    }
  }

  // Banding: `Nombor mana lebih besar/kecil? {a} atau {b}?` dengan a,b ∈ 1..100.
  // ~2 × 100 × 99 = 19 800 ayat penuh — terlalu banyak untuk pra-rakam. Jadi kita
  // GUBAH daripada serpihan: ayat awalan + nombor + "atau" + nombor (lihat speak()).
  // gTTS(ms) menyebut digit sebagai perkataan Melayu (cth "45" → "empat puluh lima"),
  // jadi klip nombor boleh dikunci terus dengan digit.
  add('Nombor mana lebih besar?', 'matematik')
  add('Nombor mana lebih kecil?', 'matematik')
  add('atau', 'matematik')
  for (let n = 0; n <= 100; n++) add(String(n), 'matematik')
  const bandingCombos = 2 * 100 * 99

  return { phrases: out, bandingCombos }
}
