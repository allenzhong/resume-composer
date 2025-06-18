import React from 'react';
import type { PersonalInfoData } from '../../../types/resume';

interface HeaderProps {
  personalInfo: PersonalInfoData;
  showContactDetails: boolean;
}

const Header: React.FC<HeaderProps> = ({ personalInfo, showContactDetails }) => {
  return (
    <div className="border-b-2 border-gray-300 pb-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1" style={{ fontSize: '2rem' }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-base text-gray-600 mb-1" style={{ fontSize: '1.1rem' }}>{personalInfo.title}</p>
          )}
          {personalInfo.location && (
            <p className="text-sm text-gray-600" style={{ fontSize: '0.85rem' }}>{personalInfo.location}</p>
          )}
        </div>
        {showContactDetails && (
          <div className="text-right text-xs text-gray-600">
            {personalInfo.email && (
              <p className="mb-1">{personalInfo.email}</p>
            )}
            {personalInfo.phone && (
              <p className="mb-1">{personalInfo.phone}</p>
            )}
            {personalInfo.website && (
              <p className="mb-1">
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
            {(personalInfo.github || personalInfo.linkedin) && (
              <div className="mt-2">
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline block">
                    GitHub
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline block">
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header; 