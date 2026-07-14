import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import type { Product } from '@/types'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ProductCard } from './ProductCard'
import { ProductMockup } from './ProductMockup'

/**
 * Pinned 3D product deck. The section is tall; while it fills the viewport the
 * products sit on a curved carousel and scroll progress rotates the deck so the
 * next product swings to the front. Transforms are a pure function of a scroll
 * MotionValue (no per-frame React state; the active index only updates when it
 * actually changes, to light the dots). Under prefers-reduced-motion it renders
 * an ordinary, fully accessible card grid instead — no pinning, no rotation.
 */

interface ProductCarousel3DProps {
  products: Product[]
  eyebrow: string
  title: string
  description?: string
}

const statusLabels: Record<Product['status'], string> = {
  live: 'Live',
  beta: 'Beta',
  concept: 'Concept',
}

/** The visible face of a deck card — a product summary. */
function CardFace({ product }: { product: Product }) {
  const Icon = product.icon
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-white shadow-[var(--shadow-elevated)]">
      <div className="relative p-3">
        <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-surface-border)] bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-onlight-muted)] backdrop-blur">
          {product.status === 'live' && <span className="size-1.5 rounded-full bg-emerald-500" />}
          {statusLabels[product.status]}
        </span>
        <ProductMockup type={product.mockup} compact />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-2">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold text-[var(--color-text-onlight)]">{product.name}</h3>
        </div>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
          {product.description}
        </p>
        <ul className="mb-6 grid grid-cols-2 gap-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-[var(--color-text-onlight)]">
              <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to={`/products/${product.slug}`}
          className="mt-auto flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-dark)]"
        >
          Learn More
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function DeckCard({
  index,
  count,
  active,
  progress,
  product,
}: {
  index: number
  count: number
  active: boolean
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  product: Product
}) {
  const last = count - 1
  const delta = (v: number) => index - v * last
  const x = useTransform(progress, (v) => `calc(-50% + ${delta(v) * 80}%)`)
  const rotateY = useTransform(progress, (v) => delta(v) * -34)
  const z = useTransform(progress, (v) => -Math.abs(delta(v)) * 280)
  const scale = useTransform(progress, (v) => 1 - Math.min(Math.abs(delta(v)) * 0.08, 0.24))
  const opacity = useTransform(progress, (v) => 1 - Math.min(Math.abs(delta(v)) * 0.4, 0.85))
  const zIndex = useTransform(progress, (v) => 100 - Math.round(Math.abs(delta(v)) * 10))

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[min(86vw,22rem)]"
      style={{ x, y: '-50%', rotateY, z, scale, opacity, zIndex }}
      // Only the front card takes focus/pointer; the rest stay out of the way.
      inert={!active}
    >
      <CardFace product={product} />
    </motion.div>
  )
}

export function ProductCarousel3D({ products, eyebrow, title, description }: ProductCarousel3DProps) {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const last = products.length - 1
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(last, Math.max(0, Math.round(v * last))))
  })

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-surface-muted)]"
      style={{ height: `${products.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden py-16">
        <Container>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </Container>

        <div
          className="relative mt-10 h-[30rem] w-full max-w-5xl"
          style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
        >
          {products.map((product, i) => (
            <DeckCard
              key={product.slug}
              index={i}
              count={products.length}
              active={active === i}
              progress={scrollYProgress}
              product={product}
            />
          ))}
        </div>

        {/* Progress dots + scroll affordance */}
        <div className="mt-6 flex items-center gap-2" aria-hidden="true">
          {products.map((product, i) => (
            <span
              key={product.slug}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? 'w-6 bg-[var(--color-primary)]' : 'w-1.5 bg-[var(--color-surface-border)]'
              }`}
            />
          ))}
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-widest text-[var(--color-text-onlight-muted)]">
          Scroll to explore
        </p>
      </div>
    </section>
  )
}

/**
 * Public entry point: the scroll-driven 3D deck on capable devices, an ordinary
 * card grid under reduced motion.
 */
export function ProductShowcaseDeck(props: ProductCarousel3DProps) {
  const reducedMotion = useReducedMotion()
  return reducedMotion ? <ProductGrid {...props} /> : <ProductCarousel3D {...props} />
}

/** Reduced-motion / fallback grid used when scroll-driven 3D isn't appropriate. */
export function ProductGrid({ products, eyebrow, title, description }: ProductCarousel3DProps) {
  return (
    <section className="bg-[var(--color-surface-muted)] py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} delay={index * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  )
}
