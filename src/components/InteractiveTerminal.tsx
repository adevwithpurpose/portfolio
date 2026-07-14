"use client";

import { useState, useEffect, useRef } from "react";

type HistoryLine = {
  type: "input" | "output" | "system";
  content: React.ReactNode;
};

const INITIAL_COMMANDS = [
  { label: "whoami", cmd: "whoami" },
  { label: "stack", cmd: "stack" },
  { label: "ping", cmd: "ping" },
  { label: "services", cmd: "services" },
];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<HistoryLine[]>([
    {
      type: "system",
      content: (
        <span className="text-zinc-400">
          Safeer-OS [Version 1.0.0]
          <br />
          (c) Safeer Ahmad. All rights reserved.
          <br /><br />
          Type a command, ask a question about my business, or click a quick action.
        </span>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const processResponse = async (query: string) => {
    const q = query.trim().toLowerCase();
    
    // Core Terminal Commands
    if (q === "whoami") {
      return (
        <div>
          <p className="text-green-400">⚡ Name: Safeer Ahmad</p>
          <p className="text-blue-300">⚡ Role: Senior Technical Partner</p>
          <p className="text-zinc-400">⚡ Location: Earth (Current Ping: 42ms)</p>
          <p className="text-zinc-400 mt-2">
            👉 Direct proxy to top-tier execution. No agency bloated layers. No juniors.
          </p>
        </div>
      );
    }
    if (q === "stack") {
      return (
        <div className="text-emerald-300">
          <p>{"{"}</p>
          <p className="pl-4"><span className="text-blue-400">&quot;frontend&quot;</span>: [&quot;Astro&quot;, &quot;React&quot;, &quot;Next.js&quot;],</p>
          <p className="pl-4"><span className="text-blue-400">&quot;ecommerce&quot;</span>: [&quot;Shopify Dawn&quot;, &quot;Headless&quot;, &quot;Custom UI&quot;],</p>
          <p className="pl-4"><span className="text-blue-400">&quot;backend&quot;</span>: [&quot;FastAPI&quot;, &quot;Node&quot;],</p>
          <p className="pl-4"><span className="text-blue-400">&quot;automation&quot;</span>: [&quot;n8n&quot;, &quot;AI Agents&quot;, &quot;Scraping&quot;]</p>
          <p>{"}"}</p>
        </div>
      );
    }
    if (q === "ping") {
      return (
        <div>
          <p className="text-zinc-400">PING safeer.dev (192.168.1.1): 56 data bytes</p>
          <p className="text-green-400">64 bytes from safeer.dev: icmp_seq=0 ttl=116 time=12.2 ms</p>
          <p className="text-emerald-400 mt-2 font-bold">[STATUS: OPEN for 2 New Clients this month]</p>
        </div>
      );
    }
    if (q === "clear") {
      setHistory([]);
      return null;
    }
    if (q === "services") {
      return (
        <div className="text-zinc-300">
          <p className="text-blue-400 mb-1">=== SERVICES LOADED ===</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Shopify &amp; E-Commerce:</strong> Headless builds, Dawn optimization to 90+ Lighthouse.</li>
            <li><strong className="text-white">Web Development:</strong> Next.js, Astro, WordPress (Bricks/Elementor).</li>
            <li><strong className="text-white">Automation:</strong> AI Agents, n8n workflows, lowering manual hours.</li>
          </ul>
        </div>
      );
    }
    if (q === "") return <span />;

    // Simulated "AI" query matching for plain english
    const aiText = q;

    if (aiText.includes("cost") || aiText.includes("price") || aiText.includes("rate") || aiText.includes("how much")) {
      return <span className="text-amber-300">[AI-Agent]: I don&apos;t charge bloated agency fees. Every project is scoped individually based on the value delivered, not hourly billing. Book a 15-min call to get a custom breakdown!</span>;
    }
    if (aiText.includes("contact") || aiText.includes("book") || aiText.includes("call") || aiText.includes("hire") || aiText.includes("email")) {
      return (
        <span className="text-amber-300">
          [AI-Agent]: You can reach Safeer at <a href="mailto:safeer@safeer.dev" className="underline text-blue-300">safeer@safeer.dev</a> or click the button on the left to book a call directly.
        </span>
      );
    }
    if (aiText.includes("experience") || aiText.includes("background") || aiText.includes("who are you") || aiText.includes("about")) {
      return <span className="text-amber-300">[AI-Agent]: Safeer is a Senior Frontend &amp; Automation Engineer with a background in Mechatronics Engineering. He skips the middleman to work directly with business owners.</span>;
    }
    if (aiText.includes("hello") || aiText.includes("hi ") || q === "hi") {
      return <span className="text-amber-300">[AI-Agent]: Hello! I&apos;m Safeer&apos;s virtual assistant. Ask me about his services, stack, or how to hire him.</span>;
    }

    // Default Fallback
    return (
      <span className="text-amber-300">
        [AI-Agent]: I&apos;m designed to answer basic questions about Safeer&apos;s business. Try asking about his <strong>services</strong>, <strong>stack</strong>, or <strong>pricing</strong>. Or just type a command like <span className="text-white">whoami</span>.
      </span>
    );
  };

  const submitCommand = async (cmd: string) => {
    if (isTyping || !cmd.trim()) return;
    
    setInput("");
    setIsTyping(true);

    // 1. Add input to history
    setHistory((prev) => [
      ...prev,
      {
        type: "input",
        content: (
          <span>
            <span className="text-blue-400 font-bold">safeer@pro</span>
            <span className="text-zinc-500">:</span>
            <span className="text-purple-400">~</span>$ {cmd}
          </span>
        ),
      },
    ]);

    // 2. Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. Process and Output
    const response = await processResponse(cmd);
    
    if (response) {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: response,
        },
      ]);
    }

    setIsTyping(false);
    
    // Auto focus back on input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none">
      {/* OS Window Chrome */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0C] shadow-2xl shadow-blue-900/20" onClick={() => inputRef.current?.focus()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#121216]">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-zinc-500 font-mono tracking-wider">
            safeer-os &mdash; bash
          </span>
        </div>

        {/* Terminal Screen */}
        <div
          ref={scrollRef}
          className="p-5 h-[340px] overflow-y-auto font-mono text-sm flex flex-col gap-3 custom-scrollbar"
        >
          {history.map((line, i) => (
            <div key={i} className="animate-in fade-in fill-mode-forwards duration-300">
              {line.content}
            </div>
          ))}
          
          {isTyping && (
            <div className="text-zinc-500 animate-pulse">Processing...</div>
          )}
          
          {!isTyping && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                submitCommand(input);
              }} 
              className="flex items-center"
            >
              <span className="text-blue-400 font-bold whitespace-nowrap">safeer@pro</span>
              <span className="text-zinc-500">:</span>
              <span className="text-purple-400">~</span>$ 
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="ml-2 flex-1 bg-transparent border-none outline-none text-white font-mono caret-zinc-400"
                spellCheck={false}
                autoComplete="off"
                autoFocus
              />
            </form>
          )}
        </div>
      </div>

      {/* Command Triggers */}
      <div className="mt-4 flex flex-wrap gap-2 justify-start">
        {INITIAL_COMMANDS.map((cmd) => (
          <button
            key={cmd.label}
            onClick={() => submitCommand(cmd.cmd)}
            disabled={isTyping}
            className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-xs font-mono text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt; {cmd.label}
          </button>
        ))}
      </div>
    </div>
  );
}