import type { Topic } from '../types'

export const TOPICS: Topic[] = [
  {
    id: 'nombor',
    title: 'Nombor hingga 100',
    subtitle: 'Banding & susun nombor',
    emoji: '🔢',
    gradient: 'from-sky-400 to-blue-500',
    color: 'blue',
    badge: { id: 'raja-nombor', name: 'Raja Nombor', emoji: '👑', requiredCorrect: 10 },
  },
  {
    id: 'tambah-tolak',
    title: 'Tambah & Tolak',
    subtitle: 'Campur dan tolak',
    emoji: '➕',
    gradient: 'from-emerald-400 to-green-500',
    color: 'green',
    badge: { id: 'raja-tambah', name: 'Raja Tambah', emoji: '🦸', requiredCorrect: 10 },
  },
  {
    id: 'wang',
    title: 'Wang',
    subtitle: 'Sen dan Ringgit',
    emoji: '💰',
    gradient: 'from-amber-400 to-orange-500',
    color: 'orange',
    badge: { id: 'kaya-raya', name: 'Kaya Raya', emoji: '🤑', requiredCorrect: 10 },
  },
  {
    id: 'masa',
    title: 'Masa & Waktu',
    subtitle: 'Baca muka jam',
    emoji: '🕐',
    gradient: 'from-violet-400 to-purple-500',
    color: 'purple',
    badge: { id: 'pakar-jam', name: 'Pakar Jam', emoji: '⏰', requiredCorrect: 10 },
  },
  {
    id: 'bentuk',
    title: 'Bentuk',
    subtitle: 'Bentuk 2D & 3D',
    emoji: '🔺',
    gradient: 'from-pink-400 to-rose-500',
    color: 'red',
    badge: { id: 'raja-bentuk', name: 'Raja Bentuk', emoji: '🎨', requiredCorrect: 10 },
  },
]

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id)
}
