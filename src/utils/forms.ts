import type { ApiResult, CareerApplicationPayload, ContactPayload, DemoRequestPayload } from '@/types'
import { apiRequest } from './api'

/**
 * NOTE: these paths are placeholders. Point VITE_API_BASE_URL at a real
 * backend and confirm these routes (or update them) before going live.
 */
const ENDPOINTS = {
  demoRequest: '/api/demo-requests',
  contact: '/api/contact',
  careerApplication: '/api/careers/apply',
}

function isHoneypotTripped(honeypot: string): boolean {
  return honeypot.trim().length > 0
}

export async function submitDemoRequest(payload: DemoRequestPayload): Promise<ApiResult> {
  if (isHoneypotTripped(payload.honeypot)) {
    return { ok: true, message: 'Submission received.' }
  }

  const { honeypot: _honeypot, ...rest } = payload
  return apiRequest(ENDPOINTS.demoRequest, JSON.stringify(rest), true)
}

export async function submitContactForm(payload: ContactPayload): Promise<ApiResult> {
  if (isHoneypotTripped(payload.honeypot)) {
    return { ok: true, message: 'Submission received.' }
  }

  const { honeypot: _honeypot, ...rest } = payload
  return apiRequest(ENDPOINTS.contact, JSON.stringify(rest), true)
}

export async function submitCareerApplication(payload: CareerApplicationPayload): Promise<ApiResult> {
  if (isHoneypotTripped(payload.honeypot)) {
    return { ok: true, message: 'Submission received.' }
  }

  const formData = new FormData()
  formData.set('fullName', payload.fullName)
  formData.set('email', payload.email)
  formData.set('message', payload.message)
  if (payload.resume) {
    formData.set('resume', payload.resume)
  }

  return apiRequest(ENDPOINTS.careerApplication, formData, false)
}
