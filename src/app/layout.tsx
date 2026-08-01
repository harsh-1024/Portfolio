// src/app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  preload: true,
});

const calSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cal',
  preload: true,
  weight: ['700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alexchen.dev'),
  title: {
    default: 'Alex Chen | AI Engineer, Cyber Security Researcher & Software Developer',
    template: '%s | Alex Chen',
  },
  description: 'Senior AI Engineer with 8+ years building production ML systems, securing infrastructure, and shipping scalable software. Specializing in LLMs, MLOps, and cybersecurity.',
  keywords: ['AI Engineer', 'Machine Learning', 'Cybersecurity', 'Software Developer', 'LLM', 'MLOps', 'Penetration Testing', 'Full Stack'],
  authors: [{ name: 'Alex Chen' }],
  creator: 'Alex Chen',
  publisher: 'Alex Chen',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexchen.dev',
    siteName: 'Alex Chen | Portfolio',
    title: 'Alex Chen | AI Engineer & Security Researcher',
    description: 'Senior AI Engineer building intelligent systems that learn, protect, and scale.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alex Chen - AI Engineer & Security Researcher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Chen | AI Engineer & Security Researcher',
    description: 'Senior AI Engineer building intelligent systems that learn, protect, and scale.',
    images: ['/images/og-image.jpg'],
    creator: '@alexchen',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#5B6EFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const htmlClass = 'scroll-smooth';

  return (
    <html lang="en" className={htmlClass} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://linkedin.com" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/images/profile/avatar.jpg" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} ${calSans.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Providers>
          <LoadingScreen minDuration={800} />
          {children}
        </Providers>
      </body>
    </html>
  );
}