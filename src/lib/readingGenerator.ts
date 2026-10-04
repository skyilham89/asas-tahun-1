import { getReadingLevel, type ReadingPassage, type ReadingWord } from '../data/reading'

function rand(max: number): number {
  return Math.floor(Math.random() * max)
}

function pick<T>(arr: T[]): T {
  return arr[rand(arr.length)]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Kocok sehingga susunan berbeza daripada asal (jika boleh). */
function shuffleDifferent(arr: string[]): string[] {
  if (arr.length < 2) return [...arr]
  for (let i = 0; i < 10; i++) {
    const s = shuffle(arr)
    if (s.join('|') !== arr.join('|')) return s
  }
  return shuffle(arr)
}

export type ReadingQuestion =
  // Susun kad suku kata menjadi perkataan yang betul
  | { kind: 'susun'; word: ReadingWord; shuffled: string[] }
  // Lihat gambar, pilih perkataan yang betul
  | { kind: 'pilih'; word: ReadingWord; choices: string[] }
  // Cari suku kata yang hilang
  | { kind: 'hilang'; word: ReadingWord; missingIndex: number; choices: string[] }
  // Dengar sebutan, pilih suku kata yang betul (Peringkat 1)
  | { kind: 'dengar'; syllable: string; choices: string[] }
  // Baca petikan, jawab soalan kefahaman (Peringkat 5)
  | { kind: 'kefahaman'; passage: ReadingPassage; qIndex: number }

/** Bina pilihan perkataan: betul + pengganggu daripada perkataan lain. */
function wordChoices(correct: ReadingWord, pool: ReadingWord[], count = 3): string[] {
  const set = new Set<string>([correct.word])
  const others = shuffle(pool.filter((w) => w.word !== correct.word))
  for (const w of others) {
    if (set.size >= count) break
    set.add(w.word)
  }
  return shuffle([...set])
}

/** Bina pilihan suku kata: betul + pengganggu daripada kolam suku kata. */
function syllableChoices(correct: string, pool: string[], count = 4): string[] {
  const set = new Set<string>([correct])
  const others = shuffle(pool.filter((s) => s !== correct))
  for (const s of others) {
    if (set.size >= count) break
    set.add(s)
  }
  return shuffle([...set])
}

function genForLevel(level: number): ReadingQuestion {
  const data = getReadingLevel(level)
  if (!data) throw new Error(`Peringkat ${level} tidak wujud`)

  // Peringkat 1: dengar & pilih suku kata.
  if (level === 1 && data.syllableChart) {
    const flat = data.syllableChart.flat()
    const target = pick(flat)
    return { kind: 'dengar', syllable: target, choices: syllableChoices(target, flat, 4) }
  }

  // Peringkat 5: kefahaman.
  if (level === 5 && data.passages && data.passages.length > 0) {
    const passage = pick(data.passages)
    const qIndex = rand(passage.questions.length)
    return { kind: 'kefahaman', passage, qIndex }
  }

  // Peringkat 2–4: campuran aktiviti.
  const words = data.words
  const multi = words.filter((w) => w.syllables.length >= 2)
  const allSyllables = [...new Set(words.flatMap((w) => w.syllables))]

  // Jenis aktiviti yang sah bergantung pada ketersediaan perkataan berbilang suku kata.
  const kinds: ReadingQuestion['kind'][] = ['pilih']
  if (multi.length > 0) kinds.push('susun', 'hilang')
  const kind = pick(kinds)

  if (kind === 'susun') {
    const word = pick(multi)
    return { kind: 'susun', word, shuffled: shuffleDifferent(word.syllables) }
  }

  if (kind === 'hilang') {
    const word = pick(multi)
    const missingIndex = rand(word.syllables.length)
    const correct = word.syllables[missingIndex]
    return { kind: 'hilang', word, missingIndex, choices: syllableChoices(correct, allSyllables, 4) }
  }

  // pilih
  const word = pick(words)
  return { kind: 'pilih', word, choices: wordChoices(word, words, 3) }
}

/**
 * Cap unik untuk satu soalan — digunakan supaya soalan tidak berulang
 * dalam satu sesi kuiz:
 *  - dengar     → satu suku kata sekali sahaja
 *  - kefahaman  → satu (petikan + soalan) sekali sahaja
 *  - susun/hilang/pilih → satu perkataan sekali sahaja (tanpa mengira jenis aktiviti)
 */
function questionSignature(q: ReadingQuestion): string {
  switch (q.kind) {
    case 'dengar':
      return `syl:${q.syllable}`
    case 'kefahaman':
      return `pas:${q.passage.image}#${q.qIndex}`
    default:
      return `word:${q.word.word}`
  }
}

/** Jana senarai soalan untuk satu sesi kuiz membaca — tanpa soalan berulang. */
export function generateReadingQuiz(level: number, count = 6): ReadingQuestion[] {
  const questions: ReadingQuestion[] = []
  const seen = new Set<string>()

  // Cuba kumpul soalan unik. Had cubaan supaya tidak terperangkap dalam gelung.
  let guard = 0
  const maxTries = count * 40
  while (questions.length < count && guard++ < maxTries) {
    const q = genForLevel(level)
    const sig = questionSignature(q)
    if (seen.has(sig)) continue
    seen.add(sig)
    questions.push(q)
  }

  // Jika kolam soalan unik lebih kecil daripada `count`, benarkan ulangan
  // untuk mencukupkan bilangan soalan (jarang berlaku — semua peringkat ada ≥ count soalan unik).
  while (questions.length < count) {
    questions.push(genForLevel(level))
  }

  return questions
}
