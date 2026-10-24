import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Check, Truck } from 'lucide-react'
import { tmsProduct } from '@/data/tms'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const { tripId, lane, statuses, views } = tmsProduct.demo

/**
 * One trip record moves through its lifecycle and every view that reads it
 * updates in the same beat — "one record, every view". It only cycles while
 * on screen. Decorative (aria-hidden): the section around it says the same in
 * text. With reduced motion it renders a static "In transit".
 */
export function TripPropagationVisual() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [step, setStep] = useState(2)
  const current = reduceMotion ? 2 : step
  const live = inView && !reduceMotion

  useEffect(() => {
    if (!live) return
    const delay = step === statuses.length - 1 ? 3600 : 2200
    const id = window.setTimeout(() => setStep((s) => (s + 1) % statuses.length), delay)
    return () => window.clearTimeout(id)
  }, [step, live])

  const status = statuses[current]
  const progress = (current / (statuses.length - 1)) * 100

  return (
    <div ref={ref} className="w-full max-w-[440px]" aria-hidden="true">
      <div className="rounded-[var(--radius-xl)] bg-white/[0.04] p-5 shadow-[var(--shadow-glow-primary)] ring-1 ring-white/10 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white">
            <motion.span
              className="size-1.5 rounded-full bg-emerald-400"
              animate={live ? { opacity: [1, 0.3, 1] } : undefined}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Trip record
          </span>
        </div>

        {/* The record itself */}
        <div className="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]">
              <Truck className="size-[18px]" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs font-semibold text-white">{tripId}</p>
              <p className="truncate text-[11px] text-white/60">{lane}</p>
            </div>
            <StatusPill status={status} reduceMotion={reduceMotion} />
          </div>

          <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-brand"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <ol className="mt-2 flex justify-between text-[9px] font-medium uppercase tracking-wide">
            {statuses.map((s, i) => (
              <li key={s} className={i <= current ? 'text-white/80' : 'text-white/30'}>
                {s}
              </li>
            ))}
          </ol>
        </div>

        {/* Every view that reads the record */}
        <ul className="mt-3 grid grid-cols-1 gap-2">
          {views.map((view, i) => {
            const Icon = view.icon
            return (
              <li
                key={view.label}
                className="relative flex items-center gap-3 overflow-hidden rounded-xl bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/10"
              >
                {!reduceMotion && (
                  <motion.span
                    key={`${view.label}-${current}`}
                    className="absolute inset-0 bg-[var(--color-primary)]/25"
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.06 }}
                  />
                )}
                <Icon className="relative size-4 shrink-0 text-[var(--color-primary-light)]" strokeWidth={1.75} />
                <span className="relative flex-1 truncate text-xs font-medium text-white">{view.label}</span>
                <span className="relative flex items-center gap-1 text-[10px] font-medium text-emerald-300">
                  <Check className="size-3" />
                  {status}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function StatusPill({ status, reduceMotion }: { status: string; reduceMotion: boolean }) {
  return (
    <span className="relative inline-flex h-6 min-w-[5.5rem] items-center justify-center overflow-hidden rounded-full bg-emerald-400/15 px-2.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={reduceMotion ? false : { y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {status}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
