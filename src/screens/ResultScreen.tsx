import { useEffect } from 'react'
import type { Badge } from '../types'
import { playFinish } from '../lib/audio'
import { Confetti } from '../components/Confetti'

export function ResultScreen({
  total,
  correct,
  starsEarned,
  newBadges,
  onReplay,
  onPickTopic,
  pickLabel = '📚 Pilih Tajuk Lain',
}: {
  total: number
  correct: number
  starsEarned: number
  newBadges: Badge[]
  onReplay: () => void
  onPickTopic: () => void
  pickLabel?: string
}) {
  const perfect = total > 0 && correct === total
  const good = total > 0 && correct / total >= 0.6

  useEffect(() => {
    playFinish()
  }, [])

  const face = perfect ? '🤩' : good ? '😃' : '🙂'
  const message = perfect ? 'Hebat sekali! Semua betul!' : good ? 'Bagus! Teruskan usaha!' : 'Jangan putus asa, cuba lagi!'

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-yellow-200 via-amber-200 to-orange-200 p-6 text-center">
      {good && <Confetti />}

      <div className="animate-bounce-soft text-7xl sm:text-8xl">{face}</div>
      <h2 className="text-3xl font-extrabold text-orange-800 sm:text-4xl">{message}</h2>

      <div className="flex flex-col items-center gap-3 rounded-[2rem] bg-white p-7 shadow-xl">
        <p className="text-xl font-bold text-slate-600">Markah kamu</p>
        <p className="text-6xl font-extrabold text-emerald-500">
          {correct}
          <span className="text-3xl text-slate-400">/{total}</span>
        </p>
        <div className="flex items-center gap-2 rounded-full bg-amber-100 px-5 py-2">
          <span className="text-3xl">⭐</span>
          <span className="text-2xl font-extrabold text-amber-600">+{starsEarned} bintang</span>
        </div>
      </div>

      {newBadges.length > 0 && (
        <div className="animate-pop-in flex flex-col items-center gap-2 rounded-3xl bg-gradient-to-b from-violet-500 to-fuchsia-600 p-5 text-white shadow-lg">
          <p className="text-lg font-bold">🏅 Lencana baru dibuka!</p>
          <div className="flex flex-wrap justify-center gap-4">
            {newBadges.map((b) => (
              <div key={b.id} className="flex flex-col items-center">
                <span className="text-5xl">{b.emoji}</span>
                <span className="font-extrabold">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex w-full max-w-sm flex-col gap-3">
        <button
          onClick={onReplay}
          className="rounded-full bg-gradient-to-b from-emerald-400 to-green-500 py-5 text-2xl font-extrabold text-white shadow-lg transition active:scale-95"
        >
          🔁 Main Semula
        </button>
        <button
          onClick={onPickTopic}
          className="rounded-full bg-white py-5 text-2xl font-extrabold text-slate-700 shadow-md transition active:scale-95"
        >
          {pickLabel}
        </button>
      </div>
    </div>
  )
}
