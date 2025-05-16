---
title: "ui"
status: "draft"
---

# UI Components

## Components

The Analytics platform includes the following hardened UI components designed for production observability and compliance:

- **AnalyticsTrackerProvider**: Root-level context provider. Initializes tracking clients with env-aware credentials. Handles lifecycle cleanup on unmount. Monitors network availability and falls back to buffered mode on failure.
- **TrackingConsentBanner**: Renders when legal consent is required. Blocks tracking pipeline until explicit opt-in. Tracks consent version and regulatory basis (e.g. GDPR legit interest or CCPA opt-out).
- **EventLogView**: Developer-only utility. Displays enriched telemetry events. Obfuscates sensitive payloads in local mode. Not visible in production builds.
- **SettingsPanel**: Admin-configurable panel. Enables or disables analytics modules, selects between providers (Matomo, Segment, RudderStack), and rotates tokens. Protected by RBAC.

## Interactions

### Expected Behaviors

- `AnalyticsTrackerProvider` bootstraps client initialization with retry logic and fail-safes.
- Consent flow respects browser storage and regulatory rulesets. Consent revocation disables event tracking mid-session.
- Tracking events are dispatched only post-consent, and buffered during initialization.
- The `SettingsPanel` reflects live config state. Admin toggles are secured via signed backend tokens.
- Errors are logged internally and redacted at the UI layer. Logs are persisted to a dev-only event viewer.

### Event Hooks

- All events use a centralized dispatcher via `useAnalytics()`.
- Events are scoped with enterprise-grade metadata: `session_id`, `user_id`, `tenant_id`, `env`, `feature_flag_state`.
- Hooks validate shape and enforce a structured event schema.
- Under degraded conditions, hooks retry with exponential backoff and write to in-memory buffer if network unavailable.

## Routes

| Route                 | Access Level   | Description                                                                       |
| --------------------- | -------------- | --------------------------------------------------------------------------------- |
| `/settings/analytics` | Admin Only     | UI for toggling analytics modules and configuring providers. Requires RBAC token. |
| `/debug/analytics`    | Developer Only | Diagnostic view for real-time events. Hidden in prod.                             |
| `/docs/analytics`     | Internal Use   | Docs view for internal audit trails and integration walkthroughs.                 |
