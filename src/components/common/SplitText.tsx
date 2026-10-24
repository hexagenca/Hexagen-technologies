import { useRef, type CSSProperties, type ElementType } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SplitTextSegment {
  text: string
  /** Applied to every word in this segment, e.g. a gradient on one word. */
  className?: string
}

interface SplitTextProps {
  segments: SplitTextSegment[]
  as?: ElementType
  className?: string
  style?: CSSProperties
  /** Seconds before the first word starts rising. */
  delay?: number
}

/**
 * Reveals a line word by word the first time it scrolls into view. Under
 * reduced motion the words render in place with no animation, so the text
 * reads the same either way.
 */
export function SplitText({ segments, as: Tag = 'div', className = '', style, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()

  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className })),
  )
  const gap = (i: number) => ({ marginRight: i === words.length - 1 ? 0 : '0.25em' })

  return (
    <Tag ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) =>
        reducedMotion ? (
          <span key={`${w.word}-${i}`} className={w.className} style={gap(i)}>
            {w.word}
          </span>
        ) : (
          <motion.span
            key={`${w.word}-${i}`}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block ${w.className ?? ''}`}
            style={gap(i)}
          >
            {w.word}
          </motion.span>
        ),
      )}
    </Tag>
  )
}
