import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  tone?: 'light' | 'dark'
}

export function Breadcrumbs({ items, tone = 'light' }: BreadcrumbsProps) {
  const mutedClass = tone === 'light' ? 'text-[var(--color-text-onlight-muted)]' : 'text-white/60'
  const linkClass = tone === 'light' ? 'hover:text-[var(--color-primary-dark)]' : 'hover:text-white'

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${mutedClass}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.path && !isLast ? (
                <Link to={item.path} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
              {!isLast ? <ChevronRight aria-hidden="true" className="size-3.5" /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
