import { speak } from '../lib/audio'

/** Butang pembesar suara — baca teks soalan dengan kuat (Text-to-Speech). */
export function SpeakerButton({ text, className = '' }: { text: string; className?: string }) {
  return (
    <button
      onClick={() => speak(text)}
      aria-label="Dengar soalan"
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-2xl shadow-md transition active:scale-90 ${className}`}
    >
      🔊
    </button>
  )
}
