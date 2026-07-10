import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '@/data/products'
import { Tabs } from '@/components/common/Tabs'
import { ProductMockup } from './ProductMockup'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ProductShowcase() {
  const [activeSlug, setActiveSlug] = useState(products[0]?.slug ?? '')
  const reducedMotion = useReducedMotion()
  const activeProduct = products.find((product) => product.slug === activeSlug) ?? products[0]

  if (!activeProduct) return null

  const Icon = activeProduct.icon

  return (
    <div className="rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
      <div className="mb-8 flex justify-center lg:justify-start">
        <Tabs
          label="Select a Hexagen product to preview"
          tabs={products.map((product) => ({ id: product.slug, label: product.name }))}
          activeId={activeSlug}
          onChange={setActiveSlug}
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div
          role="tabpanel"
          id={`panel-${activeProduct.slug}`}
          aria-labelledby={`tab-${activeProduct.slug}`}
          tabIndex={0}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.slug}
              initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-2xl font-semibold text-[var(--color-text-onlight)]">{activeProduct.name}</h3>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-text-onlight-muted)]">
                {activeProduct.description}
              </p>
              <ul className="mb-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {activeProduct.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[var(--color-text-onlight)]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={`/products/${activeProduct.slug}`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow-primary)] transition-transform hover:brightness-110"
              >
                Explore {activeProduct.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.slug}
              initial={reducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductMockup type={activeProduct.mockup} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
