import { SEO } from '@/components/layout/SEO'
import { Hero } from '@/components/sections/Hero'
import { CredibilityStrip } from '@/components/sections/CredibilityStrip'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { ProductShowcaseSection } from '@/components/sections/ProductShowcaseSection'
import { BusinessOutcomes } from '@/components/sections/BusinessOutcomes'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { SolutionsSection } from '@/components/sections/SolutionsSection'
import { IntegrationSection } from '@/components/sections/IntegrationSection'
import { SecuritySection } from '@/components/sections/SecuritySection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { organizationStructuredData } from '@/utils/structuredData'

export default function Home() {
  return (
    <>
      <SEO
        title="Hexagen | AI Software Solutions for Modern Businesses"
        description="Hexagen builds secure AI software for workflow automation, document intelligence, conversational analytics, and custom enterprise solutions."
        path="/"
        structuredData={[organizationStructuredData()]}
      />
      <Hero />
      <CredibilityStrip />
      <ProductsSection />
      <ProductShowcaseSection />
      <BusinessOutcomes />
      <HowItWorks />
      <SolutionsSection />
      <IntegrationSection />
      <SecuritySection />
      <ServicesSection />
      <CaseStudySection />
      <AboutSection />
      <FinalCTASection />
    </>
  )
}
