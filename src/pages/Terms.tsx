import { SEO } from '@/components/layout/SEO'
import { LegalPageLayout, type LegalSection } from '@/components/layout/LegalPageLayout'
import { company } from '@/data/company'

/**
 * PLACEHOLDER LEGAL CONTENT.
 * This draft must be reviewed and approved by qualified legal counsel
 * before it is treated as Hexagen's actual terms of service.
 */
const sections: LegalSection[] = [
  {
    heading: '1. Acceptance of terms',
    paragraphs: [
      `These Terms of Service are a draft template governing use of the ${company.name} website and products, pending legal review. By using this site, you agree to these terms once finalized.`,
    ],
  },
  {
    heading: '2. Use of the website',
    paragraphs: [
      'This website is provided for informational purposes about Hexagen products and services. You agree not to misuse the site, including attempting to disrupt its normal operation.',
    ],
  },
  {
    heading: '3. Intellectual property',
    paragraphs: [
      `Content on this site, including product names, descriptions, and branding, is the property of ${company.name} unless otherwise noted.`,
    ],
  },
  {
    heading: '4. Product and service terms',
    paragraphs: [
      'Use of Hexagen products (such as DropWire) and services is subject to separate agreements provided at the time of engagement.',
    ],
  },
  {
    heading: '5. Disclaimers',
    paragraphs: [
      'Information on this website is provided "as is" without warranties of any kind, express or implied, pending final legal language.',
    ],
  },
  {
    heading: '6. Limitation of liability',
    paragraphs: [
      `To the fullest extent permitted by law, ${company.name} will not be liable for indirect, incidental, or consequential damages arising from use of this site, pending final legal language.`,
    ],
  },
  {
    heading: '7. Governing law',
    paragraphs: [`These terms are intended to be governed by the laws of ${company.address.region}, ${company.address.country}, pending legal confirmation.`],
  },
  {
    heading: '8. Contact',
    paragraphs: [`Questions about these terms can be directed to ${company.email}.`],
  },
]

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Service | Hexagen" description="Hexagen's terms of service (draft, pending legal review)." path="/terms" />
      <LegalPageLayout
        title="Terms of Service"
        description="Draft placeholder content, pending legal review."
        breadcrumbLabel="Terms of Service"
        sections={sections}
      />
    </>
  )
}
