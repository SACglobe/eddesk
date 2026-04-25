// src/proxy.demo.test.ts
// Tests for demo route access control in proxy
// Task 2.3: Verify demo route access control implementation

import { NextRequest } from 'next/server';
import { proxy } from './proxy';

// Mock the domain-classifier module
jest.mock('@/lib/proxy/domain-classifier', () => ({
  isOwnerDomain: jest.fn((hostname: string) => {
    return hostname.toLowerCase().includes('localhost') ||
      hostname.toLowerCase().includes('eddesk');
  })
}));

// Helper function to create mock NextRequest
function createMockRequest(host: string, pathname: string): NextRequest {
  const url = `https://${host}${pathname}`;
  const request = new NextRequest(url);

  // Set the host header
  Object.defineProperty(request, 'headers', {
    value: new Map([['host', host]]),
    writable: false
  });

  return request;
}

describe('proxy Demo Route Access Control', () => {
  describe('Owner domain demo access', () => {
    it('should allow owner domain to access demo routes', () => {
      const request = createMockRequest('localhost:3000', '/demo/template_classic');
      const response = proxy(request);

      // Should allow through (NextResponse.next())
      expect(response).toBeDefined();
      expect(response.status).not.toBe(404);
    });

    it('should allow eddesk.in to access demo routes', () => {
      const request = createMockRequest('eddesk.in', '/demo/template_modern');
      const response = proxy(request);

      // Should allow through
      expect(response).toBeDefined();
      expect(response.status).not.toBe(404);
    });
  });

  describe('Tenant domain demo access blocked', () => {
    it('should return 404 for tenant domain attempting demo access', async () => {
      const request = createMockRequest('crescentthoothukudi.in', '/demo/template_classic');
      const response = proxy(request);

      // Should return 404
      expect(response.status).toBe(404);

      // Should return "Not Found" message per design specification (Requirement 6.1)
      const text = await response.text();
      expect(text).toBe('Not Found');
    });

    it('should return 404 for any tenant domain demo route', async () => {
      const request = createMockRequest('crescentthoothukudi.in', '/demo/any-template');
      const response = proxy(request);

      expect(response.status).toBe(404);
      const text = await response.text();
      expect(text).toBe('Not Found');
    });
  });

  describe('Demo route logging', () => {
    let consoleWarnSpy: jest.SpyInstance;
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
      consoleLogSpy.mockRestore();
    });

    it('should log blocked demo access attempts', () => {
      const request = createMockRequest('crescentthoothukudi.in', '/demo/template_classic');
      proxy(request);

      // Should log warning for blocked attempt (Requirement 6.3)
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Non-owner blocked for demo route')
      );
    });

    it('should log allowed demo access for owner domains', () => {
      const request = createMockRequest('localhost:3000', '/demo/template_classic');
      proxy(request);

      // Should log that owner was detected
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Owner detected for demo route')
      );
    });
  });
});

// ============================================================================
// PROPERTY-BASED TESTS
// ============================================================================

import fc from 'fast-check';

describe('Property-Based Tests: Demo Route Access Control', () => {
  // Feature: domain-routing-enhancement, Property 3: Owner Domain Demo Route Access
  // **Validates: Requirements 2.2, 6.2**
  describe('Property 3: Owner Domain Demo Route Access', () => {
    it('should allow any owner domain to access any /demo/* path', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter(s => s.toLowerCase().includes('localhost') || s.toLowerCase().includes('eddesk')),
          fc.string({ minLength: 1 }),
          (hostname, demoPath) => {
            // Construct a valid demo path
            const path = `/demo/${demoPath}`;

            // Create request with owner domain
            const request = createMockRequest(hostname, path);
            const response = proxy(request);

            // Owner domains should be allowed through (not 404)
            expect(response.status).not.toBe(404);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: domain-routing-enhancement, Property 10: Tenant Demo Access Blocked
  // **Validates: Requirements 6.1**
  describe('Property 10: Tenant Demo Access Blocked', () => {
    it('should return 404 for any tenant domain attempting to access any /demo/* path', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }).filter(s => {
            const lower = s.toLowerCase();
            return !lower.includes('localhost') && !lower.includes('eddesk');
          }),
          fc.string({ minLength: 1 }),
          (hostname, demoPath) => {
            // Construct a valid demo path
            const path = `/demo/${demoPath}`;

            // Create request with tenant domain
            const request = createMockRequest(hostname, path);
            const response = proxy(request);

            // Tenant domains should receive 404
            expect(response.status).toBe(404);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
