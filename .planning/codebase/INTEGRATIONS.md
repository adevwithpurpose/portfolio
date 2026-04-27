# Integrations

Source: README, AGENTS, layout/page source.

## Public web

- Vercel hosts the site.
- Fallback live URL: `https://portfolio-flame-psi-75.vercel.app`.
- `safeer.dev` is intended production domain but DNS must be verified from the active environment.

## CTAs

- Calendly booking URL in `src/app/page.tsx`: `https://calendly.com/saf08/30min`.
- Floating WhatsApp CTA exists in `FloatingWhatsAppButton`.

## Contact form

Environment variables documented in README:
- `CONTACT_WEBHOOK_URL` — optional generic webhook forwarding.
- `RESEND_API_KEY` — optional direct email delivery.

Do not expose raw tokens or secrets in docs/maps.

## Analytics

- `useAnalytics` is imported in `src/app/page.tsx`.
- Tracks section views and CTA clicks.
- Inspect `src/lib/useAnalytics` before changing event names or behavior.
