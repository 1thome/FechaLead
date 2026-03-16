import { LandingHeader } from "@/components/landing/landing-header"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingProblems } from "@/components/landing/landing-problems"
import { LandingSolution } from "@/components/landing/landing-solution"
import { LandingProductDemo } from "@/components/landing/landing-product-demo"
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works"
import { LandingBenefits } from "@/components/landing/landing-benefits"
import { LandingSocialProof } from "@/components/landing/landing-social-proof"
import { LandingPlans } from "@/components/landing/landing-plans"
import { LandingFaq } from "@/components/landing/landing-faq"
import { LandingCta } from "@/components/landing/landing-cta"
import { LandingFooter } from "@/components/landing/landing-footer"
import { CloudBackground } from "@/components/ui/cloud-background"

export default function Home() {
  return (
    <CloudBackground className="min-h-screen">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingProblems />
        <LandingSolution />
        <LandingProductDemo />
        <LandingHowItWorks />
        <LandingBenefits />
        <LandingSocialProof />
        <LandingPlans />
        <LandingFaq />
        <LandingCta />
        <LandingFooter />
      </main>
    </CloudBackground>
  )
}
