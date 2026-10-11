import { useState } from 'react'
import { getJawiUnit } from '../data/jawi'
import { speak, playTap } from '../lib/audio'
import { BackButton } from './ProfileScreen'

export function JawiLearnScreen({ level, onBack }: { level: number; onBack: () => void }) {
  const unit = getJawiUnit(level)
  const [index, setIndex] = useState(0)

  if (!unit) return null

  const card = unit.learn[index % unit.learn.length]

  return (
    <div className="flex min-h-full flex-col gap-5 bg-[color:var(--color-duo-snow)] p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <div>
          <h2 className="text-2xl font-extrabold text-slate-700">✍️ {unit.subtitle} · Belajar</h2>
          <p className="font-bold text-slate-500">Ketik 🔊 untuk dengar</p>
        </div>
      </div>

      <div
        key={index}
        className="duo-card animate-pop-in flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center"
      >
        {card.emoji && <div className="text-7xl">{card.emoji}</div>}
        {card.glyph && (
          <div className="jawi text-7xl font-bold text-[color:var(--color-duo-green-dark)] sm:text-8xl">
            {card.glyph}
          </div>
        )}
        <h3 className="text-3xl font-extrabold text-slate-800">{card.title}</h3>
        {card.rumi && !card.title.includes(card.rumi) && (
          <div className="text-xl font-extrabold text-[color:var(--color-duo-blue)]">{card.rumi}</div>
        )}
        <p className="max-w-md text-xl font-bold text-slate-500">{card.desc}</p>
        <button onClick={() => speak(card.speak)} className="duo-btn duo-blue px-6 py-3 text-xl">
          🔊 Dengar
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            playTap()
            setIndex((i) => Math.max(0, i - 1))
          }}
          disabled={index === 0}
          className="duo-btn duo-white px-6 py-3 text-lg"
        >
          ⬅️ Sebelum
        </button>
        <span className="font-extrabold text-slate-500">
          {index + 1} / {unit.learn.length}
        </span>
        <button
          onClick={() => {
            playTap()
            setIndex((i) => Math.min(unit.learn.length - 1, i + 1))
          }}
          disabled={index >= unit.learn.length - 1}
          className="duo-btn duo-white px-6 py-3 text-lg"
        >
          Seterusnya ➡️
        </button>
      </div>
    </div>
  )
}
