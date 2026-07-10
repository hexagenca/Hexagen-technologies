import { cn } from '@/utils/cn'

interface LogoProps {
  /** 'light' renders for dark surfaces (white/gradient wordmark); 'dark' for light surfaces. */
  tone?: 'light' | 'dark'
  className?: string
  markOnly?: boolean
}

/**
 * Hexagen brand mark. Recreates the previous site's brand style: a hexagon
 * mark plus a "HEXAGEN" wordmark carrying the original indigo→violet gradient
 * (#4F46E5 → #7C3AED, matching the old .gradient-text treatment).
 *
 * Built in SVG/CSS so it stays crisp at any size. If an official raster/vector
 * logo asset is provided later, swap it in here — every surface renders the
 * brand through this single component.
 */
export function Logo({ tone = 'dark', className, markOnly = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="hexagenLogoGradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4F46E5" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path d="M16 1.5 L29.5 9v14L16 30.5 2.5 23V9Z" fill="url(#hexagenLogoGradient)" />
        <path
          d="M16 9 L23 12.9v7.8L16 24.6 9 20.7v-7.8Z"
          fill={tone === 'dark' ? '#FFFFFF' : 'var(--color-ink-900)'}
        />
      </svg>
      {markOnly ? null : (
        <span
          className="bg-clip-text text-lg font-bold tracking-tight text-transparent"
          style={{
            fontFamily: 'var(--font-display)',
            backgroundImage: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
          }}
        >
          HEXAGEN
        </span>
      )}
    </span>
  )
}
