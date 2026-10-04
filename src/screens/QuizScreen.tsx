import { useCallback, useEffect, useRef, useState } from 'react'
import type { Question, TopicId } from '../types'
import { generateQuestion, generateRandomQuestion } from '../lib/questionGenerator'
import { getTopic } from '../data/topics'
import { playCorrect, playWrong, playTap, speak, stopSpeaking } from '../lib/audio'
import { QuestionVisualView } from '../components/Visuals'
import { SpeakerButton } from '../components/SpeakerButton'
import { Confetti } from '../components/Confetti'
import { BackButton } from './ProfileScreen'
import type { QuizMode } from './TopicScreen'

const TOPIC_QUESTIONS = 8
const CHALLENGE_SECONDS = 60

export interface QuizResult {
  mode: QuizMode
  total: number
  correct: number
  correctByTopic: Partial<Record<TopicId, number>>
}

type Status = 'answering' | 'correct' | 'wrong'

function nextQuestion(mode: QuizMode): Question {
  return mode.kind === 'challenge' ? generateRandomQuestion() : generateQuestion(mode.topicId)
}

/** Cap unik untuk satu soalan — prompt + jawapan membezakan setiap soalan. */
function questionSignature(q: Question): string {
  return `${q.prompt}|${q.answer}`
}

export function QuizScreen({ mode, onFinish, onQuit }: { mode: QuizMode; onFinish: (r: QuizResult) => void; onQuit: () => void }) {
  // Jejak soalan yang telah muncul supaya tidak berulang dalam satu sesi.
  const seenRef = useRef<Set<string>>(new Set())
  const nextUnique = useCallback((m: QuizMode): Question => {
    let q = nextQuestion(m)
    // Cuba beberapa kali untuk dapatkan soalan baru; berhenti jika kolam kecil sudah habis.
    for (let i = 0; i < 40 && seenRef.current.has(questionSignature(q)); i++) {
      q = nextQuestion(m)
    }
    seenRef.current.add(questionSignature(q))
    return q
  }, [])

  const [question, setQuestion] = useState<Question>(() => nextUnique(mode))
  const [selected, setSelected] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('answering')
  const [answered, setAnswered] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_SECONDS)

  const correctByTopic = useRef<Partial<Record<TopicId, number>>>({})
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Kiraan sebenar dalam ref supaya finish() sentiasa baca nilai terkini
  // (elak stale closure apabila soalan terakhir dijawab betul melalui pemasa).
  const answeredRef = useRef(0)
  const correctRef = useRef(0)

  const topic = mode.kind === 'topic' ? getTopic(mode.topicId) : undefined
  const isChallenge = mode.kind === 'challenge'

  const finish = useCallback(() => {
    stopSpeaking()
    onFinish({ mode, total: answeredRef.current, correct: correctRef.current, correctByTopic: correctByTopic.current })
  }, [mode, onFinish])

  // Baca soalan secara automatik untuk murid yang belum lancar membaca.
  useEffect(() => {
    const t = setTimeout(() => speak(question.speak), 350)
    return () => clearTimeout(t)
  }, [question])

  // Pemasa untuk Mod Cabaran Masa.
  useEffect(() => {
    if (!isChallenge) return
    if (timeLeft <= 0) {
      finish()
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [isChallenge, timeLeft, finish])

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
  }, [])

  function goNext(answeredCount: number) {
    if (!isChallenge && answeredCount >= TOPIC_QUESTIONS) {
      finish()
      return
    }
    setSelected(null)
    setStatus('answering')
    setQuestion(nextUnique(mode))
  }

  function handleAnswer(choice: string) {
    if (status !== 'answering') return
    stopSpeaking()
    setSelected(choice)
    const isRight = choice === question.answer
    answeredRef.current += 1
    const newAnswered = answeredRef.current
    setAnswered(newAnswered)

    if (isRight) {
      playCorrect()
      setStatus('correct')
      correctRef.current += 1
      setStreak((s) => s + 1)
      correctByTopic.current[question.topicId] = (correctByTopic.current[question.topicId] ?? 0) + 1
      setShowConfetti(true)
      advanceTimer.current = setTimeout(() => {
        setShowConfetti(false)
        goNext(newAnswered)
      }, 1300)
    } else {
      playWrong()
      setStatus('wrong')
      setStreak(0)
    }
  }

  const progressPct = isChallenge
    ? (timeLeft / CHALLENGE_SECONDS) * 100
    : (answered / TOPIC_QUESTIONS) * 100

  return (
    <div className="relative flex min-h-full flex-col gap-4 bg-gradient-to-b from-amber-100 to-sky-100 p-5">
      {showConfetti && <Confetti />}

      {/* Bar atas */}
      <div className="flex items-center gap-3">
        <BackButton onClick={onQuit} />
        <div className="flex-1">
          <div className="h-5 overflow-hidden rounded-full bg-white/70 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isChallenge ? 'bg-red-400' : 'bg-emerald-400'}`}
              style={{ width: `${Math.max(0, progressPct)}%` }}
            />
          </div>
        </div>
        {isChallenge ? (
          <div className={`rounded-full px-4 py-2 text-lg font-extrabold text-white shadow ${timeLeft <= 10 ? 'animate-wiggle bg-red-500' : 'bg-red-400'}`}>
            ⏱️ {timeLeft}s
          </div>
        ) : (
          <div className="rounded-full bg-emerald-400 px-4 py-2 text-lg font-extrabold text-white shadow">
            {answered}/{TOPIC_QUESTIONS}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-center">
        <span className="text-xl font-extrabold text-slate-600">
          {topic ? `${topic.emoji} ${topic.title}` : '⏱️ Cabaran Masa'}
        </span>
        {streak >= 2 && <span className="animate-pop-in rounded-full bg-orange-400 px-3 py-1 text-sm font-extrabold text-white">🔥 {streak} berturut!</span>}
      </div>

      {/* Kad soalan */}
      <div key={answered} className="animate-pop-in flex flex-1 flex-col items-center justify-center gap-5 rounded-[2rem] bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <h3 className="text-center text-2xl font-extrabold text-slate-800 sm:text-3xl">{question.prompt}</h3>
          <SpeakerButton text={question.speak} />
        </div>

        <div className="flex min-h-[8rem] items-center justify-center">
          <QuestionVisualView visual={question.visual} />
        </div>

        {/* Pilihan jawapan */}
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          {question.choices.map((choice) => {
            const isAnswer = choice === question.answer
            const isPicked = choice === selected
            let cls = 'bg-gradient-to-b from-sky-400 to-blue-500 text-white'
            if (status !== 'answering') {
              if (isAnswer) cls = 'bg-gradient-to-b from-emerald-400 to-green-500 text-white ring-4 ring-green-300'
              else if (isPicked) cls = 'bg-gradient-to-b from-red-400 to-red-500 text-white animate-shake'
              else cls = 'bg-slate-200 text-slate-400'
            }
            return (
              <button
                key={choice}
                onClick={() => {
                  playTap()
                  handleAnswer(choice)
                }}
                disabled={status !== 'answering'}
                className={`rounded-3xl px-4 py-5 text-2xl font-extrabold shadow-md transition active:scale-95 sm:text-3xl ${cls}`}
              >
                {choice}
              </button>
            )
          })}
        </div>
      </div>

      {/* Maklum balas */}
      {status === 'correct' && (
        <div className="animate-pop-in rounded-3xl bg-green-500 p-4 text-center text-2xl font-extrabold text-white shadow-lg">
          🎉 Betul! Syabas! 🌟
        </div>
      )}
      {status === 'wrong' && (
        <div className="animate-pop-in flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg ring-4 ring-red-200">
          <div className="text-center text-xl font-extrabold text-red-500">Cuba lagi lain kali! 💪</div>
          <div className="flex items-start gap-2 rounded-2xl bg-amber-50 p-3">
            <span className="text-2xl">💡</span>
            <p className="text-lg font-semibold text-slate-700">
              Jawapan betul: <span className="font-extrabold text-emerald-600">{question.answer}</span>
              <br />
              {question.solution}
            </p>
          </div>
          <button
            onClick={() => {
              playTap()
              goNext(answered)
            }}
            className="rounded-full bg-gradient-to-b from-sky-400 to-blue-500 py-4 text-xl font-extrabold text-white shadow-md transition active:scale-95"
          >
            Teruskan ➡️
          </button>
        </div>
      )}
    </div>
  )
}
