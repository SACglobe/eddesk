## 10. Image & Video Safety

### Core Rules

- [ ] Every `<img>` uses `object-cover` (never `object-contain` or `object-fill`)
- [ ] Every `<video>` uses `object-cover`
- [ ] Every image/video container has `overflow-hidden`
- [ ] Every image/video container has a fixed height OR fixed aspect ratio
- [ ] No image or video defines its own size (no `width: auto` or `height: auto` without a fixed container)

### object-position Rules

- [ ] Portrait photos of people (principal, faculty, board) use `object-top`
- [ ] Full-screen hero images use `object-center`
- [ ] Landscape images of places, buildings, events use `object-center`
- [ ] Circular thumbnails (avatars) use `object-top`

### Video Rules

- [ ] All `<video>` elements have `autoPlay`
- [ ] All `<video>` elements have `muted` (browser blocks autoplay without this)
- [ ] All `<video>` elements have `loop`
- [ ] All `<video>` elements have `playsInline` (required for iOS)

### Container Rules by Section

| Section | Required container CSS |
|---|---|
| Hero full-screen | `h-screen overflow-hidden` (or h-[85vh]) |
| Principal large image | `aspect-[4/5] overflow-hidden` |
| Principal circular thumb | `w-24 h-24 rounded-full overflow-hidden` |
| Faculty card | `aspect-[3/4] overflow-hidden` |
| Facility / campus | `aspect-video overflow-hidden` |
| Gallery thumbnail | `aspect-square overflow-hidden` |
| Achievement / event | `aspect-[4/3] overflow-hidden` |

### Forbidden

- [ ] `object-contain` — shows letterboxing, breaks design
- [ ] `object-fill` — stretches image, breaks design
- [ ] Image/video without a fixed container (free-sizing)
- [ ] Container without `overflow-hidden`
- [ ] `<video>` without `muted` attribute
- [ ] `<video>` without `playsInline` attribute

### Agent Requirement

Before touching ANY `<img>` or `<video>` in a template:
- [ ] Agent has read `guardrails/skills/image-video-safety.md` (Skill 21)
- [ ] Agent has verified container has `overflow-hidden`
- [ ] Agent has verified correct `object-position` for the image type
