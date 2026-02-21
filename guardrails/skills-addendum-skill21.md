## Skills Addendum — append to guardrails/skills.md

### New Skill

| Trigger | Skill |
|---|---|
| Touching any `<img>` or `<video>` in a template | 21 |
| Binding data that includes image URLs or video URLs | 21 |
| Principal photo, faculty photo, hero image, gallery, facility | 21 |
| Any section that renders user-uploaded media | 21 |
| Hero binding, principal binding, faculty binding, gallery binding | 21 |

### Skill 21: image-video-safety
File: `guardrails/skills/image-video-safety.md`

Quick reference — what the skill enforces:
- `object-cover` on every image and video (never `object-contain`)
- `overflow-hidden` on every container
- `object-top` for portrait photos of people
- `object-center` for hero and landscape images
- `autoPlay muted loop playsInline` for all video elements
- Fixed height or fixed aspect-ratio on every container

### Updated Skill Selection Guide

| Task | Skills to read |
|---|---|
| Bind hero section (images or video) | 19, **21** |
| Bind principal section | 19, **21** |
| Bind faculty section | 19, **21** |
| Bind gallery / media library section | 19, **21** |
| Bind facilities section | 19, **21** |
| Bind achievements section | 19, **21** |
| Bind events section | 19, **21** |
| Bind any section with user-uploaded media | 19, **21** |
| Bind announcements / stats (text only) | 19 |
| Bind school name / identity (text only) | 18, 19 |
| TemplateRenderer changes | 20 |
| Switching from dummy data to live API | 12, 17 |
| Schema changes | 15 |

### Mandatory Agent Instruction (add to all data-binding prompts)

Every prompt that binds image or video data MUST include this line
in the Read first section:

  guardrails/skills/image-video-safety.md   ← REQUIRED for any image/video binding
