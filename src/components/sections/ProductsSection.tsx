import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProductCard } from '@/components/products/ProductCard'
import { products } from '@/data/products'

export function ProductsSection() {
  return (
    <section id="products" className="bg-[var(--color-surface-muted)] py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="AI products designed for practical business impact"
          description="Four focused products, each built to solve a specific operational problem — and designed to work together as your needs grow."
        />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} delay={index * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  )
}
