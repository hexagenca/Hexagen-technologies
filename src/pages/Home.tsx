import { SEO } from '@/components/layout/SEO'
import { Hero } from '@/components/sections/Hero'
import { CredibilityStrip } from '@/components/sections/CredibilityStrip'
import { FlagshipShowcase } from '@/components/sections/FlagshipShowcase'
import { KineticBand } from '@/components/sections/KineticBand'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AudiencePaths } from '@/components/sections/AudiencePaths'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { BusinessOutcomes } from '@/components/sections/BusinessOutcomes'
import { SolutionsSection } from '@/components/sections/SolutionsSection'
import { IntegrationSection } from '@/components/sections/IntegrationSection'
import { SecuritySection } from '@/components/sections/SecuritySection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { organizationStructuredData } from '@/utils/structuredData'

export default function Home() {
  return (
    <>
      <SEO
        title="Hexagen | AI Products & Services for Modern Businesses"
        description="Hexagen ships DropWire — a live real-time mobile capture platform — and builds custom AI systems for workflow automation, document intelligence, and analytics."
        path="/"
        structuredData={[organizationStructuredData()]}
      />
      <Hero />
      <CredibilityStrip />
      <FlagshipShowcase />
      <KineticBand />
      <ServicesSection />
      <AudiencePaths />
      <HowItWorks />
      <BusinessOutcomes />
      <SolutionsSection />
      <IntegrationSection />
      <SecuritySection />
      <AboutSection />
      <FinalCTASection />
    </>
  )
}
