'use client';

import { useEffect } from 'react';
import TopLoader from 'nextjs-toploader';
import { usePathname } from 'next/navigation';

/**
 * TopProgress - client component wrapper for nextjs-toploader
 * - Listens to route changes via usePathname (App Router) and triggers TopLoader.
 * - Keeps the top progress bar color and height consistent.
 *
 * Install: npm i nextjs-toploader
 *
 * Usage: import and render <TopProgress /> inside your root layout (client side).
 */

export default function TopProgress() {
  const pathname = usePathname();

  useEffect(() => {
    // nextjs-toploader listens to route change events internally,
    // but re-mounting/re-rendering ensures it stays active for App Router navigations.
    // No explicit start/stop needed because package handles Router events.
  }, [pathname]);

  return (
    <TopLoader
      color="#2563eb" /* Tailwind sky-500 / blue look #0ea5e9 */ 
      height={3}
      showSpinner={false}
      shadow="0 0 8px rgba(37,99,235,0.35)"
      
    />
  );
}