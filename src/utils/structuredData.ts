import { company } from '@/data/company'
import type { ProductSummary } from '@/types'

export function organizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: company.siteUrl,
    foundingDate: String(company.foundedYear),
    email: company.email,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
      postalCode: company.address.postalCode,
    },
    sameAs: [company.linkedin],
  }
}

export function softwareApplicationStructuredData(product: ProductSummary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: product.href,
    publisher: {
      '@type': 'Organization',
      name: company.name,
    },
  }
}

export function breadcrumbListStructuredData(items: { label: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${company.siteUrl}${item.path}`,
    })),
  }
}
