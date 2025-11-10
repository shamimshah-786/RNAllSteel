// client+server safe helpers for Google Analytics (gtag)
export const GA_MEASUREMENT_ID =  'G-ENV5PX5G62';

// Log a pageview — call on route change
export const pageview = (url) => {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: url,
  });
};

// Log an event
export const event = ({ action, category, label, value }) => {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};