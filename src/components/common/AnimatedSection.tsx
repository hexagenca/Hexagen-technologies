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
}

export function AnimatedSection({ children, className, style, id, delay = 0, amount = 0.2 }: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div id={id} className={cn(className)} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      id={id}
      className={cn(className)}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
