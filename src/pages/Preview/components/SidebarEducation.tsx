import React from 'react';
import type { EducationEntry } from '../../../types/resume';

interface SidebarEducationProps {
  education: EducationEntry[];
}

const SidebarEducation: React.FC<SidebarEducationProps> = ({ education }) => {
  if (!education.length || !education[0].degree) return null;
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-md text-gray-700 mb-2">Education</h3>
      <ul className="space-y-1">
        {education.map((edu) => (
          <li key={edu.id}>
            <span className="block text-sm font-medium text-gray-800">{edu.degree}</span>
            <span className="block text-xs text-gray-500">{edu.institution}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarEducation; 