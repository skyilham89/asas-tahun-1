import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { generateJawiQuiz, getJawiUnit, type JawiQuestion } from '../data/jawi'
import { playCorrect, playWrong, playTap, speak, stopSpeaking } from '../lib/audio'
import { SpeakerButton } from '../components/SpeakerButton'
import { Confetti } from '../components/Confetti'
import { BackButton } from './ProfileScreen'

const QUESTION_COUNT = 8

export interface JawiResult {
  level: number
  total: number
  correct: number
}

type Status = 'answering' | 'correct' | 'wrong'

export function JawiQuizScreen({
  level,
  onFinish,
  onQuit,
}: {
  level: number
  onFinish: (r: JawiResult) => void
  onQuit: () => void
}) {
  const unit = getJawiUnit(level)
  const [questions] = useState<JawiQuestion[]>(() => generateJawiQuiz(level, QUESTION_COUNT))
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

      <div className="text-center text-lg font-extrabold text-slate-600">✍️ {unit.subtitle}</div>

      {/* Kad soalan */}
      <div key={qi} className="duo-card animate-pop-in flex flex-1 flex-col items-center justify-center gap-5 p-6">
        <div className="flex items-center gap-3">
          <h3 className="text-center text-xl font-extrabold text-slate-800">{q.prompt}</h3>
          <SpeakerButton text={q.speak} />
        </div>

        {q.kind === 'padan' && (
          <>
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[color:var(--color-duo-snow)] text-6xl font-extrabold text-slate-700">
              {q.rumi}
            </div>
            <JawiChoiceGrid choices={q.choices} answer={q.answer} selected={selected} status={status} onPick={(c) => answerChoice(c, q.answer)} />
          </>
        )}

        {q.kind === 'dengar' && (
          <>
            <button onClick={() => speak(q.speak)} className="text-7xl transition active:scale-90" aria-label="Dengar bunyi">
              👂
            </button>
            <p className="text-base font-bold text-slate-500">Ketik 👂 untuk dengar semula</p>
            <JawiChoiceGrid choices={q.choices} answer={q.answer} selected={selected} status={status} onPick={(c) => answerChoice(c, q.answer)} />
          </>
        )}

        {q.kind === 'pilih' && (
          <>
            <div className="text-8xl">{q.image}</div>
            <JawiChoiceGrid choices={q.choices} answer={q.answer} selected={selected} status={status} onPick={(c) => answerChoice(c, q.answer)} />
          </>
        )}

        {q.kind === 'asing' && (
          <AsingCard q={q} selected={selected} status={status} onPick={(c) => answerChoice(c, q.answer)} />
        )}

        {q.kind === 'sambung' && (
          <SambungCard key={qi} q={q} status={status} onCorrect={markCorrect} onWrong={markWrong} />
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
// Grid pilihan jawapan Jawi (glif besar, font naskh)
// ---------------------------------------------------------------------------
function JawiChoiceGrid({
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
            className={`jawi px-4 py-5 text-5xl font-bold sm:text-6xl ${cls}`}
          >
            {choice}
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Aktiviti "asing": tunjuk satu huruf Jawi, pilih kumpulan yang betul.
// ---------------------------------------------------------------------------
function AsingCard({
  q,
  selected,
  status,
  onPick,
}: {
  q: Extract<JawiQuestion, { kind: 'asing' }>
  selected: string | null
  status: Status
  onPick: (c: string) => void
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <div className="jawi text-8xl font-bold text-[color:var(--color-duo-green-dark)]">{q.letter}</div>
        <div className="text-xl font-extrabold text-slate-600">{q.rumi}</div>
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
              className={`px-4 py-6 text-lg font-extrabold sm:text-xl ${cls}`}
            >
              {bin}
            </button>
          )
        })}
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Aktiviti "sambung": ketik kepingan ikut turutan betul. Teks Jawi bercantum
// secara automatik (RTL) apabila huruf digabungkan — jadi murid nampak bentuk
// sambungan berubah seperti dalam penulisan sebenar.
// ---------------------------------------------------------------------------
function SambungCard({
  q,
  status,
  onCorrect,
  onWrong,
}: {
  q: Extract<JawiQuestion, { kind: 'sambung' }>
  status: Status
  onCorrect: () => void
  onWrong: () => void
}) {
  // Kocok kepingan untuk paparan (sekali sahaja per soalan).
  const shuffled = useMemo(() => {
    const arr = q.pieces.map((str, id) => ({ str, id }))
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [q])

  // Simpan id kepingan yang ditekan ikut turutan.
  const [picks, setPicks] = useState<number[]>([])

  const assembled = picks.map((id) => q.pieces[id]).join('')

  function pick(id: number) {
    if (status !== 'answering') return
    stopSpeaking()
    playTap()
    const next = [...picks, id]
    setPicks(next)
    if (next.length === q.pieces.length) {
      const word = next.map((i) => q.pieces[i]).join('')
      if (word === q.answer) onCorrect()
      else onWrong()
    }
  }

  function undo() {
    if (status !== 'answering') return
    playTap()
    setPicks((p) => p.slice(0, -1))
  }

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <div className="text-7xl">{q.image}</div>
        <div className="text-lg font-extrabold text-[color:var(--color-duo-blue)]">{q.rumiMeaning}</div>
      </div>

      {/* Ruang jawapan (RTL) */}
      <div className="jawi flex min-h-[5rem] w-full max-w-md items-center justify-center rounded-3xl border-4 border-dashed border-[color:var(--color-duo-swan)] bg-[color:var(--color-duo-snow)] px-4 text-6xl font-bold text-slate-800 sm:text-7xl">
        {assembled || <span className="text-3xl text-slate-300">…</span>}
      </div>

      {/* Kepingan untuk dipilih */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {shuffled.map(({ str, id }) => {
          const used = picks.includes(id)
          return (
            <button
              key={id}
              onClick={() => pick(id)}
              disabled={used || status !== 'answering'}
              className={`jawi px-5 py-4 text-5xl font-bold sm:text-6xl ${
                used ? 'rounded-2xl bg-slate-100 text-slate-300' : 'duo-btn duo-green'
              }`}
            >
              {str}
            </button>
          )
        })}
      </div>

      {picks.length > 0 && status === 'answering' && (
        <button onClick={undo} className="duo-btn duo-white px-5 py-2 text-base">
          ↩️ Padam satu
        </button>
      )}
    </>
  )
}
