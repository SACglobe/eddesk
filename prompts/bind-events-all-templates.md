# EdDesk — Bind Upcoming Events Section → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded event data in modern + premium, and CREATE a new
#   events section in classic. Filter to featured upcoming events only.
#
# DATA SOURCE:
#   data.events[]  — filter:
#     isFeatured === true
#     AND event is in the future: combine eventDate + startTime > now
#
#   data.homepageSections[]  — gate:
#     sectionKey === 'events' AND isEnabled → show section
#     isEnabled === false → hide entire section, render nothing
#
# UPCOMING FILTER LOGIC (use in ALL templates):
#   const now = new Date();
#   const upcomingFeaturedEvents = (data?.events ?? [])
#     .filter(e => {
#       if (!e.isFeatured) return false;
#       // Combine eventDate (YYYY-MM-DD) + startTime (HH:MM:SS) into DateTime
#       const eventDateTime = new Date(`${e.eventDate}T${e.startTime}`);
#       return eventDateTime > now;
#     })
#     .sort((a, b) => {
#       const aTime = new Date(`${a.eventDate}T${a.startTime}`).getTime();
#       const bTime = new Date(`${b.eventDate}T${b.startTime}`).getTime();
#       return aTime - bTime;  // ascending: soonest first
#     });
#   // Display up to 3 on homepage
#   const eventsToShow = upcomingFeaturedEvents.slice(0, 3);
#
# SECTION GATE:
#   const eventsEnabled = (data?.homepageSections ?? [])
#     .find(s => s.sectionKey === 'events')
#     ?.isEnabled ?? true;
#   If eventsEnabled false OR eventsToShow empty → render null
#
# DATE FORMATTING:
#   From: eventDate = '2026-02-21' + startTime = '08:30:00'
#   Templates need: month abbreviation ("FEB"), day number ("21")
#   Use this helper (define once per template file):
#
#   const formatEventDate = (dateStr: string) => {
#     const d = new Date(dateStr + 'T00:00:00'); // avoid timezone shift
#     return {
#       month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
#       day: d.getDate().toString()
#     };
#   };
#
# FIELDS USED:
#   e.eventDate   → date display (month + day)
#   e.startTime   → used in filter, NOT displayed on homepage
#   e.category    → badge/category label
#   e.title       → event heading
#   e.description → event detail paragraph
#   e.location    → NOT shown on homepage (inner page only)
#
# PREREQUISITE: unify-data-shape.md must be completed first.
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — CREATE events section → template_classic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_classic/index.tsx
  - src/templates/template_classic/screens/HomeScreen.js

Forbidden: mockData.js and all other files.

─────────────────────────────────────────────────────────────
PHASE 1 — Classic has NO events section — additive only
─────────────────────────────────────────────────────────────
The classic template currently ends at the gallery/portrait section
followed by <style jsx> and </div> closing.

A NEW events section must be inserted AFTER the gallery section
and BEFORE the <style jsx> block.

─────────────────────────────────────────────────────────────
PHASE 2 — Design spec (match classic theme)
─────────────────────────────────────────────────────────────
Classic design language:
  - bg-white or bg-slate-50 backgrounds
  - emerald-900 accents (borders, headings, dots)
  - uppercase tracking-widest serif headings
  - No rounded corners (sharp edges)
  - Small "eyebrow" labels in text-emerald-600
  - h-1 w-20 bg-emerald-900 divider lines

New section design for events (matches classic perfectly):

  <section className="py-24 bg-white border-t border-slate-100">
    <div className="max-w-[1600px] mx-auto px-2 md:px-6">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <span className="text-[10px] text-emerald-600 font-bold uppercase
                           tracking-[0.4em] block mb-4">Upcoming Events</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase
                         tracking-widest serif mb-2">Events & Activities</h2>
          <div className="h-1 w-20 bg-emerald-900"></div>
        </div>
        <Link
          href="/events"
          className="mt-6 md:mt-0 text-[10px] font-bold uppercase tracking-[0.3em]
                     text-emerald-900 border-b border-emerald-900 pb-1
                     hover:text-emerald-700 transition-colors"
        >
          View Full Calendar
        </Link>
      </div>

      {/* Event List */}
      <div className="divide-y divide-slate-100">
        {eventsToShow.map((event, i) => {
          const { month, day } = formatEventDate(event.eventDate);
          return (
            <div key={event.id}
                 className="py-10 flex flex-col md:flex-row md:items-center
                            gap-8 group hover:bg-slate-50 px-4 transition-colors">

              {/* Date Block */}
              <div className="flex-shrink-0 w-24 text-center">
                <div className="text-emerald-900 font-bold text-xs uppercase
                                tracking-widest">{month}</div>
                <div className="text-4xl font-bold serif text-slate-900
                                group-hover:text-emerald-900 transition-colors">
                  {day}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-16 bg-slate-200"></div>

              {/* Content */}
              <div className="flex-grow">
                <span className="text-[10px] text-emerald-600 font-bold uppercase
                                 tracking-[0.2em] block mb-2">{event.category}</span>
                <h3 className="text-xl font-bold text-slate-900 serif uppercase
                               tracking-tight mb-2 group-hover:text-emerald-900
                               transition-colors">
                  {event.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <Link
                  href="/events"
                  className="w-10 h-10 border border-slate-200 flex items-center
                             justify-center group-hover:border-emerald-900
                             group-hover:bg-emerald-900 transition-all"
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-white
                                  transition-colors"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — derive events and pass to HomeScreen:

   const eventsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'events')
     ?.isEnabled ?? true;

   const now = new Date();
   const eventsToShow = (data?.events ?? [])
     .filter(e => {
       if (!e.isFeatured) return false;
       const eventDateTime = new Date(`${e.eventDate}T${e.startTime}`);
       return eventDateTime > now;
     })
     .sort((a, b) =>
       new Date(`${a.eventDate}T${a.startTime}`).getTime() -
       new Date(`${b.eventDate}T${b.startTime}`).getTime()
     )
     .slice(0, 3);

   Pass to HomeScreen:
   <HomeScreen data={data} ... eventsEnabled={eventsEnabled}
               eventsToShow={eventsToShow} />

2. HomeScreen.js — accept new props:
   Add: eventsEnabled, eventsToShow to props.

3. Add formatEventDate helper at the top of the component function
   (after the props destructure):
   const formatEventDate = (dateStr) => {
     const d = new Date(dateStr + 'T00:00:00');
     return {
       month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
       day: d.getDate().toString()
     };
   };

4. Insert the new events section JSX AFTER the gallery section
   (after the </section> closing the portrait carousel)
   and BEFORE the <style jsx> block.

   Wrap in gate:
   {eventsEnabled && eventsToShow.length > 0 && (
     <section className="py-24 bg-white border-t border-slate-100">
       ...events JSX from Phase 2...
     </section>
   )}

5. Nothing else changes. No existing sections are modified.

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Events section is NEW — additive only, no existing section changed
  - [ ] eventsToShow derived: isFeatured === true AND future datetime
  - [ ] Sorted: soonest first
  - [ ] Sliced to 3
  - [ ] eventsEnabled gates section
  - [ ] formatEventDate used for month+day display
  - [ ] event.category displayed as emerald eyebrow label
  - [ ] event.title displayed as bold serif heading
  - [ ] event.description displayed
  - [ ] Section inserted after gallery, before <style jsx>
  - [ ] Classic design language followed (sharp edges, emerald-900, serif)
  - [ ] "View Full Calendar" link to /events
  - [ ] No other section changed

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Events Section Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx       derives eventsToShow, passes to HomeScreen
  src/templates/template_classic/screens/HomeScreen.js  NEW section inserted

Action:                     NEW SECTION — additive, nothing removed
Filter:                     isFeatured === true AND eventDate+startTime > now
Sort:                       soonest first
Display count:              slice(0, 3)
Section gate:               YES — sectionKey 'events'
formatEventDate helper:     YES — month + day extracted
Classic theme matched:      YES (emerald-900, serif, uppercase, sharp)
CSS:                        N/A (new section)
Guardrails violated:        NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind events → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_modern/index.tsx
  - src/templates/template_modern/app/page.tsx

Forbidden: constants.tsx and all other files.

─────────────────────────────────────────────────────────────
PHASE 1 — What the events section currently does
─────────────────────────────────────────────────────────────
In page.tsx, inside the Gallery + Upcoming Events section (bg-gray-50 py-24):
  Right column: lg:col-span-1 (one third of the 3-col grid)
  Data: UPCOMING_EVENTS imported from constants.tsx
  Item shape: { id, title, date (string "Oct 15, 2024"), description, category }

  Each card renders:
    - Date box (bg-primary): month abbrev + day number from event.date.split(' ')
    - Category badge (text-blue-600 bg-blue-50 rounded-full)
    - event.title as heading
    - event.description as paragraph

  IMPORTANT: event.date is currently a FORMATTED STRING like "Oct 15, 2024".
  New data has: eventDate = '2026-02-21' and startTime = '08:30:00' as separate fields.
  The date box uses: event.date.split(' ')[0] for month, event.date.split(' ')[1] for day.
  This split logic MUST be replaced with formatEventDate helper.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. Remove UPCOMING_EVENTS from the import at file top:
   Before: import { SCHOOL_NAME, STATS, ACTIVITIES, UPCOMING_EVENTS, ANNOUNCEMENTS } from '../constants';
   After:  import { SCHOOL_NAME, STATS, ACTIVITIES, ANNOUNCEMENTS } from '../constants';

2. Derive events inside Home component:
   const eventsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'events')
     ?.isEnabled ?? true;

   const now = new Date();
   const eventsToShow = (data?.events ?? [])
     .filter(e => {
       if (!e.isFeatured) return false;
       const eventDateTime = new Date(`${e.eventDate}T${e.startTime}`);
       return eventDateTime > now;
     })
     .sort((a, b) =>
       new Date(`${a.eventDate}T${a.startTime}`).getTime() -
       new Date(`${b.eventDate}T${b.startTime}`).getTime()
     )
     .slice(0, 3);

3. Add formatEventDate helper inside Home component:
   const formatEventDate = (dateStr: string) => {
     const d = new Date(dateStr + 'T00:00:00');
     return {
       month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
       day: d.getDate().toString()
     };
   };

4. Replace UPCOMING_EVENTS.map with eventsToShow.map.
   Update field references and date handling:

   Before:
     {UPCOMING_EVENTS.map((event) => (
       ...
       {event.date.split(' ')[0]}         ← month
       {event.date.split(' ')[1].replace(',', '')}  ← day
       {event.category}
       {event.title}
       {event.description}

   After:
     {eventsToShow.map((event) => {
       const { month, day } = formatEventDate(event.eventDate);
       return (
         <div key={event.id} ...>
           ...
           {month}       ← from formatEventDate
           {day}         ← from formatEventDate
           {event.category}
           {event.title}
           {event.description}
         </div>
       );
     })}

5. Gate the Upcoming Events column:
   The gallery and events live in the SAME section (bg-gray-50 py-24).
   Gate only the events column, NOT the full section (gallery must still show).
   Wrap the right column div:
   Before: <div className="space-y-12 text-left">  ← events column
   After:  {eventsEnabled && eventsToShow.length > 0 ? (
             <div className="space-y-12 text-left">
               ...events content...
             </div>
           ) : <div></div>}
   Note: empty div preserves the 3-col grid layout even when events are hidden.

WHAT DOES NOT CHANGE:
  - The shared section (bg-gray-50 py-24) with gallery
  - The date box styling (bg-primary, rounded-2xl)
  - The category badge (rounded-full, blue)
  - The card layout (bg-white, rounded-[2rem], shadow-xl)
  - The "View Full Calendar" link at bottom
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] UPCOMING_EVENTS removed from import
  - [ ] eventsToShow derived: isFeatured AND future datetime
  - [ ] Sorted soonest first, sliced to 3
  - [ ] formatEventDate helper added
  - [ ] event.date.split() replaced with formatEventDate(event.eventDate)
  - [ ] event.category, event.title, event.description used
  - [ ] eventsEnabled gates events column only (NOT gallery)
  - [ ] Empty div placeholder preserves grid when events hidden
  - [ ] "View Full Calendar" link preserved
  - [ ] All CSS classes unchanged
  - [ ] No other section changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Events Section Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx  reads from data.events

UPCOMING_EVENTS import removed:  YES
Filter:                          isFeatured AND eventDate+startTime > now
Sort:                            soonest first
Display count:                   slice(0, 3)
Section gate:                    events column only (gallery preserved)
formatEventDate:                 YES
date.split() replaced:           YES → formatEventDate(event.eventDate)
CSS changed:                     NO
Guardrails violated:             NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind events → template_premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_premium/index.tsx
  - src/templates/template_premium/app/page.tsx

Forbidden: data.ts, Shared.tsx, Navigation.tsx.

─────────────────────────────────────────────────────────────
PHASE 1 — What the events section currently does
─────────────────────────────────────────────────────────────
UpcomingEvents is a standalone component at the top of page.tsx.
It accepts NO props — reads from schoolData.events directly.
schoolData.events item shape: { id, title, description, date (string "FEB 24, 2024"), category }

The component renders:
  - bg-signature-navy dark section
  - SectionHeader "Upcoming Events" / "Institutional Engagements" (light center)
  - Each event as a grid row (12-col):
      col-span-3: date in signature-gold italic serif + category in white/40
      col-span-7: title as serif h3 + description paragraph
      col-span-2: arrow circle (border-white/10)
  - event.date.split(',')[0] used for date display (e.g. "FEB 24")
  - Whole row is a Link to /events
  - useIntersectionObserver for stagger animation
  - "View Full Calendar" button at bottom

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. UpcomingEvents must receive props:

   interface EventItem {
     id: string; eventDate: string; startTime: string;
     category: string; title: string; description: string;
   }
   interface UpcomingEventsProps {
     eventsToShow: EventItem[];
     eventsEnabled: boolean;
   }
   const UpcomingEvents: React.FC<UpcomingEventsProps> =
     ({ eventsToShow, eventsEnabled }) => {

2. Inside UpcomingEvents:
   - Remove: const events = schoolData.events.slice(0, 3);
   - Add early return: if (!eventsEnabled || eventsToShow.length === 0) return null;
   - Replace events.map with eventsToShow.map

3. Add formatEventDate helper inside UpcomingEvents:
   const formatEventDate = (dateStr: string) => {
     const d = new Date(dateStr + 'T00:00:00');
     const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
     const day = d.getDate();
     return `${month} ${day}`;  // e.g. "FEB 21"
   };

4. In Home component — derive eventsToShow:
   const eventsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'events')
     ?.isEnabled ?? true;

   const now = new Date();
   const eventsToShow = (data?.events ?? [])
     .filter(e => {
       if (!e.isFeatured) return false;
       const eventDateTime = new Date(`${e.eventDate}T${e.startTime}`);
       return eventDateTime > now;
     })
     .sort((a, b) =>
       new Date(`${a.eventDate}T${a.startTime}`).getTime() -
       new Date(`${b.eventDate}T${b.startTime}`).getTime()
     )
     .slice(0, 3);

5. Pass to UpcomingEvents:
   Before: <UpcomingEvents />
   After:  <UpcomingEvents eventsToShow={eventsToShow} eventsEnabled={eventsEnabled} />

6. Update field references inside UpcomingEvents:

   Before: {event.date.split(',')[0]}   ← formatted string date
   After:  {formatEventDate(event.eventDate)}  ← derived from eventDate field

   Before: {event.category}   → keep as {event.category}
   Before: {event.title}      → keep as {event.title}
   Before: {event.description} → keep as {event.description}

   Before key: key={event.id}  → keep as key={event.id}

WHAT DOES NOT CHANGE:
  - The dark navy section background
  - The SectionHeader (light center variant)
  - The 12-column grid row layout
  - The signature-gold italic serif date styling
  - The arrow circle button
  - The useIntersectionObserver stagger animation
  - The "View Full Calendar" button
  - schoolData import (still used by other sections in Home)
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] UpcomingEvents accepts eventsToShow + eventsEnabled props
  - [ ] schoolData.events removed from inside UpcomingEvents
  - [ ] Early return if not enabled OR eventsToShow empty
  - [ ] formatEventDate helper defined inside component
  - [ ] event.date.split() replaced with formatEventDate(event.eventDate)
  - [ ] eventsToShow.map used (not events.map)
  - [ ] event.category, title, description used
  - [ ] Home derives eventsToShow with isFeatured + future filter
  - [ ] Sorted soonest first, sliced to 3
  - [ ] schoolData import NOT removed (still used elsewhere)
  - [ ] isVisible animation preserved
  - [ ] "View Full Calendar" button preserved
  - [ ] All CSS classes unchanged
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Events Section Report — template_premium

Files changed:
  src/templates/template_premium/app/page.tsx  UpcomingEvents reads from props

UpcomingEvents now accepts props:   YES
schoolData.events removed:         YES (from UpcomingEvents only)
schoolData import kept:            YES (used by other sections)
Filter:                            isFeatured AND eventDate+startTime > now
Sort:                              soonest first
Display count:                     slice(0, 3)
Section gate:                      early return if disabled or empty
formatEventDate helper:            YES — returns "MMM DD" string
date.split() replaced:             YES → formatEventDate(event.eventDate)
isVisible animation preserved:     YES
CSS changed:                       NO
Guardrails violated:               NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
