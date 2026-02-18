# EdDesk API Guardrails

All checks MUST pass 100%.
If any check fails, the implementation is INVALID.

---

## 0. Core API Rule

- [ ] API calls are made ONLY on the server (SSR)
- [ ] API calls are NEVER made inside templates
- [ ] API calls are NEVER made on the client
- [ ] Templates receive data ONLY via props/context

---

## 1. When API Calls Are Allowed

- [ ] Domain is NOT localhost
- [ ] Domain is NOT eddesk.in
- [ ] Request is for a tenant (school) domain
- [ ] Request is NOT a demo route

---

## 2. Forbidden API Usage

- [ ] API calls inside templates
- [ ] API calls inside UI components
- [ ] API calls inside hooks used by templates
- [ ] API calls for demo routes
- [ ] API calls for marketing site

---

## 3. API Endpoint Rules

- [ ] API base URL is read from env.local
- [ ] No hardcoded API URLs in code
- [ ] Domain is passed as query parameter
- [ ] Template ID is passed as query parameter

Allowed format:
- [ ] /tenant/get?domain=school.com&template=template_classic
- [ ] /tenant/get?domain=sub.school.com&template=template_modern

---

## 4. API Response Handling

- [ ] Success response is validated
- [ ] Empty data is explicitly handled
- [ ] Error response is explicitly handled
- [ ] No silent failures

---

## 5. Failure & Empty State Rules

If API returns EMPTY data:
- [ ] Show system popup
- [ ] Message indicates data not configured
- [ ] Admin URL (admin.eddesk.in) is shown

If API returns ERROR:
- [ ] Show system popup
- [ ] Error message is shown
- [ ] User can retry / refresh

---

## 6. Data Reference Rules (CRITICAL)

- [ ] Table names are NOT hardcoded
- [ ] Column names are NOT hardcoded
- [ ] All table/column names come from reference.js
- [ ] API response is accessed ONLY via references

---

## 7. Caching & Re-fetch Rules

- [ ] API fetch happens per request (SSR)
- [ ] No client-side caching is used
- [ ] No global in-memory caching is used
- [ ] Fresh data is always preferred over stale data

(This allows admin updates to reflect immediately)

---

## 8. Stop Conditions

Implementation MUST STOP if:
- [ ] API logic leaks into templates
- [ ] Client-side fetching is required
- [ ] Hardcoded schema values are introduced
- [ ] Demo routing behavior is affected
