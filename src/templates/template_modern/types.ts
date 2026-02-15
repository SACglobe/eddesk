
export interface BoardMember {
  name: string;
  position: string;
  image: string;
  bio: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  category: 'Academic' | 'Sports' | 'Cultural';
}

export interface Activity {
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  priority: 'High' | 'Normal';
}
