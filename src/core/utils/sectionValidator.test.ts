import { validateRequiredSections } from './sectionValidator';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

describe('sectionValidator', () => {
    const mockVM: Partial<TenantViewModel> = {
        components: [
            { componentCode: 'hero', isActive: true, isRequired: true, displayOrder: 1, config: {} as any },
            { componentCode: 'academics', isActive: true, isRequired: true, displayOrder: 2, config: {} as any },
        ],
        heroMedia: [{ key: '1', headline: 'Welcome', isActive: true, mediaUrl: 'test.jpg' } as any],
        academicResults: [{ key: '1', year: 2024, passPercentage: 95 } as any],
    };

    it('should return isValid true if all required sections have data', () => {
        const result = validateRequiredSections(mockVM as TenantViewModel);
        expect(result.isValid).toBe(true);
        expect(result.missingSection).toBeUndefined();
    });

    it('should return isValid false if a required section is missing data', () => {
        const incompleteVM: Partial<TenantViewModel> = {
            ...mockVM,
            academicResults: [], // Required but empty
        };
        const result = validateRequiredSections(incompleteVM as TenantViewModel);
        expect(result.isValid).toBe(false);
        expect(result.missingSection).toBe('academics');
    });

    it('should return isValid true if missing data is for an inactive component', () => {
        const inactiveVM: Partial<TenantViewModel> = {
            ...mockVM,
            components: [
                { componentCode: 'hero', isActive: true, isRequired: true, displayOrder: 1, config: {} as any },
                { componentCode: 'academics', isActive: false, isRequired: true, displayOrder: 2, config: {} as any },
            ],
            academicResults: [],
        };
        const result = validateRequiredSections(inactiveVM as TenantViewModel);
        expect(result.isValid).toBe(true);
    });

    it('should return isValid true if missing data is for a non-required component', () => {
        const optionalVM: Partial<TenantViewModel> = {
            ...mockVM,
            components: [
                { componentCode: 'hero', isActive: true, isRequired: true, displayOrder: 1, config: {} as any },
                { componentCode: 'academics', isActive: true, isRequired: false, displayOrder: 2, config: {} as any },
            ],
            academicResults: [],
        };
        const result = validateRequiredSections(optionalVM as TenantViewModel);
        expect(result.isValid).toBe(true);
    });

    it('should handle schoolAchievements for achievements component', () => {
        const achievementsVM: Partial<TenantViewModel> = {
            components: [
                { componentCode: 'schoolachievements', isActive: true, isRequired: true, displayOrder: 1, config: {} as any },
            ],
            schoolAchievements: [],
        };
        const result = validateRequiredSections(achievementsVM as TenantViewModel);
        expect(result.isValid).toBe(false);
        expect(result.missingSection).toBe('schoolachievements');
    });

    it('should handle stats component', () => {
        const statsVM: Partial<TenantViewModel> = {
            components: [
                { componentCode: 'stats', isActive: true, isRequired: true, displayOrder: 1, config: {} as any },
            ],
            stats: [],
        };
        const result = validateRequiredSections(statsVM as TenantViewModel);
        expect(result.isValid).toBe(false);
        expect(result.missingSection).toBe('stats');
    });
    it('should fail if a filtered required section is missing specific data', () => {
        const mockTenant: TenantViewModel = {
            ...(mockVM as TenantViewModel),
            schoolAchievements: [
                { title: 'Sport win', category: 'sports' }
            ],
            components: [
                {
                    componentCode: 'schoolachievements',
                    isActive: true,
                    isRequired: true,
                    displayOrder: 1,
                    config: { filters: { type: 'academic' } }
                }
            ]
        };

        const result = validateRequiredSections(mockTenant);
        expect(result.isValid).toBe(false);
        expect(result.missingSection).toBe('schoolachievements');
    });

    it('should pass if a filtered required section has matching data', () => {
        const mockTenant: TenantViewModel = {
            ...(mockVM as TenantViewModel),
            leadership: [
                { name: 'John', role: 'Principal' }
            ],
            components: [
                {
                    componentCode: 'leadership',
                    isActive: true,
                    isRequired: true,
                    displayOrder: 1,
                    config: { filters: { designation: 'Principal' } }
                }
            ]
        };

        const result = validateRequiredSections(mockTenant);
        expect(result.isValid).toBe(true);
        expect(result.missingSection).toBeUndefined();
    });
});
