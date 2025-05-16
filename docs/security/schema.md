---
title: "schema"
status: "draft"
---

# Schema: security

## JSON Structure

```ts
import { z } from 'zod';

export const SecuritySchema = z.object({
  policyId: z.string().uuid().describe('Unique identifier for this security policy'),
  policyName: z.string().min(3).max(100).describe('Human-readable name of the policy'),
  description: z.string().optional().describe('Detailed summary of the policy'),
  createdBy: z.string().email().describe('Email of the person who authored the policy'),
  createdAt: z.string().datetime().describe('RFC 3339 timestamp of policy creation'),
  updatedAt: z.string().datetime().optional().describe('RFC 3339 timestamp of last update'),
  appliesTo: z
    .array(z.enum(['frontend', 'backend', 'database', 'infrastructure']))
    .describe('Scope of systems this policy applies to'),
  tokenPolicy: z
    .object({
      rotationIntervalDays: z
        .number()
        .min(1)
        .describe('How often tokens must be rotated (in days)'),
      tokenLength: z.number().min(16).max(256).describe('Required length of access tokens'),
      storageStrategy: z
        .enum(['vault', 'kms', 'env', 'database'])
        .describe('Where the token must be securely stored'),
      auditLogging: z.boolean().describe('Whether all token accesses must be logged'),
    })
    .describe('Token security and rotation policy'),
  incidentResponse: z
    .object({
      slaHours: z.number().min(1).describe('Response SLA in hours for disclosed vulnerabilities'),
      contactEmail: z.string().email().describe('Responsible disclosure contact email'),
      escalationPath: z.array(z.string()).describe('Escalation contact chain for critical issues'),
    })
    .describe('Incident reporting and escalation structure'),
  accessControls: z
    .object({
      roles: z
        .array(z.enum(['admin', 'editor', 'viewer']))
        .describe('Allowed roles under this policy'),
      mfaRequired: z.boolean().describe('Whether multi-factor authentication is enforced'),
      allowedCIDRs: z
        .array(z.string())
        .optional()
        .describe('Optional list of CIDR blocks allowed to access systems'),
    })
    .describe('Role-based access control enforcement'),

  encryptionPolicy: z
    .object({
      atRest: z.enum(['aes256', 'kms', 'custom']).describe('Encryption method for data at rest'),
      inTransit: z.enum(['tls1.2', 'tls1.3']).describe('Encryption method for data in transit'),
      keyRotationDays: z.number().min(1).describe('Interval for rotating encryption keys in days'),
    })
    .describe('Encryption enforcement policy'),

  compliance: z
    .object({
      standards: z
        .array(z.enum(['SOC2', 'ISO27001', 'HIPAA', 'GDPR']))
        .describe('Compliance frameworks met'),
      reviewedAt: z.string().datetime().describe('RFC 3339 date of last compliance review'),
      approvedBy: z.string().email().describe('Email of person who approved compliance policy'),
    })
    .describe('Regulatory and audit compliance'),
});
```

## Field Reference

| Field              | Type                        | Description                                     |
| ------------------ | --------------------------- | ----------------------------------------------- |
| `policyId`         | string (UUID)               | Unique identifier for this security policy      |
| `policyName`       | string                      | Human-readable name of the policy               |
| `description`      | string (optional)           | Detailed summary of the policy                  |
| `createdBy`        | string (email)              | Email of the person who authored the policy     |
| `createdAt`        | string (datetime)           | Timestamp of policy creation (RFC 3339)         |
| `updatedAt`        | string (datetime, optional) | Timestamp of last update                        |
| `appliesTo`        | array of string enums       | Scope of systems affected                       |
| `tokenPolicy`      | object                      | Subschema for token rotation and storage        |
| `incidentResponse` | object                      | Subschema for escalation and incident response  |
| `accessControls`   | object                      | Subschema for role-based access and CIDR limits |
| `encryptionPolicy` | object                      | Subschema for encryption at rest/in transit     |
| `compliance`       | object                      | Subschema for compliance frameworks and review  |
