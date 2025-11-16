export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  
  // techStack: string[]; // <-- XÓA DÒNG NÀY
  skills: Skill[]; // <-- THÊM DÒNG NÀY (Để lưu trữ skills lấy từ bảng nối)

  linkDemo?: string;
  linkGithub?: string;
  created_at: string; // <-- Đổi tên từ createdAt
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
  user_id?: string;
  role?: string;
}