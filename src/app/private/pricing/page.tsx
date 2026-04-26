import type { Metadata } from "next";
import PricingPage from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Investment Tiers — Safeer",
  description: "Transparent pricing for automation, web development, and AI assistant services.",
};

// Prevent search engine indexing for private page
export const robots = {
  index: false,
  follow: false,
};

export default function PrivatePricingRoute() {
  return <PricingPage />;
}
