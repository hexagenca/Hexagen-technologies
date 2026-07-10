import { Headset, Settings2, Landmark, Users, TrendingUp, Scale } from 'lucide-react'
import type { Solution } from '@/types'

export const solutions: Solution[] = [
  {
    slug: 'customer-support',
    name: 'Customer Support',
    icon: Headset,
    challenge:
      'Support teams face repetitive questions and rising ticket volume, making it hard to keep response times consistent.',
    approach:
      'HexaChat gives support teams and self-serve customers instant, cited answers pulled from your actual documentation and policies.',
    benefit: 'Faster responses and more consistent answers across the support team.',
    relatedProducts: ['hexachat', 'hexainsights'],
    exampleWorkflow: [
      'A customer or agent asks a question in plain language',
      'HexaChat searches the private knowledge base for relevant policies and past resolutions',
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
      'HexaFlow automates repetitive operational processes end-to-end while keeping approvals and oversight where they matter.',
    benefit: 'Fewer manual steps and more consistent process execution.',
    relatedProducts: ['hexaflow', 'hexadocs'],
    exampleWorkflow: [
      'An operational request or trigger enters the workflow',
      'HexaFlow coordinates the relevant systems and required approvals',
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
      'HexaDocs extracts and validates financial document data, while HexaFlow routes it through the right approval chain.',
    benefit: 'Less manual data entry and faster approval cycles.',
    relatedProducts: ['hexadocs', 'hexaflow'],
    exampleWorkflow: [
      'An invoice or financial document is submitted',
      'HexaDocs extracts and validates key fields',
      'HexaFlow routes the validated data through approval and into your finance systems',
    ],
  },
  {
    slug: 'human-resources',
    name: 'Human Resources',
    icon: Users,
    challenge:
      'HR teams field repeated policy questions while manually coordinating onboarding tasks across departments.',
    approach:
      'HexaChat answers policy questions directly, while HexaFlow coordinates onboarding steps across systems and teams.',
    benefit: 'Fewer repetitive questions reaching HR and smoother onboarding.',
    relatedProducts: ['hexachat', 'hexaflow'],
    exampleWorkflow: [
      'A new hire or employee has a policy question or onboarding need',
      'HexaChat answers policy questions directly from HR documentation',
      'HexaFlow coordinates any required onboarding tasks across departments',
    ],
  },
  {
    slug: 'sales',
    name: 'Sales',
    icon: TrendingUp,
    challenge:
      'Sales teams need fast visibility into pipeline and performance without waiting on manual reporting.',
    approach:
      'HexaInsights lets sales and revenue teams ask direct questions about pipeline, performance, and trends in plain language.',
    benefit: 'Faster visibility into performance and trends.',
    relatedProducts: ['hexainsights'],
    exampleWorkflow: [
      'A sales leader asks a question about pipeline or performance',
      'HexaInsights queries connected CRM and business data',
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
      'HexaDocs surfaces key clauses and obligations in contracts, while HexaChat gives teams instant access to current policies.',
    benefit: 'Faster document review and more consistent policy answers.',
    relatedProducts: ['hexadocs', 'hexachat'],
    exampleWorkflow: [
      'A contract or compliance document is submitted for review',
      'HexaDocs highlights key clauses, obligations, and risk areas',
      'Teams confirm current policy details through HexaChat as needed',
    ],
  },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug)
}
