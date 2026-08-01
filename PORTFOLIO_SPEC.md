# Portfolio Website - Architecture Specification

## Project Overview
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP + Three.js
**Deploy:** Vercel
**Content:** Placeholder data (to be replaced later)

---

## Folder Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── projects/
│   │   ├── certificates/
│   │   ├── testimonials/
│   │   └── profile/
│   ├── fonts/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── metadata.ts
│   │   ├── components/
│   │   │   ├── ui/                 # Shadcn-style primitives
│   │   │   ├── layout/             # Navbar, Footer, ScrollProgress
│   │   │   ├── hero/               # HeroSection, ProfileCard, ParticleBackground
│   │   │   ├── about/              # AboutSection, Timeline, FunFacts
│   │   │   ├── skills/             # SkillsSection, SkillCard, SkillCategoryFilter
│   │   │   ├── projects/           # ProjectsSection, ProjectCard, ProjectModal, Filters
│   │   │   ├── experience/         # ExperienceSection, TimelineItem
│   │   │   ├── certifications/     # CertificationsSection, CertificateCard, Modal
│   │   │   ├── github/             # GitHubSection, ContributionGraph, Stats
│   │   │   ├── blog/               # BlogSection, BlogCard
│   │   │   ├── testimonials/       # TestimonialsSection, TestimonialCarousel
│   │   │   ├── contact/            # ContactSection, ContactForm, MapPlaceholder
│   │   │   ├── theme/              # ThemeToggle, ThemeProvider
│   │   │   ├── cursor/             # CustomCursor, MagneticButton
│   │   │   ├── command-palette/    # CommandPalette (Ctrl+K)
│   │   │   └── common/             # SectionWrapper, AnimatedCounter, ScrollReveal
│   │   ├── hooks/
│   │   │   ├── useTheme.ts
│   │   │   ├── useScrollProgress.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   ├── useReducedMotion.ts
│   │   │   ├── useCustomCursor.ts
│   │   │   └── useCommandPalette.ts
│   │   ├── lib/
│   │   │   ├── utils.ts            # cn(), formatters, helpers
│   │   │   ├── animations.ts       # Framer variants, GSAP configs
│   │   │   ├── constants.ts        # Routes, breakpoints, durations
│   │   │   ├── seo.ts              # Metadata generators
│   │   │   └── three/              # Three.js utilities
│   │   ├── data/
│   │   │   ├── profile.ts          # Personal info, social links
│   │   │   ├── skills.ts           # Skills with categories, levels
│   │   │   ├── projects.ts         # Projects with metadata
│   │   │   ├── experience.ts       # Work history
│   │   │   ├── education.ts        # Education history
│   │   │   ├── certifications.ts   # Certificates
│   │   │   ├── testimonials.ts     # Client testimonials
│   │   │   ├── blog.ts             # Blog posts
│   │   │   ├── github.ts           # GitHub stats (mock)
│   │   │   └── services.ts         # Services offered
│   │   ├── types/
│   │   │   ├── index.ts            # All shared types
│   │   │   └── globals.d.ts        # Global declarations
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── variables.css       # CSS custom properties
│   │   │   └── animations.css      # Keyframe animations
│   │   └── providers/
│   │       ├── ThemeProvider.tsx
│   │       ├── MotionProvider.tsx
│   │       └── CursorProvider.tsx
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── vercel.json
└── README.md
```

---

## Data Models (TypeScript)

```typescript
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
  level: number; // 0-100
  icon: string;
  color: string;
  description?: string;
}

export type SkillCategory = 
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
```

---

## Component Architecture

### 1. Layout Components

#### Navbar (`components/layout/Navbar.tsx`)
- **Sticky**, glassmorphism (`backdrop-blur-md bg-white/80 dark:bg-gray-950/80`)
- **Animated underline** on active section (Framer Motion)
- **Smooth scroll** to sections
- **Mobile**: Hamburger → slide-in panel (Framer Motion AnimatePresence)
- **Theme toggle** integrated
- **Command palette trigger** (⌘K indicator)

#### Footer (`components/layout/Footer.tsx`)
- Minimal: copyright, quick links, social icons, back-to-top
- Back-to-top: smooth scroll + show/hide on scroll

#### ScrollProgress (`components/layout/ScrollProgress.tsx`)
- Fixed top bar, width = scroll progress
- Color: accent gradient

---

### 2. Hero Section (`components/hero/`)

#### HeroSection (Main)
- **Layout**: Two-column (text left, profile right) on desktop, stacked mobile
- **Typography**: Clamp-based fluid scaling

#### ProfileCard
- Image with **animated gradient border** (rotating conic-gradient)
- **Floating particles** (CSS/Canvas) around avatar
- **Mouse-follow glow** (subtle)

#### ParticleBackground
- **Canvas-based** particle system (performance: ~200 particles)
- **Mouse interaction**: repulsion/attraction
- **Reduced motion**: static fallback

#### TypingEffect
- Rotating titles array
- **Cursor blink** animation
- Configurable speed, pause, loop

---

### 3. About Section (`components/about/`)

#### AboutSection
- **Grid layout**: Image left, content right (desktop)
- **ScrollReveal** on each block

#### Timeline
- Vertical timeline with **animated connector line**
- Dot pulse animation on hover

#### FunFacts
- **Animated counters** (count-up on scroll into view)
- Icon + value + label cards

---

### 4. Skills Section (`components/skills/`)

#### SkillsSection
- **Category tabs** (filter): All | Frontend | Backend | AI | Cybersecurity | Cloud | DB | Languages | Tools
- **Animated counter** for each category count

#### SkillCard
- Icon, name, level (progress ring/bar)
- **Hover**: lift (-8px), glow border, icon scale
- **Progress animation** on scroll reveal (Framer Motion `animate`)

#### SkillRadar (Optional)
- SVG radar chart for top skills per category
- Animated on mount

---

### 5. Projects Section (`components/projects/`)

#### ProjectsSection
- **Search input** (debounced)
- **Category filter pills** (multi-select)
- **Sort dropdown**: Newest | Oldest | Name | Stars
- **Grid**: 3-col desktop, 2-col tablet, 1-col mobile

#### ProjectCard
- Thumbnail (aspect-video)
- **Tilt effect** (react-tilt or custom GSAP) on mouse move
- **Hover**: lift, glow border, image zoom (1.05x), tech badges fade in
- **Click** → ProjectModal

#### ProjectModal
- AnimatePresence (Framer Motion)
- Full-screen on mobile, centered on desktop
- Gallery, tech stack, links, description, challenges/solutions
- **Keyboard accessible** (ESC to close, trap focus)

---

### 6. Experience Section (`components/experience/`)

#### ExperienceSection
- **Vertical timeline** (left-aligned dots, right content)
- **ScrollReveal** stagger (0.1s delay each)
- Company logo, role, dates, location, type badge

---

### 7. Certifications (`components/certifications/`)

#### CertificationsSection
- Grid of CertificateCard
- **Hover**: zoom (1.02x), glow
- **Click** → CertificateModal (preview image + verification link)

---

### 8. GitHub Section (`components/github/`)

#### GitHubSection
- **ContributionGraph**: SVG calendar heatmap (like GitHub profile)
- **Stats cards**: Repos, Stars, Commits, Streak (animated counters)
- **TopLanguages**: Horizontal bars with percentage
- **TopRepos**: List with links
- **Data**: Mock for now, structure ready for GitHub API integration

---

### 9. Blog Section (`components/blog/`)

#### BlogSection
- **Featured article** (large card, left image right content)
- **Grid** of recent posts (3-col)
- **Read more** → external link or internal route

---

### 10. Testimonials (`components/testimonials/`)

#### TestimonialsSection
- **Carousel** (embla-carousel or Framer Motion)
- **Auto-play** (pause on hover)
- **Drag/swipe** support
- Glass cards with avatar, rating stars, content, author info

---

### 11. Contact (`components/contact/`)

#### ContactSection
- **Two-column**: Form left, info right
- **ContactForm**: React Hook Form + Zod validation
  - Fields: Name, Email, Subject, Message
  - **Floating labels** (CSS :placeholder-shown + :focus)
  - **Submit**: Loading state, success toast, error handling
- **Info cards**: Email (copy button), Location, Availability
- **MapPlaceholder**: Static image + link to Google Maps

---

### 12. Theme System (`components/theme/`)

#### ThemeProvider
- Context + localStorage + `mediaQuery` sync
- **CSS variables** approach (not Tailwind dark:)
- **No flash**: Inline script in `layout.tsx` before hydration

#### ThemeToggle
- Icon button (sun/moon/system)
- **Dropdown** for three options
- Smooth icon transition (rotate + fade)

---

### 13. Custom Cursor (`components/cursor/`)

#### CustomCursor
- **Only desktop** (`pointer: fine`)
- Two layers: dot (6px) + ring (40px)
- **GSAP** smooth follow (lerp)
- **Magnetic elements**: buttons, links, cards → ring expands
- **Reduced motion**: disabled

#### MagneticButton (Wrapper)
- `whileHover` scale + GSAP magnetic pull

---

### 14. Command Palette (`components/command-palette/`)

#### CommandPalette
- **Trigger**: ⌘K / Ctrl+K (global listener)
- **Portal** rendered at root
- **Framer Motion** slide down + fade
- **Sections**: Navigation, Projects, Social, Actions
- **Keyboard**: ↑↓ navigate, Enter select, Esc close
- **Fuzzy search** (fuse.js or custom)

---

### 15. Common/Shared (`components/common/`)

#### SectionWrapper
- Consistent padding: `px-6 md:px-12 lg:px-20 xl:px-32`
- `max-w-7xl mx-auto`
- `section` semantic element + `id` for scroll spy

#### ScrollReveal
- **IntersectionObserver** hook
- Framer Motion variants: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scale`, `blur`
- **Stagger** support for children

#### AnimatedCounter
- CountUp.js or custom `useAnimationFrame`
- **Easing**: easeOutExpo
- **Trigger**: on scroll into view (once)

#### LoadingScreen
- Full-screen, centered logo + progress bar
- **Minimum display time**: 800ms (perception)
- **Animate out**: scale + fade

---

## Animation Strategy

### Framer Motion (Primary)
- Page transitions (AnimatePresence in layout)
- Scroll reveal variants
- Modal/panel animations
- Button micro-interactions
- Carousel

### GSAP (Complex/Performance-Critical)
- Custom cursor (lerp follow)
- Magnetic elements
- Particle background (Canvas + GSAP ticker)
- Scroll-triggered timeline (ScrollTrigger)
- Text split/reveal (SplitType)
- Parallax elements

### CSS Animations (Simple/Ubiquitous)
- Hover transitions (transform, box-shadow, color)
- Keyframes: pulse, spin, float, shimmer
- Reduced motion media query overrides

### Three.js (Subtle 3D)
- Hero: floating geometric shapes (icosahedron, torus)
- **Low poly**, wireframe or matte material
- **Performance**: < 1000 triangles, 30fps target
- **Fallback**: static SVG on low-end devices

---

## Animation Variants (Framer Motion)

```typescript
// src/lib/animations.ts

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export const fadeDown = { /* ... */ };
export const fadeLeft = { /* ... */ };
export const fadeRight = { /* ... */ };
export const scaleUp = { /* ... */ };
export const blurReveal = { /* ... */ };

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export const cardHover = {
  y: -8,
  boxShadow: '0 25px 50px -12px rgba(91, 110, 255, 0.25)',
  borderColor: 'rgba(91, 110, 255, 0.5)',
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const buttonHover = {
  scale: 1.02,
  boxShadow: '0 10px 25px -5px rgba(91, 110, 255, 0.4)',
  transition: { duration: 0.2 }
};

export const buttonTap = { scale: 0.98 };
```

---

## Tailwind Configuration

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F7F8FA',
          secondary: '#FAFAFB',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F0F2F7',
        },
        accent: {
          500: '#5B6EFF',
          600: '#6C63FF',
          700: '#4F8EF7',
        },
        text: {
          primary: '#111827',
          secondary: '#374151',
          muted: '#6B7280',
        },
        border: {
          DEFAULT: 'rgba(0, 0, 0, 0.08)',
          dark: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        display: ['var(--font-cal)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'blur-in': 'blurIn 0.5s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        blurIn: { '0%': { opacity: '0', filter: 'blur(10px)' }, '100%': { opacity: '1', filter: 'blur(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        gradientX: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        rotateSlow: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(91, 110, 255, 0.3)',
        'glow-lg': '0 0 60px rgba(91, 110, 255, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## CSS Variables (Globals)

```css
/* src/styles/variables.css */

:root {
  /* Colors */
  --bg-primary: #F7F8FA;
  --bg-secondary: #FAFAFB;
  --surface: #FFFFFF;
  --surface-hover: #F0F2F7;
  
  --accent-500: #5B6EFF;
  --accent-600: #6C63FF;
  --accent-700: #4F8EF7;
  
  --text-primary: #111827;
  --text-secondary: #374151;
  --text-muted: #6B7280;
  
  --border-light: rgba(0, 0, 0, 0.08);
  --border-dark: rgba(255, 255, 255, 0.1);
  
  /* Shadows */
  --shadow-glow: 0 0 30px rgba(91, 110, 255, 0.3);
  --shadow-glow-lg: 0 0 60px rgba(91, 110, 255, 0.4);
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 20px 40px rgba(0, 0, 0, 0.08);
  
  /* Spacing */
  --section-padding-x: 1.5rem;    /* 24px */
  --section-padding-x-md: 3rem;   /* 48px */
  --section-padding-x-lg: 5rem;   /* 80px */
  --section-padding-x-xl: 8rem;   /* 128px */
  --section-max-width: 80rem;     /* 1280px */
  
  /* Typography */
  --font-inter: 'Inter', system-ui, sans-serif;
  --font-jetbrains: 'JetBrains Mono', monospace;
  --font-cal: 'Cal Sans', 'Inter', sans-serif;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
  
  /* Z-indices */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal-backdrop: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-cursor: 9999;
}

.dark {
  --bg-primary: #0A0F1A;
  --bg-secondary: #0D1320;
  --surface: #111827;
  --surface-hover: #1A2235;
  
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
  --text-muted: #9CA3AF;
  
  --border-light: rgba(255, 255, 255, 0.08);
  --border-dark: rgba(255, 255, 255, 0.1);
  
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.3);
  --shadow-card-hover: 0 20px 40px rgba(0, 0, 0, 0.4);
}
```

---

## Performance Strategy

### Bundle Optimization
- **Dynamic imports** for heavy sections (Three.js, Charts, Command Palette)
- **Code splitting** per route/section
- **Tree shaking**: Lucide icons (individual imports), Framer Motion (lazy features)

### Image Optimization
- **Next/Image** with `fill` + `priority` for above-fold
- **WebP/AVIF** automatic
- **Blur placeholders** (base64)
- **Lazy loading** default

### Animation Performance
- **GPU-accelerated**: `transform`, `opacity` only
- **will-change** on animated elements
- **Reduced motion**: `prefers-reduced-motion` disables all non-essential animation
- **IntersectionObserver** for scroll triggers (not scroll listeners)

### Caching
- **Static generation** (ISR) for blog, projects
- **Edge caching** for API responses
- **Service Worker** (Workbox) for offline

### Lighthouse Targets
| Metric | Target |
|--------|--------|
| Performance | ≥ 95 |
| Accessibility | 100 |
| Best Practices | ≥ 95 |
| SEO | 100 |

---

## Accessibility Checklist

- [ ] Semantic HTML5 (header, nav, main, section, article, aside, footer)
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] Focus visible outlines (custom, not removed)
- [ ] Skip to main content link
- [ ] ARIA labels on icon buttons
- [ ] ARIA live regions for dynamic content (toasts, counters)
- [ ] Color contrast ≥ 4.5:1 (AA)
- [ ] Keyboard navigation for all interactive elements
- [ ] Focus trapping in modals
- [ ] Alt text for all images
- [ ] Reduced motion support
- [ ] Language declaration (`lang="en"`)
- [ ] Structured data (JSON-LD: Person, WebSite, Portfolio)

---

## SEO & Metadata

```typescript
// src/lib/seo.ts

export const generateMetadata = (data: SEOData): Metadata => ({
  title: data.title,
  description: data.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  openGraph: {
    title: data.title,
    description: data.description,
    type: 'website',
    url: data.canonicalUrl,
    siteName: 'Your Name | AI Engineer & Security Researcher',
    images: [{ url: data.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: [data.ogImage],
  },
  robots: { index: true, follow: true },
  other: {
    'theme-color': '#5B6EFF',
  },
});

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  jobTitle: ['AI Engineer', 'Cyber Security Researcher', 'Software Developer'],
  url: 'https://yourdomain.com',
  sameAs: [/* social URLs */],
  knowsAbout: ['Machine Learning', 'Cybersecurity', 'Full Stack Development'],
  alumniOf: { '@type': 'EducationalOrganization', name: 'University' },
  worksFor: { '@type': 'Organization', name: 'Current Company' },
};
```

---

## PWA Configuration

```json
// public/manifest.json
{
  "name": "Your Name | Portfolio",
  "short_name": "Portfolio",
  "description": "AI Engineer, Cyber Security Researcher, Software Developer",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F7F8FA",
  "theme_color": "#5B6EFF",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" },
        { "key": "Service-Worker-Allowed", "value": "/" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/resume.pdf", "destination": "/api/resume" }
  ]
}
```

---

## Implementation Phases

### Phase 1: Foundation (Day 1-2)
1. Project init, TypeScript, Tailwind, ESLint, Prettier
2. Theme system (CSS variables, provider, toggle)
3. Global styles, fonts, CSS variables
4. Layout components (Navbar, Footer, ScrollProgress)
5. SectionWrapper, ScrollReveal hook
6. Loading screen

### Phase 2: Core Sections (Day 3-5)
7. Hero (typing, particles, profile card)
8. About (timeline, fun facts, counters)
9. Skills (cards, filters, progress animations)
10. Projects (grid, filters, search, modal, tilt)
11. Experience (timeline)
12. Certifications (cards, modal)

### Phase 3: Data-Driven Sections (Day 6-7)
13. GitHub (contribution graph, stats, languages)
14. Blog (featured + grid)
15. Testimonials (carousel)
16. Contact (form, validation, toast)
17. Services

### Phase 4: Polish & Advanced (Day 8-10)
18. Custom cursor + magnetic elements
19. Command palette (⌘K)
20. Three.js hero background
21. Page transitions
22. SEO, metadata, structured data
23. PWA, service worker
24. 404 page, easter eggs

### Phase 5: Optimization & Deploy (Day 11-12)
25. Performance audit (Lighthouse)
26. Bundle analysis
27. Accessibility audit
28. Cross-browser/device testing
29. Vercel deploy + preview
30. Analytics (Vercel Analytics / Plausible)

---

## Dependencies

### Production
```json
{
  "next": "14.2.x",
  "react": "18.3.x",
  "react-dom": "18.3.x",
  "typescript": "5.5.x",
  "tailwindcss": "3.4.x",
  "framer-motion": "11.x",
  "gsap": "3.12.x",
  "three": "0.165.x",
  "@react-three/fiber": "8.16.x",
  "@react-three/drei": "9.108.x",
  "lucide-react": "0.395.x",
  "react-hook-form": "7.51.x",
  "@hookform/resolvers": "3.3.x",
  "zod": "3.23.x",
  "embla-carousel-react": "8.0.x",
  "fuse.js": "7.0.x",
  "countup.js": "2.8.x",
  "split-type": "0.3.x",
  "clsx": "2.1.x",
  "tailwind-merge": "2.3.x"
}
```

### Development
```json
{
  "@types/node": "20.x",
  "@types/react": "18.3.x",
  "@types/react-dom": "18.3.x",
  "@types/three": "0.165.x",
  "eslint": "8.57.x",
  "eslint-config-next": "14.2.x",
  "prettier": "3.3.x",
  "prettier-plugin-tailwindcss": "0.6.x",
  "@tailwindcss/typography": "0.5.x",
  "sharp": "0.33.x"
}
```

---

## Content Placeholders (To Be Replaced)

All data files in `src/data/*.ts` export typed constants with realistic mock data matching the interfaces above. Replace with your actual:

- **Profile**: Name, titles, bio, email, avatar, social links, fun facts
- **Skills**: 40-50 skills across 8 categories with levels (0-100)
- **Projects**: 8-12 projects with thumbnails, descriptions, links
- **Experience**: 4-6 positions with achievements
- **Education**: 2-3 degrees
- **Certifications**: 6-10 certificates with verification URLs
- **Testimonials**: 4-6 from colleagues/clients
- **Blog**: 5-8 posts (can link to external Medium/Dev.to)
- **GitHub**: Mock stats (replace with API later)
- **Services**: 4-6 service offerings

---

## Next Steps

1. **Review this SPEC** - confirm structure, naming, priorities
2. **Provide content** - fill data files (I can generate mock data first)
3. **Approve Phase 1** - I'll scaffold the complete project structure
4. **Iterate** - build section by section with your feedback

---

*Generated for: Premium AI Engineer / Cyber Security / Software Developer Portfolio*
*Target: Vercel deployment, Lighthouse ≥ 95, WCAG AA compliant*