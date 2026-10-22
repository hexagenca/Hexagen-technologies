import type { NavigationItem } from '@/types'
import { flagshipProduct } from '@/data/products'
import { tmsProduct } from '@/data/tms'

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Products',
    path: '/products',
    children: [
      { label: 'Hexagen TMS', path: tmsProduct.overviewPath, description: 'Transportation management — live' },
      { label: 'DropWire', path: flagshipProduct.href, description: 'Real-time mobile capture — live', external: true },
      { label: 'DropWire developer docs', path: flagshipProduct.docsHref, description: 'SDKs, guides and API reference', external: true },
      { label: 'All products', path: '/products', description: 'Every Hexagen product in one place' },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'AI Strategy & Consulting', path: '/services#strategy', description: 'Roadmaps and prioritized use cases' },
      { label: 'Custom AI Development', path: '/services#development', description: 'Purpose-built AI products and features' },
      { label: 'AI Integrations', path: '/services#integrations', description: 'AI connected to your existing systems' },
      { label: 'Managed AI Services', path: '/services#managed-services', description: 'Monitoring and continuous improvement' },
      { label: 'All services', path: '/services' },
    ],
  },
  { label: 'Solutions', path: '/solutions' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
]

export const footerNavigation = {
  products: [
    { label: 'Hexagen TMS', path: tmsProduct.overviewPath },
    { label: 'DropWire', path: flagshipProduct.href, external: true },
    { label: 'DropWire Docs', path: flagshipProduct.docsHref, external: true },
    { label: 'All Products', path: '/products' },
  ],
  solutions: [
    { label: 'Customer Support', path: '/solutions#customer-support' },
    { label: 'Operations', path: '/solutions#operations' },
    { label: 'Finance', path: '/solutions#finance' },
    { label: 'Human Resources', path: '/solutions#human-resources' },
    { label: 'Sales', path: '/solutions#sales' },
    { label: 'Legal & Compliance', path: '/solutions#legal-compliance' },
  ],
  services: [
    { label: 'AI Strategy & Consulting', path: '/services#strategy' },
    { label: 'Custom AI Development', path: '/services#development' },
    { label: 'AI Integrations', path: '/services#integrations' },
    { label: 'Data Engineering', path: '/services#data-engineering' },
    { label: 'Managed AI Services', path: '/services#managed-services' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ],
}
