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
    <div className="relative flex min-h-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-sky-50 to-white p-6 text-center">
      {good && <Confetti />}

      <div className="animate-bounce-soft text-7xl sm:text-8xl">{face}</div>
      <h2 className="text-3xl font-extrabold text-slate-700 sm:text-4xl">{message}</h2>

      <div className="duo-card flex flex-col items-center gap-3 p-7">
        <p className="text-xl font-bold text-slate-500">Markah kamu</p>
        <p className="text-6xl font-extrabold text-[color:var(--color-duo-green)]">
          {correct}
          <span className="text-3xl text-slate-400">/{total}</span>
        </p>
        <div className="flex items-center gap-2 rounded-full bg-orange-50 px-5 py-2">
          <span className="text-3xl">⭐</span>
          <span className="text-2xl font-extrabold text-[color:var(--color-duo-orange)]">+{starsEarned} bintang</span>
        </div>
      </div>

      {newBadges.length > 0 && (
        <div className="duo-card animate-pop-in flex flex-col items-center gap-2 border-[color:var(--color-duo-purple)] p-5" style={{ boxShadow: '0 4px 0 0 var(--color-duo-purple-dark)' }}>
          <p className="text-lg font-extrabold text-[color:var(--color-duo-purple-dark)]">🏅 Lencana baru dibuka!</p>
          <div className="flex flex-wrap justify-center gap-4">
            {newBadges.map((b) => (
              <div key={b.id} className="flex flex-col items-center">
                <span className="text-5xl">{b.emoji}</span>
                <span className="font-extrabold text-slate-700">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex w-full max-w-sm flex-col gap-3">
        <button onClick={onReplay} className="duo-btn duo-btn-lg duo-green py-5 text-2xl">
          🔁 Main Semula
        </button>
        <button onClick={onPickTopic} className="duo-btn duo-white py-5 text-2xl">
          {pickLabel}
        </button>
      </div>
    </div>
  )
}
