import type { Profile } from '../types'
import { JAWI_BADGE, JAWI_UNITS } from '../data/jawi'
import { playTap } from '../lib/audio'
import { BackButton } from './ProfileScreen'

export type JawiMode = 'belajar' | 'kuiz'

export function JawiUnitScreen({
  profile,
  onStart,
  onBack,
}: {
  profile: Profile
  onStart: (level: number, mode: JawiMode) => void
  onBack: () => void
}) {
  const correct = profile.progress['jawi'] ?? 0
  const unlocked = profile.badges.includes(JAWI_BADGE.id)

  return (
    <div className="flex min-h-full flex-col gap-5 bg-[color:var(--color-duo-snow)] p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-slate-700 sm:text-3xl">
            ✍️ Jawi <span className="jawi text-2xl text-[color:var(--color-duo-green-dark)]">جاوي</span>
          </h2>
          <p className="font-bold text-slate-500">
            {unlocked
              ? `${JAWI_BADGE.emoji} ${JAWI_BADGE.name} — syabas!`
              : `Betul: ${correct}/${JAWI_BADGE.requiredCorrect} → ${JAWI_BADGE.emoji} ${JAWI_BADGE.name}`}
          </p>
        </div>
        <div className="duo-chip text-lg text-[color:var(--color-duo-orange)]">⭐ {profile.stars}</div>
      </div>

      <div className="flex flex-col gap-4">
        {JAWI_UNITS.map((unit) => (
          <div
            key={unit.level}
            className="animate-pop-in flex flex-col gap-3 rounded-[1.25rem] p-5 text-white sm:flex-row sm:items-center"
            style={{
              background: `var(--color-duo-${unit.color})`,
              boxShadow: `0 4px 0 0 var(--color-duo-${unit.color}-dark)`,
            }}
          >
            <div className="flex flex-1 items-center gap-4">
              <span className="text-5xl sm:text-6xl">{unit.emoji}</span>
              <div>
                <div className="text-xl font-extrabold sm:text-2xl">{unit.title}</div>
                <div className="font-bold text-white/90">{unit.subtitle}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  playTap()
                  onStart(unit.level, 'belajar')
                }}
                className="duo-btn duo-white flex-1 px-5 py-3 text-lg sm:flex-none"
              >
                🔎 Belajar
              </button>
              <button
                onClick={() => {
                  playTap()
                  onStart(unit.level, 'kuiz')
                }}
                className="flex-1 rounded-2xl border-2 border-white/70 bg-black/15 px-5 py-3 text-lg font-extrabold text-white transition active:scale-95 sm:flex-none"
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
