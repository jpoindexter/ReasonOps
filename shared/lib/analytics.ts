// @lib/analytics.ts
let trackerUrl = 'http://localhost:8080/matomo.php';
let siteId = '1';

export const trackPageView = () => {
  if (typeof window === 'undefined') return;

  window._paq = window._paq || [];
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);
  window._paq.push(['setTrackerUrl', trackerUrl]);
  window._paq.push(['setSiteId', siteId]);

  const d = document;
  const g = d.createElement('script');
  const s = d.getElementsByTagName('script')[0];

  g.async = true;
  g.src = trackerUrl.replace('matomo.php', 'matomo.js');
  s.parentNode?.insertBefore(g, s);
};
