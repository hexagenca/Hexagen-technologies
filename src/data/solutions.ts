import { Headset, Settings2, Landmark, Users, TrendingUp, Scale } from 'lucide-react'
import type { Solution } from '@/types'

/**
 * Function-level solutions describe what Hexagen builds for each team through
 * its services — capability claims only, no invented products, customers or
 * metrics.
 */
export const solutions: Solution[] = [
  {
    slug: 'customer-support',
    name: 'Customer Support',
    icon: Headset,
    challenge:
      'Support teams face repetitive questions and rising ticket volume, making it hard to keep response times consistent.',
    approach:
      'We build AI assistants grounded in your actual documentation and policies, so agents and self-serve customers get consistent, cited answers — with escalation to a human for anything ambiguous.',
    benefit: 'Faster responses and more consistent answers across the support team.',
    relatedServices: ['development', 'integrations'],
    exampleWorkflow: [
      'A customer or agent asks a question in plain language',
      'The assistant searches your knowledge base for relevant policies and past resolutions',
      'A cited answer is returned, with escalation to a human for anything ambiguous',
    ],
  },
  {
    slug: 'operations',
    name: 'Operations',
    icon: Settings2,
    challenge:
      'Manual, multi-step processes create bottlenecks and inconsistent execution across operational teams.',
    approach:
      'We automate repetitive operational processes end-to-end — connected to the systems you already run, with approvals and human oversight kept where they matter.',
    benefit: 'Fewer manual steps and more consistent process execution.',
    relatedServices: ['development', 'integrations'],
    exampleWorkflow: [
      'An operational request or trigger enters the workflow',
      'The automation coordinates the relevant systems and required approvals',
      'The process completes with a full audit trail of every step',
    ],
  },
  {
    slug: 'finance',
    name: 'Finance',
    icon: Landmark,
    challenge:
      'Invoices, expense documents, and approvals require significant manual review before they can be processed.',
    approach:
      'We build document-processing pipelines that extract and validate financial data against your business rules, then route it through the right approval chain into your finance systems.',
    benefit: 'Less manual data entry and faster approval cycles.',
    relatedServices: ['development', 'data-engineering'],
    exampleWorkflow: [
      'An invoice or financial document is submitted',
      'Key fields are extracted and validated against your business rules',
      'Validated data is routed through approval and into your finance systems',
    ],
  },
  {
    slug: 'human-resources',
    name: 'Human Resources',
    icon: Users,
    challenge:
      'HR teams field repeated policy questions while manually coordinating onboarding tasks across departments.',
    approach:
      'We build assistants that answer policy questions directly from your HR documentation, and automations that coordinate onboarding steps across systems and teams.',
    benefit: 'Fewer repetitive questions reaching HR and smoother onboarding.',
    relatedServices: ['development', 'integrations'],
    exampleWorkflow: [
      'A new hire or employee has a policy question or onboarding need',
      'Policy questions are answered directly from your HR documentation',
      'Required onboarding tasks are coordinated across departments automatically',
    ],
  },
  {
    slug: 'sales',
    name: 'Sales',
    icon: TrendingUp,
    challenge:
      'Sales teams need fast visibility into pipeline and performance without waiting on manual reporting.',
    approach:
      'We connect and model your CRM and revenue data, then put a plain-language answer layer on top so sales leaders can ask direct questions about pipeline, performance and trends.',
    benefit: 'Faster visibility into performance and trends.',
    relatedServices: ['data-engineering', 'development'],
    exampleWorkflow: [
      'A sales leader asks a question about pipeline or performance',
      'The system queries connected CRM and business data',
      'A clear, direct answer or report is returned',
    ],
  },
  {
    slug: 'legal-compliance',
    name: 'Legal & Compliance',
    icon: Scale,
    challenge:
      'Contracts and compliance documents require careful review, and finding the current policy version can be slow.',
    approach:
      'We build review tooling that surfaces key clauses and obligations in contracts, alongside assistants that give teams instant access to the current version of every policy.',
    benefit: 'Faster document review and more consistent policy answers.',
    relatedServices: ['development', 'evaluation'],
    exampleWorkflow: [
      'A contract or compliance document is submitted for review',
      'Key clauses, obligations and risk areas are highlighted for the team',
      'Teams confirm current policy details through the internal assistant as needed',
    ],
  },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug)
}
