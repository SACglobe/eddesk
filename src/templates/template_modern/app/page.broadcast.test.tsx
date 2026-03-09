/**
 * Bug Condition Exploration Test - Broadcast Display Fix
 * Feature: broadcast-display-fix
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists
 * DO NOT attempt to fix the test or the code when it fails
 * 
 * Property 1: Bug Condition - Broadcast Display for Valid Data
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
 * 
 * GOAL: Surface counterexamples that demonstrate the bug exists
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import fc from 'fast-check';
import Home from './page';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

// Helper to create minimal valid TenantViewModel with broadcast data
function createMinimalViewModelWithBroadcast(
  broadcasts: Array<{ title: string; message: string; isActive: boolean; expiresAt: string | null }>
): TenantViewModel {
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
      },
      {
        sectionKey: 'announcements',
        isEnabled: true,
        isRequired: false,
        displayOrder: 2
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
    broadcast: broadcasts,
    announcements: broadcasts,
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
    }
  } as TenantViewModel;
}

describe('Property 1: Bug Condition - Broadcast Display for Valid Data', () => {
  describe('Modern Template Broadcast Section Rendering', () => {
    it('should display broadcast section when isActive=true and expiresAt=null', () => {
      // Arrange: Create viewmodel with valid broadcast data
      const viewModel = createMinimalViewModelWithBroadcast([
        {
          title: 'Important Announcement',
          message: 'School will be closed tomorrow',
          isActive: true,
          expiresAt: null
        }
      ]);

      // Act: Render the Modern template home page to HTML string
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Broadcast section should exist in rendered HTML
      expect(html).toContain('Broadcast');
      
      // Assert: Broadcast messages should be displayed
      expect(html).toContain('Important Announcement');
      expect(html).toContain('School will be closed tomorrow');
      
      // Assert: Broadcast section should have the ticker animation class
      expect(html).toContain('animate-marquee');
    });

    it('should display broadcast section when isActive=true and expiresAt is future date', () => {
      // Arrange: Create viewmodel with future expiry date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      
      const viewModel = createMinimalViewModelWithBroadcast([
        {
          title: 'Upcoming Event',
          message: 'Annual day celebration next month',
          isActive: true,
          expiresAt: futureDate.toISOString()
        }
      ]);

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Broadcast section should exist and display the message
      expect(html).toContain('Upcoming Event');
      expect(html).toContain('Annual day celebration next month');
    });

    it('should display multiple broadcast messages in ticker format', () => {
      // Arrange: Create viewmodel with multiple broadcasts
      const viewModel = createMinimalViewModelWithBroadcast([
        {
          title: 'News 1',
          message: 'First announcement',
          isActive: true,
          expiresAt: null
        },
        {
          title: 'News 2',
          message: 'Second announcement',
          isActive: true,
          expiresAt: null
        },
        {
          title: 'News 3',
          message: 'Third announcement',
          isActive: true,
          expiresAt: null
        }
      ]);

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: All broadcast messages should be displayed
      expect(html).toContain('News 1');
      expect(html).toContain('First announcement');
      expect(html).toContain('News 2');
      expect(html).toContain('Second announcement');
      expect(html).toContain('News 3');
      expect(html).toContain('Third announcement');
    });

    it('should verify broadcast section has correct z-index for visibility', () => {
      // Arrange: Create viewmodel with valid broadcast data
      const viewModel = createMinimalViewModelWithBroadcast([
        {
          title: 'Test',
          message: 'Test message',
          isActive: true,
          expiresAt: null
        }
      ]);

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Broadcast section should have z-index class for proper layering
      // The section should be visible and not hidden behind other elements
      expect(html).toContain('z-50');
      expect(html).toContain('Broadcast');
    });

    it('should NOT display broadcast section when isActive=false', () => {
      // Arrange: Create viewmodel with inactive broadcast data
      const viewModel = createMinimalViewModelWithBroadcast([
        {
          title: 'Inactive Announcement',
          message: 'This should not display',
          isActive: false,
          expiresAt: null
        }
      ]);

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Broadcast section should NOT be displayed
      expect(html).not.toContain('Inactive Announcement');
      expect(html).not.toContain('This should not display');
    });

    it('should NOT display broadcast section when expiresAt is past date', () => {
      // Arrange: Create viewmodel with expired broadcast data
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 30);
      
      const viewModel = createMinimalViewModelWithBroadcast([
        {
          title: 'Expired Announcement',
          message: 'This announcement has expired',
          isActive: true,
          expiresAt: pastDate.toISOString()
        }
      ]);

      // Act: Render the Modern template home page
      const html = renderToString(<Home data={viewModel} />);

      // Assert: Broadcast section should NOT be displayed for expired announcements
      expect(html).not.toContain('Expired Announcement');
      expect(html).not.toContain('This announcement has expired');
    });
  });

  describe('Property-Based Test: Broadcast Display for Any Valid Data', () => {
    it('should display broadcast section for any valid broadcast data configuration', () => {
      // Property: For ANY valid broadcast data (isActive=true, non-expired),
      // the Modern template MUST display the broadcast section
      
      fc.assert(
        fc.property(
          // Generator: Create arbitrary valid broadcast data
          fc.array(
            fc.record({
              title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
              message: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
              isActive: fc.constant(true), // Always active for this property
              expiresAt: fc.oneof(
                fc.constant(null), // No expiry
                fc.constant(''), // Empty string (should be treated as no expiry)
                fc.date({ min: new Date(Date.now() + 24 * 60 * 60 * 1000) }).map(d => d.toISOString()) // At least 1 day in future
              )
            }),
            { minLength: 1, maxLength: 5 }
          ),
          (broadcasts) => {
            // Arrange: Create viewmodel with generated broadcast data
            const viewModel = createMinimalViewModelWithBroadcast(broadcasts);

            // Act: Render the Modern template home page
            const html = renderToString(<Home data={viewModel} />);

            // Assert: Broadcast section must exist
            expect(html).toContain('Broadcast');
            
            // Assert: At least one broadcast message should be visible
            // Note: HTML special characters will be escaped (e.g., < becomes &lt;)
            const hasAnyMessage = broadcasts.some(b => {
              // Helper to escape HTML for comparison
              const escapeHtml = (str: string) => 
                str.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;')
                   .replace(/'/g, '&#039;');
              
              const escapedTitle = escapeHtml(b.title);
              const escapedMessage = escapeHtml(b.message);
              
              return html.includes(escapedTitle) || html.includes(escapedMessage);
            });
            expect(hasAnyMessage).toBe(true);
          }
        ),
        { numRuns: 20 } // Run 20 random test cases
      );
    });
  });
});
