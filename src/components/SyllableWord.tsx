import { speak } from '../lib/audio'

// Warna berbeza bagi setiap suku kata — bantu murid mengeja & membaca.
const SYLLABLE_COLORS = [
  'text-red-500',
  'text-blue-600',
  'text-green-600',
  'text-purple-600',
  'text-orange-500',
  'text-pink-600',
]

export function syllableColor(index: number): string {
  return SYLLABLE_COLORS[index % SYLLABLE_COLORS.length]
}

/**
 * Perkataan dengan suku kata berwarna. Boleh ditekan untuk mendengar
 * sebutan setiap suku kata (Audio-Assisted Reading).
 */
export function SyllableWord({
  syllables,
  tappable = true,
  className = '',
}: {
  syllables: string[]
  tappable?: boolean
  className?: string
}) {
  return (
    <div className={`flex flex-wrap items-center justify-center ${className}`}>
      {syllables.map((syl, i) => {
        const color = syllableColor(i)
        if (!tappable) {
          return (
            <span key={i} className={`font-extrabold ${color}`}>
              {syl}
            </span>
          )
        }
        return (
          <button
            key={i}
            onClick={() => speak(syl)}
            className={`rounded-2xl px-1 font-extrabold transition active:scale-90 hover:bg-slate-100 ${color}`}
          >
            {syl}
          </button>
        )
      })}
    </div>
  )
}
