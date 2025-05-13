# 🛡 Vulnerability Disclosure Policy

ReasonOps values the input of security researchers and ethical hackers in identifying potential vulnerabilities in our system. This document outlines our coordinated disclosure policy.

---

## 📬 How to Report a Vulnerability

If you discover a security vulnerability, please report it via email:

```
security@reasonops.io
```

Include as much detail as possible, such as:

- Affected endpoint or component
- Steps to reproduce
- Any tools or payloads used
- Proof of concept (PoC), if applicable
- Your name and preferred contact info (optional)

---

## ⏱ Response Process

| Stage               | Timeline                                       |
| ------------------- | ---------------------------------------------- |
| Acknowledgement     | Within 3 business days                         |
| Triage + validation | Within 7 business days                         |
| Fix deployment      | Within 30 days (or sooner for critical issues) |
| Credit / disclosure | Public changelog (if permitted)                |

We commit to keeping you informed throughout the process.

---

## ✅ What We're Looking For

We welcome reports for:

- Authentication bypass
- Unauthorized data access
- Privilege escalation
- CSRF, SSRF, XSS
- RLS misconfigurations
- Export path leakage
- Any other behavior that violates expected security boundaries

---

## 🚫 Out of Scope

The following are not considered security issues:

- Rate limiting
- Self-XSS or social engineering
- HTTP 404/403/500 response enumeration
- Lack of email verification
- Missing security headers (e.g. HSTS)

---

## 🧾 Licensing & Safe Harbor

We consider good-faith security research to be exempt from any violation of our Acceptable Use Policy or license agreement.

By disclosing responsibly, you are granted:

- Safe harbor from DMCA or licensing enforcement
- Credit in release notes (if desired)
- Acknowledgement as part of our security improvement cycle

---

Thank you for helping us keep ReasonOps secure for the entire community.
