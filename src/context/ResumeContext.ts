import { createContext } from 'react';
import type { ResumeData } from '../types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  loadMockData: () => void;
  updatePersonalInfo: (data: ResumeData['personalInfo']) => void;
  updateExperience: (data: ResumeData['experience']) => void;
  updateEducation: (data: ResumeData['education']) => void;
  updateSkills: (data: ResumeData['skills']) => void;
  loadDraft: () => boolean;
  saveDraft: () => void;
  clearDraft: () => void;
  autoSaveEnabled: boolean;
  toggleAutoSave: () => void;
  template: string;
  setTemplate: (template: string) => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined); 