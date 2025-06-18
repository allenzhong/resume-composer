import { useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}; 