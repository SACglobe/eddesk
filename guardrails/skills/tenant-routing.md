---
name: tenant-routing
description: >
  Configure next.config.js to rewrite all tenant custom domains to
  the /tenant/[[...path]] route. SSR handles everything after that.
scope: next.config.js
version: 1.0
---

# Skill: Tenant Routing

## Purpose
Route all non-EdDesk, non-localhost domains to the tenant SSR handler
using Next.js rewrites. The URL visible to the user never changes.

---

## How It Works

```
school.com/         → internally served by /tenant
school.com/about    → internally served by /tenant/about
school.com/contact  → internally served by /tenant/contact
```

The rewrite is transparent — the user's browser URL stays as `school.com`.

---

## next.config.js Rewrite Rule

```js
async rewrites() {
  return {
    beforeFiles: [
      {
        // Bypass: eddesk.in and localhost are NOT rewritten
        // Only applies to custom school domains added to Vercel
        source: '/:path*',
        has: [
          {
            type: 'host',
            // This pattern matches any domain that is NOT eddesk.in
            // Vercel handles domain routing — only school domains hit this
            value: '(?!eddesk\\.in).*',
          },
        ],
        destination: '/tenant/:path*',
      },
    ],
  };
},
```

---

## Vercel Domain Configuration
For each school:
1. Add their domain to the Vercel project (Project Settings → Domains)
2. School points their DNS CNAME to `cname.vercel-dns.com`
3. Next.js rewrite routes them to `/tenant/*`
4. Tenant page reads the `host` header to identify which school

---

## Rules
- [ ] No domain names are hardcoded in next.config.js
- [ ] The rewrite destination is always `/tenant/:path*`
- [ ] Marketing site routes (`/`, `/demo/*`) are NOT rewritten
- [ ] The rewrite is server-side only — no client JS involved

---

## Stop Conditions
- If a school's domain doesn't resolve → check Vercel domain config, not code
- If both eddesk.in and school.com hit the tenant handler → fix the `has` condition
- Never add per-school rewrite rules → Vercel domain config handles this
