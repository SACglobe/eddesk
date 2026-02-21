# EdDesk — Image Safety: Hero & Principal Sections
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Ensure that user-uploaded images of any ratio (portrait, landscape,
#   square) or videos never stretch, overflow, or break the design in
#   hero and principal sections across all 3 templates.
#
# THE PROBLEM:
#   Admin users upload images with unpredictable aspect ratios.
#   If the container has no fixed size, the image will resize it.
#   If overflow is not clipped, the image spills outside its boundary.
#   Portrait images of people (principal) need top-anchoring so the
#   face stays visible and is not cropped at the top.
#
# THE SOLUTION (CSS only — no JSX structure changes):
#   1. Every image/video container must have overflow-hidden
#   2. Every image/video container must have a fixed height OR aspect ratio
#   3. Images use object-cover (already present) + object-top for portraits
#   4. Video uses object-cover (already present)
#   5. Add a bg-[color] fallback on the container for load states
#
# SCOPE: Hero and principal image/video elements ONLY.
#        No other sections. No layout changes. No JSX restructuring.
#
# PREREQUISITE: Hero binding and principal binding must be complete.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RULES THAT APPLY TO EVERY IMAGE AND VIDEO IN THIS TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HERO images and videos (full-screen slider/background):
  Container must have:  overflow-hidden  (clips content at boundary)
  Container must have:  fixed height (h-[85vh], h-screen, etc.) ← already exists
  Image/video must have: w-full h-full object-cover
  object-position:       object-center (default) — hero shows center crop

PRINCIPAL image (portrait of a person):
  Container must have:  overflow-hidden
  Container must have:  fixed aspect ratio OR fixed height
  Image must have:      w-full h-full object-cover object-top
  object-top is critical — keeps the face visible when a landscape
  image is uploaded into a portrait-shaped container.

NEVER:
  - Add object-contain (shows letterboxing, breaks design)
  - Remove existing aspect ratios or heights
  - Change layout structure (no new wrapper divs unless adding overflow-hidden)
  - Change any color, font, spacing, or animation class


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Image safety → template_classic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY this 1):
  - src/templates/template_classic/screens/HomeScreen.js

Forbidden: index.tsx, BroadcastTicker.js, any other file.

─────────────────────────────────────────────────────────────
PHASE 1 — Hero section (image slider)
─────────────────────────────────────────────────────────────
Current hero container:
  <section className="relative h-[85vh] w-full overflow-hidden bg-emerald-950">

Current image element (inside .map):
  <img className="w-full h-full object-cover" />

Current video element (after hero binding):
  <video className="w-full h-full object-cover" ... />

Status check:
  ✅ Container has overflow-hidden        → already correct
  ✅ Container has fixed height h-[85vh]  → already correct
  ✅ img has object-cover                 → already correct
  ✅ video has object-cover               → already correct

The outer slide wrapper div inside the .map:
  <div className="absolute inset-0 transition-opacity ...">

  Check: does this div have overflow-hidden?
  If NOT → add overflow-hidden to it.
  If YES → no change needed.

Hero result: minimal or no changes needed.

─────────────────────────────────────────────────────────────
PHASE 2 — Principal section (portrait image)
─────────────────────────────────────────────────────────────
Current principal image:
  <img
    src={principal?.photoUrl ?? ''}
    alt={principal?.name ?? 'Principal'}
    className="w-full aspect-[4/5] lg:aspect-auto lg:h-[650px] object-cover shadow-2xl ..."
  />

The wrapper div around the image:
  <div className="relative group">

Issues to fix:
  1. The wrapper div "relative group" has NO overflow-hidden
     → If the image is wider than container, it overflows the shadow/border effect
     → Add overflow-hidden to this div

  2. object-position is not set → defaults to object-center
     → For a principal portrait, face may be cropped if landscape image used
     → Change object-cover to object-cover object-top

Changes:
  Before: <div className="relative group">
  After:  <div className="relative group overflow-hidden">

  Before: className="w-full aspect-[4/5] lg:aspect-auto lg:h-[650px] object-cover shadow-2xl ..."
  After:  className="w-full aspect-[4/5] lg:aspect-auto lg:h-[650px] object-cover object-top shadow-2xl ..."

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hero slide wrapper div has overflow-hidden (verify or add)
  - [ ] Hero img/video: w-full h-full object-cover preserved
  - [ ] Principal wrapper div has overflow-hidden (added)
  - [ ] Principal img has object-top added
  - [ ] No other CSS class changed
  - [ ] No JSX structure changed
  - [ ] No other section of HomeScreen.js changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Image Safety Report — template_classic

Hero container overflow-hidden:   already present ✅
Hero img/video object-cover:      already present ✅
Hero slide wrapper overflow:      verified/added
Principal wrapper overflow-hidden: ADDED
Principal image object-top:       ADDED
CSS structure changed:            NO
Guardrails violated:              NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Image safety → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_modern/components/HeroSlider.tsx
  - src/templates/template_modern/app/page.tsx

─────────────────────────────────────────────────────────────
PHASE 1 — Hero section (HeroSlider)
─────────────────────────────────────────────────────────────
Current hero:
  Outer container: <div className="relative h-screen w-full overflow-hidden">
  
  Image slides use a background-image div, NOT an <img> tag:
    <div
      className="absolute inset-0 bg-cover bg-center ..."
      style={{ backgroundImage: `url(${slide.mediaUrl})` }}
    />

  Video slides (after hero binding) use:
    <video className="absolute inset-0 w-full h-full object-cover" ... />

Status check:
  ✅ Outer container has overflow-hidden     → already correct
  ✅ Outer container has h-screen            → already correct
  ✅ Background-image div uses bg-cover bg-center → correct (CSS handles crop)
  ✅ Video has object-cover                  → already correct

Background-image divs are immune to the ratio problem because
CSS background-size: cover always fills and clips — no fix needed.

Video: verify object-cover is present. If not, add it.

Hero result: verify video has object-cover, otherwise no changes.

─────────────────────────────────────────────────────────────
PHASE 2 — Principal section (page.tsx)
─────────────────────────────────────────────────────────────
Current principal image:
  <img
    src={principal?.photoUrl ?? 'school/image/principal.png'}
    alt="Principal"
    className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/5]"
  />

The wrapper structure:
  <div className="relative order-2 lg:order-1">
    <div className="absolute inset-0 bg-accent rounded-[3rem] rotate-3 translate-x-4 translate-y-4"></div>
    <img className="rounded-[3rem] ... w-full object-cover aspect-[4/5]" />

Issues to fix:
  1. The image has aspect-[4/5] which locks the ratio ✅ — good
  2. BUT the outer "relative" wrapper has NO overflow-hidden
     → The rotated accent background div might clip incorrectly with extreme images
     → The outer wrapper should have overflow-hidden

  3. object-position not set → defaults to center
     → For principal portrait, face may be cropped if landscape image used
     → Add object-top to the image

Changes:
  Before: <div className="relative order-2 lg:order-1">
  After:  <div className="relative order-2 lg:order-1 overflow-hidden rounded-[3rem]">
          Note: rounded-[3rem] on the wrapper ensures the overflow clip
          matches the image's border radius for clean edges.

  Before: className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/5]"
  After:  className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover object-top aspect-[4/5]"

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hero outer container overflow-hidden already present ✅
  - [ ] Hero bg-cover bg-center on image divs preserved ✅
  - [ ] Hero video has object-cover (verify/add)
  - [ ] Principal outer wrapper has overflow-hidden (added)
  - [ ] Principal outer wrapper has rounded-[3rem] for clip match
  - [ ] Principal image has object-top (added)
  - [ ] Principal image aspect-[4/5] preserved
  - [ ] No other CSS class changed
  - [ ] No other section of page.tsx changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Image Safety Report — template_modern

Hero container overflow-hidden:   already present ✅
Hero bg-cover on image divs:      already correct ✅
Hero video object-cover:          verified/added
Principal wrapper overflow-hidden: ADDED
Principal wrapper rounded-[3rem]: ADDED (matches image border-radius)
Principal image object-top:       ADDED
CSS structure changed:            NO
Guardrails violated:              NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Image safety → template_premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY this 1):
  - src/templates/template_premium/app/page.tsx

─────────────────────────────────────────────────────────────
PHASE 1 — Hero section (single video/image hero)
─────────────────────────────────────────────────────────────
Current hero container:
  <section className="h-screen relative overflow-hidden bg-signature-navy">
    <div className="absolute inset-0 z-0">
      {heroSlide?.mediaType === 'video' ? (
        <video className="w-full h-full object-cover scale-110" ... />
      ) : (
        <img src={...} className="w-full h-full object-cover scale-110" />
      )}

Status check:
  ✅ Section has overflow-hidden           → already correct
  ✅ Section has h-screen                  → already correct
  ✅ Video has object-cover                → already correct
  ✅ Image has object-cover                → already correct
  ✅ Inner div "absolute inset-0 z-0"      → fills section, no overflow issue

Hero result: no changes needed. Already fully safe.

─────────────────────────────────────────────────────────────
PHASE 2 — Principal section (circular thumbnail)
─────────────────────────────────────────────────────────────
Current principal image:
  <img
    src={principal?.photoUrl ?? ''}
    className="w-24 h-24 rounded-full object-cover grayscale border-2 border-signature-gold/20"
    alt="Principal"
  />

The wrapper around it:
  <div className="flex items-center gap-8">
    <img ... />
    <div> name + title </div>
  </div>

Status check:
  ✅ Image has fixed w-24 h-24 (96×96px square) → ratio locked
  ✅ Image has rounded-full                      → circular clip
  ✅ Image has object-cover                      → no stretching

  The circular container IS the clip — rounded-full + fixed size
  means ANY image (portrait, landscape, square) is cropped to a circle.
  This is inherently safe.

  However: object-position defaults to center → for a headshot,
  the face may be cropped if the image has lots of top padding.
  → Add object-top to bias toward the top of the image (face area).

Change:
  Before: className="w-24 h-24 rounded-full object-cover grayscale ..."
  After:  className="w-24 h-24 rounded-full object-cover object-top grayscale ..."

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hero section overflow-hidden already present ✅
  - [ ] Hero video/img object-cover already present ✅
  - [ ] No changes to hero (already safe)
  - [ ] Principal img has object-top (added)
  - [ ] Principal w-24 h-24 rounded-full preserved
  - [ ] No other CSS class changed
  - [ ] No other section of page.tsx changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Image Safety Report — template_premium

Hero: fully safe already ✅ — no changes needed
Principal image object-top:  ADDED
Principal w-24 h-24 rounded-full: preserved ✅
CSS structure changed:       NO
Guardrails violated:         NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUMMARY OF ALL CHANGES ACROSS 3 TEMPLATES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hero sections — already safe in all 3:
  All hero containers use overflow-hidden + fixed height + object-cover.
  No changes needed to hero containers.

Principal images — 3 targeted fixes:

  template_classic:
    + overflow-hidden on principal wrapper div
    + object-top on principal <img>

  template_modern:
    + overflow-hidden on principal wrapper div
    + rounded-[3rem] on principal wrapper div (matches image border-radius)
    + object-top on principal <img>

  template_premium:
    + object-top on principal <img>
    (circular crop already safe, just anchoring toward face)

Total CSS changes: 5 class additions across 3 files.
No JSX structure changes. No layout changes. No visual redesign.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
