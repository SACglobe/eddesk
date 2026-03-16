# EdDesk — Screen Data Reference
# ─────────────────────────────────────────────────────────────────────────────
# VERSION: 2.0
# This is the SINGLE SOURCE OF TRUTH for how RPC data maps to template sections.
#
# WHEN DB SCHEMA CHANGES: Update ONLY this file.
# AI agents read this file at the start of every session.
# No prompt needs to be rewritten — the agent reads this and knows everything.
#
# Location: guardrails/SCREEN-DATA-REFERENCE.md
# ─────────────────────────────────────────────────────────────────────────────

## HOW TO USE THIS FILE

When the database changes:
  1. Update Section 2 (RPC Response Shape) — add/rename/remove fields
  2. Update Section 3 (Component Registry) — add/change component rules
  3. Update Section 4 (ViewModel Mapping) — update the field mapping table
  4. Commit. Agents automatically use the new version next session.

---

## SECTION 1 — Architecture Rules (never change these)

### Where data flows
```
Supabase RPC get_screen_data
  → raw JSON object
  → ScreenDataPayload (screenData.service.ts)
  → buildTenantViewModel() (tenant.viewmodel.ts)
  → TenantViewModel
  → Template Home component receives: { data: TenantViewModel }
```

### Template home screen files
```
template_modern:   src/templates/template_modern/app/page.tsx
template_classic:  src/templates/template_classic/screens/HomeScreen.js
template_premium:  src/templates/template_premium/app/page.tsx
```

### Template layout order (section top → bottom)

| Position | template_modern | template_classic | template_premium |
|----------|----------------|-----------------|-----------------|
| 1st      | Header/Navbar   | Header/Navbar   | Header/Navbar   |
| 2nd      | Hero            | Broadcast       | Broadcast       |
| 3rd      | Broadcast       | Hero            | Hero            |
| 4th      | AcademicResults + SchoolAchievements (academic) side by side | AcademicResults (left) + SchoolAchievements academic (right) | AcademicResults (left) + SchoolAchievements academic (right) |
| 5th      | Principal       | Principal       | Principal       |
| 6th      | SchoolStats     | SchoolStats     | SchoolStats     |
| 7th      | Faculty         | Faculty         | Faculty         |
| 8th      | SchoolAchievements (sports) | SchoolAchievements (sports) | SchoolAchievements (sports) |
| 9th      | Infrastructure  | Infrastructure  | Infrastructure  |
| 10th     | Gallery (left) + Events (right) | Gallery only | Gallery + Events |
| 11th     | ContactDetails  | ContactDetails  | ContactDetails  |
| Footer   | Footer uses contactdetails | Footer uses contactdetails | Footer uses contactdetails |

### Header data source
```
Logo:  data.school.logoUrl  — if empty string → show data.school.name as text
Name:  data.school.name
```

### Footer data source
```
data.contactDetails.phone
data.contactDetails.email
data.contactDetails.address
data.contactDetails.facebook
data.contactDetails.instagram
data.contactDetails.twitter
data.contactDetails.youtube
data.school.name
```

---

## SECTION 2 — RPC Response Shape (update when DB changes)

The RPC `get_screen_data` returns this exact JSON structure.
All keys are lowercase (Supabase convention).

```
{
  mode:         "demo" | "live"
  screen:       "home" | "about" | ...
  school:       { ...see school fields below }
  subscription: { key, status, enddate, plankey, isactive, startdate }
  plan:         { key, code, name, price, currency, graceperiod, billingcycle }
  data: {
    hero:              []   ← array of hero slides
    broadcast:         []   ← array of announcements
    academicresults:   []   ← ARRAY (not single object — changed in v2)
    schoolachievements:[]   ← array — was "achievements" in v1
    leadership:        []   ← array — contains principal, chairman etc.
    schoolstats:       []   ← array of stat items
    faculty:           []   ← array of faculty members
    activities:        []   ← array of activity items
    infrastructure:    []   ← array of infrastructure items
    gallery:           []   ← array of gallery images
    events:            []   ← array of events
    contactdetails:    []   ← ARRAY (take index [0])
    testimonial:       []   ← array of testimonials
    templatecomponents:[]   ← section visibility config
  }
}
```

### school object fields
```
key, name, slug, email, phone, city, state, country, address,
postal_code, isdemo, isactive, logo_url, customdomain,
templateslug, themeconfig, templatekey
```

### hero[] item fields
```
key, headline, subheadline, contenttype, mediaurl, isactive,
primarybuttontext, primarybuttonurl, secondarybuttontext, secondarybuttonurl,
displayorder, screenslug, schoolkey, createdat, updatedat
```

### broadcast[] item fields
```
key, title, message, isactive, priority, expiresat, schoolkey, updatedat
```

### academicresults[] item fields  ← v2: now an ARRAY not single object
```
key, year, passpercentage, distinctions, firstclass, legacyquote,
isactive, schoolkey, createdat
```
Use: take the first active item, sort by year descending.

### schoolachievements[] item fields  ← v2: was "achievements" in v1
```
key, title, category, year, awardlevel, description, imageurl,
isfeatured, isactive, displayorder, schoolkey, createdat
```
category values: "academic" | "sports"

### leadership[] item fields
```
key, name, role, designation, message, imageurl, signatureurl,
isactive, displayorder, schoolkey, createdat
```
role values: "principal" | "chairman" | "board"

### schoolstats[] item fields
```
key, label, value, icon, isactive, displayorder, schoolkey, createdat
```

### faculty[] item fields
```
key, name, designation, description, qualification, experience_years,
imageurl, email, phone, isactive, displayorder, schoolkey
```

### activities[] item fields
```
key, title, tag, description, imageurl, isactive,
displayorder, highlighttag, highlightstat, schoolkey, createdat
```

### infrastructure[] item fields
```
key, title, description, tag, icon, imageurl, isactive,
displayorder, highlighttitle, highlightdescription, schoolkey, createdat
```

### gallery[] item fields
```
key, url, caption, category, contenttype, isactive, isfeatured,
displayorder, schoolkey, createdat
```

### events[] item fields
```
key, title, description, category, location, eventdate, starttime,
endtime, imageurl, isactive, isfeatured, schoolkey, createdat
```

### contactdetails[] item fields  ← ARRAY, use [0]
```
key, email, phone, address, mapembedurl, facebook, instagram,
twitter, youtube, isactive, schoolkey, createdat
```

### testimonial[] item fields
```
key, rating, message, isactive, photo_url, authorname,
designation, displayorder, schoolkey, createdat
```

### templatecomponents[] item fields  ← section visibility config
```
key, componentcode, isactive, isrequired, iseditable,
displayorder, config, templatescreenkey, componentregistrykey, createdat

config shape: {
  variant:         string | null
  itemcount:       number | null
  datasource:      string    ← which data[] key to read from
  selectionmethod: "auto" | "manual" | null
  filters:         { type?: string, designation?: string, contenttype?: string } | null
}
```

---

## SECTION 3 — Component Registry
# Each row = one templatecomponents entry with its data rules
# When a new component is added to the DB, add a row here.
# AI agents use this table to know: which data key → which filter → which ViewModel field

| componentcode      | config.datasource    | config.filters              | ViewModel field                                    | isRequired default | Template availability |
|--------------------|---------------------|-----------------------------|----------------------------------------------------|-------------------|----------------------|
| hero               | herocontent         | none                        | data.heroMedia (filter isActive, sort displayOrder) | true              | all 3               |
| broadcast          | broadcastcontent    | none                        | data.broadcast (filter isActive, not expired)      | true              | all 3               |
| academicresults    | academicresults     | none                        | data.academicResults[0] (latest year)             | true              | all 3               |
| schoolachievements | schoolachievements  | { category: "academic" }        | data.schoolAchievements.filter(academic)          | true              | all 3               |
| leadership         | leadership          | { designation: "Principal"} | data.leadership.find(role==="principal")           | false             | all 3               |
| schoolstats        | schoolstats         | none                        | data.stats (sort displayOrder)                     | true              | all 3               |
| faculty            | faculty             | none                        | data.faculty (filter isActive, sort displayOrder)  | true              | all 3               |
| schoolachievements | schoolachievements  | { category: "sports" }          | data.schoolAchievements.filter(sports)            | true              | all 3               |
| activities         | activities          | none                        | data.activities (filter isActive)                  | true              | all 3               |
| infrastructure     | infrastructure      | none                        | data.infrastructure (filter isActive)              | true              | all 3               |
| gallery            | gallery             | { contenttype: "image" }    | data.gallery.filter(contenttype==="image")           | true              | all 3               |
| events             | events              | none                        | data.events (upcoming only, isFeatured)            | true              | modern + premium    |
| contactdetails     | contactdetails      | none                        | data.contactDetails                                | true              | all 3               |
| testimonial        | testimonialcontent  | none                        | data.testimonials (optional)                       | false             | all 3               |

### Section visibility decision rule (MANDATORY for every section)
```
Read from templatecomponents: componentcode → isactive, isrequired

isactive = false               → SKIP ENTIRELY. Do not render. Do not read data.
isactive = true + isrequired = true  → MUST RENDER.
                                  If data is empty → show full-page warning (not section warning).
                                  User cannot access website until data is added.
isactive = true + isrequired = false → RENDER ONLY IF data array has items.
                                  If data is empty → silently skip (no warning).
```

### CRITICAL: Required + Empty = Full Page Block (v2 rule change)
In v1 we used SectionWarning (inline). In v2:
- Required section with empty data = `<SystemPopup variant="content_missing" missingSection="..." />`
- This blocks the ENTIRE page, forcing the school admin to fix it before visitors can access the website.
- Non-required sections with empty data = silently hidden (no error, no warning).

---

## SECTION 4 — ViewModel Mapping Table
# Maps RPC field names → TenantViewModel field names
# Update this when DB column names change or new fields are added
# AI agents use this to know exactly which viewmodel field to use

### Hero
| RPC field (data.hero[]) | TenantViewModel field (data.heroMedia[]) |
|------------------------|----------------------------------------|
| key                    | key                                    |
| headline               | headline                               |
| subheadline            | subheadline                            |
| contenttype            | contentType                            |
| mediaurl               | mediaUrl                               |
| primarybuttontext      | primaryButtonText                      |
| primarybuttonurl       | primaryButtonUrl                       |
| secondarybuttontext    | secondaryButtonText                    |
| secondarybuttonurl     | secondaryButtonUrl                     |
| isactive               | isActive                               |
| displayorder           | displayOrder                           |

### Broadcast
| RPC field (data.broadcast[]) | TenantViewModel field (data.broadcast[]) |
|-----------------------------|----------------------------------------|
| key                         | key                                    |
| title                       | title                                  |
| message                     | message                                |
| priority                    | priority                               |
| isactive                    | isActive                               |
| expiresat                   | expiresAt                              |

### Academic Results  ← v2: array not single object
| RPC field (data.academicresults[]) | TenantViewModel field (data.academicResults[]) |
|-----------------------------------|----------------------------------------------|
| key                               | key                                          |
| year                              | year                                         |
| passpercentage                    | passPercentage                               |
| distinctions                      | distinctions                                 |
| firstclass                        | firstClass                                   |
| legacyquote                       | legacyQuote                                  |
| isactive                          | isActive (filter out false)                  |

Template access: `data.academicResults[0]` (first item after sort by year desc)

### School Achievements  ← v2: was data.achievements[], now data.schoolAchievements[]
| RPC field (data.schoolachievements[]) | TenantViewModel field (data.schoolAchievements[]) |
|--------------------------------------|--------------------------------------------------|
| key                                  | key                                              |
| title                                | title                                            |
| category                             | category   ("academic" | "sports")               |
| year                                 | year                                             |
| awardlevel                           | awardLevel                                       |
| description                          | description                                      |
| imageurl                             | imageUrl                                         |
| isfeatured                           | isFeatured                                       |
| isactive                             | isActive                                         |
| displayorder                         | displayOrder                                     |

Template access:
  Academic: `data.schoolAchievements.filter(a => a.category === 'academic')`
  Sports:   `data.schoolAchievements.filter(a => a.category === 'sports')`

### Leadership / Principal
| RPC field (data.leadership[]) | TenantViewModel field (data.leadership[]) |
|------------------------------|------------------------------------------|
| key                          | key                                      |
| name                         | name                                     |
| role                         | role  ("principal" | "chairman" | "board")|
| designation                  | designation                              |
| message                      | message                                  |
| imageurl                     | imageUrl                                 |
| signatureurl                 | signatureUrl                             |
| isactive                     | isActive                                 |
| displayorder                 | displayOrder                             |

Principal access: `data.principal` (derived: leadership.find(role==='principal'))

### School Stats
| RPC field (data.schoolstats[]) | TenantViewModel field (data.stats[]) |
|-------------------------------|-------------------------------------|
| key                           | key                                 |
| label                         | label                               |
| value                         | value                               |
| icon                          | icon                                |
| isactive                      | (filter out false)                  |
| displayorder                  | displayOrder                        |

### Faculty
| RPC field (data.faculty[]) | TenantViewModel field (data.faculty[]) |
|---------------------------|---------------------------------------|
| key                       | key                                   |
| name                      | name                                  |
| designation               | designation                           |
| description               | description                           |
| qualification             | qualification                         |
| experience_years          | experienceYears                       |
| imageurl                  | imageUrl                              |
| email                     | email                                 |
| phone                     | phone                                 |
| isactive                  | isActive                              |
| displayorder              | displayOrder                          |

### Activities
| RPC field (data.activities[]) | TenantViewModel field (data.activities[]) |
|------------------------------|------------------------------------------|
| key                          | key                                      |
| title                        | title                                    |
| tag                          | tag                                      |
| description                  | description                              |
| imageurl                     | imageUrl                                 |
| isactive                     | isActive                                 |
| displayorder                 | displayOrder                             |
| highlighttag                 | highlightTag                             |
| highlightstat                | highlightStat                            |

### Infrastructure
| RPC field (data.infrastructure[]) | TenantViewModel field (data.infrastructure[]) |
|----------------------------------|---------------------------------------------|
| key                              | key                                         |
| title                            | title                                       |
| description                      | description                                 |
| tag                              | tag  (categoryName)                         |
| icon                             | icon                                        |
| imageurl                         | imageUrl                                    |
| isactive                         | isActive                                    |
| displayorder                     | displayOrder                                |
| highlighttitle                   | highlightTitle                              |
| highlightdescription             | highlightDescription                        |

### Gallery
| RPC field (data.gallery[]) | TenantViewModel field (data.gallery[]) |
|---------------------------|---------------------------------------|
| key                       | key                                   |
| url                       | url                                   |
| caption                   | caption                               |
| category                  | category                              |
| contenttype               | contentType                           |
| isactive                  | isActive                              |
| isfeatured                | isFeatured                            |
| displayorder              | displayOrder                          |

Filter for home screen: `contentType === 'image'`

### Events
| RPC field (data.events[]) | TenantViewModel field (data.events[]) |
|--------------------------|--------------------------------------|
| key                      | key                                  |
| title                    | title                                |
| description              | description                          |
| category                 | category                             |
| location                 | location                             |
| eventdate                | eventDate                            |
| starttime                | startTime                            |
| endtime                  | endTime                              |
| imageurl                 | imageUrl                             |
| isactive                 | isActive                             |
| isfeatured               | isFeatured                           |

Filter for home screen: upcoming (eventDate > today) + isFeatured === true, limit 3

### Contact Details  ← ARRAY, use index [0]
| RPC field (data.contactdetails[0]) | TenantViewModel field (data.contactDetails) |
|-----------------------------------|---------------------------------------------|
| key                               | key                                         |
| email                             | email                                       |
| phone                             | phone                                       |
| address                           | address                                     |
| mapembedurl                       | mapEmbedUrl                                 |
| facebook                          | facebook                                    |
| instagram                         | instagram                                   |
| twitter                           | twitter                                     |
| youtube                           | youtube                                     |

### Testimonials  ← NEW in v2
| RPC field (data.testimonial[]) | TenantViewModel field (data.testimonials[]) |
|-------------------------------|---------------------------------------------|
| key                           | key                                         |
| rating                        | rating                                      |
| message                       | message                                     |
| authorname                    | authorName                                  |
| designation                   | designation                                 |
| photo_url                     | photoUrl                                    |
| isactive                      | isActive                                    |
| displayorder                  | displayOrder                                |

---

## SECTION 5 — ViewModel Changes Required (v1 → v2)

These are the BREAKING CHANGES from the new RPC response.
The viewmodel (tenant.viewmodel.ts) must be updated before templates will work.

### Change 1: schoolachievements replaces achievements
```
OLD: d.achievements → data.achievements[]
NEW: d.schoolachievements → data.schoolAchievements[]
```
Update in tenant.viewmodel.ts:
  - Add new field: `schoolAchievements: Array<{...}>`
  - Keep old `achievements` as alias pointing to `schoolAchievements` for backward compat

### Change 2: academicresults is now an array
```
OLD: d.academicresults → single object or null
NEW: d.academicresults → array, use [0] sorted by year desc
```
Update in tenant.viewmodel.ts:
  - `academicResults` array: map the array, sort by year desc
  - `academicResult` (single): take academicResults[0] or null

### Change 3: contactdetails is now an array
```
OLD: d.contactdetails → single object
NEW: d.contactdetails → array, use [0]
```
Update in tenant.viewmodel.ts:
  - Cast to array, take [0]

### Change 4: testimonial added (new table)
```
NEW: d.testimonial → array
```
Add to tenant.viewmodel.ts:
  - `testimonials: Array<{key, rating, message, authorName, designation, photoUrl, isActive, displayOrder}>`

### Change 5: activities shape updated
```
OLD: activities was Record<string,unknown>[]
NEW: activities has known fields: title, tag, description, imageUrl, highlightTag, highlightStat
```
Update in tenant.viewmodel.ts:
  - Map activities to typed array (see mapping table above)

### Change 6: templatecomponents deduplication rule change
```
OLD: deduplicated by componentcode (one entry per code)
NEW: do NOT deduplicate — schoolachievements appears TWICE (once for academic, once for sports)
     Each entry has different config.filters.type
     Keep ALL entries. Use componentcode + config.filters as the unique key.
```

---

## SECTION 6 — Full-Page Block Logic

### When to show SystemPopup variant="content_missing"

Check every templatecomponents entry where isrequired = true.
For each required component, validate its data:

```typescript
// Pseudo-code — agent implements this in page.tsx or a helper
function validateRequiredSections(vm: TenantViewModel, components: TemplateComponent[]) {
  for (const comp of components) {
    if (!comp.isActive || !comp.isRequired) continue;

    const isEmpty = checkDataEmpty(vm, comp);
    if (isEmpty) {
      return { blocked: true, missingSection: comp.componentCode, filterType: comp.config?.filters?.type };
    }
  }
  return { blocked: false };
}

function checkDataEmpty(vm: TenantViewModel, comp: TemplateComponent): boolean {
  const filterType = comp.config?.filters?.type;
  const filterDesignation = comp.config?.filters?.designation;

  switch (comp.componentCode) {
    case 'hero':              return vm.heroMedia.filter(h => h.isActive).length === 0;
    case 'broadcast':         return vm.broadcast.filter(b => b.isActive).length === 0;
    case 'academicresults':   return vm.academicResults.length === 0;
    case 'schoolachievements':
      if (filterType === 'academic') return vm.schoolAchievements.filter(a => a.category === 'academic').length === 0;
      if (filterType === 'sports')   return vm.schoolAchievements.filter(a => a.category === 'sports').length === 0;
      return vm.schoolAchievements.length === 0;
    case 'leadership':
      if (filterDesignation === 'Principal') return !vm.principal;
      return vm.leadership.length === 0;
    case 'schoolstats':       return vm.stats.length === 0;
    case 'faculty':           return vm.faculty.filter(f => f.isActive).length === 0;
    case 'activities':        return vm.activities.filter(a => a.isActive).length === 0;
    case 'infrastructure':    return vm.infrastructure.filter(i => i.isActive).length === 0;
    case 'gallery':           return vm.gallery.filter(g => g.contenttype === 'image').length === 0;
    case 'events':            return false; // events not required on all templates
    case 'contactdetails':    return !vm.contactDetails;
    default:                  return false;
  }
}
```

### SystemPopup content_missing variant message
```
heading:  "Website Content Missing"
subtitle: `The "${missingSection}" section is required but has no data.
           Please add content from the EdDesk Admin Panel to go live.`
button:   "Go to Admin Panel →" → https://admin.eddesk.in
```

---

## SECTION 7 — Safe Access Patterns (mandatory in templates)

```typescript
// Arrays — always use ?? []
const heroSlides = (data?.heroMedia ?? []).filter(h => h.isActive).sort((a,b) => a.displayOrder - b.displayOrder);

// Single object — always check null
const principal = data?.principal ?? null;
const contact = data?.contactDetails ?? null;

// Filtered arrays
const academicAchievements = (data?.schoolAchievements ?? []).filter(a => a.category === 'academic');
const sportsAchievements   = (data?.schoolAchievements ?? []).filter(a => a.category === 'sports');
const galleryImages        = (data?.gallery ?? []).filter(g => g.contenttype === 'image' && g.isActive);

// Events: upcoming + featured
const now = new Date();
const upcomingEvents = (data?.events ?? [])
  .filter(e => e.isFeatured && new Date(`${e.eventDate}T${e.startTime || '00:00'}`) > now)
  .sort((a, b) => new Date(`${a.eventDate}`).getTime() - new Date(`${b.eventDate}`).getTime())
  .slice(0, 3);

// Section visibility
const heroComp = components.find(c => c.componentCode === 'hero');
const heroActive   = heroComp?.isActive ?? true;
const heroRequired = heroComp?.isRequired ?? false;

// For schoolachievements (appears twice — must find by code AND filter)
const academicComp = components.find(c => c.componentCode === 'schoolachievements' && c.config?.filters?.category === 'academic');
const sportsComp   = components.find(c => c.componentCode === 'schoolachievements' && c.config?.filters?.category === 'sports');

// Logo with fallback
const logoSrc = data?.school?.logoUrl;  // if empty string → show school name text instead

// Secondary button — only render if text is non-empty
{slide.secondaryButtonText && <a href={slide.secondaryButtonUrl}>{slide.secondaryButtonText}</a>}
```

---

## SECTION 8 — Changelog

| Version | Date       | Change Summary |
|---------|-----------|----------------|
| 1.0     | 2026-03-02 | Initial version |
| 2.0     | 2026-03-15 | schoolachievements replaces achievements; academicresults now array; contactdetails now array; testimonial added; activities typed; templatecomponents dedup rule changed; SectionWarning → full-page block for required sections |
