import { BarChart4 } from 'lucide-react'

interface InsightsMockupProps {
  compact?: boolean
}

const linePoints = [8, 22, 16, 34, 28, 44, 40, 58]
const barValues = [30, 52, 38, 64, 46]

function buildLinePath(values: number[], width: number, height: number) {
  const max = Math.max(...values)
  const stepX = width / (values.length - 1)
  return values
    .map((value, index) => {
      const x = index * stepX
      const y = height - (value / max) * height
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export function InsightsMockup({ compact = false }: InsightsMockupProps) {
  const width = 220
  const height = 56
  const path = buildLinePath(linePoints, width, height)

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4" role="img" aria-label="HexaInsights analytics dashboard showing a trend line, a bar comparison, and key business metrics">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-gradient-brand">
          <BarChart4 className="size-3.5 text-white" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">HexaInsights</p>
          <p className="text-[11px] text-white/45">&ldquo;How did support volume trend this quarter?&rdquo;</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Open cases', value: '128' },
          { label: 'Avg. response', value: '4.2h' },
          { label: 'Resolved', value: '92%' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
            <p className="text-sm font-semibold text-white">{stat.value}</p>
            <p className="text-[10px] text-white/45">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-14 w-full overflow-visible" aria-hidden="true">
          <path d={path} fill="none" stroke="url(#insightsLineGradient)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="insightsLineGradient" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#6366F1" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!compact ? (
        <div className="flex items-end gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
          {barValues.map((value, index) => (
            <div key={index} className="flex-1 rounded-t-sm bg-gradient-brand" style={{ height: `${value}px`, opacity: 0.55 + index * 0.09 }} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
