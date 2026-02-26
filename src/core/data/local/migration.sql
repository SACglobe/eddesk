-- SQL Migration Script for School Key: aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa
-- Created to sync local tenant data to Supabase database.
-- Note: This script uses UPSERT (INSERT ... ON CONFLICT DO UPDATE) to avoid duplicate errors.

-- 1. Schools Table
INSERT INTO schools (
    "key", name, slug, customdomain, logo_url, email, phone, address, city, state, country, postal_code, 
    templatekey, isactive, createdat, updatedat, expirationdate
) VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
    'Sunrise International School', 
    'sunrise-international', 
    'sunrise.school.com', 
    '/demo/logo.png', 
    'info@sunriseschool.edu.in', 
    '+91 98765 43210', 
    '12, Knowledge Park, Sector 5', 
    'Coimbatore', 
    'Tamil Nadu', 
    'India', 
    '641001', 
    'template_classic', 
    true, 
    '2024-01-15T10:00:00Z', 
    '2025-01-10T08:30:00Z', 
    '2026-12-31'
) ON CONFLICT ("key") DO UPDATE SET 
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    customdomain = EXCLUDED.customdomain,
    updatedat = EXCLUDED.updatedat;

-- 2. Template Components (Homepage Sections)
-- Cleaning up existing ones for this school to avoid order conflicts if needed, or just upserting.
INSERT INTO templatecomponents ("key", schoolkey, componentkey, isactive, displayorder, createdat)
VALUES 
    ('s-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'hero', true, 1, '2024-01-15T10:00:00Z'),
    ('s-02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'announcements', true, 2, '2024-01-15T10:00:00Z'),
    ('s-03', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'stats', true, 3, '2024-01-15T10:00:00Z'),
    ('s-04', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'academic_results', true, 4, '2024-01-15T10:00:00Z'),
    ('s-05', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'achievements', true, 5, '2024-01-15T10:00:00Z'),
    ('s-06', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'principal', true, 6, '2024-01-15T10:00:00Z'),
    ('s-07', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'faculty', true, 7, '2024-01-15T10:00:00Z'),
    ('s-08', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'facilities', true, 8, '2024-01-15T10:00:00Z'),
    ('s-09', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'gallery', true, 9, '2024-01-15T10:00:00Z'),
    ('s-10', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'events', true, 10, '2024-01-15T10:00:00Z'),
    ('s-11', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admissions', true, 11, '2024-01-15T10:00:00Z'),
    ('s-12', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'identity', true, 12, '2024-01-15T10:00:00Z')
ON CONFLICT ("key") DO UPDATE SET 
    isactive = EXCLUDED.isactive,
    displayorder = EXCLUDED.displayorder;

-- 3. Hero Content
INSERT INTO herocontent (schoolkey, mediatype, mediaurl, headline, subheadline, primarybuttontext, primarybuttonurl, displayorder, isactive)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'image', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop', 'Inspiring Future Leaders', 'Nurturing creativity and innovation in every student.', 'EXPLORE CAMPUS', '/infrastructure', 1, true),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'image', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop', 'Modern Campus Facilities', 'Learning environments designed for the 21st century.', 'EXPLORE CAMPUS', '/infrastructure', 2, true);

-- 4. Broadcast Content (Announcements)
INSERT INTO broadcastcontent ("key", schoolkey, title, message, priority, expiresat, isactive)
VALUES 
    ('a-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Admissions Open for 2026–27', 'Applications now open...', 1, '2026-03-31T23:59:59Z', true),
    ('a-02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Annual Sports Day – Feb 22', 'Parents cordially invited...', 2, '2026-02-23T23:59:59Z', true)
ON CONFLICT ("key") DO UPDATE SET 
    message = EXCLUDED.message;

-- 5. Academic Results
INSERT INTO academicresults ("key", schoolkey, year, passpercentage, distinctions, firstclass, legacyquote)
VALUES 
    ('ar-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2024, 98.5, 142, 87, 'Our students continue to set new benchmarks every year.'),
    ('ar-02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2023, 97.2, 128, 79, 'Consistency and dedication drive our academic excellence.')
ON CONFLICT ("key") DO UPDATE SET 
    passpercentage = EXCLUDED.passpercentage;

-- 6. Achievements
INSERT INTO achievements ("key", schoolkey, year, category, title, description, imageurl, achievement_type, displayorder)
VALUES 
    ('ac-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2024, 'Board Examinations', 'State Rank 3 – Class 12 Science', '...', '', 'academic', 1),
    ('ac-02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2024, 'Football', 'State U-17 Football Champions', '...', '/school/image/sports_athletics.png', 'sports', 2)
ON CONFLICT ("key") DO UPDATE SET 
    description = EXCLUDED.description;

-- 7. Faculty (Personnel)
INSERT INTO faculty ("key", schoolkey, name, designation, description, imageurl, person_type, displayorder, isfeatured)
VALUES 
    ('p-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dr. Meenakshi Raghavan', 'Principal', '...', '/school/image/principal.png', 'principal', 1, true),
    ('p-02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mr. Suresh Kumar', 'Head of Sciences', '...', '/school/image/teacher1.png', 'faculty', 1, true)
ON CONFLICT ("key") DO UPDATE SET 
    description = EXCLUDED.description;

-- 8. School Stats
INSERT INTO schoolstats ("key", schoolkey, label, value, icon, displayorder)
VALUES 
    ('cs-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Students Enrolled', '3,200+', 'users', 1),
    ('cs-02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Experienced Faculty', '180+', 'graduation', 2)
ON CONFLICT ("key") DO UPDATE SET 
    value = EXCLUDED.value;

-- 9. Infrastructure (Facilities)
INSERT INTO infrastructure ("key", schoolkey, title, description, tag, displayorder)
VALUES 
    ('f-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Smart Classrooms', '...', 'Academics', 1),
    ('f-02', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Central Library', '...', 'Academics', 2)
ON CONFLICT ("key") DO UPDATE SET 
    description = EXCLUDED.description;

-- 10. Gallery
INSERT INTO gallery ("key", schoolkey, mediatype, url, caption, category, isfeatured)
VALUES 
    ('m-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'image', '/school/image/campus1.png', 'Main Building', 'campus', true)
ON CONFLICT ("key") DO UPDATE SET 
    caption = EXCLUDED.caption;

-- 11. Events
INSERT INTO events ("key", schoolkey, eventdate, starttime, endtime, title, category, description, location, isfeatured)
VALUES 
    ('e-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2026-02-21', '08:30:00', '13:00:00', 'Annual Sports Day', 'Sports', '...', 'School Ground', true)
ON CONFLICT ("key") DO UPDATE SET 
    description = EXCLUDED.description;

-- 12. Admission Instructions
INSERT INTO admissioninstructions ("key", schoolkey, step_number, title, description)
VALUES 
    ('as-01', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1, 'Fill Online Application', '...')
ON CONFLICT ("key") DO UPDATE SET 
    description = EXCLUDED.description;
