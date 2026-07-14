import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

interface RotatingTextProps {
  words: string[]
  className?: string
  interval?: number
}

/**
 * Cycles through a list of phrases in place, each rising in with a soft blur as
 * the previous one leaves. Communicates the breadth of what Hexagen does in a
 * single headline line. Under reduced motion it renders the first phrase
 * statically and never cycles.
 */
export function RotatingText({ words, className, interval = 2600 }: RotatingTextProps) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(timer)
  }, [reducedMotion, words.length, interval])

  if (reducedMotion) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className="relative inline-block align-bottom">
      {/* Invisible sizer keeps layout stable at the widest phrase. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a), '')}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '0.7em', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.7em', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={cn('absolute inset-0 whitespace-nowrap', className)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
