
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  caseStudy?: {
    objective: string;
    process: string[];
    outcome: string;
  };
}

export interface Skill {
  name: string;
  level: number; // A number from 0 to 100 for progress bar
}
