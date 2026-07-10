import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { SEO } from '@/components/layout/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | Hexagen" description="The page you are looking for could not be found." path="/404" noIndex />
      <section className="flex min-h-[70vh] items-center bg-white py-24">
        <Container className="max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-dark)]">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-onlight)] sm:text-4xl">
            We couldn&rsquo;t find that page
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-onlight-muted)]">
            The page you&rsquo;re looking for may have moved or no longer exists.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/" variant="primary" size="lg">
              Go to homepage
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
