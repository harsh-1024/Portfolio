// src/app/sitemap.ts

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alexchen.dev';
  
  const routes = [
    '',
    '#about',
    '#skills',
    '#projects',
    '#experience',
    '#certifications',
    '#github',
    '#blog',
    '#testimonials',
    '#contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}