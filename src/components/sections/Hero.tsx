import { motion, useMotionValue, useSpring, type Variants } from 'motion/react'
import { ArrowRight, ShieldCheck, Plug, BadgeCheck, MapPinned, Hexagon } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { Magnetic } from '@/components/common/Magnetic'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useFinePointer } from '@/hooks/useFinePointer'

const trustIndicators = [
  { label: 'Secure AI architecture', icon: ShieldCheck },
  { label: 'Custom integrations', icon: Plug },
  { label: 'Enterprise-ready', icon: BadgeCheck },
  { label: 'Built in Canada', icon: MapPinned },
]

// The company slogan, split so each word can rise in on its own beat. The
// middle word carries the brand gradient — a single accent, not three.
const sloganWords = [
  { text: 'Innovate.', gradient: false },
  { text: 'Integrate.', gradient: true },
  { text: 'Elevate.', gradient: false },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Company-level hero: what Hexagen is and what it offers, led by the brand
 * slogan. Text-forward and centred with generous whitespace — deliberately
 * about the company, not any one product. A faint hexagon motif (a nod to the
 * name) and a cursor-following spotlight give it depth without a product UI.
 */
export function Hero() {
  const reducedMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const spotlight = !reducedMotion && finePointer

  // Cursor-following spotlight: pointer position drives a springy MotionValue,
  // never React state, so scroll/paint stay smooth.
  const SIZE = 520
  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })

  return (
    <section
      className="relative overflow-hidden bg-gradient-ink pb-24 pt-36 sm:pb-32 sm:pt-48"
      onPointerMove={
        spotlight
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect()
              mx.set(e.clientX - r.left - SIZE / 2)
              my.set(e.clientY - r.top - SIZE / 2)
            }
          : undefined
      }
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />

      {/* Faint hexagon motif — a static nod to the Hexagen name, not a product. */}
      <Hexagon
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-24 size-[22rem] text-white/[0.04] sm:size-[30rem]"
        strokeWidth={0.5}
      />
      <Hexagon
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-16 size-[26rem] text-[var(--color-secondary)]/[0.06] sm:size-[34rem]"
        strokeWidth={0.5}
      />

      {spotlight ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 rounded-full"
          style={{
            width: SIZE,
            height: SIZE,
            x: sx,
            y: sy,
            background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(99,102,241,0) 70%)',
          }}
        />
      ) : null}
      {!reducedMotion ? (
        <motion.div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-[var(--color-secondary)]/20 blur-3xl"
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}

      <Container className="relative">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          variants={container}
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
        >
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur"
          >
            <Hexagon className="size-4 text-[var(--color-accent)]" strokeWidth={2} aria-hidden="true" />
            Canadian AI software company
          </motion.span>

          {/* The slogan leads. Each word is its own inline-block so it can rise
              in on stagger; the middle word carries the brand gradient. */}
          <motion.h1
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
            className="mt-7 flex flex-wrap justify-center gap-x-4 text-balance text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
          >
            {sloganWords.map((word) => (
              <motion.span
                key={word.text}
                variants={rise}
                className={word.gradient ? 'text-gradient-brand' : undefined}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-[var(--color-text-ondark-muted)] sm:text-xl"
          >
            Hexagen designs, builds and runs custom AI software — from strategy to production — that automates
            your operations, turns data into decisions, and helps your business move faster.
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button
                to="/services"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="size-4" aria-hidden="true" />}
              >
                Explore our services
              </Button>
            </Magnetic>
            <Button to="/contact" variant="outline-light" size="lg">
              Start a conversation
            </Button>
          </motion.div>

          <motion.ul variants={rise} className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {trustIndicators.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm text-white/70">
                <item.icon className="size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  )
}
