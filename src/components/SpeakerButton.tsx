import { speak } from '../lib/audio'

/** Butang pembesar suara — baca teks soalan dengan kuat (Text-to-Speech). */
export function SpeakerButton({ text, className = '' }: { text: string; className?: string }) {
  return (
    <button
      onClick={() => speak(text)}
      aria-label="Dengar soalan"
      className={`duo-btn duo-white h-14 w-14 shrink-0 !rounded-full text-2xl ${className}`}
    >
      🔊
    </button>
  )
}
