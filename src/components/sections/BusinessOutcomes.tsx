import { motion } from 'motion/react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { outcomes } from '@/data/outcomes'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function BusinessOutcomes() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-gradient-ink py-20 sm:py-28">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Business impact"
          title="AI that delivers measurable business value"
          description="Everything Hexagen ships is built around a specific operational outcome, not AI for its own sake."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome, index) => (
            <AnimatedSection
              key={outcome.title}
              delay={index * 0.06}
              tilt
              className="relative overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/25"
            >
              {/* Brand rule sweeps in with the card, marking the reveal. */}
              <motion.span
                aria-hidden="true"
                initial={reducedMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: index * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-brand"
              />
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
