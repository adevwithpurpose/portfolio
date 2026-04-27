# Playbook — Quiet-Hours Notification Gate

Maturity: beta

## Goal

Prevent automated jobs from disturbing Safeer on WhatsApp during non-urgent hours.

## Default timezone

Asia/Karachi, UTC+5.

## Quiet hours

Default hold window: 23:00–08:00 local time.

## Rule

Before a scheduled job sends WhatsApp output:

1. Check current Karachi time.
2. If inside quiet hours and not urgent, save output to local report/cron output.
3. Deliver when Safeer next messages or after 08:00.
4. Critical security/outage alerts may bypass only if explicitly configured.

## Message classes

Send immediately:
- user-requested task results while active
- critical outage/security alerts

Hold:
- daily summaries
- research digests
- non-urgent reminders
- routine health checks
