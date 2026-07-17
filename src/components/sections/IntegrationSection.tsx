import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Logo } from '@/components/common/Logo'
import { integrationCategories } from '@/data/integrations'

const RADIUS = 38

function nodePosition(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  }
}

export function IntegrationSection() {
  return (
    <section className="bg-gradient-ink py-20 sm:py-28">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Integrations"
          title="AI that works with the systems you already use"
          description="Everything Hexagen builds is designed to connect with the categories of systems most businesses already run — not to replace them."
        />

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-xl">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {integrationCategories.map((category, index) => {
              const { x, y } = nodePosition(index, integrationCategories.length)
              return (
                <line
                  key={category.name}
                  x1={50}
                  y1={50}
                  x2={x}
                  y2={y}
                  stroke="rgba(148,163,184,0.25)"
                  strokeWidth={0.4}
                />
              )
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[var(--color-ink-800)] shadow-[var(--shadow-glow-primary)] sm:size-24">
            <Logo tone="light" markOnly />
          </div>

          {integrationCategories.map((category, index) => {
            const { x, y } = nodePosition(index, integrationCategories.length)
            return (
              <AnimatedSection
                key={category.name}
                delay={index * 0.05}
                className="absolute w-32 -translate-x-1/2 -translate-y-1/2 sm:w-36"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur-sm">
                  <category.icon className="size-5 text-[var(--color-accent)]" strokeWidth={1.75} aria-hidden="true" />
                  <p className="text-xs font-semibold text-white">{category.name}</p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-[var(--color-text-ondark-muted)]">
          Specific integrations are scoped per engagement based on the systems your business already runs.
        </p>
      </Container>
    </section>
  )
}
