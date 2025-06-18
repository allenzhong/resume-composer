import React from 'react';
import type { ExperienceEntry } from '../../../types/resume';

interface ExperienceProps {
  experience: ExperienceEntry[];
  formatDate: (date: string) => string;
  renderMarkdown: (text: string) => string;
}

const Experience: React.FC<ExperienceProps> = ({ experience, formatDate, renderMarkdown }) => {
  if (!experience.length || !experience[0].jobTitle) return null;
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">
        Professional Experience
      </h2>
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-base text-gray-800 leading-tight">{exp.jobTitle}</h3>
                <p className="text-xs text-gray-600 leading-tight">{exp.company}</p>
              </div>
              <div className="text-right text-xs text-gray-500 leading-tight">
                <p>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                {exp.location && <p>{exp.location}</p>}
              </div>
            </div>
            {exp.description && (
              <div
                className="text-xs text-gray-700 leading-snug"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(exp.description) }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience; 