// src/types/index.ts

export interface Profile {
  name: string;
  title: string[];
  tagline: string;
  bio: string;
  email: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  social: SocialLink[];
  funFacts: FunFact[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'leetcode' | 'hackerrank' | 'medium' | 'youtube';
  url: string;
  label: string;
}

export interface FunFact {
  icon: string;
  label: string;
  value: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  icon: string;
  color: string;
  description?: string;
}

export type SkillCategory = 
  | 'all'
  | 'frontend' 
  | 'backend' 
  | 'ai-ml' 
  | 'cybersecurity' 
  | 'cloud' 
  | 'databases' 
  | 'languages' 
  | 'tools';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  techStack: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'archived';
  startDate: string;
  endDate?: string;
  highlights: string[];
  challenges?: string[];
  solutions?: string[];
}

export type ProjectCategory = 
  | 'all'
  | 'ai-ml' 
  | 'cybersecurity' 
  | 'fullstack' 
  | 'backend' 
  | 'frontend' 
  | 'devops' 
  | 'research' 
  | 'open-source';

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  logo: string;
  companyUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
  logo: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl: string;
  thumbnail: string;
  skills: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  project?: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
  url?: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  contributions: ContributionDay[];
  topLanguages: LanguageStat[];
  topRepos: Repository[];
  streak: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  priceRange?: string;
}

export interface SEOData {
  title: string;
  description: string;
  ogImage: string;
  twitterCard: 'summary_large_image';
  canonicalUrl: string;
  structuredData: object;
}