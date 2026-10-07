import { useState } from 'react'
import { getReadingLevel } from '../data/reading'
import { speak, playTap } from '../lib/audio'
import { SyllableWord } from '../components/SyllableWord'
import { BackButton } from './ProfileScreen'

export function ReadingLearnScreen({ level, onBack }: { level: number; onBack: () => void }) {
  const data = getReadingLevel(level)
  const [index, setIndex] = useState(0)

  if (!data) return null

  const header = (
    <div className="flex items-center gap-3">
      <BackButton onClick={onBack} />
      <div>
        <h2 className="text-2xl font-extrabold text-slate-700">📖 {data.title} · Belajar</h2>
        <p className="font-bold text-slate-500">{data.subtitle}</p>
      </div>
    </div>
  )

  // --- Peringkat 1: carta suku kata ---
  if (data.syllableChart) {
    return (
      <div className="flex min-h-full flex-col gap-5 bg-[color:var(--color-duo-snow)] p-6">
        {header}
        <p className="text-center text-lg font-bold text-slate-500">Ketik mana-mana petak untuk dengar bunyinya 👂</p>
        <div className="flex flex-col items-center gap-2">
          {data.syllableChart.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((syl) => (
                <button
                  key={syl}
                  onClick={() => speak(syl)}
                  className="duo-card flex h-14 w-14 items-center justify-center text-xl font-extrabold text-[color:var(--color-duo-red-dark)] transition active:translate-y-1 sm:h-16 sm:w-16 sm:text-2xl"
                >
                  {syl}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // --- Peringkat 5: baca petikan ---
  if (data.passages) {
    const passage = data.passages[index % data.passages.length]
    const full = passage.sentences.join(' ')
    return (
      <div className="flex min-h-full flex-col gap-5 bg-[color:var(--color-duo-snow)] p-6">
        {header}
        <div className="duo-card flex flex-1 flex-col items-center justify-center gap-5 p-6">
          <div className="text-7xl">{passage.image}</div>
          <div className="space-y-2 text-center">
            {passage.sentences.map((s, i) => (
              <p key={i} className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
                {s}
              </p>
            ))}
          </div>
          <button onClick={() => speak(full)} className="duo-btn duo-purple px-6 py-3 text-xl">
            🔊 Dengar
          </button>
        </div>
        <Nav
          index={index}
          total={data.passages.length}
          onPrev={() => setIndex((i) => Math.max(0, i - 1))}
          onNext={() => setIndex((i) => Math.min(data.passages!.length - 1, i + 1))}
        />
      </div>
    )
  }

  // --- Peringkat 2–4: perkataan bergambar ---
  const word = data.words[index % data.words.length]
  return (
    <div className="flex min-h-full flex-col gap-5 bg-[color:var(--color-duo-snow)] p-6">
      {header}
      <div className="duo-card flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <div className="text-8xl">{word.image}</div>
        <SyllableWord syllables={word.syllables} className="gap-1 text-5xl sm:text-6xl" />
        <p className="text-sm font-semibold text-slate-400">Ketik setiap suku kata untuk dengar</p>
        <button onClick={() => speak(word.word)} className="duo-btn duo-red px-6 py-3 text-xl">
          🔊 Baca "{word.word}"
        </button>
      </div>
      <Nav
        index={index}
        total={data.words.length}
        onPrev={() => setIndex((i) => Math.max(0, i - 1))}
        onNext={() => setIndex((i) => Math.min(data.words.length - 1, i + 1))}
      />
    </div>
  )
}

function Nav({ index, total, onPrev, onNext }: { index: number; total: number; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={() => {
          playTap()
          onPrev()
        }}
        disabled={index === 0}
        className="duo-btn duo-white px-6 py-3 text-lg"
      >
        ⬅️ Sebelum
      </button>
      <span className="font-extrabold text-slate-500">
        {index + 1} / {total}
      </span>
      <button
        onClick={() => {
          playTap()
          onNext()
        }}
        disabled={index >= total - 1}
        className="duo-btn duo-white px-6 py-3 text-lg"
      >
        Seterusnya ➡️
      </button>
    </div>
  )
}
