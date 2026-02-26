# Skill: Supabase Data Fetching

## Context
- Project uses Supabase as the database
- Domain-based tenant resolution is the core mechanism
- Data is fetched using Supabase DB functions (not direct table queries)
- Reference file: src/app/constants/reference.js (table names & column variables)

## Rules
1. ALWAYS use the Supabase client from src/lib/supabase.ts (or wherever initialized)
2. ALWAYS use RPC calls (supabase.rpc()) to call database functions — never raw table queries
3. ALWAYS handle loading, error, and empty states
4. Use TypeScript types derived from school-content.schema.ts
5. Never hardcode domain strings — always read from constants/reference.js
6. Server Components should use the server-side Supabase client
7. Client Components should use the browser Supabase client

## Pattern
```ts
const { data, error } = await supabase.rpc('get_tenant_by_domain', { 
  p_domain: domain 
})
