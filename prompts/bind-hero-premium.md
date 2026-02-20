# EdDesk — Bind Hero → template_premium
# ─────────────────────────────────────────────────────────────────────
# PREREQUISITE: Run unify-data-shape.md prompt first.
#
# NOTE: Premium hero is a single-item video/image hero — NOT a carousel.
# It uses the FIRST active heroMedia item only.
# ─────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Bind hero section → template_premium
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
  - src/templates/template_premium/index.tsx
  - src/templates/template_premium/app/page.tsx

Forbidden: ALL other files. Do NOT touch components/Shared.tsx,
           components/Navigation.tsx, or data.ts.

─────────────────────────────────────────────────────────────
PHASE 1 — Understand what the hero currently does
─────────────────────────────────────────────────────────────
Read app/page.tsx. The Hero component:

  - Single full-screen hero with a hardcoded <video> background
  - Video src: hardcoded mixkit.co URL
  - Poster: hardcoded unsplash URL
  - Headline: hardcoded "The Art of Mastery."
  - Subtext: hardcoded "ESTABLISHED MCMLXXXVIII"
  - Primary button: "Institutional Prospectus" → /admissions
  - Secondary: "View Film" button that opens a modal playing the same video
  - The film modal is a separate open/close interaction

This template ALWAYS renders video as the hero background currently.
After this change: it renders video OR image based on mediaType.

─────────────────────────────────────────────────────────────
PHASE 2 — Understand the data available
─────────────────────────────────────────────────────────────
From TenantViewModel — use FIRST active item only:

  mediaType           'image' | 'video'  ← USE THIS to decide rendering
  mediaUrl            the video or image URL
  headline            replaces "The Art of Mastery."
  subheadline         replaces "ESTABLISHED MCMLXXXVIII"
  primaryButtonText   first button label
  primaryButtonUrl    first button href
  secondaryButtonText second button label (empty = hide "View Film" button)
  secondaryButtonUrl  video URL for the film modal (if secondaryButtonText set)
  isActive            boolean
  displayOrder        sort order

Selection: first item where isActive === true, sorted by displayOrder ascending.

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the change (NO code yet)
─────────────────────────────────────────────────────────────
Two files need changes:

1. index.tsx — pass data to Home:
   Before: case '/': return <Home />;
   After:  case '/': return <Home data={data} />;

2. app/page.tsx — three changes:

   A. Home accepts data prop:
      Before: export default function Home() {
      After:  export default function Home({ data }: { data: TenantViewModel }) {

   B. Derive heroSlide before the JSX return in Home:
      const heroSlide = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder)[0] ?? null;

   C. Hero component accepts heroSlide prop:
      Before: const Hero: React.FC = () => {
      After:
        interface HeroSlide {
          mediaType: string; mediaUrl: string;
          headline: string; subheadline: string;
          primaryButtonText: string; primaryButtonUrl: string;
          secondaryButtonText: string; secondaryButtonUrl: string;
        }
        const Hero: React.FC<{ heroSlide: HeroSlide | null }> = ({ heroSlide }) => {

   D. Pass heroSlide to Hero in the JSX:
      Before: <Hero />
      After:  <Hero heroSlide={heroSlide} />

   E. Inside Hero — replace the background media with mediaType switch:

      The current code has a single <video> element as the background.
      Replace it with a conditional:

        {heroSlide?.mediaType === 'video' ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-110"
            poster="[keep existing hardcoded poster URL as fallback]"
          >
            <source
              src={heroSlide?.mediaUrl ?? '[existing hardcoded URL]'}
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src={heroSlide?.mediaUrl ?? '[existing hardcoded poster URL]'}
            alt="Hero"
            className="w-full h-full object-cover scale-110"
          />
        )}

      Keep videoRef — it's still needed when mediaType IS video.
      The useEffect that calls videoRef.current.play() stays unchanged.
      When mediaType is 'image', videoRef.current will be null — add guard:
        if (videoRef.current) { videoRef.current.play()... }
      (This guard may already exist — check before adding.)

   F. Replace hardcoded text:
      subheadline span: heroSlide?.subheadline ?? 'ESTABLISHED MCMLXXXVIII'
      headline h1:      heroSlide?.headline ?? 'The Art of Mastery.'

   G. Replace primary button:
      href:  heroSlide?.primaryButtonUrl ?? '/admissions'
      text:  heroSlide?.primaryButtonText ?? 'Institutional Prospectus'

   H. Film modal button — conditional on secondaryButtonText:
      Before: always shows "View Film" button
      After:  show ONLY if heroSlide?.secondaryButtonText is non-empty
      Modal video src: heroSlide?.secondaryButtonUrl ?? heroSlide?.mediaUrl ?? ''

      Wrap the button in:
        {heroSlide?.secondaryButtonText && (
          <button onClick={() => setIsFilmOpen(true)} ...>
            ...
            <span>{heroSlide.secondaryButtonText}</span>
            ...
          </button>
        )}

WHAT DOES NOT CHANGE:
  - The film modal JSX (open/close structure)
  - The gradient overlay divs
  - The decorative gold vertical line above subheadline
  - The scroll indicator at the bottom
  - ALL CSS classes and Tailwind utilities
  - The isFilmOpen useState hook
  - The overall Hero layout and positioning

─────────────────────────────────────────────────────────────
PHASE 4 — Fallback rule
─────────────────────────────────────────────────────────────
If heroSlide is null (no active heroMedia):
  - All ?? fallbacks activate — existing hardcoded values show
  - mediaType check: heroSlide?.mediaType — undefined, not 'video'
    → renders <img> with fallback poster URL
  - Template renders fine, no crash

─────────────────────────────────────────────────────────────
PHASE 5 — Make the changes
─────────────────────────────────────────────────────────────
Make ONLY the changes documented in Phase 3.
Do not touch any other section of page.tsx (InstitutionalStats,
FacultyHighlights, UpcomingEvents, etc.).
Do not touch data.ts, Shared.tsx, or Navigation.tsx.

─────────────────────────────────────────────────────────────
PHASE 6 — Validate
─────────────────────────────────────────────────────────────
  - [ ] heroSlide derived from data.heroMedia — first active, sorted
  - [ ] Hero accepts heroSlide prop
  - [ ] mediaType === 'video' renders <video autoPlay muted loop playsInline>
  - [ ] mediaType !== 'video' renders <img> with mediaUrl as src
  - [ ] videoRef guard: if (videoRef.current) before .play()
  - [ ] heroSlide?.mediaUrl used as video src / image src with fallback
  - [ ] heroSlide?.headline used as heading with fallback
  - [ ] heroSlide?.subheadline used as subtext with fallback
  - [ ] Primary button uses heroSlide data with fallback
  - [ ] "View Film" button conditional on secondaryButtonText non-empty
  - [ ] Film modal video src uses secondaryButtonUrl with fallback
  - [ ] No other section of page.tsx changed
  - [ ] data.ts not touched
  - [ ] All CSS classes identical to before
  - [ ] No files outside the 2 allowed files were modified

─────────────────────────────────────────────────────────────
PHASE 7 — Report
─────────────────────────────────────────────────────────────
```
Hero Binding Report — template_premium

Files changed:
  src/templates/template_premium/index.tsx      passed data to Home
  src/templates/template_premium/app/page.tsx   Hero reads from heroSlide prop

Hero pattern:               Single hero (first active heroMedia item)
Data source:                data.heroMedia[0] (first active, sorted)
Media type switch:          YES — video autoPlay | image fallback
mediaType === 'video':      renders <video autoPlay muted loop playsInline>
mediaType === 'image':      renders <img> with mediaUrl as src
Fallbacks:                  YES — all fields have ?? fallback values
"View Film" button:         conditional on secondaryButtonText non-empty
CSS changed:                NO
Other sections affected:    NONE
Guardrails violated:        NONE
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
