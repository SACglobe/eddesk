# EdDesk — Implement Home Screen Completely (All 3 Templates)
# ─────────────────────────────────────────────────────────────────────────────

## Step 0 — Read These Files First (in this exact order)

1. guardrails/SCREEN-DATA-REFERENCE.md          ← THE source of truth. Read entirely.
2. src/core/viewmodels/tenant.viewmodel.ts       ← current viewmodel to understand/fix
3. src/lib/constants/reference.js               ← column name constants
4. src/components/system/SystemPopup.tsx         ← understand existing variants
5. src/templates/template_modern/app/page.tsx    ← current home screen
6. src/templates/template_classic/screens/HomeScreen.js
7. src/templates/template_premium/app/page.tsx

Do NOT touch any of the above files in Step 0. Only read.

---

## PHASE 1 — Fix the ViewModel (tenant.viewmodel.ts)

The RPC response shape has changed. The viewmodel must be fixed first.
Templates will not work correctly until Phase 1 is complete.

### Fix 1A — schoolachievements (was achievements)

The RPC now returns `data.schoolachievements[]` not `data.achievements[]`.

In `buildTenantViewModel()`:
```typescript
// FIND this line:
const achievementRows = (d.achievements ?? []) as Record<string, unknown>[];

// CHANGE TO:
const achievementRows = (d.schoolachievements ?? []) as Record<string, unknown>[];
```

Add `schoolAchievements` as a NEW field in TenantViewModel interface:
```typescript
schoolAchievements: Array<{
  key: string;
  title: string;
  category: string;      // 'academic' | 'sports'
  year: number;
  awardLevel: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}>;
```

In the return value, add:
```typescript
schoolAchievements: achievementRows.map(r => ({
  key: str(r['key']),
  title: str(r[COL_ACHIEVEMENTS_TITLE]),
  category: str(r[COL_ACHIEVEMENTS_CATEGORY]),
  year: num(r[COL_ACHIEVEMENTS_YEAR]),
  awardLevel: str(r[COL_ACHIEVEMENTS_AWARD_LEVEL]),
  description: str(r[COL_ACHIEVEMENTS_DESCRIPTION]),
  imageUrl: str(r[COL_ACHIEVEMENTS_IMAGE_URL]),
  isFeatured: bool(r[COL_ACHIEVEMENTS_IS_FEATURED]),
  isActive: bool(r['isactive']),
  displayOrder: num(r[COL_ACHIEVEMENTS_DISPLAY_ORDER]),
})),
```

Keep the existing `achievements` field pointing to `schoolAchievements` for backward compat:
```typescript
achievements: achievementRows.map(r => ({
  // existing mapping — keep as-is for backward compat
  // achievementType should map from category field
  achievementType: str(r[COL_ACHIEVEMENTS_CATEGORY]),  // ← fix: was COL_ACHIEVEMENTS_TYPE
  ...
})),
```

### Fix 1B — academicresults is now an array

The RPC returns `data.academicresults` as an ARRAY. The current code treats it as a single object.

Find in `buildTenantViewModel()`:
```typescript
// FIND:
const academicResultRow = (d.academicresults ?? null) as Record<string, unknown> | null;

// CHANGE TO:
const academicResultRows = (Array.isArray(d.academicresults)
  ? d.academicresults
  : d.academicresults ? [d.academicresults] : []
) as Record<string, unknown>[];

// Then take the most recent active one:
const academicResultRow = academicResultRows
  .filter(r => r['isactive'] !== false)
  .sort((a, b) => num(b['year']) - num(a['year']))[0] ?? null;
```

This makes it backward compatible — single object or array both work.

### Fix 1C — contactdetails is now an array

The RPC returns `data.contactdetails` as an ARRAY. Take index [0].

Find in `buildTenantViewModel()`:
```typescript
// FIND:
const contactDetailsRow = (d.contactdetails ?? null) as Record<string, unknown> | null;

// CHANGE TO:
const contactDetailsArr = (Array.isArray(d.contactdetails)
  ? d.contactdetails
  : d.contactdetails ? [d.contactdetails] : []
) as Record<string, unknown>[];
const contactDetailsRow = contactDetailsArr[0] ?? null;
```

### Fix 1D — Add testimonials field

Add to TenantViewModel interface:
```typescript
testimonials: Array<{
  key: string;
  rating: number;
  message: string;
  authorName: string;
  designation: string;
  photoUrl: string;
  isActive: boolean;
  displayOrder: number;
}>;
```

Add to `buildTenantViewModel()` return:
```typescript
const testimonialRows = (d.testimonial ?? []) as Record<string, unknown>[];

testimonials: testimonialRows.map(r => ({
  key: str(r['key']),
  rating: num(r['rating']),
  message: str(r['message']),
  authorName: str(r['authorname']),
  designation: str(r['designation']),
  photoUrl: str(r['photo_url']),
  isActive: bool(r['isactive']),
  displayOrder: num(r['displayorder']),
})),
```

### Fix 1E — Type activities array

Currently `activities: Array<Record<string, unknown>>`. Type it properly.

Add to TenantViewModel interface:
```typescript
activities: Array<{
  key: string;
  title: string;
  tag: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  displayOrder: number;
  highlightTag: string;
  highlightStat: string;
}>;
```

Update the mapping in return:
```typescript
activities: activityRows.map(r => ({
  key: str(r['key']),
  title: str(r['title']),
  tag: str(r['tag']),
  description: str(r['description']),
  imageUrl: str(r['imageurl']),
  isActive: bool(r['isactive']),
  displayOrder: num(r['displayorder']),
  highlightTag: str(r['highlighttag']),
  highlightStat: str(r['highlightstat']),
})),
```

### Fix 1F — Fix templatecomponents deduplication

The current code deduplicates by componentcode — this removes the second `schoolachievements` entry (sports).

Find in `buildTenantViewModel()`:
```typescript
// REMOVE this deduplication entirely:
const seenCodes = new Set<string>();
const dedupedComponents = componentRows.filter(r => {
  const code = str(r[COL_TEMPLATE_COMPONENTS_CODE]);
  if (seenCodes.has(code)) return false;
  seenCodes.add(code);
  return true;
});

// REPLACE WITH — no deduplication, keep all:
const dedupedComponents = componentRows;
```

Also update the mapped components type to include config.filters:
```typescript
components: Array<{
  componentCode: string;
  isActive: boolean;
  isRequired: boolean;
  displayOrder: number;
  config: {
    filters?: { type?: string; designation?: string; contenttype?: string } | null;
    datasource?: string;
    variant?: string | null;
    itemcount?: number | null;
  } | null;
}>;
```

Update the mapping:
```typescript
const mappedComponents = dedupedComponents.map(r => ({
  componentCode: str(r[COL_TEMPLATE_COMPONENTS_CODE]),
  isActive: bool(r[COL_TEMPLATE_COMPONENTS_IS_ACTIVE]),
  isRequired: bool(r[COL_TEMPLATE_COMPONENTS_REQUIRED]),
  displayOrder: num(r[COL_TEMPLATE_COMPONENTS_ORDER]),
  config: (r['config'] as any) ?? null,
}));
```

### Fix 1G — Add infrastructure typed fields

Currently `infrastructure: Array<Record<string, unknown>>`. Type it properly.

Add to TenantViewModel interface:
```typescript
infrastructure: Array<{
  key: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  imageUrl: string;
  isActive: boolean;
  displayOrder: number;
  highlightTitle: string;
  highlightDescription: string;
}>;
```

Update return mapping:
```typescript
infrastructure: infraRows.map(r => ({
  key: str(r['key']),
  title: str(r['title']),
  description: str(r['description']),
  tag: str(r['tag']),
  icon: str(r['icon']),
  imageUrl: str(r['imageurl']),
  isActive: bool(r['isactive']),
  displayOrder: num(r['displayorder']),
  highlightTitle: str(r['highlighttitle']),
  highlightDescription: str(r['highlightdescription']),
})),
```

### Phase 1 Validation
After all fixes:
  [ ] `schoolAchievements` field exists in TenantViewModel
  [ ] `achievements` field still exists (backward compat alias)
  [ ] `academicResults` handles both array and single object from RPC
  [ ] `contactDetails` handles array input
  [ ] `testimonials` field added
  [ ] `activities` is typed (not Record<string,unknown>[])
  [ ] `infrastructure` is typed (not Record<string,unknown>[])
  [ ] `components[].config` includes filters object
  [ ] No deduplication of templatecomponents

---

## PHASE 2 — Add SystemPopup variant="content_missing"

Edit `src/components/system/SystemPopup.tsx`:

### Add new variant type
```typescript
export type PopupVariant = 'empty' | 'error' | 'network_error' | 'inactive' | 'expired' | 'content_missing';
```

### Add new props
```typescript
interface SystemPopupProps {
  variant: PopupVariant;
  errorMessage?: string;
  missingSection?: string;   // ← NEW: section name e.g. "hero", "faculty"
  onRetry?: () => void;
  onDismiss?: () => void;
}
```

### Add to ACCENT_MAP
```typescript
content_missing: { h: '234,179,8', hex: '#eab308', dark: '#ca8a04', light: '#fde047' }, // amber
```

### Add to PULSE_ANIM
```typescript
content_missing: 'ed-pulse-yellow 2.4s ease-in-out infinite',
```

### Add to VARIANT_CONFIG
```typescript
content_missing: {
  icon: '📋',
  badge: '⚠ Content Required',
  heading: 'Website content is missing.',
  subtitle: `The "${missingSection || 'required'}" section needs content before visitors can access this website. Please add it from the EdDesk Admin Panel.`,
},
```

### Add button for content_missing
```tsx
{variant === 'content_missing' && (
  <a href="https://admin.eddesk.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    <button style={primaryButtonStyle(accent)}>
      Add Content in Admin Panel →
    </button>
  </a>
)}
```

---

## PHASE 3 — Add Section Validation Helper

Create new file: `src/core/utils/sectionValidator.ts`

```typescript
/**
 * sectionValidator.ts
 * Validates required templatecomponents sections have data.
 * Returns the first missing required section, or null if all present.
 * 
 * USAGE: Call this in tenant/page.tsx AFTER buildTenantViewModel().
 * If it returns a missing section → render SystemPopup variant="content_missing"
 * instead of the template.
 */

import type { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

export interface SectionValidationResult {
  blocked: boolean;
  missingSection?: string;
  missingLabel?: string;
}

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero / Banner',
  broadcast: 'Announcements',
  academicresults: 'Academic Results',
  schoolachievements: 'School Achievements',
  leadership: 'Principal / Leadership',
  schoolstats: 'School Statistics',
  faculty: 'Faculty',
  activities: 'Activities',
  infrastructure: 'Infrastructure',
  gallery: 'Gallery',
  events: 'Events',
  contactdetails: 'Contact Details',
};

export function validateRequiredSections(vm: TenantViewModel): SectionValidationResult {
  for (const comp of vm.components) {
    if (!comp.isActive || !comp.isRequired) continue;

    const filters = comp.config?.filters;
    const isEmpty = isSectionEmpty(vm, comp.componentCode, filters);

    if (isEmpty) {
      const filterSuffix = filters?.type ? ` (${filters.type})` : '';
      return {
        blocked: true,
        missingSection: comp.componentCode,
        missingLabel: (SECTION_LABELS[comp.componentCode] ?? comp.componentCode) + filterSuffix,
      };
    }
  }
  return { blocked: false };
}

function isSectionEmpty(
  vm: TenantViewModel,
  code: string,
  filters?: { type?: string; designation?: string; contenttype?: string } | null
): boolean {
  switch (code) {
    case 'hero':
      return (vm.heroMedia ?? []).filter(h => h.isActive).length === 0;

    case 'broadcast':
      return (vm.broadcast ?? []).filter(b => b.isActive).length === 0;

    case 'academicresults':
      return (vm.academicResults ?? []).length === 0;

    case 'schoolachievements': {
      const filterType = filters?.type;
      const all = vm.schoolAchievements ?? [];
      if (filterType === 'academic') return all.filter(a => a.category === 'academic').length === 0;
      if (filterType === 'sports')   return all.filter(a => a.category === 'sports').length === 0;
      return all.length === 0;
    }

    case 'leadership': {
      const filterDesignation = filters?.designation?.toLowerCase();
      if (filterDesignation === 'principal') return !vm.principal;
      return (vm.leadership ?? []).length === 0;
    }

    case 'schoolstats':
      return (vm.stats ?? []).length === 0;

    case 'faculty':
      return (vm.faculty ?? []).filter(f => f.isActive).length === 0;

    case 'activities':
      return (vm.activities ?? []).filter(a => a.isActive).length === 0;

    case 'infrastructure':
      return (vm.infrastructure ?? []).filter(i => i.isActive).length === 0;

    case 'gallery': {
      const contentType = filters?.contenttype ?? 'image';
      return (vm.gallery ?? []).filter(g => g.mediaType === contentType && g.isActive).length === 0;
    }

    case 'events':
      return false; // events are not hard-blocked even if empty

    case 'contactdetails':
      return !vm.contactDetails;

    default:
      return false;
  }
}
```

---

## PHASE 4 — Wire Validation in tenant/page.tsx

In `src/app/tenant/[[...path]]/page.tsx`, after `buildTenantViewModel()`:

### Add import
```typescript
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import SystemPopup from '@/components/system/SystemPopup';
```

### Add validation call (after subscription check passes)
```typescript
// Step 5.5: Validate required sections have data
const sectionCheck = validateRequiredSections(viewModel);
if (sectionCheck.blocked) {
  return (
    <SystemPopup
      variant="content_missing"
      missingSection={sectionCheck.missingLabel}
    />
  );
}
```

### Also wire in demo/page.tsx
Apply the same validation in the demo route. Demo should also block if required sections are empty, so the school admin can see exactly what's missing.

---

## PHASE 5 — Implement Home Screen Data Binding (All 3 Templates)

### Rules for ALL template edits
- Only edit the home screen file for each template (see file paths above)
- ZERO className changes
- ZERO structural/HTML changes
- All data from `data: TenantViewModel` prop only
- No imports from local constants or data files
- Every array: `?? []`
- Every `.find()`: `?? null`

### Data access patterns to use (reference SCREEN-DATA-REFERENCE.md Section 7)

### Section 1: Hero
```typescript
const heroComp       = vm.components.find(c => c.componentCode === 'hero');
const heroActive     = heroComp?.isActive ?? true;
const heroRequired   = heroComp?.isRequired ?? false;
const heroSlides     = (data.heroMedia ?? []).filter(h => h.isActive).sort((a,b) => a.displayOrder - b.displayOrder);

// Render condition:
{heroActive && (heroRequired || heroSlides.length > 0) && (
  <HeroSection slides={heroSlides} />
)}
```

Each slide: headline, subheadline, mediaUrl, mediaType, primaryButtonText, primaryButtonUrl, secondaryButtonText (only if non-empty), secondaryButtonUrl

### Section 2: Broadcast
```typescript
const broadComp      = vm.components.find(c => c.componentCode === 'broadcast');
const broadActive    = broadComp?.isActive ?? true;
const broadRequired  = broadComp?.isRequired ?? false;
const now = new Date();
const broadcasts     = (data.broadcast ?? []).filter(b =>
  b.isActive && (!b.expiresAt || new Date(b.expiresAt) > now)
);

{broadActive && (broadRequired || broadcasts.length > 0) && (
  <BroadcastTicker items={broadcasts} />
)}
```

Each item: title, message

### Section 3: Academic Results (left side, beside academic achievements)
```typescript
const acadResultComp = vm.components.find(c => c.componentCode === 'academicresults');
const acadResultActive   = acadResultComp?.isActive ?? true;
const acadResultRequired = acadResultComp?.isRequired ?? false;
const latestResult   = (data.academicResults ?? []).sort((a,b) => b.year - a.year)[0] ?? null;

{acadResultActive && (acadResultRequired || latestResult) && (
  <AcademicResults result={latestResult} />
)}
```

Fields: year, passPercentage, distinctions, firstClass, legacyQuote

### Section 4: Academic Achievements (right side, beside academic results)
```typescript
const acadAchComp    = vm.components.find(c => c.componentCode === 'schoolachievements' && c.config?.filters?.type === 'academic');
const acadAchActive  = acadAchComp?.isActive ?? true;
const acadAchRequired= acadAchComp?.isRequired ?? false;
const academicAch    = (data.schoolAchievements ?? [])
  .filter(a => a.category === 'academic' && a.isActive)
  .sort((a,b) => b.year - a.year || a.displayOrder - b.displayOrder);

{acadAchActive && (acadAchRequired || academicAch.length > 0) && (
  <AcademicAchievements items={academicAch} />
)}
```

Fields: title, category, year, description, imageUrl, awardLevel

### Section 5: Principal
```typescript
const principalComp  = vm.components.find(c => c.componentCode === 'leadership');
const principalActive= principalComp?.isActive ?? true;
const principalRequired = principalComp?.isRequired ?? false;
const principal      = data.principal ?? null;

{principalActive && (principalRequired || principal) && principal && (
  <PrincipalSection principal={principal} />
)}
```

Fields: name, designation, message, imageUrl, signatureUrl

### Section 6: School Stats
```typescript
const statsComp      = vm.components.find(c => c.componentCode === 'schoolstats');
const statsActive    = statsComp?.isActive ?? true;
const statsRequired  = statsComp?.isRequired ?? false;
const stats          = (data.stats ?? []).sort((a,b) => a.displayOrder - b.displayOrder);

{statsActive && (statsRequired || stats.length > 0) && (
  <SchoolStats stats={stats} />
)}
```

Fields: label, value, icon

### Section 7: Faculty
```typescript
const facultyComp    = vm.components.find(c => c.componentCode === 'faculty');
const facultyActive  = facultyComp?.isActive ?? true;
const facultyRequired= facultyComp?.isRequired ?? false;
const facultyList    = (data.faculty ?? []).filter(f => f.isActive).sort((a,b) => a.displayOrder - b.displayOrder);

{facultyActive && (facultyRequired || facultyList.length > 0) && (
  <FacultySection faculty={facultyList} />
)}
```

Fields: name, designation, description, qualification, experienceYears, imageUrl

### Section 8: Sports Achievements
```typescript
const sportsComp     = vm.components.find(c => c.componentCode === 'schoolachievements' && c.config?.filters?.type === 'sports');
const sportsActive   = sportsComp?.isActive ?? true;
const sportsRequired = sportsComp?.isRequired ?? false;
const sportsAch      = (data.schoolAchievements ?? [])
  .filter(a => a.category === 'sports' && a.isActive)
  .sort((a,b) => a.displayOrder - b.displayOrder);

{sportsActive && (sportsRequired || sportsAch.length > 0) && (
  <SportsAchievements items={sportsAch} />
)}
```

### Section 9: Infrastructure
```typescript
const infraComp      = vm.components.find(c => c.componentCode === 'infrastructure');
const infraActive    = infraComp?.isActive ?? true;
const infraRequired  = infraComp?.isRequired ?? false;
const infraItems     = (data.infrastructure ?? []).filter(i => i.isActive).sort((a,b) => a.displayOrder - b.displayOrder);

{infraActive && (infraRequired || infraItems.length > 0) && (
  <Infrastructure items={infraItems} />
)}
```

Fields: title, description, tag, icon, imageUrl, highlightTitle, highlightDescription

### Section 10: Gallery
```typescript
const galleryComp    = vm.components.find(c => c.componentCode === 'gallery');
const galleryActive  = galleryComp?.isActive ?? true;
const galleryRequired= galleryComp?.isRequired ?? false;
const galleryImages  = (data.gallery ?? []).filter(g => g.mediaType === 'image' && g.isActive).sort((a,b) => a.displayOrder - b.displayOrder);

{galleryActive && (galleryRequired || galleryImages.length > 0) && (
  <Gallery images={galleryImages} />
)}
```

Fields: url, caption, category, mediaType, isFeatured

### Section 11: Events (template_modern + template_premium only, NOT classic)
```typescript
const eventsComp     = vm.components.find(c => c.componentCode === 'events');
const eventsActive   = eventsComp?.isActive ?? true;
const eventsRequired = eventsComp?.isRequired ?? false;
const upcomingEvents = (data.events ?? [])
  .filter(e => e.isFeatured && new Date(`${e.eventDate}T${e.startTime || '00:00'}`) > new Date())
  .sort((a,b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
  .slice(0, 3);

{eventsActive && (eventsRequired || upcomingEvents.length > 0) && (
  <Events events={upcomingEvents} />
)}
```

Fields: title, description, category, eventDate, startTime, endTime, location, imageUrl

### Section 12: Contact Details (Footer)
```typescript
const contact = data.contactDetails ?? null;

// Header logo
const logoUrl = data.school.logoUrl;  // if empty → render school name as text
const schoolName = data.school.name;
```

### Cleanup after binding
- Remove ALL imports from local data files (mockData.js, tenant.data.js, constants.tsx etc.)
- Remove SCHOOL_NAME, ACTIVITIES, schoolData and any other local constant usage
- Keep TenantViewModel import

---

## PHASE 6 — Validation Checklist

### ViewModel (tenant.viewmodel.ts)
  [ ] schoolAchievements field added and mapped from d.schoolachievements
  [ ] achievements kept as alias for backward compat, achievementType maps from category
  [ ] academicResults handles both array + single object RPC shapes
  [ ] contactDetails handles array input (takes [0])
  [ ] testimonials field added
  [ ] activities typed (not Record<string,unknown>[])
  [ ] infrastructure typed (not Record<string,unknown>[])
  [ ] components[].config includes filters
  [ ] No deduplication of templatecomponents

### SystemPopup (SystemPopup.tsx)
  [ ] content_missing variant added
  [ ] missingSection prop accepted
  [ ] Amber color for content_missing
  [ ] Admin Panel button present for content_missing

### sectionValidator.ts
  [ ] File created at src/core/utils/sectionValidator.ts
  [ ] All 13 component codes handled
  [ ] schoolachievements handles filter.type (academic vs sports separately)
  [ ] leadership handles filter.designation
  [ ] gallery handles filter.contenttype

### tenant/page.tsx
  [ ] validateRequiredSections called after buildTenantViewModel
  [ ] Returns SystemPopup content_missing if blocked
  [ ] demo/page.tsx also has same validation

### template_modern/app/page.tsx
  [ ] All 12 sections bound to data.* fields
  [ ] schoolAchievements used (not achievements)
  [ ] componentCode + filter used for section lookup (not just componentCode alone for schoolachievements)
  [ ] No local constant imports remain
  [ ] Every array has ?? [] fallback
  [ ] Logo: show text fallback if logoUrl empty
  [ ] Zero className changes

### template_classic/screens/HomeScreen.js
  [ ] Same 12 sections bound
  [ ] Events section NOT rendered (classic doesn't have events per layout table)
  [ ] Same data patterns as modern

### template_premium/app/page.tsx
  [ ] Same 12 sections bound including events
  [ ] Same data patterns as modern

---

## PHASE 7 — Test with Real RPC Data

Use the sample RPC response at the top of the task document as test data.

Expected render for sample data:
  ✅ Hero:             3 slides (2 from Unsplash + 1 uploaded PNG)
  ✅ Broadcast:        "Admissions Open - Apply Now"
  ✅ Academic Results: 2024, 98.5% pass, 120 distinctions, 340 first class
  ✅ Academic Achievements: "State Rank Holder 2024"
  ✅ Principal:        "Leader Name" with message "Guiding Vision"
  ✅ School Stats:     "1501+ Students" (2 entries — both show)
  ✅ Faculty:          "John Doe" + "selvan"
  ✅ Sports Achievements: "State Rank Holder 2024" (category: sports)
  ✅ Infrastructure:   "Smart Classrooms - Modern digital classrooms"
  ✅ Gallery:          1 image (campus1.png, category Events, isFeatured true)
  ✅ Events:           "Annual Day" on 2026-04-01 (future date — should show)
  ✅ Contact:          phone 9999999999, email contact@school.com
