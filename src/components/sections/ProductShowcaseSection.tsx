import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProductShowcase } from '@/components/products/ProductShowcase'

export function ProductShowcaseSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="See it in action"
          title="One workspace, four ways to put AI to work"
          description="Switch between products to see how each one fits into your business."
        />
        <div className="mt-12">
          <ProductShowcase />
        </div>
      </Container>
    </section>
  )
}
