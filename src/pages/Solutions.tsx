import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SEO } from '@/components/layout/SEO'
import { Container } from '@/components/common/Container'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Button } from '@/components/common/Button'
import { CTASection } from '@/components/common/CTASection'
import { solutions } from '@/data/solutions'
import { getProductBySlug } from '@/data/products'
import { breadcrumbListStructuredData } from '@/utils/structuredData'

export default function Solutions() {
  return (
    <>
      <SEO
        title="Solutions by Business Function | Hexagen"
        description="See how Hexagen's AI products apply to customer support, operations, finance, HR, sales, and legal & compliance teams."
        path="/solutions"
        structuredData={[breadcrumbListStructuredData([{ label: 'Home', path: '/' }, { label: 'Solutions', path: '/solutions' }])]}
      />
      <PageHero
        eyebrow="Solutions"
        title="AI solutions organized around your business functions"
        description="Rather than generic AI features, Hexagen maps its products to the specific challenges each team already faces."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Solutions' }]}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-16">
            {solutions.map((solution) => {
              const relatedProducts = solution.relatedProducts.map((slug) => getProductBySlug(slug)).filter(Boolean)

              return (
                <AnimatedSection
                  key={solution.slug}
                  id={solution.slug}
                  className="scroll-mt-28 grid grid-cols-1 gap-10 border-t border-[var(--color-surface-border)] pt-12 first:border-t-0 first:pt-0 lg:grid-cols-3"
                >
                  <div>
                    <span className="mb-4 inline-flex size-12 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
                      <solution.icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h2 className="text-2xl font-semibold text-[var(--color-text-onlight)]">{solution.name}</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {relatedProducts.map((product) =>
                        product ? (
                          <Button key={product.slug} to={`/products/${product.slug}`} variant="secondary" size="md">
                            {product.name}
                          </Button>
                        ) : null,
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-onlight-muted)]">
                          The challenge
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--color-text-onlight)]">{solution.challenge}</p>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-onlight-muted)]">
                          How Hexagen helps
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--color-text-onlight)]">{solution.approach}</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] p-6">
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-onlight-muted)]">
                        Example workflow
                      </h3>
                      <ol className="flex flex-col gap-2.5">
                        {solution.exampleWorkflow.map((step, stepIndex) => (
                          <li key={step} className="flex items-start gap-2.5 text-sm text-[var(--color-text-onlight)]">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-dark)]">
                      <ArrowRight className="size-4" aria-hidden="true" />
                      Expected outcome: {solution.benefit}
                    </p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Your team"
        title="Not seeing your exact challenge?"
        description="Most business processes map to more than one product. Talk to our team about how Hexagen would fit your specific workflow."
      >
        <Button to="/contact" variant="primary" size="lg">
          Book a Demo
        </Button>
        <Button to="/services" variant="outline-light" size="lg">
          See our services
        </Button>
      </CTASection>
    </>
  )
}
