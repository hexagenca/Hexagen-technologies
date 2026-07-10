import { Lightbulb, Rocket, Users } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SEO } from '@/components/layout/SEO'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FeatureCard } from '@/components/common/FeatureCard'
import { Badge } from '@/components/common/Badge'
import { CareerApplicationForm } from '@/components/forms/CareerApplicationForm'
import { jobOpenings } from '@/data/careers'
import { breadcrumbListStructuredData } from '@/utils/structuredData'

const culture = [
  {
    icon: Rocket,
    title: 'Real product work',
    description: 'You will work on features that ship in Hexagen products, not throwaway exercises.',
  },
  {
    icon: Users,
    title: 'Small, direct team',
    description: 'A small team means your contributions are visible and your input genuinely shapes decisions.',
  },
  {
    icon: Lightbulb,
    title: 'Learning by building',
    description: 'You will get hands-on exposure to how applied AI systems are actually designed and deployed.',
  },
]

export default function Careers() {
  const opening = jobOpenings[0]

  return (
    <>
      <SEO
        title="Careers at Hexagen"
        description="Join the Hexagen team. See our current opening and apply directly online."
        path="/careers"
        structuredData={[breadcrumbListStructuredData([{ label: 'Home', path: '/' }, { label: 'Careers', path: '/careers' }])]}
      />
      <PageHero
        eyebrow="Careers"
        title="Help build practical AI software"
        description="Hexagen is a small, focused team building AI products that solve real business problems. Here's what it's like to work with us."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Careers' }]}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Culture" title="What working at Hexagen is like" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {culture.map((item, index) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} delay={index * 0.06} />
            ))}
          </div>
        </Container>
      </section>

      {opening ? (
        <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
          <Container className="max-w-4xl">
            <SectionHeading eyebrow="Open position" title="Current opening" />
            <div className="mt-12 rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text-onlight)]">{opening.title}</h3>
                <div className="flex gap-2">
                  <Badge>{opening.type}</Badge>
                  {opening.remote ? <Badge>Remote</Badge> : null}
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{opening.description}</p>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-onlight-muted)]">
                    Responsibilities
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {opening.responsibilities.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-[var(--color-text-onlight)]">
                        &bull; {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-onlight-muted)]">
                    Qualifications
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {opening.qualifications.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-[var(--color-text-onlight)]">
                        &bull; {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {opening ? (
        <section className="bg-white py-20 sm:py-24">
          <Container className="max-w-2xl">
            <SectionHeading eyebrow="Apply" title={`Apply for ${opening.title}`} />
            <div className="mt-12 rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-10">
              <CareerApplicationForm jobTitle={opening.title} />
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
