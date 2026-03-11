/**
 * Preservation Property Tests - Broadcast Display Fix
 * Feature: broadcast-display-fix
 * 
 * Property 2: Preservation - Non-Broadcast Section Behavior
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**
 * 
 * GOAL: Verify all non-broadcast sections continue to render correctly
 * METHODOLOGY: Observe behavior on UNFIXED code, write tests capturing that behavior
 * EXPECTED OUTCOME: Tests PASS on unfixed code (confirms baseline to preserve)
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import fc from 'fast-check';
import Home from './page';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

// Helper to create minimal valid TenantViewModel
function createMinimalViewModel(overrides?: Partial<TenantViewModel>): TenantViewModel {
  return {
    mode: 'demo',
    screen: 'home',
    school: {
      key: 'test-school',
      name: 'Test School',
      slug: 'test-school',
      customDomain: 'test.example.com',
      templateSlug: 'template_modern',
      templateId: 'template_modern',
      isActive: true,
      isDemo: true,
      logoUrl: '/logo.png',
      slogan: 'Test Slogan',
      description: 'Test Description',
      email: 'test@example.com',
      phone: '1234567890',
      address: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      postalCode: '12345',
      fullAddress: '123 Test St, Test City, Test State, Test Country 12345',
      themeConfig: {},
      paymentGatewayUrl: '',
      gracePeriodDays: 7
    },
    subscription: {
      status: 'active',
      endDate: '2025-12-31'
    },
    plan: {
      name: 'Premium',
      gracePeriod: 7
    },
    components: [],
    homepageSections: [
      {
        sectionKey: 'hero',
        isEnabled: true,
        isRequired: false,
        displayOrder: 1
      }
    ],
    identity: {
      vision: '',
      mission: '',
      motto: '',
      aboutTitle: '',
      aboutDescription: ''
    },
    heroMedia: [],
    broadcast: [],
    announcements: [],
    academicResults: [],
    achievements: [],
    personnel: [],
    statistics: [],
    facilities: [],
    mediaLibrary: [],
    events: [],
    socialMedia: [],
    contactInfo: {
      email: 'test@example.com',
      phone: '1234567890',
      address: '123 Test St'
    },
    ...overrides
  } as TenantViewModel;
}

describe('Property 2: Preservation - Non-Broadcast Section Behavior', () => {
  describe('Hero Section Preservation', () => {
    it('should render hero section when hero media exists', () => {
      // Arrange: Create viewmodel with hero media
      const viewModel = createMinimalViewModel({
        heroMedia: [
          {
            id: '1',
            title: 'Welcome to Our School',
            description: 'Excellence in Education',
            mediaUrl: '/hero1.jpg',
            mediaType: 'image',
            isActive: true,
            displayOrder: 1
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Hero section should be present
      // Note: Hero slider doesn't render title/description in SSR, only background image
      expect(html).toContain('/hero1.jpg');
    });

    it('should NOT render hero section when disabled', () => {
      // Arrange: Create viewmodel with hero disabled
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'hero',
            isEnabled: false,
            isRequired: false,
            displayOrder: 1
          }
        ],
        heroMedia: [
          {
            id: '1',
            title: 'Should Not Display',
            description: 'Hidden Hero',
            mediaUrl: '/hero1.jpg',
            mediaType: 'image',
            isActive: true,
            displayOrder: 1
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Hero section should NOT be present
      expect(html).not.toContain('Should Not Display');
    });
  });

  describe('Academic Results Section Preservation', () => {
    it('should render academic results when data exists', () => {
      // Arrange: Create viewmodel with academic results
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'academics',
            isEnabled: true,
            isRequired: false,
            displayOrder: 2
          }
        ],
        academicResults: [
          {
            year: 2024,
            passPercentage: 98.5,
            distinctions: 45,
            firstClass: 75,
            legacyQuote: 'Excellence is our tradition'
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Academic results section should be present (HTML entities encoded)
      expect(html).toContain('Honors &amp; Academic Results');
      expect(html).toContain('Board Results');
      expect(html).toContain('Pass Percentage');
      expect(html).toContain('Excellence is our tradition');
    });
  });

  describe('Achievements Section Preservation', () => {
    it('should render achievements when data exists', () => {
      // Arrange: Create viewmodel with achievements
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'achievements',
            isEnabled: true,
            isRequired: false,
            displayOrder: 3
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'National Science Award',
            description: 'First place in national competition',
            achievementType: 'academic',
            category: 'Science',
            year: 2024,
            displayOrder: 1
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Achievements section should be present (HTML entities encoded)
      expect(html).toContain('Achievements &amp; Glories');
      expect(html).toContain('National Science Award');
      expect(html).toContain('First place in national competition');
    });
  });

  describe('Principal Section Preservation', () => {
    it('should render principal section when data exists', () => {
      // Arrange: Create viewmodel with principal data
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'principal',
            isEnabled: true,
            isRequired: false,
            displayOrder: 4
          }
        ],
        personnel: [
          {
            id: '1',
            name: 'Dr. Jane Smith',
            designation: 'Principal',
            personType: 'principal',
            bio: 'Leading with vision and integrity for 20 years',
            photoUrl: '/principal.jpg',
            displayOrder: 1
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Principal section should be present (HTML entities encoded)
      expect(html).toContain('From the Principal&#x27;s Desk');
      expect(html).toContain('Dr. Jane Smith');
      expect(html).toContain('Leading with vision and integrity for 20 years');
    });
  });

  describe('Statistics Section Preservation', () => {
    it('should render statistics when data exists', () => {
      // Arrange: Create viewmodel with statistics
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'stats',
            isEnabled: true,
            isRequired: false,
            displayOrder: 5
          }
        ],
        statistics: [
          {
            label: 'Students',
            value: '1500',
            icon: 'users',
            displayOrder: 1
          },
          {
            label: 'Teachers',
            value: '75',
            icon: 'graduation',
            displayOrder: 2
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Statistics section should be present
      expect(html).toContain('Students');
      expect(html).toContain('Teachers');
    });
  });

  describe('Faculty Section Preservation', () => {
    it('should render faculty section when data exists', () => {
      // Arrange: Create viewmodel with faculty data
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'faculty',
            isEnabled: true,
            isRequired: false,
            displayOrder: 6
          }
        ],
        personnel: [
          {
            id: '1',
            name: 'Prof. John Doe',
            designation: 'Head of Science',
            personType: 'faculty',
            bio: 'Expert in Physics and Mathematics',
            photoUrl: '/faculty1.jpg',
            displayOrder: 1
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Faculty section should be present
      expect(html).toContain('Our Distinguished Educators');
      expect(html).toContain('Prof. John Doe');
      expect(html).toContain('Expert in Physics and Mathematics');
    });
  });

  describe('Sports Section Preservation', () => {
    it('should render sports achievements when data exists', () => {
      // Arrange: Create viewmodel with sports achievements
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'sports',
            isEnabled: true,
            isRequired: false,
            displayOrder: 7
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'State Football Championship',
            description: 'Won the state championship',
            achievementType: 'sports',
            category: 'Football',
            year: 2024,
            photoUrl: '/sports1.jpg',
            displayOrder: 1
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Sports section should be present (HTML entities encoded)
      expect(html).toContain('Sports &amp; Physical Achievements');
      expect(html).toContain('State Football Championship');
      expect(html).toContain('Won the state championship');
    });
  });

  describe('Facilities Section Preservation', () => {
    it('should render facilities when data exists', () => {
      // Arrange: Create viewmodel with facilities
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'facilities',
            isEnabled: true,
            isRequired: false,
            displayOrder: 8
          }
        ],
        facilities: [
          {
            id: '1',
            name: 'Science Laboratory',
            categoryName: 'Academics',
            description: 'State-of-the-art lab',
            displayOrder: 1
          },
          {
            id: '2',
            name: 'Swimming Pool',
            categoryName: 'Sports',
            description: 'Olympic-size pool',
            displayOrder: 2
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Facilities section should be present
      expect(html).toContain('Infrastructure');
      expect(html).toContain('Science Laboratory');
      expect(html).toContain('Swimming Pool');
    });
  });

  describe('Gallery Section Preservation', () => {
    it('should render gallery when data exists', () => {
      // Arrange: Create viewmodel with gallery items
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'gallery',
            isEnabled: true,
            isRequired: false,
            displayOrder: 9
          }
        ],
        mediaLibrary: [
          {
            id: '1',
            url: '/gallery1.jpg',
            caption: 'Annual Day Celebration',
            category: 'campus',
            mediaType: 'image',
            isFeatured: true
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Gallery section should be present
      expect(html).toContain('Gallery');
      expect(html).toContain('Annual Day Celebration');
    });
  });

  describe('Events Section Preservation', () => {
    it('should render upcoming events when data exists', () => {
      // Arrange: Create viewmodel with future events
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      
      const viewModel = createMinimalViewModel({
        homepageSections: [
          {
            sectionKey: 'events',
            isEnabled: true,
            isRequired: false,
            displayOrder: 10
          }
        ],
        events: [
          {
            id: '1',
            title: 'Science Fair',
            description: 'Annual science exhibition',
            eventDate: futureDate.toISOString().split('T')[0],
            startTime: '10:00',
            category: 'Academic',
            isFeatured: true
          }
        ]
      });

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Events section should be present
      expect(html).toContain('Upcoming Events');
      expect(html).toContain('Science Fair');
      expect(html).toContain('Annual science exhibition');
    });
  });

  describe('Property-Based Test: All Non-Broadcast Sections Render Correctly', () => {
    it('should preserve all non-broadcast section rendering for any valid configuration', () => {
      // Property: For ANY valid non-broadcast section configuration,
      // the Modern template MUST render those sections correctly
      
      fc.assert(
        fc.property(
          // Generator: Create arbitrary section configurations
          fc.record({
            hasHero: fc.boolean(),
            hasAcademics: fc.boolean(),
            hasAchievements: fc.boolean(),
            hasPrincipal: fc.boolean(),
            hasStats: fc.boolean(),
            hasFaculty: fc.boolean(),
            hasSports: fc.boolean(),
            hasFacilities: fc.boolean(),
            hasGallery: fc.boolean(),
            hasEvents: fc.boolean()
          }),
          (config) => {
            // Arrange: Build viewmodel based on configuration
            const homepageSections = [];
            const overrides: Partial<TenantViewModel> = {};

            if (config.hasHero) {
              homepageSections.push({
                sectionKey: 'hero',
                isEnabled: true,
                isRequired: false,
                displayOrder: 1
              });
              overrides.heroMedia = [
                {
                  id: '1',
                  title: 'Hero Title',
                  description: 'Hero Description',
                  mediaUrl: '/hero.jpg',
                  mediaType: 'image',
                  isActive: true,
                  displayOrder: 1
                }
              ];
            }

            if (config.hasAcademics) {
              homepageSections.push({
                sectionKey: 'academics',
                isEnabled: true,
                isRequired: false,
                displayOrder: 2
              });
              overrides.academicResults = [
                {
                  year: 2024,
                  passPercentage: 95,
                  distinctions: 40,
                  firstClass: 70,
                  legacyQuote: 'Test Quote'
                }
              ];
            }

            if (config.hasAchievements) {
              homepageSections.push({
                sectionKey: 'achievements',
                isEnabled: true,
                isRequired: false,
                displayOrder: 3
              });
              overrides.achievements = [
                {
                  id: '1',
                  title: 'Test Achievement',
                  description: 'Test Description',
                  achievementType: 'academic',
                  category: 'Test',
                  year: 2024,
                  displayOrder: 1
                }
              ];
            }

            if (config.hasPrincipal) {
              homepageSections.push({
                sectionKey: 'principal',
                isEnabled: true,
                isRequired: false,
                displayOrder: 4
              });
              overrides.personnel = [
                {
                  id: '1',
                  name: 'Test Principal',
                  designation: 'Principal',
                  personType: 'principal',
                  bio: 'Test Bio',
                  photoUrl: '/principal.jpg',
                  displayOrder: 1
                }
              ];
            }

            if (config.hasStats) {
              homepageSections.push({
                sectionKey: 'stats',
                isEnabled: true,
                isRequired: false,
                displayOrder: 5
              });
              overrides.statistics = [
                {
                  label: 'Test Stat',
                  value: '100',
                  icon: 'users',
                  displayOrder: 1
                }
              ];
            }

            if (config.hasFaculty) {
              homepageSections.push({
                sectionKey: 'faculty',
                isEnabled: true,
                isRequired: false,
                displayOrder: 6
              });
              if (!overrides.personnel) overrides.personnel = [];
              overrides.personnel.push({
                id: '2',
                name: 'Test Faculty',
                designation: 'Teacher',
                personType: 'faculty',
                bio: 'Test Bio',
                photoUrl: '/faculty.jpg',
                displayOrder: 1
              });
            }

            if (config.hasSports) {
              homepageSections.push({
                sectionKey: 'sports',
                isEnabled: true,
                isRequired: false,
                displayOrder: 7
              });
              if (!overrides.achievements) overrides.achievements = [];
              overrides.achievements.push({
                id: '2',
                title: 'Test Sports Achievement',
                description: 'Test Description',
                achievementType: 'sports',
                category: 'Sports',
                year: 2024,
                displayOrder: 1
              });
            }

            if (config.hasFacilities) {
              homepageSections.push({
                sectionKey: 'facilities',
                isEnabled: true,
                isRequired: false,
                displayOrder: 8
              });
              overrides.facilities = [
                {
                  id: '1',
                  name: 'Test Facility',
                  categoryName: 'Test Category',
                  description: 'Test Description',
                  displayOrder: 1
                }
              ];
            }

            if (config.hasGallery) {
              homepageSections.push({
                sectionKey: 'gallery',
                isEnabled: true,
                isRequired: false,
                displayOrder: 9
              });
              overrides.mediaLibrary = [
                {
                  id: '1',
                  url: '/test.jpg',
                  caption: 'Test Caption',
                  category: 'campus',
                  mediaType: 'image',
                  isFeatured: true
                }
              ];
            }

            if (config.hasEvents) {
              homepageSections.push({
                sectionKey: 'events',
                isEnabled: true,
                isRequired: false,
                displayOrder: 10
              });
              const futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + 30);
              overrides.events = [
                {
                  id: '1',
                  title: 'Test Event',
                  description: 'Test Description',
                  eventDate: futureDate.toISOString().split('T')[0],
                  startTime: '10:00',
                  category: 'Test',
                  isFeatured: true
                }
              ];
            }

            overrides.homepageSections = homepageSections;
            const viewModel = createMinimalViewModel(overrides);

            // Act: Render the Modern template home page
            const html = renderToString(<Home data={viewModel} />);

            // Assert: Each enabled section should render correctly (HTML entities encoded)
            if (config.hasHero) {
              expect(html).toContain('/hero.jpg');
            }
            if (config.hasAcademics) {
              expect(html).toContain('Honors &amp; Academic Results');
            }
            if (config.hasAchievements) {
              expect(html).toContain('Test Achievement');
            }
            if (config.hasPrincipal) {
              expect(html).toContain('Test Principal');
            }
            if (config.hasStats) {
              expect(html).toContain('Test Stat');
            }
            if (config.hasFaculty) {
              expect(html).toContain('Test Faculty');
            }
            if (config.hasSports) {
              expect(html).toContain('Test Sports Achievement');
            }
            if (config.hasFacilities) {
              expect(html).toContain('Test Facility');
            }
            if (config.hasGallery) {
              expect(html).toContain('Test Caption');
            }
            if (config.hasEvents) {
              expect(html).toContain('Test Event');
            }

            // Assert: Page should always render without errors
            expect(html).toBeTruthy();
            expect(html.length).toBeGreaterThan(0);
          }
        ),
        { numRuns: 50 } // Run 50 random test cases to cover many combinations
      );
    });
  });

  describe('Broadcast Section Preservation in Other Templates', () => {
    it('should verify Premium template broadcast continues to work (placeholder)', () => {
      // Note: This test is a placeholder to document that Premium template
      // broadcast functionality (Header component) must be tested separately
      // in the Premium template test suite
      expect(true).toBe(true);
    });

    it('should verify Classic template broadcast continues to work (placeholder)', () => {
      // Note: This test is a placeholder to document that Classic template
      // broadcast functionality (BroadcastTicker component) must be tested separately
      // in the Classic template test suite
      expect(true).toBe(true);
    });
  });
});
