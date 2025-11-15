import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, InstagramIcon, FacebookIcon, WhatsAppIcon, BehanceIcon } from './icons';
import { profileData } from '../data/profileData';

const iconMap: { [key: string]: React.ReactElement } = {
    github: <GithubIcon className="w-6 h-6" />,
    linkedin: <LinkedinIcon className="w-6 h-6" />,
    twitter: <TwitterIcon className="w-6 h-6" />,
    youtube: <YoutubeIcon className="w-6 h-6" />,
    instagram: <InstagramIcon className="w-6 h-6" />,
    facebook: <FacebookIcon className="w-6 h-6" />,
    whatsapp: <WhatsAppIcon className="w-6 h-6" />,
    behance: <BehanceIcon className="w-6 h-6" />,
};

const Footer: React.FC = () => {
  const socialLinks = profileData?.socials 
    ? Object.entries(profileData.socials)
        .filter(([, url]) => url)
        .map(([key, url]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            icon: iconMap[key],
            url: url,
        }))
    : [];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p 
            className="text-sm text-gray-400"
          >
            &copy; {new Date().getFullYear()} {profileData?.displayName || 'Your Name'}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((link) => link.icon && (
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