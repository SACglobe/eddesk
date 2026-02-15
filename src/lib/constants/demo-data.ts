import { SchoolContent } from './types';

export const demoSchoolData: SchoolContent = {
    meta: {
        schoolId: "demo-school-classic",
        schoolName: "St. Augustine Higher Secondary School",
        establishedYear: 1952,
        motto: "Classic Template"
    },
    branding: {
        primaryColor: "#064e3b", // emerald-900
        secondaryColor: "#10b981", // emerald-500
        textColor: "#0f172a", // slate-900
        logoUrl: "https://cdn-icons-png.flaticon.com/512/2602/2602414.png"
    },
    contact: {
        address: "123 Education Lane, Academic District, Portland, OR 97201",
        phone: "+1 (503) 555-0123",
        email: "contact@staugustine.edu",
        googleMapLink: "",
        hours: "08:30 AM - 04:30 PM",
        location: "Portland, USA"
    },
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/staugustines' },
        { platform: 'instagram', url: 'https://instagram.com/staugustines' }
    ],
    visionMission: {
        vision: "To be a leading educational institution that empowers students with knowledge, skills, and values to excel in a globalized world while staying rooted in our cultural heritage.",
        mission: "To provide quality education that fosters critical thinking, creativity, and social responsibility in a safe and supportive learning environment."
    },
    vision: "To be a leading educational institution that empowers students with knowledge, skills, and values to excel in a globalized world while staying rooted in our cultural heritage.",
    mission: "To provide quality education that fosters critical thinking, creativity, and social responsibility in a safe and supportive learning environment.",
    principal: {
        name: "Dr. Robert P. Henderson",
        message: "Welcome to St. Augustine. Education is not merely about accumulating facts but about the training of the mind to think. At our school, we prioritize the holistic development of every student, ensuring they are prepared for the challenges of the future with a solid foundation of ethics and discipline. We invite you to join our legacy of excellence.",
        photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" // Placeholder for local image
    },
    highlights: [
        {
            title: "Academic Rigor",
            description: "A curriculum designed to challenge and inspire high-performers."
        },
        {
            title: "Disciplined Culture",
            description: "A strict yet supportive environment that builds character."
        },
        {
            title: "Tradition & Legacy",
            description: "72 years of producing leaders and scholars."
        },
        {
            title: "Expert Faculty",
            description: "Mentors who are subject matter experts and dedicated educators."
        }
    ],
    events: [
        {
            id: "1",
            title: "Annual Sports Meet",
            description: "Inter-house sports competitions including track and field events.",
            date: "2024-02-10"
        },
        {
            id: "2",
            title: "Science Exhibition",
            description: "Annual display of student projects and innovative models.",
            date: "2024-03-05"
        }
    ],
    gallery: [
        { id: "1", imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop" },
        { id: "2", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" },
        { id: "3", imageUrl: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop" },
        { id: "4", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop" }
    ],
    admission: {
        overview: "St. Augustine welcomes students from all backgrounds who are eager to learn and grow in a disciplined environment.",
        process: "Collect application form, Submit documents, Entrance assessment, Principal interaction.",
        contactNote: "Our office will contact you within 48 business hours.",
        feePaymentUrl: "https://ccavenue.com/pay/staugustine",
        formFields: [
            { label: "Student Name", type: "text", required: true },
            { label: "Date of Birth", type: "date", required: true },
            { label: "Grade Seeking", type: "select", required: true },
            { label: "Parent Email", type: "email", required: true }
        ]
    },
    footer: {
        copyrightText: "© 2024 St. Augustine's School. All Rights Reserved."
    },
    // Extended fields
    leadership: {
        management: [
            {
                name: "Hon. Justice M. Krishnan",
                role: "Chairman",
                photo: "https://picsum.photos/seed/chair/400/500",
                message: "Our commitment to the community remains steadfast."
            }
        ]
    },
    statistics: [
        { label: "Years of Legacy", value: "72" },
        { label: "Faculty Members", value: "85" },
        { label: "Active Students", value: "1500" },
        { label: "Alumni Network", value: "25000" }
    ],
    achievements: {
        school: [
            { title: "Best Disciplined School Award", description: "Awarded by the State Education Board for excellence in maintaining institutional decorum.", year: "2023" },
            { title: "Academic Excellence Trophy", description: "Recognized for 100% pass rate in State Board examinations for 15 consecutive years.", year: "2022" }
        ],
        students: [
            {
                title: "Regional Basketball Champions",
                category: "Inter-School Sports",
                year: "2023",
                image: "https://images.unsplash.com/photo-1546519638-68e109498ee3?q=80&w=2070&auto=format&fit=crop"
            },
            {
                title: "State Level Athletics Gold",
                category: "Track & Field",
                year: "2023",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop"
            }
        ]
    },
    broadcast: {
        runningMessage: "Admissions for the Academic Year 2024-25 are now open. Download the prospectus from the Admissions page. Annual Day celebrations on Feb 15th.",
        announcements: [
            { title: "Holiday Notice", description: "School will remain closed on Jan 26th for Republic Day.", publishDate: "2024-01-20" }
        ]
    },
    activities: {
        academic: [{ title: "Academic Excellence", description: "Focused on core mastery.", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071" }],
        clubs: [{ title: "Hobby Clubs", description: "Exploring diverse interests.", image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=2070" }],
        sports: [{ title: "Athletic Programs", description: "Physical fitness and teamwork.", image: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070" }],
        extraCurricular: [],
        arts: [],
        leadership: []
    },
    principalMessage: {
        name: "Dr. Robert Sterling",
        text: "Welcome to our institution of excellence.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000"
    },
    boardMessage: {
        title: "Message from the Board",
        text: "We are committed to the future of our students."
    },
    infrastructure: [
        { name: "Science Labs", description: "Advanced labs for Physics, Chemistry, and Biology.", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086" },
        { name: "Smart Classrooms", description: "Digitally enabled learning spaces.", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071" },
        { name: "Athletic Field", description: "Our main playground and sports arena.", image: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070" }
    ],
    faculty: {
        teachers: [
            { name: "Mrs. Sarah James", subject: "Senior Faculty - Mathematics", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" },
            { name: "Mr. David Paul", subject: "Lead Instructor - Physical Education", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" },
            { name: "Ms. Elena Gilbert", subject: "Department Head - English Literature", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop" },
            { name: "Dr. Alaric Saltzman", subject: "Senior Researcher - World History", photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    academics: {
        curriculum: "We follow the State Board Curriculum, supplemented with proprietary EduDesk teaching modules for holistic learning.",
        schoolTimings: [
            { period: "Assembly", time: "08:30 AM - 08:50 AM" },
            { period: "Period 1", time: "08:50 AM - 09:35 AM" }
        ]
    }
};
