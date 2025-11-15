import React from 'react';
import SkillBadge from '../components/SkillBadge';
import { skillsData } from '../data/skillsData';
import { profileData } from '../data/profileData';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">About Me</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          {profileData?.headline || "I'm a passionate video editor with a keen eye for detail and a love for storytelling."}
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 flex justify-center">
            <img 
                src={profileData?.avatarUrl || "https://picsum.photos/seed/aboutvideo/400/500"} 
                alt="About me" 
                className="rounded-lg shadow-xl shadow-purple-500/20 w-full max-w-sm object-cover"
            />
        </div>
        <div className="md:col-span-2 space-y-4 text-gray-300">
          <h2 className="text-2xl font-bold text-purple-300">My Journey</h2>
          <p className="whitespace-pre-wrap">
            {profileData?.bio || 'My journey into video editing began with a simple fascination for the magic of cinema. This curiosity quickly evolved into a dedicated pursuit of the craft of post-production.'}
          </p>
           <a
            href="/path-to-your-cv.pdf" // This can be a URL from Firestore in the future
            download
            className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Download CV
          </a>
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {skillsData.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;