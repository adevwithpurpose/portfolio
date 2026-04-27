# Structure

Source: `README.md`, `AGENTS.md`, file inventory.

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── private/pricing/page.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Services.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── WhyMeSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── Contact.tsx
│   │   └── visual/interaction components
│   └── lib/
├── public/
├── docs/
│   ├── 00-admin/
│   ├── 01-strategy/
│   ├── 02-research/
│   ├── 03-offers/
│   ├── 04-outreach/
│   ├── 05-linkedin-presence/
│   ├── 06-progress/
│   └── 07-playbooks/
├── deploy/
├── AGENTS.md
├── CLAUDE.md
├── README.md
└── package.json
```

## Component roles

- `src/app/page.tsx` owns homepage section ordering, scroll progress, section tracking, nav dots, floating WhatsApp CTA, and background effects.
- `src/app/layout.tsx` owns metadata, viewport, Inter font, body styling.
- Section components own public copy and UI for each conversion block.
- `docs/` owns acquisition strategy and proof assets; legacy-prefixed files are historical/source material, not default public positioning.
