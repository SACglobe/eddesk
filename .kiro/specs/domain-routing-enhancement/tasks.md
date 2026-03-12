# Implementation Plan: Domain Routing Enhancement

## Overview

This plan implements enhanced domain routing logic in the EdDesk Next.js proxy. The implementation replaces exact domain matching with substring-based owner domain detection, adds proper error handling, and clarifies template slug parameter passing for demo vs tenant routes. The plan includes comprehensive property-based testing using fast-check and unit testing with Jest.

## Tasks

- [ ] 1. Create helper functions for domain classification and lookup
  - [x] 1.1 Create isOwnerDomain() helper function
    - Implement in src/lib/proxy/domain-classifier.ts
    - Use case-insensitive contains check for "localhost" and "eddesk"
    - Export function with TypeScript type signature
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 1.2 Write property test for isOwnerDomain()
    - **Property 1: Owner Domain Classification**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
    - Use fast-check with 100+ iterations
    - Test that function returns true iff hostname contains "localhost" or "eddesk"
  
  - [x] 1.3 Create findDomainConfig() helper function
    - Implement in src/lib/proxy/domain-lookup.ts
    - Normalize hostname (lowercase, remove www prefix)
    - Search domain_data array for exact match
    - Return DomainConfig interface or null
    - _Requirements: 3.1, 7.1, 7.2, 7.4_
  
  - [x] 1.4 Write property test for www prefix normalization
    - **Property 13: WWW Prefix Normalization**
    - **Validates: Requirements 7.4**
    - Test that domains with/without www prefix match same config

- [ ] 2. Refactor proxy.ts routing logic
  - [x] 2.1 Import helper functions and update domain classification
    - Import isOwnerDomain() and findDomainConfig()
    - Replace config.type checks with isOwnerDomain() calls
    - Remove hardcoded domain checks (localhost:3000, eddesk.in)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 2.2 Implement static/API bypass logic
    - Keep existing bypass for /_next, /api, and files with extensions
    - Ensure no changes to this logic
    - _Requirements: N/A (existing functionality)_
  
  - [x] 2.3 Implement demo route access control
    - Check if path starts with /demo
    - Allow access only if isOwnerDomain() returns true
    - Return 404 for tenant domains attempting demo access
    - Log blocked attempts with console.warn
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [-] 2.4 Write property tests for demo route access control
    - **Property 3: Owner Domain Demo Route Access**
    - **Validates: Requirements 2.2, 6.2**
    - **Property 10: Tenant Demo Access Blocked**
    - **Validates: Requirements 6.1**
    - Test that owner domains can access /demo routes
    - Test that tenant domains receive 404 for /demo routes

- [ ] 3. Implement owner domain routing
  - [ ] 3.1 Add owner domain marketing page routing
    - For owner domains with non-demo paths, call NextResponse.next()
    - Remove dependency on config.type for this decision
    - _Requirements: 2.1_
  
  - [ ] 3.2 Write property test for owner domain marketing route
    - **Property 2: Owner Domain Marketing Route**
    - **Validates: Requirements 2.1**
    - Test that non-demo paths on owner domains pass through

- [ ] 4. Implement tenant domain routing and error handling
  - [ ] 4.1 Add tenant domain lookup and rewrite logic
    - Call findDomainConfig() for non-owner domains
    - If config found, rewrite to /tenant/[...path]
    - Pass template_id from config (not template_slug)
    - _Requirements: 3.1, 3.2, 7.2, 7.3_
  
  - [ ] 4.2 Implement unknown domain error handling
    - Return 500 status with "Domain not configured" message
    - Log unknown domain with console.error
    - _Requirements: 3.3_
  
  - [ ] 4.3 Write property tests for tenant domain routing
    - **Property 4: Tenant Domain Lookup**
    - **Validates: Requirements 3.1**
    - **Property 5: Tenant Domain Rewrite**
    - **Validates: Requirements 3.2, 7.3**
    - **Property 6: Unknown Domain Error**
    - **Validates: Requirements 3.3**
    - Test that tenant domains trigger lookup
    - Test that found domains rewrite correctly
    - Test that unknown domains return error

- [ ] 5. Implement template slug parameter handling
  - [ ] 5.1 Add demo template slug extraction
    - Extract template slug from /demo/[template_slug] path pattern
    - Return 400 error if demo path has no template slug
    - Log missing template slug errors
    - _Requirements: 4.1, 4.2_
  
  - [ ] 5.2 Ensure tenant routes pass null for template_slug
    - Verify tenant rewrites do not include template_slug parameter
    - Template_id from config should be used instead
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ] 5.3 Write property tests for template slug handling
    - **Property 7: Demo Template Slug Extraction**
    - **Validates: Requirements 4.1, 4.2**
    - **Property 8: Tenant Template Slug Null**
    - **Validates: Requirements 5.1**
    - **Property 9: Demo vs Tenant Classification**
    - **Validates: Requirements 5.2, 5.3**
    - Test that demo routes extract template slug
    - Test that tenant routes don't pass template_slug

- [ ] 6. Checkpoint - Ensure all tests pass
  - Run all property-based tests and unit tests
  - Verify no TypeScript errors or linting issues
  - Ensure all tests pass, ask the user if questions arise

- [ ] 7. Write unit tests for specific scenarios
  - [ ] 7.1 Write unit tests for owner domain examples
    - Test localhost:3000 routes to marketing page
    - Test localhost:3001 routes correctly
    - Test eddesk.in routes to marketing page
    - Test www.eddesk.in routes to marketing page
    - _Requirements: 1.1, 1.2, 2.1_
  
  - [ ] 7.2 Write unit tests for tenant domain examples
    - Test crescentthoothukudi.in rewrites to /tenant
    - Test unknown-school.com returns 500 error
    - Test www prefix normalization works
    - _Requirements: 3.1, 3.2, 3.3, 7.4_
  
  - [ ] 7.3 Write unit tests for demo route access control
    - Test owner domain can access /demo/template_classic
    - Test tenant domain receives 404 for /demo routes
    - Test demo route without template slug returns 400
    - _Requirements: 4.2, 6.1, 6.2_
  
  - [ ] 7.4 Write unit tests for static resource bypass
    - Test /_next/static/chunk.js bypasses routing
    - Test /api/endpoint bypasses routing
    - Test /favicon.ico bypasses routing
    - _Requirements: N/A (existing functionality)_
  
  - [ ] 7.5 Write unit tests for edge cases
    - Test empty hostname handling
    - Test malformed URL handling
    - Test case sensitivity (LOCALHOST, EdDesk, etc.)
    - Test special characters in hostname
    - _Requirements: 1.4_

- [ ] 8. Add property-based tests for remaining properties
  - [ ] 8.1 Write property test for domain field matching
    - **Property 12: Domain Field Matching**
    - **Validates: Requirements 7.2**
    - Test that lookup matches against "domain" field in school array
  
  - [ ] 8.2 Write property test for demo access logging
    - **Property 11: Demo Access Logging**
    - **Validates: Requirements 6.3**
    - Test that blocked demo attempts create log entries

- [ ] 9. Verify test coverage and add missing tests
  - [ ] 9.1 Run test coverage report
    - Execute Jest with --coverage flag
    - Verify line coverage >= 90% for proxy.ts
    - Verify branch coverage >= 85% for routing logic
  
  - [ ] 9.2 Add tests for uncovered branches
    - Identify uncovered code paths from coverage report
    - Write additional unit tests for uncovered branches
    - Re-run coverage to verify targets met

- [ ] 10. Final checkpoint and manual testing verification
  - Run complete test suite (property tests + unit tests)
  - Verify all 13 properties have corresponding tests
  - Manually test key scenarios from manual testing checklist
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use fast-check with 100+ iterations per property
- Unit tests use Jest with Next.js testing utilities
- All 13 correctness properties from design must have property tests
- Target coverage: 90% line coverage, 85% branch coverage
- Helper functions should be created in src/lib/proxy/ directory
- Main implementation modifies src/proxy.ts
