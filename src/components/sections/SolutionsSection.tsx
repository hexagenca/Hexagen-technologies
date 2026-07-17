import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Button } from '@/components/common/Button'
import { solutions } from '@/data/solutions'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Solution } from '@/types'

/**
 * Business-function solutions. On desktop the section pins and the six cards
 * travel horizontally as the page scrolls — vertical scroll stays native and
 * proportional (a MotionValue maps progress to translateX; nothing intercepts
 * the wheel). Tabbing to a card scrolls the page so the focused card is
 * on-screen, keeping keyboard navigation equivalent to pointer use. On mobile
 * and under reduced motion it renders as the plain responsive grid.
 */

function SolutionCard({ solution, onFocusCard }: { solution: Solution; onFocusCard?: () => void }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-elevated)]">
      <span className="mb-4 inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
        <solution.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-onlight)]">{solution.name}</h3>
      <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{solution.challenge}</p>
      <p className="mb-4 text-sm font-medium leading-relaxed text-[var(--color-text-onlight)]">{solution.benefit}</p>
      <Link
        to={`/solutions#${solution.slug}`}
        onFocus={onFocusCard}
        className="group/link mt-auto flex min-h-11 w-fit items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-dark)]"
      >
        <span className="relative">
          Learn more
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-200 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
          />
        </span>
        <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  )
}

function HorizontalRail() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [maxShift, setMaxShift] = useState(0)

  // Measure how far the track must travel; re-measure on resize only — the
  // per-frame motion itself is a pure MotionValue transform.
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return
      setMaxShift(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth))
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    if (viewportRef.current) observer.observe(viewportRef.current)
    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -maxShift])
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  // Bring a card into view when it receives keyboard focus.
  const scrollToCard = (index: number) => {
    const el = wrapperRef.current
    if (!el) return
    const scrollable = el.offsetHeight - window.innerHeight
    const target = 0.06 + (index / (solutions.length - 1)) * 0.88
    window.scrollTo({ top: el.offsetTop + target * scrollable })
  }

  return (
    <div ref={wrapperRef} className="relative" style={{ height: '240vh' }}>
      {/* pt clears the floating navbar so centered content never sits under it. */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24">
        <Container className="w-full">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Solutions"
              title="Built around the way your teams already work"
              description="We build AI for the functions where manual work and scattered information slow teams down most."
            />
            <Button to="/solutions" variant="secondary" size="lg">
              Explore all solutions
            </Button>
          </div>
        </Container>

        <div ref={viewportRef} className="mt-12 w-full">
          <Container className="w-full">
            <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-6 pr-6">
              {solutions.map((solution, index) => (
                <div key={solution.slug} className="w-[20rem] shrink-0 sm:w-[23rem]">
                  <SolutionCard solution={solution} onFocusCard={() => scrollToCard(index)} />
                </div>
              ))}
            </motion.div>
          </Container>
        </div>

        <Container className="w-full">
          <div className="mt-10 h-1 max-w-sm overflow-hidden rounded-full bg-[var(--color-surface-alt)]" aria-hidden="true">
            <motion.div className="h-full origin-left rounded-full bg-gradient-brand" style={{ scaleX: fill }} />
          </div>
        </Container>
      </div>
    </div>
  )
}

function GridFallback() {
  return (
    <Container className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="Solutions"
        title="Built around the way your teams already work"
        description="We build AI for the functions where manual work and scattered information slow teams down most."
      />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution, index) => (
          <AnimatedSection key={solution.slug} delay={index * 0.06} className="h-full">
            <SolutionCard solution={solution} />
          </AnimatedSection>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button to="/solutions" variant="secondary" size="lg">
          Explore all solutions
        </Button>
      </div>
    </Container>
  )
}

export function SolutionsSection() {
  const reducedMotion = useReducedMotion()
  // The rail needs a viewport tall enough for heading + cards; shorter screens
  // get the grid instead of a cropped pinned stage.
  const desktop = useMediaQuery('(min-width: 1024px) and (min-height: 760px)')
  const rail = desktop && !reducedMotion

  return <section className="bg-[var(--color-surface-muted)]">{rail ? <HorizontalRail /> : <GridFallback />}</section>
}
