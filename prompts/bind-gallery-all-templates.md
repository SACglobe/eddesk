# EdDesk — Bind Gallery (Campus Masterpiece) Section → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded gallery/campus images in all 3 templates with live
#   data from TenantViewModel.mediaLibrary[], filtered to campus featured
#   items, gated by the sections array. Supports both image and video.
#
# DATA SOURCE:
#   data.mediaLibrary[]  — filter:
#     category === 'campus'   ← only campus-category media shown here
#     isFeatured === true     ← only featured items on homepage
#
#   data.homepageSections[]  — gate:
#     sectionKey === 'gallery' AND isEnabled → show section
#     isEnabled === false → hide entire section, render nothing
#
# FILTER LOGIC (identical in all 3 templates):
#   const gallerySection = (data?.homepageSections ?? [])
#     .find(s => s.sectionKey === 'gallery');
#   const galleryEnabled = gallerySection?.isEnabled ?? true;
#   const galleryItems = (data?.mediaLibrary ?? [])
#     .filter(m => m.category === 'campus' && m.isFeatured);
#   // Note: 'campus' is lowercase — no .toLowerCase() needed
#   If galleryEnabled false OR galleryItems empty → render null
#
# FIELDS USED:
#   m.url         → image src or video src
#   m.mediaType   → 'image' | 'video'  (determines which element to render)
#   m.caption     → alt text for image, aria-label for video; also used as title in premium
#   m.category    → already filtered, not displayed (CSS uppercase class if needed)
#
# MEDIA TYPE HANDLING — CRITICAL (Skill 21 applies):
#   Every item must check m.mediaType before rendering:
#
#   For IMAGE (m.mediaType === 'image'):
#     <img
#       src={m.url}
#       alt={m.caption ?? ''}
#       className="w-full h-full object-cover object-center [hover classes]"
#     />
#
#   For VIDEO (m.mediaType === 'video'):
#     <video
#       src={m.url}
#       autoPlay muted loop playsInline
#       className="w-full h-full object-cover object-center"
#     />
#     Note: autoPlay muted loop playsInline — ALL FOUR are mandatory.
#     Videos do not show caption overlay — keep it clean.
#
#   Placeholder (when url is empty/null):
#     <div className="w-full h-full flex items-center justify-center bg-[color]">
#       <svg ... image/photo placeholder icon ... />
#     </div>
#
#   Photo placeholder SVG (inline, no deps):
#     <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 opacity-30"
#          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
#       <path strokeLinecap="round" strokeLinejoin="round"
#         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586
#            a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6
#            a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
#     </svg>
#
# IMAGE/VIDEO CONTAINER SAFETY (Skill 21 rules):
#   Classic:   aspect-square overflow-hidden → already correct ✅
#   Modern:    h-80 overflow-hidden rounded-[2rem] → already correct ✅
#   Premium:   Card component uses aspect-[3/4] overflow-hidden ✅
#   Gallery items are campus/landscape photos → object-center is correct
#   DO NOT use object-top for gallery (it's for portrait photos of people)
#
# PREREQUISITE: unify-data-shape.md must be completed first.
# Read: guardrails/skills/image-video-safety.md before touching any media.
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind gallery → template_classic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/image-video-safety.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_classic/index.tsx
  - src/templates/template_classic/screens/HomeScreen.js

Forbidden: mockData.js and all other files.

─────────────────────────────────────────────────────────────
PHASE 1 — What the gallery currently does
─────────────────────────────────────────────────────────────
HomeScreen.js:
  - Reads: INFRASTRUCTURE.campus_images[] — array of URL strings
  - State: const [galleryIndex, setGalleryIndex] = useState(0)
  - Computed: totalGalleryImages = campus_images.length
  - useEffect sets a 3-second interval rotating galleryIndex
  - getVisibleImages() computes 4 visible images from galleryIndex
  - visibleGallery = getVisibleImages()

  Gallery section renders:
    4 square images in auto-scrolling carousel (col-span-4)
    + 1 static CTA cell (col-span-1) in emerald-900 bg

  Each image cell: aspect-square overflow-hidden → img src={img} (bare string)

Current problem: img is a bare URL string. New data is an object {url, mediaType, caption}.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — derive gallery items and pass to HomeScreen:

   const gallerySection = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'gallery');
   const galleryEnabled = gallerySection?.isEnabled ?? true;
   const galleryItems = (data?.mediaLibrary ?? [])
     .filter(m => m.category === 'campus' && m.isFeatured);

   Pass to HomeScreen:
   <HomeScreen data={data} ... galleryEnabled={galleryEnabled}
               galleryItems={galleryItems} />

2. HomeScreen.js — accept new props:
   Add: galleryEnabled, galleryItems to props.

3. Replace INFRASTRUCTURE.campus_images usage:
   All 3 occurrences must change:

   Before:
     const totalGalleryImages = INFRASTRUCTURE.campus_images.length;
     visible.push(INFRASTRUCTURE.campus_images[(galleryIndex + i) % totalGalleryImages]);

   After:
     const totalGalleryImages = galleryItems.length;
     visible.push(galleryItems[(galleryIndex + i) % totalGalleryImages]);

   The useEffect interval logic does NOT change — only the array it counts.

4. Update visibleGallery rendering — each item is now an OBJECT:
   Before:
     {visibleGallery.map((img, idx) => (
       <div ...><div ...>
         <img src={img} alt="Campus" className="w-full h-full object-cover ..." />
       </div></div>
     ))}

   After:
     {visibleGallery.map((item, idx) => (
       <div key={`${galleryIndex}-${idx}`} className="flex-none w-1/2 md:w-1/4 px-1">
         <div className="aspect-square overflow-hidden border border-slate-100 group relative">
           {!item?.url ? (
             <div className="w-full h-full flex items-center justify-center bg-slate-100">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-slate-300"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                 <path strokeLinecap="round" strokeLinejoin="round"
                   d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586
                      a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6
                      a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
             </div>
           ) : item.mediaType === 'video' ? (
             <video
               src={item.url}
               autoPlay muted loop playsInline
               className="w-full h-full object-cover object-center"
             />
           ) : (
             <img
               src={item.url}
               alt={item.caption ?? 'Campus'}
               className="w-full h-full object-cover object-center transition-all duration-700
                          group-hover:scale-110 cursor-pointer"
             />
           )}
         </div>
       </div>
     ))}

5. Remove INFRASTRUCTURE from MOCK_DATA destructure IF it is no
   longer used anywhere else in HomeScreen.js. Check carefully:
   - campus_images: now replaced ✓
   - labs/classrooms/playground: already replaced in facilities binding ✓
   If all usages replaced → remove INFRASTRUCTURE from destructure.
   If any remain → keep the destructure.

6. Gate the entire gallery section:
   Before: <section className="py-12 px-2">
   After:  {galleryEnabled && galleryItems.length > 0 && (
             <section className="py-12 px-2">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - The galleryIndex useState and useEffect interval logic
  - The 5-column grid layout (md:col-span-4 + col-span-1)
  - The CTA cell (emerald-900 bg, "View Full / Campus Portrait / Enter Gallery")
  - The aspect-square container and all its CSS

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] galleryItems prop received by HomeScreen
  - [ ] totalGalleryImages = galleryItems.length (not campus_images.length)
  - [ ] getVisibleImages uses galleryItems array
  - [ ] useEffect interval logic unchanged
  - [ ] Each item rendered with mediaType check (image / video / placeholder)
  - [ ] Video has autoPlay muted loop playsInline
  - [ ] Image has object-cover object-center and alt={item.caption}
  - [ ] Placeholder shows photo SVG icon (bg-slate-100)
  - [ ] galleryEnabled gates entire section
  - [ ] CTA cell unchanged
  - [ ] INFRASTRUCTURE removed from destructure (if fully unused)
  - [ ] All CSS classes unchanged
  - [ ] No other section of HomeScreen.js changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Gallery Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx       derives gallery, passes to HomeScreen
  src/templates/template_classic/screens/HomeScreen.js  reads from galleryItems prop

INFRASTRUCTURE.campus_images removed:  YES
Data source:                           data.mediaLibrary[] filtered category=campus isFeatured=true
Section gate (isEnabled):              YES — sectionKey 'gallery'
Image support:                         YES (object-cover object-center)
Video support:                         YES (autoPlay muted loop playsInline)
Placeholder:                           YES (bg-slate-100 + photo SVG)
Carousel logic preserved:              YES (galleryIndex, useEffect interval)
CTA cell unchanged:                    YES
CSS changed:                           mediaType conditional render only
Guardrails violated:                   NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind gallery → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/image-video-safety.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_modern/index.tsx
  - src/templates/template_modern/app/page.tsx

─────────────────────────────────────────────────────────────
PHASE 1 — What the gallery currently does
─────────────────────────────────────────────────────────────
In page.tsx, hardcoded const highlightImages = [...] at file top (lines 8-13).
4 bare URL strings.

Gallery renders inside a larger 2-column section alongside "Upcoming Events":
  <section className="bg-gray-50 py-24">
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2 space-y-12">  ← gallery column
        Gallery header + "View Full Gallery →" link
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlightImages.map((url, i) => (
            <div className="group overflow-hidden rounded-[2rem] relative h-80 shadow-2xl">
              <img src={url} className="..." />
              <div className="absolute inset-0 bg-gradient-to-t ..." />   ← overlay
              <div className="absolute bottom-0 p-8">                     ← text overlay
                <span>"CAMPUS LIFE"</span>
                <h4>"Moments of discovery..."</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>  ← Upcoming Events column (DO NOT TOUCH)
    </div>
  </section>

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. Remove hardcoded highlightImages array from file top.

2. Derive gallery inside Home component:
   const gallerySection = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'gallery');
   const galleryEnabled = gallerySection?.isEnabled ?? true;
   const galleryItems = (data?.mediaLibrary ?? [])
     .filter(m => m.category === 'campus' && m.isFeatured);

3. Replace highlightImages.map with galleryItems.map.
   Each item is now an object — update accordingly:

   Before: {highlightImages.map((url, i) => (
             <div className="... h-80 ...">
               <img src={url} className="w-full h-full object-cover ..." />
               <div className="gradient overlay" />
               <div>"CAMPUS LIFE" + "Moments of discovery..."</div>
             </div>
           ))}

   After:  {galleryItems.map((item, i) => (
             <div key={i} className="group overflow-hidden rounded-[2rem]
                                     relative h-80 shadow-2xl">
               {!item?.url ? (
                 <div className="w-full h-full flex items-center justify-center
                                 bg-gray-200">
                   <svg xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400"
                        fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="1">
                     <path strokeLinecap="round" strokeLinejoin="round"
                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586
                          a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6
                          a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                 </div>
               ) : item.mediaType === 'video' ? (
                 <video
                   src={item.url}
                   autoPlay muted loop playsInline
                   className="w-full h-full object-cover object-center"
                 />
               ) : (
                 <img
                   src={item.url}
                   alt={item.caption ?? 'Gallery highlight'}
                   className="w-full h-full object-cover object-center
                              group-hover:scale-110 transition-transform duration-700"
                 />
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900
                               via-transparent to-transparent opacity-90"></div>
               <div className="absolute bottom-0 p-8 text-left">
                 <span className="bg-accent text-primary px-3 py-1 rounded-full
                                  text-[10px] font-black uppercase tracking-widest
                                  mb-3 inline-block">Campus Life</span>
                 <h4 className="text-white font-bold text-xl leading-snug">
                   {item.caption ?? 'Moments of discovery and achievement captured.'}
                 </h4>
               </div>
             </div>
           ))}

   Note: caption replaces the hardcoded "Moments of discovery..." text.
   The gradient overlay and "Campus Life" badge are preserved as design elements.

4. Gate the gallery column only (NOT the full section — Upcoming Events lives
   in the same section and must always render):
   The gallery header and image grid inside lg:col-span-2 should be gated:
   Before: <div className="lg:col-span-2 space-y-12">
             Gallery header + grid
           </div>
   After:  <div className="lg:col-span-2 space-y-12">
             {galleryEnabled && galleryItems.length > 0 ? (
               <>
                 Gallery header + grid
               </>
             ) : null}
           </div>
   IMPORTANT: Do NOT gate the full <section> — Upcoming Events must still render.

WHAT DOES NOT CHANGE:
  - The full section wrapper and lg:grid-cols-3 layout
  - The Upcoming Events column (entirely untouched)
  - The gradient overlay (always shown)
  - The "Campus Life" badge (design element, not data)
  - The rounded-[2rem] container shape
  - The "View Full Gallery →" link

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] highlightImages array removed from file top
  - [ ] galleryItems derived from data.mediaLibrary in Home
  - [ ] Filter: category === 'campus' AND isFeatured === true
  - [ ] galleryEnabled gates gallery column only (NOT Upcoming Events)
  - [ ] Each item: mediaType check → image / video / placeholder
  - [ ] Video has autoPlay muted loop playsInline
  - [ ] Image has object-cover object-center
  - [ ] Placeholder bg-gray-200 with photo SVG
  - [ ] item.caption used as h4 text (with fallback)
  - [ ] Gradient overlay preserved
  - [ ] Upcoming Events column NOT changed
  - [ ] All CSS classes unchanged
  - [ ] No other section of page.tsx changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Gallery Binding Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx  reads from data.mediaLibrary

highlightImages removed:        YES
Data source:                    data.mediaLibrary[] filtered category=campus isFeatured=true
Section gate:                   gallery column only (Events column preserved)
Image support:                  YES (object-cover object-center)
Video support:                  YES (autoPlay muted loop playsInline)
Placeholder:                    YES (bg-gray-200 + photo SVG)
Caption used:                   YES (item.caption as card heading)
Upcoming Events unchanged:      YES
CSS changed:                    mediaType conditional render only
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind gallery → template_premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/image-video-safety.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_premium/index.tsx
  - src/templates/template_premium/app/page.tsx

Forbidden: data.ts, Shared.tsx, Navigation.tsx.

─────────────────────────────────────────────────────────────
PHASE 1 — What the section currently does
─────────────────────────────────────────────────────────────
In page.tsx, inside the Home return JSX:
  <section className="py-48 px-8 bg-white">
    <SectionHeader title="Campus Masterpiece" subtitle="The Sterling Experience" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {schoolData.highlights.slice(0, 3).map((h, i) => (
        <Card key={i} title={h.title} image={h.image} tag={h.tag} />
      ))}
    </div>
  </section>

Card component (from Shared.tsx — DO NOT MODIFY):
  Props: { title, image, description?, tag? }
  Renders: aspect-[3/4] overflow-hidden image → grayscale on load,
           color on hover. title as serif heading. tag as gold label.

schoolData.highlights item shape: { title, image, tag }

Our data shape: { url, mediaType, caption, category, isFeatured }
  url       → maps to image prop of Card
  caption   → maps to title prop of Card
  category  → maps to tag prop of Card (display as-is, Card uppercases it)

─────────────────────────────────────────────────────────────
PHASE 2 — The Card component limitation
─────────────────────────────────────────────────────────────
The Card component only accepts `image` as a string src — it always renders <img>.
It CANNOT natively handle video mediaType.

Strategy:
  - For mediaType === 'image': use Card component as-is (pass url as image)
  - For mediaType === 'video': render a CUSTOM inline card (NOT Card component)
    that matches Card's visual style but uses <video> instead of <img>

Custom video card (matches Card design language):
  <div className="group overflow-hidden relative bg-white border border-black/5
                  hover:border-signature-gold/40 transition-all duration-700
                  shadow-sm hover:shadow-2xl">
    <div className="aspect-[3/4] overflow-hidden relative">
      <video
        src={item.url}
        autoPlay muted loop playsInline
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-signature-navy/10
                      group-hover:bg-transparent transition-colors duration-700"></div>
    </div>
    <div className="p-10 relative bg-white">
      <div className="absolute top-0 right-10 w-px h-10 bg-signature-gold/20 -translate-y-full"></div>
      <span className="text-[9px] uppercase tracking-[0.4em] text-signature-gold font-bold mb-4 block">
        {item.category}
      </span>
      <h3 className="text-2xl font-serif mb-4 tracking-tight
                     group-hover:text-signature-gold transition-colors">
        {item.caption ?? ''}
      </h3>
    </div>
  </div>

Placeholder card (when url is empty/null):
  Same structure as video card, but inner media area shows:
  <div className="w-full h-full flex items-center justify-center bg-signature-ivory">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-signature-navy/20"
         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586
           a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6
           a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. Verify data is passed to Home from index.tsx.

2. Derive gallery in Home component:
   const gallerySection = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'gallery');
   const galleryEnabled = gallerySection?.isEnabled ?? true;
   const galleryItems = (data?.mediaLibrary ?? [])
     .filter(m => m.category === 'campus' && m.isFeatured);

3. Remove the schoolData.highlights reference from the Campus Masterpiece section.
   Check if schoolData is used elsewhere in page.tsx (principalMessage, boardMessage, events).
   Do NOT remove the schoolData import — it is still used elsewhere.
   Only remove the .highlights reference inside this one section.

4. Replace the section JSX:
   Before:
     <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
       {schoolData.highlights.slice(0, 3).map((h, i) => (
         <Card key={i} title={h.title} image={h.image} tag={h.tag} />
       ))}
     </div>

   After:
     <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
       {galleryItems.slice(0, 3).map((item, i) => {
         if (!item?.url) {
           return ( /* placeholder card */ );
         }
         if (item.mediaType === 'video') {
           return ( /* custom video card */ );
         }
         return (
           <Card
             key={i}
             title={item.caption ?? ''}
             image={item.url}
             tag={item.category}
           />
         );
       })}
     </div>

   Note: .slice(0, 3) preserves the 3-column homepage display.
   Remaining gallery items appear on the /gallery inner page.

5. Gate the entire Campus Masterpiece section:
   Before: <section className="py-48 px-8 bg-white">
   After:  {galleryEnabled && galleryItems.length > 0 && (
             <section className="py-48 px-8 bg-white">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - SectionHeader title "Campus Masterpiece" subtitle "The Sterling Experience"
  - The "Explore Enrichment" button and link
  - Card component usage for image items
  - The section's position in the page
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] schoolData.highlights replaced with galleryItems.slice(0, 3)
  - [ ] galleryItems derived from data.mediaLibrary in Home
  - [ ] Filter: category === 'campus' AND isFeatured === true
  - [ ] galleryEnabled gates entire section
  - [ ] mediaType === 'image' → Card component with url/caption/category
  - [ ] mediaType === 'video' → custom inline card with <video>
  - [ ] video has autoPlay muted loop playsInline
  - [ ] missing url → placeholder card (bg-signature-ivory + photo SVG)
  - [ ] schoolData import kept (used elsewhere)
  - [ ] schoolData.highlights reference removed only from this section
  - [ ] Card component NOT modified
  - [ ] SectionHeader and Button unchanged
  - [ ] All CSS classes unchanged
  - [ ] No other section of page.tsx changed
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Gallery Binding Report — template_premium

Files changed:
  src/templates/template_premium/app/page.tsx  Campus Masterpiece reads from data.mediaLibrary

schoolData.highlights removed:     YES (from gallery section only)
schoolData import kept:            YES (still used in other sections)
Data source:                       data.mediaLibrary[] filtered category=campus isFeatured=true
Displayed:                         slice(0, 3) — first 3 featured items
Section gate (isEnabled):          YES — sectionKey 'gallery'
Image support:                     YES — uses existing Card component
Video support:                     YES — custom inline card (matches Card design)
Placeholder:                       YES — bg-signature-ivory + photo SVG
CSS changed:                       mediaType conditional render only
Card component modified:           NO
Guardrails violated:               NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
