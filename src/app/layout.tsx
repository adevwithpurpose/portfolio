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
    default: "Safeer — Shopify Automation & Development",
    template: "%s | Safeer",
  },
  description:
    "I help Shopify brands automate operations with n8n workflows, custom apps, and AI agents. Custom web solutions, intelligent automation, and AI systems that run 24/7.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://safeer.dev",
    siteName: "Safeer — Portfolio",
    title: "Safeer — Shopify Automation & Development",
    description:
      "Custom web solutions, intelligent automation, and AI systems that run 24/7.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Safeer — Systems That Work While You Sleep",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safeer — Shopify Automation & Development",
    description:
      "Custom web solutions, intelligent automation, and AI systems that run 24/7.",
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
