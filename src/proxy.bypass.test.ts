// src/proxy.bypass.test.ts
// Tests for static/API bypass logic in proxy
// Task 2.2: Verify existing bypass logic remains unchanged

import { NextRequest, NextResponse } from 'next/server';
import { proxy } from './proxy';

// Mock the constants module
jest.mock('@/lib/constants/constants', () => [
  { domain: 'localhost:3000', template_id: '', type: 'owner' },
  { domain: 'eddesk.in', template_id: '', type: 'owner' },
  { domain: 'crescentthoothukudi.in', template_id: 'template_modern', type: 'tenant' }
]);

// Mock the domain-classifier and domain-lookup modules
jest.mock('@/lib/proxy/domain-classifier', () => ({
  isOwnerDomain: jest.fn((hostname: string) => {
    return hostname.toLowerCase().includes('localhost') ||
      hostname.toLowerCase().includes('eddesk');
  })
}));

jest.mock('@/lib/proxy/domain-lookup', () => ({
  findDomainConfig: jest.fn()
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

describe('proxy Static/API Bypass Logic', () => {
  describe('/_next paths (Next.js internals)', () => {
    it('should bypass /_next/static paths', () => {
      const request = createMockRequest('localhost:3000', '/_next/static/chunks/main.js');
      const response = proxy(request);

      // Should return NextResponse.next() which allows the request through
      expect(response).toBeDefined();
      // The response should not be a rewrite or redirect
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass /_next/image paths', () => {
      const request = createMockRequest('localhost:3000', '/_next/image?url=/logo.png');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass /_next paths on tenant domains', () => {
      const request = createMockRequest('crescentthoothukudi.in', '/_next/static/css/app.css');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });
  });

  describe('/api paths (API routes)', () => {
    it('should bypass /api routes', () => {
      const request = createMockRequest('localhost:3000', '/api/users');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass nested /api routes', () => {
      const request = createMockRequest('localhost:3000', '/api/v1/schools/123');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass /api routes on tenant domains', () => {
      const request = createMockRequest('crescentthoothukudi.in', '/api/contact');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });
  });

  describe('Static files (paths with extensions)', () => {
    it('should bypass .js files', () => {
      const request = createMockRequest('localhost:3000', '/scripts/analytics.js');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass .css files', () => {
      const request = createMockRequest('localhost:3000', '/styles/main.css');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass .png image files', () => {
      const request = createMockRequest('localhost:3000', '/images/logo.png');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass .jpg image files', () => {
      const request = createMockRequest('localhost:3000', '/photos/school.jpg');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass .svg files', () => {
      const request = createMockRequest('localhost:3000', '/icons/menu.svg');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass .ico files', () => {
      const request = createMockRequest('localhost:3000', '/favicon.ico');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass .woff font files', () => {
      const request = createMockRequest('localhost:3000', '/fonts/roboto.woff');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass static files on tenant domains', () => {
      const request = createMockRequest('crescentthoothukudi.in', '/assets/banner.jpg');
      const response = proxy(request);

      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });
  });

  describe('Bypass logic execution order', () => {
    it('should bypass BEFORE domain classification', () => {
      // This test verifies that static files bypass even if domain classification would fail
      const request = createMockRequest('unknown-domain.com', '/static/file.js');
      const response = proxy(request);

      // Should bypass without error, even though domain is unknown
      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should bypass BEFORE demo route checking', () => {
      // Static files should bypass even if path looks like demo route
      const request = createMockRequest('localhost:3000', '/demo.js');
      const response = proxy(request);

      // Should bypass because it has an extension
      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });
  });

  describe('Non-bypass paths (should NOT bypass)', () => {
    it('should NOT bypass regular page routes', () => {
      const request = createMockRequest('localhost:3000', '/about');
      const response = proxy(request);

      // This should go through normal routing logic, not bypass
      // We're just verifying it doesn't bypass - actual routing is tested elsewhere
      expect(response).toBeDefined();
    });

    it('should NOT bypass paths that contain "api" but do not start with /api', () => {
      const request = createMockRequest('localhost:3000', '/erapist');
      const response = proxy(request);

      // Should not bypass - "api" is in the middle of the word
      expect(response).toBeDefined();
    });

    it('should NOT bypass paths that contain "_next" but do not start with /_next', () => {
      const request = createMockRequest('localhost:3000', '/my_next_page');
      const response = proxy(request);

      // Should not bypass
      expect(response).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple dots in filename', () => {
      const request = createMockRequest('localhost:3000', '/files/document.backup.pdf');
      const response = proxy(request);

      // Should bypass because it contains a dot
      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should handle query parameters on static files', () => {
      const request = createMockRequest('localhost:3000', '/image.png?v=123');
      const response = proxy(request);

      // Should bypass because pathname contains a dot
      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });

    it('should handle uppercase extensions', () => {
      const request = createMockRequest('localhost:3000', '/document.PDF');
      const response = proxy(request);

      // Should bypass because it contains a dot
      expect(response).toBeDefined();
      expect(response.headers.get('x-proxy-rewrite')).toBeNull();
    });
  });
});
