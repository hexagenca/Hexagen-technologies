import { Users2, CloudCog, MessagesSquare, Database, Boxes, Braces } from 'lucide-react'
import type { IntegrationCategory } from '@/types'

export const integrationCategories: IntegrationCategory[] = [
  { name: 'CRM Platforms', icon: Users2, examples: ['Customer records', 'Pipeline data', 'Account activity'] },
  { name: 'Cloud Storage', icon: CloudCog, examples: ['Document repositories', 'File shares', 'Media assets'] },
  { name: 'Communication Tools', icon: MessagesSquare, examples: ['Team messaging', 'Email', 'Support inboxes'] },
  { name: 'Business Databases', icon: Database, examples: ['Operational data', 'Reporting stores', 'Data warehouses'] },
  { name: 'ERP Systems', icon: Boxes, examples: ['Finance modules', 'Inventory', 'Procurement'] },
  { name: 'Custom APIs', icon: Braces, examples: ['Internal tools', 'Proprietary systems', 'Legacy applications'] },
]
