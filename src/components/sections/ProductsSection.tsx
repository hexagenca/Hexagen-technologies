import { ProductShowcaseDeck } from '@/components/products/ProductCarousel3D'
import { products } from '@/data/products'

export function ProductsSection() {
  return (
    <ProductShowcaseDeck
      products={products}
      eyebrow="The applied-AI suite"
      title="What we're building beyond DropWire"
      description="Alongside our live product, we're developing four focused AI applications — each built to solve a specific operational problem, and designed to work together as your needs grow."
    />
  )
}
