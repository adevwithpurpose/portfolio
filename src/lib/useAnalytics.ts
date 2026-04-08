"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * useAnalytics — Placeholder analytics hook.
 *
 * Integration points:
 * - Google Analytics 4 (gtag.js)
 * - Plausible Analytics
 * - Vercel Analytics
 * - PostHog
 *
 * To activate: replace the no-op trackEvent with your provider's API.
 *
 * Example (GA4):
 *   window.gtag("event", name, params);
 *
 * Example (Plausible):
 *   window.plausible(name, { props: params });
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventParams = Record<string, any>;

export function useAnalytics() {
  const initializedRef = useRef(false);

  const trackEvent = useCallback((name: string, params?: EventParams) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics] ${name}`, params ?? "");
      return;
    }
    // TODO: Replace with real analytics provider
    // window.gtag?.("event", name, params);
    // window.plausible?.(name, { props: params });
  }, []);

  const trackPageView = useCallback((path: string) => {
    trackEvent("page_view", { path });
  }, [trackEvent]);

  const trackCTAClick = useCallback((ctaName: string, source: string) => {
    trackEvent("cta_click", { cta: ctaName, source });
  }, [trackEvent]);

  const trackSectionView = useCallback((sectionId: string, index: number) => {
    trackEvent("section_view", { section: sectionId, index });
  }, [trackEvent]);

  // Track initial page view
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    trackPageView(window.location.pathname);
  }, [trackPageView]);

  return {
    trackEvent,
    trackPageView,
    trackCTAClick,
    trackSectionView,
  };
}
