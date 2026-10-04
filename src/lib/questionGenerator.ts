import type { Question, ShapeKind, TopicId } from '../types'

/** Nombor rawak antara min dan max (termasuk kedua-duanya). */
function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Bina senarai pilihan: jawapan betul + beberapa "pengganggu" berdekatan,
 * tiada pendua, kemudian dikocok.
 */
function numberChoices(answer: number, count = 4, spread = 5): string[] {
  const set = new Set<number>([answer])
  let guard = 0
  while (set.size < count && guard++ < 50) {
    const delta = rand(-spread, spread)
    const candidate = answer + delta
    if (candidate >= 0 && candidate !== answer) set.add(candidate)
  }
  return shuffle([...set]).map(String)
}

// ---------------------------------------------------------------------------
// Tajuk: Nombor hingga 100
// ---------------------------------------------------------------------------
const FRUITS = ['🍎', '🍊', '🍓', '🍇', '🍌', '🫐', '🍉', '🍍']

function genNombor(): Question {
  const mode = pick(['banding', 'tertib', 'cerakin'] as const)

  if (mode === 'banding') {
    const a = rand(1, 100)
    let b = rand(1, 100)
    while (b === a) b = rand(1, 100)
    const bigger = Math.random() < 0.5
    const answer = bigger ? Math.max(a, b) : Math.min(a, b)
    const word = bigger ? 'lebih BESAR' : 'lebih KECIL'
    return {
      topicId: 'nombor',
      prompt: `Nombor mana ${word}?`,
      speak: `Nombor mana ${bigger ? 'lebih besar' : 'lebih kecil'}? ${a} atau ${b}?`,
      visual: { kind: 'none' },
      choices: shuffle([String(a), String(b)]),
      answer: String(answer),
      solution: `${Math.max(a, b)} lebih besar daripada ${Math.min(a, b)}.`,
    }
  }

  if (mode === 'tertib') {
    const start = rand(1, 94)
    const ascending = Math.random() < 0.5
    const step = 1
    const seq = ascending
      ? [start, start + step, start + 2 * step, start + 3 * step]
      : [start + 3 * step, start + 2 * step, start + step, start]
    const hideIndex = rand(1, 2)
    const answer = seq[hideIndex]
    const shown: (number | null)[] = seq.map((n, i) => (i === hideIndex ? null : n))
    return {
      topicId: 'nombor',
      prompt: ascending ? 'Isi nombor yang hilang (menaik) ⬆️' : 'Isi nombor yang hilang (menurun) ⬇️',
      speak: `Bilang secara tertib ${ascending ? 'menaik' : 'menurun'}. Nombor manakah yang hilang?`,
      visual: { kind: 'sequence', numbers: shown },
      choices: numberChoices(answer, 4, 3),
      answer: String(answer),
      solution: `Turutannya ialah ${seq.join(', ')}.`,
    }
  }

  // cerakin: puluh + sa
  const tens = rand(1, 9) * 10
  const ones = rand(1, 9)
  const total = tens + ones
  const askOnes = Math.random() < 0.5
  const answer = askOnes ? ones : tens
  return {
    topicId: 'nombor',
    prompt: askOnes ? `${total} = ${tens} + ❓` : `${total} = ❓ + ${ones}`,
    speak: `Cerakinkan nombor ${total}. ${total} sama dengan ${askOnes ? `${tens} tambah berapa` : `berapa tambah ${ones}`}?`,
    visual: { kind: 'none' },
    choices: numberChoices(answer, 4, askOnes ? 4 : 20),
    answer: String(answer),
    solution: `${total} = ${tens} + ${ones}. Puluh ialah ${tens}, sa ialah ${ones}.`,
  }
}

// ---------------------------------------------------------------------------
// Tajuk: Tambah & Tolak
// ---------------------------------------------------------------------------
function genTambahTolak(): Question {
  const isAdd = Math.random() < 0.5

  if (isAdd) {
    // Kekal kecil supaya boleh ditunjuk secara visual
    const a = rand(1, 9)
    const b = rand(1, 10 - a < 1 ? 1 : 9)
    const safeB = Math.min(b, 10 - a >= 1 ? b : 1)
    const bb = Math.max(1, Math.min(safeB, 10 - a))
    const total = a + bb
    const fruit = pick(FRUITS)
    return {
      topicId: 'tambah-tolak',
      prompt: `${a} + ${bb} = ❓`,
      speak: `${a} tambah ${bb} sama dengan berapa?`,
      visual: { kind: 'items', emoji: fruit, groups: [a, bb], op: '+' },
      choices: numberChoices(total, 4, 3),
      answer: String(total),
      solution: `${a} ${fruit} dan ${bb} ${fruit} jadi ${total} ${fruit}.`,
    }
  }

  // Tolak
  const a = rand(3, 10)
  const b = rand(1, a - 1)
  const result = a - b
  const fruit = pick(FRUITS)
  return {
    topicId: 'tambah-tolak',
    prompt: `${a} - ${b} = ❓`,
    speak: `${a} tolak ${b} sama dengan berapa?`,
    visual: { kind: 'items', emoji: fruit, groups: [a, b], op: '-' },
    choices: numberChoices(result, 4, 3),
    answer: String(result),
    solution: `Ada ${a} ${fruit}, ambil ${b}, tinggal ${result} ${fruit}.`,
  }
}

// ---------------------------------------------------------------------------
// Tajuk: Wang
// ---------------------------------------------------------------------------
const COINS = [
  { sen: 5, label: '5 sen' },
  { sen: 10, label: '10 sen' },
  { sen: 20, label: '20 sen' },
  { sen: 50, label: '50 sen' },
]

function formatMoney(sen: number): string {
  if (sen >= 100) {
    const rm = sen / 100
    return `RM${Number.isInteger(rm) ? rm : rm.toFixed(2)}`
  }
  return `${sen} sen`
}

function genWang(): Question {
  const count = rand(2, 4)
  const coins = Array.from({ length: count }, () => pick(COINS))
  const total = coins.reduce((s, c) => s + c.sen, 0)
  // Pengganggu dalam sebutan sen
  const set = new Set<number>([total])
  let guard = 0
  while (set.size < 4 && guard++ < 50) {
    const delta = pick([-20, -10, -5, 5, 10, 20])
    const c = total + delta
    if (c > 0) set.add(c)
  }
  return {
    topicId: 'wang',
    prompt: 'Berapa jumlah wang ini? 💰',
    speak: 'Berapakah jumlah semua wang syiling ini?',
    visual: { kind: 'money', coins },
    choices: shuffle([...set]).map(formatMoney),
    answer: formatMoney(total),
    solution: `Campur semua: ${coins.map((c) => c.sen).join(' + ')} = ${total} sen = ${formatMoney(total)}.`,
  }
}

// ---------------------------------------------------------------------------
// Tajuk: Masa & Waktu
// ---------------------------------------------------------------------------
function timeLabel(hour: number, minute: number): string {
  if (minute === 0) return `Pukul ${hour}`
  if (minute === 30) return `Pukul ${hour} setengah`
  if (minute === 15) return `Pukul ${hour} suku`
  if (minute === 45) return `Pukul ${hour} tiga suku`
  return `${hour}:${String(minute).padStart(2, '0')}`
}

function genMasa(): Question {
  const hour = rand(1, 12)
  const minute = pick([0, 15, 30, 45])
  const answer = timeLabel(hour, minute)

  const distractors = new Set<string>([answer])
  let guard = 0
  while (distractors.size < 4 && guard++ < 50) {
    const h = rand(1, 12)
    const m = pick([0, 15, 30, 45])
    distractors.add(timeLabel(h, m))
  }

  return {
    topicId: 'masa',
    prompt: 'Pukul berapa sekarang? 🕐',
    speak: 'Lihat muka jam. Pukul berapakah ini?',
    visual: { kind: 'clock', hour, minute },
    choices: shuffle([...distractors]),
    answer,
    solution: `Jarum pendek di ${hour} dan jarum panjang menunjukkan ${minute} minit — iaitu "${answer}".`,
  }
}

// ---------------------------------------------------------------------------
// Tajuk: Bentuk
// ---------------------------------------------------------------------------
const SHAPES_2D: { shape: ShapeKind; name: string }[] = [
  { shape: 'bulatan', name: 'Bulatan' },
  { shape: 'segi-tiga', name: 'Segi tiga' },
  { shape: 'segi-empat', name: 'Segi empat sama' },
  { shape: 'segi-empat-tepat', name: 'Segi empat tepat' },
  { shape: 'bujur', name: 'Bujur' },
  { shape: 'segi-lima', name: 'Segi lima' },
  { shape: 'segi-enam', name: 'Segi enam' },
  { shape: 'bintang', name: 'Bintang' },
]
const SHAPES_3D: { shape: ShapeKind; name: string }[] = [
  { shape: 'kubus', name: 'Kubus' },
  { shape: 'kuboid', name: 'Kuboid' },
  { shape: 'sfera', name: 'Sfera' },
  { shape: 'kon', name: 'Kon' },
  { shape: 'silinder', name: 'Silinder' },
  { shape: 'piramid', name: 'Piramid' },
  { shape: 'prisma', name: 'Prisma' },
]

// Simpan bentuk yang baru ditunjuk supaya soalan bentuk tidak berulang.
// Had disimpan lebih kecil daripada kolam 2D (4) supaya sentiasa ada calon baharu.
let recentShapes: ShapeKind[] = []
const MAX_RECENT_SHAPES = SHAPES_2D.length - 1

function genBentuk(): Question {
  const is3D = Math.random() < 0.5
  const pool = is3D ? SHAPES_3D : SHAPES_2D

  // Elak bentuk yang baru sahaja ditunjuk; jika semua baru ditunjuk, benarkan semula.
  const fresh = pool.filter((s) => !recentShapes.includes(s.shape))
  const target = pick(fresh.length > 0 ? fresh : pool)

  recentShapes.push(target.shape)
  while (recentShapes.length > MAX_RECENT_SHAPES) recentShapes.shift()

  const distractors = new Set<string>([target.name])
  const names = pool.map((s) => s.name)
  let guard = 0
  while (distractors.size < Math.min(4, names.length) && guard++ < 50) {
    distractors.add(pick(names))
  }

  return {
    topicId: 'bentuk',
    prompt: 'Apakah nama bentuk ini?',
    speak: 'Apakah nama bentuk ini?',
    visual: { kind: 'shape', shape: target.shape },
    choices: shuffle([...distractors]),
    answer: target.name,
    solution: `Ini ialah ${target.name}.`,
  }
}

// ---------------------------------------------------------------------------
const GENERATORS: Record<TopicId, () => Question> = {
  nombor: genNombor,
  'tambah-tolak': genTambahTolak,
  wang: genWang,
  masa: genMasa,
  bentuk: genBentuk,
}

export function generateQuestion(topicId: TopicId): Question {
  return GENERATORS[topicId]()
}

/** Satu soalan daripada tajuk rawak — untuk Mod Cabaran Masa. */
export function generateRandomQuestion(): Question {
  const topics = Object.keys(GENERATORS) as TopicId[]
  return generateQuestion(pick(topics))
}
