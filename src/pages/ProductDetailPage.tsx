import { Navigate, useParams } from 'react-router-dom'
import { SEO } from '@/components/layout/SEO'
import { ProductPageTemplate } from '@/components/products/ProductPageTemplate'
import { getProductBySlug } from '@/data/products'
import { softwareApplicationStructuredData, breadcrumbListStructuredData } from '@/utils/structuredData'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return <Navigate to="/products" replace />
  }

  return (
    <>
      <SEO
        title={`${product.name} | Hexagen`}
        description={product.description}
        path={`/products/${product.slug}`}
        structuredData={[
          softwareApplicationStructuredData(product),
          breadcrumbListStructuredData([
            { label: 'Home', path: '/' },
            { label: 'Products', path: '/products' },
            { label: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      <ProductPageTemplate product={product} />
    </>
  )
}
