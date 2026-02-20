---
name: template-data-injection
skill: 19
description: >
  Injects TenantViewModel data into template screens via the Renderer prop
  and TenantContext — without modifying template JSX, CSS, or structure.
  This is the bridge between the ViewModel and the template.
version: 2.0
---

# Skill 19: Template Data Injection

## Purpose
Templates receive data as a read-only prop. They never fetch it, never
decide where it comes from, and never handle empty/error states.
The Renderer passes `data` down. Screens read from `data`.

---

## The Injection Pattern (Your Project)

```
page.tsx (SSR)
  ↓ calls getTenantData() → buildTenantViewModel()
  ↓ passes tenantState to <TemplateRenderer>

TemplateRenderer.tsx (client)
  ↓ resolves data: tenantState.data ?? demoSchoolData
  ↓ passes data to <Renderer data={data} path={path} />

template_classic/index.tsx (Renderer)
  ↓ receives { data, path }
  ↓ passes data to <HomeScreen data={data} />
                   <AboutScreen data={data} />
                   etc.

HomeScreen.js
  ↓ reads data.personnel, data.statistics, data.heroMedia, etc.
  ↓ renders with real values
```

---

## The Current Problem (What Needs Fixing)

Right now screens ignore the `data` prop entirely:

```js
// ❌ CURRENT — screen imports its own internal constants
import { MOCK_DATA } from '../constants/mockData';
const HomeScreen = () => {
    const { STATISTICS, FACULTY } = MOCK_DATA;
    ...
}
```

The fix is to pass `data` from Renderer → screens, and replace
internal constant reads with reads from `data`:

```js
// ✅ CORRECT — screen reads from prop
const HomeScreen = ({ data }) => {
    const statistics = data.statistics;
    const faculty = data.personnel.filter(p => p.personType === 'faculty');
    ...
}
```

**The JSX structure, CSS classes, and layout do NOT change.**
Only the data source changes — from internal constant to prop.

---

## Step-by-Step Injection Process

### Step 1 — Update Renderer to pass data to screens

In `template_classic/index.tsx`:

```tsx
// Before:
case '/': return <HomeScreen />;

// After:
case '/': return <HomeScreen data={data} />;
```

Do this for every screen in the switch statement.
**This is the ONLY change to the Renderer.**

### Step 2 — Update each screen to accept and use data

In each screen file (e.g. `HomeScreen.js`):

```js
// Before:
import { MOCK_DATA } from '../constants/mockData';
const HomeScreen = () => {
    const { STATISTICS } = MOCK_DATA;

// After:
const HomeScreen = ({ data }) => {
    const statistics = data?.statistics ?? [];
```

### Step 3 — Map ViewModel fields to what the template expects

The ViewModel uses camelCase. Match it to what the screen JSX reads:

| Screen reads | ViewModel field | Notes |
|---|---|---|
| `stat.value` | `data.statistics[i].value` | direct match |
| `stat.label` | `data.statistics[i].label` | direct match |
| `teacher.name` | `data.personnel[i].name` | filter by personType='faculty' |
| `teacher.photo` | `data.personnel[i].photoUrl` | rename in destructure |
| `achievement.year` | `data.achievements[i].year` | direct match |
| `achievement.title` | `data.achievements[i].title` | direct match |

---

## Template Protection Rules (NON-NEGOTIABLE)

- [ ] No JSX restructuring inside any template file
- [ ] No CSS class changes inside any template file
- [ ] No new components added inside templates
- [ ] No conditional business logic added inside templates
- [ ] No imports added to templates except receiving the data prop

The ONLY allowed changes inside template files:
1. Add `{ data }` to the component's props
2. Replace `MOCK_DATA.X` reads with `data.X` reads
3. Pass `data={data}` when calling child screens

---

## Data Injection via TenantContext (Alternative)

For cases where prop drilling is too deep, use `TenantContext`:

```tsx
// In Renderer — wrap with context provider
<TenantContext.Provider value={data}>
    {renderScreen()}
</TenantContext.Provider>

// In any screen — read from context
import { useTenantContext } from '@/core/context/TenantContext';
const data = useTenantContext();
```

Use context only if the screen is 3+ levels deep from Renderer.
Prefer direct props for top-level screens.

---

## Data Safety Rules

Every data read inside a screen must be null-safe:

```js
// ✅ Safe reads
const statistics = data?.statistics ?? [];
const schoolName = data?.school?.name ?? '';
const principal = data?.personnel?.find(p => p.personType === 'principal');

// ❌ Unsafe — will crash if data is undefined
const statistics = data.statistics;
```

---

## What NEVER Changes

These things must remain identical before and after injection:

- [ ] Visual appearance of the template
- [ ] HTML structure and JSX layout
- [ ] CSS classes and Tailwind utilities
- [ ] Animation and interaction behavior
- [ ] Navigation and routing logic
- [ ] Component hierarchy and nesting

---

## Forbidden Actions

- [ ] Adding `fetch()` calls inside any template file
- [ ] Adding validation logic inside templates
- [ ] Adding `if (data.empty)` fallbacks inside templates
- [ ] Changing component names or file names
- [ ] Adding new CSS or Tailwind classes
- [ ] Importing from `@/core/` inside template screens

---

## Stop Conditions

- Any template file has its JSX structure changed → STOP, revert
- Any CSS class is added or removed in a template → STOP, revert
- A screen imports from `@/core/data/` or `@/lib/constants/` → STOP
- Data fetch logic appears inside a template → STOP
- Screen renders differently visually after injection → STOP, revert

---

## Per-Template Data Map

### template_classic

| Screen | Internal constant now | Replace with |
|---|---|---|
| HomeScreen | `MOCK_DATA.STATISTICS` | `data.statistics` |
| HomeScreen | `MOCK_DATA.FACULTY.teachers` | `data.personnel.filter(p => p.personType === 'faculty')` |
| HomeScreen | `MOCK_DATA.ACHIEVEMENTS.school_achievements` | `data.achievements` |
| HomeScreen | `MOCK_DATA.LEADERSHIP.principal_name` | `data.personnel.find(p => p.personType === 'principal')?.name` |
| HomeScreen | `MOCK_DATA.INFRASTRUCTURE.campus_images` | `data.mediaLibrary.map(m => m.url)` |

### template_modern

| Screen | Internal constant now | Replace with |
|---|---|---|
| Home page | `SCHOOL_NAME` | `data.school.name` |
| Home page | `STATS` | `data.statistics` |
| Home page | `UPCOMING_EVENTS` | `data.events` |
| Home page | `ANNOUNCEMENTS` | `data.announcements` |

### template_premium

| Screen | Internal constant now | Replace with |
|---|---|---|
| Home page | `schoolData.name` | `data.school.name` |
| Home page | `schoolData.events` | `data.events` |
| Home page | `schoolData.principalMessage` | `data.personnel.find(p => p.personType === 'principal')` |
| Home page | `schoolData.statistics` | `data.statistics` |
