import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useFinePointer } from '@/hooks/useFinePointer'

/**
 * Wraps an interactive element so it leans a few pixels toward the cursor,
 * spring-loaded, and settles back on leave — a small feedback flourish for
 * primary CTAs. Disabled entirely under reduced motion or on touch devices
 * (no pointer to follow), where it renders children untouched.
 */
export function Magnetic({ children, strength = 0.18 }: { children: ReactNode; strength?: number }) {
  const reducedMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  if (reducedMotion || !finePointer) return <>{children}</>

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="inline-block"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
