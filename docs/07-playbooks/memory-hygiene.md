# Playbook — Memory Hygiene

Maturity: beta

## Goal

Keep Hermes/Honcho/Obsidian memory useful without leaking secrets or accumulating stale noise.

## Rules

- Save durable user preferences and stable environment facts only.
- Do not save temporary progress, raw credentials, or one-off task state.
- Use Obsidian reports for large research outputs.
- Use skills for reusable procedures.
- Use session search for past task progress.

## Privacy filter checklist

Before saving memory or writing reports, remove:

- API keys and bearer tokens
- GitHub/Vercel tokens
- `.env` contents
- private client details not needed later
- raw passwords/private keys

## Monthly check

1. Review active memories for stale or overly specific entries.
2. Move long procedures into skills/playbooks.
3. Keep USER profile concise.
4. Confirm vault sync is healthy before relying on notes.
