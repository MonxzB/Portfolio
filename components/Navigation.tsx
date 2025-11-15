import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from './icons';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const activeLinkStyle = {
    color: '#a855f7', // purple-500
    textShadow: '0 0 8px #a855f7',
  };

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          style={({ isActive }) => (isActive ? activeLinkStyle : {})}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          {link.name}
        </NavLink>
      ))}
      {user && isAdmin && (
        <NavLink
          to="/admin"
          style={({ isActive }) => (isActive ? activeLinkStyle : {})}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          Admin
        </NavLink>
      )}
    </>
  );

  return (
    <>
      <nav className="hidden md:flex items-center space-x-4">
        <NavLinks />
      </nav>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
          {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-gray-800 shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <NavLinks />
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;