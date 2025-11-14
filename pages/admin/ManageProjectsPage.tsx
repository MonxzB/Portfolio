import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { getAllProjects, deleteProject } from '../../services/firebaseService';
import { PlusIcon, EditIcon, TrashIcon } from '../../components/icons';

const ManageProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the project "${projectTitle}"?`)) {
      try {
        await deleteProject(projectId);
        setProjects(projects.filter(p => p.id !== projectId));
        alert(`Project "${projectTitle}" has been deleted.`);
      } catch (error) {
        alert("Failed to delete project.");
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Manage Projects</h1>
          <p className="text-md text-gray-400 mt-2">Add, edit, or delete your portfolio projects.</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Project
        </Link>
      </section>

      <section>
        <div className="bg-gray-800/50 rounded-lg shadow-lg overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">Loading projects...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="p-4 font-semibold w-1/4">Thumbnail</th>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.id} className={`border-t border-gray-700/50 ${index % 2 === 0 ? 'bg-gray-800/30' : ''}`}>
                    <td className="p-4">
                      <img src={project.imageUrl} alt={project.title} className="w-24 h-16 object-cover rounded-md"/>
                    </td>
                    <td className="p-4 font-medium">{project.title}</td>
                    <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.isPublished ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'}`}>
                            {project.isPublished ? 'Published' : 'Draft'}
                        </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex rounded-md shadow-sm" role="group">
                        <Link
                          to={`/admin/projects/edit/${project.id}`}
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-l-lg hover:bg-gray-600"
                        >
                          <EditIcon className="w-4 h-4 mr-2" /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-red-800 rounded-r-lg hover:bg-red-700"
                        >
                          <TrashIcon className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default ManageProjectsPage;