import type { NavigationItem } from '@/types'
import { flagshipProduct } from '@/data/products'

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Products',
    path: '/products',
    children: [
      { label: 'DropWire', path: flagshipProduct.href, description: 'Real-time media capture — live', external: true },
      { label: 'HexaChat', path: '/products/hexachat', description: 'AI knowledge assistant' },
      { label: 'HexaDocs', path: '/products/hexadocs', description: 'Document intelligence' },
      { label: 'HexaFlow', path: '/products/hexaflow', description: 'Workflow automation' },
      { label: 'HexaInsights', path: '/products/hexainsights', description: 'Conversational analytics' },
      { label: 'View All Products', path: '/products' },
    ],
  },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  {
    label: 'Resources',
    children: [
      { label: 'Careers', path: '/careers', description: 'Join the Hexagen team' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  },
  { label: 'Contact', path: '/contact' },
]

export const footerNavigation = {
  products: [
    { label: 'DropWire', path: flagshipProduct.href, external: true },
    { label: 'HexaChat', path: '/products/hexachat' },
    { label: 'HexaDocs', path: '/products/hexadocs' },
    { label: 'HexaFlow', path: '/products/hexaflow' },
    { label: 'HexaInsights', path: '/products/hexainsights' },
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
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ],
}
