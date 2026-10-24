import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimationControls, useInView } from 'motion/react'
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Container } from '@/components/common/Container'
import { company } from '@/data/company'
import { footerNavigation } from '@/data/navigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FooterColumnProps {
  title: string
  links: { label: string; path: string; external?: boolean }[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.path}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ) : (
              <Link to={link.path} className="text-sm text-white/70 transition-colors hover:text-white">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// "HEXAGEN ◆ INNOVATE ◆ INTEGRATE ◆ ELEVATE" — the name followed by the slogan.
const railWords = [
  company.name.toUpperCase(),
  ...company.slogan
    .split('.')
    .map((word) => word.trim())
    .filter(Boolean)
    .map((word) => word.toUpperCase()),
]

/**
 * Desktop-only vertical rail on the footer's right edge carrying the name and
 * slogan. It drifts only while in view and stays static under reduced motion.
 * Decorative: the slogan is also printed in the footer's bottom row.
 */
function FooterRail() {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0 })
  const controls = useAnimationControls()

  useEffect(() => {
    if (reducedMotion) return
    if (inView) {
      void controls.start({ x: ['0%', '-50%'], transition: { duration: 26, repeat: Infinity, ease: 'linear' } })
    } else {
      controls.stop()
    }
  }, [inView, reducedMotion, controls])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative hidden w-14 shrink-0 overflow-hidden border-l border-white/10 lg:block"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex items-center gap-10 whitespace-nowrap"
          style={{ rotate: -90 }}
          animate={reducedMotion ? undefined : controls}
        >
          {[0, 1].map((copy) =>
            railWords.map((word, i) => (
              <span
                key={`${copy}-${word}-${i}`}
                className="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.35em] text-white/40"
              >
                {word}
                <span className="text-white/20" aria-hidden="true">
                  ◆
                </span>
              </span>
            )),
          )}
        </motion.div>
      </div>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-ink-900)] lg:flex">
      <Container className="flex-1 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo tone="light" size="lg" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Hexagen builds secure AI software that helps organizations automate operations, understand their
              data, and make faster decisions.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-white/40" aria-hidden="true" />
                <a href={company.phoneHref} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-white/40" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" aria-hidden="true" />
                <span>{company.address.full}</span>
              </li>
            </ul>
            <a
              href={company.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Hexagen on LinkedIn"
              className="mt-6 inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <FooterColumn title="Products" links={footerNavigation.products} />
          <FooterColumn title="Solutions" links={footerNavigation.solutions} />
          <FooterColumn title="Services" links={footerNavigation.services} />
          <FooterColumn title="Company" links={footerNavigation.company} />
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p className="text-sm text-white/50">{company.slogan}</p>
        </div>
      </Container>
      <FooterRail />
    </footer>
  )
}
