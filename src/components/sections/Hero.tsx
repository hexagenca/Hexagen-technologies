import { motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowRight, ShieldCheck, Plug, BadgeCheck, MapPinned, Hexagon } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { Magnetic } from '@/components/common/Magnetic'
import { SplitText } from '@/components/common/SplitText'
import { HeroNetwork } from '@/components/sections/HeroNetwork'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useFinePointer } from '@/hooks/useFinePointer'

const trustIndicators = [
  { label: 'Secure AI architecture', icon: ShieldCheck },
  { label: 'Custom integrations', icon: Plug },
  { label: 'Enterprise-ready', icon: BadgeCheck },
  { label: 'Built in Canada', icon: MapPinned },
]

// The company slogan, revealed word by word. The middle word carries the
// brand gradient — a single accent, not three.
const slogan = [{ text: 'Innovate.' }, { text: 'Integrate.', className: 'text-gradient-brand' }, { text: 'Elevate.' }]

const rise = (delay: number) => ({ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const })
const hidden = { opacity: 0, y: 20 }
const shown = { opacity: 1, y: 0 }

/**
 * Company-level hero: what Hexagen is and what it offers, led by the name and
 * the brand slogan. Text-forward and centred with generous whitespace —
 * deliberately about the company, not any one product. Behind it, a faint
 * node network (see HeroNetwork) lights up around the cursor.
 */
export function Hero() {
  const reducedMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const interactive = !reducedMotion && finePointer

  // Pointer position drives springy MotionValues, never React state, so
  // scroll/paint stay smooth.
  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })

  return (
    <section
      className="relative overflow-hidden bg-gradient-ink pb-24 pt-36 sm:pb-32 sm:pt-48"
      onPointerMove={
        interactive
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect()
              mx.set(e.clientX - r.left)
              my.set(e.clientY - r.top)
            }
          : undefined
      }
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />

      <HeroNetwork pointerX={sx} pointerY={sy} interactive={interactive} />

      {!reducedMotion ? (
        <motion.div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-[var(--color-secondary)]/20 blur-3xl"
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}

      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.span
            initial={!reducedMotion && hidden}
            animate={shown}
            transition={rise(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur"
          >
            <Hexagon className="size-4 text-[var(--color-accent)]" strokeWidth={2} aria-hidden="true" />
            Canadian AI software company
          </motion.span>

          {/* Display wordmark. Hidden from assistive tech: the logo and the
              page title already name the company. */}
          <div aria-hidden="true" className="mt-6 w-full overflow-hidden">
            <SplitText
              segments={[{ text: 'HEXAGEN' }]}
              delay={0.22}
              className="w-full text-[clamp(3.5rem,13vw,8.5rem)] font-semibold leading-none tracking-tight text-white/90"
              style={{ fontFamily: 'var(--font-display)' }}
            />
          </div>

          <SplitText
            segments={slogan}
            as="h1"
            delay={0.34}
            className="mt-6 gap-x-4 text-balance text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
          />

          <motion.p
            initial={!reducedMotion && hidden}
            animate={shown}
            transition={rise(0.46)}
            className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-[var(--color-text-ondark-muted)] sm:text-xl"
          >
            Hexagen designs, builds and runs custom AI software — from strategy to production — that automates
            your operations, turns data into decisions, and helps your business move faster.
          </motion.p>

          <motion.div
            initial={!reducedMotion && hidden}
            animate={shown}
            transition={rise(0.58)}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
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

          <motion.ul
            initial={!reducedMotion && hidden}
            animate={shown}
            transition={rise(0.7)}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {trustIndicators.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm text-white/70">
                <item.icon className="size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  )
}
