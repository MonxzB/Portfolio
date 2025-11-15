import React, { useState, useEffect, useRef } from 'react'; // <-- THÊM useRef
import { useNavigate } from 'react-router-dom'; // <-- THÊM useNavigate
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, InstagramIcon, FacebookIcon, WhatsAppIcon, BehanceIcon } from './icons';
import { getProfile } from '../services/supabaseService';
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
  const [profile, setProfile] = useState<Profile | null>(null);
  
  // --- LOGIC MỚI CHO EASTER EGG ---
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  // Dùng useRef để lưu trữ ID của timer, giúp chúng ta reset timer
  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  // ---------------------------------

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile for footer:", (error as Error).message);
      }
    };
    fetchProfile();
  }, []);

  // --- HÀM MỚI XỬ LÝ CLICK ---
  const handleCopyrightClick = () => {
    // 1. Mỗi lần click, xóa timer reset cũ (nếu có)
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    // 2. Tăng số lần click lên
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // 3. Nếu click đủ 5 lần
    if (newCount === 5) {
      console.log("Easter Egg: Navigating to /admin");
      navigate('/admin'); // Chuyển hướng đến trang admin
      setClickCount(0); // Reset lại số lần click
    } else {
      // 4. Nếu chưa đủ 5 lần, đặt 1 timer. Nếu 2 giây sau không click nữa, tự reset về 0.
      clickTimer.current = setTimeout(() => {
        setClickCount(0);
      }, 2000); // 2 giây
    }
  };
  // ----------------------------

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
            className="text-sm text-gray-400 cursor-pointer" // <-- THÊM "cursor-pointer"
            onClick={handleCopyrightClick} // <-- THÊM SỰ KIỆN onClick
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