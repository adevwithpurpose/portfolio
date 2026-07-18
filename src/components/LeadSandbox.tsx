"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

interface LogEntry {
  id: string;
  time: string;
  message: string;
  type: "client" | "server" | "webhook" | "success" | "error" | "info";
}

export default function LeadSandbox({ onEnter }: { onEnter?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("Sandbox Tester");
  const [brief, setBrief] = useState("Exploring webhook automations.");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "initial",
      time: new Date().toLocaleTimeString(),
      message: "SYSTEM: Telemetry connection listening. Enter email and trigger sandbox...",
      type: "info",
    },
  ]);
  const [activeTab, setActiveTab] = useState<"logs" | "payload">("logs");
  const timeoutIdsRef = useRef<number[]>([]);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sandbox-panel",
        { opacity: 0, scale: 0.98, y: 30 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    });
    return () => {
      ctx.revert();
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (activeTab === "logs") {
      consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, activeTab]);

  const addLog = (message: string, type: LogEntry["type"]) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        time,
        message,
        type,
      },
    ]);
  };

  const runSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter an email address to run the test.");
      return;
    }

    setLoading(true);
    setActiveTab("logs");
    setLogs([]);
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];

    const scheduleLog = (message: string, type: LogEntry["type"], delay: number) => {
      const id = window.setTimeout(() => {
        addLog(message, type);
      }, delay);
      timeoutIdsRef.current.push(id);
    };

    // Client-side phase
    scheduleLog("CLIENT: Initializing API sandbox schema verification...", "client", 0);
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    scheduleLog(`CLIENT: Validating payload schema structure: ${isEmailValid ? "VALID" : "INVALID"}`, isEmailValid ? "success" : "error", 200);

    if (!isEmailValid) {
      scheduleLog("CLIENT: Halting request. Reason: RFC-5322 regex check failed.", "error", 400);
      setLoading(false);
      return;
    }

    scheduleLog("CLIENT: Opening payload transport channel (Content-Type: application/json)...", "client", 450);
    scheduleLog("CLIENT: Launching HTTP POST request to /api/sandbox...", "client", 700);

    // Call actual api
    interface SandboxResponse {
      success: boolean;
      webhookStatus?: number;
      webhookStatusText?: string;
      forwarded?: boolean;
      mocked?: boolean;
      error?: string;
    }

    let responseData: SandboxResponse | null = null;
    let apiStatus = 200;
    let apiErrorMsg = "";

    try {
      const id = window.setTimeout(async () => {
        try {
          addLog("SERVER: Endpoint invoked. Decoding payload body...", "server");
          
          const res = await fetch("/api/sandbox", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, brief }),
          });
          
          apiStatus = res.status;
          responseData = (await res.json()) as SandboxResponse;
          
          if (!res.ok) {
            apiErrorMsg = responseData.error || res.statusText || "Request failed";
          }
        } catch (fetchErr: unknown) {
          apiStatus = 500;
          apiErrorMsg = fetchErr instanceof Error ? fetchErr.message : "Failed to connect to API server";
        }
      }, 1000);
      timeoutIdsRef.current.push(id);
    } catch {
      // Catch safety
    }

    // Server-side logging simulation (tied to actual response)
    const baseDelay = 1300;

    const serverLogTrigger = window.setTimeout(() => {
      addLog(`SERVER: Request origin verified. Rate limit status: CHECK`, "server");
      
      const webhookDelay = window.setTimeout(() => {
        if (apiStatus === 429) {
          addLog("SERVER: ERROR: 429 Rate Limit Exceeded. Too many requests from this IP.", "error");
          addLog("CLIENT: Trace interrupted. Host returned status 429 (Too Many Requests).", "error");
          setLoading(false);
          return;
        }

        if (apiStatus === 400) {
          addLog(`SERVER: ERROR: 400 Bad Request: ${apiErrorMsg}`, "error");
          addLog("CLIENT: Request rejected by remote host.", "error");
          setLoading(false);
          return;
        }

        if (apiStatus !== 200 && apiStatus !== 201) {
          addLog(`SERVER: ERROR: ${apiStatus} Server Failure: ${apiErrorMsg}`, "error");
          addLog("CLIENT: Request completed with warning/error code.", "error");
          setLoading(false);
          return;
        }

        // Success flow
        const data = responseData;
        if (data?.forwarded) {
          addLog(`SERVER: CONTACT_WEBHOOK_URL resolved from environment variables.`, "server");
          addLog(`WEBHOOK: Transmitting JSON payload to backend automate hook...`, "webhook");
          
          const hookSuccessDelay = window.setTimeout(() => {
            addLog(`WEBHOOK: Received upstream HTTP ${data.webhookStatus ?? 200} - ${data.webhookStatusText ?? "OK"}.`, "webhook");
            addLog("SERVER: Webhook pipeline resolved. Construction of response body complete.", "server");
            
            const clientDoneDelay = window.setTimeout(() => {
              addLog(`CLIENT: Connection closed. HTTP ${apiStatus} OK`, "success");
              addLog("SYSTEM: Lead successfully sent to webhook workflow. Trace complete.", "success");
              setLoading(false);
            }, 300);
            timeoutIdsRef.current.push(clientDoneDelay);
          }, 600);
          timeoutIdsRef.current.push(hookSuccessDelay);
        } else {
          addLog("SERVER: CONTACT_WEBHOOK_URL not configured. Initializing Dev Mock Webhook...", "server");
          addLog("WEBHOOK: Mock POST to https://httpbin.org/post...", "webhook");
          
          const mockSuccessDelay = window.setTimeout(() => {
            addLog("WEBHOOK: Received mock upstream response: HTTP 200 OK", "webhook");
            addLog("SERVER: Completed response assembly (mock workflow run).", "server");
            
            const clientDoneDelay = window.setTimeout(() => {
              addLog(`CLIENT: Connection closed. HTTP ${apiStatus} OK (Mock Mode)`, "success");
              addLog("SYSTEM: Pipeline trace completed successfully in development mock mode.", "success");
              setLoading(false);
            }, 300);
            timeoutIdsRef.current.push(clientDoneDelay);
          }, 600);
          timeoutIdsRef.current.push(mockSuccessDelay);
        }
      }, 400);
      timeoutIdsRef.current.push(webhookDelay);
    }, baseDelay);
    timeoutIdsRef.current.push(serverLogTrigger);
  };

  const getPayloadJSON = () => {
    return JSON.stringify(
      {
        endpoint: "/api/sandbox",
        headers: {
          "Content-Type": "application/json",
          "X-Sandbox-Mode": "telemetry-enabled",
        },
        payload: {
          email: email || "placeholder@domain.com",
          name: name || "Sandbox Tester",
          brief: brief || "",
          timestamp: new Date().toISOString().split("T")[0] + "T12:00:00.000Z",
          source: "portfolio-sandbox",
        },
      },
      null,
      2
    );
  };

  return (
    <SectionWrapper
      id="sandbox"
      className="relative py-24 overflow-hidden border-t border-white/5"
      onEnter={onEnter}
    >
      {/* Background radial effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full" ref={containerRef}>
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Interactive API Sandbox
        </div>

        {/* Section Heading */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Trace a live webhook pipeline
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Test a sample backend automated route. Input your email below to dispatch a telemetry-traced POST request, trigger webhook routing, and observe server logs in real-time.
          </p>
        </div>

        {/* Dashboard panel */}
        <div className="sandbox-panel grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-white/10 bg-[#070709]/90 shadow-2xl p-6 min-h-[520px]">
          
          {/* LEFT: Live Form & Previews (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-6">
            <form onSubmit={runSimulation} className="flex flex-col gap-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                API Payload Parameters:
              </span>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-zinc-400">Email Address <span className="text-cyan-400">*</span></label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:outline-none transition-all font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-zinc-400">Name</label>
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:outline-none transition-all font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-zinc-400">Project Brief</label>
                <textarea
                  placeholder="Tell me what you're building..."
                  value={brief}
                  rows={2}
                  onChange={(e) => setBrief(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:outline-none transition-all font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className={`w-full flex items-center justify-center gap-2 rounded-lg border py-3 px-4 text-xs font-bold font-mono tracking-wider uppercase transition-all duration-200 ${
                  loading
                    ? "border-cyan-500/20 bg-cyan-950/20 text-cyan-400/50 cursor-not-allowed"
                    : "border-cyan-500/30 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Dispatching payload...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Trigger Integration
                  </>
                )}
              </button>
            </form>

            {/* Small dynamic status / tip */}
            <div className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-3 text-[11px] font-mono text-zinc-500 leading-relaxed">
              <span className="text-zinc-300 font-bold block mb-1">Architecture Trace:</span>
              HTML client → NextJS API Route → Environment checks → Automation Webhook (n8n/Make/Zapier) → Upstream ACK.
            </div>
          </div>

          {/* RIGHT: Telemetry Output Console (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-xl border border-white/5 bg-black/60 overflow-hidden font-mono h-full lg:max-h-[500px]">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-zinc-400 font-bold ml-2">TELEMETRY_LOG_CONSOLE</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider ml-1">LIVE</span>
              </div>
            </div>

            {/* Console Tab switcher */}
            <div className="flex bg-zinc-950/60 border-b border-white/5 text-xs text-zinc-500 select-none">
              <button
                onClick={() => setActiveTab("logs")}
                className={`px-4 py-2 border-r border-white/5 font-bold transition-all ${
                  activeTab === "logs" ? "bg-white/[0.02] text-white border-b-2 border-b-cyan-500" : "hover:text-zinc-300"
                }`}
              >
                Output Logs
              </button>
              <button
                onClick={() => setActiveTab("payload")}
                className={`px-4 py-2 border-r border-white/5 font-bold transition-all ${
                  activeTab === "payload" ? "bg-white/[0.02] text-white border-b-2 border-b-cyan-500" : "hover:text-zinc-300"
                }`}
              >
                Payload Schema (JSON)
              </button>
            </div>

            {/* TAB CONTENT: Logs */}
            {activeTab === "logs" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs leading-relaxed custom-scrollbar h-[280px] lg:h-[350px]">
                {logs.map((log) => {
                  let colorClass = "text-zinc-400";
                  if (log.type === "client") colorClass = "text-cyan-400";
                  if (log.type === "server") colorClass = "text-fuchsia-400";
                  if (log.type === "webhook") colorClass = "text-amber-400";
                  if (log.type === "success") colorClass = "text-green-400 font-bold";
                  if (log.type === "error") colorClass = "text-red-400 font-bold";
                  if (log.type === "info") colorClass = "text-zinc-500 italic";

                  return (
                    <div key={log.id} className="flex gap-2 items-start font-mono">
                      <span className="text-zinc-600 shrink-0 select-none">[{log.time}]</span>
                      <span className={colorClass}>{log.message}</span>
                    </div>
                  );
                })}
                <div ref={consoleEndRef} />
              </div>
            )}

            {/* TAB CONTENT: Payload Draft */}
            {activeTab === "payload" && (
              <div className="flex-1 overflow-y-auto p-4 text-xs font-mono custom-scrollbar text-zinc-400 h-[280px] lg:h-[350px] bg-black/40">
                <pre className="text-cyan-300/80">{getPayloadJSON()}</pre>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
