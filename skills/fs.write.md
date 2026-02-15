# Skill: fs.write

## Purpose
Create or modify files.

## Allowed Paths
- /templates/{templateId}/
- /lib/template/registry.ts

## Forbidden
- Any other path
- Overwriting unrelated files

## Input
- path
- content

## Rules
- File must not violate workflow rules
- Overwrites must be explicit

## Output
- success | failure
