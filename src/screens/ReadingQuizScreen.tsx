import { useCallback, useEffect, useRef, useState } from 'react'
import { generateReadingQuiz, type ReadingQuestion } from '../lib/readingGenerator'
import { getReadingLevel } from '../data/reading'
import { playCorrect, playWrong, playTap, speak, stopSpeaking } from '../lib/audio'
import { syllableColor } from '../components/SyllableWord'
import { SpeakerButton } from '../components/SpeakerButton'
import { Confetti } from '../components/Confetti'
import { BackButton } from './ProfileScreen'

const QUESTION_COUNT = 6

export interface ReadingResult {
  level: number
  total: number
  correct: number
}

type Status = 'answering' | 'correct' | 'wrong'

export function ReadingQuizScreen({
  level,
  onFinish,
  onQuit,
}: {
  level: number
  onFinish: (r: ReadingResult) => void
  onQuit: () => void
}) {
  const data = getReadingLevel(level)
  const [questions] = useState<ReadingQuestion[]>(() => generateReadingQuiz(level, QUESTION_COUNT))
  const [qi, setQi] = useState(0)
  // Kiraan sebenar disimpan dalam ref supaya finish() sentiasa baca nilai terkini
  // (elak stale closure apabila soalan terakhir dijawab betul melalui pemasa).
  const correctRef = useRef(0)
  const [status, setStatus] = useState<Status>('answering')
  const [selected, setSelected] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // Keadaan khas untuk aktiviti "susun suku kata".
  const [slots, setSlots] = useState<(number | null)[]>([])
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const q = questions[qi]

  const finish = useCallback(() => {
    stopSpeaking()
    onFinish({ level, total: QUESTION_COUNT, correct: correctRef.current })
  }, [level, onFinish])

  // Set semula keadaan setiap soalan baharu; sediakan slot untuk aktiviti susun.
  useEffect(() => {
    setStatus('answering')
    setSelected(null)
    if (q?.kind === 'susun') setSlots(Array(q.word.syllables.length).fill(null))
  }, [qi, q])

  // Baca secara automatik untuk aktiviti yang memerlukan pendengaran.
  useEffect(() => {
    if (!q) return
    if (q.kind === 'dengar') {
      const t = setTimeout(() => speak(q.syllable), 350)
      return () => clearTimeout(t)
    }
    if (q.kind === 'kefahaman') {
      const text = `${q.passage.sentences.join(' ')} ${q.passage.questions[q.qIndex].q}`
      const t = setTimeout(() => speak(text), 350)
      return () => clearTimeout(t)
    }
  }, [qi, q])

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
  }, [])

  if (!q || !data) return null

  function goNext() {
    if (qi + 1 >= QUESTION_COUNT) {
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

  // ---- Aktiviti pilihan jawapan (pilih / hilang / dengar / kefahaman) ----
  function answerChoice(choice: string, answer: string) {
    if (status !== 'answering') return
    stopSpeaking()
    setSelected(choice)
    if (choice === answer) markCorrect()
    else markWrong()
  }

  // ---- Aktiviti susun suku kata ----
  function placeCard(trayIdx: number) {
    if (status !== 'answering') return
    if (slots.includes(trayIdx)) return
    playTap()
    const emptyAt = slots.indexOf(null)
    if (emptyAt === -1) return
    const next = [...slots]
    next[emptyAt] = trayIdx
    setSlots(next)
  }

  function removeSlot(slotIdx: number) {
    if (status !== 'answering') return
    if (slots[slotIdx] === null) return
    playTap()
    const next = [...slots]
    next[slotIdx] = null
    setSlots(next)
  }

  function checkSusun() {
    if (q.kind !== 'susun') return
    const arranged = slots.map((ti) => (ti === null ? '' : q.shuffled[ti]))
    if (arranged.join('|') === q.word.syllables.join('|')) markCorrect()
    else markWrong()
  }

  const progressPct = (qi / QUESTION_COUNT) * 100

  return (
    <div className="relative flex min-h-full flex-col gap-4 bg-[color:var(--color-duo-snow)] p-5">
      {showConfetti && <Confetti />}

      {/* Bar atas */}
      <div className="flex items-center gap-3">
        <BackButton onClick={onQuit} />
        <div className="flex-1">
          <div className="duo-track h-5">
            <div className="duo-fill" style={{ width: `${progressPct}%`, background: 'var(--color-duo-purple)' }} />
          </div>
        </div>
        <div className="duo-chip text-lg text-[color:var(--color-duo-purple-dark)]">
          {qi + 1}/{QUESTION_COUNT}
        </div>
      </div>

      <div className="text-center text-lg font-extrabold text-slate-600">
        📖 {data.title}
      </div>

      {/* Kad soalan */}
      <div key={qi} className="duo-card animate-pop-in flex flex-1 flex-col items-center justify-center gap-5 p-6">
        {q.kind === 'susun' && <SusunCard q={q} slots={slots} onPlace={placeCard} onRemove={removeSlot} locked={status !== 'answering'} />}
        {q.kind === 'pilih' && <PilihCard q={q} selected={selected} status={status} onPick={(c) => answerChoice(c, q.word.word)} />}
        {q.kind === 'hilang' && <HilangCard q={q} selected={selected} status={status} onPick={(c) => answerChoice(c, q.word.syllables[q.missingIndex])} />}
        {q.kind === 'dengar' && <DengarCard q={q} selected={selected} status={status} onPick={(c) => answerChoice(c, q.syllable)} />}
        {q.kind === 'kefahaman' && (
          <KefahamanCard q={q} selected={selected} status={status} onPick={(c) => answerChoice(c, q.passage.questions[q.qIndex].answer)} />
        )}
      </div>

      {/* Butang Semak untuk aktiviti susun */}
      {q.kind === 'susun' && status === 'answering' && (
        <button onClick={checkSusun} disabled={slots.includes(null)} className="duo-btn duo-green py-4 text-xl">
          Semak ✅
        </button>
      )}

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
            <p className="text-lg font-semibold text-slate-700">{solutionText(q)}</p>
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

function solutionText(q: ReadingQuestion): string {
  switch (q.kind) {
    case 'susun':
    case 'pilih':
      return `Perkataan yang betul ialah "${q.word.word}".`
    case 'hilang':
      return `Suku kata yang betul ialah "${q.word.syllables[q.missingIndex]}" — perkataan penuh "${q.word.word}".`
    case 'dengar':
      return `Bunyi tadi ialah "${q.syllable}".`
    case 'kefahaman':
      return `Jawapan yang betul ialah "${q.passage.questions[q.qIndex].answer}".`
  }
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
  big = false,
}: {
  choices: string[]
  answer: string
  selected: string | null
  status: Status
  onPick: (c: string) => void
  big?: boolean
}) {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3">
      {choices.map((choice) => {
        const isAnswer = choice === answer
        const isPicked = choice === selected
        let cls = 'duo-btn duo-purple'
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
            className={`px-4 py-5 font-extrabold ${big ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'} ${cls}`}
          >
            {choice}
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
function SusunCard({
  q,
  slots,
  onPlace,
  onRemove,
  locked,
}: {
  q: Extract<ReadingQuestion, { kind: 'susun' }>
  slots: (number | null)[]
  onPlace: (i: number) => void
  onRemove: (i: number) => void
  locked: boolean
}) {
  return (
    <>
      <h3 className="text-center text-xl font-extrabold text-slate-800">Susun suku kata menjadi perkataan yang betul:</h3>
      <div className="flex items-center gap-3">
        <div className="text-7xl">{q.word.image}</div>
        <SpeakerButton text={q.word.word} />
      </div>

      {/* Slot jawapan */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {slots.map((trayIdx, i) => (
          <button
            key={i}
            onClick={() => onRemove(i)}
            disabled={locked}
            className={`flex h-16 w-20 items-center justify-center rounded-2xl border-4 border-dashed text-3xl font-extrabold shadow-inner transition active:scale-95 ${
              trayIdx === null ? 'border-slate-300 bg-slate-50' : 'border-fuchsia-300 bg-fuchsia-50'
            } ${trayIdx === null ? 'text-slate-300' : syllableColor(i)}`}
          >
            {trayIdx === null ? '_' : q.shuffled[trayIdx]}
          </button>
        ))}
      </div>

      {/* Kad suku kata (dulang) */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {q.shuffled.map((syl, idx) => {
          const used = slots.includes(idx)
          return (
            <button
              key={idx}
              onClick={() => onPlace(idx)}
              disabled={used || locked}
              className={`px-5 py-4 text-3xl font-extrabold ${
                used ? 'rounded-2xl bg-slate-100 text-slate-300' : 'duo-btn duo-blue'
              }`}
            >
              {syl}
            </button>
          )
        })}
      </div>
    </>
  )
}

function PilihCard({
  q,
  selected,
  status,
  onPick,
}: {
  q: Extract<ReadingQuestion, { kind: 'pilih' }>
  selected: string | null
  status: Status
  onPick: (c: string) => void
}) {
  return (
    <>
      <h3 className="text-center text-xl font-extrabold text-slate-800">Pilih perkataan yang betul:</h3>
      <div className="text-8xl">{q.word.image}</div>
      <ChoiceGrid choices={q.choices} answer={q.word.word} selected={selected} status={status} onPick={onPick} />
    </>
  )
}

function HilangCard({
  q,
  selected,
  status,
  onPick,
}: {
  q: Extract<ReadingQuestion, { kind: 'hilang' }>
  selected: string | null
  status: Status
  onPick: (c: string) => void
}) {
  return (
    <>
      <h3 className="text-center text-xl font-extrabold text-slate-800">Cari suku kata yang hilang:</h3>
      <div className="text-7xl">{q.word.image}</div>
      <div className="flex items-center gap-1 text-5xl sm:text-6xl">
        {q.word.syllables.map((syl, i) =>
          i === q.missingIndex ? (
            <span key={i} className="mx-1 flex h-14 w-16 items-center justify-center rounded-2xl bg-yellow-200 text-3xl text-yellow-600 shadow-inner">
              ❓
            </span>
          ) : (
            <span key={i} className={`font-extrabold ${syllableColor(i)}`}>
              {syl}
            </span>
          ),
        )}
      </div>
      <ChoiceGrid choices={q.choices} answer={q.word.syllables[q.missingIndex]} selected={selected} status={status} onPick={onPick} big />
    </>
  )
}

function DengarCard({
  q,
  selected,
  status,
  onPick,
}: {
  q: Extract<ReadingQuestion, { kind: 'dengar' }>
  selected: string | null
  status: Status
  onPick: (c: string) => void
}) {
  return (
    <>
      <h3 className="text-center text-xl font-extrabold text-slate-800">Dengar, kemudian pilih suku kata yang betul 👂</h3>
      <button
        onClick={() => speak(q.syllable)}
        className="duo-btn duo-red h-24 w-24 !rounded-full text-5xl"
        aria-label="Dengar semula"
      >
        🔊
      </button>
      <ChoiceGrid choices={q.choices} answer={q.syllable} selected={selected} status={status} onPick={onPick} big />
    </>
  )
}

function KefahamanCard({
  q,
  selected,
  status,
  onPick,
}: {
  q: Extract<ReadingQuestion, { kind: 'kefahaman' }>
  selected: string | null
  status: Status
  onPick: (c: string) => void
}) {
  const question = q.passage.questions[q.qIndex]
  const full = `${q.passage.sentences.join(' ')} ${question.q}`
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="text-6xl">{q.passage.image}</div>
        <SpeakerButton text={full} />
      </div>
      <div className="space-y-1 rounded-2xl bg-violet-50 p-4 text-center">
        {q.passage.sentences.map((s, i) => (
          <p key={i} className="text-lg font-bold text-slate-700 sm:text-xl">
            {s}
          </p>
        ))}
      </div>
      <h3 className="text-center text-xl font-extrabold text-slate-800">{question.q}</h3>
      <ChoiceGrid choices={question.choices} answer={question.answer} selected={selected} status={status} onPick={onPick} />
    </>
  )
}
