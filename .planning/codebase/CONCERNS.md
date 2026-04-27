# Concerns and Open Loops

Last refreshed: 2026-04-27.

## Known concerns

- `safeer.dev` DNS was not resolving from the server in the prior session; use Vercel fallback until verified.
- README says Next.js 16.2.2 in prose but `package.json` dependency is `^16.2.4`; treat package.json as the install truth and update prose if needed.
- Some component names still reflect older positioning, e.g. `StorefrontVisual.tsx`; inspect before assuming public copy is stale.
- Legacy docs intentionally preserve old niche material; do not delete without explicit approval.

## Future map refresh triggers

- homepage section order changes
- new offer/pricing model
- contact/analytics integration changes
- Vercel/domain changes
- major design system refresh
