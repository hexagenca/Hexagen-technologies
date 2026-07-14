import { Container } from '@/components/common/Container'
import { coreCapabilities } from '@/data/capabilities'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * A row of core capabilities. On capable devices it scrolls as a seamless,
 * continuous marquee (two duplicated tracks translated -50%, CSS-driven so it
 * runs off the main thread). Under reduced motion it collapses to a static,
 * centred, wrapping row with every item visible.
 */
export function CredibilityStrip() {
  const reducedMotion = useReducedMotion()

  const Item = ({ label, icon: Icon }: (typeof coreCapabilities)[number]) => (
    <span className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-[var(--color-text-onlight-muted)]">
      <Icon className="size-5 text-[var(--color-primary)]" strokeWidth={1.75} aria-hidden="true" />
      {label}
    </span>
  )

  if (reducedMotion) {
    return (
      <section className="border-b border-[var(--color-surface-border)] bg-white py-10">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {coreCapabilities.map((capability) => (
              <li key={capability.label}>
                <Item {...capability} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    )
  }

  return (
    <section className="border-b border-[var(--color-surface-border)] bg-white py-10" aria-label="Core capabilities">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee">
          {/* Two identical, equal-width tracks: translating -50% lands exactly
              on the second, so the loop is seamless. Only the first is read by
              assistive tech. */}
          <ul className="flex shrink-0 gap-x-10 pr-10">
            {coreCapabilities.map((capability) => (
              <li key={capability.label}>
                <Item {...capability} />
              </li>
            ))}
          </ul>
          <ul className="flex shrink-0 gap-x-10 pr-10" aria-hidden="true">
            {coreCapabilities.map((capability) => (
              <li key={`dup-${capability.label}`}>
                <Item {...capability} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
