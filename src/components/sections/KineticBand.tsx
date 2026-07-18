import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Scroll-linked kinetic type band naming what Hexagen does across the business.
 * The outlined headline drifts horizontally as the band passes through the
 * viewport — driven by a MotionValue (useScroll → useTransform on x), so no
 * React state updates on scroll. Under prefers-reduced-motion it holds still
 * and simply reads as a static band of type. Decorative, hence aria-hidden.
 */
const WORDS = 'STRATEGY · BUILD · INTEGRATE · AUTOMATE · SECURE · SCALE · '

export function KineticBand() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-42%'])
  const stroke = { WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }

  return (
    <section className="overflow-hidden bg-[var(--color-ink)] py-12 sm:py-16" aria-hidden="true">
      <div ref={ref} className="overflow-hidden">
        <motion.p
          style={reducedMotion ? undefined : { x }}
          className="whitespace-nowrap text-[11vw] font-black uppercase leading-none tracking-tight text-transparent sm:text-[7vw]"
        >
          <span style={stroke}>{WORDS}</span>
          <span className="text-[var(--color-primary-light)]">AI</span>
          <span style={stroke}> · {WORDS}</span>
        </motion.p>
      </div>
    </section>
  )
}
