import { isOwnerDomain } from './domain-classifier';
import fc from 'fast-check';

describe('isOwnerDomain', () => {
  describe('localhost domains', () => {
    it('should identify localhost as owner domain', () => {
      expect(isOwnerDomain('localhost')).toBe(true);
    });

    it('should identify localhost with port as owner domain', () => {
      expect(isOwnerDomain('localhost:3000')).toBe(true);
    });

    it('should be case-insensitive for localhost', () => {
      expect(isOwnerDomain('LOCALHOST')).toBe(true);
      expect(isOwnerDomain('LocalHost:3000')).toBe(true);
    });
  });

  describe('eddesk domains', () => {
    it('should identify eddesk.in as owner domain', () => {
      expect(isOwnerDomain('eddesk.in')).toBe(true);
    });

    it('should identify www.eddesk.in as owner domain', () => {
      expect(isOwnerDomain('www.eddesk.in')).toBe(true);
    });

    it('should be case-insensitive for eddesk', () => {
      expect(isOwnerDomain('EDDESK.in')).toBe(true);
      expect(isOwnerDomain('EdDesk.in')).toBe(true);
    });
  });

  describe('tenant domains', () => {
    it('should identify crescentthoothukudi.in as tenant domain', () => {
      expect(isOwnerDomain('crescentthoothukudi.in')).toBe(false);
    });

    it('should identify other domains as tenant domains', () => {
      expect(isOwnerDomain('example.com')).toBe(false);
      expect(isOwnerDomain('school.edu')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(isOwnerDomain('')).toBe(false);
    });

    it('should handle domains containing localhost/eddesk as substring', () => {
      expect(isOwnerDomain('mylocalhost.com')).toBe(true);
      expect(isOwnerDomain('eddesk-demo.com')).toBe(true);
    });
  });

  // Feature: domain-routing-enhancement, Property 1: Owner Domain Classification
  // **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
  describe('property-based tests', () => {
    it('should correctly classify any hostname as owner or tenant domain', () => {
      fc.assert(
        fc.property(fc.string(), (hostname) => {
          const isOwner = isOwnerDomain(hostname);
          const containsLocalhost = hostname.toLowerCase().includes('localhost');
          const containsEddesk = hostname.toLowerCase().includes('eddesk');
          
          expect(isOwner).toBe(containsLocalhost || containsEddesk);
        }),
        { numRuns: 20 }
      );
    });
  });
});
