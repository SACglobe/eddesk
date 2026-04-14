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
    textAlt: 'text-slate-200',
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
