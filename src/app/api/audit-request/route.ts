import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limit store (resets on server restart)
const rateLimitStore = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { url, email, name, message } = body;

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
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
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
            name: name || null,
            message: message || null,
            timestamp: new Date().toISOString(),
            ip,
          }),
        });
      } catch (webhookError) {
        console.error("[Audit API] n8n Webhook forward failed:", webhookError);
      }
    }

    // 4. Send Notification Email to Inbox via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const toAddress = process.env.RESEND_TO_ADDRESS;
    const fromAddress = process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev";

    if (!resendApiKey) {
      console.error("[Audit API] Configuration Error: Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Email delivery service is not configured." },
        { status: 500 }
      );
    }

    if (!toAddress) {
      console.error("[Audit API] Configuration Error: Missing RESEND_TO_ADDRESS environment variable.");
      return NextResponse.json(
        { error: "Recipient email address is not configured." },
        { status: 500 }
      );
    }

    const auditId = `AUD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestampStr = new Date().toISOString();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Site-Audit Lead</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0b0e; color: #e4e4e7; margin: 0; padding: 40px 20px; }
          .container { max-width: 580px; margin: 0 auto; background: #131215; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 40px; }
          .header { border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 20px; font-weight: bold; color: #ffffff; text-decoration: none; }
          .logo span { color: #3b82f6; }
          .status-badge { display: inline-block; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); color: #60a5fa; font-size: 10px; font-family: monospace; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-top: 10px; }
          h1 { font-size: 22px; font-weight: 800; color: #ffffff; margin-top: 0; }
          p { font-size: 14px; line-height: 1.6; color: #a1a1aa; }
          .details { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 25px 0; font-family: monospace; font-size: 13px; }
          .details-row { display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.02); padding-bottom: 8px; }
          .details-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
          .details-label { color: #71717a; min-width: 120px; }
          .details-value { color: #ffffff; text-align: right; word-break: break-all; }
          .footer { margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; font-size: 11px; color: #52525b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="logo">Safeer<span>.</span></span>
            <br />
            <span class="status-badge">New Lead Received</span>
          </div>
          
          <h1>Audit Sandbox Lead Created</h1>
          <p>A user has initiated a website performance audit request from your interactive sandbox section.</p>
          
          <div class="details">
            <div class="details-row">
              <span class="details-label">Lead Website:</span>
              <span class="details-value">${url}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Lead Email:</span>
              <span class="details-value">${email}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Lead Name:</span>
              <span class="details-value">${name || "Not provided"}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Lead Message:</span>
              <span class="details-value">${message || "Not provided"}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Triage ID:</span>
              <span class="details-value">${auditId}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Request IP:</span>
              <span class="details-value">${ip}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Timestamp:</span>
              <span class="details-value">${timestampStr}</span>
            </div>
          </div>
          
          <div class="footer">
            This lead notification email was automatically generated and routed by your Next.js API endpoint.<br />
            © ${new Date().getFullYear()} Safeer Ahmad. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    const emailText = `
New Lead: Audit Request Initiated
=================================

Triage ID: ${auditId}
Lead Website: ${url}
Lead Email: ${email}
Lead Name: ${name || "Not provided"}
Lead Message: ${message || "Not provided"}
Request IP: ${ip}
Timestamp: ${timestampStr}

Sent from your Next.js Portfolio API.
    `.trim();

    try {
      const mailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: toAddress,
          subject: `New Lead: Site-Audit Request [${auditId}]`,
          html: emailHtml,
          text: emailText,
        }),
      });

      if (!mailRes.ok) {
        const errData = await mailRes.json().catch(() => ({}));
        console.error("[Audit API] Resend email delivery failed:", errData);
        return NextResponse.json(
          { error: errData.message || "Resend email delivery service error." },
          { status: 502 }
        );
      }
      
      const successData = await mailRes.json().catch(() => ({}));
      console.log("[Audit API] Resend email sent successfully:", successData);

    } catch (emailError: any) {
      console.error("[Audit API] Fatal Resend integration error:", emailError);
      return NextResponse.json(
        { error: emailError.message || "Failed to make outbound connection to email service." },
        { status: 502 }
      );
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