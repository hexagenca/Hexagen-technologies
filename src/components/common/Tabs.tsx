import { useId, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

export interface TabItem {
  id: string
  label: string
}

interface TabsProps {
  tabs: TabItem[]
  activeId: string
  onChange: (id: string) => void
  label: string
  className?: string
  tone?: 'light' | 'dark'
}

export function Tabs({ tabs, activeId, onChange, label, className, tone = 'light' }: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const reducedMotion = useReducedMotion()
  // Namespaces the pill's layoutId so multiple Tabs instances never morph into each other.
  const groupId = useId()

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = tabs.length - 1

    if (nextIndex !== null) {
      event.preventDefault()
      const nextTab = tabs[nextIndex]
      if (nextTab) {
        onChange(nextTab.id)
        tabRefs.current[nextIndex]?.focus()
      }
    }
  }

  return (
    <LayoutGroup id={groupId}>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          'inline-flex flex-wrap items-center gap-1.5 rounded-full p-1.5',
          tone === 'light' ? 'bg-[var(--color-surface-alt)]' : 'bg-white/5',
          className,
        )}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'relative min-h-11 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
                isActive
                  ? tone === 'light'
                    ? 'text-[var(--color-primary-dark)]'
                    : 'text-[var(--color-ink-900)]'
                  : tone === 'light'
                    ? 'text-[var(--color-text-onlight-muted)] hover:text-[var(--color-text-onlight)]'
                    : 'text-white/60 hover:text-white',
                // Static active background when the sliding pill is disabled.
                isActive && reducedMotion && (tone === 'light' ? 'bg-white shadow-[var(--shadow-soft)]' : 'bg-white'),
              )}
            >
              {isActive && !reducedMotion ? (
                <motion.span
                  layoutId="tab-pill"
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 rounded-full bg-white',
                    tone === 'light' && 'shadow-[var(--shadow-soft)]',
                  )}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
