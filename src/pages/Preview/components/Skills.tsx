import React from 'react';
import type { SkillCategory } from '../../../types/resume';

interface SkillsProps {
  skills: SkillCategory[];
  renderMarkdown: (text: string) => string;
}

const Skills: React.FC<SkillsProps> = ({ skills, renderMarkdown }) => {
  if (!skills.length || !skills.some(cat => cat.skills.some(skill => skill.name))) return null;
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">
        Skills & Certifications
      </h2>
      <div className="space-y-4">
        {skills.map((category) => {
          const validSkills = category.skills.filter(skill => skill.name);
          if (validSkills.length === 0) return null;
          return (
            <div key={category.id} className="mb-4">
              <h3 className="font-semibold text-base text-gray-800 mb-2">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {validSkills.map((skill) => (
                  <div key={skill.id} className="mb-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-base text-gray-800">{skill.name}</span>
                      {skill.proficiency && (
                        <span className="text-xs text-gray-600">{skill.proficiency}</span>
                      )}
                    </div>
                    {skill.description && (
                      <div
                        className="text-xs text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(skill.description) }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills; 