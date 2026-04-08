/**
 * LenisProvider — DEPRECATED / REMOVED
 *
 * This file is kept as a placeholder. Lenis smooth-scroll has been replaced
 * with native CSS scroll-snap (see globals.css) for better performance
 * and no conflicts with wheel/touch navigation.
 *
 * If you want to re-enable Lenis:
 * 1. `npm install lenis`
 * 2. Restore the original implementation
 * 3. Remove CSS scroll-snap from globals.css
 * 4. Add LenisProvider back to layout.tsx
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
