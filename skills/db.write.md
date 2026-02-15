# Skill: db.write

## Purpose
Write Supabase data.

## Allowed Tables
- school_content
- school_template_history
- templates

## Preconditions
- Auth context required OR
- Explicit service-role approval

## Forbidden
- Schema changes
- Deletes without confirmation

## Input
- table
- operation (insert | update)
- payload

## Output
- success | failure
