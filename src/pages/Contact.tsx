import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SEO } from '@/components/layout/SEO'
import { Container } from '@/components/common/Container'
import { ContactForm } from '@/components/forms/ContactForm'
import { company } from '@/data/company'
import { breadcrumbListStructuredData } from '@/utils/structuredData'

const contactCards = [
  {
    icon: Phone,
    title: 'Call us',
    lines: [company.phone],
    href: company.phoneHref,
  },
  {
    icon: Mail,
    title: 'Email us',
    lines: [company.email, company.supportEmail],
    href: `mailto:${company.email}`,
  },
  {
    icon: MapPin,
    title: 'Visit us',
    lines: [company.address.full],
  },
]

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Hexagen | Book a Demo"
        description="Get in touch with Hexagen to book a demo or ask about AI solutions for your business. Call, email, or send us a message."
        path="/contact"
        structuredData={[breadcrumbListStructuredData([{ label: 'Home', path: '/' }, { label: 'Contact', path: '/contact' }])]}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your AI project"
        description="Book a demo or send us a message about your process, data, or customer experience challenge."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contactCards.map((card) => (
              <div key={card.title} className="rounded-[var(--radius-xl)] border border-[var(--color-surface-border)] p-6 text-center">
                <span className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-gradient-brand-soft text-[var(--color-primary-dark)]">
                  <card.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-base font-semibold text-[var(--color-text-onlight)]">{card.title}</h3>
                {card.lines.map((line) =>
                  card.href ? (
                    <a key={line} href={card.href} className="block text-sm text-[var(--color-text-onlight-muted)] hover:text-[var(--color-primary-dark)]">
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-sm text-[var(--color-text-onlight-muted)]">
                      {line}
                    </p>
                  ),
                )}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-[var(--radius-2xl)] border border-[var(--color-surface-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-10">
            <h2 className="mb-1 text-2xl font-semibold text-[var(--color-text-onlight)]">Request a demo or send a message</h2>
            <p className="mb-8 text-sm text-[var(--color-text-onlight-muted)]">
              Fields marked with an asterisk are required. We typically respond within one business day.
            </p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
