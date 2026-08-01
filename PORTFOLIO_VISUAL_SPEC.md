# Portfolio Visual Specification

## Design Language Reference

| Reference | What We Borrow |
|-----------|----------------|
| **Apple** | Typography scale, whitespace restraint, subtle motion, glassmorphism |
| **Vercel** | Technical aesthetic, mono accents, dark mode excellence, command palette |
| **Linear** | Refined interactions, keyboard-first, smooth state transitions |
| **Framer** | Playful but precise animations, scroll-triggered reveals |
| **Stripe** | Gradient blobs, premium polish, developer-centric details |

---

## Color Palette (Applied)

```
Light Mode                          Dark Mode
┌─────────────────────────┐         ┌─────────────────────────┐
│  #F7F8FA  ◼◼◼◼◼◼◼◼◼◼  │         │  #0A0F1A  ◼◼◼◼◼◼◼◼◼◼  │  bg-primary
│  #FAFAFB  ◼◼◼◼◼◼◼◼◼◼  │         │  #0D1320  ◼◼◼◼◼◼◼◼◼◼  │  bg-secondary
│  #FFFFFF  ◼◼◼◼◼◼◼◼◼◼  │         │  #111827  ◼◼◼◼◼◼◼◼◼◼  │  surface
│  #F0F2F7  ◼◼◼◼◼◼◼◼◼◼  │         │  #1A2235  ◼◼◼◼◼◼◼◼◼◼  │  surface-hover
├─────────────────────────┤         ├─────────────────────────┤
│  #5B6EFF  ◼◼◼◼◼◼◼◼◼◼  │         │  #5B6EFF  ◼◼◼◼◼◼◼◼◼◼  │  accent-500 (primary)
│  #6C63FF  ◼◼◼◼◼◼◼◼◼◼  │         │  #6C63FF  ◼◼◼◼◼◼◼◼◼◼  │  accent-600 (hover)
│  #4F8EF7  ◼◼◼◼◼◼◼◼◼◼  │         │  #4F8EF7  ◼◼◼◼◼◼◼◼◼◼  │  accent-700 (secondary)
├─────────────────────────┤         ├─────────────────────────┤
│  #111827  ◼◼◼◼◼◼◼◼◼◼  │         │  #F9FAFB  ◼◼◼◼◼◼◼◼◼◼  │  text-primary
│  #374151  ◼◼◼◼◼◼◼◼◼◼  │         │  #D1D5DB  ◼◼◼◼◼◼◼◼◼◼  │  text-secondary
│  #6B7280  ◼◼◼◼◼◼◼◼◼◼  │         │  #9CA3AF  ◼◼◼◼◼◼◼◼◼◼  │  text-muted
├─────────────────────────┤         ├─────────────────────────┤
│  rgba(0,0,0,0.08) ◼◼◼◼ │         │  rgba(255,255,255,0.08) │ border
│  rgba(0,0,0,0.05) ◼◼◼◼ │         │  rgba(0,0,0,0.3) ◼◼◼◼◼  │ shadow-card
│  rgba(91,110,255,0.3)◼ │         │  rgba(91,110,255,0.4)◼◼ │ shadow-glow
└─────────────────────────┘         └─────────────────────────┘
```

---

## Typography Scale

```
Display (Hero Heading)
┌────────────────────────────────────────────┐
│  clamp(3rem, 8vw, 6rem)                    │
│  font-weight: 700 | letter-spacing: -0.03em│
│  font-family: 'Cal Sans', 'Inter'          │
└────────────────────────────────────────────┘

H1 (Section Titles)
┌────────────────────────────────────────────┐
│  clamp(2rem, 4vw, 3rem)                    │
│  font-weight: 700 | letter-spacing: -0.02em│
└────────────────────────────────────────────┘

H2 (Subsection)
┌────────────────────────────────────────────┐
│  clamp(1.5rem, 2.5vw, 2rem)                │
│  font-weight: 600                          │
└────────────────────────────────────────────┘

Body Large (Lead)
┌────────────────────────────────────────────┐
│  1.125rem | line-height: 1.7 | weight: 400 │
└────────────────────────────────────────────┘

Body (Default)
┌────────────────────────────────────────────┐
│  1rem | line-height: 1.6 | weight: 400     │
└────────────────────────────────────────────┘

Body Small / Caption
┌────────────────────────────────────────────┐
│  0.875rem | line-height: 1.5 | weight: 400 │
│  color: text-muted                         │
└────────────────────────────────────────────┘

Mono (Code/Stats)
┌────────────────────────────────────────────┐
│  font-family: 'JetBrains Mono'             │
│  tabular-nums for counters                 │
└────────────────────────────────────────────┘
```

---

## Spacing System

```
Section Padding (Responsive)
┌──────────────┬──────────┬──────────┬──────────┬──────────┐
│ Breakpoint   │ Mobile   │ Tablet   │ Desktop  │ Wide     │
│              │ <640px   │ 640-1024 │ 1024-1280│ >1280px  │
├──────────────┼──────────┼──────────┼──────────┼──────────┤
│ Horizontal   │ 24px     │ 48px     │ 80px     │ 128px    │
│ Vertical     │ 80px     │ 100px    │ 120px    │ 140px    │
└──────────────┴──────────┴──────────┴──────────┴──────────┘

Component Gaps
┌──────────────┬──────────┐
│ Context      │ Gap      │
├──────────────┼──────────┤
│ Section title→content    │ 32px    │
│ Card grid                  │ 24px    │
│ Card internal              │ 20px    │
│ Inline elements            │ 12px    │
│ Icon + text                │ 8px     │
└──────────────┴──────────┘
```

---

## Wireframe Views

### 1. HERO SECTION (Above Fold)

```
LIGHT MODE                                    DARK MODE
┌────────────────────────────────────────┐    ┌────────────────────────────────────────┐
│  ☰  Logo          Home About Projects  │    │  ☰  Logo          Home About Projects  │
│       Contact  🌙  ⌘K              ▼   │    │       Contact  ☀️  ⌘K              ▼   │
├────────────────────────────────────────┤    ├────────────────────────────────────────┤
│                                        │    │                                        │
│   ┌────────────────────────────────┐   │    │   ┌────────────────────────────────┐   │
│   │                                │   │    │   │                                │   │
│   │   Hi, I'm [Name]               │   │    │   │   Hi, I'm [Name]               │   │
│   │   AI Engineer · Security       │   │    │   │   AI Engineer · Security       │   │
│   │   Researcher · Developer       │   │    │   │   Researcher · Developer       │   │
│   │                                │   │    │   │                                │   │
│   │   Building intelligent systems │   │    │   │   Building intelligent systems │   │
│   │   that learn, protect, and     │   │    │   │   that learn, protect, and     │   │
│   │   scale.                       │   │    │   │   scale.                       │   │
│   │                                │   │    │   │                                │   │
│   │   ┌─────────┐ ┌─────────┐      │   │    │   │   ┌─────────┐ ┌─────────┐      │   │
│   │   │ Hire Me │ │ Resume  │      │   │    │   │   │ Hire Me │ │ Resume  │      │   │
│   │   │  ◼◼◼◼◼  │ │ ◼◼◼◼◼◼  │      │   │    │   │   │  ◼◼◼◼◼  │ │ ◼◼◼◼◼◼  │      │   │
│   │   └─────────┘ └─────────┘      │   │    │   │   └─────────┘ └─────────┘      │   │
│   │                                │   │    │   │                                │   │
│   │   ● ● ●  GitHub  LinkedIn  X   │   │    │   │   ● ● ●  GitHub  LinkedIn  X   │   │
│   │                                │   │    │   │                                │   │
│   └────────────────────────────────┘   │    │   └────────────────────────────────┘   │
│                                        │    │                                        │
│          [Animated Profile Card]       │    │          [Animated Profile Card]       │
│     ┌────────────────────────────┐     │    │     ┌────────────────────────────┐     │
│     │   ●    Floating Particles  │     │    │     │   ●    Floating Particles  │     │
│     │  ● ●  ┌─────────────────┐  │     │    │     │  ● ●  ┌─────────────────┐  │     │
│     │ ●     │                 │  │     │    │     │ ●     │                 │  │     │
│     │       │   [ Avatar ]    │  │     │    │     │       │   [ Avatar ]    │  │     │
│     │       │  Animated Ring  │  │     │    │     │       │  Animated Ring  │  │     │
│     │       │  Gradient Border│  │     │    │     │       │  Gradient Border│  │     │
│     │       │                 │  │     │    │     │       │                 │  │     │
│     │       └─────────────────┘  │     │    │     │       └─────────────────┘  │     │
│     │                            │     │    │     │                            │     │
│     └────────────────────────────┘     │    │     └────────────────────────────┘     │
│                                        │    │                                        │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │    │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│   Scroll Progress Bar (accent gradient)  │    │   Scroll Progress Bar (accent gradient)  │
└────────────────────────────────────────┘    └────────────────────────────────────────┘
```

**Key Visual Details:**
- **Background**: Subtle animated gradient blobs (3-4) drifting slowly
- **Particles**: 150-200 dots, connect on proximity, repel from cursor
- **Avatar Ring**: Conic gradient rotating 20s linear infinite
- **Buttons**: Primary (filled accent), Secondary (glass border)
- **Typing Effect**: Rotates through 4-5 titles, 50ms char speed

---

### 2. ABOUT SECTION

```
┌─────────────────────────────────────────────────────────────────┐
│  About Me                                    [Animated Counter] │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐  │
│  │                     │  │  Who Am I                        │  │
│  │   [About Image]     │  │  ────────                        │  │
│  │  (Illustration or   │  │                                 │  │
│  │   photo with        │  │  Senior AI Engineer with 8+     │  │
│  │   geometric         │  │  years building production ML   │  │
│  │   overlay)          │  │  systems, securing              │  │
│  │                     │  │  infrastructure, and shipping   │  │
│  │   [Float Anim]      │  │  scalable software.             │  │
│  │                     │  │                                 │  │
│  │                     │  │  Currently: Staff Engineer @    │  │
│  │                     │  │  [Company] — leading AI/ML      │  │
│  │                     │  │  platform initiatives.          │  │
│  │                     │  │                                 │  │
│  └─────────────────────┘  └─────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Journey Timeline                                        │   │
│  │  ┌──┐  2024  ┌──────────────────────────────────────┐   │   │
│  │  │● │◄───────│ Staff AI Engineer @ Company          │   │   │
│  │  └──┘        │ Leading GenAI platform, 0→1         │   │   │
│  │   │          └──────────────────────────────────────┘   │   │
│  │   │          ┌──────────────────────────────────────┐   │   │
│  │   ├──────────│ Security Researcher @ Startup        │   │   │
│  │   │          │ Red teaming, vulnerability research  │   │   │
│  │   │          └──────────────────────────────────────┘   │   │
│  │   │          ┌──────────────────────────────────────┐   │   │
│  │   ├──────────│ Full Stack Developer @ Corp          │   │   │
│  │   │          │ React/Node, microservices, DevOps    │   │   │
│  │   │          └──────────────────────────────────────┘   │   │
│  │   ▼                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │   50+   │ │   15    │ │   8     │ │   3     │ │   12    │  │
│  │Projects │ │Certs    │ │Years Exp│ │Patents  │ │Countries│  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│   ◼◼◼◼◼◼◼◼   ◼◼◼◼◼◼◼◼   ◼◼◼◼◼◼◼◼   ◼◼◼◼◼◼◼◼   ◼◼◼◼◼◼◼◼        │
│  (Animated count-up on scroll)                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3. SKILLS SECTION

```
┌─────────────────────────────────────────────────────────────────┐
│  Skills & Expertise                    [All] [Frontend] [AI]   │
│  ─────────────────────────────────────────────────────────────  │
│                       [Backend] [Sec] [Cloud] [DB] [Lang] [Tools]│
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  FRONTEND (8)                      BACKEND (7)            │  │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   ┌─────┐ ┌─────┐       │  │
│  │  │ ⚛   │ │ ⬢   │ │ 💨  │ │ 🔷  │   │ 🟢  │ │ 🐍  │       │  │
│  │  │React│ │Next │ │Tail │ │TS   │   │Node │ │Python        │  │
│  │  │ 95% │ │ 90% │ │ 95% │ │ 90% │   │ 90% │ │ 95%         │  │
│  │  └─────┘ └─────┘ └─────┘ └─────┘   └─────┘ └─────┘       │  │
│  │  ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  AI / ML (9)                       CYBERSECURITY (6)      │  │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   ┌─────┐ ┌─────┐       │  │
│  │  │ 🧠  │ │ 🤗  │ │ 🦙  │ │ 📊  │   │ 🔒  │ │ 🛡  │       │  │
│  │  │PyTorch│ │HF   │ │Llama│ │Pandas│   │Burp │ │Nmap │       │  │
│  │  │ 90% │ │ 85% │ │ 80% │ │ 95% │   │ 90% │ │ 85% │       │  │
│  │  └─────┘ └─────┘ └─────┘ └─────┘   └─────┘ └─────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [Hover any card: lift -8px, glow border, icon scale 1.1x]     │
│  [Progress ring animates 0→level on scroll reveal]             │
└─────────────────────────────────────────────────────────────────┘
```

**Skill Card States:**

```
DEFAULT                          HOVER                              FOCUS
┌─────────────────┐              ┌─────────────────┐                ┌─────────────────┐
│  ⚛  React       │              │  ⚛  React       │                │  ⚛  React       │
│  ─────────────  │   ──►        │  ─────────────  │   ──►          │  ─────────────  │
│  ◼◼◼◼◼◼◼◼◼◼░░░░  │              │  ◼◼◼◼◼◼◼◼◼◼░░░░  │                │  ◼◼◼◼◼◼◼◼◼◼░░░░  │
│  95%            │              │  95%            │                │  95%            │
│                 │              │  ▲ lift -8px    │                │  ◼◼◼ focus ring  │
│  shadow: card   │              │  ◼◼◼ glow border│                │                 │
└─────────────────┘              └─────────────────┘                └─────────────────┘
```

---

### 4. PROJECTS SECTION

```
┌─────────────────────────────────────────────────────────────────┐
│  Featured Projects                    🔍 Search...              │
│  ─────────────────────────────────────────────────────────────  │
│  [All] [AI/ML] [Security] [Fullstack] [Backend] [Research]     │
│  Sort: [Newest ▼]                                              │
│                                                                 │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌────────────┐ │
│  │                     │ │                     │ │            │ │
│  │   [Thumbnail]       │ │   [Thumbnail]       │ │ [Thumb]    │ │
│  │  ┌───────────────┐  │ │  ┌───────────────┐  │ │            │ │
│  │  │ NeuralShield  │  │  │  │ CodeGuard AI  │  │ │  DataFlow  │ │
│  │  │ AI-powered    │  │  │  │ Automated     │  │ │  Pipeline  │ │
│  │  │ threat detect │  │  │  │ code review   │  │ │  Platform  │ │
│  │  └───────────────┘  │  │  └───────────────┘  │ │            │ │
│  │                     │  │                     │ │            │ │
│  │  ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼  │  │  ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼  │  │ ◼◼◼◼◼◼◼◼◼◼ │ │
│  │  React  Python  PyT │  │  Next.js  Go  WASM  │  │  Rust Kafka│ │
│  │  ◼ ◼ ◼            │  │  ◼ ◼ ◼              │  │  ◼ ◼ ◼    │ │
│  │                     │  │                     │ │            │ │
│  │  [GitHub] [Demo]    │  │  [GitHub] [Demo]    │  │ [GitHub]   │ │
│  └─────────────────────┘ └─────────────────────┘ └────────────┘ │
│                                                                 │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌────────────┐ │
│  │                     │ │                     │ │            │ │
│  │   [Thumbnail]       │ │   [Thumbnail]       │ │ [Thumb]    │ │
│  │  ┌───────────────┐  │ │  ┌───────────────┐  │ │            │ │
│  │  │ SecureNet     │  │  │  │ ML Observability│ │ │  CryptoAudit│ │
│  │  │ Zero-trust    │  │  │  │ Platform       │  │ │  Toolkit   │ │
│  │  │ network arch  │  │  │  │                │  │ │            │ │
│  │  └───────────────┘  │  │  └───────────────┘  │ │            │ │
│  │                     │  │                     │ │            │ │
│  │  ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼  │  │  ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼  │  │ ◼◼◼◼◼◼◼◼◼◼ │ │
│  │  Go  K8s  eBPF     │  │  Python  Grafana    │  │  Rust  WASM│ │
│  │                     │  │                     │ │            │ │
│  │  [GitHub] [Demo]    │  │  [GitHub] [Demo]    │  │ [GitHub]   │ │
│  └─────────────────────┘ └─────────────────────┘ └────────────┘ │
│                                                                 │
│                    [Load More Projects]                         │
└─────────────────────────────────────────────────────────────────┘
```

**Project Card Hover (Tilt + Reveal):**

```
DEFAULT                          HOVER (Mouse enters)
┌─────────────────────┐          ┌─────────────────────┐
│                     │          │   ▲ 3D Tilt         │
│   [Image]           │          │  /  follows cursor  │
│                     │    ──►   │ /  (max 8°)         │
│  NeuralShield       │          │ ─────────────────   │
│  AI threat detect   │          │ ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼   │
│                     │          │ React  Python  PyT  │
│  ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼   │          │ ◼ ◼ ◼  ▲ fade in   │
│  React  Python  PyT │          │                     │
│                     │          │  [GitHub] [Demo]    │
│  [GitHub] [Demo]    │          │  ▲ scale 1.05       │
│  ◼◼◼◼◼  ◼◼◼◼◼◼      │          │  ◼◼◼ glow border    │
└─────────────────────┘          └─────────────────────┘
```

**Project Modal:**

```
┌─────────────────────────────────────────────────────────────┐
│  ×  NeuralShield — AI-Powered Threat Detection        □  ⛶  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    [Image Gallery]                   │   │
│  │  ◀  [Screenshot 1]  ▶   ● ● ●                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────┐ ┌────────────────────────────┐   │
│  │  Overview            │ │  Tech Stack                │   │
│  │  ─────────           │ │  ─────────                 │   │
│  │                      │ │  ◼ React  ◼ Python         │   │
│  │  Real-time threat    │ │  ◼ PyTorch  ◼ Kafka        │   │
│  │  detection using     │ │  ◼ Redis  ◼ PostgreSQL     │   │
│  │  transformer models  │ │  ◼ Docker  ◼ K8s           │   │
│  │  trained on 10M+     │ │                            │   │
│  │  samples. Sub-50ms   │ │                            │   │
│  │  inference latency.  │ │                            │   │
│  │                      │ │                            │   │
│  │  [GitHub] [Live]     │ │                            │   │
│  └──────────────────────┘ └────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Challenges & Solutions                              │   │
│  │  ───────────────────────                             │   │
│  │  🔴 Challenge: False positive reduction             │   │
│  │  🟢 Solution: Ensemble + active learning loop       │   │
│  │                                                      │   │
│  │  🔴 Challenge: Model serving at scale               │   │
│  │  🟢 Solution: ONNX + Triton + K8s HPA               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 5. EXPERIENCE SECTION

```
┌─────────────────────────────────────────────────────────────────┐
│  Experience                                                       │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌──┐                                                           │
│  │● │  2024 — Present    ┌─────────────────────────────────┐   │
│  └──┘                    │  🏢  Company Name                 │   │
│   │                      │  📍  San Francisco, CA            │   │
│   ├──────────────────────│  🏷  Full-time • Staff AI Engineer│   │
│   │                      ├─────────────────────────────────┤   │
│   │                      │  Leading GenAI platform strategy │   │
│   │                      │  • Architected LLM serving infra │   │
│   │                      │  • Built eval framework (100+   │   │
│   │                      │    metrics)                      │   │
│   │                      │  • Reduced inference cost 60%   │   │
│   │                      │  • Mentored 8 engineers         │   │
│   │                      │                                 │   │
│   │                      │  ◼ Python ◼ PyTorch ◼ K8s ◼ Go │   │
│   │                      └─────────────────────────────────┘   │
│   │                                                           │
│   ├──────────────────────┌─────────────────────────────────┐   │
│   │                      │  🏢  Startup Inc                  │   │
│   │                      │  📍  Remote                       │   │
│   │                      │  🏷  Full-time • Security Research│   │
│   │                      ├─────────────────────────────────┤   │
│   │                      │  • Disclosed 15+ CVEs            │   │
│   │                      │  • Built automated red-teaming  │   │
│   │                      │  • Created security training    │   │
│   │                      │                                 │   │
│   │                      │  ◼ Go ◼ Rust ◼ eBPF ◼ Burp     │   │
│   │                      └─────────────────────────────────┘   │
│   │                                                           │
│   ▼                                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Timeline Connector Animation:**
```
Scroll down →  ████████░░░░░░░░░░  (line draws)
                ▲
              Pulse dot on hover
```

---

### 6. GITHUB SECTION

```
┌─────────────────────────────────────────────────────────────────┐
│  GitHub Activity                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │  247    │ │  1.2k   │ │  3.4k   │ │  847    │ │  52     │  │
│  │ Repos   │ │ Stars   │ │ Forks   │ │ Commits │ │ Streak  │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│   ◼◼◼◼◼◼◼   ◼◼◼◼◼◼◼   ◼◼◼◼◼◼◼   ◼◼◼◼◼◼◼   ◼◼◼◼◼◼◼  (animated)  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Contribution Graph (2024)                                │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │ Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  │  │  │
│  │  │ ░░   ░░   ██   ██   ██   ██   ██   ██   ██   ██  │  │  │
│  │  │ ░░   ██   ██   ██   ██   ██   ██   ██   ██   ██  │  │  │
│  │  │ ██   ██   ██   ██   ██   ██   ██   ██   ██   ██  │  │  │
│  │  │ ██   ██   ██   ██   ██   ██   ██   ██   ░░   ░░  │  │  │
│  │  │ ██   ██   ██   ██   ██   ██   ██   ██   ░░   ░░  │  │  │
│  │  │ ██   ██   ██   ██   ██   ██   ██   ██   ░░   ░░  │  │  │
│  │  │ ██   ██   ██   ██   ██   ██   ██   ██   ░░   ░░  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  Less ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ More                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────┐ ┌──────────────────────────────────┐  │
│  │  Top Languages      │ │  Top Repositories                │  │
│  │  ─────────────      │ │  ─────────────                   │  │
│  │  ◼ Python      35%  │ │  🔒 neural-shield      ⭐ 342   │  │
│  │  ◼ TypeScript  28%  │ │  🤖 codeguard-ai       ⭐ 287   │  │
│  │  ◼ Go          18%  │ │  📊 ml-observability   ⭐ 156   │  │
│  │  ◼ Rust        12%  │ │  🔐 secure-net         ⭐ 134   │  │
│  │  ◼ Other       7%   │ │  ⚡ dataflow           ⭐ 98    │  │
│  └─────────────────────┘ └──────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 7. CONTACT SECTION

```
┌─────────────────────────────────────────────────────────────────┐
│  Get In Touch                                                     │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ┌─────────────────────────────────────┐ ┌───────────────────┐  │
│  │                                     │ │  Let's Connect    │  │
│  │  Name     [____________________]    │ │  ─────────────    │  │
│  │                                     │ │                   │  │
│  │  Email    [____________________]    │ │  📧  hi@domain.com │  │
│  │                                     │ │       [Copy]      │  │
│  │  Subject  [____________________]    │ │                   │  │
│  │                                     │ │  📍  San Francisco │  │
│  │  Message  [____________________]    │ │                   │  │
│  │  [____________________________]     │ │  🕐  Available for │  │
│  │  [____________________________]     │ │      freelance/   │  │
│  │  [____________________________]     │ │      consulting   │  │
│  │                                     │ │                   │  │
│  │  ┌─────────────────────────────┐   │ │  [GitHub] [LinkedIn]│  │
│  │  │  Send Message  ◼◼◼◼◼◼◼◼◼◼  │   │ │  [Twitter] [Email]  │  │
│  │  └─────────────────────────────┘   │ │                   │  │
│  │                                     │ │  ┌─────────────┐  │  │
│  └─────────────────────────────────────┘ │ │   [Map]     │  │  │
│                                           │ │  Placeholder │  │  │
│                                           │ └─────────────┘  │  │
│                                           └───────────────────┘  │
│                                                                 │
│  [Form States:]                                                 │
│  • Floating labels (move up on focus/input)                    │
│  • Real-time validation (green check / red error)             │
│  • Submit: spinner → success toast → confetti burst            │
│  • Error: shake + inline message                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 8. FOOTER

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  © 2024 Your Name. Built with Next.js, Tailwind, & Framer Motion│
│                                                                 │
│  [GitHub] [LinkedIn] [Twitter] [Email] [RSS]        ▲ Top      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Interactive States Summary

| Element | Default | Hover | Focus | Active/Tap |
|---------|---------|-------|-------|------------|
| **Primary Button** | Filled accent | Glow + scale 1.02 | Ring | Scale 0.98 |
| **Secondary Button** | Glass border | Filled accent | Ring | Scale 0.98 |
| **Card** | Shadow-card | Lift -8px, glow border | Ring | - |
| **Nav Link** | Text-muted | Text-accent | Outline | - |
| **Icon Button** | Text-muted | Scale 1.1 + rotate | Ring | Scale 0.9 |
| **Project Card** | Static | 3D tilt + tech badges fade in | - | Open modal |
| **Skill Card** | Static | Lift + glow + icon scale | Ring | - |
| **Avatar Ring** | Rotating | Pause rotation | - | - |
| **Custom Cursor** | Dot + ring | Ring expands on magnetic | - | Click ripple |

---

## Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────────────┐
│  MOBILE (<640px)                                                │
│  ┌─────────────────────┐                                        │
│  │ ☰ Logo    🌙 ⌘K   │  Navbar: hamburger only                  │
│  ├─────────────────────┤                                        │
│  │                     │  Hero: Stacked (text → avatar)         │
│  │   Hi, I'm [Name]    │  Buttons: Full width, stacked          │
│  │   AI Engineer...    │                                        │
│  │  [Hire Me]          │                                        │
│  │  [Resume]           │                                        │
│  │                     │                                        │
│  │        [Avatar]     │  Avatar: Centered, smaller             │
│  │                     │                                        │
│  ├─────────────────────┤                                        │
│  │  About: Single col  │  Timeline: Left-aligned dots           │
│  │  Skills: 1 col      │  Projects: 1 col                       │
│  │  Contact: Form only │  GitHub: Horizontal scroll tables      │
│  └─────────────────────┘                                        │
├─────────────────────────────────────────────────────────────────┤
│  TABLET (640-1024px)                                            │
│  ┌─────────────────────────────────────┐                        │
│  │ Logo  Home About Projects Contact  │  Navbar: Full links    │
│  ├─────────────────────────────────────┤                        │
│  │  Hero: Side-by-side (60/40)        │                        │
│  │  Skills: 2-col grid                │                        │
│  │  Projects: 2-col grid              │                        │
│  │  Experience: Compact timeline      │                        │
│  └─────────────────────────────────────┘                        │
├─────────────────────────────────────────────────────────────────┤
│  DESKTOP (>1024px)                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Logo                    Home About Projects Contact 🌙 ⌘K│   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  Hero: Full layout, large type, max-width 1280px       │   │
│  │  All grids: 3-col (skills, projects, blog)             │   │
│  │  Custom cursor active, magnetic elements               │   │
│  │  Three.js background in Hero                           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Motion Choreography

### Page Load Sequence
```
0ms      ████████████████████████████████  Loading Screen (logo + bar)
800ms    ████████████░░░░░░░░░░░░░░░░░░░  Fade out loading
850ms    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Hero: Title slide up (stagger 0.1s)
950ms    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Hero: Subtitle fade
1050ms   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Hero: Buttons scale in
1150ms   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Hero: Avatar + particles fade
1250ms   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Navbar: Slide down
```

### Scroll Reveal (Per Section)
```
Section enters viewport (20% threshold)
    │
    ├─► Title: fadeUp (delay 0ms)
    ├─► Subtitle: fadeUp (delay 100ms)
    ├─► Cards/Items: staggerChildren (100ms each)
    │     ├─► Card 1: fadeUp + scale (delay 0ms)
    │     ├─► Card 2: fadeUp + scale (delay 100ms)
    │     └─► Card N: fadeUp + scale (delay N*100ms)
    └─► Counters: countUp (delay 200ms, duration 1.5s)
```

---

## Dark Mode Comparison

| Component | Light | Dark |
|-----------|-------|------|
| **Navbar** | `bg-white/80 blur-md` | `bg-gray-950/80 blur-md` |
| **Cards** | `bg-white shadow-card` | `bg-gray-900 shadow-card` |
| **Buttons (Primary)** | `bg-accent-500 text-white` | `bg-accent-500 text-white` |
| **Buttons (Secondary)** | `border-border-light hover:bg-surface-hover` | `border-border-dark hover:bg-surface-hover` |
| **Text Primary** | `#111827` | `#F9FAFB` |
| **Text Secondary** | `#374151` | `#D1D5DB` |
| **Borders** | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` |
| **Glow Shadows** | `rgba(91,110,255,0.3)` | `rgba(91,110,255,0.4)` |
| **Particle Dots** | `#5B6EFF / 0.4` | `#5B6EFF / 0.6` |
| **Gradient Blobs** | Subtle, low opacity | Slightly more visible |

---

## Easter Eggs & Delight Details

1. **Konami Code** (↑↑↓↓←→←→BA) → Confetti + title changes to "God Mode"
2. **Click logo 5x** → Spin animation + "Built with ❤️"
3. **404 Page** → Interactive glitch effect, "Lost in latency?"
4. **Midnight (00:00-06:00)** → Subtle "Night owl" badge in navbar
5. **Command Palette** → Type "theme" → cycle themes, "contact" → scroll to contact
6. **Hover skill icons** → Tiny tooltip with proficiency breakdown
7. **Scroll to bottom** → Rocket 🚀 appears in corner (back to top)

---

## Performance Budgets

| Metric | Budget | Measurement |
|--------|--------|-------------|
| **LCP** | < 2.0s | Hero image priority + preload |
| **CLS** | < 0.1 | Explicit dimensions, font display swap |
| **FID/INP** | < 100ms | Minimal main thread work, code splitting |
| **TTFB** | < 200ms | Edge functions, static generation |
| **JS Bundle** | < 150KB gz | Dynamic imports, tree shaking |
| **CSS** | < 20KB gz | Purged Tailwind, critical CSS inline |
| **Fonts** | < 50KB | Variable fonts, subset, preload |

---

## Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 110+ | Full support |
| Firefox | 115+ | Full support |
| Safari | 16+ | Full support (webkit prefixes) |
| Edge | 110+ | Full support |
| Mobile Safari | 16+ | Touch-optimized, no cursor |

---

*This visual specification serves as the design reference for implementation. All measurements in pixels unless noted. Colors are exact hex values from the palette.*