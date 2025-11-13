
import React from 'react';
import { Skill } from '../types';
import SkillBadge from '../components/SkillBadge';

const skills: Skill[] = [
  { name: 'Adobe Premiere Pro', level: 95 },
  { name: 'Adobe After Effects', level: 90 },
  { name: 'Color Grading', level: 88 },
  { name: 'Sound Design', level: 85 },
  { name: 'DaVinci Resolve', level: 82 },
  { name: 'Final Cut Pro', level: 78 },
  { name: 'Motion Graphics', level: 80 },
  { name: 'Visual Storytelling', level: 98 },
];

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">About Me</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          I'm a passionate video editor with a keen eye for detail and a love for storytelling. I specialize in transforming raw footage into polished, engaging content that captivates audiences and delivers a powerful message.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 flex justify-center">
            <img 
                src="https://picsum.photos/seed/aboutvideo/400/500" 
                alt="About me" 
                className="rounded-lg shadow-xl shadow-purple-500/20 w-full max-w-sm object-cover"
            />
        </div>
        <div className="md:col-span-2 space-y-4 text-gray-300">
          <h2 className="text-2xl font-bold text-purple-300">My Journey</h2>
          <p>
            My journey into video editing began with a simple fascination for the magic of cinema. This curiosity quickly evolved into a dedicated pursuit of the craft of post-production. I've spent years honing my skills in editing, color grading, sound design, and motion graphics to create compelling narratives.
          </p>
          <p>
            I thrive in creative and collaborative environments, constantly seeking new techniques to enhance my storytelling abilities. My goal is not just to edit videos, but to evoke emotion and create memorable experiences for the viewer.
          </p>
           <a
            href="/path-to-your-cv.pdf"
            download
            className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Download CV
          </a>
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">My Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;