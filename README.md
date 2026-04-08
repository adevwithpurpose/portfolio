# Safeer — Portfolio Website

> **Personal Brand Portfolio** for Safeer — Shopify Automation & AI Systems Engineer
> **Built with:** Next.js 16, Tailwind CSS v4, GSAP 3, Framer Motion

---

## Quick Start

```bash
cd D:\antigravity\Portfolio_Building\portfolio

# Install dependencies
npm install

# Start dev server (default port: 3077)
node node_modules/next/dist/bin/next dev -p 3077

# Build for production
npm run build

# Start production server
npm run start
```

---

## Architecture Overview

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | GSAP 3 + ScrollTrigger, Framer Motion |
| Fonts | Inter (Google Fonts via next/font) |
| Deployment | Vercel (project ID: `prj_pDLXesIpfP8iwOM6owknU5EDRRzy`) |

### Scroll Architecture
- **CSS Scroll-Snap** handles desktop full-screen section snapping (`globals.css`)
- **IntersectionObserver** in `SectionWrapper` detects active sections
- **Lenis removed** — native smooth scroll with CSS snap is faster and more reliable
- **Prefers-reduced-motion** respected throughout

---

## Page Structure (10 Sections)

```
0. Hero             → Problem-focused headline + photo + CTAs
1. Social Proof     → 3 realistic testimonials + live activity ticker
2. Service 1        → Custom Web Development ($18/hr → $30/hr)
3. Service 2        → Intelligent Automation ($20/hr → $45/hr)
4. Service 3        → AI Agents ($25/hr → $55/hr)
5. Process          → "Three Steps. Zero Headaches."
6. Case Studies     → 2 anonymized case studies with metrics
7. Why Me vs Agency → Comparison table + savings calculator
8. FAQ              → 5 common questions (accordion)
9. Contact          → Project estimates + Calendly + WhatsApp + Email
Footer              → Social links, copyright, quick nav
```

### Section Registry (page.tsx)
```ts
const SECTION_IDS = [
  "hero", "social-proof", "service-1", "service-2", "service-3",
  "process", "case-studies", "why-me", "faq", "contact"
] as const;
```

---

## Pricing Strategy

| Service | First Project | Standard Rate |
|---------|--------------|---------------|
| Custom Web Development | $18/hr | $30/hr |
| Intelligent Automation | $20/hr | $45/hr |
| AI Agents & Systems | $25/hr | $55/hr |

**Project Estimates (shown in Contact section):**
- Simple Website: **$360–$450** (20-25 hrs × $18/hr)
- Simple Automation: **$200–$300** (10-15 hrs × $20/hr)
- Simple AI Agent: **$375–$500** (15-20 hrs × $25/hr)

**Hidden Full Pricing:** Available at `/private/pricing` (not linked publicly).

---

## Component Inventory

| Component | Purpose |
|-----------|---------|
| `Hero.tsx` | Main headline, headshot photo, CTAs, "Perfect For" tags, live counter |
| `SocialProof.tsx` | 3 realistic testimonials + activity ticker |
| `Services.tsx` | 3 service sections with visuals, pricing, bullets |
| `ProcessSection.tsx` | 3-step process with animated connectors |
| `CaseStudies.tsx` | 2 anonymized case studies with metrics |
| `WhyMeSection.tsx` | Agency comparison table + savings calculator |
| `FAQSection.tsx` | 5 expandable FAQ items |
| `Contact.tsx` | Project estimate cards, Calendly, WhatsApp, Email |
| `Footer.tsx` | Social links, copyright, quick nav |
| `NavigationDots.tsx` | Fixed right-side nav with 10 dots + labels |
| `FloatingWhatsAppButton.tsx` | Fixed bottom-right with hover tooltip |
| `StorefrontVisual.tsx` | Service 1: Live storefront builder animation |
| `WorkflowVisual.tsx` | Service 2: n8n workflow with data packets |
| `AgentServiceVisual.tsx` | Service 3: Live ops dashboard |
| `SectionWrapper.tsx` | Shared wrapper + IntersectionObserver |
| `AnimatedGridBackground.tsx` | Subtle grid overlay |
| `FloatingNodes.tsx` | Canvas-based floating particles |
| `ScanLine.tsx` | Nav dot click effect |
| `StatsBanner.tsx` | Deprecated (replaced by live counters) |
| `LenisProvider.tsx` | Deprecated (replaced by CSS scroll-snap) |

---

## Wow Factors & Conversion Elements

| Element | Location | Purpose |
|---------|----------|---------|
| Fixed Header | Top of page | "Safeer." logo + "Book a Call" button always visible |
| Scroll Progress Bar | Top edge | Blue gradient bar showing scroll depth |
| Live Hours Counter | Hero | "12,847 hours saved for clients this year" |
| "Perfect For" Tags | Hero | "Shopify Brands $100K–$2M" etc. |
| Professional Headshot | Hero | Photo with gradient ring + green verification badge |
| Live Activity Ticker | Social Proof | "3 new projects delivered this week" |
| Animated Data Packets | Service 2 | Cyan dots flowing through workflow lines |
| Live Ops Dashboard | Service 3 | Real-time inquiry processing visualization |
| Process Connectors | Process Section | Animated flow line + arrow between steps |
| Savings Calculator | Why Me | "$15,000 → $2,100 (86% less)" |
| FAQ Accordion | FAQ Section | 5 questions with smooth expand/collapse |
| Project Estimates | Contact | 3 cards showing exact first-project costs |
| Risk Reversal Badge | Contact | "Satisfaction guaranteed — refund if not happy" |
| WhatsApp Tooltip | Floating button | "Prefer WhatsApp? Just say hi 👋" |

---

## Customization Guide

### Colors
Edit `globals.css` `:root`:
```css
:root {
  --background: #09090b;
  --foreground: #fafafa;
  --blue-500: #2563eb;
  --blue-600: #1d4ed8;
  --blue-400: #3b82f6;
  --cyan-500: #06b6d4;
}
```

### Adding a New Section
1. Add its ID to `SECTION_IDS` in `page.tsx`
2. Add a label to `labels` in `NavigationDots.tsx`
3. Render the component with an `onEnter` callback
4. Ensure the section has `id="your-id"` and `snap-section` class

### Updating Service Pricing
Edit the `services` array in `Services.tsx`:
```ts
{
  regularPrice: "$30/hr",
  introPrice: "$18/hr",
  // ...
}
```

### Replacing Testimonials
Edit the `testimonials` array in `SocialProof.tsx`. Keep metrics specific for credibility.

### Adding a New FAQ
Edit the `faqs` array in `FAQSection.tsx`:
```ts
{ q: "Your question?", a: "Your answer." }
```

---

## Deployment

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd D:\antigravity\Portfolio_Building\portfolio
vercel --prod
```

### Environment Variables
| Variable | Purpose | Required |
|----------|---------|----------|
| `N8N_CONTACT_WEBHOOK_URL` | Forward contact form to n8n | No |

### Custom Domain
1. Add domain in Vercel dashboard → Project → Domains
2. Update `url` in `layout.tsx` `openGraph` config
3. Add DNS records per Vercel's instructions

---

## Performance & Accessibility

### Optimizations
- CSS scroll-snap (no JS wheel interception)
- `IntersectionObserver` for section detection (no scroll polling)
- `requestAnimationFrame` for canvas animations
- `prefers-reduced-motion` respected
- High-DPI canvas (`devicePixelRatio`)
- `will-change` hints on animated elements
- `React.lazy` + `Suspense` for below-fold sections

### Accessibility
- All interactive elements have `aria-label`
- Keyboard navigation for FAQ accordion
- Focus states on all buttons
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<section>`)
- `prefers-reduced-motion` disables animations

### Lighthouse Targets
| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

---

## File Structure
```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Metadata, OG tags, viewport, font
│   │   ├── page.tsx            # Main page: section registry, analytics
│   │   ├── globals.css         # Tailwind, scroll-snap, animations
│   │   ├── api/contact/route.ts # Contact form API
│   │   └── private/pricing/    # Hidden pricing page
│   ├── components/             # All UI components
│   └── lib/                    # Utilities (analytics hook)
├── public/
│   ├── safeer.webp             # Professional headshot
│   └── og-image.svg            # Open Graph image
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Known Limitations
1. GSAP ScrollTrigger + CSS Snap may fire slightly late on snap transitions (cosmetic only)
2. Contact form rate limiting is in-memory only (use Redis for production multi-instance)
3. Canvas layers (grid + nodes) run simultaneously; reduce `count` on low-end devices
4. Email capture form not implemented (requires backend)

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-06 | Full conversion audit: hero rewrite, service rename, process section, agency comparison, baseline pricing, social proof, contact simplification, section restructuring |
| 2026-04-06 | Service visuals redesigned: Storefront, Workflow, Agent Dashboard |
| 2026-04-06 | Pricing updated: $18/$30, $20/$45, $25/$55 with project estimates |
| 2026-04-06 | Wow factors added: live counters, savings calculator, scroll progress, headshot |
| 2026-04-06 | FAQ section, Footer, Risk Reversal, WhatsApp tooltip added |
| 2026-04-06 | Lenis removed, CSS scroll-snap implemented, IntersectionObserver for sections |
| 2026-04-06 | High-DPI canvas support, reduced-motion support, accessibility improvements |
| 2026-04-04 | Initial project setup, component creation |

---

## License
Private — All rights reserved to Safeer.
