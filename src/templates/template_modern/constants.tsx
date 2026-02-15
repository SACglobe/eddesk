
import { BoardMember, Stat, SchoolEvent, Activity, Announcement } from './types';

export const SCHOOL_NAME = "St. Andrews Global Academy";
export const SCHOOL_TAGLINE = "Empowering Minds, Shaping Futures";

export const STATS: Stat[] = [
  { label: "Successful Alumni", value: "5000+", icon: "🎓" },
  { label: "Expert Faculty", value: "150+", icon: "👨‍🏫" },
  { label: "Campus Acres", value: "25", icon: "🏢" },
  { label: "Student Ratio", value: "15:1", icon: "👥" }
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: "Dr. Elena Vance",
    position: "Chairperson",
    image: "school/image/teacher1.png",
    bio: "Visionary educator with 30 years of experience in global school management."
  },
  {
    name: "Mr. Julian Sterling",
    position: "Secretary",
    image: "school/image/teacher2.png",
    bio: "Expert in institutional operations and community relations."
  },
  {
    name: "Mrs. Sarah Jenkins",
    position: "Treasurer",
    image: "school/image/teacher3.png",
    bio: "Committed to sustainable financial planning for educational excellence."
  }
];

export const ACTIVITIES: Activity[] = [
  {
    category: "Academic Enrichment",
    title: "Robotics & AI Lab",
    description: "Hands-on experience with modern automation and software development.",
    image: "school/image/campus2.png"
  },
  {
    category: "Sports & Development",
    title: "Olympic Aquatic Center",
    description: "Professional coaching in our state-of-the-art swimming facility.",
    image: "school/image/campus3.png"
  },
  {
    category: "Arts & Creativity",
    title: "Grand Theatre Arts",
    description: "Drama, dance, and fine arts programs to explore creative horizons.",
    image: "school/image/campus4.png"
  },
  {
    category: "Extra Curricular",
    title: "Sustainability Club",
    description: "Eco-warriors leading initiatives for a greener tomorrow.",
    image: "school/image/campus1.png"
  }
];

export const UPCOMING_EVENTS: SchoolEvent[] = [
  { id: "1", title: "Annual Science Fair", date: "Oct 15, 2024", description: "Witness innovation from our budding scientists.", category: "Academic" },
  { id: "2", title: "Varsity Soccer Finals", date: "Oct 22, 2024", description: "Championship match at the main stadium.", category: "Sports" },
  { id: "3", title: "Autumn Music Fest", date: "Nov 05, 2024", description: "A celebration of classical and modern music.", category: "Cultural" }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Admission Open for 2025-26",
    date: "Sep 20, 2024",
    content: "Registration forms are now available online and at the main school office.",
    priority: "High"
  },
  {
    id: "2",
    title: "Digital Library Expansion",
    date: "Sep 25, 2024",
    content: "Access over 50,000 new e-books through our upgraded learning portal.",
    priority: "Normal"
  },
  {
    id: "3",
    title: "Global Exchange Program",
    date: "Oct 01, 2024",
    content: "Applications are now invited for the 2025 International Student Exchange in London.",
    priority: "High"
  }
];
