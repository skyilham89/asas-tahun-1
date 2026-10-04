import { playTap } from '../lib/audio'

export function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 p-6 text-center">
      <div className="animate-bounce-soft text-7xl sm:text-8xl">🧒</div>
      <div>
        <h1 className="text-4xl font-extrabold text-sky-800 drop-shadow-sm sm:text-6xl">Asas Tahun 1</h1>
        <p className="mt-2 text-lg font-semibold text-sky-700 sm:text-2xl">Jom belajar sambil bermain! 🎉</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-4xl sm:text-5xl">
        <span className="animate-pop-in">🔢</span>
        <span className="animate-pop-in">➕</span>
        <span className="animate-pop-in">💰</span>
        <span className="animate-pop-in">🕐</span>
        <span className="animate-pop-in">🔺</span>
      </div>

      <button
        onClick={() => {
          playTap()
          onStart()
        }}
        className="rounded-full bg-gradient-to-b from-orange-400 to-orange-500 px-12 py-5 text-2xl font-extrabold text-white shadow-lg shadow-orange-500/40 transition active:scale-95 sm:text-3xl"
      >
        MULA ▶️
      </button>

      <p className="text-sm font-medium text-sky-600">Untuk murid berumur 7 tahun · KSSR Semakan</p>
    </div>
  )
}
