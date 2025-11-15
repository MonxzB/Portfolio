import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getPublishedProjects } from '../services/supabaseService';
import { Project } from '../types';

const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getPublishedProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
       <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">My Portfolio</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Here is a selection of my work. Each project represents a unique story, a creative challenge, and an opportunity to bring a vision to life.
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;