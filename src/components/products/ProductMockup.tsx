import type { Product } from '@/types'
import { ChatMockup } from './ChatMockup'
import { DocumentMockup } from './DocumentMockup'
import { WorkflowMockup } from './WorkflowMockup'
import { InsightsMockup } from './InsightsMockup'
import { cn } from '@/utils/cn'

interface ProductMockupProps {
  type: Product['mockup']
  compact?: boolean
  className?: string
}

const mockupComponents = {
  chat: ChatMockup,
  documents: DocumentMockup,
  workflow: WorkflowMockup,
  insights: InsightsMockup,
} as const

export function ProductMockup({ type, compact = false, className }: ProductMockupProps) {
  const MockupComponent = mockupComponents[type]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-[var(--color-ink-800)] shadow-[var(--shadow-elevated)]',
        compact ? 'h-64' : 'h-[22rem] sm:h-[26rem]',
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark opacity-20" />
      <div className="relative h-full">
        <MockupComponent compact={compact} />
      </div>
    </div>
  )
}
