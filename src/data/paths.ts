import { Compass, Code2, Plug, LifeBuoy } from 'lucide-react'
import type { IconType } from '@/types'

/**
 * "I need to…" self-segmentation paths for the starting-point selector. Each
 * path maps a visitor goal to the matching Hexagen service engagement. Content
 * is factual — no conceptual products.
 */
export interface AudiencePath {
  id: string
  goal: string
  /** What the visitor lands on: the live product or a Hexagen service. */
  kind: 'product' | 'service'
  name: string
  icon: IconType
  headline: string
  description: string
  href: string
  external?: boolean
  ctaLabel: string
}

export const audiencePaths: AudiencePath[] = [
  {
    id: 'roadmap',
    goal: 'Figure out where AI fits in my business',
    kind: 'service',
    name: 'AI Strategy & Consulting',
    icon: Compass,
    headline: 'Start with a practical AI roadmap',
    description:
      'We help you identify where AI can create the most value in your operations, prioritize the use cases worth building, and leave you with a realistic implementation plan — not a slide deck of hype.',
    href: '/services#strategy',
    ctaLabel: 'See strategy services',
  },
  {
    id: 'build',
    goal: 'Build a custom AI product or feature',
    kind: 'service',
    name: 'Custom AI Development',
    icon: Code2,
    headline: 'We design and build AI around your processes',
    description:
      'From assistants grounded in your own documents to document processing and workflow automation, we build production-ready AI systems tailored to your data, constraints and security requirements.',
    href: '/services#development',
    ctaLabel: 'See development services',
  },
  {
    id: 'integrate',
    goal: 'Connect AI to the systems we already run',
    kind: 'service',
    name: 'AI Integrations',
    icon: Plug,
    headline: 'AI that fits into your existing operations',
    description:
      'We connect AI systems to the platforms your teams already rely on, so automation reduces manual handoffs instead of creating another disconnected tool.',
    href: '/services#integrations',
    ctaLabel: 'See integration services',
  },
  {
    id: 'operate',
    goal: 'Keep a deployed AI system reliable',
    kind: 'service',
    name: 'Managed AI Services',
    icon: LifeBuoy,
    headline: 'We run and improve AI systems in production',
    description:
      'Deployed AI needs monitoring, maintenance and continuous improvement. We keep your systems reliable as your data, usage and business evolve.',
    href: '/services#managed-services',
    ctaLabel: 'See managed services',
  },
]
