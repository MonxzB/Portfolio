import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProjectById, addProject, updateProject } from '../../services/supabaseService';
import { uploadImage } from '../../services/cloudinaryService';
import { Project } from '../../types';

const EditProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(projectId);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    linkDemo: '',
    linkGithub: '',
    isPublished: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string>('');


  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isEditing && projectId) {
      const fetchProjectData = async () => {
        try {
          const projectToEdit = await getProjectById(Number(projectId));
          if (projectToEdit) {
            setFormData({
              title: projectToEdit.title,
              description: projectToEdit.description,
              techStack: projectToEdit.techStack.join(', '),
              linkDemo: projectToEdit.linkDemo || '',
              linkGithub: projectToEdit.linkGithub || '',
              isPublished: projectToEdit.isPublished,
            });
            setImagePreview(projectToEdit.thumbnailUrl);
            setExistingThumbnailUrl(projectToEdit.thumbnailUrl);
          } else {
            navigate('/admin/projects');
          }
        } catch (error) {
          console.error("Failed to fetch project for editing:", (error as Error).message);
          navigate('/admin/projects');
        } finally {
            setIsFetching(false);
        }
      };
      fetchProjectData();
    } else {
        setIsFetching(false);
    }
  }, [isEditing, projectId, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile && !isEditing) {
        setStatus({ type: 'error', message: 'A thumbnail image is required for a new project.' });
        return;
    }

    setIsLoading(true);
    setStatus(null);
    
    try {
        let thumbnailUrl = existingThumbnailUrl;
        if (imageFile) {
            thumbnailUrl = await uploadImage(imageFile);
        }

        const projectData: Omit<Project, 'id' | 'createdAt'> = {
            ...formData,
            techStack: formData.techStack.split(',').map(t => t.trim()).filter(t => t),
            thumbnailUrl: thumbnailUrl,
        };

        if (isEditing && projectId) {
            await updateProject(Number(projectId), projectData);
            setStatus({ type: 'success', message: `Project updated successfully!`});
        } else {
            await addProject(projectData);
            setStatus({ type: 'success', message: `Project created successfully!`});
        }
      
      setTimeout(() => navigate('/admin/projects'), 1500);

    } catch (err) {
      setStatus({ type: 'error', message: (err as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center p-8">Loading project data...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/admin/projects" className="text-purple-400 hover:text-purple-300 transition-colors duration-300 inline-block">
          &larr; Back to Projects
        </Link>
      </div>

      <section>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">{isEditing ? 'Edit Project' : 'Add New Project'}</h1>
      </section>

      <div className="max-w-4xl bg-gray-800/50 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
            </div>
            <div>
              <label htmlFor="techStack" className="block text-sm font-medium text-gray-300 mb-2">Tech Stack (comma-separated)</label>
              <input type="text" id="techStack" name="techStack" value={formData.techStack} onChange={handleChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition"></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="linkDemo" className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
              <input type="url" id="linkDemo" name="linkDemo" value={formData.linkDemo} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
            </div>
            <div>
              <label htmlFor="linkGithub" className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <input type="url" id="linkGithub" name="linkGithub" value={formData.linkGithub} onChange={handleChange} className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
             <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Image</label>
                <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/40 transition" />
             </div>
             {imagePreview && (
                 <div className="mt-4 md:mt-0">
                    <img src={imagePreview} alt="Image preview" className="w-40 h-auto object-cover rounded-lg shadow-md" />
                 </div>
             )}
          </div>
          
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="w-5 h-5 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-500" />
              <span className="text-gray-300">Publish this project (visible on public site)</span>
            </label>
          </div>

          {status && (
            <div className={`text-center p-3 rounded-md text-sm ${status.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
              {status.message}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <Link to="/admin/projects" className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full transition-colors">
                Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/40 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;