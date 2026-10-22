import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Camera, Truck } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { flagshipProduct } from '@/data/products'
import { tmsProduct } from '@/data/tms'
import type { IconType } from '@/types'

interface LineupItem {
  key: string
  icon: IconType
  name: ReactNode
  category: string
  tagline: string
  description: string
  points: string[]
  /** TMS has its own overview route; DropWire's overview is the section below on /products. */
  learnMore: { to: string; label: string } | { href: string; label: string }
  open: { href: string; label: string }
}

const ITEMS: LineupItem[] = [
  {
    key: tmsProduct.slug,
    icon: Truck,
    name: (
      <>
        Hexagen <span className="text-[var(--color-primary-dark)]">TMS</span>
      </>
    ),
    category: 'Transportation management',
    tagline: tmsProduct.tagline,
    description:
      'Quotes, dispatch, live tracking and invoicing for carriers and brokers — one record of the trip, with an offline-first driver app and the Hena AI assistant.',
    points: ['Dispatch boards & live fleet map', 'Driver app that works offline', 'Invoicing synced to QuickBooks, Xero & Zoho Books'],
    learnMore: { to: tmsProduct.overviewPath, label: 'Product overview' },
    open: { href: tmsProduct.href, label: 'Open Hexagen TMS' },
  },
  {
    key: flagshipProduct.slug,
    icon: Camera,
    name: (
      <>
        Drop<span className="text-[var(--color-primary-dark)]">Wire</span>
      </>
    ),
    category: 'Real-time mobile capture API',
    tagline: flagshipProduct.tagline,
    description:
      'Show a QR code and your customer’s photos, documents, video, signatures and voice notes stream straight into your app — no native install.',
    points: ['QR → mobile capture, live', 'SDKs for TypeScript, Python, PHP & React Native', 'AI add-ons and enterprise options'],
    learnMore: { href: '#dropwire', label: 'How it works' },
    open: { href: flagshipProduct.href, label: 'Explore DropWire' },
  },
]

/**
 * "Our products" grid at the top of /products — one card per live product,
 * each linking to its overview and out to the product itself.
 */
export function ProductLineup() {
  return (
    <section id="lineup" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our products"
          title="Two products, both live"
          description="Each is built on the principles we bring to client work: secure, connected to the tools you already use, and made in Canada."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <AnimatedSection
                key={item.key}
                delay={i * 0.08}
                tilt
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-elevated)] sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'var(--gradient-brand-soft)' }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand text-white shadow-[var(--shadow-glow-primary)]">
                    <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                    <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    Live
                  </span>
                </div>
                <p className="relative mt-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-onlight-muted)]">
                  {item.category}
                </p>
                <h3 className="relative mt-1.5 font-display text-2xl font-bold tracking-tight text-[var(--color-text-onlight)]">
                  {item.name}
                </h3>
                <p className="relative mt-1 text-base font-medium text-[var(--color-text-onlight)]">{item.tagline}</p>
                <p className="relative mt-3 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{item.description}</p>
                <ul className="relative mt-5 flex-1 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-[var(--color-text-onlight)]">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-7 flex flex-wrap gap-3">
                  {'to' in item.learnMore ? (
                    <Button to={item.learnMore.to} variant="primary">
                      {item.learnMore.label}
                    </Button>
                  ) : (
                    <Button href={item.learnMore.href} variant="primary">
                      {item.learnMore.label}
                    </Button>
                  )}
                  <Button
                    href={item.open.href}
                    external
                    variant="secondary"
                    icon={<ArrowUpRight className="size-4" aria-hidden="true" />}
                  >
                    {item.open.label}
                  </Button>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
