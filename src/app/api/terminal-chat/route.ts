import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `You are the terminal AI assistant on Safeer Ahmad's portfolio website (safeer.pro).
Safeer is a Senior Frontend & Automation Engineer with a background in Mechatronics Engineering based in Pakistan.
His core services:
1. Shopify & E-commerce Optimization (Dawn, Headless stores, bringing Lighthouse score to 90+).
2. Modern Web Apps (Astro, Next.js, WordPress Bricks/Elementor).
3. Automation Systems & AI workflow tooling (n8n workflows, Crawl4AI scraping scripts, automate manual tasks).

Your personality:
- You are representing Safeer. Keep answers short, direct, and slightly technical/terminal-like.
- Do not use exclamation marks, emojis, or corporate fluff. No "How can I help you today?". Focus on direct information delivery.
- If asked about pricing/rates: Safeer doesn't bill hourly. All projects are value-scoped individually. Suggest booking a discovery talk.
- If they want to contact or book a talk: Safeer's calendar link is https://cal.com/safeer-ahmad/15min and email is safeer@safeer.dev.
- Keep responses maximum 2-3 sentences.`;

    if (openRouterKey) {
      // Call OpenRouter with a free model fallback
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://safeer.pro",
        },
        body: JSON.stringify({
          model: "google/gemma-2-9b-it:free",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-5) // limit context
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const output = data.choices?.[0]?.message?.content;
        if (output) {
          return NextResponse.json({ text: output });
        }
      }
    }

    if (geminiKey) {
      // Direct Gemini API call
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            ...messages.slice(-5).map((m: { role: string; content: string }) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }]
            }))
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (output) {
          return NextResponse.json({ text: output });
        }
      }
    }

    // Default local smart fallback if no API keys are configured (so it never breaks)
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    let localResponse = "[AI-Agent]: Safeer is a Senior Technical Partner. For Shopify optimizations, custom Astro sites, or workflow automations, let's schedule a brief talk. Try basic commands like 'whoami' or 'services'.";

    if (lastUserMessage.includes("cost") || lastUserMessage.includes("price") || lastUserMessage.includes("rate") || lastUserMessage.includes("how much") || lastUserMessage.includes("pricing") || lastUserMessage.includes("charge")) {
      localResponse = "[AI-Agent]: Safeer doesn't bill hourly to prevent misalignment. All projects are value-quoted. Book a call to discuss details.";
    } else if (lastUserMessage.includes("contact") || lastUserMessage.includes("hire") || lastUserMessage.includes("call") || lastUserMessage.includes("book")) {
      localResponse = "[AI-Agent]: You can reach Safeer at safeer@safeer.dev or book a direct discovery talk at https://cal.com/safeer-ahmad/15min.";
    } else if (lastUserMessage.includes("who") || lastUserMessage.includes("experience") || lastUserMessage.includes("about") || lastUserMessage.includes("background")) {
      localResponse = "[AI-Agent]: Safeer is a Mechatronics Engineer turned Senior Dev. He builds headless stores, fast frontends, and automated backends and scripts directly for business founders.";
    } else if (lastUserMessage.includes("stack") || lastUserMessage.includes("skills") || lastUserMessage.includes("tech")) {
      localResponse = "[AI-Agent]: Stack includes Next.js/Astro, Shopify (Dawn/Headless), Node/FastAPI/Python, and n8n/AI tooling for automations.";
    }

    return NextResponse.json({ text: localResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ text: "[Terminal System Error]: Connection timed out. Please try standard CLI commands." });
  }
}
