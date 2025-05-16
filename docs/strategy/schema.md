---
author: ReasonOps System
created: '2025-05-16T10:33:34.997Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: schema
type: doc
updated: '2025-05-16T10:33:34.997Z'
visibility: public
---
# Schema: strategy
## JSON Structure
```ts
const Schema = z.object({
  fieldName: z.string(),
  // ...
});
```
## Field Reference
| Field       | Type     | Description              |
|-------------|----------|--------------------------|
| `fieldName` | string   | What this field captures |
