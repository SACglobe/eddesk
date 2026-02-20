# EdDesk — Bind Hero → template_classic
# ─────────────────────────────────────────────────────────────────────
# PREREQUISITE: Run unify-data-shape.md prompt first.
# ─────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Bind hero section → template_classic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first (in this order):
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/template-renderer-bridge.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_classic/index.tsx
  - src/templates/template_classic/screens/HomeScreen.js

Forbidden: ALL other files. No ViewModel changes. No data file changes.

─────────────────────────────────────────────────────────────
PHASE 1 — Understand what the hero currently does
─────────────────────────────────────────────────────────────
Read HomeScreen.js. The current hero:

  const heroImages = [
      "https://...unsplash...1",
      "https://...unsplash...2",
      "https://...unsplash...3",
  ];

  - Renders a full-screen image slider using heroImages[]
  - Each slide renders ONLY as <img> — no video support
  - Headline hardcoded: "The Foundation of Greatness Begins Here"
  - Subtext hardcoded: "Est. 1952 • Legacy of Excellence"
  - Two buttons hardcoded: "Admissions 2024" and "Know more"
  - Auto-advances every 5000ms

─────────────────────────────────────────────────────────────
PHASE 2 — Understand the data available
─────────────────────────────────────────────────────────────
From TenantViewModel, each heroMedia item has:

  mediaType           'image' | 'video'  ← USE THIS to decide rendering
  mediaUrl            the image or video URL
  headline            main heading text
  subheadline         subtitle text
  primaryButtonText   text for first button
  primaryButtonUrl    href for first button
  secondaryButtonText text for second button (may be empty string)
  secondaryButtonUrl  href for second button (may be empty string)
  displayOrder        sort order (ascending)
  isActive            boolean — only render if true

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the change (NO code yet)
─────────────────────────────────────────────────────────────
Changes needed:

1. index.tsx — pass data prop to HomeScreen:
   Before: <HomeScreen />
   After:  <HomeScreen data={data} />

2. HomeScreen.js — accept data prop:
   Before: const HomeScreen = () => {
   After:  const HomeScreen = ({ data }) => {

3. Replace heroImages[] with filtered/sorted slides from data:
   Before: const heroImages = ["url1", "url2", "url3"]
   After:
     const heroSlides = (data?.heroMedia ?? [])
       .filter(s => s.isActive)
       .sort((a, b) => a.displayOrder - b.displayOrder);

4. Slider count:
   Before: heroImages.length
   After:  heroSlides.length

5. Replace each slide's <img> with a media-aware renderer:
   Each slide renders EITHER an <img> OR an autoplaying <video>
   based on slide.mediaType:

   Before (inside the .map):
     <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />

   After (inside the .map):
     {slide.mediaType === 'video' ? (
       <video
         src={slide.mediaUrl}
         autoPlay
         muted
         loop
         playsInline
         className="w-full h-full object-cover"
       />
     ) : (
       <img
         src={slide.mediaUrl}
         alt={`Slide ${idx + 1}`}
         className="w-full h-full object-cover"
       />
     )}

6. Replace static headline and subtext:
   Before: hardcoded strings in JSX
   After:
     <span ...>{slide.subheadline || ''}</span>
     <h1 ...>{slide.headline || ''}</h1>

7. Replace static buttons:
   Before: hardcoded "Admissions 2024" and "Know more"
   After:
     <Link href={slide.primaryButtonUrl || '/admission'}>
       {slide.primaryButtonText || 'Admissions'}
     </Link>
     {slide.secondaryButtonText && (
       <Link href={slide.secondaryButtonUrl || '/about'}>
         {slide.secondaryButtonText}
       </Link>
     )}

WHAT DOES NOT CHANGE:
  - The slider container JSX and structure
  - All CSS classes and Tailwind utilities
  - The overlay div (bg-emerald-950/40)
  - The auto-advance timer logic (just reference heroSlides)
  - The dot indicator logic (just reference heroSlides)
  - The animation classes (animate-fade-up etc.)

─────────────────────────────────────────────────────────────
PHASE 4 — Fallback rule
─────────────────────────────────────────────────────────────
If heroSlides is empty (no active media):
  - heroSlides.length = 0
  - Slider renders nothing — that is acceptable
  - Do NOT crash — use data?.heroMedia ?? []
  - Timer auto-advance: 0 % 0 is NaN — add guard:
    if (heroSlides.length > 0) start timer, else skip

─────────────────────────────────────────────────────────────
PHASE 5 — Make the changes
─────────────────────────────────────────────────────────────
Make ONLY the changes documented in Phase 3.
Do not touch any other section of HomeScreen.js.
Do not touch Header.js, Footer.js, or any other file.

─────────────────────────────────────────────────────────────
PHASE 6 — Validate
─────────────────────────────────────────────────────────────
  - [ ] heroImages[] hardcoded array is gone
  - [ ] heroSlides derived from data.heroMedia
  - [ ] isActive filter applied
  - [ ] displayOrder sort applied
  - [ ] mediaType === 'video' renders <video autoPlay muted loop playsInline>
  - [ ] mediaType === 'image' (or anything else) renders <img>
  - [ ] slide.mediaUrl used as src for both video and image
  - [ ] slide.headline renders as heading
  - [ ] slide.subheadline renders as subtext
  - [ ] Primary button uses slide.primaryButtonText/Url with fallback
  - [ ] Secondary button only renders if slide.secondaryButtonText is non-empty
  - [ ] Slider count uses heroSlides.length with empty guard
  - [ ] All CSS classes identical to before
  - [ ] No other section of HomeScreen.js changed
  - [ ] No files outside the 2 allowed files were modified

─────────────────────────────────────────────────────────────
PHASE 7 — Report
─────────────────────────────────────────────────────────────
```
Hero Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx           passed data to HomeScreen
  src/templates/template_classic/screens/HomeScreen.js  hero reads from data.heroMedia

Hardcoded heroImages[] removed:   YES
Data source:                      data.heroMedia[]
Media type switch:                YES — video autoPlay | image fallback
Filters applied:                  isActive, displayOrder
Fallback guard (empty slides):    YES
CSS changed:                      NO
Other sections affected:          NONE
Guardrails violated:              NONE
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
