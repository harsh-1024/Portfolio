// src/lib/seo.ts

import { Metadata } from 'next';

export interface SEOData {
  title: string;
  description: string;
  ogImage: string;
  canonicalUrl: string;
  twitterHandle?: string;
}

export function generateMetadata(data: SEOData): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.example.com';
  
  return {
    title: data.title,
    description: data.description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'website',
      url: data.canonicalUrl,
      siteName: 'Portfolio | AI Engineer & Security Researcher',
      images: [
        {
          url: data.ogImage,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.ogImage],
      creator: data.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'theme-color': '#5B6EFF',
    },
  };
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  jobTitle: ['AI Engineer', 'Cyber Security Researcher', 'Software Developer'],
  url: 'https://portfolio.example.com',
  sameAs: [
    'https://github.com/yourusername',
    'https://linkedin.com/in/yourusername',
    'https://twitter.com/yourusername',
  ],
  knowsAbout: [
    'Machine Learning',
    'Deep Learning',
    'Cybersecurity',
    'Penetration Testing',
    'Full Stack Development',
    'Cloud Architecture',
    'DevOps',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'University Name',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Current Company',
  },
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Portfolio | Your Name',
  url: 'https://portfolio.example.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://portfolio.example.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};