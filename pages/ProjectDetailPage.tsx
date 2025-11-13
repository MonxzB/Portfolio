
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProjects } from './PortfolioPage';
import { PlayIcon } from '../components/icons';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = mockProjects.find(p => p.id === Number(projectId));

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
  
  const embedUrl = getEmbedUrl(project.liveUrl);

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="space-y-4">
         <Link to="/portfolio" className="text-purple-400 hover:text-purple-300 transition-colors duration-300 inline-block mb-4">
            &larr; Back to Portfolio
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">{project.title}</h1>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-purple-900/50 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
            {embedUrl ? (
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl shadow-purple-500/20">
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
                <img src={project.imageUrl} alt={project.title} className="rounded-lg shadow-xl shadow-purple-500/20 w-full object-cover" />
            )}
        </div>
        <div className="lg:col-span-2 space-y-8 text-gray-300">
            <div className="bg-gray-800/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-purple-300 mb-3">Objective</h2>
                <p className="leading-relaxed">{project.caseStudy?.objective}</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-purple-300 mb-3">Process</h2>
                <ul className="space-y-3 list-disc list-inside">
                    {project.caseStudy?.process.map((step, index) => (
                        <li key={index} className="leading-relaxed">{step}</li>
                    ))}
                </ul>
            </div>
             <div className="bg-gray-800/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-purple-300 mb-3">Outcome</h2>
                <p className="leading-relaxed">{project.caseStudy?.outcome}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;