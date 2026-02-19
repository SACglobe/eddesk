---
name: domain-resolution
description: >
  Resolve incoming request domain to routing mode: marketing, demo, or tenant.
  SSR-only. No client-side logic. No DB access.
scope: core/router/domainResolver.ts
version: 1.0
---

# Skill: Domain Resolution

## Purpose
Read the incoming request's `host` header and return one of three
routing modes. This decision gates everything downstream.

---

## Routing Decision Table

| Domain                  | Path starts with | Mode        |
|-------------------------|-----------------|-------------|
| `localhost`             | any             | `marketing` |
| `eddesk.in`             | `/demo/*`       | `demo`      |
| `eddesk.in`             | any other       | `marketing` |
| `*.eddesk.in`           | any             | `marketing` |
| any other domain        | any             | `tenant`    |

---

## Implementation Rules
- Read host ONLY from `next/headers` → `headers().get('host')`
- Normalize before comparing: lowercase, strip protocol, strip www, strip port
- NEVER use `window.location` or `document`
- NEVER read hostname in a template
- Return only: `{ mode, domain }`

---

## Where This Lives
`src/core/router/domainResolver.ts`
Called at the top of `page.tsx` before any data fetching.

---

## Stop Conditions
- If host header is missing → default to `marketing` mode, log warning
- If domain is ambiguous → log and default to `marketing` (safest fallback)
- NEVER default to `tenant` mode without a confirmed non-EdDesk domain
