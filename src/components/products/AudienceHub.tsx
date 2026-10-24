import { useLayoutEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Truck } from 'lucide-react'
import { tmsProduct } from '@/data/tms'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

const { audiences, demo } = tmsProduct

interface Point {
  x: number
  y: number
}

/** Layout position relative to the document — unlike getBoundingClientRect, it ignores the entrance transforms. */
function offsetOf(el: HTMLElement): Point {
  let x = 0
  let y = 0
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    x += node.offsetLeft
    y += node.offsetTop
  }
  return { x, y }
}

const line: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number) => ({ pathLength: 1, opacity: 1, transition: { delay: 0.25 + i * 0.12, duration: 0.6, ease: 'easeOut' } }),
}

const role: Variants = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? -16 : 16 }),
  shown: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.55 + i * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] } }),
}

/**
 * "One record, a view for every person" drawn as a hub: the trip record sits in
 * the middle and a connector draws out to each person who reads it. On phones
 * the hub becomes the record followed by a rail of roles. Plays once on
 * scroll-in; under reduced motion everything is drawn from the start. The
 * diagram adds no information the role cards don't already state in text.
 */
export function AudienceHub() {
  const reducedMotion = useReducedMotion()
  const boxRef = useRef<HTMLDivElement>(null)
  const recordRef = useRef<HTMLDivElement>(null)
  const roleRefs = useRef<(HTMLLIElement | null)[]>([])
  const [geometry, setGeometry] = useState<{ width: number; height: number; from: Point; to: Point[] } | null>(null)

  // Measure where each connector starts (the record's centre — the card hides
  // the inner end) and ends (the node on the role card's inner edge). Re-runs
  // on resize only, never on scroll.
  useLayoutEffect(() => {
    const box = boxRef.current
    const record = recordRef.current
    if (!box || !record) return
    const measure = () => {
      const origin = offsetOf(box)
      const rel = (p: Point) => ({ x: p.x - origin.x, y: p.y - origin.y })
      const r = rel(offsetOf(record))
      setGeometry({
        width: box.offsetWidth,
        height: box.offsetHeight,
        from: { x: r.x + record.offsetWidth / 2, y: r.y + record.offsetHeight / 2 },
        to: roleRefs.current.map((li, i) => {
          if (!li) return { x: 0, y: 0 }
          const p = rel(offsetOf(li))
          return { x: i % 2 === 0 ? p.x + li.offsetWidth : p.x, y: p.y + li.offsetHeight / 2 }
        }),
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={boxRef}
      className="relative mt-14 lg:grid lg:grid-cols-[1fr_16rem_1fr] lg:grid-rows-2 lg:gap-x-16 lg:gap-y-8"
      initial={reducedMotion ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
    >
      {geometry ? (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        >
          {geometry.to.map((end, i) => (
            <motion.path
              key={i}
              custom={i}
              variants={line}
              d={`M${geometry.from.x} ${geometry.from.y} L${end.x} ${end.y}`}
              stroke="var(--color-primary)"
              strokeOpacity={0.6}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
            />
          ))}
        </svg>
      ) : null}

      {/* The record: the one thing every role below reads */}
      <motion.div
        ref={recordRef}
        variants={{ hidden: { opacity: 0, scale: 0.94 }, shown: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
        className="relative z-10 mx-auto w-full max-w-xs rounded-[var(--radius-xl)] bg-[var(--color-ink-900)] p-5 shadow-[var(--shadow-glow-primary)] ring-1 ring-white/10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">One trip record</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]">
            <Truck className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-sm font-semibold text-white">{demo.tripId}</span>
            <span className="block truncate text-xs text-white/60">{demo.lane}</span>
          </span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-white/60">Quote, dispatch, tracking and invoice — all on this record.</p>
      </motion.div>

      {/* Phones: a rail from the record down through each role */}
      <div className="relative mt-8 lg:contents">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-6 left-5 top-0 w-px origin-top bg-[var(--color-primary)]/40 lg:hidden"
          variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1, transition: { delay: 0.3, duration: 0.8, ease: 'easeOut' } } }}
        />
        <ul className="grid grid-cols-1 gap-4 pl-12 lg:contents lg:pl-0">
          {audiences.map((audience, i) => {
            const Icon = audience.icon
            return (
              <motion.li
                key={audience.label}
                ref={(el) => {
                  roleRefs.current[i] = el
                }}
                custom={i}
                variants={role}
                className={cn(
                  'relative z-10 rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)] lg:self-center',
                  i % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-3',
                  i < 2 ? 'lg:row-start-1' : 'lg:row-start-2',
                )}
              >
                {/* Node where the connector meets this card */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/15',
                    i % 2 === 0 ? '-left-[1.95rem] lg:left-auto lg:-right-[0.3125rem]' : '-left-[1.95rem] lg:-left-[0.3125rem]',
                  )}
                />
                <Icon className="size-6 text-[var(--color-primary-dark)]" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-[var(--color-text-onlight)]">{audience.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{audience.description}</p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </motion.div>
  )
}
