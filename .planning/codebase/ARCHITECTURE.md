# Architecture

Source: `src/app/page.tsx`, `src/app/layout.tsx`, README.

## Page flow

The homepage is a single client component with conversion-ordered sections:

1. `Hero`
2. `SocialProof`
3. `Services` for three offers
4. `ProcessSection`
5. `CaseStudies`
6. `WhyMeSection`
7. `FAQSection`
8. `Contact`
9. `Footer`

## Interaction flow

- `SECTION_IDS` in `src/app/page.tsx` is the registry for rendered section order.
- Intersection callbacks update `activeSection` and call analytics section tracking once per page load.
- Navigation dots call `scrollIntoView` and trigger the scan-line visual.
- Scroll progress uses a passive window scroll listener.
- Floating WhatsApp button remains available bottom-right.

## Metadata

- Metadata is in `src/app/layout.tsx`.
- `metadataBase`, OpenGraph, and Twitter card currently point at the Vercel fallback URL.
- Public title/description frame Safeer as automation + web development.

## Content architecture

The public site should present Safeer as a premium systems builder:
- custom AI agents
- automation systems
- web systems/platforms
- workflow cleanup
- internal tools / operational visibility

Docs support client acquisition, offers, outreach, LinkedIn proof, and playbooks.
