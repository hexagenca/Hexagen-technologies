import type { ReactNode } from 'react'
import { Container } from '@/components/common/Container'
import { Breadcrumbs, type BreadcrumbItem } from '@/components/common/Breadcrumbs'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Badge } from '@/components/common/Badge'

interface PageHeroProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  breadcrumbs: BreadcrumbItem[]
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-ink pb-20 pt-36 sm:pb-24 sm:pt-40">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />
      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} tone="dark" />
        <AnimatedSection className="mt-6 max-w-3xl">
          {eyebrow ? (
            <Badge tone="dark" className="mb-5">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-[var(--color-text-ondark-muted)]">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
        </AnimatedSection>
      </Container>
    </section>
  )
}
