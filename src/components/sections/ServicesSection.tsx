import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FeatureCard } from '@/components/common/FeatureCard'
import { Button } from '@/components/common/Button'
import { services } from '@/data/services'

export function ServicesSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="The implementation layer behind every product"
          description="Hexagen products are backed by hands-on services that get them running inside your business correctly."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, index) => (
            <FeatureCard
              key={service.slug}
              icon={service.icon}
              title={service.name}
              description={service.description}
              delay={index * 0.05}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button to="/services" variant="secondary" size="lg">
            View all services
          </Button>
        </div>
      </Container>
    </section>
  )
}
