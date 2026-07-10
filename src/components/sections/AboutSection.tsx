import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Button } from '@/components/common/Button'
import { company } from '@/data/company'

const highlights = [
  `Founded in ${company.foundedYear}`,
  'Canadian company',
  'Practical, outcome-driven AI focus',
  'Long-term client partnerships',
  'Expertise across software, cloud, data, and AI',
]

export function AboutSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-dark)]">
              About Hexagen
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--color-text-onlight)] sm:text-4xl">
              A Canadian AI software company focused on practical results
            </h2>
            <p className="mt-5 text-lg font-medium text-[var(--color-primary-dark)]">{company.slogan}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-text-onlight-muted)]">
              Hexagen builds secure AI products that help organizations automate operations, understand their
              data, improve customer experiences, and make faster decisions.
            </p>
            <Button to="/about" variant="secondary" size="lg" className="mt-8" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
              Learn more about Hexagen
            </Button>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] p-5">
                <p className="text-sm font-medium leading-snug text-[var(--color-text-onlight)]">{item}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
