import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'ReasonOps Docs',
  description: 'Enterprise documentation for LLM evaluation workflows',
  cleanUrls: true,
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
    },
    nav: [
      { text: 'Getting Started', link: '/GETTING_STARTED' },
      { text: 'Platform', link: '/platform/access/role-matrix' },
      { text: 'Features', link: '/features/dashboard/components/task-list' },
      { text: 'Prompts', link: '/prompts/scoring' },
      { text: 'API', link: '/api/auth' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        link: '/GETTING_STARTED',
      },
      {
        text: 'Platform',
        items: [
          { text: 'Access & Roles', link: '/platform/access/role-matrix' },
          { text: 'Org Invites', link: '/platform/access/org-invites' },
          { text: 'Feature Flags', link: '/platform/environment/feature-flags' },
          { text: 'Analytics System', link: '/platform/analytics/system' },
          { text: 'Telemetry', link: '/platform/observability/telemetry' },
          { text: 'Reviewer Teams', link: '/platform/teams/reviewer-hierarchy' },
          { text: 'Billing Tiers', link: '/platform/billing/plan-tiers' },
          { text: 'Audit Logging', link: '/platform/governance/audit-log-spec' },
          { text: 'Env Modes', link: '/platform/config/env-modes' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'Task List', link: '/features/dashboard/components/task-list' },
          { text: 'Export Panel', link: '/features/dashboard/components/export-panel' },
          { text: 'Reviewer Metrics', link: '/features/admin/reviewer-metrics' },
          { text: 'Agreement Matrix', link: '/features/admin/agreement-matrix' },
          { text: 'Export Readiness', link: '/features/export/export-readiness' },
          { text: 'CI Snapshot', link: '/features/export/export-ci-snapshot' },
          { text: 'JSONL Preview', link: '/features/export/jsonl-preview' },
          { text: 'Calibration Mode', link: '/features/reviewer/calibration-mode' },
          { text: 'History Viewer', link: '/features/reviewer/history-viewer' },
          { text: 'Inline Help', link: '/features/rubric/inline-help' },
          { text: 'Rubric Versioning', link: '/features/rubric/rubric-versioning' },
          { text: 'Step Annotator', link: '/features/scoring/step-annotator' },
          { text: 'Score Consensus', link: '/features/scoring/score-consensus' },
          { text: 'Confidence Toggles', link: '/features/scoring/confidence-toggles' },
          { text: 'Search', link: '/features/search/global-search' },
          { text: 'Log Review Event', link: '/features/session/log-review-event' },
          { text: 'Logout Behavior', link: '/features/session/logout-behavior' },
          { text: 'Onboarding Flow', link: '/features/onboarding/flow' },
          { text: 'Share Links', link: '/features/showcase/share-links' },
        ],
      },
    ],
    outline: [2, 3],
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/reasonops/reasonops' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 THEFT Studio',
    },
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
});
