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

const SITE_DESCRIPTION =
  "Direct-to-developer engineering. I build custom high-performance web applications, automated workflows, and intelligent AI agents — without agency overhead.";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-flame-psi-75.vercel.app"),
  title: {
    default: "Safeer Ahmad | Senior Web Developer & Automation Engineer",
    template: "%s | Safeer Ahmad",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-flame-psi-75.vercel.app",
    siteName: "Safeer Ahmad — Portfolio",
    title: "Safeer Ahmad | Senior Web Developer & Automation Engineer",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Safeer Ahmad — Senior Web Developer & Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safeer Ahmad | Senior Web Developer & Automation Engineer",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Safeer Ahmad",
              "jobTitle": "Senior Web Developer & Automation Engineer",
              "url": "https://portfolio-flame-psi-75.vercel.app",
              "description": "Direct-to-developer engineering. I build custom high-performance web applications, automated workflows, and intelligent AI agents — without agency overhead.",
              "knowsAbout": ["Web Development", "Workflow Automation", "AI Agents", "Next.js", "React", "TypeScript"],
              "offers": {
                "@type": "Service",
                "serviceType": "Web Development & Automation"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
