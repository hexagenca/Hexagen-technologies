import { CTASection } from '@/components/common/CTASection'
import { Button } from '@/components/common/Button'

export function FinalCTASection() {
  return (
    <CTASection
      eyebrow="Let's talk"
      title="Ready to turn your AI idea into working software?"
      description="Tell us about your process, data, or customer experience challenge. We'll help you identify the right path forward."
    >
      <Button to="/contact" variant="primary" size="lg">
        Book a Demo
      </Button>
      <Button to="/contact" variant="outline-light" size="lg">
        Contact Our Team
      </Button>
    </CTASection>
  )
}
