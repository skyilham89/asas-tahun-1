import type { Profile } from '../types'
import { READING_BADGE, READING_LEVELS } from '../data/reading'
import { playTap } from '../lib/audio'
import { BackButton } from './ProfileScreen'

export type ReadingMode = 'belajar' | 'kuiz'

export function ReadingLevelScreen({
  profile,
  onStart,
  onBack,
}: {
  profile: Profile
  onStart: (level: number, mode: ReadingMode) => void
  onBack: () => void
}) {
  const correct = profile.progress['membaca'] ?? 0
  const unlocked = profile.badges.includes(READING_BADGE.id)

  return (
    <div className="flex min-h-full flex-col gap-5 bg-gradient-to-b from-rose-200 to-fuchsia-200 p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-fuchsia-800 sm:text-3xl">📖 Membaca</h2>
          <p className="font-semibold text-fuchsia-600">
            {unlocked
              ? `${READING_BADGE.emoji} ${READING_BADGE.name} — syabas!`
              : `Betul: ${correct}/${READING_BADGE.requiredCorrect} → ${READING_BADGE.emoji} ${READING_BADGE.name}`}
          </p>
        </div>
        <div className="rounded-full bg-amber-400 px-4 py-2 text-lg font-extrabold text-white shadow">
          ⭐ {profile.stars}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {READING_LEVELS.map((lvl) => (
          <div
            key={lvl.level}
            className={`animate-pop-in flex flex-col gap-3 rounded-3xl bg-gradient-to-br ${lvl.gradient} p-5 text-white shadow-lg sm:flex-row sm:items-center`}
          >
            <div className="flex flex-1 items-center gap-4">
              <span className="text-5xl sm:text-6xl">{lvl.emoji}</span>
              <div>
                <div className="text-xl font-extrabold sm:text-2xl">{lvl.title}</div>
                <div className="font-semibold text-white/90">{lvl.subtitle}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  playTap()
                  onStart(lvl.level, 'belajar')
                }}
                className="flex-1 rounded-2xl bg-white/90 px-5 py-3 text-lg font-extrabold text-slate-700 shadow transition active:scale-95 sm:flex-none"
              >
                📖 Belajar
              </button>
              <button
                onClick={() => {
                  playTap()
                  onStart(lvl.level, 'kuiz')
                }}
                className="flex-1 rounded-2xl bg-slate-900/25 px-5 py-3 text-lg font-extrabold text-white shadow ring-2 ring-white/60 transition active:scale-95 sm:flex-none"
              >
                🎮 Kuiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
