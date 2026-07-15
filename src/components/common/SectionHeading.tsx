import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

const wordRise = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/**
 * Section heading with a choreographed entrance: eyebrow fades up, the title
 * rises word by word from behind a baseline mask, then the description follows
 * — one stagger container, driven once on scroll into view. String titles get
 * the word treatment; ReactNode titles (and reduced motion) render statically.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const reducedMotion = useReducedMotion()

  const eyebrowClass = cn(
    'mb-3 text-sm font-semibold uppercase tracking-widest',
    tone === 'light' ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-accent)]',
  )
  const titleClass = cn(
    'text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]',
    tone === 'light' ? 'text-[var(--color-text-onlight)]' : 'text-white',
  )
  const descriptionClass = cn(
    'mt-4 text-balance text-base leading-relaxed sm:text-lg',
    tone === 'light' ? 'text-[var(--color-text-onlight-muted)]' : 'text-[var(--color-text-ondark-muted)]',
  )
  const wrapperClass = cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)

  if (reducedMotion || typeof title !== 'string') {
    return (
      <div className={wrapperClass}>
        {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
        <Tag className={titleClass}>{title}</Tag>
        {description ? <p className={descriptionClass}>{description}</p> : null}
      </div>
    )
  }

  const words = title.split(' ')

  return (
    <motion.div
      className={wrapperClass}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ visible: { transition: { staggerChildren: 0.045 } } }}
    >
      {eyebrow ? (
        <motion.p variants={fadeUp} className={eyebrowClass}>
          {eyebrow}
        </motion.p>
      ) : null}
      <Tag className={titleClass}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span variants={wordRise} className="inline-block">
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </Tag>
      {description ? (
        <motion.p variants={fadeUp} className={descriptionClass}>
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
