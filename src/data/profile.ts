// src/data/profile.ts

import { Profile, SocialLink, FunFact } from '@/types';

export const profile: Profile = {
  name: 'Alex Chen',
  title: [
    'AI Engineer',
    'Cyber Security Researcher',
    'Software Developer',
    'ML Systems Architect',
  ],
  tagline: 'Building intelligent systems that learn, protect, and scale.',
  bio: `Senior AI Engineer with 8+ years of experience designing and deploying production ML systems, securing critical infrastructure, and leading cross-functional teams. I specialize in the intersection of artificial intelligence and cybersecurity — building models that detect threats in real-time, architectures that scale to millions of requests, and tools that make developers more productive.

Previously Staff AI Engineer at a leading tech company where I architected the ML serving infrastructure powering 10M+ daily predictions. Before that, Security Researcher at a cybersecurity startup where I disclosed 15+ CVEs and built automated red-teaming frameworks.

I'm passionate about open source, technical writing, and mentoring the next generation of engineers. When not coding, you'll find me contributing to open-source ML libraries, speaking at conferences, or exploring the latest in AI safety research.`,
  email: 'alex.chen@email.com',
  location: 'San Francisco, CA',
  avatar: '/images/profile/avatar.jpg',
  resumeUrl: '/resume.pdf',
  social: [
    { platform: 'github', url: 'https://github.com/alexchen', label: 'GitHub' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/alexchen', label: 'LinkedIn' },
    { platform: 'twitter', url: 'https://twitter.com/alexchen', label: 'Twitter' },
    { platform: 'email', url: 'mailto:alex.chen@email.com', label: 'Email' },
    { platform: 'leetcode', url: 'https://leetcode.com/alexchen', label: 'LeetCode' },
    { platform: 'medium', url: 'https://medium.com/@alexchen', label: 'Medium' },
  ],
  funFacts: [
    { icon: '🌙', label: 'Night Owl', value: 'Best code after midnight' },
    { icon: '☕', label: 'Coffee Addict', value: '3+ cups daily' },
    { icon: '🏔️', label: 'Hiker', value: 'Summitted 12 peaks this year' },
    { icon: '🎮', label: 'Gamer', value: 'Speedrunner in spare time' },
    { icon: '📚', label: 'Reader', value: '50+ books/year' },
    { icon: '🎵', label: 'Musician', value: 'Plays guitar & synth' },
  ],
};