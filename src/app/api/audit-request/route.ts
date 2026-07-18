import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limit store (resets on server restart)
const rateLimitStore = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, email } = body;

    // 1. Validation
    if (!url || !email) {
      return NextResponse.json(
        { error: "Both URL and Email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Basic URL checker
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json(
        { error: "Please enter a valid website URL." },
        { status: 400 }
      );
    }

    // 2. Rate Limiting (max 1 submission per 2 minutes per IP)
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const cooldownMs = 120_000;

    const lastSubmission = rateLimitStore.get(ip);
    if (lastSubmission && now - lastSubmission < cooldownMs) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a minute before submitting another audit." },
        { status: 429 }
      );
    }
    rateLimitStore.set(ip, now);

    // 3. Webhook Alert to n8n (for Safeer's tracking)
    const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (contactWebhookUrl) {
      try {
        await fetch(contactWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trigger: "sandbox_audit",
            url,
            email,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error("[Audit API] n8n Webhook forward failed:", webhookError);
      }
    }

    // 4. Send Confirmation Email to Client via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Website Performance Audit Queued</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0b0e; color: #e4e4e7; margin: 0; padding: 40px 20px; }
            .container { max-width: 580px; margin: 0 auto; background: #131215; border: 1px border; border-color: rgba(255,255,255,0.05); border-radius: 12px; padding: 40px; }
            .header { border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 20px; font-weight: bold; color: #ffffff; text-decoration: none; }
            .logo span { color: #3b82f6; }
            .status-badge { display: inline-block; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); color: #60a5fa; font-size: 10px; font-family: monospace; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-top: 10px; }
            h1 { font-size: 22px; font-weight: 800; color: #ffffff; margin-top: 0; }
            p { font-size: 14px; line-height: 1.6; color: #a1a1aa; }
            .details { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 25px 0; font-family: monospace; font-size: 13px; }
            .details-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .details-row:last-child { margin-bottom: 0; }
            .details-label { color: #71717a; }
            .details-value { color: #ffffff; }
            .btn { display: inline-block; background: #2563eb; color: #ffffff !important; font-size: 13px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 6px; text-align: center; margin-top: 20px; }
            .footer { margin-top: 40px; border-t: 1px solid rgba(255,255,255,0.05); pt: 20px; font-size: 11px; color: #52525b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <a href="https://safeer.pro" class="logo">Safeer<span>.</span></a>
              <br />
              <span class="status-badge">Audit Pipeline: Queued</span>
            </div>
            
            <h1>Audit Execution Initialized</h1>
            <p>Your request to audit the performance, speed metrics, and conversion layout funnel of your site has been registered successfully.</p>
            
            <div class="details">
              <div class="details-row">
                <span class="details-label">Target Website:</span>
                <span class="details-value">${url}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Lead Email:</span>
                <span class="details-value">${email}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Triage ID:</span>
                <span class="details-value">AUD-${Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
              </div>
            </div>

            <p>Safeer is currently parsing your website performance vectors. We will deliver a complete speed blueprint and objection action report to this inbox shortly.</p>
            
            <a href="https://cal.com/safeer-ahmad/15min" class="btn">Book a call with Safeer</a>
            
            <div class="footer">
              This email was automatically generated and routed by Safeer's portfolio API pipeline.<br />
              © ${new Date().getFullYear()} Safeer Ahmad. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `;

      try {
        const mailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Safeer's Platform <safeer@safeer.dev>",
            to: email,
            subject: "Performance & CRO Audit Initiated",
            html: emailHtml,
          }),
        });

        if (!mailRes.ok) {
          const errData = await mailRes.json();
          console.error("[Audit API] Resend email delivery failed:", errData);
        }
      } catch (emailError) {
        console.error("[Audit API] Resend integration failed:", emailError);
      }
    } else {
      console.log("[Audit API Dev Mode Logs] Executed submission safely:", { url, email });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Audit API Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
