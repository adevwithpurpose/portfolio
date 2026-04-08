"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090b] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-white/90">
            Safeer<span className="text-blue-400">.</span>
          </span>
          <span className="text-[10px] text-zinc-600">© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 transition-colors hover:text-white"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 transition-colors hover:text-white"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <a
            href="mailto:safeer@safeer.dev"
            className="text-xs text-zinc-500 transition-colors hover:text-white"
            aria-label="Email Safeer"
          >
            Email
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-6">
          <a href="#case-studies" className="text-xs text-zinc-500 transition-colors hover:text-white">
            Case Studies
          </a>
          <a href="#contact" className="text-xs text-zinc-500 transition-colors hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
