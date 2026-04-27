# Playbook — Portfolio Deploy

Maturity: beta

## Goal

Safely deploy safeer.dev after verified changes.

## Steps

1. Confirm working tree:
   ```bash
   git status
   ```
2. Run build:
   ```bash
   npm run build
   ```
3. Inspect diff:
   ```bash
   git diff --stat
   git diff
   ```
4. Commit with a clear message.
5. Push to GitHub main to trigger Vercel.
6. Verify deployment status with Vercel/GitHub if available.

## Safety

- Never print raw tokens.
- Do not deploy unreviewed sensitive copy.
- If build fails, fix before pushing.
