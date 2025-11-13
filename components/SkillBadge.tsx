
import React from 'react';
import { Skill } from '../types';

interface SkillBadgeProps {
  skill: Skill;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700/50 transition-colors duration-300">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-200">{skill.name}</span>
        <span className="text-sm font-medium text-purple-300">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
      </div>
    </div>
  );
};

export default SkillBadge;
