import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/common/Button'
import { MobileMenu } from './MobileMenu'
import { mainNavigation } from '@/data/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/utils/cn'

export function Navbar() {
  const scrolled = useScrolled(16)
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Reset transient nav state whenever the route changes. Derived during
  // render (React's recommended pattern for this) rather than in an effect,
  // so it happens before paint instead of causing an extra render pass.
  const [lastPathname, setLastPathname] = useState(location.pathname)
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname)
    setMobileOpen(false)
    setOpenDropdown(null)
  }

  useLockBodyScroll(mobileOpen)

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setOpenDropdown(null)
      }
    }
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isSolid = scrolled || mobileOpen

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isSolid ? 'glass-dark border-b border-white/10' : 'border-b border-transparent bg-transparent',
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <nav className="mx-auto flex h-20 max-w-[var(--container-wide)] items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Primary">
        <NavLink to="/" className="flex items-center" aria-label="Hexagen home">
          <Logo tone="light" />
        </NavLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) => {
            if (item.children) {
              const isOpen = openDropdown === item.label
              const isActive = item.children.some((child) => location.pathname.startsWith(child.path))

              return (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className={cn(
                      'flex min-h-11 items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-white' : 'text-white/75 hover:text-white',
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn('size-4 transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {isOpen ? (
                      <ul
                        role="menu"
                        aria-label={item.label}
                        className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-white p-2 shadow-[var(--shadow-elevated)]"
                      >
                        {item.children.map((child) => (
                          <li key={child.path} role="none">
                            <NavLink
                              role="menuitem"
                              to={child.path}
                              className={({ isActive: childActive }) =>
                                cn(
                                  'flex min-h-11 flex-col justify-center rounded-[var(--radius-md)] px-3.5 py-2.5 text-sm transition-colors',
                                  childActive
                                    ? 'bg-[var(--color-surface-alt)] text-[var(--color-primary-dark)]'
                                    : 'text-[var(--color-text-onlight)] hover:bg-[var(--color-surface-alt)]',
                                )
                              }
                            >
                              <span className="font-semibold">{child.label}</span>
                              {child.description ? (
                                <span className="text-xs text-[var(--color-text-onlight-muted)]">{child.description}</span>
                              ) : null}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </AnimatePresence>
                </li>
              )
            }

            return (
              <li key={item.label}>
                <NavLink
                  to={item.path ?? '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-white' : 'text-white/75 hover:text-white',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button to="/contact" variant="primary" size="md" className="hidden sm:inline-flex">
            Book a Demo
          </Button>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full text-white lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <MobileMenu menuId="mobile-menu" items={mainNavigation} onNavigate={() => setMobileOpen(false)} />
        ) : null}
      </AnimatePresence>
    </header>
  )
}
