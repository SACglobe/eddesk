# Modern Template: Home Screen Conditions & Reference

This document serves as the reference for rendering the Home Screen in the **Modern** template.

## Rendering Order & Positions
1. **Header**: Logo (from `school.logo_url`) or Name (fallback).
2. **Hero Section**: Positioned immediately below the Header.
3. **Broadcast**: Positioned below the Hero section.
4. **Academic Results & Achievements**: Positioned below the Broadcast section.
   - Left Side: Academic Results.
   - Right Side: School Academic Achievements (Filtered by `category: academic`).
5. **Principal Section**: Positioned within the Academic section area (Leadership filtered by `designation: Principal`).
6. **School Statistics**: Positioned below the Principal/Academic section.
7. **Faculty**: Positioned below Statistics.
8. **School Sports Achievements**: Positioned below Faculty (Filtered by `category: sports`).
9. **Infrastructure**: Positioned below Sports Achievements.
10. **Gallery & Events**: Positioned below Infrastructure.
    - Left Side: Events.
    - Right Side: Gallery (Filtered by `contenttype: image`).
11. **Footer**: Contact info from `contactdetails`.

## Component Logic
- **Hero** (`hero`): Show if `isActive`. Required check if `isRequired`.
- **Broadcast** (`broadcast`): Show if `isActive`. Required check if `isRequired`.
- **Academic Results** (`academicresults`): Show if `isActive`. Required check if `isRequired`.
- **Academic Achievements**: Show if `isActive` AND category is `academic` (from Filter).
- **Principal** (`leadership`): Show if `isActive` AND role is `principal` (from Filter `designation`).
- **School Stats** (`schoolstats`): Show if `isActive`.
- **Faculty** (`faculty`): Show if `isActive`.
- **Sports Achievements**: Show if `isActive` AND category is `sports` (from Filter).
- **Infrastructure** (`infrastructure`): Show if `isActive`.
- **Gallery** (`gallery`): Show if `isActive` AND `mediatype` matches Filter `contenttype`.
- **Events** (`events`): Show if `isActive`.

## Validation
- If any section is `isRequired: true` and has no matching data, show a **Full Screen Popup** blocking access.
