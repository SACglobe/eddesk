---
name: tenant-api-fetch
description: Fetches school tenant data using domain and template ID via SSR-only API calls and prepares normalized data for ViewModels.
scope: runtime
version: 1.0
---

# Skill: Tenant API Fetch

## Purpose
Fetch tenant (school) data from EdDesk API using domain and template ID.

---

## Allowed Responsibilities

- [ ] Read domain from server request
- [ ] Read template_id from routing context
- [ ] Build API URL using env variables
- [ ] Call API via server-side fetch
- [ ] Handle success, empty, and error responses
- [ ] Normalize API data for ViewModels

---

## Forbidden

- [ ] Client-side API calls
- [ ] API calls inside templates
- [ ] Hardcoded API URLs
- [ ] Hardcoded table or column names
- [ ] UI rendering logic

---

## Inputs

- [ ] domain (string)
- [ ] template_id (string)

---

## Outputs

- [ ] normalized tenant data
- [ ] empty state indicator
- [ ] error state indicator

---

## Stop Conditions

- [ ] Domain is localhost or eddesk.in
- [ ] Request is demo route
- [ ] API URL is missing from env
