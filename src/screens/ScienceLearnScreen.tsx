import { useState } from 'react'
import { getScienceUnit } from '../data/science'
import { speak, playTap } from '../lib/audio'
import { BackButton } from './ProfileScreen'

export function ScienceLearnScreen({ level, onBack }: { level: number; onBack: () => void }) {
  const unit = getScienceUnit(level)
  const [index, setIndex] = useState(0)

  if (!unit) return null

  const card = unit.learn[index % unit.learn.length]
  const readAloud = `${card.title}. ${card.desc}`

  return (
    <div className="flex min-h-full flex-col gap-5 bg-[color:var(--color-duo-snow)] p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <div>
          <h2 className="text-2xl font-extrabold text-slate-700">🔬 {unit.subtitle} · Belajar</h2>
          <p className="font-bold text-slate-500">Ketik 🔊 untuk dengar</p>
        </div>
      </div>

      <div
        key={index}
        className="duo-card animate-pop-in flex flex-1 flex-col items-center justify-center gap-5 p-6 text-center"
      >
        <div className="text-8xl">{card.emoji}</div>
        <h3 className="text-3xl font-extrabold text-slate-800">{card.title}</h3>
        <p className="max-w-md text-xl font-bold text-slate-500">{card.desc}</p>
        <button onClick={() => speak(readAloud)} className="duo-btn duo-blue px-6 py-3 text-xl">
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
