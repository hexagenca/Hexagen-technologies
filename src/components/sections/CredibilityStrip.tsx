import { Container } from '@/components/common/Container'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { coreCapabilities } from '@/data/capabilities'

export function CredibilityStrip() {
  return (
    <section className="border-b border-[var(--color-surface-border)] bg-white py-10">
      <Container>
        <AnimatedSection>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {coreCapabilities.map((capability) => (
              <li key={capability.label} className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-text-onlight-muted)]">
                <capability.icon className="size-5 text-[var(--color-primary)]" strokeWidth={1.75} aria-hidden="true" />
                {capability.label}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </Container>
    </section>
  )
}
