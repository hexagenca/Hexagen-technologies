import { ArrowRight, Check } from 'lucide-react'
import type { Product } from '@/types'
import { Container } from '@/components/common/Container'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Accordion } from '@/components/common/Accordion'
import { CTASection } from '@/components/common/CTASection'
import { ProductMockup } from './ProductMockup'

interface ProductPageTemplateProps {
  product: Product
}

const accentClasses: Record<Product['color'], { text: string; bg: string }> = {
  indigo: { text: 'text-indigo-600', bg: 'bg-indigo-50' },
  violet: { text: 'text-violet-600', bg: 'bg-violet-50' },
  blue: { text: 'text-blue-600', bg: 'bg-blue-50' },
  cyan: { text: 'text-cyan-700', bg: 'bg-cyan-50' },
}

export function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  const Icon = product.icon
  const accent = accentClasses[product.color]

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-ink pb-20 pt-36 sm:pb-24 sm:pt-40">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
        <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />
        <Container className="relative">
          <Breadcrumbs
            tone="dark"
            items={[{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }, { label: product.name }]}
          />
          <div className="mt-8 grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <AnimatedSection>
              <span className="mb-6 inline-flex size-14 items-center justify-center rounded-[var(--radius-lg)] bg-white/10">
                <Icon className="size-7 text-white" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <Badge tone="dark" className="mb-4">
                {product.name}
              </Badge>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {product.tagline}
              </h1>
              <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-[var(--color-text-ondark-muted)]">
                {product.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button to="/contact" variant="primary" size="lg" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
                  Request a Demo
                </Button>
                <Button to="/products" variant="outline-light" size="lg">
                  Compare Products
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <ProductMockup type={product.mockup} />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading align="left" eyebrow="The problem" title="Why this matters" description={product.problem} />
        </Container>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Capabilities" title="Core capabilities" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {product.capabilities.map((capability, index) => (
              <AnimatedSection
                key={capability.title}
                delay={index * 0.06}
                className="rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className={`mb-2 text-lg font-semibold ${accent.text}`}>{capability.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{capability.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Business benefits" title={`What ${product.name} improves day to day`} />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.benefits.map((benefit, index) => (
              <AnimatedSection
                key={benefit}
                delay={index * 0.05}
                className={`flex items-start gap-3 rounded-[var(--radius-lg)] p-5 ${accent.bg}`}
              >
                <Check className={`mt-0.5 size-5 shrink-0 ${accent.text}`} aria-hidden="true" />
                <p className="text-sm font-medium leading-relaxed text-[var(--color-text-onlight)]">{benefit}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="How it works" title={`Getting started with ${product.name}`} />
          <ol className="mx-auto mt-14 flex max-w-3xl flex-col gap-8">
            {product.howItWorks.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.06} className="flex gap-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-primary)] text-sm font-bold text-[var(--color-primary-dark)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-[var(--color-text-onlight)]">{item.step}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Use cases" title="Where teams put it to work" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {product.useCases.map((useCase, index) => (
              <AnimatedSection
                key={useCase.title}
                delay={index * 0.06}
                className="rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] p-6"
              >
                <h3 className="mb-2 text-base font-semibold text-[var(--color-text-onlight)]">{useCase.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{useCase.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-ink py-20 sm:py-24">
        <Container>
          <SectionHeading tone="dark" eyebrow="Security" title="Built with enterprise security principles in mind" />
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {product.security.map((item, index) => (
              <AnimatedSection
                key={item}
                delay={index * 0.05}
                className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] p-5"
              >
                <Check className="mt-0.5 size-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-white/80">{item}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-12">
            <Accordion items={product.faqs} />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow={product.name}
        title={`See ${product.name} on your own data`}
        description="Book a short session with our team to walk through how this would apply to your business."
      >
        <Button to="/contact" variant="primary" size="lg">
          Request a Demo
        </Button>
        <Button to="/products" variant="outline-light" size="lg">
          Compare all products
        </Button>
      </CTASection>
    </>
  )
}
