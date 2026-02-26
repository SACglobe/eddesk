### Skill 2: `skill tenant routing`
```markdown
# Skill: Tenant Routing & Domain Resolution

## Context
- constants/contants.js holds domain → template_id mapping (currently local, migrating to Supabase)
- Middleware rewrites tenant domains to /demo/[template_id]/[...path]
- Owner domains (no template_id) load the landing page
- Multi-tenant routes: app/tenant/[...path]/page.tsx
- Demo routes: app/demo/[templateSlug]/[[...path]]/page.tsx

## Rules
1. NEVER modify the rewrite logic without updating both middleware.ts AND constants
2. Domain matching must be exact (include port for localhost)
3. Always check type: "owner" | "tenant" before deciding which page to render
4. When migrating from local data to Supabase, keep local data as fallback
5. The middleware must stay edge-compatible (no Node.js APIs)
