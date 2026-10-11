import { speak } from '../lib/audio'

/** Butang pembesar suara — baca teks soalan dengan kuat (Text-to-Speech). */
export function SpeakerButton({
  text,
  parts,
  className = '',
}: {
  text: string
  /** Serpihan untuk gubahan klip (cth banding nombor) — lihat speak(). */
  parts?: string[]
  className?: string
}) {
  return (
    <button
      onClick={() => speak(text, parts)}
      aria-label="Dengar soalan"
      className={`duo-btn duo-white h-14 w-14 shrink-0 !rounded-full text-2xl ${className}`}
    >
      🔊
    </button>
  )
}
