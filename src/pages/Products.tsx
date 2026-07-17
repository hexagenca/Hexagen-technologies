import { ArrowRight, ArrowUpRight, BookOpen, QrCode, Radio, TerminalSquare } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SEO } from '@/components/layout/SEO'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { Accordion } from '@/components/common/Accordion'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { CTASection } from '@/components/common/CTASection'
import { FlagshipShowcase } from '@/components/sections/FlagshipShowcase'
import { flagshipProduct } from '@/data/products'
import { engagementFaqs } from '@/data/faqs'
import { breadcrumbListStructuredData, softwareApplicationStructuredData } from '@/utils/structuredData'

const sessionSteps = [
  {
    icon: TerminalSquare,
    title: 'Create a session',
    description: 'One SDK call starts a capture session from your backend — TypeScript, Python, PHP or React Native.',
  },
  {
    icon: QrCode,
    title: 'Show the QR code',
    description: 'Your customer scans it with their phone camera. Capture runs in the mobile browser — nothing to install.',
  },
  {
    icon: Radio,
    title: 'Files arrive live',
    description: 'Photos, documents, video, signatures and voice notes stream straight into your app in real time.',
  },
]

const sdks = ['TypeScript', 'Python', 'PHP', 'React Native']

export default function Products() {
  return (
    <>
      <SEO
        title="DropWire — Real-Time Mobile Capture | Hexagen"
        description="DropWire is Hexagen's live product: show a QR code and photos, documents, video, signatures and voice notes stream straight into your app — no native install."
        path="/products"
        structuredData={[
          breadcrumbListStructuredData([{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }]),
          softwareApplicationStructuredData(flagshipProduct),
        ]}
      />
      <PageHero
        eyebrow="Products"
        title="DropWire — real-time capture from any phone"
        description="Our live product turns a QR code into a capture device: photos, documents, video, signatures and voice notes stream straight into your app, live over the web."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Products' }]}
      >
        <Button href={flagshipProduct.href} external variant="primary" size="lg" icon={<ArrowUpRight className="size-4" aria-hidden="true" />}>
          Explore DropWire
        </Button>
        <Button href={flagshipProduct.docsHref} external variant="outline-light" size="lg" icon={<BookOpen className="size-4" aria-hidden="true" />}>
          Developer docs
        </Button>
      </PageHero>

      <FlagshipShowcase />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="A capture session in three steps"
            description="DropWire is an API platform: your backend opens a session, your customer's phone does the capturing, and the files land back in your app."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {sessionSteps.map((step, index) => (
              <AnimatedSection
                key={step.title}
                delay={index * 0.08}
                className="relative flex flex-col rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] p-6"
              >
                <span className="mb-4 inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand text-white shadow-[var(--shadow-glow-primary)]">
                  <step.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="absolute right-5 top-5 text-4xl font-bold text-[var(--color-surface-border)]" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-onlight)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{step.description}</p>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.1} className="mt-10 flex flex-col items-center gap-4">
            <div className="w-full max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-ink-border)] bg-[var(--color-ink-900)] p-5 font-mono text-sm leading-7">
              {flagshipProduct.codeSnippet.map((line) => (
                <p key={line.text} className={line.kind === 'comment' ? 'text-white/40' : 'text-[var(--color-primary-light)]'}>
                  {line.text}
                </p>
              ))}
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Available SDKs">
              {sdks.map((sdk) => (
                <li
                  key={sdk}
                  className="rounded-full border border-[var(--color-surface-border)] bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--color-text-onlight-muted)]"
                >
                  {sdk} SDK
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </Container>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Beyond capture"
            title="AI add-ons and enterprise options"
            description="DropWire ships with optional AI processing for captured media, and enterprise controls for teams with scale and compliance needs."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {flagshipProduct.highlights.map((highlight, index) => (
              <AnimatedSection
                key={highlight.label}
                delay={index * 0.06}
                tilt
                className="flex gap-4 rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
                  <highlight.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-[var(--color-text-onlight)]">{highlight.label}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
                    {highlight.description}
                  </span>
                </span>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-4xl">
          <AnimatedSection className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-text-onlight)]">Need something DropWire doesn&rsquo;t do?</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
                Products are half the story. Our services team designs and builds custom AI — assistants, document
                processing, workflow automation and analytics — around your data and systems.
              </p>
            </div>
            <Button to="/services" variant="primary" size="lg" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
              Explore services
            </Button>
          </AnimatedSection>
        </Container>
      </section>

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Working with Hexagen" />
          <div className="mt-12">
            <Accordion items={engagementFaqs} />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Ready when you are"
        title="Try DropWire or talk to our team"
        description="DropWire is live today — or book a consultation and we'll scope what a custom build would look like for your business."
      >
        <Button href={flagshipProduct.href} external variant="primary" size="lg">
          Explore DropWire
        </Button>
        <Button to="/contact" variant="outline-light" size="lg">
          Book an AI Consultation
        </Button>
      </CTASection>
    </>
  )
}
