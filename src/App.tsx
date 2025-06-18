import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TabNavigation from './components/TabNavigation';
import Dashboard from './pages/Dashboard';
import PersonalInfo from './pages/PersonalInfo/PersonalInfo';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Preview from './pages/Preview';
import { ResumeProvider } from './context/ResumeProvider';
import { useResume } from './hooks/useResume';
import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import NotificationModal from './components/NotificationModal';

function NavbarDraftActions() {
  const { saveDraft, clearDraft } = useResume();
  const [notif, setNotif] = useState<{
    open: boolean;
    title: string;
    message: string;
    icon?: React.ReactNode;
  }>({ open: false, title: '', message: '' });

  return (
    <>
      <button
        className="btn btn-ghost btn-circle mr-2 tooltip tooltip-bottom"
        data-tip="Save Draft"
        aria-label="Save Draft"
        onClick={() => {
          saveDraft();
          setNotif({
            open: true,
            title: 'Draft Saved!',
            message: 'Your resume draft has been saved to your browser. You can safely close or refresh the page and restore your work later.',
            icon: <Save className="w-7 h-7 text-primary" />
          });
        }}
      >
        <Save className="w-7 h-7 text-primary" />
      </button>
      <button
        className="btn btn-ghost btn-circle tooltip tooltip-bottom"
        data-tip="Clear Draft"
        aria-label="Clear Draft"
        onClick={() => {
          clearDraft();
          setNotif({
            open: true,
            title: 'Draft Cleared!',
            message: 'Your saved resume draft has been removed from your browser.',
            icon: <Trash2 className="w-7 h-7 text-error" />
          });
        }}
      >
        <Trash2 className="w-7 h-7 text-error" />
      </button>
      <NotificationModal
        isOpen={notif.open}
        onClose={() => setNotif(n => ({ ...n, open: false }))}
        title={notif.title}
        message={notif.message}
        icon={notif.icon}
      />
    </>
  );
}

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
          {/* Header */}
          <div className="navbar bg-base-100/80 backdrop-blur-md shadow-lg border-b border-base-300/50">
            <div className="navbar-start">
              <h1 className="text-2xl font-bold text-primary">Resume Composer</h1>
            </div>
            <div className="navbar-center">
              <TabNavigation />
            </div>
            <div className="navbar-end">
              <NavbarDraftActions />
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/personal-info" element={<PersonalInfo />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/education" element={<Education />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/preview" element={<Preview />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;
