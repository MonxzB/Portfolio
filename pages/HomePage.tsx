import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, WhatsAppIcon, BehanceIcon } from '../components/icons';

const HomePage: React.FC = () => {

  const socialLinks = [
    { name: 'Instagram', icon: <InstagramIcon className="w-8 h-8" />, url: '#' },
    { name: 'Facebook', icon: <FacebookIcon className="w-8 h-8" />, url: '#' },
    { name: 'WhatsApp', icon: <WhatsAppIcon className="w-8 h-8" />, url: '#' },
    { name: 'Behance', icon: <BehanceIcon className="w-8 h-8" />, url: '#' },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 md:py-24">
      <div className="relative mb-8">
        <img
          src="https://picsum.photos/seed/videoeditor/200"
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover shadow-2xl shadow-purple-500/30 border-4 border-gray-700"
        />
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-2xl" role="img" aria-label="wave">🎬</span>
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Your Name</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        A creative Video Editor specializing in visual storytelling and post-production. I bring narratives to life through compelling and dynamic edits.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/portfolio"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/40"
        >
          View My Work
        </Link>
        <Link
          to="/contact"
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Get In Touch
        </Link>
      </div>

      <div className="mt-12 flex justify-center space-x-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            aria-label={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default HomePage;