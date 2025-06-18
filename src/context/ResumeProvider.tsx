import { useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData } from '../types/resume';
import { mockResumeData } from '../data/mockResume';
import { ResumeContext } from './ResumeContext';
import NotificationModal from '../components/NotificationModal';
import { Upload, AlertTriangle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'resume-composer-draft';
const AUTO_SAVE_KEY = 'resume-composer-auto-save';

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

  // Auto-save state - load from localStorage on initialization
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(() => {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    return saved !== null ? JSON.parse(saved) : true; // Default to true if not saved
  });
  // Modal for auto-save disable confirmation
  const [showDisableAutoSaveModal, setShowDisableAutoSaveModal] = useState(false);

  // Modal for loading draft on every app load
  const [showLoadDraftModal, setShowLoadDraftModal] = useState(false);
  // Track if user has interacted with the modal
  const [draftModalHandled, setDraftModalHandled] = useState(false);
  // Ref to know if a draft existed on mount
  const draftExistedOnMount = useRef(false);

  // Show modal on every mount if a draft exists
  useEffect(() => {
    const draft = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (draft) {
      setShowLoadDraftModal(true);
      draftExistedOnMount.current = true;
    }
  }, []);

  // Debounced auto-save to localStorage, but skip if modal is open and draft existed on mount or auto-save is disabled
  useEffect(() => {
    if (!autoSaveEnabled) return;
    if (showLoadDraftModal && draftExistedOnMount.current && !draftModalHandled) return;
    const timeout = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
    }, 500); // 500ms debounce
    return () => clearTimeout(timeout);
  }, [resumeData, showLoadDraftModal, draftModalHandled, autoSaveEnabled]);

  // Toggle auto-save
  const toggleAutoSave = useCallback(() => {
    if (autoSaveEnabled) {
      // If currently enabled, show confirmation modal before disabling
      setShowDisableAutoSaveModal(true);
    } else {
      // If currently disabled, enable immediately
      setAutoSaveEnabled(true);
      localStorage.setItem(AUTO_SAVE_KEY, 'true');
    }
  }, [autoSaveEnabled]);

  // Handle auto-save disable confirmation
  const handleDisableAutoSave = useCallback(() => {
    setAutoSaveEnabled(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.setItem(AUTO_SAVE_KEY, 'false');
    setShowDisableAutoSaveModal(false);
  }, []);

  // Manual load draft
  const loadDraft = useCallback(() => {
    const draft = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (draft) {
      setResumeData(JSON.parse(draft));
      return true;
    }
    return false;
  }, []);

  // Manual save draft
  const saveDraft = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  // Manual clear draft
  const clearDraft = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    // Reset all resume data to empty state
    setResumeData({
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
  }, []);

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
      loadDraft,
      saveDraft,
      clearDraft,
      autoSaveEnabled,
      toggleAutoSave,
    }}>
      {children}
      <NotificationModal
        isOpen={showLoadDraftModal}
        onClose={() => {
          setShowLoadDraftModal(false);
          setDraftModalHandled(true);
        }}
        title="Load Saved Draft?"
        message="A saved resume draft was found in your browser. Would you like to load it now? This will overwrite any current unsaved changes."
        icon={<Upload className="w-8 h-8 text-secondary" />}
        showCloseButton={false}
      >
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              loadDraft();
              setShowLoadDraftModal(false);
              setDraftModalHandled(true);
            }}
          >
            Load Draft
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              setShowLoadDraftModal(false);
              setDraftModalHandled(true);
            }}
          >
            Dismiss
          </button>
        </div>
      </NotificationModal>

      {/* Auto-save disable confirmation modal */}
      <NotificationModal
        isOpen={showDisableAutoSaveModal}
        onClose={() => setShowDisableAutoSaveModal(false)}
        title="Disable Auto-save?"
        message="Disabling auto-save will clear any saved draft from your browser. Your current changes will not be automatically saved. Are you sure you want to continue?"
        icon={<AlertTriangle className="w-8 h-8 text-warning" />}
        showCloseButton={false}
      >
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="btn btn-error btn-sm"
            onClick={handleDisableAutoSave}
          >
            Disable Auto-save
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setShowDisableAutoSaveModal(false)}
          >
            Cancel
          </button>
        </div>
      </NotificationModal>
    </ResumeContext.Provider>
  );
}; 