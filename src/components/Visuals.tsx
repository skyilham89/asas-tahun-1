import type { QuestionVisual, ShapeKind } from '../types'

/** Lukis muka jam analog dengan SVG. */
function ClockFace({ hour, minute }: { hour: number; minute: number }) {
  const size = 200
  const c = size / 2
  const r = c - 10

  // Sudut: 12 di atas, 0 darjah = atas, mengikut arah jam.
  const minuteAngle = (minute / 60) * 360
  const hourAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30

  const hand = (angleDeg: number, length: number) => {
    const a = ((angleDeg - 90) * Math.PI) / 180
    return { x: c + length * Math.cos(a), y: c + length * Math.sin(a) }
  }
  const mh = hand(minuteAngle, r * 0.78)
  const hh = hand(hourAngle, r * 0.5)

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-44 w-44 drop-shadow-md sm:h-52 sm:w-52" aria-hidden>
      <circle cx={c} cy={c} r={r} fill="#fffdf5" stroke="#8b5cf6" strokeWidth="8" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180
        const x = c + (r - 20) * Math.cos(a)
        const y = c + (r - 20) * Math.sin(a)
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="18"
            fontWeight="700"
            fill="#6d28d9"
          >
            {i === 0 ? 12 : i}
          </text>
        )
      })}
      {/* jarum jam */}
      <line x1={c} y1={c} x2={hh.x} y2={hh.y} stroke="#4c1d95" strokeWidth="8" strokeLinecap="round" />
      {/* jarum minit */}
      <line x1={c} y1={c} x2={mh.x} y2={mh.y} stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
      <circle cx={c} cy={c} r="8" fill="#4c1d95" />
    </svg>
  )
}

/** Lukis bentuk 2D/3D dengan SVG. */
function ShapeDrawing({ shape }: { shape: ShapeKind }) {
  const stroke = '#be185d'
  const fill = '#fda4af'
  const common = { stroke, strokeWidth: 4, strokeLinejoin: 'round' as const }

  const content = () => {
    switch (shape) {
      case 'bulatan':
        return <circle cx="100" cy="100" r="70" fill={fill} {...common} />
      case 'segi-tiga':
        return <polygon points="100,25 175,170 25,170" fill={fill} {...common} />
      case 'segi-empat':
        return <rect x="35" y="35" width="130" height="130" rx="6" fill={fill} {...common} />
      case 'segi-empat-tepat':
        return <rect x="20" y="55" width="160" height="90" rx="6" fill={fill} {...common} />
      case 'bujur':
        return <ellipse cx="100" cy="100" rx="82" ry="52" fill={fill} {...common} />
      case 'segi-lima':
        return <polygon points="100,25 171,77 144,161 56,161 29,77" fill={fill} {...common} />
      case 'segi-enam':
        return <polygon points="100,25 165,62 165,138 100,175 35,138 35,62" fill={fill} {...common} />
      case 'bintang':
        return (
          <polygon
            points="100,20 119,74 176,75 130,110 147,165 100,132 53,165 70,110 24,75 81,74"
            fill={fill}
            {...common}
          />
        )
      case 'kubus':
        return (
          <g>
            <rect x="45" y="70" width="90" height="90" fill={fill} {...common} />
            <polygon points="45,70 75,40 165,40 135,70" fill="#fecdd3" {...common} />
            <polygon points="135,70 165,40 165,130 135,160" fill="#fb7185" {...common} />
          </g>
        )
      case 'kuboid':
        return (
          <g>
            <rect x="35" y="75" width="110" height="80" fill={fill} {...common} />
            <polygon points="35,75 60,45 170,45 145,75" fill="#fecdd3" {...common} />
            <polygon points="145,75 170,45 170,125 145,155" fill="#fb7185" {...common} />
          </g>
        )
      case 'sfera':
        return (
          <g>
            <circle cx="100" cy="100" r="70" fill={fill} {...common} />
            <ellipse cx="100" cy="100" rx="70" ry="24" fill="none" stroke={stroke} strokeWidth="3" strokeDasharray="6 6" />
            <circle cx="78" cy="78" r="14" fill="#ffe4e6" />
          </g>
        )
      case 'kon':
        return (
          <g>
            <polygon points="100,30 160,150 40,150" fill={fill} {...common} />
            <ellipse cx="100" cy="150" rx="60" ry="18" fill="#fb7185" {...common} />
          </g>
        )
      case 'silinder':
        return (
          <g>
            <rect x="45" y="55" width="110" height="90" fill={fill} stroke={stroke} strokeWidth="4" />
            <ellipse cx="100" cy="145" rx="55" ry="18" fill="#fb7185" {...common} />
            <ellipse cx="100" cy="55" rx="55" ry="18" fill="#fecdd3" {...common} />
          </g>
        )
      case 'piramid':
        return (
          <g>
            {/* tapak (perspektif) */}
            <polygon points="40,160 160,160 185,130 65,130" fill="#fb7185" {...common} />
            {/* muka hadapan */}
            <polygon points="100,35 40,160 160,160" fill={fill} {...common} />
            {/* muka kanan */}
            <polygon points="100,35 160,160 185,130" fill="#fda4af" {...common} />
          </g>
        )
      case 'prisma':
        return (
          <g>
            {/* muka kanan (segi empat) */}
            <polygon points="130,160 85,70 113,46 158,136" fill="#fb7185" {...common} />
            {/* muka hadapan (segi tiga) */}
            <polygon points="40,160 130,160 85,70" fill={fill} {...common} />
          </g>
        )
    }
  }

  return (
    <svg viewBox="0 0 200 200" className="h-40 w-40 drop-shadow-md sm:h-48 sm:w-48" aria-hidden>
      {content()}
    </svg>
  )
}

function ItemGroups({ emoji, groups, op }: { emoji: string; groups: number[]; op: '+' | '-' }) {
  if (op === '-') {
    const [total, remove] = groups
    return (
      <div className="flex flex-wrap items-center justify-center gap-1 text-4xl sm:text-5xl">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i >= total - remove ? 'opacity-30 grayscale' : ''}>
            {i >= total - remove ? '✖️' : emoji}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-4xl sm:text-5xl">
      <span className="flex flex-wrap justify-center gap-1 rounded-2xl bg-white/60 p-2">
        {Array.from({ length: groups[0] }, (_, i) => (
          <span key={i}>{emoji}</span>
        ))}
      </span>
      <span className="text-3xl font-black text-slate-500">➕</span>
      <span className="flex flex-wrap justify-center gap-1 rounded-2xl bg-white/60 p-2">
        {Array.from({ length: groups[1] }, (_, i) => (
          <span key={i}>{emoji}</span>
        ))}
      </span>
    </div>
  )
}

function Coin({ sen, label }: { sen: number; label: string }) {
  const color = sen >= 50 ? '#fbbf24' : sen >= 20 ? '#f59e0b' : '#d4d4d8'
  const ring = sen >= 50 ? '#b45309' : sen >= 20 ? '#92400e' : '#71717a'
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 sm:h-20 sm:w-20" aria-label={label}>
      <circle cx="40" cy="40" r="36" fill={color} stroke={ring} strokeWidth="4" />
      <circle cx="40" cy="40" r="28" fill="none" stroke={ring} strokeWidth="2" opacity="0.6" />
      <text x="40" y="36" textAnchor="middle" fontSize="20" fontWeight="800" fill={ring}>
        {sen}
      </text>
      <text x="40" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill={ring}>
        sen
      </text>
    </svg>
  )
}

function MoneyRow({ coins }: { coins: { sen: number; label: string }[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {coins.map((c, i) => (
        <Coin key={i} sen={c.sen} label={c.label} />
      ))}
    </div>
  )
}

function Sequence({ numbers }: { numbers: (number | null)[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {numbers.map((n, i) => (
        <div
          key={i}
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-black shadow sm:h-20 sm:w-20 sm:text-4xl ${
            n === null ? 'animate-bounce-soft bg-yellow-200 text-yellow-700' : 'bg-white text-sky-600'
          }`}
        >
          {n === null ? '❓' : n}
        </div>
      ))}
    </div>
  )
}

export function QuestionVisualView({ visual }: { visual: QuestionVisual }) {
  switch (visual.kind) {
    case 'none':
      return null
    case 'items':
      return <ItemGroups emoji={visual.emoji} groups={visual.groups} op={visual.op} />
    case 'clock':
      return <ClockFace hour={visual.hour} minute={visual.minute} />
    case 'shape':
      return <ShapeDrawing shape={visual.shape} />
    case 'money':
      return <MoneyRow coins={visual.coins} />
    case 'sequence':
      return <Sequence numbers={visual.numbers} />
  }
}
