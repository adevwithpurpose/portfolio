"use client";

import React, { useState, useRef, useEffect } from "react";

type LogLine = {
  id: string;
  type: "input" | "info" | "success" | "error";
  text: string;
};

export default function LeadAudit() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [logs, setLogs] = useState<LogLine[]>([
    { id: "init1", type: "info", text: "Systems Ready. API Listener listening on port 443..." }
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, type: LogLine["type"]) => {
    setLogs((prev) => [...prev, { id: Math.random().toString(), type, text }]);
  };

  const handleAuditRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "running") return;

    if (!url.trim() || !email.trim()) {
      setErrorMessage("Both URL and email fields are required.");
      setStatus("error");
      addLog("Error: Missing submission payload values.", "error");
      return;
    }

    setStatus("running");
    setErrorMessage("");
    setLogs([
      { id: "run1", type: "input", text: `run-performance-audit --url="${url}" --recipient="${email}"` }
    ]);

    await new Promise((r) => setTimeout(r, 600));
    addLog("[API] Creating secure connection handshakes... (Vercel Serverless)", "info");

    await new Promise((r) => setTimeout(r, 800));
    addLog(`[API] Validating target domain: ${url}`, "info");

    try {
      const res = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Execution failed.");
      }

      await new Promise((r) => setTimeout(r, 800));
      addLog("[SYSTEM] Dispatching outbound webhook payload to Safeer's n8n server...", "info");

      await new Promise((r) => setTimeout(r, 600));
      addLog("[SYSTEM] Client verification authenticated.", "success");

      await new Promise((r) => setTimeout(r, 600));
      addLog(`[SUCCESS] Email queued & dispatched to: ${email}`, "success");
      addLog("[Success] Audit request triaged safely. Handshake resolved (HTTP 200). Pipeline exit.", "success");

      setStatus("success");
      setUrl("");
      setEmail("");
    } catch (err: any) {
      await new Promise((r) => setTimeout(r, 600));
      const message = err.message || "Failed to execute API route.";
      addLog(`[CRITICAL ERROR] Pipeline failed: ${message}`, "error");
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="lead-audit" className="relative py-20 overflow-hidden border-t border-white/5 bg-black/60">
      {/* Background glowing circle */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-12 right-12 w-64 h-64 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full">
        {/* Eyebrow badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-400/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Interactive Sandbox &mdash; API Pipeline
        </div>

        {/* Header */}
        <div className="mb-12 max-w-2xl text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Trigger a Live API Integration
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Test a live automated workflow right now. Submit your website and email below: our Next.js API will execute, alert my channels, and dispatch an instant audit confirmation report directly to your inbox.
          </p>
        </div>

        {/* Outer Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl border border-white/10 bg-[#070709]/80 backdrop-blur-md p-6 sm:p-8">
          
          {/* LEFT: Submission Form */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block mb-4">
                Configure Payload inputs:
              </span>
              <form onSubmit={handleAuditRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5 font-bold">
                    Website URL:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. client-site.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={status === "running"}
                    className="w-full bg-[#121215]/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5 font-bold">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "running"}
                    className="w-full bg-[#121215]/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all font-mono"
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-400 text-xs font-mono select-none">
                    Error: {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "running"}
                  className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-xs font-mono font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 disabled:opacity-50 disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed mt-2"
                >
                  {status === "running" ? (
                    <>
                      <span className="h-3 w-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Executing Pipeline...
                    </>
                  ) : (
                    "Trigger Audit Pipeline"
                  )}
                </button>
              </form>
            </div>

            <p className="text-[10px] text-zinc-500 font-mono mt-6 leading-relaxed">
              * Rates are limited by IP to prevent server spam. All data is handled programmatically via server webhook endpoints.
            </p>
          </div>

          {/* RIGHT: Live API Terminal Monitor */}
          <div className="lg:col-span-7 flex flex-col rounded-xl border border-white/5 bg-black/40 overflow-hidden font-mono min-h-[300px]">
            {/* Header Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#121215]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-2 text-[10px] text-zinc-500 uppercase tracking-widest">
                API Pipeline Monitor &mdash; stdout
              </span>
            </div>

            {/* Terminal Logging logs */}
            <div
              ref={scrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-2 text-xs text-zinc-300 text-left custom-scrollbar h-[260px]"
            >
              {logs.map((log) => {
                let color = "text-zinc-400";
                if (log.type === "input") color = "text-blue-400 font-bold";
                if (log.type === "success") color = "text-green-400";
                if (log.type === "error") color = "text-red-400 font-bold";

                return (
                  <div key={log.id} className={`${color} leading-relaxed animate-in fade-in fill-mode-forwards duration-200`}>
                    {log.type === "input" && <span className="text-zinc-500 mr-2">visitor@safeer-os:~$</span>}
                    {log.text}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}

// Wrapper mock section container integration matching rest of layout
function SectionWrapper({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`w-full ${className || ""}`}>
      {children}
    </section>
  );
}
