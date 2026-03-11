# Bugfix Requirements Document

## Introduction

The broadcast section is not displaying in any of the three templates (Premium, Modern, Classic) despite valid broadcast data being present in the Supabase function response. The data shows `isactive: true` and `expiresat: null`, which should trigger the broadcast section to display. This affects all three templates at their respective URLs:
- Premium template: http://localhost:3000/demo/template_premium
- Modern template: http://localhost:3000/demo/template_modern  
- Classic template: http://localhost:3000/demo/template_classic

The broadcast section should appear above the hero section in Premium and Classic templates, and below the hero section in Modern template.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN broadcast data exists with `isactive: true` and `expiresat: null` in the Supabase response THEN the Premium template does not display the broadcast section above the hero section

1.2 WHEN broadcast data exists with `isactive: true` and `expiresat: null` in the Supabase response THEN the Modern template does not display the broadcast ticker section below the hero section

1.3 WHEN broadcast data exists with `isactive: true` and `expiresat: null` in the Supabase response THEN the Classic template does not display the BroadcastTicker component above the hero section

1.4 WHEN broadcast data exists with `isactive: true` and a future `expiresat` date THEN none of the templates display the broadcast section

### Expected Behavior (Correct)

2.1 WHEN broadcast data exists with `isactive: true` and `expiresat: null` in the Supabase response THEN the Premium template SHALL display the broadcast section above the hero section with all active broadcast messages

2.2 WHEN broadcast data exists with `isactive: true` and `expiresat: null` in the Supabase response THEN the Modern template SHALL display the broadcast ticker section below the hero section with scrolling announcements

2.3 WHEN broadcast data exists with `isactive: true` and `expiresat: null` in the Supabase response THEN the Classic template SHALL display the BroadcastTicker component above the hero section with scrolling announcements

2.4 WHEN broadcast data exists with `isactive: true` and a future `expiresat` date THEN all templates SHALL display the broadcast section if the current date is before the expiration date

2.5 WHEN broadcast data exists with `isactive: true` and a past `expiresat` date THEN all templates SHALL NOT display the broadcast section

2.6 WHEN broadcast data exists with `isactive: false` THEN all templates SHALL NOT display the broadcast section regardless of the `expiresat` value

### Unchanged Behavior (Regression Prevention)

3.1 WHEN no broadcast data exists in the response THEN all templates SHALL CONTINUE TO not display the broadcast section

3.2 WHEN the announcements section is disabled via `homepageSections` configuration THEN all templates SHALL CONTINUE TO not display the broadcast section

3.3 WHEN the announcements section is required but no broadcast data exists THEN all templates SHALL CONTINUE TO log an error to the console

3.4 WHEN hero media data exists and is active THEN all templates SHALL CONTINUE TO display the hero section correctly

3.5 WHEN other sections (faculty, events, achievements, etc.) have valid data THEN all templates SHALL CONTINUE TO display those sections correctly

3.6 WHEN users navigate between different template routes THEN the routing behavior SHALL CONTINUE TO work as expected
