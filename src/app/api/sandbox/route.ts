import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, brief } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
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

    // Rate limiting using IP headers
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const cooldownMs = 15_000; // 15 seconds cooldown for sandbox to keep it interactive but prevent abuse

    const lastSubmission = rateLimitStore.get(ip);
    if (lastSubmission && now - lastSubmission < cooldownMs) {
      return NextResponse.json(
        { error: "Please wait 15 seconds before submitting again." },
        { status: 429 }
      );
    }
    rateLimitStore.set(ip, now);

    const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL;
    let webhookStatus = 200;
    let webhookStatusText = "OK";
    let forwarded = false;

    if (contactWebhookUrl) {
      forwarded = true;
      try {
        const res = await fetch(contactWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name: name || "Sandbox Tester",
            brief: brief || "Interacted via portfolio sandbox section.",
            source: "portfolio-sandbox",
            timestamp: new Date().toISOString(),
          }),
        });
        webhookStatus = res.status;
        webhookStatusText = res.statusText || (res.status === 200 ? "OK" : "Status " + res.status);
      } catch (webhookError: unknown) {
        console.error("[Sandbox Form] Webhook forwarding failed:", webhookError);
        webhookStatus = 502;
        webhookStatusText = webhookError instanceof Error ? webhookError.message : "Bad Gateway";
      }
    } else {
      // Dev mock response wait time
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    return NextResponse.json({
      success: webhookStatus >= 200 && webhookStatus < 300,
      webhookStatus,
      webhookStatusText,
      forwarded,
      mocked: !contactWebhookUrl,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error." },
      { status: 500 }
    );
  }
}

// Simple rate limit map
const rateLimitStore = new Map<string, number>();
