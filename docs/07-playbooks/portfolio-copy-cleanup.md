# Playbook — Portfolio Copy Cleanup

Maturity: beta

## Goal

Update safeer.dev to present Safeer as an Automation & Web Systems / AI Systems partner, without over-indexing on any specific tool or niche.

## Steps

1. Check status:
   ```bash
   git status
   ```
2. Review current public sections in `src/app/page.tsx` and `src/components/`.
3. Replace niche/tool-first copy with outcome-first copy:
   - websites that convert and feel credible
   - automations that remove manual follow-up
   - AI assistants/internal tools that reduce operational drag
   - dashboards/reporting that improve visibility
4. Preserve proof, but abstract sensitive/client-specific details.
5. Run:
   ```bash
   npm run build
   ```
6. Review diff before commit.

## Avoid

- hype-heavy AI language
- claiming unsupported results
- public client details without approval
- making the homepage a Shopify/n8n-only offer
