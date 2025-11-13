
import React, { useState } from 'react';

const AdminPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTags('');
    setLiveUrl('');
    setImage(null);
    // Also reset the file input visually
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      setStatus({ type: 'error', message: 'Please select an image.' });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
        setStatus({ type: 'error', message: 'Authentication error. Please log in again.' });
        setIsLoading(false);
        return;
    }

    try {
      // --- MOCK API CALL ---
      // In a real application, a FormData object would be sent to the backend.
      // Here, we simulate a successful upload after a delay.
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Mock uploading project with the following data:');
      console.log({ title, description, tags, liveUrl, imageName: image.name });
      
      // Uncomment the line below to test the error state
      // throw new Error('Simulated server upload error.');

      setStatus({ type: 'success', message: 'Project added successfully! (This is a mock response)' });
      resetForm();

    } catch (err) {
      setStatus({ type: 'error', message: (err as Error).message || 'An error occurred during the mock upload.' });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Admin Panel</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Add a new project to your portfolio.
        </p>
      </section>

      <div className="max-w-3xl mx-auto bg-gray-800/50 p-8 rounded-lg shadow-lg shadow-purple-500/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" />
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
                <input type="text" id="tags" value={tags} onChange={e => setTags(e.target.value)} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"></textarea>
          </div>
          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-300 mb-2">Video URL (YouTube, Vimeo, etc.)</label>
            <input type="url" id="liveUrl" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Image</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} required className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/40" />
          </div>

          {status && (
            <div className={`text-center p-3 rounded-md text-sm ${status.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/40 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Uploading...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;