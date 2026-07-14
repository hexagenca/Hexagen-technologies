import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product, ProductStatus } from '@/types'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { ProductMockup } from './ProductMockup'
import { cn } from '@/utils/cn'

interface ProductCardProps {
  product: Product
  delay?: number
}

const statusStyles: Record<ProductStatus, { label: string; className: string }> = {
  live: { label: 'Live', className: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  beta: { label: 'Beta', className: 'border-amber-200 bg-amber-50 text-amber-700' },
  concept: { label: 'Concept', className: 'border-[var(--color-surface-border)] bg-[var(--color-surface-alt)] text-[var(--color-text-onlight-muted)]' },
}

export function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const Icon = product.icon

  return (
    <AnimatedSection
      delay={delay}
      tilt
      className="group flex flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]"
    >
      <div className="relative p-3">
        <span
          className={cn(
            'absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
            statusStyles[product.status].className,
          )}
        >
          {product.status === 'live' && <span className="size-1.5 rounded-full bg-emerald-500" />}
          {statusStyles[product.status].label}
        </span>
        <ProductMockup type={product.mockup} compact />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-2">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-gradient-brand-soft text-[var(--color-primary-dark)]">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold text-[var(--color-text-onlight)]">{product.name}</h3>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">{product.description}</p>

        <ul className="mb-6 flex flex-col gap-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-[var(--color-text-onlight)]">
              <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className={cn('mt-auto flex items-center justify-between gap-4 border-t border-[var(--color-surface-border)] pt-4')}>
          <Link
            to={`/products/${product.slug}`}
            className="flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-dark)] transition-transform duration-200 group-hover:gap-2.5"
          >
            Learn More
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link to="/contact" className="flex min-h-11 items-center text-sm font-medium text-[var(--color-text-onlight-muted)] hover:text-[var(--color-text-onlight)]">
            Request Demo
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
