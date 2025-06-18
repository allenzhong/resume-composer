import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData } from '../types/resume';
import { mockResumeData } from '../data/mockResume';
import { ResumeContext } from './ResumeContext';

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      title: '',
      location: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      personalStatement: '',
      github: '',
      linkedin: '',
      portfolio: '',
      twitter: '',
    },
    experience: [],
    education: [],
    skills: [],
  });

  const loadMockData = () => {
    setResumeData(mockResumeData);
  };

  const updatePersonalInfo = (data: ResumeData['personalInfo']) => {
    setResumeData(prev => ({ ...prev, personalInfo: data }));
  };

  const updateExperience = (data: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience: data }));
  };

  const updateEducation = (data: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education: data }));
  };

  const updateSkills = (data: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills: data }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      loadMockData,
      updatePersonalInfo,
      updateExperience,
      updateEducation,
      updateSkills,
    }}>
      {children}
    </ResumeContext.Provider>
  );
}; 