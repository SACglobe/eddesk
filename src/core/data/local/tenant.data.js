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
    key: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Sunrise International School',
    slug: 'sunrise-international',
    customdomain: 'sunrise.school.com',
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
    isactive: true,
    templatekey: 'template_classic',
    expirationdate: '2026-12-31',
    paymentgateway_url: null,
    createdat: '2024-01-15T10:00:00Z',
    updatedat: '2025-01-10T08:30:00Z',
  },


  sections: [
    { key: 's-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'hero', isactive: true, displayorder: 1, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'announcements', isactive: true, displayorder: 2, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'stats', isactive: true, displayorder: 3, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'academic_results', isactive: true, displayorder: 4, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'achievements', isactive: true, displayorder: 5, validationconfig: { show_year_filter: true }, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-06', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'principal', isactive: true, displayorder: 6, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-07', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'faculty', isactive: true, displayorder: 7, validationconfig: { max_display: 8 }, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-08', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'facilities', isactive: true, displayorder: 8, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-09', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'gallery', isactive: true, displayorder: 9, validationconfig: { layout: 'grid' }, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-10', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'events', isactive: true, displayorder: 10, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-11', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'admissions', isactive: true, displayorder: 11, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-12', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'identity', isactive: true, displayorder: 12, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
    { key: 's-13', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', componentkey: 'sports', isactive: false, displayorder: 13, validationconfig: null, createdat: '2024-01-15T10:00:00Z' },
  ],

  // ── hero_media ─────────────────────────────────────────────────────
  hero_media: [
    {
      "mediatype": "image",
      "mediaurl": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop",
      "headline": "Inspiring Future Leaders",
      "subheadline": "Nurturing creativity and innovation in every student.",
      "primarybuttontext": "EXPLORE CAMPUS",
      "primarybuttonurl": "/infrastructure",
      "secondarybuttontext": "EXPLORE CAMPUS",
      "secondarybuttonurl": "/infrastructure",
      "displayorder": 1,
      "isactive": true
    },
    {
      "mediatype": "image",
      "mediaurl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
      "headline": "Modern Campus Facilities",
      "subheadline": "Learning environments designed for the 21st century.",
      "primarybuttontext": "EXPLORE CAMPUS",
      "primarybuttonurl": "/infrastructure",
      "secondarybuttontext": "EXPLORE CAMPUS",
      "secondarybuttonurl": "/infrastructure",
      "displayorder": 2,
      "isactive": true
    },
    {
      "mediatype": "image",
      "mediaurl": "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop",
      "headline": "A Tradition of Excellence",
      "subheadline": "Providing world-class education for over 25 years.",
      "primarybuttontext": "EXPLORE CAMPUS",
      "primarybuttonurl": "/infrastructure",
      "secondarybuttontext": "EXPLORE CAMPUS",
      "secondarybuttonurl": "/infrastructure",
      "displayorder": 3,
      "isactive": true
    }
  ],

  // ── announcements ──────────────────────────────────────────────────
  announcements: [
    { key: 'a-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Admissions Open for 2026–27', message: 'Applications now open for Nursery to Grade 12. Limited seats. Apply before March 31.', priority: 1, expiresat: '2026-03-31T23:59:59Z', isactive: true },
    { key: 'a-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Annual Sports Day – Feb 22', message: 'Parents cordially invited. Gates open 8:30 AM. Prize distribution at 12:00 PM.', priority: 2, expiresat: '2026-02-23T23:59:59Z', isactive: true },
    { key: 'a-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Board Exam Timetable Released', message: 'Class 10 & 12 board exam schedule published. Download from the student portal.', priority: 3, expiresat: '2026-04-30T23:59:59Z', isactive: true },
    { key: 'a-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Parent–Teacher Meeting – March 8', message: 'Quarterly PTM for all classes. Mandatory attendance. Individual 10-min slots pre-booked.', priority: 4, expiresat: '2026-03-09T23:59:59Z', isactive: true },
    { key: 'a-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'School Holiday – Pongal', message: 'School will remain closed January 14–16 for Pongal. Classes resume January 17.', priority: 5, expiresat: '2026-01-17T00:00:00Z', isactive: false },
  ],

  // ── academic_results ───────────────────────────────────────────────
  academic_results: [
    { key: 'ar-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2024, passpercentage: 98.5, distinctions: 142, firstclass: 87, legacyquote: 'Our students continue to set new benchmarks every year.' },
    { key: 'ar-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2023, passpercentage: 97.2, distinctions: 128, firstclass: 79, legacyquote: 'Consistency and dedication drive our academic excellence.' },
    { key: 'ar-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2022, passpercentage: 96.8, distinctions: 115, firstclass: 82, legacyquote: null },
    { key: 'ar-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2021, passpercentage: 95.1, distinctions: 98, firstclass: 71, legacyquote: 'Even through challenging times, our students excelled.' },
  ],

  // ── achievements ───────────────────────────────────────────────────
  achievements: [
    { key: 'ac-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2024, category: 'Board Examinations', title: 'State Rank 3 – Class 12 Science', description: 'Priya Sharma secured State Rank 3 in Tamil Nadu Board, Class 12 Science with 598/600.', imageurl: '', achievement_type: 'academic', displayorder: 1 },
    { key: 'ac-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2024, category: 'Football', title: 'State U-17 Football Champions', description: 'Our U-17 team won the State Championship in Chennai, defeating 24 schools.', imageurl: '/school/image/sports_athletics.png', achievement_type: 'sports', displayorder: 2 },
    { key: 'ac-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2024, category: 'National Recognition', title: 'Best CBSE School – South India', description: 'Awarded by the Education Excellence Foundation at National School Awards 2024.', imageurl: '', achievement_type: 'recognition', displayorder: 3 },
    { key: 'ac-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2023, category: 'Science Olympiad', title: 'National Science Olympiad – Gold', description: 'Arjun Mehta won Gold at the National Science Olympiad, competing against 1,200 students.', imageurl: '', achievement_type: 'academic', displayorder: 4 },
    { key: 'ac-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2023, category: 'Swimming', title: 'District Swimming – 3 Gold Medals', description: 'Our team won 3 golds and 2 silvers at the District Swimming Championships.', imageurl: '/school/image/sports_basketball.png', achievement_type: 'sports', displayorder: 5 },
    { key: 'ac-06', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2023, category: 'ISO Certification', title: 'ISO 9001:2015 Certified', description: 'Received ISO 9001:2015 certification for quality management in education.', imageurl: '', achievement_type: 'recognition', displayorder: 6 },
    { key: 'ac-07', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', year: 2022, category: 'Debate', title: 'South Zone Inter-School Debate Champions', description: 'Our team won first place at the South Zone Inter-School English Debate Championship.', imageurl: '', achievement_type: 'academic', displayorder: 7 },
  ],

  // ── personnel ──────────────────────────────────────────────────────
  personnel: [
    // Principal
    {
      key: 'p-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      name: 'Dr. Meenakshi Raghavan', designation: 'Principal',
      description: 'Dr. Raghavan brings 28 years of education leadership. PhD in Educational Psychology, University of Madras. Her vision: every child is a unique learner deserving a personalised path.',
      imageurl: '/school/image/principal.png', person_type: 'principal', displayorder: 1, isfeatured: true,
    },
    // Faculty
    { key: 'p-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Mr. Suresh Kumar', designation: 'Head of Sciences', description: 'M.Sc Physics. 15 years teaching experience. Makes complex concepts simple.', imageurl: '/school/image/teacher1.png', person_type: 'faculty', displayorder: 1, isfeatured: true },
    { key: 'p-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Ms. Ananya Krishnan', designation: 'Head of Mathematics', description: 'B.Tech + M.Ed. Coached 3 national-level Math Olympiad winners in 5 years.', imageurl: '/school/image/teacher2.png', person_type: 'faculty', displayorder: 2, isfeatured: true },
    { key: 'p-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Mr. Rajiv Nair', designation: 'Physical Education Director', description: 'Former national-level basketball player. Certified sports coach, 12 years school sports management.', imageurl: '/school/image/teacher3.png', person_type: 'faculty', displayorder: 3, isfeatured: true },
    { key: 'p-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Ms. Divya Balaji', designation: 'Head of Languages', description: 'MA English Literature. 10 years experience. Passionate about creative writing and debate.', imageurl: '/school/image/teacher1.png', person_type: 'faculty', displayorder: 4, isfeatured: false },
    { key: 'p-06', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Mr. Karthik Subramanian', designation: 'Head of Computer Science', description: 'B.E. Computer Science. Certified Google Educator. Leads the school\'s robotics and coding club.', imageurl: '/school/image/teacher2.png', person_type: 'faculty', displayorder: 5, isfeatured: false },
    { key: 'p-07', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Ms. Preethi Nambiar', designation: 'Head of Arts', description: 'MFA in Fine Arts. 8 years guiding students in visual and performing arts.', imageurl: '/school/image/teacher3.png', person_type: 'faculty', displayorder: 6, isfeatured: false },
    // Board
    { key: 'p-08', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Mr. Venkatesh Iyer', designation: 'Chairman, Board of Trustees', description: 'Founder of Sunrise Group of Institutions. 30+ years in education philanthropy.', imageurl: '/school/image/teacher1.png', person_type: 'board', displayorder: 1, isfeatured: false },
  ],

  // ── campus_statistics ──────────────────────────────────────────────
  campus_statistics: [
    { key: 'cs-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', label: 'Students Enrolled', value: '3,200+', icon: 'users', displayorder: 1 },
    { key: 'cs-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', label: 'Experienced Faculty', value: '180+', icon: 'graduation', displayorder: 2 },
    { key: 'cs-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', label: 'Years of Excellence', value: '35+', icon: 'calendar', displayorder: 3 },
    { key: 'cs-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', label: 'Campus Area', value: '14 Acres', icon: 'map', displayorder: 4 },
    { key: 'cs-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', label: 'Sports Titles', value: '200+', icon: 'trophy', displayorder: 5 },
    { key: 'cs-06', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', label: 'Alumni Network', value: '12,000+', icon: 'network', displayorder: 6 },
  ],

  // ── facility_categories ────────────────────────────────────────────
  facility_categories: [
    { key: 'fc-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Academics', icon: 'book', displayorder: 1 },
    { key: 'fc-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Sports', icon: 'sports', displayorder: 2 },
    { key: 'fc-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Arts', icon: 'palette', displayorder: 3 },
    { key: 'fc-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Technology', icon: 'computer', displayorder: 4 },
    { key: 'fc-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Wellness', icon: 'heart', displayorder: 5 },
  ],

  // ── facilities ─────────────────────────────────────────────────────
  facilities: [
    { key: 'f-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-01', title: 'Smart Classrooms', description: '120 air-conditioned smart classrooms with interactive boards and projectors.', tag: 'Academics' },
    { key: 'f-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-01', title: 'Central Library', description: '25,000+ books, digital journals, and a dedicated research zone.', tag: 'Academics' },
    { key: 'f-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-01', title: 'Science Labs', description: '6 fully equipped labs — Physics, Chemistry, Biology, and Junior Science.', tag: 'Academics' },
    { key: 'f-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-02', title: 'Olympic Swimming Pool', description: 'FINA-standard 50m pool with separate training and competition lanes.', tag: 'Sports' },
    { key: 'f-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-02', title: 'Football Ground', description: 'FIFA-standard natural turf with floodlights for evening matches.', tag: 'Sports' },
    { key: 'f-06', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-02', title: 'Indoor Sports Complex', description: 'Multipurpose hall for basketball, badminton, volleyball, and gymnastics.', tag: 'Sports' },
    { key: 'f-07', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-03', title: 'Performing Arts Theatre', description: '600-seat auditorium for drama, music, and cultural events.', tag: 'Arts' },
    { key: 'f-08', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-03', title: 'Art Studio', description: 'Professional-grade space for painting, sculpture, and mixed media.', tag: 'Arts' },
    { key: 'f-09', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-04', title: 'Computer Lab', description: '3 labs, 240 computers, high-speed internet, and latest dev software.', tag: 'Technology' },
    { key: 'f-10', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-04', title: 'Robotics & STEM Lab', description: 'State-of-the-art lab with 3D printers, Arduino kits, and VR headsets.', tag: 'Technology' },
    { key: 'f-11', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-05', title: 'Medical Centre', description: 'Full-time nurse, weekly doctor visits, and emergency care protocol.', tag: 'Wellness' },
    { key: 'f-12', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: 'fc-05', title: 'Cafeteria', description: 'FSSAI-certified kitchen serving hygienic, nutritious, freshly cooked meals.', tag: 'Wellness' },
  ],

  // ── media_library ──────────────────────────────────────────────────
  media_library: [
    { key: 'm-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'campus', url: '/school/image/campus1.png', caption: 'Main Building', isfeatured: true, createdat: '2024-08-01T10:00:00Z' },
    { key: 'm-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'campus', url: '/school/image/campus2.png', caption: 'Library', isfeatured: true, createdat: '2024-08-01T10:00:00Z' },
    { key: 'm-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'sports', url: '/school/image/campus3.png', caption: 'Swimming Championship', isfeatured: true, createdat: '2024-09-15T10:00:00Z' },
    { key: 'm-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'sports', url: '/school/image/campus4.png', caption: 'Football Ground', isfeatured: false, createdat: '2024-09-15T10:00:00Z' },
    { key: 'm-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'events', url: '/school/image/campus1.png', caption: 'Annual Day Celebration', isfeatured: true, createdat: '2024-11-20T10:00:00Z' },
    { key: 'm-06', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'events', url: '/school/image/campus2.png', caption: 'Science Exhibition', isfeatured: false, createdat: '2024-11-22T10:00:00Z' },
    { key: 'm-07', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'academics', url: '/school/image/campus3.png', caption: 'Smart Classroom in Action', isfeatured: false, createdat: '2024-07-10T10:00:00Z' },
    { key: 'm-08', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'campus', url: '/school/image/campus4.png', caption: 'Indoor Sports Complex', isfeatured: true, createdat: '2024-08-15T10:00:00Z' },
    { key: 'm-09', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', mediatype: 'image', category: 'campus', url: '/school/image/campus1.png', caption: 'Campus Tour Video', isfeatured: true, createdat: '2024-06-01T10:00:00Z' },
  ],

  // ── events ─────────────────────────────────────────────────────────
  events: [
    { key: 'e-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', eventdate: '2026-02-21', starttime: '08:30:00', endtime: '13:00:00', title: 'Annual Sports Day', category: 'Sports', description: 'Athletic celebration with track events, team sports finals, and prize distribution. Parents welcome.', location: 'School Ground', isfeatured: true },
    { key: 'e-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', eventdate: '2026-02-22', starttime: '09:00:00', endtime: '12:00:00', title: 'Parent–Teacher Meeting', category: 'Academic', description: 'Quarterly PTM for all classes. Individual 10-minute slots. Bring your child\'s report card.', location: 'Respective Classrooms', isfeatured: false },
    { key: 'e-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', eventdate: '2026-02-25', starttime: '10:00:00', endtime: '17:00:00', title: 'Science & Technology Fair', category: 'Academic', description: 'Grade 6–12 students showcase STEM projects. Open to public and industry judges.', location: 'Auditorium & School Grounds', isfeatured: true },
    { key: 'e-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', eventdate: '2026-02-25', starttime: '18:00:00', endtime: '21:00:00', title: 'Annual Cultural Night', category: 'Cultural', description: 'An evening of music, dance, drama, and art. Performances by students across all grades.', location: 'Performing Arts Theatre', isfeatured: true },
    { key: 'e-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', eventdate: '2026-02-25', starttime: '09:00:00', endtime: '12:00:00', title: 'Inter-House Debate Competition', category: 'Academic', description: 'Annual debate championship between all four school houses. Topic announced on the day.', location: 'Main Auditorium', isfeatured: false },
  ],

  // ── admission_steps ────────────────────────────────────────────────
  admission_steps: [
    { key: 'as-01', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', step_number: 1, title: 'Fill Online Application', description: 'Complete the online form with your child\'s name, date of birth, and previous school records.', status: 'pending' },
    { key: 'as-02', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', step_number: 2, title: 'Document Submission', description: 'Upload birth certificate, mark sheets, transfer certificate, and two passport-size photographs.', status: 'pending' },
    { key: 'as-03', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', step_number: 3, title: 'Entrance Assessment', description: 'Grade-appropriate assessment: Classes 1–3 informal interaction; Classes 4–12 written Math & English test.', status: 'pending' },
    { key: 'as-04', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', step_number: 4, title: 'Interview & Campus Visit', description: 'Parents and child attend a brief interview with the admission coordinator. Campus tour available same day.', status: 'pending' },
    { key: 'as-05', schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', step_number: 5, title: 'Fee Payment & Confirmation', description: 'Pay admission fee online or at school office. Receive confirmation letter within 48 hours.', status: 'pending' },
  ],

  // ── school_identity ────────────────────────────────────────────────
  school_identity: {
    key: 'si-01',
    schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    vision: 'To be a globally recognised institution that nurtures compassionate, creative, and critical thinkers who lead with integrity.',
    mission: 'To provide a holistic, student-centred education that blends academic rigour with character development — preparing every child for the challenges and opportunities of the 21st century.',
    motto: 'Illuminate. Inspire. Excel.',
    about_title: 'About Us',
    about_description: 'Nestled in the serene outskirts of Chennai, Greenwood High School stands as a beacon of academic excellence and holistic development. Established in 2005, our co-educational institution affiliated with the Central Board of Secondary Education (CBSE) has evolved into one of the region’s most sought-after schools. With a sprawling campus, state-of-the-art facilities, and a student-centric approach, we are committed to nurturing the leaders of tomorrow.',
    why_choose_us: [
      {
        key: 'wc-01',
        schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        title: 'Academic Excellence',
        description: 'A rigorous curriculum that challenges students to reach their full potential.',
        icon: '📚',
      },
      {
        key: 'wc-02',
        schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        title: 'Holistic Development',
        description: 'A balanced approach that nurtures intellectual, emotional, and social growth.',
        icon: '🌱',
      },
      {
        key: 'wc-03',
        schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        title: 'Experienced Faculty',
        description: 'A team of dedicated educators committed to student success.',
        icon: '👨‍🏫',
      },
      {
        key: 'wc-04',
        schoolkey: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        title: 'State-of-the-Art Facilities',
        description: 'Modern infrastructure that supports learning and development.',
        icon: '🏫',
      },
    ],
  },

};
