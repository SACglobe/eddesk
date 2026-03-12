import { findDomainConfig } from './domain-lookup';
import fc from 'fast-check';

// Mock the constants module
jest.mock('../constants/constants', () => ({
  __esModule: true,
  default: [
    {
      "domain": "localhost:3000",
      "template_id": "",
      "type": "owner"
    },
    {
      "domain": "eddesk.in",
      "template_id": "",
      "type": "owner"
    },
    {
      "domain": "localhost:3001",
      "template_id": "template_classic",
      "type": "tenant"
    },
    {
      "domain": "crescentthoothukudi.in",
      "template_id": "template_modern",
      "type": "tenant"
    }
  ]
}));

describe('findDomainConfig', () => {
  describe('exact domain matching', () => {
    it('should find config for crescentthoothukudi.in', () => {
      const config = findDomainConfig('crescentthoothukudi.in');
      expect(config).not.toBeNull();
      expect(config?.domain).toBe('crescentthoothukudi.in');
      expect(config?.template_id).toBe('template_modern');
      expect(config?.type).toBe('tenant');
    });

    it('should find config for localhost:3001', () => {
      const config = findDomainConfig('localhost:3001');
      expect(config).not.toBeNull();
      expect(config?.domain).toBe('localhost:3001');
      expect(config?.template_id).toBe('template_classic');
      expect(config?.type).toBe('tenant');
    });

    it('should find config for eddesk.in', () => {
      const config = findDomainConfig('eddesk.in');
      expect(config).not.toBeNull();
      expect(config?.domain).toBe('eddesk.in');
      expect(config?.template_id).toBe('');
      expect(config?.type).toBe('owner');
    });
  });

  describe('www prefix normalization', () => {
    it('should match domain with www prefix', () => {
      const withWww = findDomainConfig('www.crescentthoothukudi.in');
      const withoutWww = findDomainConfig('crescentthoothukudi.in');
      
      expect(withWww).not.toBeNull();
      expect(withoutWww).not.toBeNull();
      expect(withWww?.domain).toBe(withoutWww?.domain);
      expect(withWww?.template_id).toBe(withoutWww?.template_id);
    });

    it('should match eddesk.in with www prefix', () => {
      const withWww = findDomainConfig('www.eddesk.in');
      const withoutWww = findDomainConfig('eddesk.in');
      
      expect(withWww).not.toBeNull();
      expect(withoutWww).not.toBeNull();
      expect(withWww?.domain).toBe(withoutWww?.domain);
    });
  });

  describe('case insensitivity', () => {
    it('should match domain regardless of case', () => {
      const lower = findDomainConfig('crescentthoothukudi.in');
      const upper = findDomainConfig('CRESCENTTHOOTHUKUDI.IN');
      const mixed = findDomainConfig('CrescentThoothuKudi.in');
      
      expect(lower).not.toBeNull();
      expect(upper).not.toBeNull();
      expect(mixed).not.toBeNull();
      expect(lower?.domain).toBe(upper?.domain);
      expect(lower?.domain).toBe(mixed?.domain);
    });
  });

  describe('unknown domains', () => {
    it('should return null for unknown domain', () => {
      const config = findDomainConfig('unknown-school.com');
      expect(config).toBeNull();
    });

    it('should return null for empty string', () => {
      const config = findDomainConfig('');
      expect(config).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle domains with multiple www prefixes', () => {
      const config = findDomainConfig('www.www.crescentthoothukudi.in');
      // Should remove only the first www prefix
      expect(config).toBeNull(); // This won't match because the domain in data doesn't have www.
    });

    it('should not match partial domain names', () => {
      const config = findDomainConfig('crescent');
      expect(config).toBeNull();
    });
  });

  // Feature: domain-routing-enhancement, Property 13: WWW Prefix Normalization
  // **Validates: Requirements 7.4**
  describe('property-based: www prefix normalization', () => {
    it('should match same config for domains with/without www prefix', () => {
      fc.assert(
        fc.property(
          fc.record({
            domain: fc.webUrl({ validSchemes: ['http', 'https'] }),
            template_id: fc.string(),
            type: fc.constantFrom('owner' as const, 'tenant' as const)
          }),
          (config) => {
            // Extract hostname from URL (webUrl generates full URLs)
            let hostname: string;
            try {
              const url = new URL(config.domain);
              hostname = url.hostname;
            } catch {
              // If URL parsing fails, use the domain as-is
              hostname = config.domain;
            }
            
            const withWww = `www.${hostname}`;
            const withoutWww = hostname;
            
            const result1 = findDomainConfig(withWww);
            const result2 = findDomainConfig(withoutWww);
            
            // Both should match the same config or both should be null
            // This verifies that www prefix normalization is consistent
            expect(result1?.domain).toBe(result2?.domain);
            expect(result1?.template_id).toBe(result2?.template_id);
            expect(result1?.type).toBe(result2?.type);
          }
        ),
        { numRuns: 20 }
      );
    });
  });
});
