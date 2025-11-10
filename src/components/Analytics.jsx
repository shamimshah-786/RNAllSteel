'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as gtag from './../app/lib/gtag';

// Client component to send page_view events when the route changes.
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gtag.GA_MEASUREMENT_ID) return;
    const url = pathname + (searchParams ? `?${searchParams.toString()}` : '');
    gtag.pageview(url);
  }, [pathname, searchParams]);

  return null;
}