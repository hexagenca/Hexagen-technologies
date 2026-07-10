import type { ReactNode } from 'react'
import { AnimatedSection } from './AnimatedSection'
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

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 text-sm font-semibold uppercase tracking-widest',
            tone === 'light' ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-accent)]',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          'text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]',
          tone === 'light' ? 'text-[var(--color-text-onlight)]' : 'text-white',
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            'mt-4 text-balance text-base leading-relaxed sm:text-lg',
            tone === 'light' ? 'text-[var(--color-text-onlight-muted)]' : 'text-[var(--color-text-ondark-muted)]',
          )}
        >
          {description}
        </p>
      ) : null}
    </AnimatedSection>
  )
}
