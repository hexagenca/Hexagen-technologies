import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Truck } from 'lucide-react'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { tmsProduct } from '@/data/tms'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'

const STEPS = tmsProduct.lifecycle

/**
 * The trip lifecycle as a road: on desktop a truck drives from Quote to Invoice
 * as the section scrolls through the viewport, and each stop lights up as the
 * truck reaches it — echoing tms.hexagen.ca's own home page, where a truck
 * drives one load's day. Scroll-linked through MotionValues only (transform and
 * opacity, no React state on scroll). Mobile and reduced motion get the same
 * four stops as a static, numbered list with the road drawn complete.
 */
export function TmsRoad() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 1024px)')
  const driving = desktop && !reducedMotion

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  // The truck sits in a full-width rail, so a percentage x moves it along the road.
  const truckX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="relative mt-16">
      {/* Road — desktop only */}
      <div aria-hidden="true" className="relative mx-[12.5%] hidden h-14 lg:block">
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[var(--color-ink-800)]" />
        <div
          className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 14px, transparent 14px 28px)' }}
        />
        <motion.div
          className="absolute inset-x-0 top-1/2 h-2 origin-left -translate-y-1/2 rounded-full bg-gradient-brand"
          style={driving ? { scaleX: fill } : undefined}
        />
        {STEPS.map((step, i) => (
          <span
            key={step.title}
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[var(--color-primary)] shadow-[var(--shadow-glow-primary)]"
            style={{ left: `${(i / (STEPS.length - 1)) * 100}%` }}
          />
        ))}
        <motion.div className="absolute inset-x-0 top-0 h-full" style={driving ? { x: truckX } : { x: '100%' }}>
          <span className="absolute left-0 top-1/2 flex size-12 -translate-x-1/2 -translate-y-[85%] items-center justify-center rounded-2xl bg-white text-[var(--color-primary-dark)] shadow-[var(--shadow-elevated)] ring-1 ring-[var(--color-surface-border)]">
            <Truck className="size-6" strokeWidth={1.75} />
          </span>
        </motion.div>
      </div>

      <ol className="relative mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
        {/* Mobile road: a static vertical line behind the numbered stops */}
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-[2.75rem] top-8 w-1 rounded-full bg-gradient-brand sm:hidden"
        />
        {STEPS.map((step, i) => (
          <RoadStop key={step.title} index={i} progress={driving ? scrollYProgress : null} />
        ))}
      </ol>
    </div>
  )
}

function RoadStop({ index, progress }: { index: number; progress: MotionValue<number> | null }) {
  const step = STEPS[index]
  const Icon = step.icon
  // The truck reaches stop i at i/(n-1); the card wakes just before that.
  const arrival = index / (STEPS.length - 1)
  const start = Math.max(0, arrival - 0.18)
  const fallback = useTransform(() => 1)
  const opacity = useTransform(progress ?? fallback, [start, Math.max(start + 0.001, arrival)], [0.45, 1])
  const y = useTransform(progress ?? fallback, [start, Math.max(start + 0.001, arrival)], [10, 0])

  return (
    <li className="relative">
      <AnimatedSection delay={progress ? 0 : index * 0.06}>
        <motion.div
          style={progress ? { opacity, y } : undefined}
          className={cn(
            'relative flex h-full gap-4 rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)] lg:flex-col',
          )}
        >
          <span className="relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand text-white shadow-[var(--shadow-glow-primary)]">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="absolute right-5 top-5 text-4xl font-bold text-[var(--color-surface-border)]" aria-hidden="true">
            {index + 1}
          </span>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-onlight)]">{step.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{step.description}</p>
          </div>
        </motion.div>
      </AnimatedSection>
    </li>
  )
}
