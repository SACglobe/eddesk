# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Broadcast Display for Valid Data
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: Scope the property to the Modern template with valid broadcast data (isActive: true, expiresAt: null or future date)
  - Test that when valid broadcast data exists (isActive: true and expiresAt is null/empty/future), the Modern template home page displays the broadcast section at the correct position below the hero slider
  - The test assertions should verify: broadcast section exists in DOM, broadcast section is visible (not hidden by z-index), and broadcast messages are displayed in ticker format
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found to understand root cause (e.g., "broadcast section missing from DOM", "broadcast section hidden behind navbar", "empty activeAnnouncements array")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Broadcast Section Behavior
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-broadcast sections (hero, academic results, achievements, principal, statistics, faculty, sports, facilities, gallery, events)
  - Write property-based tests capturing observed behavior patterns: all non-broadcast sections render correctly in all templates
  - Property-based testing generates many test cases for stronger guarantees
  - Verify Premium template broadcast (Header component) continues to work
  - Verify Classic template broadcast (BroadcastTicker component) continues to work
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 3. Fix broadcast display in Modern template

  - [x] 3.1 Update broadcast section z-index and positioning
    - Change z-index from z-40 to z-50 in the broadcast section (line 243)
    - Change positioning from sticky top-20 to relative
    - This ensures the broadcast section is not hidden behind the navbar (z-60)
    - _Bug_Condition: isBugCondition(input) where input.template === 'template_modern' AND hasValidBroadcastData(input.data) AND NOT broadcastSectionVisible(input.template)_
    - _Expected_Behavior: Broadcast section displays at correct position with proper z-index layering_
    - _Preservation: Premium and Classic template broadcast sections continue to work unchanged_
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 3.2 Update expiresAt filter to handle empty strings
    - Update the activeAnnouncements filter logic (lines 86-90) to handle empty strings for expiresAt
    - Change condition from `(a.expiresAt == null || new Date(a.expiresAt) > now)` to `(!a.expiresAt || a.expiresAt === '' || new Date(a.expiresAt) > now)`
    - This ensures broadcasts with empty string expiresAt values are included in activeAnnouncements
    - _Bug_Condition: isBugCondition(input) where input.data.announcements contains items with expiresAt === ''_
    - _Expected_Behavior: Broadcasts with empty string expiresAt are treated as non-expiring and included in activeAnnouncements_
    - _Preservation: Existing filter logic for null and future dates remains unchanged_
    - _Requirements: 2.1, 2.2_

  - [x] 3.3 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Broadcast Display for Valid Data
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 3.4 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Broadcast Section Behavior
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)
    - Verify Premium template broadcast continues to work
    - Verify Classic template broadcast continues to work
    - Verify all other sections render correctly in all templates

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
