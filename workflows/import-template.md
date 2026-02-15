# Workflow: Import Template

## Template Type Detection (Mandatory)

Before importing, determine the source template type.

- If source is HTML/CSS → translation allowed
- If source is Next.js → translation FORBIDDEN

For Next.js sources:
- JSX structure must be preserved 1:1
- Component hierarchy must be preserved
- Layout logic must not be rewritten
- CSS behavior must be preserved exactly

## Objective
Safely integrate a new school template into EdDesk.

## Inputs
- templateId (string)
- sourcePath (path or repo)
- supportedPages (array)
- defaultContent (SchoolContentV1)

## Allowed Write Paths
- /templates/{templateId}/
- /lib/template/registry.ts

## Forbidden Actions
- Modify other templates
- Modify global styles
- Modify middleware
- Modify database schema

## Steps
1. Validate templateId
2. Create template folder
3. Generate schema.ts
4. Generate routes.ts
5. Create defaults.json
6. Build renderer.tsx
7. Scope styles
8. Update registry

## Validation
- defaults.json conforms to schema
- no unrelated files changed
- renderer renders `/`

## Visual Fidelity Requirement (Mandatory)

This workflow requires ZERO visual compromise.

- Pixel fidelity has priority over code quality
- Refactoring, cleanup, or optimization is forbidden
- If exact parity cannot be achieved, the import must STOP

Validation must include:
- Visual Fidelity Checklist
- DOM or screenshot comparison

Approximate matches are considered FAILURE.

A template import MUST pass the DOM diff script
before being accepted.

A template import is INVALID unless `scripts/visual-diff/run.js` passes.

