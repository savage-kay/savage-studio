import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="gold-line" />
      <AboutSection />
      <div className="gold-line" />
      <ProjectsSection />
      <SkillsSection />
      <div className="gold-line" />
      <ContactSection />
    </main>
  );
};

export default Index;
