import type { Profile, TopicId } from '../types'
import { TOPICS } from '../data/topics'
import { playTap } from '../lib/audio'
import { BackButton } from './ProfileScreen'

export type QuizMode =
  | { kind: 'topic'; topicId: TopicId }
  | { kind: 'challenge' }

export function TopicScreen({
  profile,
  onStart,
  onBack,
}: {
  profile: Profile
  onStart: (mode: QuizMode) => void
  onBack: () => void
}) {
  return (
    <div className="flex min-h-full flex-col gap-5 bg-gradient-to-b from-sky-200 to-indigo-200 p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-indigo-800 sm:text-3xl">
            Hai {profile.avatar} {profile.name}!
          </h2>
          <p className="font-semibold text-indigo-600">Pilih tajuk untuk berlatih</p>
        </div>
        <div className="rounded-full bg-amber-400 px-4 py-2 text-lg font-extrabold text-white shadow">
          ⭐ {profile.stars}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TOPICS.map((t) => {
          const correct = profile.progress[t.id] ?? 0
          const unlocked = profile.badges.includes(t.badge.id)
          return (
            <button
              key={t.id}
              onClick={() => {
                playTap()
                onStart({ kind: 'topic', topicId: t.id })
              }}
              className={`animate-pop-in flex items-center gap-4 rounded-3xl bg-gradient-to-br ${t.gradient} p-5 text-left text-white shadow-lg transition active:scale-95`}
            >
              <span className="text-5xl sm:text-6xl">{t.emoji}</span>
              <div className="flex-1">
                <div className="text-xl font-extrabold sm:text-2xl">{t.title}</div>
                <div className="font-semibold text-white/90">{t.subtitle}</div>
                <div className="mt-1 text-sm font-bold text-white/90">
                  {unlocked ? `${t.badge.emoji} ${t.badge.name}` : `Betul: ${correct}/${t.badge.requiredCorrect} → ${t.badge.emoji}`}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => {
          playTap()
          onStart({ kind: 'challenge' })
        }}
        className="animate-pop-in mt-1 flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-fuchsia-500 to-red-500 p-5 text-white shadow-lg transition active:scale-95"
      >
        <span className="text-4xl">⏱️</span>
        <div className="text-left">
          <div className="text-xl font-extrabold sm:text-2xl">Cabaran Masa!</div>
          <div className="font-semibold text-white/90">Berapa banyak boleh jawab dalam 60 saat?</div>
        </div>
      </button>
    </div>
  )
}
