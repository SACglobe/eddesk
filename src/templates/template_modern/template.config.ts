// src/templates/template_modern/template.config.ts

export const templateId = 'template_modern'

export const routes = [
    '/',
    '/about',
    '/events',
    '/admissions',
    '/contact',
]

export function adaptData(schoolData: any) {
    // Phase 0: return static or lightly mapped data
    return {
        school: schoolData,
    }
}
