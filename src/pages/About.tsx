import { ShieldCheck, Handshake, Target, Compass } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SEO } from '@/components/layout/SEO'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { FeatureCard } from '@/components/common/FeatureCard'
import { CTASection } from '@/components/common/CTASection'
import { Button } from '@/components/common/Button'
import { company } from '@/data/company'
import { coreCapabilities } from '@/data/capabilities'
import { breadcrumbListStructuredData } from '@/utils/structuredData'

const principles = [
  {
    icon: Target,
    title: 'Practical over hype',
    description: 'We build AI that solves a specific, real business problem — not AI added for its own sake.',
  },
  {
    icon: ShieldCheck,
    title: 'Security by design',
    description: 'Access control, oversight, and data handling are part of the initial design, not an afterthought.',
  },
  {
    icon: Handshake,
    title: 'Transparent partnership',
    description: 'We are direct about what AI can and cannot do for your business, including its limitations.',
  },
  {
    icon: Compass,
    title: 'Long-term thinking',
    description: 'We aim to build systems and relationships that hold up well beyond initial deployment.',
  },
]

const timeline = [
  { year: String(company.foundedYear), title: 'Hexagen founded', description: 'Hexagen was founded in Canada to help businesses apply AI to real operational problems.' },
  { year: 'Since', title: 'Expanding practical AI expertise', description: 'Our focus broadened from foundational software and cloud work into applied AI products and services.' },
  { year: 'Today', title: 'Building toward long-term partnerships', description: 'We continue to focus on practical AI systems and durable relationships with the businesses we work with.' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Hexagen"
        description="Hexagen is a Canadian AI software company founded in 2022, focused on practical AI products and long-term client partnerships."
        path="/about"
        structuredData={[breadcrumbListStructuredData([{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }])]}
      />
      <PageHero
        eyebrow="About Hexagen"
        title="A Canadian AI company built around practical results"
        description={company.slogan}
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'About' }]}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading align="left" eyebrow="Our story" title="Why Hexagen exists" />
          <AnimatedSection className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-[var(--color-text-onlight-muted)]">
            <p>
              Hexagen was founded in {company.foundedYear} in Canada to help businesses move past the gap between
              AI hype and AI that actually works inside a real organization.
            </p>
            <p>
              Rather than positioning as a generic technology consultancy, Hexagen focuses specifically on applied
              AI: knowledge assistants, document intelligence, workflow automation, and conversational analytics —
              built and supported by a team with experience across software, cloud, and data engineering.
            </p>
            <p>
              Our mission is straightforward: build secure AI software that helps organizations automate
              operations, understand their data, improve customer experiences, and make faster decisions.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Principles" title="How we approach the work" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <FeatureCard key={principle.title} icon={principle.icon} title={principle.title} description={principle.description} delay={index * 0.06} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Capabilities" title="Expertise across software, cloud, data, and AI" />
          <AnimatedSection className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
            {coreCapabilities.map((capability) => (
              <span
                key={capability.label}
                className="flex items-center gap-2 rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm font-medium text-[var(--color-text-onlight)]"
              >
                <capability.icon className="size-4 text-[var(--color-primary)]" aria-hidden="true" />
                {capability.label}
              </span>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Timeline" title="Our path so far" />
          <div className="relative mt-14 flex flex-col gap-10 border-l border-[var(--color-surface-border)] pl-8">
            {timeline.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08} className="relative">
                <span className="absolute -left-[2.35rem] top-1 flex size-5 items-center justify-center rounded-full bg-gradient-brand" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-dark)]">{item.year}</p>
                <h3 className="mt-1 text-base font-semibold text-[var(--color-text-onlight)]">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow={company.slogan}
        title="Let's build something practical together"
        description="Tell us about your business and we'll help you figure out where AI can create real value."
      >
        <Button to="/contact" variant="primary" size="lg">
          Book a Demo
        </Button>
        <Button to="/careers" variant="outline-light" size="lg">
          View Careers
        </Button>
      </CTASection>
    </>
  )
}
