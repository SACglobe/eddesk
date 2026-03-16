import { buildTenantViewModel } from './tenant.viewmodel';
import { ScreenDataPayload } from '@/core/services/screenData.service';

describe('TenantViewModel Aliasing', () => {
    const basePayload: ScreenDataPayload = {
        mode: 'live',
        screen: 'home',
        school: { key: 'school-1', name: 'Test School' },
        subscription: { status: 'active' },
        plan: { name: 'premium' },
        data: {
            templatecomponents: []
        }
    } as unknown as ScreenDataPayload;

    it('should map studentachievements to achievements', () => {
        const payload: ScreenDataPayload = {
            ...basePayload,
            data: {
                ...basePayload.data,
                templatecomponents: [
                    { componentkey: 'comp-1', componentcode: 'studentachievements', isactive: true, isrequired: true, displayorder: 5 }
                ] as any[]
            }
        };

        const vm = buildTenantViewModel(payload);
        const section = vm.homepageSections.find(s => s.sectionKey === 'achievements');
        
        expect(section).toBeDefined();
        expect(section?.isEnabled).toBe(true);
        expect(section?.isRequired).toBe(true);
    });

    it('should merge studentachievements and schoolachievements into achievements', () => {
        const payload: ScreenDataPayload = {
            ...basePayload,
            data: {
                ...basePayload.data,
                templatecomponents: [
                    { componentkey: 'comp-1', componentcode: 'studentachievements', isactive: false, isrequired: true, displayorder: 5 },
                    { componentkey: 'comp-2', componentcode: 'schoolachievements', isactive: true, isrequired: false, displayorder: 10 }
                ] as any[]
            }
        };

        const vm = buildTenantViewModel(payload);
        const achievementsSections = vm.homepageSections.filter(s => s.sectionKey === 'achievements');
        
        expect(achievementsSections.length).toBe(1);
        expect(achievementsSections[0].isEnabled).toBe(true); // From schoolachievements
        expect(achievementsSections[0].isRequired).toBe(true); // From studentachievements
    });

    it('should map schoolstats to stats', () => {
        const payload: ScreenDataPayload = {
            ...basePayload,
            data: {
                ...basePayload.data,
                templatecomponents: [
                    { componentkey: 'comp-1', componentcode: 'schoolstats', isactive: true, isrequired: true, displayorder: 3 }
                ] as any[]
            }
        };

        const vm = buildTenantViewModel(payload);
        const section = vm.homepageSections.find(s => s.sectionKey === 'stats');
        
        expect(section).toBeDefined();
        expect(section?.isEnabled).toBe(true);
    });

    it('should map broadcast to announcements', () => {
        const payload: ScreenDataPayload = {
            ...basePayload,
            data: {
                ...basePayload.data,
                templatecomponents: [
                    { componentkey: 'comp-1', componentcode: 'broadcast', isactive: true, isrequired: false, displayorder: 2 }
                ] as any[]
            }
        };

        const vm = buildTenantViewModel(payload);
        const section = vm.homepageSections.find(s => s.sectionKey === 'announcements');
        
        expect(section).toBeDefined();
        expect(section?.isEnabled).toBe(true);
    });

    it('should map academicresults to academics', () => {
        const payload: ScreenDataPayload = {
            ...basePayload,
            data: {
                ...basePayload.data,
                templatecomponents: [
                    { componentkey: 'comp-1', componentcode: 'academicresults', isactive: true, isrequired: true, displayorder: 4 }
                ] as any[]
            }
        };

        const vm = buildTenantViewModel(payload);
        const section = vm.homepageSections.find(s => s.sectionKey === 'academics');
        
        expect(section).toBeDefined();
        expect(section?.isEnabled).toBe(true);
        expect(section?.isRequired).toBe(true);
    });
});
