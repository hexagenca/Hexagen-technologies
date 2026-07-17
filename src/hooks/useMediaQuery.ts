import { useCallback, useSyncExternalStore } from 'react'

/**
 * Tracks a CSS media query. Used to gate heavier desktop-only motion (pinned
 * scrollytelling, parallax) off small screens, per the motion guidelines.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', onStoreChange)
      return () => mediaQuery.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
