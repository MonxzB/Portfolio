import React from 'react';
import { Skill } from '../types';

interface SkillBadgeProps {
  skill: Skill;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700/50 transition-all duration-300 flex flex-col items-center gap-3 transform hover:-translate-y-1">
      <img src={skill.iconUrl} alt={skill.name} className="w-12 h-12 object-contain"/>
      <span className="font-semibold text-gray-200 text-center">{skill.name}</span>
    </div>
  );
};

export default SkillBadge;