import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SeoApproach from "@/components/sections/SeoApproach";
import SkillsSection from "@/components/sections/SkillsSection";
import SeoJourneySection from "@/components/sections/SeoJourneySection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ResultsDashboard from "@/components/sections/ResultsDashboard";
import SeoToolkit from "@/components/sections/SeoToolkit";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SeoApproach />
      <SkillsSection />
      <SeoJourneySection />
      <ProjectsSection />
      <ResultsDashboard />
      <SeoToolkit />
      <ContactSection />
    </div>
  );
}
