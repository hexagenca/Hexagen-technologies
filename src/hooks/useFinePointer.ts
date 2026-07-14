import { useEffect, useState } from 'react'

const QUERY = '(pointer: fine)'

/**
 * True when the device has a precise pointer (mouse/trackpad). Used to gate
 * cursor-following effects off touch devices, per the motion guidelines.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    const listener = (event: MediaQueryListEvent) => setFine(event.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return fine
}
