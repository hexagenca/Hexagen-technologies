import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { audiencePaths } from '@/data/paths'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

/**
 * Enterprise-Gateway "Path selection (I am a…)" self-segmentation section
 * recommended by the ui-ux-pro-max design system. Visitors pick a goal and the
 * panel updates with the matching product and a route to it. Implemented as a
 * proper ARIA tablist (roving tabindex + arrow-key navigation); the panel
 * crossfades as the single animated element per view (ease-out, and instant
 * under reduced motion).
 */
export function AudiencePaths() {
  const reducedMotion = useReducedMotion()
  const [selected, setSelected] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = audiencePaths[selected]
  const ActiveIcon = active.icon

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = audiencePaths.length - 1
    let next: number
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = selected === last ? 0 : selected + 1
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = selected === 0 ? last : selected - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="get-started" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Find your starting point"
          title="Where should you start?"
          description="Tell us what you're trying to do and we'll point you to the right service engagement to get there."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
          {/* Path list (tablist) */}
          <ul
            role="tablist"
            aria-label="What do you need to do?"
            aria-orientation="vertical"
            className="flex flex-col gap-2.5"
            onKeyDown={onKeyDown}
          >
            {audiencePaths.map((path, index) => {
              const isActive = index === selected
              const Icon = path.icon
              return (
                <li key={path.id} role="presentation">
                  <button
                    ref={(el) => {
                      tabRefs.current[index] = el
                    }}
                    role="tab"
                    id={`path-tab-${path.id}`}
                    aria-selected={isActive}
                    aria-controls="path-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setSelected(index)}
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-3.5 rounded-[var(--radius-lg)] border px-4 py-3.5 text-left transition-colors duration-200',
                      isActive
                        ? 'border-[var(--color-primary)] bg-gradient-brand-soft'
                        : 'border-[var(--color-surface-border)] bg-white hover:border-[var(--color-primary-light)] hover:bg-[var(--color-surface-muted)]',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] transition-colors duration-200',
                        isActive
                          ? 'bg-white text-[var(--color-primary-dark)]'
                          : 'bg-[var(--color-surface-alt)] text-[var(--color-text-onlight-muted)]',
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-[var(--color-text-onlight)]">{path.goal}</span>
                    <ChevronRight
                      className={cn(
                        'size-4 shrink-0 transition-colors duration-200',
                        isActive ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text-onlight-muted)]',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Recommendation panel */}
          <div
            role="tabpanel"
            id="path-panel"
            aria-labelledby={`path-tab-${active.id}`}
            className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-[var(--color-surface-muted)] p-8 shadow-[var(--shadow-soft)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="flex h-full flex-col"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-brand text-white shadow-[var(--shadow-glow-primary)]">
                    <ActiveIcon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-[var(--color-text-onlight)]">{active.name}</p>
                    <span
                      className={cn(
                        'mt-0.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
                        active.kind === 'product'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-[var(--color-surface-border)] bg-[var(--color-surface-alt)] text-[var(--color-text-onlight-muted)]',
                      )}
                    >
                      {active.kind === 'product' && <span className="size-1.5 rounded-full bg-emerald-500" />}
                      {active.kind === 'product' ? 'Live product' : 'Service'}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[var(--color-text-onlight)]">{active.headline}</h3>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-text-onlight-muted)]">
                  {active.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                  {active.external ? (
                    <Button
                      href={active.href}
                      external
                      variant="primary"
                      icon={<ArrowUpRight className="size-4" aria-hidden="true" />}
                    >
                      {active.ctaLabel}
                    </Button>
                  ) : (
                    <Button to={active.href} variant="primary" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
                      {active.ctaLabel}
                    </Button>
                  )}
                  <Link
                    to="/contact"
                    className="flex min-h-11 items-center text-sm font-semibold text-[var(--color-text-onlight-muted)] transition-colors duration-200 hover:text-[var(--color-text-onlight)]"
                  >
                    Talk to our team
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
