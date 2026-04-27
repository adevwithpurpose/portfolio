# Anti-Patterns — Safeer's Portfolio + Hermes System

Maturity: production
Last updated: 2026-04-26

## Public positioning anti-patterns

- Do not make the main site look like a Shopify-only or n8n-only freelancer page.
- Do not lead with a tool list. Lead with business outcomes: cleaner workflows, better websites, internal tools, operational visibility.
- Do not use hype-heavy AI language or unverifiable claims.
- Do not expose sensitive client details, private revenue numbers, credentials, or internal workflow screenshots without explicit approval.
- Do not publish unverified market/pricing claims.

## Agent/system anti-patterns

- Do not install experimental memory systems on the production Hermes server just because they look interesting.
- Do not run parallel memory systems beside Honcho unless a specific limitation is proven.
- Do not store raw API keys/tokens in notes, reports, summaries, screenshots, or memory.
- Do not add huge system prompts when a focused skill, resolver, or linked doc can be loaded instead.
- Do not create duplicate skills/docs before checking the inventory and resolver.

## Cron/automation anti-patterns

- Do not schedule long inline prompts. Use thin prompts that reference a skill or workflow file.
- Do not send non-urgent WhatsApp notifications during quiet hours.
- Do not schedule every job at `:00`; stagger jobs.
- Do not automate outreach without platform rules and human review.
- Do not let automations spend money, deploy public changes, or message clients without explicit scope.

## Development anti-patterns

- Do not edit Next.js code without checking the project's current conventions.
- Do not deploy without build verification.
- Do not overwrite user-authored docs; patch or add assistant-managed notes.
- Do not rewrite the whole vault structure without explicit permission.

## Research anti-patterns

- Do not treat generated summaries as verified sources.
- Do not copy claims from old docs into public copy without current verification.
- Do not use Reddit/LinkedIn/Upwork automation advice without checking platform risk.
