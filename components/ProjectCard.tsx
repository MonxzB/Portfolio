
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { PlayIcon } from './icons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  
  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <Link to={`/portfolio/${project.id}`} className="block h-full transition-transform duration-300 transform hover:-translate-y-2">
      <div className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 group flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-purple-300">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="bg-purple-900/50 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-4 flex justify-end space-x-4 border-t border-gray-700/50">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300 z-10"
                onClick={handleExternalLink}
              >
                <PlayIcon className="w-5 h-5 mr-2" /> Watch Video
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
