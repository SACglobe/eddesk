/**
 * core/data/index.js
 * ─────────────────────────────────────────────────────────────────────
 * DATA SOURCE SWITCH — the only place that decides where data comes from.
 *
 * Skill: data-source-switch (guardrails/skills/data-source-switch.md)
 *
 * Rules:
 *   - ViewModels import ONLY from this file
 *   - Never import tenant.data.js or tenantApi.service directly elsewhere
 *   - Switching data sources = change ONE env variable only
 *
 * .env.local:
 *   USE_LOCAL_DATA=true   → local dummy data (development / demo)
 *   USE_LOCAL_DATA=false  → live API call (production)
 * ─────────────────────────────────────────────────────────────────────
 */

import { LOCAL_TENANT_DATA }   from './local/tenant.data.js';
import { fetchTenantFromApi }  from '../services/tenantApi.service.js';

/**
 * Get tenant data. Single entry point for all data access.
 *
 * @param {string} domain      - The school's custom domain
 * @param {string} templateId  - The school's selected template ID
 * @returns {Promise<{ status: 'success'|'empty'|'error', data: object|null, error: string|null }>}
 */
export async function getTenantData(domain, templateId) {
  const useLocal = process.env.USE_LOCAL_DATA === 'true';

  if (useLocal) {
    return {
      status: 'success',
      data:   LOCAL_TENANT_DATA,
      error:  null,
    };
  }

  return await fetchTenantFromApi(domain, templateId);
}
