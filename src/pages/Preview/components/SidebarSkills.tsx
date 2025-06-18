import React from 'react';
import type { SkillCategory } from '../../../types/resume';

interface SidebarSkillsProps {
  skills: SkillCategory[];
}

const SidebarSkills: React.FC<SidebarSkillsProps> = ({ skills }) => {
  if (!skills.length || !skills.some(cat => cat.skills.some(skill => skill.name))) return null;
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-md text-gray-700 mb-2">Skills</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((category) =>
          category.skills.filter(skill => skill.name).map(skill => (
            <li key={skill.id} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
              {skill.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SidebarSkills; 