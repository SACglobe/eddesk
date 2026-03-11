/**
 * template-boundaries.js
 *
 * Enforces two rules depending on what kind of PR this is:
 *
 * RULE A — Template-only PR (only src/templates/ files changed):
 *   → Only ONE template may be modified.
 *   → No core/service/page files allowed alongside template changes.
 *   → Exception: src/lib/template/registry.ts is always allowed.
 *
 * RULE B — Core PR (non-template files are also changed):
 *   → Template changes are allowed IF the same relative files are
 *     modified in ALL three templates (coordinated change).
 *   → If only a subset of templates is touched, it fails —
 *     a partial coordinated change is a mistake.
 *   → Core files (services, viewmodels, pages, etc.) are unrestricted.
 *
 * This handles:
 *   ✅ Single template feature PR       (template_modern only)
 *   ✅ Phase/core PR with data binding  (all 3 templates + core files)
 *   ❌ Two templates changed, no core   (likely a mistake — split the PR)
 *   ❌ One template changed + core      (ambiguous — is this intentional?)
 */

import fs from 'fs'

const ALL_TEMPLATES = ['template_classic', 'template_modern', 'template_premium']

const files = JSON.parse(fs.readFileSync('.changed-files.json', 'utf-8'))

const templatePaths = files.filter(f => f.startsWith('src/templates/'))
const corePaths = files.filter(f => !f.startsWith('src/templates/'))

const touchedTemplates = new Set(
  templatePaths.map(p => p.split('/')[2])
)

const allowedExtra = [
  'src/lib/template/registry.ts',
]

// ── No template files changed at all → nothing to check ───────────────────
if (touchedTemplates.size === 0) {
  console.log('✅ No template files modified — boundary check skipped')
  process.exit(0)
}

// ── Determine PR type ──────────────────────────────────────────────────────
const coreFiles = corePaths.filter(f => !allowedExtra.includes(f))
const isCoreAndTemplatePR = coreFiles.length > 0

// ── RULE B: Core + Template PR ────────────────────────────────────────────
if (isCoreAndTemplatePR) {
  // All three templates must be touched — partial is a mistake
  const missingTemplates = ALL_TEMPLATES.filter(t => !touchedTemplates.has(t))

  if (missingTemplates.length > 0 && touchedTemplates.size > 0) {
    console.error('❌ Core + partial template change detected.')
    console.error('   Templates modified:', [...touchedTemplates])
    console.error('   Templates missing: ', missingTemplates)
    console.error('')
    console.error('   When changing core files alongside templates, ALL three')
    console.error('   templates must receive the same update (coordinated change).')
    console.error('   Either update the missing templates, or split this into')
    console.error('   a core-only PR and separate per-template PRs.')
    process.exit(1)
  }

  // Verify the change is actually symmetric — same relative paths in each template
  const relativePathsPerTemplate = {}
  for (const t of ALL_TEMPLATES) {
    relativePathsPerTemplate[t] = templatePaths
      .filter(f => f.startsWith(`src/templates/${t}/`))
      .map(f => f.replace(`src/templates/${t}/`, ''))
      .sort()
  }

  const [first, ...rest] = ALL_TEMPLATES
  const baselinePaths = relativePathsPerTemplate[first].join(',')

  for (const t of rest) {
    const thisPaths = relativePathsPerTemplate[t].join(',')
    if (thisPaths !== baselinePaths) {
      console.error('❌ Asymmetric coordinated change detected.')
      console.error(`   ${first}: ${relativePathsPerTemplate[first].join(', ')}`)
      console.error(`   ${t}:     ${relativePathsPerTemplate[t].join(', ')}`)
      console.error('')
      console.error('   A coordinated change must modify the same relative files')
      console.error('   in every template. Check that all three templates received')
      console.error('   the identical structural update.')
      process.exit(1)
    }
  }

  console.log('✅ Coordinated change across all templates — boundaries OK')
  console.log('   Templates:', [...touchedTemplates].join(', '))
  console.log('   Core files changed:', coreFiles.length)
  process.exit(0)
}

// ── RULE A: Template-only PR ───────────────────────────────────────────────
if (touchedTemplates.size > 1) {
  console.error('❌ Multiple templates modified in a template-only PR:', [...touchedTemplates])
  console.error('')
  console.error('   Template-only PRs must touch exactly one template.')
  console.error('   If this is intentional (e.g. fixing a shared bug), also')
  console.error('   modify at least one core file to signal a coordinated change.')
  process.exit(1)
}

// Single template — verify no forbidden non-template files slipped in
for (const file of corePaths) {
  if (allowedExtra.includes(file)) continue
  console.error('❌ Forbidden non-template file modified in template-only PR:', file)
  console.error('')
  console.error('   Template-only PRs may only touch src/templates/<name>/ files')
  console.error('   and src/lib/template/registry.ts.')
  console.error('   Move core changes to a separate PR.')
  process.exit(1)
}

console.log('✅ Template boundaries OK — single template PR:', [...touchedTemplates][0])