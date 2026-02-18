# EdDesk Skills Definition

This file defines the ONLY skills agents are allowed to use.
Each skill has a fixed responsibility boundary.
If a task does not fit a skill, the agent MUST STOP.

All checks must pass 100%.

---

## Skill 1: Domain Resolution

### Purpose
Resolve request domain and decide routing mode.

### Allowed Responsibilities

- [ ] Read hostname from server request
- [ ] Identify marketing vs demo vs tenant mode
- [ ] Return routing decision only
- [ ] SSR-safe execution only

### Forbidden

- [ ] Database access
- [ ] Template rendering
- [ ] Client-side logic
- [ ] Business logic

---

## Skill 2: Database Constants Mapping

### Purpose
Provide a single source of truth for table and column names.

### Allowed Responsibilities

- [ ] Define table name constants
- [ ] Define column name constants
- [ ] Export constants for reuse
- [ ] Update constants when schema changes

### Forbidden

- [ ] Writing queries
- [ ] Fetching data
- [ ] Formatting data
- [ ] Hardcoding names elsewhere

---

## Skill 3: Data Models (POJO)

### Purpose
Define typed representations of database entities.

### Allowed Responsibilities

- [ ] Define interfaces / types
- [ ] Match database schema
- [ ] Contain no logic
- [ ] Be reusable across ViewModels

### Forbidden

- [ ] Database access
- [ ] Business logic
- [ ] Formatting
- [ ] Side effects

---

## Skill 4: Database Access Service

### Purpose
Centralized database and API access.

### Allowed Responsibilities

- [ ] Fetch data from database
- [ ] Apply filters and conditions
- [ ] Handle DB-level errors
- [ ] Return raw or lightly mapped data

### Forbidden

- [ ] UI logic
- [ ] Template imports
- [ ] Routing decisions
- [ ] SEO logic

---

## Skill 5: ViewModel – Home Page

### Purpose
Prepare all data required for the Home page.

### Allowed Responsibilities

- [ ] Call database services
- [ ] Aggregate multiple data sources
- [ ] Apply enable/disable logic
- [ ] Apply ordering rules
- [ ] Provide fallback values
- [ ] Prepare template-ready props

### Forbidden

- [ ] Rendering UI
- [ ] Importing templates
- [ ] Direct database access
- [ ] Client-side execution

---

## Skill 6: ViewModel – SEO

### Purpose
Generate dynamic SEO metadata and schemas.

### Allowed Responsibilities

- [ ] Generate meta title and description
- [ ] Generate Open Graph data
- [ ] Generate JSON-LD schemas
- [ ] Accept ViewModel data as input

### Forbidden

- [ ] Writing SEO inside templates
- [ ] Client-side SEO generation
- [ ] Fetching database data directly

---

## Skill 7: Template Mounting

### Purpose
Mount an existing template without modifying it.

### Allowed Responsibilities

- [ ] Dynamically import template entry point
- [ ] Pass props to template
- [ ] Mount template via SSR routing
- [ ] Preserve 100% visual fidelity

### Forbidden

- [ ] Editing template JSX or CSS
- [ ] Adding logic inside templates
- [ ] Conditional UI inside templates
- [ ] Refactoring template code

---

## Skill 8: Error Handling (Non-Visual)

### Purpose
Handle system errors outside templates.

### Allowed Responsibilities

- [ ] Detect missing tenant data
- [ ] Show system fallback pages
- [ ] Log errors server-side
- [ ] Prevent template crashes

### Forbidden

- [ ] Error UI inside templates
- [ ] Silent failures
- [ ] Client-side error masking

---

## Skill 9: Agent Execution Control

### Purpose
Ensure agents operate safely within scope.

### Allowed Responsibilities

- [ ] Declare task scope before execution
- [ ] List allowed files explicitly
- [ ] Work on one template at a time
- [ ] Stop on guardrail conflict
- [ ] Report changes and reasons only

### Forbidden

- [ ] Scope expansion
- [ ] Batch operations without permission
- [ ] Modifying unrelated files
- [ ] Making assumptions

---

## Final Acceptance Checklist

- [ ] Task matches exactly one defined skill
- [ ] No forbidden actions were taken
- [ ] Guardrails were respected
- [ ] Output is deterministic and scoped

If any check fails, the task is INVALID.
