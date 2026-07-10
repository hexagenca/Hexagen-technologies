import type { ApiResult } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined

export function isBackendConfigured(): boolean {
  return Boolean(API_BASE_URL)
}

/**
 * Thin fetch wrapper shared by every form service function. When
 * VITE_API_BASE_URL is not set (e.g. local development without a backend
 * yet), it returns a clear, honest message instead of faking a successful
 * submission — see src/utils/forms.ts for where this is surfaced to users.
 */
export async function apiRequest<T = unknown>(path: string, body: BodyInit, isJson: boolean): Promise<ApiResult<T>> {
  if (!isBackendConfigured()) {
    return {
      ok: false,
      message:
        'No backend is configured for this environment (VITE_API_BASE_URL is unset), so this submission was not sent anywhere. Set VITE_API_BASE_URL to connect a real endpoint — see .env.example.',
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: isJson ? { 'Content-Type': 'application/json' } : undefined,
      body,
    })

    if (!response.ok) {
      return { ok: false, message: `The server responded with an error (${response.status}). Please try again.` }
    }

    const data = (await response.json().catch(() => undefined)) as T | undefined
    return { ok: true, message: 'Submission received.', data }
  } catch {
    return { ok: false, message: 'We could not reach the server. Check your connection and try again.' }
  }
}
