# EdDesk — Bind Hero → template_modern
# ─────────────────────────────────────────────────────────────────────
# PREREQUISITE: Run unify-data-shape.md prompt first.
# ─────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Bind hero section → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first (in this order):
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/template-renderer-bridge.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 3):
  - src/templates/template_modern/index.tsx
  - src/templates/template_modern/app/page.tsx
  - src/templates/template_modern/components/HeroSlider.tsx

Forbidden: ALL other files.

─────────────────────────────────────────────────────────────
PHASE 1 — Understand what the hero currently does
─────────────────────────────────────────────────────────────
Read HeroSlider.tsx. The current hero:

  const slides = [
      { image: 'url1', title: '...', description: '...' },
      { image: 'url2', title: '...', description: '...' },
      { image: 'url3', title: '...', description: '...' },
  ];

  - HeroSlider accepts NO props currently
  - slides[] is hardcoded inside the component
  - Each slide renders as a background-image div — no video support
  - Two hardcoded buttons per slide: "Explore Campus" and "Apply Now"
  - Auto-advances every 6000ms

─────────────────────────────────────────────────────────────
PHASE 2 — Understand the data available
─────────────────────────────────────────────────────────────
From TenantViewModel, each heroMedia item has:

  mediaType           'image' | 'video'  ← USE THIS to decide rendering
  mediaUrl            the image or video URL
  headline            maps to slide.title
  subheadline         maps to slide.description
  primaryButtonText   first button text
  primaryButtonUrl    first button href
  secondaryButtonText second button text (may be empty string)
  secondaryButtonUrl  second button href (may be empty string)
  displayOrder        sort order (ascending)
  isActive            boolean — only render if true

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the change (NO code yet)
─────────────────────────────────────────────────────────────
Three files need changes:

1. index.tsx — pass data to Home page:
   Before: case '/': return <Home />;
   After:  case '/': return <Home data={data} />;

2. app/page.tsx — accept data prop, pass heroMedia to HeroSlider:
   Before: export default function Home() {
   After:  export default function Home({ data }: { data: TenantViewModel }) {

   Before: <HeroSlider />
   After:  <HeroSlider slides={data?.heroMedia ?? []} />

3. HeroSlider.tsx — accept slides prop, remove hardcoded array,
   add image/video rendering:

   A. Remove hardcoded slides[] array entirely.

   B. Add props interface:
      interface HeroSlide {
        mediaType: string;
        mediaUrl: string;
        headline: string;
        subheadline: string;
        primaryButtonText: string;
        primaryButtonUrl: string;
        secondaryButtonText: string;
        secondaryButtonUrl: string;
        isActive: boolean;
        displayOrder: number;
      }
      interface HeroSliderProps { slides: HeroSlide[] }

   C. Accept and process slides:
      const HeroSlider: React.FC<HeroSliderProps> = ({ slides: rawSlides }) => {
        const slides = rawSlides
          .filter(s => s.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder);

   D. Empty guard for timer:
      useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(...);
        return () => clearInterval(timer);
      }, [slides.length]);

   E. Replace background-image div with media-aware renderer.
      Each slide currently uses:
        <div style={{ backgroundImage: `url(${slide.image})` }} ... />

      Replace with a conditional:
        {slide.mediaType === 'video' ? (
          <video
            src={slide.mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center ..."
            style={{ backgroundImage: `url(${slide.mediaUrl})` }}
          />
        )}

      Keep the existing CSS transition classes on the outer wrapper div —
      only the inner media element changes.

   F. Replace text and buttons:
      slide.image       → slide.mediaUrl
      slide.title       → slide.headline
      slide.description → slide.subheadline
      Hardcoded "Explore Campus" → slide.primaryButtonText (fallback: 'Explore')
      Hardcoded href    → slide.primaryButtonUrl (fallback: '/infrastructure')
      Second button: show ONLY if slide.secondaryButtonText is non-empty
        text → slide.secondaryButtonText
        href → slide.secondaryButtonUrl (fallback: '/admissions')

WHAT DOES NOT CHANGE:
  - The outer slide wrapper div and its transition/opacity classes
  - The black overlay div (bg-black/40)
  - The text alignment and layout
  - The slide indicator dots at the bottom
  - The scroll indicator SVG
  - ALL CSS classes and Tailwind utilities
  - The 6000ms auto-advance interval

─────────────────────────────────────────────────────────────
PHASE 4 — Fallback rule
─────────────────────────────────────────────────────────────
If slides is empty after filtering:
  - Render null from HeroSlider (return null if slides.length === 0)
  - Timer useEffect exits early — no crash
  - Page renders without a hero section — acceptable

─────────────────────────────────────────────────────────────
PHASE 5 — Make the changes
─────────────────────────────────────────────────────────────
Make ONLY the changes documented in Phase 3.
Do not touch Navbar.tsx, Footer.tsx, or any other page file.

─────────────────────────────────────────────────────────────
PHASE 6 — Validate
─────────────────────────────────────────────────────────────
  - [ ] HeroSlider hardcoded slides[] array is gone
  - [ ] HeroSlider accepts slides prop typed correctly
  - [ ] isActive filter applied
  - [ ] displayOrder sort applied
  - [ ] mediaType === 'video' renders <video autoPlay muted loop playsInline>
  - [ ] mediaType === 'image' renders background-image div (existing pattern)
  - [ ] slide.mediaUrl used as src/url for both
  - [ ] slide.headline renders as title text
  - [ ] slide.subheadline renders as description text
  - [ ] Primary button uses slide data with fallback
  - [ ] Secondary button only renders if secondaryButtonText non-empty
  - [ ] Empty guard on timer useEffect
  - [ ] All CSS classes identical to before
  - [ ] Navbar, Footer, other page sections untouched
  - [ ] No files outside the 3 allowed files were modified

─────────────────────────────────────────────────────────────
PHASE 7 — Report
─────────────────────────────────────────────────────────────
```
Hero Binding Report — template_modern

Files changed:
  src/templates/template_modern/index.tsx                   passed data to Home
  src/templates/template_modern/app/page.tsx                passed heroMedia to HeroSlider
  src/templates/template_modern/components/HeroSlider.tsx   reads from slides prop

Hardcoded slides[] removed:   YES
Data source:                   data.heroMedia[] via props
Media type switch:             YES — video autoPlay | image background-div
Filters applied:               isActive, displayOrder
Empty guard:                   YES — return null if no active slides
CSS changed:                   NO
Other sections affected:       NONE
Guardrails violated:           NONE
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
