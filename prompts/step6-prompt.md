# EdDesk — Phase 1, Step 6
# Create src/components/system/SectionWarning.tsx
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU WRITE ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files in order:
  1. src/components/system/SystemPopup.tsx              ← visual reference (same design system)
  2. src/core/viewmodels/tenant.viewmodel.ts            ← homepageSections shape (Step 3 output)
  3. src/templates/template_modern/app/page.tsx         ← how templates check isEnabled + data

Do not write a single line until you have read all three.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — WHY THIS COMPONENT IS NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Templates control section visibility using this pattern:

  const facultyEnabled = data.homepageSections
    .find(s => s.sectionKey === 'faculty')?.isEnabled ?? true;

  {facultyEnabled && faculty.length > 0 && (
    <FacultySection faculty={faculty} />
  )}

When isEnabled=true and data is empty, the section silently disappears.
The school admin has no idea why — they enabled the section in the admin
panel but it shows nothing.

The new templatecomponents data (Step 3) includes an isRequired field.
When isRequired=true and a section's data is empty, instead of silently
hiding the section, the template should render SectionWarning in that
section's slot — a visible inline message that tells the admin what's
missing and where to fix it.

Decision table (already designed in the workflow doc):

  isActive=false                              → hide section entirely (no warning)
  isActive=true + isRequired=true + data empty → show SectionWarning inline
  isActive=true + isRequired=true + data exists → show section normally
  isActive=true + isRequired=false + data empty → hide silently (no warning)
  isActive=true + isRequired=false + data exists → show section normally

SectionWarning handles the one case: isActive=true + isRequired=true + empty data.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT THIS COMPONENT IS AND IS NOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IS:
  - An inline banner rendered INSIDE the page layout
  - Takes up the same vertical space where the section would appear
  - Visible only when data for a required section is missing
  - Styled consistently with EdDesk design system (dark background, accent colors)
  - Dismissable by the user so it doesn't block browsing

IS NOT:
  - A full-screen overlay (that is SystemPopup's job)
  - A toast or notification
  - A modal
  - Shown to end users of the school website in production —
    only visible when the school is in preview/admin context
    (this step does not implement that guard — just build the component)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  src/components/system/SectionWarning.tsx   ← CREATE this file (new)

Do NOT modify any existing files in this step.
Templates will import SectionWarning in a later step.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — AUDIT (answer before writing code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Q1. Does src/components/system/SectionWarning.tsx already exist? Yes / No
  Q2. What color accent does SystemPopup use for its 'empty' variant?
  Q3. What CSS animation names are already defined in SystemPopup's KEYFRAMES?
      (The new component should reuse the same animation names, not redefine them.)
  Q4. How does template_modern identify which sectionKey corresponds to
      the faculty section? (Find the exact string used.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — COMPONENT SPECIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─────────────────────────────────────────────────────────────
Props interface
─────────────────────────────────────────────────────────────

export interface SectionWarningProps {
  /**
   * The componentCode / sectionKey identifying which section is empty.
   * Examples: 'faculty', 'hero', 'broadcast', 'events', 'gallery'
   * Used to construct the admin link and the warning message.
   */
  sectionKey: string;

  /**
   * Optional human-readable label for the section.
   * If not provided, sectionKey is title-cased and used instead.
   * Example: sectionKey='academic_results' → label='Academic Results'
   */
  label?: string;

  /**
   * If true, the warning can be dismissed by the user.
   * Default: true
   */
  dismissable?: boolean;
}

─────────────────────────────────────────────────────────────
Component behavior
─────────────────────────────────────────────────────────────

1. STATE
   - const [dismissed, setDismissed] = useState(false)
   - If dismissed is true, return null (render nothing)

2. LABEL DERIVATION
   If props.label is provided, use it directly.
   Otherwise derive from sectionKey:
     - Replace underscores and hyphens with spaces
     - Title-case each word
     Example: 'academic_results' → 'Academic Results'
              'hero'             → 'Hero'
              'broadcast'        → 'Broadcast'

3. ADMIN LINK
   Always link to: https://admin.eddesk.in
   The message should instruct the admin to add data there.

4. MESSAGE TEXT
   Primary:   "No data found for [Label] section."
   Secondary: "Add content at admin.eddesk.in or disable this section to hide this warning."

5. LAYOUT
   - Full-width banner (width: 100%)
   - Does NOT use position: fixed or position: absolute
   - Renders inline in the document flow
   - Reasonable min-height so it occupies visible space: ~80px min-height
   - Centered content horizontally and vertically

─────────────────────────────────────────────────────────────
Visual design — match EdDesk design system exactly
─────────────────────────────────────────────────────────────

Background:
  Dark card style matching SystemPopup:
  background: 'linear-gradient(135deg, #0d1526 0%, #111827 100%)'
  border: '1px solid rgba(234,179,8,0.25)'   ← yellow/amber accent (warning tone)
  borderRadius: '0.75rem'
  padding: '1.25rem 1.5rem'

Accent color: yellow/amber — same as SystemPopup network_error variant
  h:    '234,179,8'
  hex:  '#eab308'
  dark: '#ca8a04'
  light:'#fde047'

Left accent bar:
  A 3px vertical bar on the left edge of the banner:
  position: 'absolute', left: 0, top: 0, bottom: 0,
  width: '3px',
  borderRadius: '0.75rem 0 0 0.75rem',
  background: 'linear-gradient(180deg, #eab308, #ca8a04)'

Icon:
  ⚠️  displayed to the left of the text (not in a spinning ring — this is inline)
  fontSize: '1.25rem'

Section badge:
  Small pill showing the sectionKey:
  fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase'
  background: 'rgba(234,179,8,0.12)', color: '#fde047'
  border: '1px solid rgba(234,179,8,0.25)', borderRadius: '999px'
  padding: '0.2rem 0.65rem'

Primary text:
  color: '#f1f5f9', fontWeight: 700, fontSize: '0.9rem'

Secondary text:
  color: '#64748b', fontSize: '0.8rem', lineHeight: 1.55

Admin link:
  Inline anchor styled as a subtle pill link (same style as SystemPopup's admin link pill)
  href="https://admin.eddesk.in" target="_blank" rel="noopener noreferrer"
  color: '#fde047'
  text: 'Add at admin.eddesk.in →'

Dismiss button (when dismissable=true):
  Positioned top-right of the banner
  '✕' character
  color: '#475569', fontSize: '0.75rem'
  background: transparent, border: none, cursor: pointer
  Becomes '#94a3b8' on hover

Layout of content inside banner:
  display: 'flex', alignItems: 'center', gap: '1rem'
  Left:   ⚠️ icon
  Middle: section badge + primary text + secondary text (stacked)
  Right:  dismiss button (if dismissable)

─────────────────────────────────────────────────────────────
Animation
─────────────────────────────────────────────────────────────

The component should fade in on mount.
Reuse ed-fadeIn from SystemPopup — it will already be in the DOM
when SystemPopup has mounted on the same page.

However, since SectionWarning may render WITHOUT SystemPopup present,
inject a minimal keyframe locally using the same pattern as SystemPopup:

  function injectFadeIn() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('ed-section-warning-kf')) return;
    const style = document.createElement('style');
    style.id = 'ed-section-warning-kf';
    style.textContent = `
      @keyframes ed-sw-fadeIn {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

Apply: animation: 'ed-sw-fadeIn 0.25s ease forwards'
on the outer wrapper div.
Call injectFadeIn() inside useEffect on mount.

─────────────────────────────────────────────────────────────
Directives
─────────────────────────────────────────────────────────────

'use client'   ← required — uses useState, useEffect

No imports from services, viewmodels, or reference.js.
This component is purely presentational — it takes props and renders.

─────────────────────────────────────────────────────────────
Export
─────────────────────────────────────────────────────────────

export default function SectionWarning({ sectionKey, label, dismissable = true }: SectionWarningProps)

Also export the props type:
export type { SectionWarningProps }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — USAGE EXAMPLE (for reference — do NOT create these files)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is how a template will use the component (Step 7).
Shown here only so you understand the intended API:

  // In template_modern/app/page.tsx:

  import SectionWarning from '@/components/system/SectionWarning';

  const facultySection = data.homepageSections
    .find(s => s.sectionKey === 'faculty');
  const facultyEnabled  = facultySection?.isEnabled  ?? true;
  const facultyRequired = facultySection?.isRequired ?? false;
  const faculty = data.personnel.filter(p => p.personType === 'faculty');

  // Render:
  {facultyEnabled && faculty.length > 0 && (
    <FacultySection faculty={faculty} />
  )}
  {facultyEnabled && faculty.length === 0 && facultyRequired && (
    <SectionWarning sectionKey="faculty" label="Faculty" />
  )}

The component receives sectionKey="faculty" and renders the warning banner.
That is all it does — the decision logic stays in the template.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File:
  [ ] File created at src/components/system/SectionWarning.tsx
  [ ] 'use client' at top
  [ ] No imports from services, viewmodels, or reference.js
  [ ] SectionWarningProps exported as named type
  [ ] default export is SectionWarning function

Props:
  [ ] sectionKey: string — required
  [ ] label?: string — optional
  [ ] dismissable?: boolean — optional, defaults to true

Behavior:
  [ ] Returns null when dismissed=true
  [ ] Label derived from sectionKey when label prop not provided
  [ ] 'academic_results' → 'Academic Results' (underscore → space → title case)
  [ ] Admin link points to https://admin.eddesk.in
  [ ] Message includes sectionKey or label in the text
  [ ] Dismiss button calls setDismissed(true)
  [ ] Dismiss button absent when dismissable=false

Visual:
  [ ] Dark gradient background (not white, not light)
  [ ] Yellow/amber accent color (not indigo, not red)
  [ ] 3px vertical left accent bar
  [ ] ⚠️ icon to the left of text
  [ ] Section key shown as small uppercase pill badge
  [ ] Primary text is bold and light colored
  [ ] Secondary text is muted (#64748b)
  [ ] Admin link is inline and styled (not bare URL)
  [ ] Dismiss ✕ button top-right when dismissable=true
  [ ] NOT full screen — renders inline in document flow
  [ ] NOT position: fixed or position: absolute on wrapper

Animation:
  [ ] injectFadeIn() called on mount via useEffect
  [ ] Uses ed-sw-fadeIn keyframe (not ed-fadeIn — separate ID)
  [ ] Keyframe only injected once (checks document.getElementById guard)

Other files:
  [ ] No existing files modified in this step

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File created:   src/components/system/SectionWarning.tsx
  Other files:    NONE

  Props:          sectionKey, label?, dismissable?
  Behavior:       inline warning banner, dismissable, auto-label from sectionKey
  Design:         yellow/amber accent, dark background, left accent bar
  Animation:      ed-sw-fadeIn (local injection, guard against double-inject)
  Guardrails:     NONE violated
