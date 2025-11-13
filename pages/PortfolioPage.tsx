import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Cinematic Travel Film: "Alpine Echoes"',
    description: 'A short, cinematic film capturing the breathtaking beauty of the Swiss Alps. Focused on storytelling through stunning visuals, expert color grading, and immersive sound design.',
    imageUrl: 'https://picsum.photos/seed/projectvideo1/400/300',
    tags: ['Premiere Pro', 'Color Grading', 'Drone Footage', 'Sound Design'],
    liveUrl: 'https://www.youtube.com/watch?v=zpOULjyy-n8',
    caseStudy: {
      objective: "Create a visually stunning and emotionally resonant travel film that transports the viewer to the Swiss Alps, highlighting its majestic landscapes and serene atmosphere.",
      process: [
        "Pre-production: Storyboarding key shots and planning drone flight paths for optimal lighting and composition.",
        "Production: On-location filming over 5 days, capturing a variety of scenes from sunrise to sunset.",
        "Post-production: Editing in Premiere Pro to build a compelling narrative, followed by advanced color grading in DaVinci Resolve to enhance the mood.",
        "Sound Design: Layering ambient sounds, a custom score, and subtle sound effects to create an immersive audio experience."
      ],
      outcome: "The final film received accolades at a local film festival and garnered over 50,000 views on YouTube, successfully showcasing the beauty of the location and my storytelling skills."
    }
  },
  {
    id: 2,
    title: 'Commercial Ad: "Velocity"',
    description: 'A high-energy commercial for a new sports drink. This project involved fast-paced editing, dynamic motion graphics, and seamless visual effects to create an exciting final product.',
    imageUrl: 'https://picsum.photos/seed/projectvideo2/400/300',
    tags: ['After Effects', 'Commercial', 'Motion Graphics', 'Fast-Paced'],
    liveUrl: 'https://www.youtube.com/watch?v=2n6tPlQ_maw',
    caseStudy: {
      objective: "Produce a 30-second TV commercial that conveys the energy and power of the 'Velocity' sports drink, targeting a young, active audience.",
      process: [
        "Concept Development: Collaborated with the marketing team to develop a concept centered around explosive movement and vibrant colors.",
        "Editing: Utilized fast cuts, speed ramps, and match cuts to create a dynamic and engaging pace.",
        "Motion Graphics: Designed and animated custom text overlays and logos in After Effects to reinforce branding.",
        "VFX: Integrated visual effects such as energy trails and particle effects to enhance the action sequences."
      ],
      outcome: "The commercial aired on major sports networks, contributing to a 15% increase in product sales during the campaign period. The client praised the ad for its high production value and energetic feel."
    }
  },
  {
    id: 3,
    title: 'Music Video: "Neon Dreams"',
    description: 'An atmospheric music video for an indie artist. The edit focuses on creating a dreamlike mood with creative transitions, stylized color palettes, and syncing visuals perfectly to the rhythm.',
    imageUrl: 'https://picsum.photos/seed/projectvideo3/400/300',
    tags: ['DaVinci Resolve', 'Music Video', 'Stylized', 'Storytelling'],
    liveUrl: 'https://www.youtube.com/watch?v=843b-K_i1P4',
    caseStudy: {
      objective: "Translate the ethereal and melancholic mood of the song 'Neon Dreams' into a compelling visual narrative that complements the artist's vision.",
      process: [
        "Collaboration: Worked closely with the artist and director to understand the song's themes and desired aesthetic.",
        "Pacing and Rhythm: Edited the footage to match the song's tempo and emotional arc, using slow-motion and rhythmic cuts.",
        "Color Grading: Developed a unique, stylized color palette with neon-hued blues and pinks in DaVinci Resolve to create a dreamlike atmosphere.",
        "Transitions: Implemented creative transitions, such as light leaks and seamless masks, to enhance the surreal quality of the video."
      ],
      outcome: "The music video was featured on several prominent music blogs and helped the artist gain significant traction online. It was praised for its strong visual identity and emotional depth."
    }
  },
];


const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // --- MOCK API CALL ---
        console.log('Fetching projects (mock)...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // To test the error state, you can uncomment the following line:
        // throw new Error("Simulated network error");

        setProjects(mockProjects);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">My Portfolio</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Here is a selection of my work. Each project represents a unique story, a creative challenge, and an opportunity to bring a vision to life.
        </p>
      </section>
      
      {isLoading && (
        <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-10">
          <p className="text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;