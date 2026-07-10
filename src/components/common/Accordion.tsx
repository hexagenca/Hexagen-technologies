import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

export interface AccordionEntry {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionEntry[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()
  const reducedMotion = useReducedMotion()

  return (
    <div className={cn('divide-y divide-[var(--color-surface-border)]', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-accordion-button-${index}`
        const panelId = `${baseId}-accordion-panel-${index}`

        return (
          <div key={item.question} className="py-2">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full min-h-11 items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[var(--color-text-onlight)]"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 text-[var(--color-text-onlight-muted)] transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 pr-8 text-[var(--color-text-onlight-muted)]">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
