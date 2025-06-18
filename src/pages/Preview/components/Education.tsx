import React from 'react';
import type { EducationEntry } from '../../../types/resume';

interface EducationProps {
  education: EducationEntry[];
  formatDate: (date: string) => string;
  renderMarkdown: (text: string) => string;
}

const Education: React.FC<EducationProps> = ({ education, formatDate, renderMarkdown }) => {
  if (!education.length || !education[0].degree) return null;
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">
        Education
      </h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-base text-gray-800 leading-tight">{edu.degree}</h3>
                <p className="text-xs text-gray-600 leading-tight">{edu.institution}</p>
              </div>
              <div className="text-right text-xs text-gray-500 leading-tight">
                <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                {edu.location && <p>{edu.location}</p>}
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
            </div>
            {edu.description && (
              <div
                className="text-xs text-gray-700 leading-snug"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(edu.description) }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education; 