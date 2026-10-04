export type TopicId =
  | 'nombor'
  | 'tambah-tolak'
  | 'wang'
  | 'masa'
  | 'bentuk'

export interface Topic {
  id: TopicId
  title: string
  subtitle: string
  emoji: string
  /** Tailwind gradient classes for the topic card */
  gradient: string
  badge: Badge
}

export interface Badge {
  id: string
  name: string
  emoji: string
  /** Betul berturut-turut / jumlah betul diperlukan untuk buka lencana */
  requiredCorrect: number
}

/** What picture to draw above a question, if any. */
export type QuestionVisual =
  | { kind: 'none' }
  | { kind: 'items'; emoji: string; groups: number[]; op: '+' | '-' }
  | { kind: 'clock'; hour: number; minute: number }
  | { kind: 'shape'; shape: ShapeKind }
  | { kind: 'money'; coins: MoneyPiece[] }
  | { kind: 'sequence'; numbers: (number | null)[] }

export type ShapeKind =
  | 'bulatan'
  | 'segi-empat'
  | 'segi-tiga'
  | 'segi-empat-tepat'
  | 'bujur'
  | 'segi-lima'
  | 'segi-enam'
  | 'bintang'
  | 'kubus'
  | 'kuboid'
  | 'sfera'
  | 'kon'
  | 'silinder'
  | 'piramid'
  | 'prisma'

/** A coin/note value in sen (so RM1 = 100). */
export interface MoneyPiece {
  sen: number
  label: string
}

export interface Question {
  topicId: TopicId
  /** Bacaan teks soalan (dipaparkan besar). */
  prompt: string
  /** Teks untuk dibaca kuat oleh Text-to-Speech. */
  speak: string
  visual: QuestionVisual
  choices: string[]
  answer: string
  /** Penjelasan ringkas ditunjuk bila jawapan salah. */
  solution: string
}

export interface Profile {
  name: string
  avatar: string
  stars: number
  badges: string[]
  /** topicId -> jumlah jawapan betul sepanjang masa */
  progress: Record<string, number>
}
