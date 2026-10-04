import type { Profile } from '../types'
import { playTap } from '../lib/audio'
import { BackButton } from './ProfileScreen'

export type Category = 'matematik' | 'membaca'

export function CategoryScreen({
  profile,
  onPick,
  onBack,
}: {
  profile: Profile
  onPick: (c: Category) => void
  onBack: () => void
}) {
  return (
    <div className="flex min-h-full flex-col gap-6 bg-gradient-to-b from-teal-200 to-sky-200 p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-teal-800 sm:text-3xl">
            Hai {profile.avatar} {profile.name}!
          </h2>
          <p className="font-semibold text-teal-600">Kamu nak belajar apa hari ini?</p>
        </div>
        <div className="rounded-full bg-amber-400 px-4 py-2 text-lg font-extrabold text-white shadow">
          ⭐ {profile.stars}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
        <button
          onClick={() => {
            playTap()
            onPick('matematik')
          }}
          className="animate-pop-in flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-br from-sky-400 to-indigo-500 p-8 text-white shadow-lg transition active:scale-95"
        >
          <span className="text-7xl sm:text-8xl">🧮</span>
          <span className="text-3xl font-extrabold">Matematik</span>
          <span className="font-semibold text-white/90">Nombor, tambah, wang & lagi</span>
        </button>

        <button
          onClick={() => {
            playTap()
            onPick('membaca')
          }}
          className="animate-pop-in flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-br from-rose-400 to-fuchsia-500 p-8 text-white shadow-lg transition active:scale-95"
        >
          <span className="text-7xl sm:text-8xl">📖</span>
          <span className="text-3xl font-extrabold">Membaca</span>
          <span className="font-semibold text-white/90">Mengeja, suku kata & ayat</span>
        </button>
      </div>
    </div>
  )
}
