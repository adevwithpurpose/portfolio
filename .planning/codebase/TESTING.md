# Testing and Verification

Source: README, package.json, AGENTS.

## Standard checks

Run before deploy or final code-change claims:

```bash
npm run lint
npm run build
```

## Positioning guardrail search

Use a source search equivalent to:

```bash
rg -n "Shopify|n8n|e-?commerce|\$18/hr|\$20/hr|\$25/hr|your-profile|12,847" src README.md AGENTS.md llms.txt
```

Expected: no stale main-site identity/tool-specific positioning. Guardrail mentions are okay when explicitly warning not to use them.

## UI checks

For visible changes:
- open local or deployed URL in browser
- check console errors
- verify responsive layout
- capture screenshot if useful
- update `.planning/verification/UAT.md` for non-trivial changes

## Deploy verification

- Push to `main` triggers Vercel.
- Verify deployment status and live URL before claiming production ready.
- If `safeer.dev` DNS fails, use Vercel fallback URL and state the DNS issue.
