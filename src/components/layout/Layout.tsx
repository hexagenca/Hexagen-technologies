import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollProgress } from '@/components/common/ScrollProgress'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Layout() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-surface)]">
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="flex-1">
        {reducedMotion ? (
          <Outlet />
        ) : (
          // Enter-only route transition: each page rises in on navigation.
          // Keyed by pathname; no exit animation, so there is no stale-outlet
          // problem and back/forward stays instant-feeling.
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  )
}
