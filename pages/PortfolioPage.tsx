import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import { listenToProjects } from '../services/firebaseService';

const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // listenToProjects returns an unsubscribe function
    const unsubscribe = listenToProjects(
      (newProjects) => {
        setProjects(newProjects);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        setError('Failed to load projects. Please try again later.');
        console.error(err);
        setIsLoading(false);
      }
    );

    // Cleanup subscription on component unmount
    return () => unsubscribe();
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