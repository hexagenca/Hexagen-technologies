import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { implementationProcess } from '@/data/process'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'

/**
 * Editorial scrollytelling for the engagement process. On desktop the section
 * pins while scrolling advances through the six steps — an index on the left
 * tracks position, the active step crossfades on the right behind an outlined
 * numeral, and a rail fills with overall progress. Scroll stays native (the
 * step index is derived from a MotionValue; React state changes only when the
 * step actually flips). Clicking an index row scrolls to that step, so the
 * sequence is also keyboard-navigable. On mobile and under reduced motion it
 * renders as a plain stacked list.
 */

const STEP_SCROLL_VH = 55

function PinnedProcess() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const steps = implementationProcess

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] })
  const stepIndex = useTransform(scrollYProgress, (p) =>
    Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length))),
  )
  useMotionValueEvent(stepIndex, 'change', (value) => setActive(value))
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  const scrollToStep = (index: number) => {
    const el = wrapperRef.current
    if (!el) return
    const scrollable = el.offsetHeight - window.innerHeight
    window.scrollTo({
      top: el.offsetTop + ((index + 0.5) / steps.length) * scrollable,
      behavior: 'smooth',
    })
  }

  const activeStep = steps[active]

  return (
    <div ref={wrapperRef} style={{ height: `${steps.length * STEP_SCROLL_VH + 100}vh` }}>
      {/* pt clears the floating navbar so centered content never sits under it. */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="How it works"
            title="A clear path from idea to working AI system"
            description="Every engagement follows the same disciplined process, whatever the size of the project."
          />

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-16">
            {/* Step index */}
            <ol className="flex flex-col">
              {steps.map((item, index) => {
                const isActive = index === active
                return (
                  <li key={item.step}>
                    <button
                      type="button"
                      onClick={() => scrollToStep(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-4 border-b border-[var(--color-surface-border)] py-3.5 text-left transition-colors duration-200',
                        isActive
                          ? 'text-[var(--color-text-onlight)]'
                          : 'text-[var(--color-text-onlight-muted)] hover:text-[var(--color-text-onlight)]',
                      )}
                    >
                      <span
                        className={cn(
                          'text-xs font-bold tabular-nums transition-colors duration-200',
                          isActive ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text-onlight-muted)]/60',
                        )}
                      >
                        {String(item.step).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-sm font-semibold">{item.title}</span>
                      <span
                        className={cn(
                          'h-px w-6 origin-left bg-gradient-brand transition-transform duration-300',
                          isActive ? 'scale-x-100' : 'scale-x-0',
                        )}
                        aria-hidden="true"
                      />
                      {/* Keep every description available to assistive tech even
                          though the stage shows only the active one. */}
                      <span className="sr-only">{item.description}</span>
                    </button>
                  </li>
                )
              })}
            </ol>

            {/* Active step stage */}
            <div className="relative flex min-h-[18rem] flex-col justify-center">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 right-0 select-none text-[10rem] font-black leading-none text-transparent"
                style={{ WebkitTextStroke: '2px rgba(99, 102, 241, 0.22)' }}
              >
                {String(activeStep.step).padStart(2, '0')}
              </span>
              {/* popLayout crossfades without a blank gap when scroll scrubs
                  through several steps quickly; min-h keeps the rail steady. */}
              <div className="relative min-h-[11rem]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeStep.step}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -26 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-md"
                  >
                  <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-dark)]">
                    Step {activeStep.step} of {steps.length}
                  </p>
                  <h3 className="text-3xl font-semibold tracking-tight text-[var(--color-text-onlight)]">
                    {activeStep.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-onlight-muted)]">
                    {activeStep.description}
                  </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Overall progress rail */}
              <div className="mt-6 h-1 max-w-md overflow-hidden rounded-full bg-[var(--color-surface-alt)]" aria-hidden="true">
                <motion.div className="h-full origin-left rounded-full bg-gradient-brand" style={{ scaleX: fill }} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

function StackedProcess({ animateFill }: { animateFill: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  // The connector fills as the steps scroll through the viewport — a
  // MotionValue drives scale directly (no state), softened with a spring.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.75', 'end 0.55'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <Container>
      <SectionHeading
        eyebrow="How it works"
        title="A clear path from idea to working AI system"
        description="Every engagement follows the same disciplined process, whatever the size of the project."
      />

      <div ref={trackRef} className="relative mt-16">
        <div aria-hidden="true" className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-surface-border)]" />
        {animateFill ? (
          <motion.div
            aria-hidden="true"
            className="absolute left-5 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)]"
            style={{ scaleY: fill }}
          />
        ) : null}

        <ol className="relative flex flex-col gap-10">
          {implementationProcess.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.08} className="relative flex gap-4 bg-white">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-white text-sm font-bold text-[var(--color-primary-dark)]">
                {item.step}
              </span>
              <div>
                <h3 className="mb-1.5 text-base font-semibold text-[var(--color-text-onlight)]">{item.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </ol>
      </div>
    </Container>
  )
}

export function HowItWorks() {
  const reducedMotion = useReducedMotion()
  // Pinning needs a viewport tall enough for the whole stage; shorter screens
  // get the stacked layout instead of a cropped scrollytelling scene.
  const desktop = useMediaQuery('(min-width: 1024px) and (min-height: 760px)')
  const pinned = desktop && !reducedMotion

  return (
    <section className={cn('bg-white', pinned ? '' : 'py-20 sm:py-28')}>
      {pinned ? <PinnedProcess /> : <StackedProcess animateFill={!reducedMotion} />}
    </section>
  )
}
