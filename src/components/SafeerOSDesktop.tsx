"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
 * SafeerOSDesktop — Modular Desktop Component
 *
 * A contained desktop-UI experience showcasing three core service
 * modules as interactive "applications" with a terminal aesthetic.
 *
 * Architecture:
 * - Contained viewport section (not a scroll-driven 3D world).
 * - IntersectionObserver triggers a boot-sequence animation on entry.
 * - 3 App windows: Storefront.app, Agent.app, Telemetry.app.
 * - Dock at bottom with glowing app icons.
 * - Mini CLI input bar with quick-command chips.
 * - Framer Motion for all window / tab transitions.
 * ───────────────────────────────────────────────────────────── */

/* ── Types ──────────────────────────────────────────────────── */

type AppId = "storefront" | "agent" | "telemetry";

interface AppMeta {
  id: AppId;
  name: string;
  icon: string; // emoji or short label
  accentColor: string;
  glowColor: string;
}

const APPS: AppMeta[] = [
  {
    id: "storefront",
    name: "Storefront.app",
    icon: "🛒",
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.35)",
  },
  {
    id: "agent",
    name: "Agent.app",
    icon: "🤖",
    accentColor: "#06b6d4",
    glowColor: "rgba(6,182,212,0.35)",
  },
  {
    id: "telemetry",
    name: "Telemetry.app",
    icon: "📊",
    accentColor: "#a855f7",
    glowColor: "rgba(168,85,247,0.35)",
  },
];

const QUICK_COMMANDS = [
  "safeer exec storefront",
  "safeer exec agent",
  "safeer exec telemetry",
];

/* ── Boot Sequence Data ─────────────────────────────────────── */

const BOOT_LINES = [
  { text: "[BOOT] safeer-os v3.2.1 loading kernel...", delay: 0 },
  { text: "[INIT] Mounting /dev/services ...", delay: 120 },
  { text: "[SCAN] Storefront.app ... OK", delay: 280 },
  { text: "[SCAN] Agent.app ... OK", delay: 420 },
  { text: "[SCAN] Telemetry.app ... OK", delay: 560 },
  { text: "[NET]  Connecting edge network ... SECURE", delay: 700 },
  { text: "[SYS]  All modules nominal. SYSTEM_READY", delay: 850 },
];

/* ── Glowing Grid Background ────────────────────────────────── */

function GlowingGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Emerald glow — top-left */}
      <div
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)" }}
      />
      {/* Cyan glow — center */}
      <div
        className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.10), transparent 70%)" }}
      />
      {/* Purple glow — bottom-right */}
      <div
        className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)" }}
      />
    </div>
  );
}

/* ── Boot Sequence Overlay ──────────────────────────────────── */

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), line.delay)
      );
    });
    timers.push(setTimeout(() => setDone(true), 1000));
    timers.push(setTimeout(() => onComplete(), 1200));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-start justify-center overflow-hidden bg-[#050505] p-6 font-mono text-sm"
      initial={{ opacity: 1 }}
      animate={done ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      {/* Scanline */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-px bg-emerald-400/40"
        initial={{ top: 0 }}
        animate={{ top: "100%" }}
        transition={{ duration: 1, ease: "linear" }}
      />
      {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className={`${
            line.text.includes("OK") || line.text.includes("SECURE") || line.text.includes("SYSTEM_READY")
              ? "text-emerald-400"
              : "text-zinc-400"
          }`}
        >
          {line.text}
        </motion.div>
      ))}
      {/* Blinking cursor */}
      {!done && (
        <motion.span
          className="mt-1 inline-block h-4 w-2 bg-emerald-400"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

/* ── Titlebar ───────────────────────────────────────────────── */

function Titlebar({
  activeApp,
  onAppClick,
}: {
  activeApp: AppId;
  onAppClick: (id: AppId) => void;
}) {
  const meta = APPS.find((a) => a.id === activeApp)!;
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0a0a0a]/80 px-4 py-2 backdrop-blur-md">
      {/* Traffic lights */}
      <div className="flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      {/* Tab bar */}
      <div className="ml-4 flex gap-1">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            className={`rounded-md px-3 py-1 font-mono text-xs transition-all ${
              activeApp === app.id
                ? "bg-white/10 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            style={
              activeApp === app.id
                ? { boxShadow: `0 0 12px ${app.glowColor}` }
                : undefined
            }
          >
            {app.icon} {app.name}
          </button>
        ))}
      </div>
      {/* Spacer */}
      <div className="flex-1" />
      {/* Status badge */}
      <motion.div
        className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="font-mono text-[10px] tracking-wider text-emerald-400">
          SYSTEM_READY
        </span>
      </motion.div>
    </div>
  );
}

/* ── Storefront.app Content ─────────────────────────────────── */

function StorefrontContent() {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      {/* Speed score toggle */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-zinc-500">Lighthouse Score:</span>
        <button
          onClick={() => setShowBefore(!showBefore)}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300 transition hover:bg-white/10"
        >
          Toggle Before / After
        </button>
      </div>
      <AnimatePresence mode="wait">
        {showBefore ? (
          <motion.div
            key="before"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex gap-4"
          >
            <ScoreCard label="Performance" value={54} color="#f59e0b" />
            <ScoreCard label="FCP" value={3.2} suffix="s" color="#ef4444" />
            <ScoreCard label="LCP" value={5.8} suffix="s" color="#ef4444" />
            <ScoreCard label="CLS" value={0.18} color="#f59e0b" />
          </motion.div>
        ) : (
          <motion.div
            key="after"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex gap-4"
          >
            <ScoreCard label="Performance" value={99} color="#10b981" />
            <ScoreCard label="FCP" value={0.4} suffix="s" color="#10b981" />
            <ScoreCard label="LCP" value={0.8} suffix="s" color="#10b981" />
            <ScoreCard label="CLS" value={0.01} color="#10b981" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        {["Shopify Dawn", "Astro SSR", "Edge CDN", "Islands Hydration", "Core Web Vitals 99+"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400"
            >
              {tag}
            </span>
          )
        )}
      </div>

      {/* Fake lighthouse bar */}
      <div className="mt-auto">
        <div className="mb-1 flex justify-between font-mono text-[10px] text-zinc-500">
          <span>Build Output</span>
          <span className="text-emerald-400">✓ Passed</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: "99%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function ScoreCard({
  label,
  value,
  suffix = "",
  color,
}: {
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  const isInteger = value % 1 === 0 && value > 10;
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3">
      <span
        className="font-mono text-2xl font-bold"
        style={{ color }}
      >
        {isInteger ? value : value.toFixed(1)}
        {suffix}
      </span>
      <span className="font-mono text-[10px] text-zinc-500">{label}</span>
    </div>
  );
}

/* ── Agent.app Content ──────────────────────────────────────── */

function AgentContent() {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const AGENT_LOGS = [
    "[agent] Initializing Hermes subagent pool (3 workers)...",
    "[agent] Crawl4AI: fetching target-sites.json (47 URLs)",
    "[agent] FastAPI /ingest endpoint ready on :8000",
    "[crawl] Batch 1/5 — extracting structured data...",
    "[crawl] Batch 2/5 — deduplication + schema validation",
    "[crawl] Batch 3/5 — enrichment via GPT-4o extraction",
    "[crawl] Batch 4/5 — building search index (HNSW)",
    "[crawl] Batch 5/5 — all 47 sources processed ✓",
    "[agent] Pipeline complete. 12,847 chunks indexed.",
    "[agent] Latency p95: 142ms | Throughput: 3.2k req/s",
  ];

  const runPipeline = useCallback(() => {
    if (running) return;
    setLogs([]);
    setRunning(true);
    AGENT_LOGS.forEach((line, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (i === AGENT_LOGS.length - 1) setRunning(false);
      }, i * 220);
    });
  }, [running]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex h-full flex-col p-5">
      {/* Controls */}
      <div className="mb-3 flex items-center gap-3">
        <button
          onClick={runPipeline}
          disabled={running}
          className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-400 transition hover:bg-cyan-500/20 disabled:opacity-40"
        >
          {running ? "⏳ Running..." : "▶ Run Pipeline"}
        </button>
        <span className="font-mono text-[10px] text-zinc-600">
          {logs.length}/{AGENT_LOGS.length} lines
        </span>
      </div>

      {/* Log output */}
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto rounded-lg border border-white/[0.06] bg-black/50 p-3 font-mono text-xs"
      >
        {logs.length === 0 && (
          <span className="text-zinc-600">
            Click &quot;Run Pipeline&quot; to start agent demo...
          </span>
        )}
        {logs.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className={`py-0.5 ${
              line.includes("✓") || line.includes("complete") || line.includes("ready")
                ? "text-cyan-400"
                : "text-zinc-400"
            }`}
          >
            {line}
          </motion.div>
        ))}
        {running && (
          <motion.span
            className="inline-block h-3.5 w-2 bg-cyan-400"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Tech tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {["FastAPI", "Crawl4AI", "Hermes Agents", "HNSW Index", "Schema Validation"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] text-cyan-400"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
}

/* ── Telemetry.app Content ──────────────────────────────────── */

function TelemetryContent() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(interval);
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: "Requests/s",
        value: (2840 + Math.sin(tick * 0.3) * 120).toFixed(0),
        trend: "+12%",
        up: true,
      },
      {
        label: "Latency p95",
        value: `${(142 + Math.sin(tick * 0.5) * 15).toFixed(0)}ms`,
        trend: "-8%",
        up: false,
      },
      {
        label: "Error Rate",
        value: `${(0.12 + Math.sin(tick * 0.7) * 0.04).toFixed(2)}%`,
        trend: "-23%",
        up: false,
      },
      {
        label: "Active Users",
        value: (1247 + Math.floor(Math.sin(tick * 0.2) * 50)).toFixed(0),
        trend: "+5%",
        up: true,
      },
    ],
    [tick]
  );

  // Generate sparkline data
  const sparkData = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < 20; i++) {
      points.push(40 + Math.sin((tick + i) * 0.4) * 30 + Math.random() * 10);
    }
    return points;
  }, [tick]);

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3"
          >
            <div className="mb-1 font-mono text-[10px] text-zinc-500">{m.label}</div>
            <div className="flex items-end gap-2">
              <span className="font-mono text-lg font-bold text-white">{m.value}</span>
              <span
                className={`font-mono text-[10px] ${
                  m.up ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {m.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline chart */}
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
        <div className="mb-2 font-mono text-[10px] text-zinc-500">
          Real-time Telemetry (Power BI / Pine Script)
        </div>
        <svg viewBox="0 0 200 60" className="h-16 w-full">
          {/* Grid lines */}
          {[15, 30, 45].map((y) => (
            <line
              key={y}
              x1={0}
              y1={y}
              x2={200}
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={0.5}
            />
          ))}
          {/* Sparkline path */}
          <motion.polyline
            points={sparkData
              .map((v, i) => `${(i / 19) * 200},${60 - (v / 100) * 60}`)
              .join(" ")}
            fill="none"
            stroke="#a855f7"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          {/* Glow fill under line */}
          <polygon
            points={[
              ...sparkData.map(
                (v, i) => `${(i / 19) * 200},${60 - (v / 100) * 60}`
              ),
              "200,60",
              "0,60",
            ].join(" ")}
            fill="url(#sparkGlow)"
          />
          <defs>
            <linearGradient id="sparkGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(168,85,247,0.25)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {["Power BI", "Pine Script", "Real-time Streaming", "Dashboard API"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] text-purple-400"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
}

/* ── Dock ───────────────────────────────────────────────────── */

function Dock({
  activeApp,
  onAppClick,
}: {
  activeApp: AppId;
  onAppClick: (id: AppId) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 border-t border-white/[0.06] bg-[#0a0a0a]/80 px-4 py-2.5 backdrop-blur-md">
      {APPS.map((app) => {
        const isActive = activeApp === app.id;
        return (
          <motion.button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl text-lg transition-colors"
            style={{
              background: isActive ? `${app.accentColor}20` : "rgba(255,255,255,0.04)",
              boxShadow: isActive ? `0 0 20px ${app.glowColor}, inset 0 0 8px ${app.glowColor}` : "none",
              border: `1px solid ${isActive ? `${app.accentColor}40` : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {app.icon}
            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="dockIndicator"
                className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                style={{ background: app.accentColor }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ── CLI Input Bar ──────────────────────────────────────────── */

function CLIInputBar({
  onCommand,
}: {
  onCommand: (cmd: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col gap-2 border-t border-white/[0.06] bg-[#0a0a0a]/80 px-4 py-2.5 backdrop-blur-md">
      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="shrink-0 font-mono text-xs text-emerald-500">
          visitor@safeer-os:~$
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command..."
          className="flex-1 bg-transparent font-mono text-xs text-zinc-300 outline-none placeholder:text-zinc-600"
        />
      </form>
      {/* Quick command chips */}
      <div className="flex flex-wrap gap-1.5">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => onCommand(cmd)}
            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-500 transition hover:border-white/10 hover:bg-white/[0.06] hover:text-zinc-300"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

export default function SafeerOSDesktop() {
  const [activeApp, setActiveApp] = useState<AppId>("storefront");
  const [booted, setBooted] = useState(false);
  const [booting, setBooting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  const isInView = useInView(sectionRef, { amount: 0.3 });

  // IntersectionObserver — trigger boot once
  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      setBooting(true);
    }
  }, [isInView]);

  const handleBootComplete = useCallback(() => {
    setBooting(false);
    setBooted(true);
  }, []);

  const handleAppClick = useCallback((id: AppId) => {
    setActiveApp(id);
  }, []);

  const handleCommand = useCallback(
    (cmd: string) => {
      if (cmd.includes("storefront")) setActiveApp("storefront");
      else if (cmd.includes("agent")) setActiveApp("agent");
      else if (cmd.includes("telemetry")) setActiveApp("telemetry");
    },
    []
  );

  const content = useMemo(() => {
    switch (activeApp) {
      case "storefront":
        return <StorefrontContent />;
      case "agent":
        return <AgentContent />;
      case "telemetry":
        return <TelemetryContent />;
    }
  }, [activeApp]);

  const activeMeta = APPS.find((a) => a.id === activeApp)!;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-[#050505] py-12"
      style={{ scrollSnapAlign: "start" }}
    >
      <GlowingGrid />

      {/* Boot Sequence */}
      {booting && <BootSequence onComplete={handleBootComplete} />}

      {/* Desktop Container */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col overflow-hidden rounded-xl border border-white/[0.08] shadow-2xl"
        style={{
          height: "min(75vh, 640px)",
          background: "linear-gradient(180deg, rgba(10,10,10,0.95) 0%, rgba(5,5,5,0.98) 100%)",
          boxShadow: `0 0 60px ${activeMeta.glowColor}, 0 25px 50px rgba(0,0,0,0.5)`,
        }}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={
          booted
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 30, scale: 0.97 }
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Titlebar */}
        <Titlebar activeApp={activeApp} onAppClick={handleAppClick} />

        {/* Window Content */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeApp}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CLI Input Bar */}
        <CLIInputBar onCommand={handleCommand} />

        {/* Dock */}
        <Dock activeApp={activeApp} onAppClick={handleAppClick} />
      </motion.div>

      {/* Section label */}
      <motion.p
        className="relative z-10 mt-6 text-center font-mono text-xs tracking-wider text-zinc-600"
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        INTERACTIVE DEMO — Click apps or use the CLI to explore services
      </motion.p>
    </section>
  );
}
