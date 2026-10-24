import { cn } from '@/utils/cn'

interface LogoProps {
  /** 'light' renders for dark surfaces (white wordmark); 'dark' for light surfaces. */
  tone?: 'light' | 'dark'
  size?: 'sm' | 'lg'
  className?: string
  markOnly?: boolean
}

const wordmarks = {
  light: '/logo/hexagen-wordmark-white.png',
  dark: '/logo/hexagen-wordmark-black.png',
}

const sizes = {
  sm: 'h-6 w-auto sm:h-7',
  lg: 'h-10 w-auto sm:h-12',
}

/**
 * Hexagen brand mark. The full logo is the official wordmark artwork in
 * `public/logo`; `markOnly` keeps a small SVG hexagon for tight spots where
 * the wordmark would be illegible. Every surface renders the brand through
 * this single component.
 */
export function Logo({ tone = 'dark', size = 'sm', className, markOnly = false }: LogoProps) {
  if (markOnly) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={cn('shrink-0', className)}
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
    )
  }

  return <img src={wordmarks[tone]} alt="Hexagen" className={cn(sizes[size], className)} />
}
