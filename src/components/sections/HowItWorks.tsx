import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { implementationProcess } from '@/data/process'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HowItWorks() {
  const reducedMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  // The connector fills as the steps scroll through the viewport — a
  // MotionValue drives scale directly (no state), softened with a spring.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.75', 'end 0.55'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="A clear path from idea to working AI system"
          description="Every engagement follows the same disciplined process, whatever the size of the project."
        />

        <div ref={trackRef} className="relative mt-16">
          {/* Static track */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-surface-border)] lg:left-0 lg:right-0 lg:top-5 lg:bottom-auto lg:h-px lg:w-auto"
          />
          {/* Scroll-linked fill drawn over the track */}
          {!reducedMotion ? (
            <>
              <motion.div
                aria-hidden="true"
                className="absolute left-5 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] lg:hidden"
                style={{ scaleY: fill }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] lg:block"
                style={{ scaleX: fill }}
              />
            </>
          ) : null}

          <ol className="relative flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-4">
            {implementationProcess.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08} className="relative flex gap-4 bg-white lg:flex-1 lg:flex-col lg:gap-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-white text-sm font-bold text-[var(--color-primary-dark)] lg:mb-5">
                  {item.step}
                </span>
                <div>
                  <h3 className="mb-1.5 text-base font-semibold text-[var(--color-text-onlight)]">{item.title}</h3>
                  <p className="max-w-[15rem] text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
