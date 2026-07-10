import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function FormField({ label, htmlFor, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--color-text-onlight)]">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-[var(--color-primary-dark)]">
            {' '}
            *
          </span>
        ) : (
          <span className="text-[var(--color-text-onlight-muted)]"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const inputClasses =
  'min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-surface-border)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-text-onlight)] placeholder:text-[var(--color-text-onlight-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/25'
