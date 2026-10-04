import { playTap } from '../lib/audio'

export function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-full flex-col items-center bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 p-6 text-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
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

      <footer className="flex flex-col items-center gap-2 pt-6">
        <a
          href="https://github.com/skyilham89/asas-tahun-1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-sky-800 shadow-sm transition hover:bg-white active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
          </svg>
          Lihat kod di GitHub
        </a>
        <p className="text-xs font-medium text-sky-600">© 2026 Ilham Tamam. Made in Jenjarom ❤️</p>
      </footer>
    </div>
  )
}
