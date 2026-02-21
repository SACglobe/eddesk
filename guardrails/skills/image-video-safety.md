---
name: image-video-safety
skill: 21
description: >
  Read this skill BEFORE touching any image or video element in any template.
  Covers: hero sliders, principal portraits, faculty cards, gallery grids,
  facility images, achievement images, and any other media in templates.
  Defines required CSS, forbidden CSS, and container rules for every
  media pattern in the EdDesk template system.
files:
  - Any template file containing <img> or <video> elements
version: 1.0
---

# Skill 21: Image & Video Safety

## Why This Skill Exists

Admin users upload images with unpredictable aspect ratios:
- A principal photo might be landscape (phone selfie) or portrait (ID photo)
- A hero image might be 1:1, 16:9, or 4:3
- A facility photo might be vertical or horizontal

Templates are designed with fixed containers. If an image is allowed to
define its own size, it WILL break the layout. This skill prevents that.

---

## The Two Non-Negotiable Rules

**Rule 1 — The container controls the size, never the image.**
Every image and video must live inside a container with a fixed
height OR a fixed aspect ratio. The media fills the container,
not the other way around.

**Rule 2 — object-cover is mandatory. object-contain is forbidden.**
`object-cover` fills the container and clips the excess.
`object-contain` shows letterboxing (black bars) and breaks design.

---

## Required CSS Patterns by Context

### Full-Screen Hero (image or video)

Container:
```
h-[85vh] | h-screen | h-[600px]   ← fixed height
w-full                             ← full width
overflow-hidden                    ← clips media at boundary
relative                           ← for absolute children
```

Image element:
```
absolute inset-0
w-full h-full
object-cover
object-center                      ← center crop for landscapes
```

Video element:
```
w-full h-full
object-cover
object-center
autoPlay muted loop playsInline    ← always all 4 attributes
```

Background-image div (CSS approach, used in template_modern):
```
absolute inset-0
bg-cover
bg-center
```
This approach is inherently safe — CSS handles crop automatically.

---

### Portrait Image (principal, faculty, board member)

These are photos of people. The face must always be visible.

Container:
```
overflow-hidden                    ← REQUIRED
aspect-[3/4] | aspect-[4/5]       ← portrait ratio locks the frame
  OR fixed height: h-[500px]
relative                           ← if using absolute child
```

Image element:
```
w-full h-full
object-cover
object-top                         ← REQUIRED — anchors to face/top
```

Why `object-top`: If a landscape photo is uploaded into a portrait
container, `object-center` crops the middle (often the chest).
`object-top` ensures the face is always shown.

---

### Circular Thumbnail (principal small photo, avatar)

Container shape:
```
w-[N]px h-[N]px                   ← equal width and height
rounded-full                       ← creates the circle clip
overflow-hidden                    ← REQUIRED even with rounded-full
```

Image element:
```
w-full h-full
object-cover
object-top                         ← face stays visible
```

---

### Landscape Card Image (facility, campus, achievement, event)

Container:
```
overflow-hidden                    ← REQUIRED
aspect-video | aspect-[16/9]       ← landscape ratio
  OR aspect-[3/2]
relative
```

Image element:
```
w-full h-full
object-cover
object-center                      ← center crop is fine for places/objects
```

---

### Square Gallery Thumbnail

Container:
```
overflow-hidden                    ← REQUIRED
aspect-square                      ← locks to 1:1
```

Image element:
```
w-full h-full
object-cover
object-center
```

---

## Forbidden CSS (Never Use)

```
object-contain      ← shows letterboxing, breaks design
object-fill         ← stretches image, breaks design
object-none         ← no scaling, breaks layout
width: auto         ← image defines its own width
height: auto        ← image defines its own height (unless inside fixed container)
max-width: none     ← removes size constraint
```

---

## Container Checklist (Run Before Every Image/Video)

Before writing or editing any image or video element, confirm:

- [ ] Container has `overflow-hidden`
- [ ] Container has fixed height OR fixed aspect ratio
- [ ] Image/video has `object-cover` (never `object-contain`)
- [ ] Portrait photos of people use `object-top`
- [ ] Landscape/place photos use `object-center`
- [ ] Video has `autoPlay muted loop playsInline` (all 4)
- [ ] No width/height set directly on `<img>` or `<video>` tag itself
      (let the container control size via w-full h-full)

---

## When Adding NEW Image/Video to a Section

If a section binding prompt asks you to add a new image or video
that didn't exist before, follow this sequence:

1. Identify which pattern applies (hero / portrait / card / gallery)
2. Wrap in a container with the correct pattern above
3. Apply the correct image/video CSS
4. DO NOT skip overflow-hidden
5. DO NOT use object-contain

---

## When Replacing Hardcoded src with Dynamic Data

When changing:
  `src="school/image/principal.png"`
to:
  `src={principal?.photoUrl ?? 'school/image/principal.png'}`

The CSS classes on the `<img>` tag must NOT change.
The container must NOT change.
Only the `src` attribute changes.

If the existing image is MISSING `object-cover` or `overflow-hidden`
on its container — ADD them as part of the binding task.
This is not a scope violation — it is a required safety fix.

---

## Quick Reference Table

| Section | Container | object-position |
|---|---|---|
| Hero full-screen | h-screen overflow-hidden | object-center |
| Hero video | h-screen overflow-hidden | object-center |
| Principal large | aspect-[4/5] overflow-hidden | object-top |
| Principal circle | w-24 h-24 rounded-full overflow-hidden | object-top |
| Faculty card | aspect-[3/4] overflow-hidden | object-top |
| Facility / Campus | aspect-video overflow-hidden | object-center |
| Achievement | aspect-[4/3] overflow-hidden | object-center |
| Gallery thumb | aspect-square overflow-hidden | object-center |
| Event card | aspect-video overflow-hidden | object-center |

---

## Stop Conditions

- Any image uses `object-contain` → STOP, replace with `object-cover`
- Any image container is missing `overflow-hidden` → ADD it before proceeding
- Any `<video>` is missing `muted` → ADD it (browser blocks autoplay without muted)
- Any `<video>` is missing `playsInline` → ADD it (required for iOS)
- Image width or height set directly on `<img>` tag without w-full h-full → FIX it
