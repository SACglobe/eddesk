# Guardrail: Supabase Read-Only Protection

## ABSOLUTE RULES — NEVER VIOLATE
1. NEVER run DELETE, UPDATE, INSERT, or UPSERT on any Supabase table
2. NEVER call any Supabase RPC function that modifies data
3. NEVER use .delete(), .update(), .insert(), .upsert() from the Supabase client
4. NEVER run raw SQL that mutates data (DROP, ALTER, TRUNCATE, CREATE)
5. NEVER modify migration files or schema files
6. NEVER change anything in the Supabase dashboard via MCP

## ALLOWED
- supabase.rpc() for READ-ONLY database functions only
- Reading from src/app/constants/reference.js
- Reading from src/app/core/data/local/tenant.data.js
- console.log() of any response data
- Creating new TypeScript files and service files

## IF UNSURE
Stop and ask the developer before proceeding.
Do NOT assume a function is safe to call.
