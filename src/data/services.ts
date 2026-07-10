import {
  Compass,
  Code2,
  Plug,
  Database,
  CloudCog,
  FlaskConical,
  LifeBuoy,
} from 'lucide-react'
import type { Service } from '@/types'

export const services: Service[] = [
  {
    slug: 'strategy',
    name: 'AI Strategy & Consulting',
    description:
      'We help you identify where AI can create the most business value and build a practical roadmap to get there.',
    icon: Compass,
    outcomes: ['Clear AI roadmap', 'Prioritized use cases', 'Realistic implementation plan'],
  },
  {
    slug: 'development',
    name: 'Custom AI Development',
    description:
      'We design and build AI products and features tailored to your specific processes, data, and constraints.',
    icon: Code2,
    outcomes: ['Purpose-built AI features', 'Maintainable architecture', 'Production-ready systems'],
  },
  {
    slug: 'integrations',
    name: 'AI Integrations',
    description:
      'We connect AI systems to the platforms you already run, so automation fits into existing operations instead of replacing them.',
    icon: Plug,
    outcomes: ['Connected business systems', 'Reduced manual handoffs', 'Fewer duplicate workflows'],
  },
  {
    slug: 'data-engineering',
    name: 'Data Engineering',
    description:
      'We prepare, structure, and pipeline your data so AI systems have reliable, well-governed information to work with.',
    icon: Database,
    outcomes: ['Reliable data pipelines', 'Consistent data quality', 'AI-ready data structures'],
  },
  {
    slug: 'cloud-architecture',
    name: 'Cloud Architecture',
    description:
      'We design secure, scalable cloud environments that support AI workloads without unnecessary complexity or cost.',
    icon: CloudCog,
    outcomes: ['Scalable infrastructure', 'Right-sized cloud costs', 'Secure deployment architecture'],
  },
  {
    slug: 'evaluation',
    name: 'Model Evaluation',
    description:
      'We test and evaluate AI models against real business scenarios so performance and limitations are understood before launch.',
    icon: FlaskConical,
    outcomes: ['Validated model performance', 'Documented limitations', 'Informed deployment decisions'],
  },
  {
    slug: 'managed-services',
    name: 'Managed AI Services',
    description:
      'We monitor, maintain, and continuously improve deployed AI systems so they stay reliable as your business evolves.',
    icon: LifeBuoy,
    outcomes: ['Ongoing system reliability', 'Ongoing performance monitoring', 'Continuous improvement'],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
