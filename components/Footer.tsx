import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, InstagramIcon, FacebookIcon, WhatsAppIcon, BehanceIcon } from './icons';
import { getProfile } from '../services/firebaseService';
import { Profile } from '../types';

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
  const navigate = useNavigate();
  const [copyrightClicks, setCopyrightClicks] = useState(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      setProfile(profileData);
    };
    fetchProfile();
  }, []);

  const handleCopyrightClick = () => {
    const newClickCount = copyrightClicks + 1;
    setCopyrightClicks(newClickCount);

    if (newClickCount >= 5) {
      navigate('/admin');
      setCopyrightClicks(0); // Reset after navigation
    }
  };

  const socialLinks = profile?.socials 
    ? Object.entries(profile.socials)
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
            className="text-sm text-gray-400 cursor-pointer select-none"
            onClick={handleCopyrightClick}
            title="What could this be?"
          >
            &copy; {new Date().getFullYear()} {profile?.displayName || 'Your Name'}. All rights reserved.
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