import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FeatureCard } from '@/components/common/FeatureCard'
import { securityPrinciples } from '@/data/security'

export function SecuritySection() {
  return (
    <section className="bg-[var(--color-surface-muted)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Security & responsible AI"
          title="Designed with enterprise security principles in mind"
          description="Every Hexagen product is built around access control, oversight, and evaluation from the start — not added on afterward."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityPrinciples.map((principle, index) => (
            <FeatureCard
              key={principle.title}
              icon={principle.icon}
              title={principle.title}
              description={principle.description}
              delay={index * 0.05}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
