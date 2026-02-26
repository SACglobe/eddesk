# Skill: Template Data Contract

## Context
- Three templates: template_classic, template_modern, template_premium
- Each template lives in src/templates/[template_name]/
- Templates receive school data as props from the parent page
- Data shape is defined in school-content.schema.ts

## Rules
1. Templates must NEVER fetch data themselves — data is always passed as props
2. All three templates must accept the same base props interface
3. Use optional chaining for all template data access (data?.schoolName)
4. Templates should have a skeleton/loading state built in
5. Never import from one template into another
