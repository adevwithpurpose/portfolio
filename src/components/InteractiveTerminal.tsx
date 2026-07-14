"use client";

import { useState, useEffect, useRef } from "react";

type Command = {
  id: string;
  label: string;
  command: string;
  output: React.ReactNode;
};

const COMMANDS: Command[] = [
  {
    id: "whoami",
    label: "whoami",
    command: "./safeer --whoami",
    output: (
      <div>
        <p className="text-green-400">⚡ Name: Safeer Ahmad</p>
        <p className="text-blue-300">⚡ Role: Senior Technical Partner</p>
        <p className="text-zinc-400">⚡ Location: Earth (Current Ping: 42ms)</p>
        <p className="text-zinc-400 mt-2">
          👉 Direct proxy to top-tier execution. No agency bloated layers. No
          juniors.
        </p>
      </div>
    ),
  },
  {
    id: "stack",
    label: "stack",
    command: "cat stack.json | jq",
    output: (
      <div className="text-emerald-300">
        <p>{"{"}</p>
        <p className="pl-4">
          <span className="text-blue-400">&quot;frontend&quot;</span>: [&quot;Astro&quot;, &quot;React&quot;,
          &quot;Next.js&quot;],
        </p>
        <p className="pl-4">
          <span className="text-blue-400">&quot;ecommerce&quot;</span>: [&quot;Shopify Dawn&quot;,
          &quot;Headless&quot;, &quot;Custom UI&quot;],
        </p>
        <p className="pl-4">
          <span className="text-blue-400">&quot;backend&quot;</span>: [&quot;FastAPI&quot;, &quot;Node&quot;],
        </p>
        <p className="pl-4">
          <span className="text-blue-400">&quot;automation&quot;</span>: [&quot;n8n&quot;, &quot;AI Agents&quot;, &quot;Scraping&quot;]
        </p>
        <p>{"}"}</p>
      </div>
    ),
  },
  {
    id: "ping",
    label: "ping",
    command: "ping safeer.dev --availability",
    output: (
      <div>
        <p className="text-zinc-400">PING safeer.dev (192.168.1.1): 56 data bytes</p>
        <p className="text-green-400">64 bytes from safeer.dev: icmp_seq=0 ttl=116 time=12.2 ms</p>
        <p className="text-emerald-400 mt-2 font-bold">[STATUS: OPEN for 2 New Clients this month]</p>
      </div>
    ),
  },
];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<
    { type: "input" | "output"; content: React.ReactNode }[]
  >([
    {
      type: "output",
      content: (
        <span className="text-zinc-400">
          Last login: {new Date().toLocaleDateString()} on ttys001
          <br />
          Type a command or click below to interact.
        </span>
      ),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = async (cmd: Command) => {
    if (isTyping) return;
    setIsTyping(true);

    // 1. Add the command line instantly
    setHistory((prev) => [
      ...prev,
      {
        type: "input",
        content: (
          <span>
            <span className="text-blue-400">safeer@pro</span>
            <span className="text-zinc-500">:</span>
            <span className="text-purple-400">~</span>$ {cmd.command}
          </span>
        ),
      },
    ]);

    // 2. Simulate small processing delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    // 3. Output result
    setHistory((prev) => [
      ...prev,
      {
        type: "output",
        content: cmd.output,
      },
    ]);

    setIsTyping(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none">
      {/* OS Window Chrome */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0C] shadow-2xl shadow-blue-900/20">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-zinc-500 font-mono tracking-wider">
            safeer-os — bash
          </span>
        </div>

        {/* Terminal Screen */}
        <div
          ref={scrollRef}
          className="p-5 h-[320px] overflow-y-auto font-mono text-sm flex flex-col gap-3 custom-scrollbar"
        >
          {history.map((line, i) => (
            <div key={i} className="animate-in fade-in fill-mode-forwards duration-300">
              {line.content}
            </div>
          ))}
          {isTyping && (
            <div className="text-zinc-500 animate-pulse">Running process...</div>
          )}
          {!isTyping && (
            <div>
              <span className="text-blue-400">safeer@pro</span>
              <span className="text-zinc-500">:</span>
              <span className="text-purple-400">~</span>$
              <span className="ml-2 w-2 h-4 inline-block bg-zinc-400 animate-pulse align-middle" />
            </div>
          )}
        </div>
      </div>

      {/* Command Triggers */}
      <div className="mt-4 flex flex-wrap gap-2 justify-start lg:justify-center">
        {COMMANDS.map((cmd) => (
          <button
            key={cmd.id}
            onClick={() => runCommand(cmd)}
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
