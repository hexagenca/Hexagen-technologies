import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { DropWireCaptureSim } from '@/components/products/DropWireCaptureSim'
import { flagshipProduct } from '@/data/products'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'

/**
 * Flagship showcase for DropWire — Hexagen's one live, shipping product. The
 * treatment deliberately mirrors DropWire's own site (dark canvas, indigo glow,
 * a terminal panel) so the brand carries across, and every CTA links out to the
 * live product rather than an internal detail page. All motion is
 * transform/opacity and collapses to static content under reduced motion.
 */
export function FlagshipShowcase({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion()
  const product = flagshipProduct

  // Gentle counter-scroll on the capture sim (desktop only): the demo drifts
  // against the page as the section passes, giving the panel physical depth.
  const sectionRef = useRef<HTMLElement>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const simY = useTransform(scrollYProgress, [0, 1], [44, -44])
  const parallax = desktop && !reducedMotion

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden bg-[var(--color-ink)] py-20 sm:py-28', className)}
      style={{ backgroundImage: 'var(--gradient-hero-glow)' }}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
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
              Drop<span className="text-[var(--color-primary-light)]">Wire</span>
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
                Explore DropWire
              </Button>
              <Button href={product.docsHref} external variant="outline-light" size="lg" icon={<BookOpen className="size-[1.125rem]" aria-hidden="true" />}>
                Developer docs
              </Button>
            </div>
          </AnimatedSection>

          {/* Live capture simulation — the product demonstrating itself */}
          <AnimatedSection delay={0.1} className="relative">
            <motion.div style={parallax ? { y: simY } : undefined} className="flex flex-col items-center">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[var(--radius-2xl)] opacity-70 blur-2xl"
                style={{ background: 'var(--gradient-brand-soft)' }}
              />
              <div className="relative flex w-full justify-center">
                <DropWireCaptureSim />
              </div>
              <code className="relative mt-6 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-xs text-white/60">
                const s = await dw.createSession()
              </code>
            </motion.div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
