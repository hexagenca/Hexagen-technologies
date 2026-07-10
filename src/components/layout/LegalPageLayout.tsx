import { PageHero } from './PageHero'
import { Container } from '@/components/common/Container'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export interface LegalSection {
  heading: string
  paragraphs: string[]
}

interface LegalPageLayoutProps {
  title: string
  description: string
  breadcrumbLabel: string
  sections: LegalSection[]
}

export function LegalPageLayout({ title, description, breadcrumbLabel, sections }: LegalPageLayoutProps) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={description}
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: breadcrumbLabel }]}
      />
      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <AnimatedSection className="mb-10 rounded-[var(--radius-lg)] border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            <p className="font-semibold">Draft placeholder — pending legal review</p>
            <p className="mt-1">
              This content is a professionally structured starting point and has not been reviewed by qualified
              legal counsel. It must be reviewed and approved by a lawyer before publication.
            </p>
          </AnimatedSection>

          <div className="flex flex-col gap-10">
            {sections.map((section, index) => (
              <AnimatedSection key={section.heading} delay={index * 0.04}>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text-onlight)]">{section.heading}</h2>
                <div className="flex flex-col gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
