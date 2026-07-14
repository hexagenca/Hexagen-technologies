import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  id?: string
  delay?: number
  /** Amount (0-1) of the element that must be visible before it animates in. */
  amount?: number
  /** Tips the element up from a slight perspective tilt instead of a plain fade-up. */
  tilt?: boolean
}

export function AnimatedSection({ children, className, style, id, delay = 0, amount = 0.2, tilt = false }: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div id={id} className={cn(className)} style={style}>
        {children}
      </div>
    )
  }

  const initial = tilt
    ? { opacity: 0, y: 48, rotateX: 22, transformPerspective: 1000 }
    : { opacity: 0, y: 24 }
  const inView = tilt
    ? { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 }
    : { opacity: 1, y: 0 }

  return (
    <motion.div
      id={id}
      className={cn(className)}
      style={style}
      initial={initial}
      whileInView={inView}
      viewport={{ once: true, amount }}
      transition={{ duration: tilt ? 0.7 : 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
