// src/app/page.tsx

import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { CertificationsSection } from '@/components/certifications/CertificationsSection';
import { GitHubSection } from '@/components/github/GitHubSection';
import { BlogSection } from '@/components/blog/BlogSection';
import { TestimonialsSection } from '@/components/testimonials/TestimonialsSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { AdvancedFeatures } from '@/components/AdvancedFeatures';

export default function HomePage() {
  return (
    <AdvancedFeatures>
      <Navbar />
      <ScrollProgress />
      
      <main id="main-content" role="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <GitHubSection />
        <BlogSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </AdvancedFeatures>
  );
}