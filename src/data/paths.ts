import { QrCode, MessageSquareText, ScanSearch, Workflow, BarChart4 } from 'lucide-react'
import type { IconType, ProductStatus } from '@/types'
import { flagshipProduct } from '@/data/products'

/**
 * "I need to…" self-segmentation paths for the Enterprise-Gateway-style
 * starting-point selector. Each path maps a visitor goal to the right product
 * and destination. Content is factual: live products link out to the running
 * product, conceptual ones link to their detail page.
 */
export interface AudiencePath {
  id: string
  goal: string
  productName: string
  status: ProductStatus
  icon: IconType
  headline: string
  description: string
  href: string
  external?: boolean
  ctaLabel: string
}

export const audiencePaths: AudiencePath[] = [
  {
    id: 'capture',
    goal: 'Capture photos & documents from a phone',
    productName: 'DropWire',
    status: 'live',
    icon: QrCode,
    headline: 'DropWire turns any phone into a capture device',
    description:
      'Show a QR code and photos, documents, video, signatures and voice notes stream straight into your app in real time — no native install. It is live today, with SDKs for TypeScript, Python, PHP and React Native.',
    href: flagshipProduct.href,
    external: true,
    ctaLabel: 'Explore DropWire',
  },
  {
    id: 'answers',
    goal: 'Answer internal questions instantly',
    productName: 'HexaChat',
    status: 'concept',
    icon: MessageSquareText,
    headline: 'HexaChat answers from your own knowledge',
    description:
      'A secure assistant grounded in your documents, policies and procedures — with role-based access and verifiable citations, so teams get consistent answers without opening a ticket.',
    href: '/products/hexachat',
    ctaLabel: 'See HexaChat',
  },
  {
    id: 'documents',
    goal: 'Turn documents into structured data',
    productName: 'HexaDocs',
    status: 'concept',
    icon: ScanSearch,
    headline: 'HexaDocs extracts, classifies and validates',
    description:
      'Invoices, contracts and forms are classified, extracted and checked against your business rules — turning unstructured documents into clean, usable data with human review where it matters.',
    href: '/products/hexadocs',
    ctaLabel: 'See HexaDocs',
  },
  {
    id: 'automate',
    goal: 'Automate a multi-step process',
    productName: 'HexaFlow',
    status: 'concept',
    icon: Workflow,
    headline: 'HexaFlow coordinates work across systems',
    description:
      'Connect the tools your teams already use and automate multi-step processes end to end, with structured approvals and human-in-the-loop checkpoints for the steps that need judgement.',
    href: '/products/hexaflow',
    ctaLabel: 'See HexaFlow',
  },
  {
    id: 'insights',
    goal: 'Get answers from my business data',
    productName: 'HexaInsights',
    status: 'concept',
    icon: BarChart4,
    headline: 'HexaInsights answers in plain language',
    description:
      'Ask questions about your business data and get direct answers, automated reports and surfaced trends — unifying multiple sources into one consistent view for faster decisions.',
    href: '/products/hexainsights',
    ctaLabel: 'See HexaInsights',
  },
]
