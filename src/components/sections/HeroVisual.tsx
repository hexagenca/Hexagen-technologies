import { motion } from 'motion/react'
import { ArrowDownToLine, Code2, Compass, LifeBuoy, Plug, QrCode, Smartphone } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { flagshipProduct } from '@/data/products'

const servicePillars = [
  { icon: Compass, label: 'Strategy' },
  { icon: Code2, label: 'Build' },
  { icon: Plug, label: 'Integrate' },
  { icon: LifeBuoy, label: 'Operate' },
]

/**
 * Hero illustration of what Hexagen actually ships: DropWire (the live capture
 * product) on top, and the four service pillars beneath it. Deliberately
 * schematic — a flow diagram, not a fake product interface. Capture chips
 * cascade in on a loop; everything collapses to a static diagram under
 * reduced motion.
 */
export function HeroVisual() {
  const reducedMotion = useReducedMotion()
  const float = (offset: number) =>
    reducedMotion
      ? {}
      : {
          animate: { y: [0, -offset, 0] },
          transition: { duration: 5 + offset / 4, repeat: Infinity, ease: 'easeInOut' as const },
        }

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-gradient-brand-soft blur-3xl" />

      <div
        role="img"
        aria-label="Diagram of Hexagen's offering: DropWire, the live real-time capture product, and services covering AI strategy, custom development, integration, and managed operations"
        className="relative rounded-[var(--radius-2xl)] border border-white/10 bg-[var(--color-ink-800)]/90 p-4 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:p-5"
      >
        <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs font-medium text-white/50">Products &amp; services</span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        {/* Product: DropWire capture flow */}
        <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-white">DropWire</p>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
              Live product
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-ink)]">
              <QrCode className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="h-px flex-1 border-t border-dashed border-white/25" aria-hidden="true" />
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]">
              <Smartphone className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="h-px flex-1 border-t border-dashed border-white/25" aria-hidden="true" />
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
              <ArrowDownToLine className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </div>
          <motion.ul
            className="mt-3.5 flex flex-wrap gap-1.5"
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
          >
            {flagshipProduct.captureChips.map((chip) => (
              <motion.li
                key={chip}
                variants={{ hidden: { opacity: 0, y: 8, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/75"
              >
                {chip}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Services: the four pillars */}
        <div className="mt-3 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-white">Custom AI services</p>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
              End to end
            </span>
          </div>
          <motion.ul
            className="grid grid-cols-4 gap-2"
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } } }}
          >
            {servicePillars.map((pillar) => (
              <motion.li
                key={pillar.label}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-1.5 rounded-[var(--radius-md)] bg-white/[0.05] px-1 py-2.5"
              >
                <pillar.icon className="size-4 text-[var(--color-primary-light)]" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-[10px] font-medium text-white/70">{pillar.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      <motion.div
        {...float(8)}
        className="absolute -right-6 -top-6 hidden items-center gap-2 rounded-full border border-white/10 bg-[var(--color-ink-800)]/95 px-4 py-2.5 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:flex"
      >
        <QrCode className="size-4 text-emerald-400" aria-hidden="true" />
        <span className="text-xs font-medium text-white">Scan → capture, live</span>
      </motion.div>

      <motion.div
        {...float(10)}
        className="absolute -bottom-7 -left-6 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[var(--color-ink-800)]/95 px-4 py-3 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:flex"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
          <Code2 className="size-4 text-[var(--color-accent)]" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">SDKs for every stack</p>
          <p className="mt-0.5 text-[10px] text-white/50">TypeScript · Python · PHP · React Native</p>
        </div>
      </motion.div>
    </div>
  )
}
