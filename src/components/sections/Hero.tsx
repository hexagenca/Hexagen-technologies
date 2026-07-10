import { motion } from 'motion/react'
import { ArrowRight, ShieldCheck, Plug, BadgeCheck, MapPinned } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { HeroVisual } from './HeroVisual'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const trustIndicators = [
  { label: 'Secure AI architecture', icon: ShieldCheck },
  { label: 'Custom integrations', icon: Plug },
  { label: 'Enterprise-ready', icon: BadgeCheck },
  { label: 'Built in Canada', icon: MapPinned },
]

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-gradient-ink pb-20 pt-40 sm:pb-28 sm:pt-48">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />
      {!reducedMotion ? (
        <motion.div
          aria-hidden="true"
          className="absolute -top-40 right-0 size-[36rem] rounded-full bg-[var(--color-secondary)]/20 blur-3xl"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI software built to move your business forward.
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-[var(--color-text-ondark-muted)]">
              Automate workflows, unlock insights, and create better customer experiences with secure AI
              solutions designed around your business.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/products" variant="primary" size="lg" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
                Explore Our Products
              </Button>
              <Button to="/contact" variant="outline-light" size="lg">
                Book an AI Consultation
              </Button>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {trustIndicators.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-white/70">
                  <item.icon className="size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
