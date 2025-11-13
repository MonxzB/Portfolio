
import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from './icons';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <GithubIcon className="w-6 h-6" />, url: 'https://github.com' },
    { name: 'LinkedIn', icon: <LinkedinIcon className="w-6 h-6" />, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: <TwitterIcon className="w-6 h-6" />, url: 'https://twitter.com' },
    { name: 'YouTube', icon: <YoutubeIcon className="w-6 h-6" />, url: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex space-x-6">
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
      </div>
    </footer>
  );
};

export default Footer;