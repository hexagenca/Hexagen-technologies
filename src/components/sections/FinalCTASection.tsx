import { CTASection } from '@/components/common/CTASection'
import { Button } from '@/components/common/Button'
import { Magnetic } from '@/components/common/Magnetic'

export function FinalCTASection() {
  return (
    <CTASection
      eyebrow="Let's talk"
      title="Ready to turn your AI idea into working software?"
      description="Tell us about your process, data, or customer experience challenge. We'll help you identify the right path forward."
    >
      <Magnetic>
        <Button to="/contact" variant="primary" size="lg">
          Book a Demo
        </Button>
      </Magnetic>
      <Button to="/contact" variant="outline-light" size="lg">
        Contact Our Team
      </Button>
    </CTASection>
  )
}
