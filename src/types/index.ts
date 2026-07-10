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

export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  icon: IconType
  color: 'indigo' | 'violet' | 'blue' | 'cyan'
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
