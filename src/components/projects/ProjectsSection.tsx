// src/components/projects/ProjectsSection.tsx

'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { projects } from '@/data/projects';
import { PROJECT_CATEGORIES, SORT_OPTIONS } from '@/lib/constants';
import { Project, ProjectCategory } from '@/types';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { staggerContainer } from '@/lib/animations';

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'stars'>('newest');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Filter and sort projects
  const processedProjects = useMemo(() => {
    let result = projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'oldest':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        case 'stars':
          return 0; // Would need GitHub API for real stars
        default:
          return 0;
      }
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Update filtered projects for modal navigation
  useEffect(() => {
    setFilteredProjects(processedProjects);
  }, [processedProjects]);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const nextProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  }, [selectedProject, filteredProjects]);

  const prevProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  }, [selectedProject, filteredProjects]);

  const featuredProjects = projects.filter(p => p.featured);
  const regularProjects = processedProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="section" aria-label="Featured Projects">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle mx-auto">
            A selection of projects spanning AI, security, and distributed systems.
          </p>
        </ScrollReveal>

        {/* Controls */}
        <ScrollReveal variant="fadeUp" delay={100} className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
                aria-label="Search projects"
              />
            </div>

            {/* Filters & Sort */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory)}
                  className="input-field pl-10 pr-10 appearance-none bg-[var(--surface)] min-w-[150px]"
                  aria-label="Filter by category"
                >
                  {PROJECT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="input-field pr-10 appearance-none bg-[var(--surface)] min-w-[140px]"
                  aria-label="Sort projects"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <ScrollReveal variant="fadeUp" delay={200} className="mb-12">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-500)] rounded-full"></span>
              Featured
            </h3>
            <div className="grid lg:grid-cols-3 gap-5">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => openModal(project)}
                />
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* All Projects */}
        <ScrollReveal 
          asChild
          stagger
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => openModal(project)}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Empty state */}
        {regularProjects.length === 0 && featuredProjects.length === 0 && (
          <ScrollReveal variant="fadeUp" className="text-center py-16">
            <div className="text-[var(--text-muted)]">
              <p className="text-lg mb-2">No projects found</p>
              <p className="text-sm">Try adjusting your filters or search query</p>
            </div>
          </ScrollReveal>
        )}

        {/* Results count */}
        <ScrollReveal variant="fadeUp" delay={300} className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Showing {processedProjects.length} of {projects.length} projects
        </ScrollReveal>

        {/* Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
          onNext={nextProject}
          onPrev={prevProject}
        />
      </div>
    </section>
  );
}