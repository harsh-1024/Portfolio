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
import { AdvancedFeatures } from '@/components/AdvancedFeatures';
import { SectionRegistryProvider } from '@/hooks/useSectionRegistry';
import { SectionObserver } from '@/components/common/SectionObserver';

export default function HomePage() {
  return (
    <SectionRegistryProvider>
      <AdvancedFeatures>
        <Navbar />
        
        <main id="main-content" role="main" className="overflow-y-auto">
          <SectionObserver id="hero">
            <HeroSection />
          </SectionObserver>
          <SectionObserver id="about">
            <AboutSection />
          </SectionObserver>
          <SectionObserver id="skills">
            <SkillsSection />
          </SectionObserver>
          <SectionObserver id="projects">
            <ProjectsSection />
          </SectionObserver>
          <SectionObserver id="experience">
            <ExperienceSection />
          </SectionObserver>
          <SectionObserver id="certifications">
            <CertificationsSection />
          </SectionObserver>
          <SectionObserver id="github">
            <GitHubSection />
          </SectionObserver>
          <SectionObserver id="blog">
            <BlogSection />
          </SectionObserver>
          <SectionObserver id="testimonials">
            <TestimonialsSection />
          </SectionObserver>
          <SectionObserver id="contact">
            <ContactSection />
          </SectionObserver>
        </main>

        <Footer />
      </AdvancedFeatures>
    </SectionRegistryProvider>
  );
}