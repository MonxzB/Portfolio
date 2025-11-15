export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  techStack: string[];
  linkDemo?: string;
  linkGithub?: string;
  createdAt: string; // ISO 8601 string from Supabase
  isPublished: boolean;
}

export interface Skill {
  id: number;
  name: string;
  iconUrl: string;
}

export interface Profile {
  id: number;
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