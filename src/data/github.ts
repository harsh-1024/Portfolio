// src/data/github.ts

import { GitHubStats, ContributionDay, LanguageStat, Repository } from '@/types';

export const githubStats: GitHubStats = {
  totalRepos: 247,
  totalStars: 1234,
  totalForks: 3421,
  totalCommits: 8476,
  streak: 52,
  contributions: generateContributionGraph(),
  topLanguages: [
    { name: 'Python', percentage: 35, color: '#3776AB' },
    { name: 'TypeScript', percentage: 28, color: '#3178C6' },
    { name: 'Go', percentage: 18, color: '#00ADD8' },
    { name: 'Rust', percentage: 12, color: '#DEA584' },
    { name: 'JavaScript', percentage: 5, color: '#F7DF1E' },
    { name: 'Other', percentage: 2, color: '#6B7280' },
  ],
  topRepos: [
    {
      name: 'neural-shield',
      description: 'AI-powered real-time threat detection system',
      stars: 342,
      forks: 87,
      language: 'Python',
      url: 'https://github.com/alexchen/neural-shield',
      updatedAt: '2024-06-15',
    },
    {
      name: 'codeguard-ai',
      description: 'LLM-powered automated security code review',
      stars: 287,
      forks: 64,
      language: 'Python',
      url: 'https://github.com/alexchen/codeguard-ai',
      updatedAt: '2024-06-10',
    },
    {
      name: 'ml-observability',
      description: 'Production ML model monitoring platform',
      stars: 156,
      forks: 42,
      language: 'TypeScript',
      url: 'https://github.com/alexchen/ml-observability',
      updatedAt: '2024-05-28',
    },
    {
      name: 'securenet',
      description: 'eBPF-based zero-trust service mesh',
      stars: 134,
      forks: 38,
      language: 'Go',
      url: 'https://github.com/alexchen/securenet',
      updatedAt: '2024-04-20',
    },
    {
      name: 'edgeml-runtime',
      description: 'WebAssembly ML inference runtime',
      stars: 98,
      forks: 23,
      language: 'Rust',
      url: 'https://github.com/alexchen/edgeml-runtime',
      updatedAt: '2024-06-01',
    },
  ],
};

function generateContributionGraph(): ContributionDay[] {
  const contributions: ContributionDay[] = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const weekOfYear = Math.ceil((d.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    
    // Simulate realistic contribution pattern
    let count = 0;
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Weekdays
      count = Math.floor(Math.random() * 8) + 1;
      if (Math.random() < 0.1) count = Math.floor(Math.random() * 20) + 10; // Busy days
    } else if (Math.random() < 0.3) { // Some weekend activity
      count = Math.floor(Math.random() * 5) + 1;
    }
    
    // Add some streaks
    if (weekOfYear % 4 === 0 && dayOfWeek >= 1 && dayOfWeek <= 5) {
      count += Math.floor(Math.random() * 10) + 5;
    }
    
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 3) level = 1;
    else if (count <= 6) level = 2;
    else if (count <= 12) level = 3;
    else if (count > 12) level = 4;
    
    contributions.push({ date: dateStr, count, level });
  }
  
  return contributions;
}