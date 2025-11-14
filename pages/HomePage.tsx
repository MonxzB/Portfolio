import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, WhatsAppIcon, BehanceIcon, GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '../components/icons';
import { Profile } from '../types';
import { getProfile } from '../services/firebaseService';

const iconMap: { [key: string]: React.ReactElement } = {
    github: <GithubIcon className="w-8 h-8" />,
    linkedin: <LinkedinIcon className="w-8 h-8" />,
    twitter: <TwitterIcon className="w-8 h-8" />,
    youtube: <YoutubeIcon className="w-8 h-8" />,
    instagram: <InstagramIcon className="w-8 h-8" />,
    facebook: <FacebookIcon className="w-8 h-8" />,
    whatsapp: <WhatsAppIcon className="w-8 h-8" />,
    behance: <BehanceIcon className="w-8 h-8" />,
};

const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
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
    <div className="flex flex-col items-center justify-center text-center py-16 md:py-24">
      <div className="relative mb-8">
        <img
          src={profile?.avatarUrl || "https://picsum.photos/seed/videoeditor/200"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover shadow-2xl shadow-purple-500/30 border-4 border-gray-700"
        />
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-2xl" role="img" aria-label="wave">🎬</span>
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{profile?.displayName || 'Your Name'}</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        {profile?.headline || 'A creative Video Editor specializing in visual storytelling and post-production. I bring narratives to life through compelling and dynamic edits.'}
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
  );
};

export default HomePage;