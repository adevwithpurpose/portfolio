import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-flame-psi-75.vercel.app"),
  title: {
    default: "Safeer — Automation & Web Development",
    template: "%s | Safeer",
  },
  description:
    "I build clean websites, workflow automations, AI assistants, and internal tools that remove operational friction for growing businesses.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-flame-psi-75.vercel.app",
    siteName: "Safeer — Portfolio",
    title: "Safeer — Automation & Web Development",
    description:
      "Clean websites, workflow automations, AI assistants, and internal tools for growing businesses.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Safeer — Automation & Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safeer — Automation & Web Development",
    description:
      "Clean websites, workflow automations, AI assistants, and internal tools for growing businesses.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-[#09090b] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
