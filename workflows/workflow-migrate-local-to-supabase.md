# Workflow: Migrate Domain Data from Local to Supabase

## Goal
Replace local constants/contants.js lookups with Supabase DB function calls

## Steps

### Step 1 — Create Supabase DB Function
Write SQL to create a function `get_tenant_by_domain(p_domain TEXT)`
that returns: template_id, type, school_name, theme_config, etc.
Reference table names from src/app/constants/reference.js

### Step 2 — Create a data service file
Create: src/app/core/data/supabase/tenant.service.ts
- Function: getTenantByDomain(domain: string)
- Returns typed TenantConfig object
- Falls back to local data if Supabase returns null

### Step 3 — Update middleware OR page
Decide: resolve domain in middleware (edge) or in page (server component)?
Recommended: resolve in the Server Component page for full data access.
Keep middleware only for URL rewriting.

### Step 4 — Feed data into templates
In app/tenant/[...path]/page.tsx and app/demo/[templateSlug]/page.tsx:
- Call getTenantByDomain(domain)
- Pass result as props to <TemplateClassic />, <TemplateModern />, etc.

### Step 5 — Test with local fallback
Ensure localhost:3001 still works using local data if Supabase is unreachable

## Completion Criteria
- [ ] Supabase DB function exists and tested in Supabase dashboard
- [ ] tenant.service.ts created with proper TypeScript types
- [ ] Templates receive data from Supabase (verify with console.log in dev)
- [ ] Local fallback still works
- [ ] No hardcoded domain strings in component files
