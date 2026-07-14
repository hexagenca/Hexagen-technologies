import type { ComponentType } from 'react'

export type IconType = ComponentType<{ className?: string; strokeWidth?: number }>

export interface ProductFAQ {
  question: string
  answer: string
}

export interface ProductUseCase {
  title: string
  description: string
}

/**
 * Where a product sits on the maturity curve. Kept honest and visible in the
 * UI: DropWire ships today (`live`); the applied-AI suite is still `concept`.
 */
export type ProductStatus = 'live' | 'beta' | 'concept'

export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  icon: IconType
  color: 'indigo' | 'violet' | 'blue' | 'cyan'
  status: ProductStatus
  features: string[]
  problem: string
  capabilities: { title: string; description: string }[]
  benefits: string[]
  howItWorks: { step: string; description: string }[]
  useCases: ProductUseCase[]
  security: string[]
  faqs: ProductFAQ[]
  mockup: 'chat' | 'documents' | 'workflow' | 'insights'
}

/**
 * DropWire is Hexagen's one shipping product and lives at its own domain, so it
 * is modelled separately from the conceptual `Product` suite: it links out
 * rather than rendering an internal detail page, and carries the visual bits
 * (code sample, capture chips) its flagship showcase needs.
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
  relatedProducts: string[]
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

export interface CaseStudy {
  isSample: true
  industry: string
  challenge: string
  solution: string
  implementation: string[]
  outcome: string[]
  quote: {
    text: string
    role: string
  }
  technologies: string[]
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
