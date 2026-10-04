const COLORS = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#c084fc', '#f472b6']
const PIECES = Array.from({ length: 60 }, (_, i) => i)

/** Hujan confetti ringkas berasaskan CSS. Letak dalam bekas `fixed inset-0`. */
export function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {PIECES.map((i) => {
        const left = (i * 97) % 100
        const delay = (i % 10) * 0.12
        const duration = 1.8 + ((i * 7) % 12) / 10
        const color = COLORS[i % COLORS.length]
        const size = 8 + (i % 4) * 3
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: '-10vh',
              width: size,
              height: size * 1.4,
              background: color,
              borderRadius: i % 2 ? '50%' : '2px',
              animation: `confetti-fall ${duration}s linear ${delay}s forwards`,
            }}
          />
        )
      })}
    </div>
  )
}
