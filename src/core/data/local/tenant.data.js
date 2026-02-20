/**
 * tenant.data.js
 * ─────────────────────────────────────────────────────────────────────
 * LOCAL dummy data — mirrors the live API shape exactly.
 * Active when: USE_LOCAL_DATA=true in .env.local
 *
 * Skill:  local-dummy-data (guardrails/skills/local-dummy-data.md)
 * Rules:
 *   - Field names match reference.js constants
 *   - No computed values — raw data only
 *   - No business logic — ViewModels handle that
 *   - sections[].is_enabled controls what renders (not template code)
 *   - sections[].display_order controls sequence (not template code)
 * ─────────────────────────────────────────────────────────────────────
 */

export const LOCAL_TENANT_DATA = {

  // ── school ─────────────────────────────────────────────────────────
  school: {
    id: 'demo-school-001',
    name: 'Sunrise International School',
    slug: 'sunrise-international',
    custom_domain: 'sunrise.school.com',
    logo_url: '/demo/logo.png',
    email: 'info@sunriseschool.edu.in',
    phone: '+91 98765 43210',
    address: '12, Knowledge Park, Sector 5',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    postal_code: '641001',
    plan_type: 'premium',
    subscription_status: 'active',
    is_active: true,
    template_id: 'template_classic',
    expiration_date: '2026-12-31',
    paymentgateway_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2025-01-10T08:30:00Z',
  },

  // ── homepage_sections ──────────────────────────────────────────────
  // ✅ To hide a section:   set is_enabled: false
  // ✅ To reorder sections: change display_order values
  // ❌ Never edit templates to do this
  sections: [
    { id: 's-01', school_id: 'demo-school-001', section_key: 'hero', is_enabled: true, display_order: 1, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-02', school_id: 'demo-school-001', section_key: 'announcements', is_enabled: true, display_order: 2, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-03', school_id: 'demo-school-001', section_key: 'stats', is_enabled: true, display_order: 3, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-04', school_id: 'demo-school-001', section_key: 'academic_results', is_enabled: true, display_order: 4, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-05', school_id: 'demo-school-001', section_key: 'achievements', is_enabled: true, display_order: 5, settings: { show_year_filter: true }, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-06', school_id: 'demo-school-001', section_key: 'principal', is_enabled: true, display_order: 6, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-07', school_id: 'demo-school-001', section_key: 'faculty', is_enabled: true, display_order: 7, settings: { max_display: 8 }, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-08', school_id: 'demo-school-001', section_key: 'facilities', is_enabled: true, display_order: 8, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-09', school_id: 'demo-school-001', section_key: 'gallery', is_enabled: true, display_order: 9, settings: { layout: 'grid' }, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-10', school_id: 'demo-school-001', section_key: 'events', is_enabled: true, display_order: 10, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-11', school_id: 'demo-school-001', section_key: 'admissions', is_enabled: true, display_order: 11, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-12', school_id: 'demo-school-001', section_key: 'identity', is_enabled: true, display_order: 12, settings: null, created_at: '2024-01-15T10:00:00Z' },
    { id: 's-13', school_id: 'demo-school-001', section_key: 'sports', is_enabled: false, display_order: 13, settings: null, created_at: '2024-01-15T10:00:00Z' },
  ],

  // ── hero_media ─────────────────────────────────────────────────────
  hero_media: [
    {
      "media_type": "image",
      "media_url": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop",
      "headline": "Inspiring Future Leaders",
      "subheadline": "Nurturing creativity and innovation in every student.",
      "primary_button_text": "EXPLORE CAMPUS",
      "primary_button_url": "/infrastructure",
      "secondary_button_text": "EXPLORE CAMPUS",
      "secondary_button_url": "/infrastructure",
      "display_order": 1,
      "is_active": true
    },
    {
      "media_type": "image",
      "media_url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
      "headline": "Modern Campus Facilities",
      "subheadline": "Learning environments designed for the 21st century.",
      "primary_button_text": "EXPLORE CAMPUS",
      "primary_button_url": "/infrastructure",
      "secondary_button_text": "EXPLORE CAMPUS",
      "secondary_button_url": "/infrastructure",
      "display_order": 2,
      "is_active": true
    },
    {
      "media_type": "image",
      "media_url": "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop",
      "headline": "A Tradition of Excellence",
      "subheadline": "Providing world-class education for over 25 years.",
      "primary_button_text": "EXPLORE CAMPUS",
      "primary_button_url": "/infrastructure",
      "secondary_button_text": "EXPLORE CAMPUS",
      "secondary_button_url": "/infrastructure",
      "display_order": 3,
      "is_active": true
    }
  ],

  // ── announcements ──────────────────────────────────────────────────
  announcements: [
    { id: 'a-01', school_id: 'demo-school-001', title: 'Admissions Open for 2025–26', message: 'Applications now open for Nursery to Grade 12. Limited seats. Apply before March 31.', priority: 1, expires_at: '2025-03-31T23:59:59Z', is_active: true },
    { id: 'a-02', school_id: 'demo-school-001', title: 'Annual Sports Day – Feb 22', message: 'Parents cordially invited. Gates open 8:30 AM. Prize distribution at 12:00 PM.', priority: 2, expires_at: '2025-02-23T23:59:59Z', is_active: true },
    { id: 'a-03', school_id: 'demo-school-001', title: 'Board Exam Timetable Released', message: 'Class 10 & 12 board exam schedule published. Download from the student portal.', priority: 3, expires_at: '2025-04-30T23:59:59Z', is_active: true },
    { id: 'a-04', school_id: 'demo-school-001', title: 'Parent–Teacher Meeting – March 8', message: 'Quarterly PTM for all classes. Mandatory attendance. Individual 10-min slots pre-booked.', priority: 4, expires_at: '2025-03-09T23:59:59Z', is_active: true },
    { id: 'a-05', school_id: 'demo-school-001', title: 'School Holiday – Pongal', message: 'School will remain closed January 14–16 for Pongal. Classes resume January 17.', priority: 5, expires_at: '2025-01-17T00:00:00Z', is_active: false },
  ],

  // ── academic_results ───────────────────────────────────────────────
  academic_results: [
    { id: 'ar-01', school_id: 'demo-school-001', year: 2024, pass_percentage: 98.5, distinctions: 142, first_class: 87, legacy_quote: 'Our students continue to set new benchmarks every year.' },
    { id: 'ar-02', school_id: 'demo-school-001', year: 2023, pass_percentage: 97.2, distinctions: 128, first_class: 79, legacy_quote: 'Consistency and dedication drive our academic excellence.' },
    { id: 'ar-03', school_id: 'demo-school-001', year: 2022, pass_percentage: 96.8, distinctions: 115, first_class: 82, legacy_quote: null },
    { id: 'ar-04', school_id: 'demo-school-001', year: 2021, pass_percentage: 95.1, distinctions: 98, first_class: 71, legacy_quote: 'Even through challenging times, our students excelled.' },
  ],

  // ── achievements ───────────────────────────────────────────────────
  achievements: [
    { id: 'ac-01', school_id: 'demo-school-001', year: 2024, category: 'Board Examinations', title: 'State Rank 3 – Class 12 Science', description: 'Priya Sharma secured State Rank 3 in Tamil Nadu Board, Class 12 Science with 598/600.', achievement_type: 'academic', display_order: 1 },
    { id: 'ac-02', school_id: 'demo-school-001', year: 2024, category: 'Football', title: 'State U-17 Football Champions', description: 'Our U-17 team won the State Championship in Chennai, defeating 24 schools.', achievement_type: 'sports', display_order: 2 },
    { id: 'ac-03', school_id: 'demo-school-001', year: 2024, category: 'National Recognition', title: 'Best CBSE School – South India', description: 'Awarded by the Education Excellence Foundation at National School Awards 2024.', achievement_type: 'recognition', display_order: 3 },
    { id: 'ac-04', school_id: 'demo-school-001', year: 2023, category: 'Science Olympiad', title: 'National Science Olympiad – Gold', description: 'Arjun Mehta won Gold at the National Science Olympiad, competing against 1,200 students.', achievement_type: 'academic', display_order: 4 },
    { id: 'ac-05', school_id: 'demo-school-001', year: 2023, category: 'Swimming', title: 'District Swimming – 3 Gold Medals', description: 'Our team won 3 golds and 2 silvers at the District Swimming Championships.', achievement_type: 'sports', display_order: 5 },
    { id: 'ac-06', school_id: 'demo-school-001', year: 2023, category: 'ISO Certification', title: 'ISO 9001:2015 Certified', description: 'Received ISO 9001:2015 certification for quality management in education.', achievement_type: 'recognition', display_order: 6 },
    { id: 'ac-07', school_id: 'demo-school-001', year: 2022, category: 'Debate', title: 'South Zone Inter-School Debate Champions', description: 'Our team won first place at the South Zone Inter-School English Debate Championship.', achievement_type: 'academic', display_order: 7 },
  ],

  // ── personnel ──────────────────────────────────────────────────────
  personnel: [
    // Principal
    {
      id: 'p-01', school_id: 'demo-school-001',
      name: 'Dr. Meenakshi Raghavan', designation: 'Principal',
      bio: 'Dr. Raghavan brings 28 years of education leadership. PhD in Educational Psychology, University of Madras. Her vision: every child is a unique learner deserving a personalised path.',
      photo_url: '/demo/principal.jpg', person_type: 'principal', display_order: 1, is_featured: true,
    },
    // Faculty
    { id: 'p-02', school_id: 'demo-school-001', name: 'Mr. Suresh Kumar', designation: 'Head of Sciences', bio: 'M.Sc Physics. 15 years teaching experience. Makes complex concepts simple.', photo_url: '/demo/faculty-1.jpg', person_type: 'faculty', display_order: 1, is_featured: true },
    { id: 'p-03', school_id: 'demo-school-001', name: 'Ms. Ananya Krishnan', designation: 'Head of Mathematics', bio: 'B.Tech + M.Ed. Coached 3 national-level Math Olympiad winners in 5 years.', photo_url: '/demo/faculty-2.jpg', person_type: 'faculty', display_order: 2, is_featured: true },
    { id: 'p-04', school_id: 'demo-school-001', name: 'Mr. Rajiv Nair', designation: 'Physical Education Director', bio: 'Former national-level basketball player. Certified sports coach, 12 years school sports management.', photo_url: '/demo/faculty-3.jpg', person_type: 'faculty', display_order: 3, is_featured: true },
    { id: 'p-05', school_id: 'demo-school-001', name: 'Ms. Divya Balaji', designation: 'Head of Languages', bio: 'MA English Literature. 10 years experience. Passionate about creative writing and debate.', photo_url: '/demo/faculty-4.jpg', person_type: 'faculty', display_order: 4, is_featured: false },
    { id: 'p-06', school_id: 'demo-school-001', name: 'Mr. Karthik Subramanian', designation: 'Head of Computer Science', bio: 'B.E. Computer Science. Certified Google Educator. Leads the school\'s robotics and coding club.', photo_url: '/demo/faculty-5.jpg', person_type: 'faculty', display_order: 5, is_featured: false },
    { id: 'p-07', school_id: 'demo-school-001', name: 'Ms. Preethi Nambiar', designation: 'Head of Arts', bio: 'MFA in Fine Arts. 8 years guiding students in visual and performing arts.', photo_url: '/demo/faculty-6.jpg', person_type: 'faculty', display_order: 6, is_featured: false },
    // Board
    { id: 'p-08', school_id: 'demo-school-001', name: 'Mr. Venkatesh Iyer', designation: 'Chairman, Board of Trustees', bio: 'Founder of Sunrise Group of Institutions. 30+ years in education philanthropy.', photo_url: '/demo/board-1.jpg', person_type: 'board', display_order: 1, is_featured: false },
  ],

  // ── campus_statistics ──────────────────────────────────────────────
  campus_statistics: [
    { id: 'cs-01', school_id: 'demo-school-001', label: 'Students Enrolled', value: '3,200+', icon: 'users', display_order: 1 },
    { id: 'cs-02', school_id: 'demo-school-001', label: 'Experienced Faculty', value: '180+', icon: 'graduation', display_order: 2 },
    { id: 'cs-03', school_id: 'demo-school-001', label: 'Years of Excellence', value: '35+', icon: 'calendar', display_order: 3 },
    { id: 'cs-04', school_id: 'demo-school-001', label: 'Campus Area', value: '14 Acres', icon: 'map', display_order: 4 },
    { id: 'cs-05', school_id: 'demo-school-001', label: 'Sports Titles', value: '200+', icon: 'trophy', display_order: 5 },
    { id: 'cs-06', school_id: 'demo-school-001', label: 'Alumni Network', value: '12,000+', icon: 'network', display_order: 6 },
  ],

  // ── facility_categories ────────────────────────────────────────────
  facility_categories: [
    { id: 'fc-01', school_id: 'demo-school-001', name: 'Academics', icon: 'book', display_order: 1 },
    { id: 'fc-02', school_id: 'demo-school-001', name: 'Sports', icon: 'sports', display_order: 2 },
    { id: 'fc-03', school_id: 'demo-school-001', name: 'Arts', icon: 'palette', display_order: 3 },
    { id: 'fc-04', school_id: 'demo-school-001', name: 'Technology', icon: 'computer', display_order: 4 },
    { id: 'fc-05', school_id: 'demo-school-001', name: 'Wellness', icon: 'heart', display_order: 5 },
  ],

  // ── facilities ─────────────────────────────────────────────────────
  facilities: [
    { id: 'f-01', school_id: 'demo-school-001', category_id: 'fc-01', name: 'Smart Classrooms', description: '120 air-conditioned smart classrooms with interactive boards and projectors.', category_name: 'Academics' },
    { id: 'f-02', school_id: 'demo-school-001', category_id: 'fc-01', name: 'Central Library', description: '25,000+ books, digital journals, and a dedicated research zone.', category_name: 'Academics' },
    { id: 'f-03', school_id: 'demo-school-001', category_id: 'fc-01', name: 'Science Labs', description: '6 fully equipped labs — Physics, Chemistry, Biology, and Junior Science.', category_name: 'Academics' },
    { id: 'f-04', school_id: 'demo-school-001', category_id: 'fc-02', name: 'Olympic Swimming Pool', description: 'FINA-standard 50m pool with separate training and competition lanes.', category_name: 'Sports' },
    { id: 'f-05', school_id: 'demo-school-001', category_id: 'fc-02', name: 'Football Ground', description: 'FIFA-standard natural turf with floodlights for evening matches.', category_name: 'Sports' },
    { id: 'f-06', school_id: 'demo-school-001', category_id: 'fc-02', name: 'Indoor Sports Complex', description: 'Multipurpose hall for basketball, badminton, volleyball, and gymnastics.', category_name: 'Sports' },
    { id: 'f-07', school_id: 'demo-school-001', category_id: 'fc-03', name: 'Performing Arts Theatre', description: '600-seat auditorium for drama, music, and cultural events.', category_name: 'Arts' },
    { id: 'f-08', school_id: 'demo-school-001', category_id: 'fc-03', name: 'Art Studio', description: 'Professional-grade space for painting, sculpture, and mixed media.', category_name: 'Arts' },
    { id: 'f-09', school_id: 'demo-school-001', category_id: 'fc-04', name: 'Computer Lab', description: '3 labs, 240 computers, high-speed internet, and latest dev software.', category_name: 'Technology' },
    { id: 'f-10', school_id: 'demo-school-001', category_id: 'fc-04', name: 'Robotics & STEM Lab', description: 'State-of-the-art lab with 3D printers, Arduino kits, and VR headsets.', category_name: 'Technology' },
    { id: 'f-11', school_id: 'demo-school-001', category_id: 'fc-05', name: 'Medical Centre', description: 'Full-time nurse, weekly doctor visits, and emergency care protocol.', category_name: 'Wellness' },
    { id: 'f-12', school_id: 'demo-school-001', category_id: 'fc-05', name: 'Cafeteria', description: 'FSSAI-certified kitchen serving hygienic, nutritious, freshly cooked meals.', category_name: 'Wellness' },
  ],

  // ── media_library ──────────────────────────────────────────────────
  media_library: [
    { id: 'm-01', school_id: 'demo-school-001', media_type: 'image', category: 'campus', url: '/demo/gallery/campus-1.jpg', caption: 'Main Building', is_featured: true, created_at: '2024-08-01T10:00:00Z' },
    { id: 'm-02', school_id: 'demo-school-001', media_type: 'image', category: 'campus', url: '/demo/gallery/campus-2.jpg', caption: 'Library', is_featured: true, created_at: '2024-08-01T10:00:00Z' },
    { id: 'm-03', school_id: 'demo-school-001', media_type: 'image', category: 'sports', url: '/demo/gallery/sports-1.jpg', caption: 'Swimming Championship', is_featured: true, created_at: '2024-09-15T10:00:00Z' },
    { id: 'm-04', school_id: 'demo-school-001', media_type: 'image', category: 'sports', url: '/demo/gallery/sports-2.jpg', caption: 'Football Ground', is_featured: false, created_at: '2024-09-15T10:00:00Z' },
    { id: 'm-05', school_id: 'demo-school-001', media_type: 'image', category: 'events', url: '/demo/gallery/event-1.jpg', caption: 'Annual Day Celebration', is_featured: true, created_at: '2024-11-20T10:00:00Z' },
    { id: 'm-06', school_id: 'demo-school-001', media_type: 'image', category: 'events', url: '/demo/gallery/event-2.jpg', caption: 'Science Exhibition', is_featured: false, created_at: '2024-11-22T10:00:00Z' },
    { id: 'm-07', school_id: 'demo-school-001', media_type: 'image', category: 'academics', url: '/demo/gallery/academics-1.jpg', caption: 'Smart Classroom in Action', is_featured: false, created_at: '2024-07-10T10:00:00Z' },
    { id: 'm-08', school_id: 'demo-school-001', media_type: 'image', category: 'campus', url: '/demo/gallery/campus-3.jpg', caption: 'Indoor Sports Complex', is_featured: true, created_at: '2024-08-15T10:00:00Z' },
    { id: 'm-09', school_id: 'demo-school-001', media_type: 'video', category: 'campus', url: '/demo/gallery/campus-tour.mp4', caption: 'Campus Tour Video', is_featured: true, created_at: '2024-06-01T10:00:00Z' },
  ],

  // ── events ─────────────────────────────────────────────────────────
  events: [
    { id: 'e-01', school_id: 'demo-school-001', event_date: '2025-02-22', start_time: '08:30:00', end_time: '13:00:00', title: 'Annual Sports Day', category: 'Sports', description: 'Athletic celebration with track events, team sports finals, and prize distribution. Parents welcome.', location: 'School Ground', is_featured: true },
    { id: 'e-02', school_id: 'demo-school-001', event_date: '2025-03-08', start_time: '09:00:00', end_time: '12:00:00', title: 'Parent–Teacher Meeting', category: 'Academic', description: 'Quarterly PTM for all classes. Individual 10-minute slots. Bring your child\'s report card.', location: 'Respective Classrooms', is_featured: false },
    { id: 'e-03', school_id: 'demo-school-001', event_date: '2025-03-21', start_time: '10:00:00', end_time: '17:00:00', title: 'Science & Technology Fair', category: 'Academic', description: 'Grade 6–12 students showcase STEM projects. Open to public and industry judges.', location: 'Auditorium & School Grounds', is_featured: true },
    { id: 'e-04', school_id: 'demo-school-001', event_date: '2025-04-05', start_time: '18:00:00', end_time: '21:00:00', title: 'Annual Cultural Night', category: 'Cultural', description: 'An evening of music, dance, drama, and art. Performances by students across all grades.', location: 'Performing Arts Theatre', is_featured: true },
    { id: 'e-05', school_id: 'demo-school-001', event_date: '2025-04-15', start_time: '09:00:00', end_time: '12:00:00', title: 'Inter-House Debate Competition', category: 'Academic', description: 'Annual debate championship between all four school houses. Topic announced on the day.', location: 'Main Auditorium', is_featured: false },
  ],

  // ── admission_steps ────────────────────────────────────────────────
  admission_steps: [
    { id: 'as-01', school_id: 'demo-school-001', step_number: 1, title: 'Fill Online Application', description: 'Complete the online form with your child\'s name, date of birth, and previous school records.', status: 'pending' },
    { id: 'as-02', school_id: 'demo-school-001', step_number: 2, title: 'Document Submission', description: 'Upload birth certificate, mark sheets, transfer certificate, and two passport-size photographs.', status: 'pending' },
    { id: 'as-03', school_id: 'demo-school-001', step_number: 3, title: 'Entrance Assessment', description: 'Grade-appropriate assessment: Classes 1–3 informal interaction; Classes 4–12 written Math & English test.', status: 'pending' },
    { id: 'as-04', school_id: 'demo-school-001', step_number: 4, title: 'Interview & Campus Visit', description: 'Parents and child attend a brief interview with the admission coordinator. Campus tour available same day.', status: 'pending' },
    { id: 'as-05', school_id: 'demo-school-001', step_number: 5, title: 'Fee Payment & Confirmation', description: 'Pay admission fee online or at school office. Receive confirmation letter within 48 hours.', status: 'pending' },
  ],

  // ── school_identity ────────────────────────────────────────────────
  school_identity: {
    id: 'si-01',
    school_id: 'demo-school-001',
    vision: 'To be a globally recognised institution that nurtures compassionate, creative, and critical thinkers who lead with integrity.',
    mission: 'To provide a holistic, student-centred education that blends academic rigour with character development — preparing every child for the challenges and opportunities of the 21st century.',
    motto: 'Illuminate. Inspire. Excel.',
  },

};
