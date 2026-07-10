import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Button } from '@/components/common/Button'
import { solutions } from '@/data/solutions'

export function SolutionsSection() {
  return (
    <section className="bg-[var(--color-surface-muted)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title="Built around the way your teams already work"
          description="Hexagen products apply to the functions where manual work and scattered information slow teams down most."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <AnimatedSection
              key={solution.slug}
              delay={index * 0.06}
              className="flex flex-col rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
            >
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
                <solution.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-onlight)]">{solution.name}</h3>
              <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{solution.challenge}</p>
              <p className="mb-4 text-sm font-medium leading-relaxed text-[var(--color-text-onlight)]">{solution.benefit}</p>
              <Link
                to={`/solutions#${solution.slug}`}
                className="mt-auto flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-dark)]"
              >
                Learn more
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button to="/solutions" variant="secondary" size="lg">
            Explore all solutions
          </Button>
        </div>
      </Container>
    </section>
  )
}
