// TODO(open): wire up GA4 or Plausible. No personal data is sent.
export function track(event, props = {}) {
  if (typeof window === 'undefined') return;
  if (window.plausible) window.plausible(event, { props });
  else if (window.gtag) window.gtag('event', event, props);
  else if (import.meta.env.DEV) console.debug('[analytics]', event, props);
}
