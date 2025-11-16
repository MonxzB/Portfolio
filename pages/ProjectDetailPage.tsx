import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/supabaseService';
import { Project } from '../types';
import { getOptimizedCloudinaryUrl } from '../services/cloudinaryService';
// --- THÊM IMPORT ICON ---
import { ExternalLinkIcon, GithubIcon } from '../components/icons'; 

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        try {
          const data = await getProjectById(Number(projectId));
          setProject(data);
        } catch (error) {
          console.error(`Failed to fetch project with id ${projectId}:`, (error as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProject();
  }, [projectId]);

  const getEmbedUrl = (url: string | undefined): string | null => {
    if (!url || url === '#') return null;

    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    let match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&showinfo=0`;
    }

    const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/;
    match = url.match(vimeoRegex);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}`;
    }

    return null;
  };

  if (loading) {
     return (
       <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-400 mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8">Sorry, we couldn't find the project you're looking for.</p>
        <Link
          to="/portfolio"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
        >
          Back to Portfolio
        </Link>
      </div>
    );
  }
  
  const embedUrl = getEmbedUrl(project.linkDemo);
  const optimizedImageUrl = getOptimizedCloudinaryUrl(project.thumbnailUrl, { width: 1280, height: 720 });


  return (
    // --- BẮT ĐẦU THAY ĐỔI BỐ CỤC ---
    <div className="space-y-8 animate-fade-in">
        <div>
            <Link to="/portfolio" className="text-purple-400 hover:text-purple-300 transition-colors duration-300 inline-block mb-4">
                &larr; Back to Portfolio
            </Link>
        </div>
        
        {/* Chia thành 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* --- CỘT BÊN TRÁI (Video, Tiêu đề, Links) --- */}
            <div className="lg:col-span-2 space-y-6">
                <section>
                    {embedUrl ? (
                        <div className="aspect-video rounded-lg overflow-hidden shadow-xl shadow-purple-500/20">
                            <iframe
                                src={embedUrl}
                                title={project.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    ) : (
                        <img src={optimizedImageUrl} alt={project.title} className="rounded-lg shadow-xl shadow-purple-500/20 w-full object-cover" />
                    )}
                </section>

                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">{project.title}</h1>
                
                {/* Thêm phần Links */}
                <div className="flex justify-start space-x-6 border-t border-gray-700/50 pt-4">
                    {project.linkDemo && (
                    <a 
                        href={project.linkDemo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300 z-10"
                    >
                        <ExternalLinkIcon className="w-5 h-5 mr-2" /> Live Demo
                    </a>
                    )}
                    {project.linkGithub && (
                    <a 
                        href={project.linkGithub} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300 z-10"
                    >
                        <GithubIcon className="w-5 h-5 mr-2" /> GitHub
                    </a>
                    )}
                </div>
            </div>

            {/* --- CỘT BÊN PHẢI (Mô tả, Skills) --- */}
            <div className="lg:col-span-1 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-purple-300">About this project</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{project.description}</p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-purple-300">Skills Used</h2>
                    <div className="flex flex-wrap gap-2">
                        {/* Sửa từ project.techStack.map thành project.skills.map */}
                        {project.skills && project.skills.map((skill) => (
                            <span key={skill.id} className="bg-purple-900/50 text-purple-300 text-sm font-semibold px-3 py-1 rounded-full">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    // --- KẾT THÚC THAY ĐỔI BỐ CỤC ---
  );
};

export default ProjectDetailPage;