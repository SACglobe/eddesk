Load guardrail: supabase-readonly
Load skill: skill-supabase-data-fetching
Load skill: skill-tenant-routing

## Task: Phase 1 — Fetch and Log Supabase Response

We have already created the Supabase database function.
Your job is ONLY to call it, log the raw response, and create a type reference.
Do NOT feed data into templates yet. Do NOT modify any existing files.

### Step 1 — Create a test script
Create the file: src/app/core/data/supabase/tenant.service.ts

Add ONE function only:

export async function debugTenantByDomain(domain: string) {
  const supabase = createServerSupabaseClient() // use existing client setup
  
  console.log('=== SUPABASE DEBUG: Calling get_tenant_by_domain ===')
  console.log('Domain input:', domain)
  
  const { data, error } = await supabase.rpc('get_tenant_by_domain', {
    p_domain: domain
  })
  
  console.log('=== RAW RESPONSE ===')
  console.log('data:', JSON.stringify(data, null, 2))
  console.log('error:', JSON.stringify(error, null, 2))
  console.log('data type:', typeof data)
  console.log('is array:', Array.isArray(data))
  if (Array.isArray(data)) {
    console.log('array length:', data.length)
    console.log('first item keys:', data[0] ? Object.keys(data[0]) : 'EMPTY')
  }
  
  return { data, error }
}

### Step 2 — Call it in the tenant page temporarily
In src/app/tenant/[...path]/page.tsx:
- Import debugTenantByDomain
- At the very top of the default export function, add:
  const domain = headers().get('host') || 'localhost:3001'
  await debugTenantByDomain(domain)
- Do NOT change anything else in this file
- Add a comment: // PHASE 1 DEBUG - REMOVE AFTER REVIEW

### Step 3 — Also test with hardcoded domains
In the same tenant page, call debugTenantByDomain with each of:
- 'localhost:3001'
- 'eddesk.in'
- 'localhost:3000'

So we can see the response shape for each domain type.

### What NOT to do
- Do NOT feed any data into templates
- Do NOT modify the template files
- Do NOT delete or update anything in Supabase
- Do NOT change middleware.ts
- Do NOT change constants/contants.js

When done, tell me exactly what files you created or modified.
