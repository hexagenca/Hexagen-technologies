import type { ReactNode } from 'react'
import { Container } from './Container'
import { AnimatedSection } from './AnimatedSection'
import { cn } from '@/utils/cn'

interface CTASectionProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
}

export function CTASection({ eyebrow, title, description, children, className }: CTASectionProps) {
  return (
    <section className={cn('relative overflow-hidden bg-gradient-ink py-20 sm:py-28', className)}>
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-40" />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />
      <Container className="relative">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-4 text-balance text-lg leading-relaxed text-[var(--color-text-ondark-muted)]">
              {description}
            </p>
          ) : null}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">{children}</div>
        </AnimatedSection>
      </Container>
    </section>
  )
}
