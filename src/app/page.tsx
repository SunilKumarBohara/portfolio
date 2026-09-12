import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SeoApproach from "@/components/sections/SeoApproach";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ResultsDashboard from "@/components/sections/ResultsDashboard";
import SeoToolkit from "@/components/sections/SeoToolkit";
import SeoLab from "@/components/sections/SeoLab";
import BlogSection from "@/components/sections/BlogSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SeoApproach />
      <SkillsSection />
      <ProjectsSection />
      <ResultsDashboard />
      <SeoToolkit />
      <SeoLab />
      <BlogSection />
      <TimelineSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
