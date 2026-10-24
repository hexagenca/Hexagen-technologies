import { useId } from 'react'
import { cn } from '@/utils/cn'

interface TmsLogoProps {
  /** 'light' renders for dark surfaces; 'dark' for light surfaces. */
  tone?: 'light' | 'dark'
  size?: 'sm' | 'lg'
  className?: string
}

// Colours from tms.hexagen.ca: the on-light mark from its header, the on-dark
// one from its app icon (white bars, blue-to-cyan road).
const palettes = {
  dark: { bars: '#0D2040', roadFrom: '#1A4688', roadTo: '#0BADD2', spark: '#0BADD2', text: 'text-[#0D2040]', tag: 'border-[#1A4688] text-[#1A4688]' },
  light: { bars: '#FFFFFF', roadFrom: '#1075DA', roadTo: '#4FE3FF', spark: '#E6FAFF', text: 'text-white', tag: 'border-[#4FE3FF] text-[#4FE3FF]' },
}

const sizes = {
  sm: { mark: 'size-8', word: 'text-lg', tag: 'text-[10px]' },
  lg: { mark: 'size-12 sm:size-14', word: 'text-2xl sm:text-3xl', tag: 'text-xs sm:text-sm' },
}

/**
 * The Hexagen TMS product logo, built the way tms.hexagen.ca builds it: the
 * "H" mark (two bars joined by a road, a sparkle at its end) beside "Hexagen"
 * set in Montserrat and an outlined "TMS" tag. Reads as "Hexagen TMS" to
 * assistive tech.
 */
export function TmsLogo({ tone = 'dark', size = 'sm', className }: TmsLogoProps) {
  const p = palettes[tone]
  const s = sizes[size]
  const gradientId = `tms-road-${useId()}`

  return (
    <span role="img" aria-label="Hexagen TMS" className={cn('inline-flex items-center gap-2.5', className)}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 128 128" className={cn('shrink-0', s.mark)}>
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="24" y1="0" x2="112" y2="0">
            <stop offset="0" stopColor={p.roadFrom} />
            <stop offset="1" stopColor={p.roadTo} />
          </linearGradient>
        </defs>
        <rect x="26" y="28" width="16" height="72" rx="3" fill={p.bars} />
        <rect x="74" y="28" width="16" height="72" rx="3" fill={p.bars} />
        <path d="M18 104C18 82 34 64 56 64C78 64 88 58 94 42" fill="none" stroke={`url(#${gradientId})`} strokeWidth="14" strokeLinecap="round" />
        <path d="M18 104C18 82 34 64 56 64C78 64 88 58 94 42" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 6" />
        <circle cx="18" cy="104" r="6.5" fill="none" stroke={p.bars} strokeWidth="5" />
        <path d="M102 16C103.6 24.7 106.3 27.4 115 29C106.3 30.6 103.6 33.3 102 42C100.4 33.3 97.7 30.6 89 29C97.7 27.4 100.4 24.7 102 16Z" fill={p.spark} />
      </svg>
      <span aria-hidden="true" className="inline-flex items-center gap-2" style={{ fontFamily: 'Montserrat, var(--font-display)' }}>
        <span className={cn('font-bold tracking-tight', s.word, p.text)}>Hexagen</span>
        <span className={cn('rounded-md border-2 px-1.5 py-px font-bold tracking-[0.2em]', s.tag, p.tag)}>TMS</span>
      </span>
    </span>
  )
}
