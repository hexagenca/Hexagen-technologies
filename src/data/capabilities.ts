import { Cpu, ShieldCheck, Workflow, Plug, LineChart } from 'lucide-react'
import type { IconType } from '@/types'

export interface Capability {
  label: string
  icon: IconType
}

export const coreCapabilities: Capability[] = [
  { label: 'AI product engineering', icon: Cpu },
  { label: 'Secure cloud architecture', icon: ShieldCheck },
  { label: 'Intelligent automation', icon: Workflow },
  { label: 'Enterprise integrations', icon: Plug },
  { label: 'Data and analytics', icon: LineChart },
]
