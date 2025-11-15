
export interface Project {
  id: string; // Firestore document ID
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  linkDemo?: string;
  linkGithub?: string;
  createdAt: string;
  isPublished: boolean;
}

export interface Skill {
  id: string; // Firestore document ID
  name: string;
  iconUrl: string;
}

export interface Profile {
  displayName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    behance?: string;
  };
}