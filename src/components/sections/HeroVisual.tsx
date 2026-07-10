import { motion } from 'motion/react'
import { CheckCircle2, Cloud, MessagesSquare, Plug, Sparkles, FileCheck2, Workflow as WorkflowIcon } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const chartPoints = [10, 18, 14, 26, 20, 32, 28, 40]

function buildPath(values: number[], width: number, height: number) {
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

export function HeroVisual() {
  const reducedMotion = useReducedMotion()
  const float = (offset: number) =>
    reducedMotion
      ? {}
      : {
          animate: { y: [0, -offset, 0] },
          transition: { duration: 5 + offset / 4, repeat: Infinity, ease: 'easeInOut' as const },
        }

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-gradient-brand-soft blur-3xl" />

      <div
        role="img"
        aria-label="Illustrative preview of the Hexagen product workspace, showing an AI chat panel, a workflow in progress, an analytics trend, and document processing status"
        className="relative rounded-[var(--radius-2xl)] border border-white/10 bg-[var(--color-ink-800)]/90 p-4 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:p-5"
      >
        <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs font-medium text-white/50">Hexagen Workspace</span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-3.5 sm:col-span-1">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-gradient-brand">
                <Sparkles className="size-3 text-white" />
              </span>
              <p className="text-[11px] font-semibold text-white">HexaChat</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="max-w-[80%] self-end rounded-xl rounded-tr-sm bg-white/10 px-2.5 py-1.5 text-[11px] text-white/90">
                Summarize this contract
              </div>
              <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-gradient-brand-soft px-2.5 py-1.5 text-[11px] text-white/90">
                Here are the three key obligations…
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-3.5">
            <p className="mb-2 text-[11px] font-semibold text-white">Trend</p>
            <svg viewBox="0 0 120 44" className="h-10 w-full overflow-visible" aria-hidden="true">
              <path
                d={buildPath(chartPoints, 120, 44)}
                fill="none"
                stroke="url(#heroChartGradient)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="heroChartGradient" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#6366F1" />
                  <stop offset="1" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-3.5">
            <p className="mb-2.5 text-[11px] font-semibold text-white">Workflow</p>
            <div className="flex items-center gap-1.5">
              {['Received', 'Review', 'Synced'].map((label, index) => (
                <div key={label} className="flex flex-1 flex-col items-center gap-1">
                  <span
                    className={`flex size-5 items-center justify-center rounded-full text-[9px] ${
                      index < 2 ? 'bg-emerald-400/20 text-emerald-400' : 'bg-white/10 text-white/40'
                    }`}
                  >
                    <CheckCircle2 className="size-3" />
                  </span>
                  <span className="text-center text-[9px] text-white/45">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-3.5">
            <p className="mb-2 text-[11px] font-semibold text-white">Documents</p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[10px] text-white/60">
                <span className="truncate">Invoice_0451.pdf</span>
                <span className="text-emerald-400">Validated</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/60">
                <span className="truncate">Contract_09.docx</span>
                <span className="text-cyan-300">Extracting</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        {...float(8)}
        className="absolute -right-6 -top-6 hidden items-center gap-2 rounded-full border border-white/10 bg-[var(--color-ink-800)]/95 px-4 py-2.5 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:flex"
      >
        <FileCheck2 className="size-4 text-emerald-400" aria-hidden="true" />
        <span className="text-xs font-medium text-white">Source verified</span>
      </motion.div>

      <motion.div
        {...float(10)}
        className="absolute -bottom-7 -left-6 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[var(--color-ink-800)]/95 px-4 py-3 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:flex"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
          <Plug className="size-4 text-[var(--color-accent)]" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">Connected systems</p>
          <div className="mt-1 flex items-center gap-1.5 text-white/50">
            <Cloud className="size-3.5" aria-hidden="true" />
            <MessagesSquare className="size-3.5" aria-hidden="true" />
            <WorkflowIcon className="size-3.5" aria-hidden="true" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
