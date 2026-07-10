import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import type { NavigationItem } from '@/types'
import { Button } from '@/components/common/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

interface MobileMenuProps {
  items: NavigationItem[]
  onNavigate: () => void
  menuId: string
}

export function MobileMenu({ items, onNavigate, menuId }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      id={menuId}
      initial={reducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-[var(--color-ink-900)] px-5 pb-8 pt-4 lg:hidden"
    >
      <ul className="flex flex-col divide-y divide-white/10">
        {items.map((item) => {
          const isExpanded = expanded === item.label

          return (
            <li key={item.label} className="py-1">
              {item.children ? (
                <Fragment>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-submenu-${item.label}`}
                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                    className="flex min-h-12 w-full items-center justify-between py-3 text-left text-base font-semibold text-white"
                  >
                    {item.label}
                    <ChevronDown className={cn('size-4 transition-transform', isExpanded && 'rotate-180')} aria-hidden="true" />
                  </button>
                  {isExpanded ? (
                    <ul id={`mobile-submenu-${item.label}`} className="pb-2 pl-4">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            onClick={onNavigate}
                            className="block min-h-11 py-2.5 text-sm text-white/70 hover:text-white"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Fragment>
              ) : (
                <NavLink
                  to={item.path ?? '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn('block min-h-12 py-3 text-base font-semibold', isActive ? 'text-white' : 'text-white/80 hover:text-white')
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          )
        })}
      </ul>
      <div className="mt-6">
        <Button to="/contact" variant="primary" size="lg" onClick={onNavigate} className="w-full">
          Book a Demo
        </Button>
      </div>
    </motion.div>
  )
}
