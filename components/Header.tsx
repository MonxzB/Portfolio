
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { FilmIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md shadow-purple-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:text-purple-400 transition-colors duration-300">
            <FilmIcon className="w-8 h-8 text-purple-500" />
            <span>MyPortfolio</span>
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;