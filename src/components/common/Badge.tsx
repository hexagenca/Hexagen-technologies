import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps {
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
}

export function Badge({ children, className, tone = 'light' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide',
        tone === 'light'
          ? 'border-[var(--color-surface-border)] bg-[var(--color-surface-alt)] text-[var(--color-primary-dark)]'
          : 'border-white/15 bg-white/5 text-white/80',
        className,
      )}
    >
      {children}
    </span>
  )
}
