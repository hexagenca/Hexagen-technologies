import { Check } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SEO } from '@/components/layout/SEO'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Button } from '@/components/common/Button'
import { CTASection } from '@/components/common/CTASection'
import { services } from '@/data/services'
import { implementationProcess } from '@/data/process'
import { breadcrumbListStructuredData } from '@/utils/structuredData'

export default function Services() {
  return (
    <>
      <SEO
        title="AI Services | Hexagen"
        description="Hexagen's services span AI strategy, custom development, integrations, data engineering, cloud architecture, evaluation, and managed AI services."
        path="/services"
        structuredData={[breadcrumbListStructuredData([{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }])]}
      />
      <PageHero
        eyebrow="Services"
        title="The hands-on layer behind every Hexagen product"
        description="Products alone rarely solve a business problem. Our services team scopes, builds, integrates, and supports the AI systems that make them work inside your organization."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Services' }]}
      >
        <Button to="/contact" variant="primary" size="lg">
          Book a Demo
        </Button>
      </PageHero>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What we do" title="Full-lifecycle AI services" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.slug}
                id={service.slug}
                delay={index * 0.05}
                className="scroll-mt-28 rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="mb-4 inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
                  <service.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-onlight)]">{service.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{service.description}</p>
                <ul className="flex flex-col gap-1.5">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-xs font-medium text-[var(--color-text-onlight)]">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Delivery methodology" title="How a Hexagen engagement runs" />
          <ol className="mt-14 flex flex-col gap-6">
            {implementationProcess.map((step, index) => (
              <AnimatedSection
                key={step.step}
                delay={index * 0.06}
                className="flex gap-5 rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-white p-5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                  {step.step}
                </span>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-[var(--color-text-onlight)]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </ol>
        </Container>
      </section>

      <CTASection
        eyebrow="Let's scope it"
        title="Not sure which service you need?"
        description="Most engagements start with a short discovery conversation. We'll help you figure out what's actually required."
      >
        <Button to="/contact" variant="primary" size="lg">
          Book a Demo
        </Button>
        <Button to="/contact" variant="outline-light" size="lg">
          Contact Our Team
        </Button>
      </CTASection>
    </>
  )
}
