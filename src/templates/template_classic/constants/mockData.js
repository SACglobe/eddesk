export const MOCK_DATA = {
    SCHOOL_PROFILE: {
        school_name: "EdDesk",
        logo: "https://cdn-icons-png.flaticon.com/512/2602/2602414.png",
        school_overview: "Founded in 1952, St. Augustine Higher Secondary School has been a cornerstone of academic excellence and moral integrity. Our institution is dedicated to nurturing young minds through a rigorous curriculum combined with a strong emphasis on character building and tradition. We believe in providing a disciplined environment where students can thrive both intellectually and spiritually.",
        vision: "To be a leading educational institution that empowers students with knowledge, skills, and values to excel in a globalized world while staying rooted in our cultural heritage.",
        mission: "To provide quality education that fosters critical thinking, creativity, and social responsibility in a safe and supportive learning environment.",
        motto: "Classic Template",
        address: "123 Academic Lane, Heritage District, City - 600001",
        phone: "+91 44 2345 6789",
        email: "info@staugustine.edu.in",
        office_hours: "Mon - Sat: 8:30 AM - 4:00 PM"
    },
    LEADERSHIP: {
        principal_name: "Dr. Robert P. Henderson",
        principal_message: "Welcome to St. Augustine. Education is not merely about accumulating facts but about the training of the mind to think. At our school, we prioritize the holistic development of every student, ensuring they are prepared for the challenges of the future with a solid foundation of ethics and discipline. We invite you to join our legacy of excellence.",
        principal_image: "school/image/principal.png",
        management_members: [
            {
                name: "Hon. Justice M. Krishnan",
                role: "Chairman",
                photo: "https://picsum.photos/seed/chair/400/500",
                message: "Our commitment to the community remains steadfast. We continue to invest in quality infrastructure and faculty to maintain our legacy."
            }
        ]
    },
    STATISTICS: [
        { label: "Years of Legacy", value: "72" },
        { label: "Faculty Members", value: "85" },
        { label: "Active Students", value: "1500" },
        { label: "Alumni Network", value: "25000" }
    ],
    ACHIEVEMENTS: {
        school_achievements: [
            { title: "Best Disciplined School Award", description: "Awarded by the State Education Board for excellence in maintaining institutional decorum.", year: "2023" },
            { title: "Academic Excellence Trophy", description: "Recognized for 100% pass rate in State Board examinations for 15 consecutive years.", year: "2022" }
        ],
        student_achievements: [
            {
                title: "Regional Basketball Champions",
                category: "Inter-School Sports",
                year: "2023",
                image: "school/image/sports_basketball.png"
            },
            {
                title: "State Level Athletics Gold",
                category: "Track & Field",
                year: "2023",
                image: "school/image/sports_athletics.png"
            },
            {
                title: "Inter-District kabadi Runners",
                category: "Kabadi",
                year: "2022",
                image: "school/image/sports_kabadi.png"
            },
            {
                title: "Academic Chess Master Title",
                category: "Indoor Sports",
                year: "2023",
                image: "school/image/sports_chess.png"
            },
            {
                title: "Annual Sports Meet Trophy",
                category: "Cricket",
                year: "2023",
                image: "school/image/sports_cricket.png"
            }
        ]
    },
    BROADCAST: {
        running_message: "Admissions for the Academic Year 2024-25 are now open. Download the prospectus from the Admissions page. Annual Day celebrations on Feb 15th.",
        announcements: [
            { title: "Holiday Notice", description: "School will remain closed on Jan 26th for Republic Day.", publish_date: "2024-01-20" },
            { title: "Exam Schedule", description: "Final Term examination schedule has been uploaded in the circulars section.", publish_date: "2024-01-15" }
        ],
        events: [
            { title: "Annual Sports Meet", description: "Inter-house sports competitions including track and field events.", event_date: "2024-02-10" },
            { title: "Science Exhibition", description: "Annual display of student projects and innovative models.", event_date: "2024-03-05" }
        ],
        academic_calendar: [
            { date: "2024-06-01", title: "School reopens", type: "Academic" },
            { date: "2024-10-20", title: "Quarterly Holidays", type: "Holiday" }
        ],
        circulars: [
            { title: "Final Exam Time Table - 2024", pdf_url: "#" },
            { title: "Revised Fee Structure", pdf_url: "#" }
        ]
    },
    ACTIVITIES: {
        academic: ["Science Club", "Math Olympiad", "Debate Society", "Literary Club"],
        sports: ["Football", "Cricket", "Basketball", "Athletics", "Chess"],
        arts: ["Classical Dance", "Carnatic Music", "Fine Arts", "Theatre"],
        life_skills: ["Scouts & Guides", "NCC", "First Aid Training", "Community Service"]
    },
    INFRASTRUCTURE: {
        labs: ["Physics Lab", "Chemistry Lab", "Biology Lab", "Computer Science Lab"],
        playground: ["Main Athletic Field", "Indoor Badminton Court", "Basketball Court"],
        classrooms: ["Smart Classrooms", "AV Room", "Audio-Visual Hall"],
        campus_images: [
            "school/image/campus1.png",
            "school/image/campus2.png",
            "school/image/campus3.png",
            "school/image/campus4.png",

        ]
    },
    ACADEMICS: {
        curriculum: "We follow the State Board Curriculum, supplemented with proprietary EduDesk teaching modules for holistic learning.",
        rules_and_regulations: [
            "Punctuality is mandatory. Students must arrive by 8:20 AM.",
            "Strict adherence to uniform code is required.",
            "Use of mobile phones within the campus is strictly prohibited."
        ],
        dress_code: "Standard white shirt with navy blue trousers for boys. White shirt with navy blue pinafore for girls. Formal black shoes and school tie are mandatory.",
        school_timings: [
            { period: "Assembly", time: "08:30 AM - 08:50 AM" },
            { period: "Period 1", time: "08:50 AM - 09:35 AM" },
            { period: "Break", time: "11:05 AM - 11:20 AM" },
            { period: "Lunch", time: "12:50 PM - 01:30 PM" }
        ]
    },
    BLOG: {
        blog_categories: ["Education", "Campus Life", "Pedagogy", "Health"],
        blog_posts: [
            {
                title: "Importance of Discipline in Education",
                excerpt: "Understanding how structure leads to success in academic pursuits.",
                content: "Discipline is the bridge between goals and accomplishment...",
                featured_image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
                category: "Pedagogy",
                publish_date: "2024-01-10",
                author: "Dr. Robert P. Henderson"
            }
        ]
    },
    ADMISSION: {
        admission_overview: "St. Augustine welcomes students from all backgrounds who are eager to learn and grow in a disciplined environment.",
        admission_process: [
            "Collect application form from school office or download online.",
            "Submit required documents (Birth Certificate, TC, Previous Marks).",
            "Entrance assessment for grades 5 and above.",
            "Interaction session with the Principal."
        ],
        admission_form_fields: [
            { label: "Student Name", type: "text", required: true },
            { label: "Date of Birth", type: "date", required: true },
            { label: "Grade Seeking", type: "select", required: true },
            { label: "Parent Email", type: "email", required: true }
        ],
        fee_payment_url: "https://ccavenue.com/pay/staugustine"
    },
    FACULTY: {
        board_members: [
            { name: "Mr. Samuel Verghese", role: "Secretary", photo: "school/image/teacher1.png" },
            { name: "Mrs. Anjali Devi", role: "Treasurer", photo: "school/image/teacher2.png" }
        ],
        teachers: [
            { name: "Mrs. Sarah James", subject: "Senior Faculty - Mathematics", photo: "school/image/teacher1.png" },
            { name: "Mr. David Paul", subject: "Lead Instructor - Physical Education", photo: "school/image/teacher2.png" },
            { name: "Ms. Elena Gilbert", subject: "Department Head - English Literature", photo: "school/image/teacher3.png" },
            { name: "Dr. Alaric Saltzman", subject: "Senior Researcher - World History", photo: "school/image/teacher1.png" }
        ]
    },
    MANDATORY_DISCLOSURE: {
        documents: [
            { title: "NOC from State Government", pdf_url: "#" },
            { title: "Building Safety Certificate", pdf_url: "#" },
            { title: "Fire Safety Certificate", pdf_url: "#" }
        ]
    }
};
