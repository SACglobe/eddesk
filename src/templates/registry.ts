// src/lib/templates/registry.ts

export const TEMPLATE_REGISTRY = {
    template_classic: async () => import('@/templates/template_classic'),
    template_modern: async () => import('@/templates/template_modern'),
    template_premium: async () => import('@/templates/template_premium'),
}
