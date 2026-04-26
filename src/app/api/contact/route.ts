import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 *
 * Current behavior: Validates input and logs to console (dev mode).
 *
 * Production options (pick one):
 * 1. automation webhook — POST to your n8n endpoint
 *    const res = await fetch(process.env.N8N_CONTACT_WEBHOOK_URL!, { ... })
 *
 * 2. Resend email API — send email directly
 *    import { Resend } from "resend";
 *    const resend = new Resend(process.env.RESEND_API_KEY);
 *    await resend.emails.send({ ... })
 *
 * 3. Database — save to Supabase, PlanetScale, etc.
 *
 * 4. Formspree / GetForm — third-party form backend
 *    const res = await fetch("https://formspree.io/f/yourId", { ... })
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, brief } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Rate limiting (simple in-memory — use Redis/Upstash for production)
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const cooldownMs = 60_000; // 1 minute between submissions per IP

    // In production, use Redis: await redis.set(`rate:${ip}`, now, "EX", 60);
    const lastSubmission = rateLimitStore.get(ip);
    if (lastSubmission && now - lastSubmission < cooldownMs) {
      return NextResponse.json(
        { error: "Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    rateLimitStore.set(ip, now);

    // TODO: Replace with real delivery (automation webhook, email, database, etc.)
    if (process.env.NODE_ENV !== "production") {
      console.log("[Contact Form Submission]", { name, email, brief });
    }

    // If N8N webhook URL is configured, forward the submission
    if (process.env.N8N_CONTACT_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_CONTACT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, brief, timestamp: new Date().toISOString() }),
        });
      } catch (webhookError) {
        console.error("[Contact Form] Webhook forwarding failed:", webhookError);
        // Don't fail the response — we still want to thank the user
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// Simple in-memory rate limit store (resets on server restart)
const rateLimitStore = new Map<string, number>();
