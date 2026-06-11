import HeroSection from "./sections/HeroSection.tsx";
import SocialProofSection from "./sections/SocialProofSection.tsx";
import FeaturesSection from "./sections/FeaturesSection.tsx";
import BenefitsSection from "./sections/BenefitsSection.tsx";
import HowItWorksSection from "./sections/HowItWorksSection.tsx";
import TestimonialsSection from "./sections/TestimonialsSection.tsx";
import FAQSection from "./sections/FAQSection.tsx";
import FinalCTASection from "./sections/FinalCTASection.tsx";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
