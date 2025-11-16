import React, { useState, useEffect } from 'react'; // <-- Đã thêm useState, useEffect
import { Link } from 'react-router-dom';
import { VideoIcon, WrenchIcon, UserCircleIcon, PlusIcon, EditIcon } from '../../components/icons';
import { getAllProjects, getSkills, getProfile } from '../../services/supabaseService'; // <-- Đã thêm hàm
import { Project, Skill, Profile } from '../../types'; // <-- Đã thêm types

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform transform hover:-translate-y-1">
    <div className="bg-gray-900/50 p-4 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const DashboardHomePage: React.FC = () => {
  // --- BẮT ĐẦU CODE MỚI ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi cả 3 hàm cùng lúc để lấy dữ liệu
        const [projectData, skillsData, profileData] = await Promise.all([
          getAllProjects(),
          getSkills(),
          getProfile()
        ]);
        
        setProjects(projectData);
        setSkills(skillsData);
        setProfile(profileData);
        
      } catch (error) {
        console.error("Failed to fetch dashboard data:", (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // --- KẾT THÚC CODE MỚI ---

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Dashboard</h1>
        <p className="text-lg text-gray-400 mt-2">Welcome! Here's a quick overview of your portfolio.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* --- ĐÃ SỬA CÁC GIÁ TRỊ "value" --- */}
        <StatCard 
          title="Total Projects" 
          value={loading ? '...' : projects.length.toString()} 
          icon={<VideoIcon className="w-8 h-8 text-purple-400" />} 
        />
        <StatCard 
          title="Skills Listed" 
          value={loading ? '...' : skills.length.toString()} 
          icon={<WrenchIcon className="w-8 h-8 text-purple-400" />} 
        />
        <StatCard 
          title="Profile Status" 
          value={loading ? '...' : (profile ? 'Complete' : 'Missing')} 
          icon={<UserCircleIcon className={`w-8 h-8 ${profile ? 'text-green-400' : 'text-yellow-400'}`} />} 
        />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
            <Link 
                to="/admin/projects/new"
                className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
                <PlusIcon className="w-5 h-5 mr-2" /> Add New Project
            </Link>
            <Link 
                to="/admin/profile"
                className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
                <EditIcon className="w-5 h-5 mr-2" /> Edit Your Profile
            </Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardHomePage;