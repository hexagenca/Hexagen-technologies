import {
  Gauge,
  Timer,
  Search,
  RefreshCcw,
  FileBarChart,
  Lightbulb,
} from 'lucide-react'
import type { IconType } from '@/types'

export interface OutcomeItem {
  title: string
  description: string
  icon: IconType
  /** Illustrative label only — not a verified Hexagen customer result. */
  illustrativeLabel: string
}

export const outcomes: OutcomeItem[] = [
  {
    title: 'Reduce manual processing',
    description: 'Automate repetitive document and data handling that currently requires manual review.',
    icon: Gauge,
    illustrativeLabel: 'Fewer manual steps',
  },
  {
    title: 'Improve response times',
    description: 'Give teams and customers instant, accurate answers instead of waiting on a person.',
    icon: Timer,
    illustrativeLabel: 'Faster workflows',
  },
  {
    title: 'Make internal knowledge searchable',
    description: 'Turn scattered documents and policies into a single, queryable source of truth.',
    icon: Search,
    illustrativeLabel: 'Better visibility',
  },
  {
    title: 'Automate repetitive work',
    description: 'Free your teams from repetitive multi-step tasks so they can focus on higher-value work.',
    icon: RefreshCcw,
    illustrativeLabel: 'Fewer manual steps',
  },
  {
    title: 'Generate reports faster',
    description: 'Produce recurring reports automatically instead of rebuilding them manually each cycle.',
    icon: FileBarChart,
    illustrativeLabel: 'Faster workflows',
  },
  {
    title: 'Improve decision-making',
    description: 'Give decision-makers direct, consistent answers grounded in real business data.',
    icon: Lightbulb,
    illustrativeLabel: 'Consistent responses',
  },
]
