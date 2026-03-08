# EdDesk — Phase 1, Step 5
# Update src/components/system/SystemPopup.tsx
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU WRITE ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files in order:
  1. src/components/system/SystemPopup.tsx          ← file you will edit
  2. src/components/system/SystemPopupProvider.tsx  ← uses SystemPopup
  3. src/app/tenant/[[...path]]/page.tsx            ← calls SystemPopup directly

Do not write a single line until you have read all three.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — WHAT NEEDS TO CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The current SystemPopup has two variants: 'empty' | 'error'
The tenant page currently calls it with variant="error" for inactive
and expired states. These need their own dedicated variants so they
show the correct message and the correct action button.

Three new variants must be added:

  'network_error'
    Cause:   fetch threw — no internet connection
    Message: Cannot connect. Waiting for internet...
    Action:  Auto-retries when browser comes back online
             window.addEventListener('online', () => location.reload())
    No manual button needed — reload is automatic

  'inactive'
    Cause:   school.isactive = false
    Message: This website is currently inactive
    Action:  Button → admin.eddesk.in (raise a ticket)
    No dismiss. No retry. Admin link only.

  'expired'
    Cause:   past subscription.enddate + plan.graceperiod
    Message: Subscription has expired
    Action:  Button → admin.eddesk.in (renew subscription)
    No dismiss. No retry. Admin link only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL RULE — BACKWARD COMPATIBILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These callers use existing variants and must NOT break:

  tenant/page.tsx:
    <SystemPopup variant="error" errorMessage="..." />
    <SystemPopup variant={result.status === 'empty' ? 'empty' : 'error'} ... />

  SystemPopupProvider.tsx:
    <SystemPopup variant={tenantState.status === 'empty' ? 'empty' : 'error'} ... />

Rules:
  - Keep 'empty' and 'error' variants working exactly as they do today
  - Do NOT change their UI, messages, or behavior
  - Only ADD new variants — do not modify existing ones
  - PopupVariant type must expand: add the 3 new values to the union

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  src/components/system/SystemPopup.tsx   ← ONLY this file

Do NOT touch SystemPopupProvider.tsx, tenant/page.tsx, or demo/page.tsx.
Those are updated in Step 6.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — AUDIT (answer before writing code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Q1. What is the current PopupVariant type?
  Q2. What color accent does 'empty' use? What does 'error' use?
  Q3. Does the current component have any useEffect for online/offline?
  Q4. How does the current component decide which icon and badge text to show?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — EXACT CHANGES TO MAKE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─────────────────────────────────────────────────────────────
1A. Expand the PopupVariant type
─────────────────────────────────────────────────────────────

BEFORE:
  export type PopupVariant = 'empty' | 'error';

AFTER:
  export type PopupVariant = 'empty' | 'error' | 'network_error' | 'inactive' | 'expired';

─────────────────────────────────────────────────────────────
1B. Add isOnline state for network_error variant
─────────────────────────────────────────────────────────────

Inside the component, after the existing `const [visible, setVisible] = useState(false);`
add:

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Track online/offline status for network_error variant
    const handleOnline  = () => { setIsOnline(true);  window.location.reload(); };
    const handleOffline = () => setIsOnline(false);

    if (variant === 'network_error') {
      // Set initial state based on browser
      setIsOnline(navigator.onLine);
      window.addEventListener('online',  handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      window.removeEventListener('online',  handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [variant]);

─────────────────────────────────────────────────────────────
1C. Add color token entries for new variants
─────────────────────────────────────────────────────────────

The existing code has:

  const accent = isEmpty
    ? { h: '99,102,241', hex: '#6366f1', dark: '#4f46e5', light: '#a5b4fc' }
    : { h: '239,68,68',  hex: '#ef4444', dark: '#dc2626', light: '#fca5a5' };

Replace with a variant-keyed map so each variant has its own color:

  const ACCENT_MAP: Record<PopupVariant, { h: string; hex: string; dark: string; light: string }> = {
    empty:         { h: '99,102,241',  hex: '#6366f1', dark: '#4f46e5', light: '#a5b4fc' }, // indigo
    error:         { h: '239,68,68',   hex: '#ef4444', dark: '#dc2626', light: '#fca5a5' }, // red
    network_error: { h: '234,179,8',   hex: '#eab308', dark: '#ca8a04', light: '#fde047' }, // yellow
    inactive:      { h: '239,68,68',   hex: '#ef4444', dark: '#dc2626', light: '#fca5a5' }, // red
    expired:       { h: '249,115,22',  hex: '#f97316', dark: '#ea580c', light: '#fdba74' }, // orange
  };

  const accent = ACCENT_MAP[variant];

Remove the old `const isEmpty = variant === 'empty';` line —
replace all uses of `isEmpty` with direct variant checks (see 1D).

─────────────────────────────────────────────────────────────
1D. Update pulseAnim to use accent
─────────────────────────────────────────────────────────────

The existing KEYFRAMES only has ed-pulse-indigo and ed-pulse-red.
Add two more keyframes to the KEYFRAMES string:

  @keyframes ed-pulse-yellow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(234,179,8,0.55), 0 0 32px rgba(234,179,8,0.3); }
    50%       { box-shadow: 0 0 0 10px rgba(234,179,8,0), 0 0 48px rgba(234,179,8,0.5); }
  }
  @keyframes ed-pulse-orange {
    0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.55), 0 0 32px rgba(249,115,22,0.3); }
    50%       { box-shadow: 0 0 0 10px rgba(249,115,22,0), 0 0 48px rgba(249,115,22,0.5); }
  }

Then replace the pulseAnim logic:

  const PULSE_ANIM: Record<PopupVariant, string> = {
    empty:         'ed-pulse-indigo 2.4s ease-in-out infinite',
    error:         'ed-pulse-red    2.4s ease-in-out infinite',
    network_error: 'ed-pulse-yellow 2.4s ease-in-out infinite',
    inactive:      'ed-pulse-red    2.4s ease-in-out infinite',
    expired:       'ed-pulse-orange 2.4s ease-in-out infinite',
  };
  const pulseAnim = PULSE_ANIM[variant];

─────────────────────────────────────────────────────────────
1E. Add variant config map for icon, badge, heading, subtitle
─────────────────────────────────────────────────────────────

Replace the inline JSX conditionals for icon/badge/heading/subtitle
with a single config map. Add this before the return statement:

  const VARIANT_CONFIG: Record<PopupVariant, {
    icon:     string;
    badge:    string;
    heading:  string;
    subtitle: string;
  }> = {
    empty: {
      icon:     '⚙️',
      badge:    '⚙ Not Configured',
      heading:  'Your website data is not configured yet.',
      subtitle: 'Set up your school profile, sections, and content from the EdDesk Admin Panel to go live.',
    },
    error: {
      icon:     '⚡',
      badge:    '⚠ Connection Error',
      heading:  "We couldn't load your website data.",
      subtitle: 'A server or network error occurred while loading your school data. Please retry or refresh.',
    },
    network_error: {
      icon:     '📡',
      badge:    '⚠ No Internet',
      heading:  'Cannot connect to the internet.',
      subtitle: isOnline
        ? 'Connection restored! Reloading...'
        : 'This website requires an internet connection. The page will reload automatically when you reconnect.',
    },
    inactive: {
      icon:     '🔒',
      badge:    '⛔ Website Inactive',
      heading:  'This website is currently inactive.',
      subtitle: 'The school administrator has deactivated this website. Please raise a support ticket to reactivate it.',
    },
    expired: {
      icon:     '⏰',
      badge:    '⚠ Subscription Expired',
      heading:  'Your subscription has expired.',
      subtitle: 'Renew your EdDesk subscription to restore access to this website.',
    },
  };

  const config = VARIANT_CONFIG[variant];

─────────────────────────────────────────────────────────────
1F. Update the JSX to use config map values
─────────────────────────────────────────────────────────────

In the JSX, replace every hardcoded conditional with config values:

  Icon circle content:
    BEFORE: {isEmpty ? '⚙️' : '⚡'}
    AFTER:  {config.icon}

  Badge text:
    BEFORE: {isEmpty ? '⚙ Not Configured' : '⚠ Connection Error'}
    AFTER:  {config.badge}

  Heading:
    BEFORE: {isEmpty ? 'Your website data...' : "We couldn't load..."}
    AFTER:  {config.heading}

  Subtitle:
    BEFORE: {isEmpty ? 'Set up your school...' : 'A server or network error...'}
    AFTER:  {config.subtitle}

─────────────────────────────────────────────────────────────
1G. Update the buttons section for all 5 variants
─────────────────────────────────────────────────────────────

Replace the existing buttons block (currently: isEmpty ? adminLink : retryButtons)
with a variant-aware block:

  {/* ── Buttons ── */}
  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>

    {/* empty → Go to Admin Panel */}
    {variant === 'empty' && (
      <a href="https://admin.eddesk.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <button style={primaryButtonStyle(accent)}>
          Go to Admin Panel →
        </button>
      </a>
    )}

    {/* error → Retry + Refresh */}
    {variant === 'error' && (
      <>
        {onRetry && (
          <button onClick={onRetry} style={primaryButtonStyle(accent)}>
            ↺ Retry
          </button>
        )}
        <button onClick={() => window.location.reload()} style={secondaryButtonStyle}>
          ⟳ Refresh Page
        </button>
      </>
    )}

    {/* network_error → waiting message, no button (auto-reloads) */}
    {variant === 'network_error' && (
      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
        {isOnline ? 'Reloading...' : 'Waiting for connection...'}
      </p>
    )}

    {/* inactive → Raise a Ticket */}
    {variant === 'inactive' && (
      <a href="https://admin.eddesk.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <button style={primaryButtonStyle(accent)}>
          Raise a Support Ticket →
        </button>
      </a>
    )}

    {/* expired → Renew Subscription */}
    {variant === 'expired' && (
      <a href="https://admin.eddesk.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <button style={primaryButtonStyle(accent)}>
          Renew Subscription →
        </button>
      </a>
    )}

  </div>

─────────────────────────────────────────────────────────────
1H. Extract button style helpers (reduce repetition)
─────────────────────────────────────────────────────────────

Add these two style helpers above the return statement to avoid
repeating inline style objects. These are plain objects, not components.

  const primaryButtonStyle = (a: typeof accent): React.CSSProperties => ({
    padding: '0.7rem 1.75rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '0.875rem',
    background: `linear-gradient(135deg, ${a.dark} 0%, ${a.hex} 100%)`,
    color: '#fff',
    boxShadow: `0 4px 20px rgba(${a.h}, 0.4)`,
    letterSpacing: '0.01em',
    fontFamily: 'inherit',
  });

  const secondaryButtonStyle: React.CSSProperties = {
    padding: '0.7rem 1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(148,163,184,0.2)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.875rem',
    background: 'rgba(255,255,255,0.04)',
    color: '#94a3b8',
    letterSpacing: '0.01em',
    fontFamily: 'inherit',
  };

─────────────────────────────────────────────────────────────
1I. Update the admin link pill (shown above buttons for relevant variants)
─────────────────────────────────────────────────────────────

The current code shows an admin link pill only for 'empty'.
Update to show it for 'empty', 'inactive', and 'expired':

  BEFORE: {isEmpty && ( <div>..admin link pill..</div> )}
  AFTER:  {(variant === 'empty' || variant === 'inactive' || variant === 'expired') && (
    <div style={{ marginBottom: '1.5rem' }}>
      <a
        href="https://admin.eddesk.in"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...existing pill styles... }}
      >
        <span style={{ fontSize: '0.75rem' }}>🔗</span>
        admin.eddesk.in
        <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>↗</span>
      </a>
    </div>
  )}

─────────────────────────────────────────────────────────────
1J. Update the error detail box condition
─────────────────────────────────────────────────────────────

The monospace error detail box should only show for 'error' variant:

  BEFORE: {!isEmpty && errorMessage && ( ...detail box... )}
  AFTER:  {variant === 'error' && errorMessage && ( ...detail box... )}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type:
  [ ] PopupVariant = 'empty' | 'error' | 'network_error' | 'inactive' | 'expired'

Existing variants — must be unchanged:
  [ ] variant='empty'  → indigo color, ⚙️ icon, admin panel button, unchanged
  [ ] variant='error'  → red color, ⚡ icon, retry + refresh buttons, unchanged

New variants:
  [ ] variant='network_error' → yellow color, 📡 icon, no button
  [ ] variant='network_error' → useEffect adds online/offline listeners
  [ ] variant='network_error' → window.addEventListener('online', reload) present
  [ ] variant='network_error' → subtitle changes when isOnline becomes true
  [ ] variant='inactive'  → red color, 🔒 icon, "Raise a Support Ticket" button → admin.eddesk.in
  [ ] variant='inactive'  → no dismiss button, no retry button
  [ ] variant='expired'   → orange color, ⏰ icon, "Renew Subscription" button → admin.eddesk.in
  [ ] variant='expired'   → no dismiss button, no retry button

Config map:
  [ ] ACCENT_MAP has entries for all 5 variants
  [ ] PULSE_ANIM has entries for all 5 variants
  [ ] VARIANT_CONFIG has entries for all 5 variants
  [ ] ed-pulse-yellow keyframe added to KEYFRAMES string
  [ ] ed-pulse-orange keyframe added to KEYFRAMES string

Safety:
  [ ] online/offline listeners removed on unmount (cleanup in useEffect return)
  [ ] isOnline state only active when variant === 'network_error'
  [ ] admin link pill shown for empty, inactive, expired only
  [ ] error detail box shown for error variant only
  [ ] No other files modified

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File modified:    src/components/system/SystemPopup.tsx
  Other files:      NONE

  Variants added:   network_error | inactive | expired
  Variants kept:    empty (unchanged) | error (unchanged)

  New behaviors:
    network_error   → online listener → auto-reload on reconnect
    inactive        → admin link only, no dismiss
    expired         → admin link only, no dismiss

  Keyframes added:  ed-pulse-yellow, ed-pulse-orange
  Guardrails:       NONE violated
