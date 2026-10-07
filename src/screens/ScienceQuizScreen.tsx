import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { generateScienceQuiz, getScienceUnit, type ScienceQuestion } from '../data/science'
import { playCorrect, playWrong, playTap, speak, stopSpeaking } from '../lib/audio'
import { SpeakerButton } from '../components/SpeakerButton'
import { Confetti } from '../components/Confetti'
import { BackButton } from './ProfileScreen'

const QUESTION_COUNT = 6

export interface ScienceResult {
  level: number
  total: number
  correct: number
}

type Status = 'answering' | 'correct' | 'wrong'

export function ScienceQuizScreen({
  level,
  onFinish,
  onQuit,
}: {
  level: number
  onFinish: (r: ScienceResult) => void
  onQuit: () => void
}) {
  const unit = getScienceUnit(level)
  const [questions] = useState<ScienceQuestion[]>(() => generateScienceQuiz(level, QUESTION_COUNT))
  const [qi, setQi] = useState(0)
  const correctRef = useRef(0)
  const [status, setStatus] = useState<Status>('answering')
  const [selected, setSelected] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = Math.min(QUESTION_COUNT, questions.length)
  const q = questions[qi]

  const finish = useCallback(() => {
    stopSpeaking()
    onFinish({ level, total, correct: correctRef.current })
  }, [level, onFinish, total])

  // Set semula keadaan + baca soalan secara automatik.
  useEffect(() => {
    setStatus('answering')
    setSelected(null)
    if (!q) return
    const t = setTimeout(() => speak(q.speak), 350)
    return () => clearTimeout(t)
  }, [qi, q])

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    },
    [],
  )

  // Untuk aktiviti "label": setiap bahagian dapat satu huruf (A/B/C/D) yang
  // dikocok, supaya penanda pada gambar & butang jawapan guna huruf yang sama.
  const labelData = useMemo(() => {
    if (!q || q.kind !== 'label') return null
    const alphabet = ['A', 'B', 'C', 'D', 'E']
    const idx = q.parts.map((_, i) => i)
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[idx[i], idx[j]] = [idx[j], idx[i]]
    }
    // letterOf[partIndex] = huruf yang diberikan kepada bahagian itu
    const letterOf: string[] = []
    idx.forEach((partIndex, slot) => {
      letterOf[partIndex] = alphabet[slot]
    })
    const choices = [...letterOf].sort()
    return { letterOf, choices, answerLetter: letterOf[q.targetIndex] }
  }, [qi, q])

  if (!q || !unit) return null

  function goNext() {
    if (qi + 1 >= total) {
      finish()
      return
    }
    setShowConfetti(false)
    setQi((i) => i + 1)
  }

  function markCorrect() {
    playCorrect()
    setStatus('correct')
    correctRef.current += 1
    setShowConfetti(true)
    advanceTimer.current = setTimeout(goNext, 1300)
  }

  function markWrong() {
    playWrong()
    setStatus('wrong')
  }

  function answerChoice(choice: string, answer: string) {
    if (status !== 'answering') return
    stopSpeaking()
    setSelected(choice)
    if (choice === answer) markCorrect()
    else markWrong()
  }

  const progressPct = (qi / total) * 100
  const answer =
    q.kind === 'label' ? (labelData?.answerLetter ?? '') : q.kind === 'sort' ? q.answer : q.answer

  return (
    <div className="relative flex min-h-full flex-col gap-4 bg-[color:var(--color-duo-snow)] p-5">
      {showConfetti && <Confetti />}

      {/* Bar atas */}
      <div className="flex items-center gap-3">
        <BackButton onClick={onQuit} />
        <div className="flex-1">
          <div className="duo-track h-5">
            <div className="duo-fill" style={{ width: `${progressPct}%`, background: 'var(--color-duo-green)' }} />
          </div>
        </div>
        <div className="duo-chip text-lg text-[color:var(--color-duo-green-dark)]">
          {qi + 1}/{total}
        </div>
      </div>

      <div className="text-center text-lg font-extrabold text-slate-600">🔬 {unit.subtitle}</div>

      {/* Kad soalan */}
      <div key={qi} className="duo-card animate-pop-in flex flex-1 flex-col items-center justify-center gap-5 p-6">
        <div className="flex items-center gap-3">
          <h3 className="text-center text-xl font-extrabold text-slate-800">{q.prompt}</h3>
          <SpeakerButton text={q.speak} />
        </div>

        {q.kind === 'label' && labelData && (
          <LabelCard
            q={q}
            letterOf={labelData.letterOf}
            choices={labelData.choices}
            answer={answer}
            selected={selected}
            status={status}
            onPick={(c) => answerChoice(c, answer)}
          />
        )}
        {q.kind === 'sort' && (
          <SortCard q={q} selected={selected} status={status} onPick={(c) => answerChoice(c, answer)} />
        )}
        {(q.kind === 'pilih' || q.kind === 'deria') && (
          <>
            {/* Sembunyikan gambar atas jika ia salah satu pilihan (elak bocor jawapan). */}
            {!q.choices.includes(q.image) && <div className="text-8xl">{q.image}</div>}
            <ChoiceGrid choices={q.choices} answer={answer} selected={selected} status={status} onPick={(c) => answerChoice(c, answer)} />
          </>
        )}
      </div>

      {/* Maklum balas */}
      {status === 'correct' && (
        <div className="animate-pop-in rounded-3xl bg-[#d7ffb8] p-4 text-center text-2xl font-extrabold text-[color:var(--color-duo-green-dark)]">
          🎉 Betul! Pandai! 🌟
        </div>
      )}
      {status === 'wrong' && (
        <div className="animate-pop-in flex flex-col gap-3 rounded-3xl bg-[#ffe3e3] p-5">
          <div className="text-center text-xl font-extrabold text-[color:var(--color-duo-red-dark)]">Cuba lagi lain kali! 💪</div>
          <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-3">
            <span className="text-2xl">💡</span>
            <p className="text-lg font-semibold text-slate-700">{q.solution}</p>
          </div>
          <button
            onClick={() => {
              playTap()
              goNext()
            }}
            className="duo-btn duo-red py-4 text-xl"
          >
            Teruskan ➡️
          </button>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Grid pilihan jawapan yang dikongsi
// ---------------------------------------------------------------------------
function ChoiceGrid({
  choices,
  answer,
  selected,
  status,
  onPick,
}: {
  choices: string[]
  answer: string
  selected: string | null
  status: Status
  onPick: (c: string) => void
}) {
  const big = choices.every((c) => [...c].length <= 3) // emoji sahaja → besar
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3">
      {choices.map((choice) => {
        const isAnswer = choice === answer
        const isPicked = choice === selected
        let cls = 'duo-btn duo-green'
        if (status !== 'answering') {
          if (isAnswer) cls = 'duo-btn duo-green'
          else if (isPicked) cls = 'duo-btn duo-red animate-shake'
          else cls = 'rounded-2xl bg-slate-100 text-slate-400'
        }
        return (
          <button
            key={choice}
            onClick={() => {
              playTap()
              onPick(choice)
            }}
            disabled={status !== 'answering'}
            className={`px-4 py-5 font-extrabold ${big ? 'text-5xl sm:text-6xl' : 'text-xl sm:text-2xl'} ${cls}`}
          >
            {choice}
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Aktiviti "label": setiap bahagian ada huruf (A/B/C/D) pada gambar; budak
// cari bahagian yang disebut, lihat hurufnya, kemudian ketik huruf yang sama.
function LabelCard({
  q,
  letterOf,
  choices,
  answer,
  selected,
  status,
  onPick,
}: {
  q: Extract<ScienceQuestion, { kind: 'label' }>
  letterOf: string[]
  choices: string[]
  answer: string
  selected: string | null
  status: Status
  onPick: (c: string) => void
}) {
  return (
    <>
      <p className="text-center text-base font-bold text-slate-500">
        Cari bahagian itu, lihat hurufnya, kemudian ketik huruf yang sama 👇
      </p>

      {/* Gambar rajah dengan penanda berhuruf */}
      <div className="relative mx-auto h-60 w-60 rounded-3xl bg-[color:var(--color-duo-snow)] sm:h-64 sm:w-64">
        {q.diagram === 'plant' ? (
          <PlantDiagram />
        ) : q.diagram === 'bird' ? (
          <BirdDiagram />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[8rem] sm:text-[9rem]">
            {q.subject}
          </div>
        )}
        {q.parts.map((part, i) => {
          const letter = letterOf[i]
          const isAnswer = i === q.targetIndex
          // Selepas dijawab: tonjolkan jawapan betul (hijau); jika budak pilih
          // huruf salah, serlahkan huruf itu merah; selain itu malapkan.
          let badge =
            'border-[color:var(--color-duo-blue)] bg-white text-[color:var(--color-duo-blue)]'
          if (status !== 'answering') {
            if (isAnswer) badge = 'border-[color:var(--color-duo-green)] bg-[color:var(--color-duo-green)] text-white'
            else if (letter === selected) badge = 'border-[color:var(--color-duo-red)] bg-[color:var(--color-duo-red)] text-white'
            else badge = 'border-slate-200 bg-white text-slate-300'
          }
          return (
            <span
              key={part.label}
              className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 text-lg font-extrabold shadow-md ${badge}`}
              style={{ left: `${part.x}%`, top: `${part.y}%` }}
            >
              {letter}
            </span>
          )
        })}
      </div>

      {/* Butang jawapan — huruf A/B/C/D */}
      <div className="grid w-full max-w-md grid-cols-4 gap-3">
        {choices.map((letter) => {
          const isAnswer = letter === answer
          const isPicked = letter === selected
          let cls = 'duo-btn duo-blue'
          if (status !== 'answering') {
            if (isAnswer) cls = 'duo-btn duo-green'
            else if (isPicked) cls = 'duo-btn duo-red animate-shake'
            else cls = 'rounded-2xl bg-slate-100 text-slate-400'
          }
          return (
            <button
              key={letter}
              onClick={() => {
                playTap()
                onPick(letter)
              }}
              disabled={status !== 'answering'}
              className={`py-5 text-3xl font-extrabold ${cls}`}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </>
  )
}

// Rajah burung ringkas menghadap kiri — paruh (kiri), kepak (tengah) & ekor
// (kanan) diletakkan jauh antara satu sama lain supaya mudah dilabel. Emoji
// burung tunggal tidak menunjukkan ketiga-tiga bahagian dengan jelas.
function BirdDiagram() {
  const blue = 'var(--color-duo-blue)'
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
      {/* Kaki */}
      <path d="M48 64 L46 80 M56 64 L58 80" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      {/* Ekor (kanan) */}
      <polygon points="68,52 92,41 92,55" fill={blue} />
      {/* Badan */}
      <ellipse cx="52" cy="50" rx="24" ry="16" fill={blue} />
      {/* Kepala (kiri) */}
      <circle cx="28" cy="40" r="13" fill={blue} />
      {/* Paruh (kiri) */}
      <polygon points="11,38 26,34 26,44" fill="#f59e0b" />
      {/* Kepak / sayap (tengah) */}
      <ellipse cx="52" cy="47" rx="13" ry="7.5" fill="#1183c0" />
      {/* Mata */}
      <circle cx="24" cy="37" r="2.6" fill="#1f2937" />
    </svg>
  )
}

// Rajah pokok ringkas (bunga + daun + batang + akar) kerana emoji 🌻 hanya
// menunjukkan bunga sahaja — bahagian lain perlu wujud betul-betul.
function PlantDiagram() {
  return (
    <div className="absolute inset-0">
      {/* Bunga di atas */}
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2 text-6xl">🌻</div>
      {/* Batang */}
      <div className="absolute left-1/2 top-[30%] h-[42%] w-3 -translate-x-1/2 rounded-full bg-[color:var(--color-duo-green)]" />
      {/* Daun di sisi batang */}
      <div className="absolute left-[62%] top-[42%] -translate-y-1/2 text-5xl">🍃</div>
      {/* Tanah */}
      <div className="absolute inset-x-0 bottom-0 h-[24%] rounded-b-3xl bg-[#c99a63]" />
      {/* Akar di dalam tanah */}
      <svg className="absolute inset-x-0 bottom-0 h-[24%] w-full" viewBox="0 0 100 24" preserveAspectRatio="none">
        <path
          d="M50 0 L50 10 M50 10 L38 22 M50 10 L62 22 M50 10 L50 24"
          stroke="#8a5a2b"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function SortCard({
  q,
  selected,
  status,
  onPick,
}: {
  q: Extract<ScienceQuestion, { kind: 'sort' }>
  selected: string | null
  status: Status
  onPick: (c: string) => void
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <div className="text-8xl">{q.image}</div>
        <div className="text-xl font-extrabold text-slate-600">{q.itemLabel}</div>
      </div>
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {q.bins.map((bin) => {
          const isAnswer = bin === q.answer
          const isPicked = bin === selected
          let cls = 'duo-btn duo-blue'
          if (status !== 'answering') {
            if (isAnswer) cls = 'duo-btn duo-green'
            else if (isPicked) cls = 'duo-btn duo-red animate-shake'
            else cls = 'rounded-2xl bg-slate-100 text-slate-400'
          }
          return (
            <button
              key={bin}
              onClick={() => {
                playTap()
                onPick(bin)
              }}
              disabled={status !== 'answering'}
              className={`px-4 py-6 text-xl font-extrabold sm:text-2xl ${cls}`}
            >
              {bin}
            </button>
          )
        })}
      </div>
    </>
  )
}
