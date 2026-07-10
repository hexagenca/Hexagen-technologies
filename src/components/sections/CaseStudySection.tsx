import { Quote } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Badge } from '@/components/common/Badge'
import { featuredCaseStudy } from '@/data/caseStudy'

export function CaseStudySection() {
  return (
    <section className="bg-[var(--color-surface-muted)] py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Featured project" title="What a Hexagen engagement looks like" />

        <AnimatedSection className="mt-14 overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-white shadow-[var(--shadow-soft)]">
          <div className="grid grid-cols-1 gap-10 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <Badge className="mb-5">Sample project — illustrative only</Badge>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-onlight-muted)]">
                {featuredCaseStudy.industry}
              </p>
              <h3 className="mb-4 text-2xl font-semibold text-[var(--color-text-onlight)]">The challenge</h3>
              <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{featuredCaseStudy.challenge}</p>
              <h3 className="mb-4 text-2xl font-semibold text-[var(--color-text-onlight)]">The solution</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{featuredCaseStudy.solution}</p>
            </div>

            <div className="flex flex-col justify-between gap-8">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-[var(--color-text-onlight)]">Outcome</h3>
                <ul className="flex flex-col gap-2.5">
                  {featuredCaseStudy.outcome.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-onlight-muted)]">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredCaseStudy.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-xs font-medium text-[var(--color-text-onlight-muted)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <blockquote className="rounded-[var(--radius-lg)] bg-[var(--color-surface-alt)] p-6">
                <Quote className="mb-3 size-6 text-[var(--color-primary)]" aria-hidden="true" />
                <p className="mb-3 text-sm italic leading-relaxed text-[var(--color-text-onlight)]">
                  &ldquo;{featuredCaseStudy.quote.text}&rdquo;
                </p>
                <cite className="text-xs not-italic text-[var(--color-text-onlight-muted)]">{featuredCaseStudy.quote.role}</cite>
              </blockquote>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}
