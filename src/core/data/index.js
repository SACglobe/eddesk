/**
 * core/data/index.js
 * ─────────────────────────────────────────────────────────────────────
 * DATA SOURCE - Always Live Database.
 * ─────────────────────────────────────────────────────────────────────
 */

import { fetchTenantFromApi } from '../services/tenantApi.service.js';

/**
 * Get tenant data. Single entry point for all data access.
 * Always fetches from the live database/API.
 *
 * @param {string} domain      - The school's custom domain
 * @param {string} templateId  - The school's selected template ID
 * @returns {Promise<{ status: 'success'|'empty'|'error', data: object|null, error: string|null }>}
 */
export async function getTenantData(domain, templateId) {
  return await fetchTenantFromApi(domain, templateId);
}
