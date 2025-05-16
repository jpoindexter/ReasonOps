---
title: "schema"
status: "draft"
---

# Schema: architecture

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

