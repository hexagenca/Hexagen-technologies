import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Link2, ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Container } from '@/components/common/Container'
import { company } from '@/data/company'
import { footerNavigation } from '@/data/navigation'

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

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-ink-900)]">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo tone="light" />
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
              <Link2 className="size-5" aria-hidden="true" />
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
    </footer>
  )
}
