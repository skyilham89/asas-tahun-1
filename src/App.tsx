import { useEffect, useMemo, useState } from 'react'
import type { Badge, Profile } from './types'
import { TOPICS } from './data/topics'
import { READING_BADGE } from './data/reading'
import { getActiveName, loadProfiles, saveProfiles, setActiveName } from './lib/storage'
import { HomeScreen } from './screens/HomeScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { CategoryScreen } from './screens/CategoryScreen'
import { TopicScreen, type QuizMode } from './screens/TopicScreen'
import { QuizScreen, type QuizResult } from './screens/QuizScreen'
import { ReadingLevelScreen, type ReadingMode } from './screens/ReadingLevelScreen'
import { ReadingLearnScreen } from './screens/ReadingLearnScreen'
import { ReadingQuizScreen, type ReadingResult } from './screens/ReadingQuizScreen'
import { ResultScreen } from './screens/ResultScreen'

type Screen =
  | { name: 'home' }
  | { name: 'profiles' }
  | { name: 'category' }
  | { name: 'topics' }
  | { name: 'quiz'; mode: QuizMode }
  | { name: 'result'; data: FinishData }
  | { name: 'reading-levels' }
  | { name: 'reading-learn'; level: number }
  | { name: 'reading-quiz'; level: number }
  | { name: 'reading-result'; data: ReadingFinishData }

interface FinishData {
  total: number
  correct: number
  starsEarned: number
  newBadges: Badge[]
  mode: QuizMode
}

interface ReadingFinishData {
  level: number
  total: number
  correct: number
  starsEarned: number
  newBadges: Badge[]
}

export default function App() {
  const [profiles, setProfiles] = useState<Profile[]>(() => loadProfiles())
  const [activeName, setActive] = useState<string | null>(() => getActiveName())
  const [screen, setScreen] = useState<Screen>({ name: 'home' })

  // Kekalkan profil di Local Storage setiap kali berubah.
  useEffect(() => {
    saveProfiles(profiles)
  }, [profiles])

  useEffect(() => {
    setActiveName(activeName)
  }, [activeName])

  const activeProfile = useMemo(
    () => profiles.find((p) => p.name === activeName) ?? null,
    [profiles, activeName],
  )

  function updateActive(mutate: (p: Profile) => Profile) {
    setProfiles((prev) => prev.map((p) => (p.name === activeName ? mutate(p) : p)))
  }

  // ---- Tamat kuiz Matematik ----
  function handleFinish(result: QuizResult) {
    if (!activeProfile) return
    const starsEarned = result.correct

    const newProgress = { ...activeProfile.progress }
    for (const [topicId, count] of Object.entries(result.correctByTopic)) {
      newProgress[topicId] = (newProgress[topicId] ?? 0) + (count ?? 0)
    }

    const newBadges: Badge[] = []
    for (const topic of TOPICS) {
      const reached = (newProgress[topic.id] ?? 0) >= topic.badge.requiredCorrect
      const alreadyHas = activeProfile.badges.includes(topic.badge.id)
      if (reached && !alreadyHas) newBadges.push(topic.badge)
    }

    updateActive((p) => ({
      ...p,
      stars: p.stars + starsEarned,
      progress: newProgress,
      badges: [...p.badges, ...newBadges.map((b) => b.id)],
    }))

    setScreen({
      name: 'result',
      data: { total: result.total, correct: result.correct, starsEarned, newBadges, mode: result.mode },
    })
  }

  // ---- Tamat kuiz Membaca ----
  function handleReadingFinish(result: ReadingResult) {
    if (!activeProfile) return
    const starsEarned = result.correct

    const newProgress = { ...activeProfile.progress }
    newProgress['membaca'] = (newProgress['membaca'] ?? 0) + result.correct

    const newBadges: Badge[] = []
    const reached = newProgress['membaca'] >= READING_BADGE.requiredCorrect
    if (reached && !activeProfile.badges.includes(READING_BADGE.id)) newBadges.push(READING_BADGE)

    updateActive((p) => ({
      ...p,
      stars: p.stars + starsEarned,
      progress: newProgress,
      badges: [...p.badges, ...newBadges.map((b) => b.id)],
    }))

    setScreen({
      name: 'reading-result',
      data: { level: result.level, total: result.total, correct: result.correct, starsEarned, newBadges },
    })
  }

  // ---- Rendering mengikut skrin ----
  switch (screen.name) {
    case 'home':
      return <HomeScreen onStart={() => setScreen({ name: 'profiles' })} />

    case 'profiles':
      return (
        <ProfileScreen
          profiles={profiles}
          onPick={(name) => {
            setActive(name)
            setScreen({ name: 'category' })
          }}
          onCreate={(p) => {
            setProfiles((prev) => [...prev.filter((x) => x.name !== p.name), p])
            setActive(p.name)
            setScreen({ name: 'category' })
          }}
          onDelete={(name) => {
            setProfiles((prev) => prev.filter((x) => x.name !== name))
            if (activeName === name) setActive(null)
          }}
          onBack={() => setScreen({ name: 'home' })}
        />
      )

    case 'category':
      if (!activeProfile) {
        setScreen({ name: 'profiles' })
        return null
      }
      return (
        <CategoryScreen
          profile={activeProfile}
          onPick={(c) => setScreen(c === 'matematik' ? { name: 'topics' } : { name: 'reading-levels' })}
          onBack={() => setScreen({ name: 'profiles' })}
        />
      )

    case 'topics':
      if (!activeProfile) {
        setScreen({ name: 'profiles' })
        return null
      }
      return (
        <TopicScreen
          profile={activeProfile}
          onStart={(mode) => setScreen({ name: 'quiz', mode })}
          onBack={() => setScreen({ name: 'category' })}
        />
      )

    case 'quiz':
      return (
        <QuizScreen
          mode={screen.mode}
          onFinish={handleFinish}
          onQuit={() => setScreen({ name: 'topics' })}
        />
      )

    case 'result': {
      const lastMode = screen.data.mode
      return (
        <ResultScreen
          total={screen.data.total}
          correct={screen.data.correct}
          starsEarned={screen.data.starsEarned}
          newBadges={screen.data.newBadges}
          onReplay={() => setScreen({ name: 'quiz', mode: lastMode })}
          onPickTopic={() => setScreen({ name: 'topics' })}
        />
      )
    }

    case 'reading-levels':
      if (!activeProfile) {
        setScreen({ name: 'profiles' })
        return null
      }
      return (
        <ReadingLevelScreen
          profile={activeProfile}
          onStart={(level, mode: ReadingMode) =>
            setScreen(mode === 'belajar' ? { name: 'reading-learn', level } : { name: 'reading-quiz', level })
          }
          onBack={() => setScreen({ name: 'category' })}
        />
      )

    case 'reading-learn':
      return <ReadingLearnScreen level={screen.level} onBack={() => setScreen({ name: 'reading-levels' })} />

    case 'reading-quiz':
      return (
        <ReadingQuizScreen
          level={screen.level}
          onFinish={handleReadingFinish}
          onQuit={() => setScreen({ name: 'reading-levels' })}
        />
      )

    case 'reading-result': {
      const lvl = screen.data.level
      return (
        <ResultScreen
          total={screen.data.total}
          correct={screen.data.correct}
          starsEarned={screen.data.starsEarned}
          newBadges={screen.data.newBadges}
          onReplay={() => setScreen({ name: 'reading-quiz', level: lvl })}
          onPickTopic={() => setScreen({ name: 'reading-levels' })}
          pickLabel="📖 Pilih Peringkat Lain"
        />
      )
    }
  }
}
