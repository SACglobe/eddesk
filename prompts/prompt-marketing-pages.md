# EdDesk — Build Marketing Pages + Theme System
# ─────────────────────────────────────────────────────────────────────────────

## Before You Start — Read These Files

Read every file listed below before writing a single line of code:

  1. src/app/page.tsx                     ← current marketing homepage
  2. src/app/layout.tsx                   ← root layout, fonts, global metadata
  3. src/components/Navbar.tsx            ← marketing navbar (full file)
  4. src/components/Footer.tsx            ← marketing footer (full file)
  5. src/components/Hero.tsx              ← to understand visual language
  6. src/components/Services.tsx          ← to understand section patterns
  7. tailwind.config.ts                   ← current theme tokens
  8. src/app/globals.css                  ← CSS variables and utilities

Do NOT read or touch anything in:
  - src/templates/
  - src/app/tenant/
  - src/app/demo/
  - src/core/
  - src/components/system/
  - src/components/lead/

---

## Project Isolation Rules — Critical

The marketing website and the tenant/demo system are completely separate.

  Marketing = src/app/page.tsx + src/app/(marketing)/** + src/components/*.tsx
  Tenant    = src/app/tenant/ + src/templates/ + src/core/
  Demo      = src/app/demo/

RULE: Nothing you build in this task may import from or affect:
  - src/core/
  - src/templates/
  - src/app/tenant/
  - src/app/demo/

RULE: The marketing Navbar and Footer must NEVER be imported inside tenant or demo pages.

RULE: All marketing pages share ONE layout. Never duplicate Navbar/Footer across pages.

---

## Current Marketing Design System (extracted from codebase)

Understand this before building anything. All new pages must match exactly.

### Color Palette
```
Background:       #020617 (slate-950) — page background
Surface:          #0f172a (slate-900) — cards, nav background
Border:           rgba(255,255,255,0.05) — white/5
Primary accent:   #4f46e5 / indigo-600 — CTAs, highlights, active states
Secondary accent: #7c3aed / purple — gradient partner
Text primary:     #f8fafc (slate-50)
Text secondary:   #94a3b8 (slate-400)
Text muted:       #475569 (slate-600)
```

### Typography
```
Display/Headings: font-display (Space Grotesk) — font-black, tracking-tighter
Body:             font-sans (Plus Jakarta Sans)
Serif accents:    font-serif (Crimson Pro) — used sparingly for quotes
```

### Background Treatment
Every marketing page has this fixed background blob system (from page.tsx):
```tsx
<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-blob"></div>
  <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-600/10 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
  <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] bg-blue-600/5 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
</div>
```

### Section Anatomy
Every section follows this structure:
- Dark background (slate-950 or slate-900)
- Container: `container mx-auto px-6`
- Section padding: `py-24` or `py-32`
- Section label: tiny uppercase tracking-widest badge in indigo
- Section heading: font-display font-black text-4xl–7xl
- Section subtext: text-slate-400 max-w-2xl

### Card Style
```tsx
className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8
           hover:border-indigo-500/30 transition-all duration-300"
```

### Button Styles
```tsx
// Primary CTA
className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black
           hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"

// Secondary / ghost
className="bg-slate-900 border border-white/10 text-slate-300 px-8 py-4
           rounded-2xl font-black hover:border-indigo-500/50 transition-all"
```

---

## TASK 1 — Create the Marketing Theme File

Create a new file: `src/lib/marketing/theme.ts`

This is the single source of truth for all marketing visual decisions.
When the team wants to update the marketing theme, they change this file only.

```ts
// src/lib/marketing/theme.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the EdDesk marketing website theme.
// Import from this file in ALL marketing components and pages.
// Do NOT import this file from tenant, demo, or template files.
// ─────────────────────────────────────────────────────────────────────────────

export const marketingTheme = {

  // ── Colors ──────────────────────────────────────────────────────────────
  colors: {
    pageBg:        'bg-slate-950',
    surface:       'bg-slate-900',
    surfaceMuted:  'bg-slate-900/50',
    border:        'border-white/5',
    borderHover:   'hover:border-indigo-500/30',
    accent:        'indigo-600',
    accentHover:   'indigo-500',
    textPrimary:   'text-slate-50',
    textSecondary: 'text-slate-400',
    textMuted:     'text-slate-600',
  },

  // ── Typography ──────────────────────────────────────────────────────────
  type: {
    display:  'font-display font-black tracking-tighter',
    heading:  'font-display font-black',
    label:    'font-black uppercase tracking-[0.2em] text-xs text-indigo-400',
    body:     'font-sans text-slate-400 leading-relaxed',
    bodyLg:   'font-sans text-slate-400 text-lg leading-relaxed',
  },

  // ── Layout ──────────────────────────────────────────────────────────────
  layout: {
    container: 'container mx-auto px-6',
    section:   'py-24 lg:py-32',
    sectionSm: 'py-16 lg:py-24',
  },

  // ── Components ──────────────────────────────────────────────────────────
  components: {
    card:          'bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-3xl',
    cardPadding:   'p-8',
    cardHover:     'hover:border-indigo-500/30 transition-all duration-300',
    btnPrimary:    'bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20',
    btnSecondary:  'bg-slate-900 border border-white/10 text-slate-300 rounded-2xl font-black hover:border-indigo-500/50 transition-all',
    btnPadding:    'px-8 py-4',
    badge:         'inline-flex items-center bg-slate-900/50 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full text-indigo-400 text-sm font-bold shadow-xl shadow-indigo-500/5',
  },

  // ── Gradient Text ────────────────────────────────────────────────────────
  gradients: {
    text:   'bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-white to-purple-400',
    textAlt:'bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400',
    glow:   'bg-indigo-600/10 blur-[120px]',
  },

} as const;

// ── Convenience composites ─────────────────────────────────────────────────
// Pre-composed strings for the most common patterns.

export const mCard = `${marketingTheme.components.card} ${marketingTheme.components.cardPadding} ${marketingTheme.components.cardHover}`;
export const mBtnPrimary = `${marketingTheme.components.btnPrimary} ${marketingTheme.components.btnPadding}`;
export const mBtnSecondary = `${marketingTheme.components.btnSecondary} ${marketingTheme.components.btnPadding}`;
export const mContainer = marketingTheme.layout.container;
export const mSection = marketingTheme.layout.section;
export const mLabel = marketingTheme.type.label;
export const mDisplay = marketingTheme.type.display;
```

---

## TASK 2 — Create the Marketing Route Group Layout

Create: `src/app/(marketing)/layout.tsx`

This layout wraps ALL marketing pages (home, about, contact, terms, privacy).
It provides Navbar, Footer, and the background blob system ONCE.
Individual pages only need to export their content — no Navbar/Footer in page files.

```tsx
// src/app/(marketing)/layout.tsx
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      {/* Background blobs — shared by all marketing pages */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-600/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] bg-blue-600/5 blur-[100px] rounded-full animate-blob animation-delay-4000" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
```

IMPORTANT: After creating this layout, move `src/app/page.tsx` to
`src/app/(marketing)/page.tsx` and REMOVE the Navbar, Footer, and background
blob divs from it — the layout now handles all of those. The page should only
export the section components (Hero, Services, Process, Templates, etc.).

---

## TASK 3 — Update Navbar for Real Page Navigation

The current Navbar only does anchor scroll navigation (scrollToSection).
It needs real page links for the new static pages.

Modify `src/components/Navbar.tsx`:

### Add these imports
```tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
```

### Navigation items — replace the current nav items with:
```tsx
const NAV_ITEMS = [
  { label: 'Features',   type: 'anchor', id: 'features',     icon: <Rocket className="w-4 h-4" /> },
  { label: 'Templates',  type: 'anchor', id: 'templates',    icon: <Layout className="w-4 h-4" /> },
  { label: 'Pricing',    type: 'anchor', id: 'pricing',      icon: <Settings className="w-4 h-4" /> },
  { label: 'About',      type: 'page',   href: '/about',     icon: <GraduationCap className="w-4 h-4" /> },
  { label: 'Contact',    type: 'page',   href: '/contact',   icon: <MessageSquare className="w-4 h-4" /> },
];
```

### Logic for anchor vs page links:
```tsx
const pathname = usePathname();
const isHome = pathname === '/';

// Anchor links only work on homepage — on other pages, go home first
const handleNavClick = (e: React.MouseEvent, item: typeof NAV_ITEMS[0]) => {
  if (item.type === 'anchor') {
    if (isHome) {
      e.preventDefault();
      scrollToSection(e, item.id!);
    }
    // else: let the Link href="/#features" do a full navigate
  }
};
```

Anchor items should render as:
```tsx
<Link href={isHome ? `#${item.id}` : `/#${item.id}`}>...</Link>
```

Page items render as:
```tsx
<Link href={item.href}>...</Link>
```

---

## TASK 4 — Update Footer with Real Links

Modify `src/components/Footer.tsx`:

Replace all the placeholder `<FooterLink>` items with real linked versions:

```tsx
// Company column
{ label: 'About Us',      href: '/about' },
{ label: 'Contact Us',    href: '/contact' },
{ label: 'Terms',         href: '/terms' },
{ label: 'Privacy',       href: '/privacy' },

// Product column  
{ label: 'Templates',     href: '/#templates' },
{ label: 'Admin Panel',   href: '/#admin' },
{ label: 'Features',      href: '/#features' },

// Bottom bar legal links
{ label: 'Privacy Policy',    href: '/privacy' },
{ label: 'Terms & Conditions', href: '/terms' },
{ label: 'Contact',           href: '/contact' },
```

Update the FooterLink component to use Next.js Link:
```tsx
import Link from 'next/link';

const FooterLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
  <Link
    href={href}
    className="text-slate-500 hover:text-white transition-colors font-bold block"
  >
    {children}
  </Link>
);
```

Update copyright year to 2026 and company name:
```tsx
© 2026 EdDesk Technologies. All rights reserved.
```

Update the tagline from generic to accurate:
```tsx
// Replace: "The world's most sophisticated digital infrastructure..."
// With:
"Professional school websites with a powerful admin panel. Built for Indian schools."
```

---

## TASK 5 — Build /about Page

Create: `src/app/(marketing)/about/page.tsx`

This is a SERVER component (no "use client"). Export generateMetadata.

Content to include (all real EdDesk business content):

### Section 1 — Hero
- Badge: "About EdDesk"
- Headline: "We Build School Websites That Work"
- Subtext: "EdDesk gives every Indian school a professional digital presence — with a website, admin panel, and hosting — all managed in one place."
- No CTA buttons needed

### Section 2 — What We Do (3 cards)
```
Card 1: School Websites
  Icon: Monitor/Globe
  "We design and host professional websites for schools. Each website is built
   on a refined template, connected to your domain, and ready in days — not months."

Card 2: Admin Panel
  Icon: Settings/Layout
  "Schools manage all content through our admin panel. Update notices, upload
   faculty photos, post events — no coding, no developers, no technical knowledge needed."

Card 3: Subscription Model
  Icon: Shield/RefreshCw
  "Pay monthly or annually. Your subscription covers hosting, maintenance, and
   all platform updates. Cancel anytime — your domain stays yours."
```

### Section 3 — The Rental Model (important — transparent about how it works)
- Headline: "How EdDesk Works"
- This section must honestly explain the SaaS/rental model
```
"EdDesk operates on a subscription model. Schools rent access to the platform —
 the website templates, admin panel, hosting, and infrastructure all remain EdDesk property.

 When you subscribe, you get a fully managed school website. When you leave, your
 custom domain is yours to take elsewhere. The website itself is powered by EdDesk
 and is not transferable."
```
- Present this positively — "You focus on running your school, we handle the technology."

### Section 4 — Why Schools Choose EdDesk (4 stat cards)
```
No. 1:  "Days, not months" — time to launch a school website
No. 2:  "Zero" — technical knowledge needed by school admin
No. 3:  "3 templates" — Modern, Classic, Premium — to match every school's identity
No. 4:  "1 panel" — everything managed from a single admin dashboard
```

### Section 5 — Contact CTA strip
```
"Ready to get your school online?"
[Get Started →]   [Contact Us →]
```

---

## TASK 6 — Build /contact Page

Create: `src/app/(marketing)/contact/page.tsx`

SERVER component. Export generateMetadata.

### Section 1 — Hero
- Headline: "Let's Get Your School Online"
- Subtext: "Reach out with any question about EdDesk. We respond within 2 business days."

### Section 2 — Two column layout

LEFT COLUMN — Contact info cards (3 cards):

```
Card 1: Email
  Icon: Mail
  Label: "Email Us"
  Value: eddesktech@gmail.com
  Note: "We respond within 2 business days"

Card 2: Website
  Icon: Globe
  Label: "Visit Us"
  Value: eddesk.in
  Note: "See live template demos"

Card 3: Location
  Icon: MapPin
  Label: "Based In"
  Value: "Tamil Nadu, India"
  Note: "Serving schools across India"
```

RIGHT COLUMN — Contact form:
```
Fields:
  - School Name (text input)
  - Your Name (text input)
  - Email Address (email input)
  - Phone Number (tel input, optional)
  - Message (textarea, 4 rows)
  - [ Send Message → ] button (primary style)

Note below form:
  "By submitting this form you agree to our Privacy Policy."
  Link "Privacy Policy" → /privacy
```

Form implementation note: This is a static/SSR page. The form should POST to
`/api/contact` which does NOT need to be built in this task — just wire the
form's `action="/api/contact"` and `method="POST"`. Add a hidden field
`<input type="hidden" name="_source" value="marketing-contact" />`.

### Section 3 — FAQ strip (3 common questions)
```
Q: "How long does it take to get my school's website live?"
A: "Typically 2–5 days after your school information and content is submitted."

Q: "What happens to my domain if I cancel?"
A: "Your domain is yours. We provide DNS guidance to redirect it wherever you choose."

Q: "Do I need technical knowledge to manage the website?"
A: "No. The EdDesk admin panel is designed for school administrators, not developers."
```

---

## TASK 7 — Build /terms Page

Create: `src/app/(marketing)/terms/page.tsx`

SERVER component. Export generateMetadata.

This page renders the Terms & Conditions as styled HTML.
Do NOT use an iframe or embed a PDF — render real HTML content.

### Page structure:
```tsx
// Hero section
<h1>Terms & Conditions</h1>
<p>Effective Date: March 2026</p>

// Sticky table of contents sidebar (desktop only, lg:sticky lg:top-24)
// Lists all 12 section headings as anchor links

// Main content — all 12 sections from the T&C document
// Each section has an id matching the TOC anchor
```

### Content to render (all 12 sections verbatim from the T&C document):
Copy the exact legal text from the T&C document we created.
Every section heading becomes an `<h2>` with an `id` attribute.
Every bullet point becomes a proper `<li>`.
The "Note:" callouts (blue box) become a styled div with indigo-50/10 background.

### The critical sections to highlight visually (add a visual callout box):
- Section 4 (Platform Ownership) — add a note: "You are renting, not purchasing"
- Section 8 (Effect of Termination) — add a note: "Read this before subscribing"

---

## TASK 8 — Build /privacy Page

Create: `src/app/(marketing)/privacy/page.tsx`

SERVER component. Export generateMetadata.

Same structure as /terms — sticky TOC sidebar + main content.

Content: All 12 sections from the Privacy Policy document verbatim.
Render with same visual treatment as /terms.

Add a contact section at bottom:
```
"Questions about your data?"
Email: eddesktech@gmail.com
```

---

## TASK 9 — Add generateMetadata to Each New Page

Each new page must export generateMetadata. Use this pattern:

```tsx
// /about
export const metadata: Metadata = {
  title: 'About EdDesk | School Websites & Admin Panel',
  description: 'EdDesk builds professional school websites with a powerful admin panel. Subscription-based, no technical knowledge needed. Serving schools across India.',
  alternates: { canonical: 'https://eddesk.in/about' },
  openGraph: {
    title: 'About EdDesk | School Websites & Admin Panel',
    description: 'Professional school websites with admin panel. Monthly or annual subscriptions.',
    url: 'https://eddesk.in/about',
    siteName: 'EdDesk',
    type: 'website',
  },
};

// /contact
export const metadata: Metadata = {
  title: 'Contact EdDesk | Get Your School Online',
  description: 'Contact EdDesk to get your school\'s professional website live. We respond within 2 business days. Email: eddesktech@gmail.com',
  alternates: { canonical: 'https://eddesk.in/contact' },
};

// /terms
export const metadata: Metadata = {
  title: 'Terms & Conditions | EdDesk',
  description: 'EdDesk Terms & Conditions — subscription plans, platform ownership, data policy, and termination terms.',
  alternates: { canonical: 'https://eddesk.in/terms' },
  robots: { index: true, follow: true },
};

// /privacy
export const metadata: Metadata = {
  title: 'Privacy Policy | EdDesk',
  description: 'EdDesk Privacy Policy — how we collect, store, and protect your school\'s data.',
  alternates: { canonical: 'https://eddesk.in/privacy' },
  robots: { index: true, follow: true },
};
```

---

## TASK 10 — Update Marketing Homepage (page.tsx)

After moving page.tsx into (marketing)/, clean it up:

### Remove from page.tsx:
- The Navbar import and `<Navbar />` — layout handles it
- The Footer import and `<Footer />` — layout handles it
- The background blob divs — layout handles them
- The wrapping `<div className="min-h-screen...">` — layout handles it

### Update content — make it real EdDesk business content:

The homepage currently has placeholder/aspirational text. Update these components
(do NOT rewrite the whole component — just update the text content):

**Hero.tsx text updates:**
```
Badge:    "Trusted by Schools Across India" (remove fake 500+ number)
Headline: "Your School Deserves a Professional Website."
Sub:      "EdDesk gives schools a ready-to-launch website with an admin panel to
           manage everything. Monthly or annual plans. No technical knowledge needed."
CTA 1:    "Get Started" → href="/contact"
CTA 2:    "See Templates" → scrolls to #templates
```

**Services.tsx — update section title and any placeholder content:**
```
Section label: "What You Get"
Headline:      "Everything Your School Needs Online"
```

**Testimonials.tsx — mark placeholder testimonials clearly:**
Replace any fake testimonial names with `[School Name, City]` format
or remove the testimonials section until real ones are available.
Do not use fake names/schools.

---

## File Structure After This Task

```
src/
├── lib/
│   └── marketing/
│       └── theme.ts                    ← NEW — single theme source
│
├── app/
│   ├── layout.tsx                      ← unchanged (root layout)
│   ├── (marketing)/                    ← NEW route group
│   │   ├── layout.tsx                  ← NEW — Navbar + Footer + blobs
│   │   ├── page.tsx                    ← MOVED from app/page.tsx, cleaned up
│   │   ├── about/
│   │   │   └── page.tsx               ← NEW
│   │   ├── contact/
│   │   │   └── page.tsx               ← NEW
│   │   ├── terms/
│   │   │   └── page.tsx               ← NEW
│   │   └── privacy/
│   │       └── page.tsx               ← NEW
│   │
│   ├── tenant/[[...path]]/page.tsx    ← UNTOUCHED
│   └── demo/[templateSlug]/**/page.tsx ← UNTOUCHED
│
└── components/
    ├── Navbar.tsx                      ← UPDATED — real page links
    ├── Footer.tsx                      ← UPDATED — real links + correct copy
    └── [all others]                    ← UNTOUCHED
```

---

## Visual Design Rules for New Pages

All new pages must look like they belong with the existing marketing site.
Check every section against this list before finishing:

  [ ] Dark background: bg-slate-950 (not white, not gray-100)
  [ ] Text: slate-50 for headings, slate-400 for body
  [ ] Cards: bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-3xl
  [ ] Buttons: indigo-600 primary, slate-900 border secondary
  [ ] Section padding: py-24 minimum
  [ ] Container: container mx-auto px-6
  [ ] Section labels: tiny uppercase tracking-[0.2em] text-indigo-400
  [ ] Headings: font-display font-black (Space Grotesk)
  [ ] No white backgrounds anywhere on marketing pages
  [ ] No tenant/school colors (no yellow accent, no blue-950, no template colors)
  [ ] Gradient text on hero headlines: from-indigo-400 via-white to-purple-400
  [ ] No framer-motion required (it's used on homepage but is optional for inner pages)

---

## Validation Checklist

  [ ] src/lib/marketing/theme.ts created
  [ ] src/app/(marketing)/layout.tsx created with Navbar + Footer + blobs
  [ ] src/app/page.tsx moved to src/app/(marketing)/page.tsx
  [ ] No duplicate Navbar/Footer in page.tsx (layout handles them)
  [ ] Navbar has real page links for About + Contact, anchor links for Features/Templates
  [ ] Footer has real href links (not # placeholders)
  [ ] Footer copy updated: year 2026, correct tagline, correct company name
  [ ] /about page created with all 5 sections
  [ ] /contact page created with info cards + form + FAQ
  [ ] /terms page created with all 12 sections rendered as HTML
  [ ] /privacy page created with all 12 sections rendered as HTML
  [ ] Every new page has generateMetadata export
  [ ] No imports from src/core/, src/templates/, tenant, or demo in any marketing file
  [ ] Tenant route (src/app/tenant/) completely unchanged
  [ ] Demo route (src/app/demo/) completely unchanged
  [ ] theme.ts imported in at least the new pages (demonstrate the pattern)

## Test in Browser

  [ ] / (homepage) — loads with Navbar and Footer, blobs visible
  [ ] /about — opens, looks like part of same site, Navbar present
  [ ] /contact — form renders, info cards visible
  [ ] /terms — all 12 sections visible, TOC sidebar on desktop
  [ ] /privacy — all 12 sections visible, TOC sidebar on desktop
  [ ] Navbar links work: About → /about, Contact → /contact
  [ ] Footer links work: all 4 legal/company links navigate correctly
  [ ] Tenant domain (localhost:3002) — COMPLETELY UNAFFECTED, no marketing Navbar
  [ ] Demo route (/demo/template_modern) — COMPLETELY UNAFFECTED
