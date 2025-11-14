import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutGridIcon, BriefcaseIcon, UserCircleIcon, WrenchIcon, LogOutIcon, FilmIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutGridIcon className="w-5 h-5" /> },
  { name: 'Projects', path: '/admin/projects', icon: <BriefcaseIcon className="w-5 h-5" /> },
  { name: 'Profile', path: '/admin/profile', icon: <UserCircleIcon className="w-5 h-5" /> },
  { name: 'Skills', path: '/admin/skills', icon: <WrenchIcon className="w-5 h-5" /> },
];

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Navigation to '/login' is handled by the AuthProvider state change
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const activeStyle = {
    backgroundColor: '#a855f7', // purple-500
    color: 'white',
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-800/50 p-4 flex flex-col rounded-l-lg">
        <div className="flex items-center space-x-2 text-xl font-bold mb-8 px-2">
            <FilmIcon className="w-7 h-7 text-purple-500" />
            <span>Admin Panel</span>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {navLinks.map(link => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  style={({ isActive }) => (isActive ? activeStyle : {})}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-gray-300 hover:bg-purple-600 hover:text-white transition-colors duration-200"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-gray-300 hover:bg-red-600/80 hover:text-white transition-colors duration-200"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-800/20 p-6 sm:p-8 lg:p-10 overflow-y-auto rounded-r-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;