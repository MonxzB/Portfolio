import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { ExternalLinkIcon, GithubIcon } from './icons';
import { getOptimizedCloudinaryUrl } from '../services/cloudinaryService';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/portfolio/${project.id}`);
  };

  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); // Ngăn không cho 'handleCardClick' chạy
  };

  const optimizedImageUrl = getOptimizedCloudinaryUrl(project.thumbnailUrl);

  return (
    // Dùng <div> thay vì <Link> để sửa lỗi <a> lồng <a>
    <div 
      onClick={handleCardClick} 
      className="block h-full transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer"
    >
      <div className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 group flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img src={optimizedImageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-purple-300">{project.title}</h3>
          
          {/* --- BẮT ĐẦU SỬA --- */}
          {/* - Đã thêm các class để giới hạn text trong 3 dòng và thêm "..."
            - overflow-hidden: Ẩn chữ thừa
            - [display:-webkit-box]: Dùng chế độ flexbox cũ (bắt buộc cho line-clamp)
            - [-webkit-box-orient:vertical]: Xếp chữ theo chiều dọc
            - [-webkit-line-clamp:3]: Giới hạn 3 dòng
          */}
          <p className="text-gray-400 text-sm mb-4 flex-grow overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {project.description}
          </p>
          {/* --- KẾT THÚC SỬA --- */}

          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills && project.skills.map((skill) => (
              <span key={skill.id} className="bg-purple-900/50 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                {skill.name}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 flex justify-end space-x-4 border-t border-gray-700/50">
            {project.linkDemo && (
              <a 
                href={project.linkDemo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300 z-10"
                onClick={handleExternalLink} 
              >
                <ExternalLinkIcon className="w-5 h-5 mr-2" /> Live Demo
              </a>
            )}
             {/* {project.linkGithub && (
              <a 
                href={project.linkGithub} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300 z-10"
                onClick={handleExternalLink}
              >
                <GithubIcon className="w-5 h-5 mr-2" /> GitHub
              </a>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;