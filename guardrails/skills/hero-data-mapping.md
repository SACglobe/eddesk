---
name: hero-data-mapping
description: >
  Maps hero_media records into template-ready HeroSlideProps.
  Handles image vs video detection, active filtering, display ordering.
scope: core/viewmodels/hero.viewmodel.ts
version: 1.0
---

# Skill: Hero Data Mapping

## Purpose
Transform raw `hero_media[]` records from TenantData into a
clean, ordered, type-safe array of slide props for any template.

---

## Input
`TenantData.hero_media` — raw array from DB/API/local data.

Each record has:
- `media_type`: `'image' | 'video'` (from DB field)
- `media_url`: string path or URL
- `is_active`: boolean
- `display_order`: integer
- headline, subheadline, button fields

---

## Output: HeroSectionProps
```ts
{
  slides: HeroSlideProps[];  // ordered, active only
  hasSlides: boolean;        // false if array is empty
}

HeroSlideProps {
  id, mediaType, mediaUrl,
  headline, subheadline,
  primaryButtonText, primaryButtonUrl,
  secondaryButtonText, secondaryButtonUrl,
  hasSecondaryButton   // true only if BOTH text AND url exist
}
```

---

## Processing Rules (in this order)
1. **Filter** — remove items where `is_active !== true`
2. **Sort** — ascending by `display_order`
3. **Resolve media type** — use `media_type` field first, fall back to URL extension
4. **Resolve URLs** — pass through as-is (Next.js public dir handles relative paths)
5. **Fallbacks** — all string fields default to `''` if null/undefined
6. **hasSecondaryButton** — `true` only when BOTH text AND url are non-empty

---

## Media Type Detection Logic
```
if media_type === 'image' → 'image'
if media_type === 'video' → 'video'
else if URL ends in jpg/jpeg/png/gif/webp/avif/svg → 'image'
else if URL ends in mp4/webm/ogg/mov → 'video'
else → 'image' (safe default)
```

---

## Where This Lives
`src/core/viewmodels/hero.viewmodel.ts`
Called from `home.viewmodel.ts` → `prepareHeroProps(data.hero_media)`

---

## Stop Conditions
- If template expects a hero prop not in HeroSlideProps → add to ViewModel, not template
- If media type cannot be determined → default to 'image', log warning
- If all hero items are inactive → return `{ slides: [], hasSlides: false }`
  Template must handle this gracefully (that is the template's responsibility to handle empty state visually)
