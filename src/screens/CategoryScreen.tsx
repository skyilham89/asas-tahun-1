import type { Profile } from '../types'
import { playTap } from '../lib/audio'
import { BackButton } from './ProfileScreen'

export type Category = 'matematik' | 'membaca' | 'sains'

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
    <div className="flex min-h-full flex-col gap-6 bg-[color:var(--color-duo-snow)] p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-slate-700 sm:text-3xl">
            Hai {profile.avatar} {profile.name}!
          </h2>
          <p className="font-bold text-slate-500">Kamu nak belajar apa hari ini?</p>
        </div>
        <div className="duo-chip text-lg text-[color:var(--color-duo-orange)]">⭐ {profile.stars}</div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
        <button
          onClick={() => {
            playTap()
            onPick('matematik')
          }}
          className="duo-btn duo-btn-lg duo-blue animate-pop-in flex-col gap-3 p-8"
        >
          <span className="text-7xl sm:text-8xl">🧮</span>
          <span className="text-3xl font-extrabold">Matematik</span>
          <span className="font-bold text-white/90">Nombor, tambah, wang & lagi</span>
        </button>

        <button
          onClick={() => {
            playTap()
            onPick('membaca')
          }}
          className="duo-btn duo-btn-lg duo-purple animate-pop-in flex-col gap-3 p-8"
        >
          <span className="text-7xl sm:text-8xl">📖</span>
          <span className="text-3xl font-extrabold">Membaca</span>
          <span className="font-bold text-white/90">Mengeja, suku kata & ayat</span>
        </button>

        <button
          onClick={() => {
            playTap()
            onPick('sains')
          }}
          className="duo-btn duo-btn-lg duo-green animate-pop-in flex-col gap-3 p-8 sm:col-span-2"
        >
          <span className="text-7xl sm:text-8xl">🔬</span>
          <span className="text-3xl font-extrabold">Sains</span>
          <span className="font-bold text-white/90">Deria, haiwan, tumbuhan & benda hidup</span>
        </button>
      </div>
    </div>
  )
}
