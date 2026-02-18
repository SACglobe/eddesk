# EdDesk API Workflow

Steps MUST be followed in order.
Skipping steps is NOT allowed.

---

## Phase 0: Preconditions

- [ ] Domain routing is already resolved
- [ ] Request is identified as tenant request
- [ ] Template rewrite is complete
- [ ] Guardrails have been acknowledged

---

## Phase 1: Domain & Context Extraction

- [ ] Read domain from request headers
- [ ] Normalize domain (supports subdomains)
- [ ] Read template_id from route context

---

## Phase 2: API URL Construction

- [ ] Read API base URL from env.local
- [ ] Append endpoint /tenant/get
- [ ] Append domain query parameter
- [ ] Append template query parameter

---

## Phase 3: API Execution (SSR Only)

- [ ] Execute fetch on server
- [ ] Await full response
- [ ] Do not stream partial data

---

## Phase 4: Response Handling

### Success
- [ ] Validate response structure
- [ ] Map fields using reference.js
- [ ] Prepare data for ViewModel

### Empty Data
- [ ] Mark empty state
- [ ] Trigger system popup
- [ ] Provide admin.eddesk.in URL

### Error
- [ ] Capture error message
- [ ] Trigger system popup
- [ ] Allow user refresh

---

## Phase 5: ViewModel Integration

- [ ] Pass normalized data to ViewModel
- [ ] ViewModel prepares template-ready props
- [ ] Templates receive props only

---

## Phase 6: Completion Check

- [ ] No API logic in templates
- [ ] No client-side fetch
- [ ] Reference mapping used everywhere
- [ ] Guardrails satisfied
