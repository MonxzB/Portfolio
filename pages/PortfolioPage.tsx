import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projectsData';

const PortfolioPage: React.FC = () => {
  const projects = projectsData.filter(p => p.isPublished);

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