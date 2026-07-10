import type { IconType } from '@/types'
import { AnimatedSection } from './AnimatedSection'
import { cn } from '@/utils/cn'

interface FeatureCardProps {
  icon: IconType
  title: string
  description: string
  footer?: string
  className?: string
  tone?: 'light' | 'dark'
  delay?: number
}

export function FeatureCard({ icon: Icon, title, description, footer, className, tone = 'light', delay = 0 }: FeatureCardProps) {
  return (
    <AnimatedSection
      delay={delay}
      className={cn(
        'group rounded-[var(--radius-xl)] border p-6 transition-all duration-300 hover:-translate-y-1',
        tone === 'light'
          ? 'border-[var(--color-surface-border)] bg-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20',
        className,
      )}
    >
      <div
        className={cn(
          'mb-4 inline-flex size-11 items-center justify-center rounded-[var(--radius-md)]',
          tone === 'light' ? 'bg-gradient-brand-soft text-[var(--color-primary-dark)]' : 'bg-white/10 text-[var(--color-accent)]',
        )}
      >
        <Icon className="size-6" strokeWidth={1.75} />
      </div>
      <h3 className={cn('mb-2 text-lg font-semibold', tone === 'light' ? 'text-[var(--color-text-onlight)]' : 'text-white')}>
        {title}
      </h3>
      <p className={cn('text-sm leading-relaxed', tone === 'light' ? 'text-[var(--color-text-onlight-muted)]' : 'text-[var(--color-text-ondark-muted)]')}>
        {description}
      </p>
      {footer ? (
        <p className={cn('mt-3 text-xs font-semibold uppercase tracking-wide', tone === 'light' ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-accent)]')}>
          {footer}
        </p>
      ) : null}
    </AnimatedSection>
  )
}
