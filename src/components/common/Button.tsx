import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { cn } from '@/utils/cn'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-light'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
}

interface ButtonAsButton extends BaseProps {
  to?: undefined
  href?: undefined
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  name?: string
  value?: string
  form?: string
  autoFocus?: boolean
}

interface ButtonAsLink extends BaseProps {
  to: string
  href?: undefined
}

interface ButtonAsAnchor extends BaseProps {
  href: string
  to?: undefined
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-brand text-white shadow-[var(--shadow-glow-primary)] hover:brightness-110',
  secondary:
    'bg-white text-[var(--color-text-onlight)] border border-[var(--color-surface-border)] shadow-[var(--shadow-soft)] hover:border-[var(--color-primary)]',
  ghost: 'bg-transparent text-[var(--color-text-onlight)] hover:bg-[var(--color-surface-alt)]',
  'outline-light': 'bg-white/5 text-white border border-white/25 hover:bg-white/10',
}

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, icon, onClick } = props
  const reducedMotion = useReducedMotion()

  const classes = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-200',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  const motionProps = reducedMotion
    ? {}
    : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }

  if ('to' in props && props.to) {
    return (
      <motion.div className="inline-block" {...motionProps}>
        <Link to={props.to} onClick={onClick} className={classes}>
          {children}
          {icon}
        </Link>
      </motion.div>
    )
  }

  if ('href' in props && props.href) {
    const external = 'external' in props && props.external
    return (
      <motion.div className="inline-block" {...motionProps}>
        <a
          href={props.href}
          onClick={onClick}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          {children}
          {icon}
        </a>
      </motion.div>
    )
  }

  const { type = 'button', disabled, name, value, form, autoFocus } = props as ButtonAsButton

  return (
    <motion.button
      type={type}
      disabled={disabled}
      name={name}
      value={value}
      form={form}
      autoFocus={autoFocus}
      className={classes}
      onClick={onClick}
      {...motionProps}
    >
      {children}
      {icon}
    </motion.button>
  )
}
