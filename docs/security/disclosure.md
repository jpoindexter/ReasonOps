---
title: "disclosure"
status: "draft"
---

# 🛡 Vulnerability Disclosure Policy

ReasonOps values the input of security researchers and ethical hackers in identifying potential vulnerabilities in our system. This document outlines our coordinated disclosure policy, in alignment with industry standards such as ISO 29147 and NIST SP 800-115.

---

## 📬 How to Report a Vulnerability

If you discover a security vulnerability, please report it via email:

```
security@reasonops.io
```

We support encrypted submissions. Request our PGP key by emailing `security@reasonops.io` with subject: `PGP Request`.

Include as much detail as possible, such as:

- Affected endpoint or component
- Steps to reproduce
- Any tools or payloads used
- Proof of concept (PoC), if applicable
- Your name and preferred contact info (optional)

---

## ⏱ Response Process

| Stage               | Timeline                                             |
| ------------------- | ---------------------------------------------------- |
| Acknowledgement     | Within 1 business day (automated), 3 days (manual)   |
| Triage + validation | Within 5 business days (priority-based)              |
| Fix deployment      | Within 14 days for critical, 30 days max             |
| Credit / disclosure | Public changelog and CVE registration (if permitted) |

Each step is logged and tracked in our internal audit workflow. High severity reports may trigger escalation to our Incident Response Committee within 24 hours.

---

## ✅ What We're Looking For

We welcome reports for:

- Authentication bypass
- Unauthorized data access
- Privilege escalation
- CSRF, SSRF, XSS
- RLS misconfigurations
- Export path leakage
- Misuse of service accounts
- Abuse of evaluation or export mechanisms
- Any behavior that violates expected security or governance boundaries

---

## 🚫 Out of Scope

The following are not considered security issues:

- Rate limiting
- Self-XSS or social engineering
- HTTP 404/403/500 response enumeration
- Lack of email verification
- Missing security headers (e.g. HSTS)

---

## 🧾 Licensing, Safe Harbor & Compliance

We consider good-faith security research to be exempt from any violation of our Acceptable Use Policy or license agreement.

By disclosing responsibly:

- You are granted Safe Harbor from DMCA and licensing enforcement.
- Your findings are logged in our internal audit register.
- Credit in release notes and security bulletins (if desired).
- Compliance is reviewed under ISO 29147-aligned protocols.
- All disclosures are archived and accessible during SOC 2 / ISO 27001 audits.

---

## 🔐 Compliance & Audit Trail

All disclosures are:

- Assigned a unique identifier and timestamp
- Retained for a minimum of 24 months
- Audited quarterly by internal security operations
- Included in external assessments if customer-facing systems are impacted

---

Thank you for helping us keep ReasonOps secure for the entire community.
