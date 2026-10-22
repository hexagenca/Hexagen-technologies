import type { ComponentType } from 'react'

export type IconType = ComponentType<{ className?: string; strokeWidth?: number }>

/**
 * Where a product sits on the maturity curve. Kept honest and visible in the
 * UI: DropWire and Hexagen TMS both ship today (`live`).
 */
export type ProductStatus = 'live' | 'beta'

/**
 * DropWire is Hexagen's shipping product and lives at its own domain, so it
 * links out rather than rendering an internal detail page, and carries the
 * visual bits (code sample, capture chips) its flagship showcase needs.
 */
export interface FlagshipProduct {
  slug: string
  name: string
  tagline: string
  description: string
  status: ProductStatus
  href: string
  docsHref: string
  highlights: { icon: IconType; label: string; description: string }[]
  codeSnippet: { text: string; kind: 'comment' | 'code' }[]
  captureChips: string[]
}

/** The fields structured data and cross-links need from any Hexagen product. */
export type ProductSummary = Pick<FlagshipProduct, 'slug' | 'name' | 'tagline' | 'description' | 'status' | 'href'>

export interface IconPoint {
  icon: IconType
  label: string
  description: string
}

/**
 * Hexagen TMS lives at its own domain like DropWire, but also has an overview
 * page on this site (`overviewPath`) carrying a real product recording.
 */
export interface TmsProduct extends ProductSummary {
  overviewPath: string
  productTourHref: string
  pricingHref: string
  trialHref: string
  highlights: IconPoint[]
  lifecycle: { icon: IconType; title: string; description: string }[]
  replaces: string[]
  tour: { src: { webm: string; mp4: string }; poster: string; durationSeconds: number; chapters: { label: string; at: number; caption: string }[] }
  modules: IconPoint[]
  audiences: IconPoint[]
  hena: { question: string; answer: string; rows: { ref: string; state: string; tone: 'ok' | 'warn' }[]; capabilities: string[] }
  integrations: string[]
  trust: IconPoint[]
  plans: { name: string; price: string; unit: string; summary: string; footnote: string; href: string; cta: string; featured?: boolean }[]
  demo: { tripId: string; lane: string; statuses: string[]; views: { icon: IconType; label: string }[] }
  faq: FAQ[]
}

export interface Service {
  slug: string
  name: string
  description: string
  icon: IconType
  outcomes: string[]
}

export interface Solution {
  slug: string
  name: string
  icon: IconType
  challenge: string
  approach: string
  benefit: string
  /** Service slugs (see `src/data/services.ts`) this solution draws on. */
  relatedServices: string[]
  exampleWorkflow: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface NavigationChild {
  label: string
  path: string
  description?: string
  /** Renders as an external anchor (new tab) rather than an internal route. */
  external?: boolean
}

export interface NavigationItem {
  label: string
  path?: string
  children?: NavigationChild[]
}

export interface OutcomeCard {
  title: string
  description: string
  metricLabel: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface IntegrationCategory {
  name: string
  icon: IconType
  examples: string[]
}

export interface SecurityPrinciple {
  title: string
  description: string
  icon: IconType
}

export interface JobOpening {
  title: string
  location: string
  type: string
  remote: boolean
  description: string
  responsibilities: string[]
  qualifications: string[]
}

export interface DemoRequestPayload {
  fullName: string
  workEmail: string
  company: string
  industry: string
  preferredProduct: string
  businessChallenge: string
  timeline: string
  phone: string
  message: string
  honeypot: string
}

export interface ContactPayload {
  fullName: string
  workEmail: string
  company: string
  message: string
  honeypot: string
}

export interface CareerApplicationPayload {
  fullName: string
  email: string
  message: string
  resume: File | null
  honeypot: string
}

export type FormPayload = DemoRequestPayload | ContactPayload | CareerApplicationPayload

export interface ApiResult<T = unknown> {
  ok: boolean
  message: string
  data?: T
}
