import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Bot, Check, PlayCircle, Sparkles } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SEO } from '@/components/layout/SEO'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { Accordion } from '@/components/common/Accordion'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { CTASection } from '@/components/common/CTASection'
import { KineticBand } from '@/components/sections/KineticBand'
import { TripPropagationVisual } from '@/components/products/TripPropagationVisual'
import { TmsRoad } from '@/components/products/TmsRoad'
import { TmsTour } from '@/components/products/TmsTour'
import { tmsProduct } from '@/data/tms'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { breadcrumbListStructuredData, softwareApplicationStructuredData } from '@/utils/structuredData'
import { cn } from '@/utils/cn'

const product = tmsProduct

export default function ProductTMS() {
  return (
    <>
      <SEO
        title="Hexagen TMS — Transportation Management Software | Hexagen"
        description="Hexagen TMS runs quotes, dispatch, tracking and invoicing from one record of the trip. Built in Canada for carriers and brokers, with an offline-first driver app and the Hena AI assistant."
        path={product.overviewPath}
        structuredData={[
          breadcrumbListStructuredData([
            { label: 'Home', path: '/' },
            { label: 'Products', path: '/products' },
            { label: product.name, path: product.overviewPath },
          ]),
          softwareApplicationStructuredData(product),
        ]}
      />
      <PageHero
        eyebrow="Products · Hexagen TMS"
        title="Hexagen TMS — every trip, one screen"
        description="Our transportation management system, built in Canada for carriers and brokers who are done running trips across spreadsheets, email threads and five browser tabs."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }, { label: product.name }]}
      >
        <Button href={product.href} external variant="primary" size="lg" icon={<ArrowUpRight className="size-4" aria-hidden="true" />}>
          Open Hexagen TMS
        </Button>
        <Button href="#tour" variant="outline-light" size="lg" icon={<PlayCircle className="size-4" aria-hidden="true" />}>
          Watch the tour
        </Button>
      </PageHero>

      <Showcase />
      <KineticBand words="QUOTE · DISPATCH · TRACK · INVOICE · " accent="ONE RECORD" />
      <Problem />
      <Lifecycle />
      <Tour />
      <Modules />
      <Hena />
      <Audiences />
      <TrustAndIntegrations />
      <Plans />

      <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Hexagen TMS questions" />
          <div className="mt-12">
            <Accordion items={product.faq} />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Live today"
        title="Run your next trip on Hexagen TMS"
        description="Open Hexagen TMS to sign up or log in — the Standard plan comes with a 14-day free trial. Want a walkthrough first? Our team will show you around."
      >
        <Button href={product.href} external variant="primary" size="lg" icon={<ArrowUpRight className="size-4" aria-hidden="true" />}>
          Open Hexagen TMS
        </Button>
        <Button to="/contact" variant="outline-light" size="lg">
          Book a demo
        </Button>
      </CTASection>
    </>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * The dark flagship band, built like DropWire's so the two products read as a
 * family: copy and highlights on the left, the product demonstrating itself on
 * the right (one trip status reaching every view), drifting gently against the
 * scroll on desktop only.
 */
function Showcase() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], [44, -44])
  const parallax = desktop && !reducedMotion

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-ink)] py-20 sm:py-28"
      style={{ backgroundImage: 'var(--gradient-hero-glow)' }}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection className="flex flex-col items-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80">
              <span className="relative flex size-2">
                {!reducedMotion && (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Live product
            </span>

            <p className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Hexagen <span className="text-[var(--color-primary-light)]">TMS</span>
            </p>
            <p className="mt-3 text-lg font-medium text-white/85 sm:text-xl">{product.tagline}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-ondark-muted)]">
              {product.description}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {product.highlights.map((h) => {
                const Icon = h.icon
                return (
                  <li key={h.label} className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 text-[var(--color-primary-light)]">
                      <Icon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{h.label}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-[var(--color-text-ondark-muted)]">
                        {h.description}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={product.href} external variant="primary" size="lg" icon={<ArrowUpRight className="size-[1.125rem]" aria-hidden="true" />}>
                Open Hexagen TMS
              </Button>
              <Button href={product.trialHref} external variant="outline-light" size="lg">
                Start free trial
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="relative">
            <motion.div style={parallax ? { y: visualY } : undefined} className="flex flex-col items-center">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[var(--radius-2xl)] opacity-70 blur-2xl"
                style={{ background: 'var(--gradient-brand-soft)' }}
              />
              <div className="relative flex w-full justify-center">
                <TripPropagationVisual />
              </div>
              <p className="relative mt-6 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white/60">
                One status change — every view updates at once
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}

/**
 * "The same trip, typed five times": the five scattered copies settle into a
 * row, each is struck through in turn, and the one record drops in beneath
 * them. Under reduced motion the finished state renders at once.
 */
function Problem() {
  const reducedMotion = useReducedMotion()
  const scatter = [
    { x: -18, y: -14, rotate: -6 },
    { x: 14, y: 18, rotate: 5 },
    { x: -10, y: 22, rotate: -3 },
    { x: 20, y: -16, rotate: 7 },
    { x: -16, y: 10, rotate: 4 },
  ]

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title="The same trip, typed five times"
          description="A load gets quoted in a spreadsheet, confirmed by email, planned on a whiteboard, tracked in a telematics tab and billed in accounting software. Every copy drifts. Hexagen TMS keeps one record of the trip, and every screen reads it."
        />
        <motion.div
          className="mt-12 flex flex-col items-center gap-6"
          initial={reducedMotion ? false : 'scattered'}
          whileInView="settled"
          viewport={{ once: true, amount: 0.6 }}
          variants={{ settled: { transition: { staggerChildren: 0.12 } } }}
        >
          <ul className="flex flex-wrap justify-center gap-2" aria-label="What Hexagen TMS replaces">
            {product.replaces.map((item, i) => (
              <motion.li
                key={item}
                variants={{
                  scattered: { ...scatter[i % scatter.length], opacity: 0 },
                  settled: { x: 0, y: 0, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 20 } },
                }}
                className="relative rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm font-medium text-[var(--color-text-onlight-muted)]"
              >
                {item}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-3 top-1/2 h-0.5 origin-left rounded-full bg-[var(--color-primary)]/60"
                  variants={{
                    scattered: { scaleX: 0 },
                    settled: { scaleX: 1, transition: { delay: 0.7 + i * 0.12, duration: 0.35 } },
                  }}
                />
              </motion.li>
            ))}
          </ul>
          <motion.span
            variants={{ scattered: { opacity: 0, y: -8 }, settled: { opacity: 1, y: 0, transition: { delay: 1.4 } } }}
          >
            <ArrowDown className="size-5 text-[var(--color-primary)]" aria-hidden="true" />
          </motion.span>
          <motion.p
            variants={{
              scattered: { opacity: 0, scale: 0.6 },
              settled: { opacity: 1, scale: 1, transition: { delay: 1.55, type: 'spring', stiffness: 300, damping: 18 } },
            }}
            className="rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow-primary)]"
          >
            One record of the trip
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}

function Lifecycle() {
  // overflow-x-clip: the truck's rail is translated by its own width, so it must not widen the page.
  return (
    <section className="overflow-x-clip bg-[var(--color-surface-muted)] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From quote to invoice without retyping"
          description="Each step picks up where the last one left off, on the same trip."
        />
        <TmsRoad />
      </Container>
    </section>
  )
}

function Tour() {
  return (
    <section id="tour" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Product tour"
          title="See it run, screen by screen"
          description="Two and a half minutes through the real product — pick a chapter to jump straight to the part you care about."
        />
        <AnimatedSection delay={0.05} className="mt-14">
          <TmsTour />
        </AnimatedSection>
      </Container>
    </section>
  )
}

function Modules() {
  return (
    <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What's inside"
          title="Everything the office and the cab need"
          description="Orders, dispatch, tracking, documents, email, invoicing, reporting and a driver app — one product, one record."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.modules.map((module, i) => {
            const Icon = module.icon
            return (
              <AnimatedSection
                key={module.label}
                delay={(i % 4) * 0.06}
                tilt
                className="group flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-primary)]/40"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-[var(--color-text-onlight)]">{module.label}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
                    {module.description}
                  </span>
                </span>
              </AnimatedSection>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/**
 * Hena, shown as one exchange that plays out when it scrolls into view: the
 * question lands, Hena "types", then the answer and its three orders arrive.
 * An illustration of the kind of answer Hena gives, labelled as such; reduced
 * motion shows the finished exchange.
 */
function Hena() {
  const reducedMotion = useReducedMotion()
  const appear = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    shown: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  })

  return (
    <section className="relative overflow-hidden bg-gradient-ink py-20 sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              tone="dark"
              eyebrow="Hena AI assistant · Beta"
              title="Hena reads the operation. People decide."
              description="Ask in plain language and Hena answers from your trips, orders and inbox. It is off until you turn it on, each feature has its own switch, and nothing it produces changes a load, a trip, an order or an invoice."
            />
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.hena.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            className="w-full max-w-lg justify-self-center lg:justify-self-end"
            initial={reducedMotion ? false : 'hidden'}
            whileInView="shown"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="rounded-[var(--radius-xl)] bg-white/[0.04] p-5 shadow-[var(--shadow-glow-primary)] ring-1 ring-white/10">
              <motion.div variants={appear(0)} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-primary)] px-4 py-2.5 text-sm text-white">
                  {product.hena.question}
                </p>
              </motion.div>
              <motion.div variants={appear(0.5)} className="mt-4 flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
                <div className="relative flex-1 rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
                  {!reducedMotion ? <TypingDots /> : null}
                  <motion.p variants={appear(1.5)} className="text-sm text-white">
                    {product.hena.answer}
                  </motion.p>
                  <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-white/70">
                    {product.hena.rows.map((row, i) => (
                      <motion.li key={row.ref} variants={appear(1.75 + i * 0.15)} className="flex justify-between gap-3">
                        <span>{row.ref}</span>
                        <span className={row.tone === 'ok' ? 'text-emerald-300' : 'text-amber-300'}>{row.state}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-white/50">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Illustration of a Hena answer · suggestions only — people decide
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/** Three dots that pulse while Hena "thinks", then fade out before the answer lands. */
function TypingDots() {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute left-4 top-4 flex gap-1"
      variants={{ hidden: { opacity: 0 }, shown: { opacity: [0, 1, 1, 0], transition: { delay: 0.6, duration: 0.9, times: [0, 0.1, 0.85, 1] } } }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-white/70"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: 2, delay: 0.6 + i * 0.12 }}
        />
      ))}
    </motion.span>
  )
}

function Audiences() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Who it's for"
          title="One record, a view for every person"
          description="Everyone who touches a trip works from the same record — each with the screen that fits their job."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.audiences.map((audience, i) => {
            const Icon = audience.icon
            return (
              <AnimatedSection
                key={audience.label}
                delay={i * 0.06}
                className="rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] p-6"
              >
                <Icon className="size-6 text-[var(--color-primary-dark)]" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-[var(--color-text-onlight)]">{audience.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{audience.description}</p>
              </AnimatedSection>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function TrustAndIntegrations() {
  return (
    <section className="bg-[var(--color-surface-muted)] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Made in Canada"
          title="Built to fit the way you already work"
          description="Canadian hosting, both official languages, and connections to the tools your office and your trucks already use."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {product.trust.map((point, i) => {
            const Icon = point.icon
            return (
              <AnimatedSection
                key={point.label}
                delay={i * 0.06}
                className="flex gap-4 rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-[var(--color-text-onlight)]">{point.label}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
                    {point.description}
                  </span>
                </span>
              </AnimatedSection>
            )
          })}
        </div>
      </Container>

      {/* Integrations: a slow marquee (static under reduced motion via .animate-marquee's own rule) */}
      <div className="mt-16">
        <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-[var(--color-text-onlight-muted)]">
          Connects to
        </h3>
        <div className="marquee-mask mt-6 overflow-hidden">
          <div className="animate-marquee flex w-max gap-3">
            <IntegrationRow />
            <IntegrationRow hidden />
          </div>
        </div>
      </div>
    </section>
  )
}

function IntegrationRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-3" aria-label={hidden ? undefined : 'Integrations'} aria-hidden={hidden || undefined}>
      {product.integrations.map((name) => (
        <li
          key={name}
          className="whitespace-nowrap rounded-full border border-[var(--color-surface-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-text-onlight-muted)] shadow-[var(--shadow-soft)]"
        >
          {name}
        </li>
      ))}
    </ul>
  )
}

function Plans() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Start small or run the whole fleet"
          description="Two plans, priced in Canadian dollars."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {product.plans.map((plan, i) => (
            <AnimatedSection
              key={plan.name}
              delay={i * 0.08}
              tilt
              className={cn(
                'relative flex flex-col rounded-[var(--radius-xl)] p-7',
                plan.featured
                  ? 'border border-[var(--color-primary)]/40 bg-white shadow-[var(--shadow-glow-primary)]'
                  : 'border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)]',
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-7 rounded-full bg-gradient-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  14-day free trial
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-[var(--color-text-onlight)]">{plan.name}</h3>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-1.5">
                <span className="font-display text-4xl font-bold tracking-tight text-[var(--color-text-onlight)]">{plan.price}</span>
                <span className="text-sm text-[var(--color-text-onlight-muted)]">{plan.unit}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{plan.summary}</p>
              <p className="mt-2 flex-1 text-xs text-[var(--color-text-onlight-muted)]">{plan.footnote}</p>
              <div className="mt-6">
                <Button href={plan.href} external variant={plan.featured ? 'primary' : 'secondary'} className="w-full">
                  {plan.cta}
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--color-text-onlight-muted)]">
          Annual prepay, AI credits, self-hosting and every detail are on the{' '}
          <a
            href={product.pricingHref}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-[var(--color-primary-dark)] underline-offset-4 hover:underline"
          >
            full Hexagen TMS pricing page
          </a>
          .
        </p>
      </Container>
    </section>
  )
}
