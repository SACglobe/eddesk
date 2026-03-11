# Broadcast Display Fix - Bugfix Design

## Overview

The broadcast section is not displaying in any of the three templates (Premium, Modern, Classic) despite valid broadcast data being present in the Supabase response with `isactive: true` and `expiresat: null`. The root cause is that the broadcast sections are missing from the home page components in all three templates. While the templates correctly filter and prepare `activeAnnouncements` data, they fail to render this data in the expected positions on the home pages.

The fix requires adding broadcast display sections to each template's home page component at the correct positions:
- Premium template: Above the hero section (in the Header component - already implemented correctly)
- Modern template: Below the hero section (missing from page.tsx)
- Classic template: Above the hero section (in the BroadcastTicker component - already implemented correctly)

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug - when valid broadcast data exists with `isactive: true` and `expiresat: null` (or future date), but the broadcast section does not render on the home page
- **Property (P)**: The desired behavior - broadcast sections should display at the correct positions in each template when valid broadcast data exists
- **Preservation**: Existing template rendering behavior for all other sections must remain unchanged
- **activeAnnouncements**: The filtered array of broadcast/announcement objects that meet the display criteria (`isActive: true` and not expired)
- **announcementsEnabled**: Boolean flag from `homepageSections` configuration that determines if the announcements section should be displayed
- **announcementsRequired**: Boolean flag that determines if the section is mandatory (triggers console error if no data)
- **BroadcastBar**: Component in Premium template that renders the scrolling announcement ticker
- **BroadcastTicker**: Component in Classic template that renders the scrolling announcement ticker

## Bug Details

### Bug Condition

The bug manifests when broadcast data exists with `isactive: true` and `expiresat: null` (or a future date) in the Supabase response, but the broadcast section does not display on the Modern template's home page. The root cause is likely one of the following:
1. The `activeAnnouncements` array is empty due to filtering issues (e.g., empty string handling for `expiresAt`)
2. The broadcast section is rendered but hidden due to z-index or positioning conflicts
3. The conditional rendering logic is evaluating to false even when data exists

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type { template: string, data: TenantViewModel }
  OUTPUT: boolean
  
  RETURN input.template === 'template_modern'
         AND hasValidBroadcastData(input.data)
         AND announcementsEnabled(input.data)
         AND NOT broadcastSectionVisible(input.template)
         
WHERE:
  hasValidBroadcastData(data) = 
    EXISTS announcement IN data.announcements WHERE
      announcement.isActive === true AND
      (announcement.expiresAt === null OR 
       announcement.expiresAt === '' OR
       new Date(announcement.expiresAt) > now)
       
  announcementsEnabled(data) =
    (data.homepageSections.find(s => s.sectionKey === 'announcements')?.isEnabled ?? true)
    
  broadcastSectionVisible(template) =
    broadcastSection EXISTS in DOM AND
    broadcastSection is VISIBLE (not hidden by CSS/z-index)
END FUNCTION
```

### Examples


- **Modern Template**: When broadcast data exists with `isactive: true` and `expiresat: null`, the home page should display a broadcast ticker section below the hero slider, but currently displays nothing
- **Modern Template**: When broadcast data exists with `isactive: true` and `expiresat: '2025-12-31'` (future date), the home page should display the broadcast ticker, but currently displays nothing
- **Premium Template**: Broadcast section correctly displays in the Header component above the hero section (no bug)
- **Classic Template**: BroadcastTicker component correctly displays above the hero section (no bug)

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Premium template broadcast display in the Header component must continue to work exactly as before
- Classic template BroadcastTicker component must continue to work exactly as before
- All other sections (hero, academic results, achievements, principal, statistics, faculty, sports, facilities, gallery, events) must continue to display correctly in all templates
- The data filtering logic for `activeAnnouncements` must remain unchanged
- The `announcementsEnabled` and `announcementsRequired` configuration logic must remain unchanged
- Template routing and navigation behavior must remain unchanged

**Scope:**
All inputs that do NOT involve the Modern template's home page broadcast section should be completely unaffected by this fix. This includes:
- Premium template broadcast display (already working)
- Classic template broadcast display (already working)
- All other template sections and pages
- Data fetching and filtering logic

## Hypothesized Root Cause

Based on the bug description and code analysis, the root cause analysis reveals:

1. **Broadcast Section IS Implemented**: The `src/templates/template_modern/app/page.tsx` file correctly prepares the `activeAnnouncements` data (lines 82-91) AND includes the broadcast ticker section rendering code (lines 242-268). The implementation appears complete.

2. **Correct Implementation in Other Templates**: 
   - Premium template correctly passes `activeAnnouncements` to the Header component, which renders the BroadcastBar
   - Classic template correctly passes `activeAnnouncements` to the BroadcastTicker component in the main layout

3. **Data Mapping is Correct**: The viewmodel correctly maps database columns (`isactive`, `expiresat`) to camelCase properties (`isActive`, `expiresAt`) in the announcements array.

4. **CSS Animation is Defined**: The `animate-marquee` animation is correctly defined in `src/templates/template_modern/app/globals.css` with proper keyframes.

**Most Likely Root Causes**:

1. **Empty Data Array**: The `activeAnnouncements` array may be empty due to:
   - Incorrect filtering logic (checking wrong property names)
   - Data not being passed correctly from the parent component
   - The `announcementsEnabled` flag being false

2. **Conditional Rendering Issue**: The condition `announcementsEnabled && (announcementsRequired || activeAnnouncements.length > 0)` may be evaluating to false even when data exists

3. **Sticky Positioning Conflict**: The `sticky top-20` positioning may be causing the broadcast section to be hidden behind the navbar (which is fixed at `top-0`)

4. **Z-Index Layering Issue**: The navbar may have a higher z-index than the broadcast section's `z-40`, causing it to be covered

5. **Data Property Name Mismatch**: The templates may be checking `a.isActive` but the actual data property might be `a.isactive` (lowercase) if the viewmodel mapping is not being applied correctly


## Correctness Properties

Property 1: Bug Condition - Broadcast Display for Valid Data

_For any_ template where valid broadcast data exists (isActive: true and expiresAt is null or future date) and the announcements section is enabled, the fixed home page SHALL display the broadcast section at the correct position with all active broadcast messages scrolling in a ticker format.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

Property 2: Preservation - Non-Broadcast Section Behavior

_For any_ template section that is NOT the broadcast section (hero, academic results, achievements, principal, statistics, faculty, sports, facilities, gallery, events), the fixed code SHALL produce exactly the same rendering behavior as the original code, preserving all existing functionality for non-broadcast sections.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

## Fix Implementation

### Changes Required

Based on the root cause analysis, the fix requires systematic debugging to identify why the broadcast section is not displaying:

**File**: `src/templates/template_modern/app/page.tsx`

**Function**: `Home` component (lines 68-697)

**Debugging Steps**:

1. **Verify Data Flow**: Add console.log statements to verify:
   ```typescript
   console.log('[Modern Template] announcementsEnabled:', announcementsEnabled);
   console.log('[Modern Template] announcementsRequired:', announcementsRequired);
   console.log('[Modern Template] activeAnnouncements:', activeAnnouncements);
   console.log('[Modern Template] activeAnnouncements.length:', activeAnnouncements.length);
   ```

2. **Check Conditional Rendering**: Verify the condition evaluates to true:
   ```typescript
   const shouldShowBroadcast = announcementsEnabled && (announcementsRequired || activeAnnouncements.length > 0);
   console.log('[Modern Template] shouldShowBroadcast:', shouldShowBroadcast);
   ```

3. **Verify Data Property Names**: Check if the data has the correct property names:
   ```typescript
   if (activeAnnouncements.length > 0) {
     console.log('[Modern Template] First announcement:', activeAnnouncements[0]);
     console.log('[Modern Template] Has isActive?', 'isActive' in activeAnnouncements[0]);
     console.log('[Modern Template] Has expiresAt?', 'expiresAt' in activeAnnouncements[0]);
   }
   ```

4. **Check Sticky Positioning**: The broadcast section uses `sticky top-20` which requires:
   - A scrollable parent container
   - Sufficient content below to trigger stickiness
   - No `overflow: hidden` on parent containers
   
   **Potential Fix**: Change from `sticky top-20` to `relative` or `fixed top-20` to ensure visibility

5. **Verify Z-Index Hierarchy**: 
   - Navbar: `z-[60]` (from Navigation component)
   - Broadcast: `z-40` (current)
   - **Issue**: Broadcast z-index is LOWER than navbar, so it may be hidden behind it
   - **Fix**: Change broadcast z-index to `z-50` (between navbar and other content)

6. **Check for Empty Array Edge Case**: The filtering logic may be too strict:
   ```typescript
   const activeAnnouncements = (data?.announcements ?? []).filter(a =>
     a.isActive &&
     (a.expiresAt == null || new Date(a.expiresAt) > now)
   );
   ```
   **Potential Issue**: If `a.expiresAt` is an empty string `""` instead of `null`, the condition fails
   **Fix**: Update condition to handle empty strings:
   ```typescript
   const activeAnnouncements = (data?.announcements ?? []).filter(a =>
     a.isActive &&
     (!a.expiresAt || a.expiresAt === '' || new Date(a.expiresAt) > now)
   );
   ```

**Most Likely Fix**:

Based on the analysis, the most likely issues are:

1. **Z-Index Issue**: Change `z-40` to `z-50` in the broadcast section
2. **Sticky Positioning Issue**: Change `sticky top-20` to `relative` or remove sticky positioning
3. **Empty String Handling**: Update the `expiresAt` filter to handle empty strings

**Specific Code Changes**:

**File**: `src/templates/template_modern/app/page.tsx`

**Line 86-90**: Update the filtering logic:
```typescript
const activeAnnouncements = (data?.announcements ?? []).filter(a =>
    a.isActive &&
    (!a.expiresAt || a.expiresAt === '' || new Date(a.expiresAt) > now)
);
```

**Line 243**: Update the section styling:
```typescript
<section className="relative z-50 flex items-center h-12 overflow-hidden bg-accent shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-y border-yellow-500/20">
```
(Changed from `sticky top-20 z-40` to `relative z-50`)


## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write tests that load each template with valid broadcast data and verify that the broadcast section is rendered in the DOM at the expected position. Run these tests on the UNFIXED code to observe failures and understand the root cause.

**Test Cases**:
1. **Modern Template Broadcast Rendering Test**: Load Modern template home page with broadcast data (`isactive: true`, `expiresat: null`), verify broadcast section exists in DOM below hero (will fail on unfixed code)
2. **Modern Template Broadcast Animation Test**: Load Modern template with broadcast data, verify the marquee animation is running (may fail on unfixed code)
3. **Modern Template Multiple Broadcasts Test**: Load Modern template with 3 broadcast messages, verify all messages are displayed in the ticker (will fail on unfixed code)
4. **Premium Template Broadcast Test**: Load Premium template with broadcast data, verify broadcast displays in Header (should pass - no bug)
5. **Classic Template Broadcast Test**: Load Classic template with broadcast data, verify BroadcastTicker displays (should pass - no bug)

**Expected Counterexamples**:
- Modern template: Broadcast section is either missing from DOM, not visible, or not animating
- Possible causes: missing CSS classes, missing animation keyframes, incorrect z-index, incorrect conditional rendering

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL template IN ['template_modern', 'template_premium', 'template_classic'] DO
  FOR ALL broadcastData WHERE isValidBroadcast(broadcastData) DO
    result := renderHomePage(template, broadcastData)
    ASSERT broadcastSectionExists(result, template)
    ASSERT broadcastSectionVisible(result, template)
    ASSERT broadcastMessagesDisplayed(result, broadcastData)
  END FOR
END FOR
```

**Test Cases**:
1. **Modern Template with Null Expiry**: Broadcast data with `expiresat: null` displays correctly
2. **Modern Template with Future Expiry**: Broadcast data with `expiresat: '2025-12-31'` displays correctly
3. **Modern Template with Multiple Messages**: 3+ broadcast messages all display in scrolling ticker
4. **Modern Template Animation**: Marquee animation runs continuously
5. **Modern Template Positioning**: Broadcast section appears below hero slider with correct z-index

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL template IN ['template_modern', 'template_premium', 'template_classic'] DO
  FOR ALL section IN ['hero', 'academics', 'achievements', 'principal', 'stats', 'faculty', 'sports', 'facilities', 'gallery', 'events'] DO
    ASSERT renderSection_original(template, section) = renderSection_fixed(template, section)
  END FOR
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for all non-broadcast sections, then write property-based tests capturing that behavior.

**Test Cases**:
1. **Hero Section Preservation**: Verify hero slider continues to work correctly in all templates after fix
2. **Academic Results Preservation**: Verify academic results section displays correctly after fix
3. **Principal Section Preservation**: Verify principal message section displays correctly after fix
4. **Statistics Preservation**: Verify statistics counter section displays correctly after fix
5. **Faculty Section Preservation**: Verify faculty highlights section displays correctly after fix
6. **Events Section Preservation**: Verify upcoming events section displays correctly after fix
7. **Premium Template Broadcast Preservation**: Verify Premium template broadcast continues to work exactly as before
8. **Classic Template Broadcast Preservation**: Verify Classic template broadcast continues to work exactly as before

### Unit Tests

- Test broadcast section rendering with valid data (isActive: true, expiresAt: null)
- Test broadcast section rendering with future expiry date
- Test broadcast section NOT rendering with past expiry date
- Test broadcast section NOT rendering with isActive: false
- Test broadcast section NOT rendering when announcementsEnabled: false
- Test marquee animation initialization
- Test multiple broadcast messages display correctly

### Property-Based Tests

- Generate random broadcast data configurations and verify correct rendering behavior
- Generate random template configurations and verify preservation of non-broadcast sections
- Test that all valid broadcast data (isActive: true, non-expired) always displays
- Test that all invalid broadcast data (isActive: false or expired) never displays

### Integration Tests

- Test full Modern template home page load with broadcast data
- Test switching between templates and verifying broadcast displays correctly
- Test broadcast section with different screen sizes (responsive behavior)
- Test broadcast animation performance with many messages
- Test that broadcast section does not interfere with other sections' layout
