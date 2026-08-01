// src/lib/constants.ts

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  base: 250,
  slow: 400,
  page: 400,
} as const;

export const Z_INDEX = {
  dropdown: 100,
  sticky: 200,
  modalBackdrop: 300,
  modal: 400,
  toast: 500,
  cursor: 9999,
} as const;

export const SCROLL_THRESHOLD = 100;

export const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certificates' },
  { href: '#github', label: 'GitHub' },
  { href: '#blog', label: 'Blog' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SOCIAL_LINKS = [
  { platform: 'github', href: 'https://github.com', label: 'GitHub', icon: 'Github' },
  { platform: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn', icon: 'Linkedin' },
  { platform: 'twitter', href: 'https://twitter.com', label: 'Twitter', icon: 'Twitter' },
  { platform: 'email', href: 'mailto:hello@example.com', label: 'Email', icon: 'Mail' },
  { platform: 'leetcode', href: 'https://leetcode.com', label: 'LeetCode', icon: 'Code' },
  { platform: 'medium', href: 'https://medium.com', label: 'Medium', icon: 'BookOpen' },
] as const;

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All', icon: 'LayoutGrid' },
  { id: 'frontend', label: 'Frontend', icon: 'Monitor' },
  { id: 'backend', label: 'Backend', icon: 'Server' },
  { id: 'ai-ml', label: 'AI/ML', icon: 'Brain' },
  { id: 'cybersecurity', label: 'Security', icon: 'Shield' },
  { id: 'cloud', label: 'Cloud', icon: 'Cloud' },
  { id: 'databases', label: 'Databases', icon: 'Database' },
  { id: 'languages', label: 'Languages', icon: 'Code' },
  { id: 'tools', label: 'Tools', icon: 'Wrench' },
] as const;

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI/ML' },
  { id: 'cybersecurity', label: 'Security' },
  { id: 'fullstack', label: 'Fullstack' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'devops', label: 'DevOps' },
  { id: 'research', label: 'Research' },
  { id: 'open-source', label: 'Open Source' },
] as const;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name', label: 'Name' },
  { value: 'stars', label: 'Stars' },
] as const;

export const EXPERIENCE_TYPES = [
  'full-time',
  'part-time',
  'contract',
  'internship',
  'freelance',
] as const;

export const CONTACT_FORM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What\'s this about?', required: true },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me about your project...', required: true },
] as const;

export const THEME_STORAGE_KEY = 'portfolio-theme';
export const THEME_DEFAULT = 'system';

export const COMMAND_PALETTE_ITEMS = [
  { section: 'Navigation', items: [
    { label: 'Home', action: () => scrollToSection('hero'), shortcut: '⌘H' },
    { label: 'About', action: () => scrollToSection('about'), shortcut: '⌘A' },
    { label: 'Skills', action: () => scrollToSection('skills'), shortcut: '⌘S' },
    { label: 'Projects', action: () => scrollToSection('projects'), shortcut: '⌘P' },
    { label: 'Experience', action: () => scrollToSection('experience'), shortcut: '⌘E' },
    { label: 'Contact', action: () => scrollToSection('contact'), shortcut: '⌘C' },
  ]},
  { section: 'Actions', items: [
    { label: 'Download Resume', action: () => window.open('/resume.pdf', '_blank'), shortcut: '⌘R' },
    { label: 'Copy Email', action: () => copyEmail(), shortcut: '⌘E' },
    { label: 'Toggle Theme', action: () => toggleTheme(), shortcut: '⌘T' },
  ]},
  { section: 'Social', items: [
    { label: 'GitHub', action: () => window.open('https://github.com', '_blank'), shortcut: '⌘G' },
    { label: 'LinkedIn', action: () => window.open('https://linkedin.com', '_blank'), shortcut: '⌘L' },
    { label: 'Twitter', action: () => window.open('https://twitter.com', '_blank'), shortcut: '⌘T' },
  ]},
] as const;

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function copyEmail() {
  navigator.clipboard.writeText('hello@example.com');
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  html.classList.remove(current);
  html.classList.add(next);
  localStorage.setItem(THEME_STORAGE_KEY, next);
}