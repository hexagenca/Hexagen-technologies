import { PageHero } from '@/components/layout/PageHero'
import { SEO } from '@/components/layout/SEO'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { Accordion } from '@/components/common/Accordion'
import { CTASection } from '@/components/common/CTASection'
import { FlagshipShowcase } from '@/components/sections/FlagshipShowcase'
import { ProductShowcaseDeck } from '@/components/products/ProductCarousel3D'
import { ProductComparisonTable } from '@/components/products/ProductComparisonTable'
import { products } from '@/data/products'
import { productSelectionFaqs } from '@/data/faqs'
import { breadcrumbListStructuredData } from '@/utils/structuredData'

const selectionGuidance = [
  { situation: 'Employees keep asking the same questions', product: 'HexaChat' },
  { situation: 'Documents require manual review before use', product: 'HexaDocs' },
  { situation: 'A process spans multiple systems and people', product: 'HexaFlow' },
  { situation: 'Reporting takes too long to produce', product: 'HexaInsights' },
]

export default function Products() {
  return (
    <>
      <SEO
        title="AI Products | Hexagen"
        description="DropWire — our live real-time media capture platform — plus HexaChat, HexaDocs, HexaFlow and HexaInsights, the applied-AI suite we're building for knowledge, documents, workflows and analytics."
        path="/products"
        structuredData={[breadcrumbListStructuredData([{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }])]}
      />
      <PageHero
        eyebrow="Products"
        title="One product live today, a suite on the way"
        description="DropWire is shipping now for real-time media capture. Behind it, we're building a focused suite of AI applications that solve specific operational problems across your business."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Products' }]}
      >
        <Button href="https://green-wave-0ebabb60f.7.azurestaticapps.net/" external variant="primary" size="lg">
          Explore DropWire
        </Button>
        <Button href="#comparison" variant="outline-light" size="lg">
          Compare Products
        </Button>
      </PageHero>

      <FlagshipShowcase />

      <ProductShowcaseDeck
        products={products}
        eyebrow="The applied-AI suite"
        title="What we're building next"
        description="These four products are in active design. Each targets a distinct operational problem and is built to work with the others."
      />

      <section id="comparison" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Compare" title="Feature comparison" />
          <div className="mt-12">
            <ProductComparisonTable />
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Not sure where to start?" title="Match your challenge to a product" />
          <div className="mt-12 flex flex-col gap-4">
            {selectionGuidance.map((item) => (
              <div
                key={item.product}
                className="flex flex-col items-start justify-between gap-3 rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-white p-5 sm:flex-row sm:items-center"
              >
                <p className="text-sm text-[var(--color-text-onlight)]">{item.situation}</p>
                <span className="shrink-0 rounded-full bg-gradient-brand-soft px-4 py-1.5 text-sm font-semibold text-[var(--color-primary-dark)]">
                  {item.product}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Choosing the right product" />
          <div className="mt-12">
            <Accordion items={productSelectionFaqs} />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Still deciding?"
        title="Talk to our team about your specific use case"
        description="A short AI consultation is the fastest way to confirm which product — or combination — fits your business."
      >
        <Button to="/contact" variant="primary" size="lg">
          Book a Demo
        </Button>
        <Button to="/contact" variant="outline-light" size="lg">
          Book an AI Consultation
        </Button>
      </CTASection>
    </>
  )
}
