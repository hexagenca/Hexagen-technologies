import { motion, useScroll } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Thin brand-gradient bar pinned to the top of the viewport that fills as the
 * page scrolls — scroll-linked via a MotionValue (scaleX), transform-only.
 * Hidden entirely under prefers-reduced-motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX: scrollYProgress, background: 'var(--gradient-brand)' }}
      aria-hidden="true"
    />
  )
}
