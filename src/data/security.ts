import { Lock, ShieldCheck, KeyRound, ScrollText, UserCheck, FlaskConical, Server } from 'lucide-react'
import type { SecurityPrinciple } from '@/types'

export const securityPrinciples: SecurityPrinciple[] = [
  {
    title: 'Data privacy',
    description: 'Your business data and documents remain within your controlled environment and are not used to train shared models.',
    icon: Lock,
  },
  {
    title: 'Encryption',
    description: 'Data is encrypted in transit and at rest, following enterprise security principles throughout the platform.',
    icon: ShieldCheck,
  },
  {
    title: 'Role-based permissions',
    description: 'Access to information and actions is scoped by role, so people only see and do what they are authorized for.',
    icon: KeyRound,
  },
  {
    title: 'Audit logs',
    description: 'Key actions, queries, and workflow steps are logged to support internal review and accountability.',
    icon: ScrollText,
  },
  {
    title: 'Human oversight',
    description: 'Sensitive or ambiguous decisions are routed to a person rather than being fully automated end-to-end.',
    icon: UserCheck,
  },
  {
    title: 'Model evaluation',
    description: 'AI models are evaluated against real business scenarios to understand performance and limitations before deployment.',
    icon: FlaskConical,
  },
  {
    title: 'Flexible deployment',
    description: 'Solutions can be configured to fit your existing infrastructure and data residency requirements.',
    icon: Server,
  },
]
