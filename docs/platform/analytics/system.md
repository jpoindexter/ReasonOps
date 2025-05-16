---
title: "system"
status: "draft"
---

# Analytics Architecture (Enterprise-Ready)

// TODO: Track reviewer scoring stats, funnels, heatmaps, QA reports

# Analytics Architecture (Enterprise-Ready)

## Overview

ReasonOps integrates Matomo Analytics in a hardened, enterprise-grade deployment — compliant with industry operational baselines. It offers telemetry visibility across platform usage while meeting zero-trust, audit-ready, and PII-exclusion mandates.

This architecture supports both real-time interaction telemetry and long-term usage patterns — enabling dashboards, funnels, QA heatmaps, reviewer calibration, and behavioral drift tracking.

## Deployment

Matomo is deployed via Docker on internal infrastructure. The stack includes:

- `matomo` container (web + tracking engine)
- `mysql` container (persistent event storage)
- Exposed at `http://localhost:8080` for local testing; production is containerized and routed via secure ingress

- Hardened for auditability and isolation; can be extended to run on-prem via Kubernetes with external MySQL or ClickHouse

Tracking is activated via a JavaScript snippet injected at the layout root.

## Tracking Configuration

Matomo is configured to track the following in the ReasonOps frontend:

- Page views and navigations (SPA compatible)
- Click events (via manual and delegated tracking)
- Reviewer task interactions (task type, rubric mode, scoring patterns)
- Session duration and bounce behavior
- Funnel dropout (onboarding, judgment flow, export flow)
- Consent status and token presence
- Feature flag toggles and A/B experiment participation
- Event attribution for all major user actions, supporting session playback alignment and synthetic funnel reconstruction

## Implementation

The tracking snippet is injected via `_app.tsx` or `Shell.tsx`:

```ts
if (typeof window !== 'undefined') {
  window._paq = window._paq || [];
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);
  (function () {
    const u = 'http://localhost:8080/';
    window._paq.push(['setTrackerUrl', u + 'matomo.php']);
    window._paq.push(['setSiteId', '1']);
    const d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = u + 'matomo.js';
    s.parentNode.insertBefore(g, s);
  })();
}
```

## Event Schema

All events tracked via Matomo conform to the following shape:

```ts
type AnalyticsEvent = {
  name: string; // Describes the event e.g. "task.submitted"
  properties?: Record<string, unknown>; // Optional additional context
  userId?: string; // Supplied if user is authenticated
  timestamp: string; // ISO 8601 format
  consent: 'granted' | 'denied'; // Consent status
};
```

This schema is enforced at the call-site level via shared analytics utilities. All trackable events are stored as structured records within MySQL and exposed via admin export endpoints.

## Compliance

- ✅ GDPR / CCPA compatible (first-party, no IP tracking, no third-party sync)
- ✅ Works without cookies if needed
- ✅ Full audit trail (exportable)
- ✅ Can be extended with SDK or server logs
- ✅ Meets baseline standards for SOC 2, ISO 27001 alignment (self-hosted only)

## Retention and Governance

- All analytics data is stored in the Matomo MySQL instance.
- No PII is logged or retained.
- Event data is retained for 12 months, after which it is archived and optionally purged.
- Access to analytics exports is restricted to reviewers with admin-level privileges.
- All data collection operates under explicit user consent per platform policy.

For additional detail, see [Governance: Audit Log Spec](/docs/platform/governance/audit-log-spec.md).

## Future Instrumentation Targets

- QA reviewer heatmaps per rubric dimension
- Aggregated scoring deltas per revision
- Drift detection on step scoring consistency
- Export funnel anomaly detection

## References

- [Matomo JS Guide](https://developer.matomo.org/guides/tracking-javascript-guide)
- [React + SPA Tracking](https://developer.matomo.org/guides/spa-tracking)
- [Log Import and Server SDK](https://matomo.org/log-analytics/)
- [Analytics Event Typing Spec](/docs/platform/analytics/schema.md)
- [Platform Governance Overview](/docs/platform/governance/index.md)
- [Enterprise Analytics Strategy](/docs/platform/analytics/enterprise.md)
