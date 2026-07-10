import { SEO } from '@/components/layout/SEO'
import { LegalPageLayout, type LegalSection } from '@/components/layout/LegalPageLayout'
import { company } from '@/data/company'

/**
 * PLACEHOLDER LEGAL CONTENT.
 * This draft must be reviewed and approved by qualified legal counsel
 * before it is treated as Hexagen's actual privacy policy.
 */
const sections: LegalSection[] = [
  {
    heading: '1. Introduction',
    paragraphs: [
      `This Privacy Policy explains how ${company.name} ("we", "us", or "our") collects, uses, and protects information in connection with our website and products. It is a draft template pending legal review and does not yet reflect a finalized policy.`,
    ],
  },
  {
    heading: '2. Information we collect',
    paragraphs: [
      'We may collect information you provide directly, such as your name, email address, company, and message content when you submit a form on this site (for example, a demo request, contact form, or career application).',
      'We may also collect limited technical information automatically, such as browser type and general usage data, to help us maintain and improve the site.',
    ],
  },
  {
    heading: '3. How we use information',
    paragraphs: [
      'Information submitted through our forms is used to respond to inquiries, schedule demos, evaluate career applications, and provide requested information about our products and services.',
    ],
  },
  {
    heading: '4. Data sharing',
    paragraphs: [
      'We do not sell personal information. Information may be shared with service providers who help us operate our business (such as hosting or communication tools), subject to appropriate confidentiality obligations.',
    ],
  },
  {
    heading: '5. Data security',
    paragraphs: [
      `${company.name} applies enterprise security principles, including access controls and encryption, to protect information submitted through our site and products. No system can be guaranteed completely secure.`,
    ],
  },
  {
    heading: '6. Your choices',
    paragraphs: [
      `You may contact us at ${company.supportEmail} to ask questions about information you have submitted to us.`,
    ],
  },
  {
    heading: '7. Contact',
    paragraphs: [`Questions about this policy can be directed to ${company.email} or ${company.address.full}.`],
  },
]

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy | Hexagen" description="Hexagen's privacy policy (draft, pending legal review)." path="/privacy" />
      <LegalPageLayout
        title="Privacy Policy"
        description="Draft placeholder content, pending legal review."
        breadcrumbLabel="Privacy Policy"
        sections={sections}
      />
    </>
  )
}
