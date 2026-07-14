import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { outcomes } from '@/data/outcomes'

export function BusinessOutcomes() {
  return (
    <section className="bg-gradient-ink py-20 sm:py-28">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Business impact"
          title="AI that delivers measurable business value"
          description="Every Hexagen product is built around a specific operational outcome, not AI for its own sake."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome, index) => (
            <AnimatedSection
              key={outcome.title}
              delay={index * 0.06}
              tilt
              className="rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-white/10 text-[var(--color-accent)]">
                <outcome.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-lg font-semibold text-white">{outcome.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-ondark-muted)]">{outcome.description}</p>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                {outcome.illustrativeLabel}
              </span>
            </AnimatedSection>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-white/40">
          Illustrative outcomes based on typical AI automation projects — not verified Hexagen customer results.
        </p>
      </Container>
    </section>
  )
}
